"use client";

import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type Catalogue,
} from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import type { Mesh } from "three";
import * as THREE from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import {
  abs,
  add,
  blendScreen,
  float,
  mix,
  mod,
  mx_cell_noise_float,
  oneMinus,
  pass,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
} from "three/tsl";

import {
  HERO_DEPTH_MAP_SRC,
  HERO_TEXTURE_MAP_SRC,
} from "@/components/ui/hero-futuristic-assets";

extend(THREE as unknown as Catalogue);

interface PostProcessingProps {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}

interface ScanProgressUniform {
  value: number;
}

interface SceneUniforms {
  uPointer: { value: THREE.Vector2 };
  uProgress: { value: number };
}

const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: PostProcessingProps) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef<ScanProgressUniform>({ value: 0 });

  const { postProcessing, scanProgress } = useMemo(() => {
    const nextPostProcessing = new THREE.PostProcessing(
      gl as unknown as ConstructorParameters<typeof THREE.PostProcessing>[0],
    );
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode("output");
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, redOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0,
    );

    const final = withScanEffect.add(bloomPass);
    nextPostProcessing.outputNode = final;

    return {
      postProcessing: nextPostProcessing,
      scanProgress: uScanProgress,
    };
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useEffect(() => {
    progressRef.current = scanProgress;
  }, [scanProgress]);

  useFrame(({ clock }) => {
    progressRef.current.value =
      Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    void postProcessing.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([
    HERO_TEXTURE_MAP_SRC,
    HERO_DEPTH_MAP_SRC,
  ]);
  const meshRef = useRef<Mesh>(null);
  const uniformsRef = useRef<SceneUniforms | null>(null);
  const visible = Boolean(rawMap && depthMap);

  const materialAndUniforms = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength = 0.01;
    const tDepthMap = texture(depthMap);

    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength)),
    );

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);
    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap;
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));
    const mask = dot.mul(flow).mul(vec3(10, 0, 0));
    const final = blendScreen(tMap, mask);

    const meshMaterial = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return {
      material: meshMaterial,
      uniforms: {
        uPointer,
        uProgress,
      } satisfies SceneUniforms,
    };
  }, [rawMap, depthMap]);

  useEffect(() => {
    uniformsRef.current = materialAndUniforms.uniforms;
  }, [materialAndUniforms.uniforms]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock, pointer }) => {
    const uniforms = uniformsRef.current;
    if (!uniforms) return;

    uniforms.uProgress.value =
      Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    uniforms.uPointer.value = pointer;

    const currentMaterial = meshRef.current?.material;
    if (
      currentMaterial &&
      !Array.isArray(currentMaterial) &&
      "opacity" in currentMaterial
    ) {
      currentMaterial.opacity = THREE.MathUtils.lerp(
        currentMaterial.opacity,
        visible ? 1 : 0,
        0.07,
      );
    }
  });

  const scaleFactor = 0.4;

  return (
    <mesh
      ref={meshRef}
      scale={[w * scaleFactor, h * scaleFactor, 1]}
      material={materialAndUniforms.material}
    >
      <planeGeometry />
    </mesh>
  );
};

export default function HeroFuturisticScene() {
  return (
    <Canvas
      flat
      className="h-full w-full"
      gl={async (props) => {
        const renderer = new THREE.WebGPURenderer(
          props as ConstructorParameters<typeof THREE.WebGPURenderer>[0],
        );
        await renderer.init();
        return renderer;
      }}
    >
      <PostProcessing fullScreenEffect />
      <Scene />
    </Canvas>
  );
}
