import React, { useEffect, useRef, useState } from "react";
import { initializeFaceLandmarker, detectExpression } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    let videoElement = null;
    let landmarker = null;

    const startCamera = async () => {
      await initializeFaceLandmarker(videoRef, landmarkerRef);

      videoElement = videoRef.current;
      landmarker = landmarkerRef.current;
    };

    startCamera();

    return () => {
      if (landmarker) {
        landmarker.close();
      }

      if (videoElement?.srcObject) {
        videoElement.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleDetect = () => {
    const result = detectExpression(videoRef, landmarkerRef);
    setExpression(result);
    onClick(result);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Expression Detector</h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: "400px",
          borderRadius: "12px",
          border: "2px solid #333",
        }}
      />

      <h3>{expression}</h3>

      <button
        onClick={handleDetect}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Detect Expression
      </button>
    </div>
  );
}