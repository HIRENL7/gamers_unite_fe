"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

interface ColorChannels {
  r: number;
  g: number;
  b: number;
}

const FALLBACK_CHANNELS: ColorChannels = { r: 180, g: 180, b: 180 };

function resolveCssVariable(cssColor: string): string {
  const probe = document.createElement("div");
  probe.style.color = cssColor;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const computedColor = getComputedStyle(probe).color;
  probe.remove();
  return computedColor;
}

/**
 * Canvas is the only reliable way to flatten modern CSS color spaces such as
 * oklch (used by the theme tokens) into the sRGB channels fillStyle needs.
 */
function resolveColorChannels(cssColor: string): ColorChannels {
  if (typeof window === "undefined" || !cssColor) {
    return FALLBACK_CHANNELS;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return FALLBACK_CHANNELS;
  }

  const value = cssColor.startsWith("var(")
    ? resolveCssVariable(cssColor)
    : cssColor;

  // An unparseable value leaves fillStyle untouched, so probe it against two
  // different sentinels to tell "invalid" apart from "legitimately black".
  context.fillStyle = "#000000";
  context.fillStyle = value;
  const againstBlack = context.fillStyle;
  context.fillStyle = "#ffffff";
  context.fillStyle = value;

  if (againstBlack !== context.fillStyle) {
    return FALLBACK_CHANNELS;
  }

  context.clearRect(0, 0, 1, 1);
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;

  return { r: r ?? 0, g: g ?? 0, b: b ?? 0 };
}

interface GridParams {
  cols: number;
  rows: number;
  squares: Float32Array;
  textMask: Uint8Array;
  dpr: number;
}

interface FlickeringGridProps extends HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

function buildTextMask({
  width,
  height,
  cols,
  rows,
  dpr,
  squareSize,
  gridGap,
  text,
  fontSize,
  fontWeight,
}: {
  width: number;
  height: number;
  cols: number;
  rows: number;
  dpr: number;
  squareSize: number;
  gridGap: number;
  text: string;
  fontSize: number;
  fontWeight: number | string;
}): Uint8Array {
  const mask = new Uint8Array(cols * rows);

  if (!text || width === 0 || height === 0) {
    return mask;
  }

  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = width;
  maskCanvas.height = height;
  const maskContext = maskCanvas.getContext("2d", { willReadFrequently: true });

  if (!maskContext) {
    return mask;
  }

  const cssWidth = width / dpr;
  const fontFamily = getComputedStyle(document.body).fontFamily || "sans-serif";

  maskContext.scale(dpr, dpr);
  maskContext.fillStyle = "white";
  maskContext.textAlign = "center";
  maskContext.textBaseline = "middle";
  maskContext.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  // Long labels would otherwise be clipped at the canvas edges.
  const measuredWidth = maskContext.measureText(text).width;
  const maxTextWidth = cssWidth * 0.92;

  if (measuredWidth > maxTextWidth) {
    const fittedFontSize = Math.max(
      12,
      Math.floor(fontSize * (maxTextWidth / measuredWidth)),
    );
    maskContext.font = `${fontWeight} ${fittedFontSize}px ${fontFamily}`;
  }

  maskContext.fillText(text, cssWidth / 2, height / (2 * dpr));

  const imageData = maskContext.getImageData(0, 0, width, height).data;

  for (let column = 0; column < cols; column += 1) {
    for (let row = 0; row < rows; row += 1) {
      const originX = Math.floor(column * (squareSize + gridGap) * dpr);
      const originY = Math.floor(row * (squareSize + gridGap) * dpr);
      const cellWidth = Math.ceil(squareSize * dpr);
      const cellHeight = Math.ceil(squareSize * dpr);
      let hasText = false;

      for (let offsetY = 0; offsetY < cellHeight && !hasText; offsetY += 1) {
        const sampleY = originY + offsetY;

        if (sampleY >= height) {
          break;
        }

        for (let offsetX = 0; offsetX < cellWidth; offsetX += 1) {
          const sampleX = originX + offsetX;

          if (sampleX >= width) {
            break;
          }

          if (imageData[(sampleY * width + sampleX) * 4 + 3] > 0) {
            hasText = true;
            break;
          }
        }
      }

      mask[column * rows + row] = hasText ? 1 : 0;
    }
  }

  return mask;
}

function FlickeringGrid({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = "#B4B4B4",
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = "",
  fontSize = 140,
  fontWeight = 600,
  ...props
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridParamsRef = useRef<GridParams | null>(null);
  const isInViewRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const fillPrefixRef = useRef(
    `rgba(${FALLBACK_CHANNELS.r}, ${FALLBACK_CHANNELS.g}, ${FALLBACK_CHANNELS.b}, `,
  );

  const drawGrid = useCallback(
    (
      context: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      gridParams: GridParams,
    ) => {
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const { cols, rows, squares, textMask, dpr } = gridParams;

      for (let column = 0; column < cols; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          const cellIndex = column * rows + row;
          const opacity = squares[cellIndex] ?? 0;
          const finalOpacity =
            textMask[cellIndex] === 1
              ? Math.min(1, opacity * 3 + 0.4)
              : opacity;

          context.fillStyle = `${fillPrefixRef.current}${finalOpacity})`;
          context.fillRect(
            column * (squareSize + gridGap) * dpr,
            row * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }
    },
    [gridGap, squareSize],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, nextWidth: number, nextHeight: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = nextWidth * dpr;
      canvas.height = nextHeight * dpr;
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;

      const cols = Math.ceil(nextWidth / (squareSize + gridGap));
      const rows = Math.ceil(nextHeight / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);

      for (let index = 0; index < squares.length; index += 1) {
        squares[index] = Math.random() * maxOpacity;
      }

      return {
        cols,
        rows,
        squares,
        dpr,
        textMask: buildTextMask({
          width: canvas.width,
          height: canvas.height,
          cols,
          rows,
          dpr,
          squareSize,
          gridGap,
          text,
          fontSize,
          fontWeight,
        }),
      } satisfies GridParams;
    },
    [fontSize, fontWeight, gridGap, maxOpacity, squareSize, text],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let index = 0; index < squares.length; index += 1) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[index] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const channels = resolveColorChannels(color);
    fillPrefixRef.current = `rgba(${channels.r}, ${channels.g}, ${channels.b}, `;

    let animationFrameId = 0;
    let lastTime = 0;

    const updateCanvasSize = () => {
      const nextWidth = width ?? container.clientWidth;
      const nextHeight = height ?? container.clientHeight;

      if (nextWidth === 0 || nextHeight === 0) {
        return;
      }

      setCanvasSize({ width: nextWidth, height: nextHeight });
      gridParamsRef.current = setupCanvas(canvas, nextWidth, nextHeight);
      drawGrid(context, canvas.width, canvas.height, gridParamsRef.current);
    };

    const stopAnimation = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };

    const animate = (time: number) => {
      const gridParams = gridParamsRef.current;

      if (
        !gridParams ||
        !isInViewRef.current ||
        prefersReducedMotionRef.current
      ) {
        stopAnimation();
        return;
      }

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      updateSquares(gridParams.squares, deltaTime);
      drawGrid(context, canvas.width, canvas.height, gridParams);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (prefersReducedMotionRef.current || animationFrameId !== 0) {
        return;
      }

      lastTime = performance.now();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry?.isIntersecting ?? false;

        if (isInViewRef.current) {
          startAnimation();
          return;
        }

        stopAnimation();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [color, drawGrid, height, setupCanvas, updateSquares, width]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        aria-hidden="true"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
}

export { FlickeringGrid, type FlickeringGridProps };
