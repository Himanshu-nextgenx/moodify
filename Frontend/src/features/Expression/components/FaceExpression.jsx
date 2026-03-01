import React, { useEffect, useRef, useState } from "react";
import { initializeFaceLandmarker, detectExpression } from "../utils/utils.js";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Click button to detect");

  useEffect(() => {
    initializeFaceLandmarker(videoRef, faceLandmarkerRef);

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleDetect = () => {
    const result = detectExpression(videoRef, faceLandmarkerRef);
    setExpression(result);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Facial Expression Detector</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "420px",
          borderRadius: "10px",
          border: "2px solid black",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleDetect}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Detect Expression
        </button>
      </div>

      <h3 style={{ marginTop: "20px" }}>Expression: {expression}</h3>
    </div>
  );
}