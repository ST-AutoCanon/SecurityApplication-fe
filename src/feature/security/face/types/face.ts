export interface Point2D {
  x: number;
  y: number;
}


export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}


export type FaceLandmarks = [
  Point2D,
  Point2D,
  Point2D,
  Point2D,
  Point2D
];


export interface Face {

  id?: string;

  score: number;

  bbox: BoundingBox;

  landmarks: FaceLandmarks;

  embedding?: Float32Array;

  alignedFace?: HTMLCanvasElement;

  metadata?: Record<string, unknown>;

}



export interface FaceTemplate {

  id: string;

  name?: string;

  embedding: Float32Array;

  enrolledAt?: Date;

  metadata?: Record<string, unknown>;

}



export interface DetectedFace
  extends Face {}



export interface RecognizedFace
  extends Face {

  embedding:
    Float32Array;

}



export interface VerifiedFace
  extends RecognizedFace {

  matched:
    boolean;

  confidence:
    number;

  template?:
    FaceTemplate;

}