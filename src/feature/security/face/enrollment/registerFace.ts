import { faceRecognizer } from "../recognition/recognizer";
import { faceQuality } from "../quality/quality";

export interface FaceRegistrationResult {
  photo: string;
  embedding: number[];
  quality: any;
}


export async function registerFace(
  image:
    | HTMLVideoElement
    | HTMLCanvasElement
    | HTMLImageElement
    | ImageBitmap
): Promise<FaceRegistrationResult> {


  const result =
    await faceRecognizer.recognize(image);


  const quality =
    faceQuality.evaluate(
      image,
      result.detection
    );


  if (!quality.passed) {
    throw new Error(
      "Face quality check failed"
    );
  }


  return {

    photo:
      result.alignedFace.toDataURL(
        "image/jpeg"
      ),

    embedding:
      Array.from(
        result.embedding
      ),

    quality

  };
}