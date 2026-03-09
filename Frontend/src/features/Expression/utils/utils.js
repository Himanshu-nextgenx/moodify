import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const initializeFaceLandmarker = async (videoRef, faceLandmarkerRef) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    runningMode: "VIDEO",
    numFaces: 1,
    outputFaceBlendshapes: true,
  });

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  if (videoRef.current) {
    videoRef.current.srcObject = stream;

    // wait until video is ready
    await new Promise((resolve) => {
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        resolve();
      };
    });
  }
};

export const detectExpression = (videoRef, faceLandmarkerRef) => {
  if (!videoRef.current || !faceLandmarkerRef.current) {
    return "Camera not ready";
  }

  const video = videoRef.current;

  if (video.readyState < 2) {
    return "Loading camera...";
  }

  const results = faceLandmarkerRef.current.detectForVideo(
    video,
    performance.now()
  );

  if (!results?.faceBlendshapes?.length) {
    return "No face detected";
  }

  const blendshapes = results.faceBlendshapes[0].categories;

  const getScore = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score || 0;

  const smileLeft = getScore("mouthSmileLeft");
  const smileRight = getScore("mouthSmileRight");

  const blinkLeft = getScore("eyeBlinkLeft");
  const blinkRight = getScore("eyeBlinkRight");

  const mouthOpen = getScore("jawOpen");

  const browDownLeft = getScore("browDownLeft");
  const browDownRight = getScore("browDownRight");

  const frownLeft = getScore("mouthFrownLeft");
  const frownRight = getScore("mouthFrownRight");

  const browInnerUp = getScore("browInnerUp");

  // Expression logic
  if (smileLeft > 0.4 || smileRight > 0.4) {
    return "😊 Happy / Smiling";
  }

  if (blinkLeft > 0.3 || blinkRight > 0.3) {
    return "😉 Blinking";
  }

  if (mouthOpen > 0.35) {
    return "😮 Surprise";
  }

  if (
    browDownLeft > 0.18 &&
    browDownRight > 0.18 &&
    smileLeft < 0.2 &&
    smileRight < 0.2
  ) {
    return "😠 Angry";
  }

  if ((frownLeft > 0.15 || frownRight > 0.15) && browInnerUp > 0.1) {
    return "😢 Sad";
  }

  return "😐 Neutral";
};