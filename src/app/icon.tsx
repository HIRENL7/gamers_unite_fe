import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: 8,
          background: "linear-gradient(135deg, #111827 0%, #0e7490 100%)",
          color: "#ecfeff",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        GU
      </div>
    ),
    { ...size },
  );
}
