import type {
  Point2D,
  FaceLandmarks,
} from "../types/face";

export const ARC_FACE_TEMPLATE: FaceLandmarks = [
  { x: 38.2946, y: 51.6963 }, // left eye
  { x: 73.5318, y: 51.5014 }, // right eye
  { x: 56.0252, y: 71.7366 }, // nose
  { x: 41.5493, y: 92.3655 }, // left mouth
  { x: 70.7299, y: 92.2041 }, // right mouth
];

export interface SimilarityTransform {
  scale: number;
  rotation: number;
  translationX: number;
  translationY: number;
}

/**
 * Estimate similarity transform using eye landmarks.
 */
export function estimateSimilarityTransform(
  source: FaceLandmarks,
  target: FaceLandmarks = ARC_FACE_TEMPLATE
): SimilarityTransform {
  const srcLeft = source[0];
  const srcRight = source[1];

  const dstLeft = target[0];
  const dstRight = target[1];

  const srcDx = srcRight.x - srcLeft.x;
  const srcDy = srcRight.y - srcLeft.y;

  const dstDx = dstRight.x - dstLeft.x;
  const dstDy = dstRight.y - dstLeft.y;

  const srcDistance = Math.hypot(srcDx, srcDy);
  const dstDistance = Math.hypot(dstDx, dstDy);

  const scale = dstDistance / srcDistance;

  const srcAngle = Math.atan2(srcDy, srcDx);
  const dstAngle = Math.atan2(dstDy, dstDx);

  const rotation = dstAngle - srcAngle;

  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  const translationX =
    dstLeft.x -
    scale * (srcLeft.x * cos - srcLeft.y * sin);

  const translationY =
    dstLeft.y -
    scale * (srcLeft.x * sin + srcLeft.y * cos);

  return {
    scale,
    rotation,
    translationX,
    translationY,
  };
}

/**
 * Transform a single point.
 */
export function transformPoint(
  point: Point2D,
  transform: SimilarityTransform
): Point2D {
  const {
    scale,
    rotation,
    translationX,
    translationY,
  } = transform;

  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  return {
    x:
      scale * (point.x * cos - point.y * sin) +
      translationX,

    y:
      scale * (point.x * sin + point.y * cos) +
      translationY,
  };
}

/**
 * Transform all landmarks.
 */
export function transformLandmarks(
  landmarks: FaceLandmarks,
  transform: SimilarityTransform
): FaceLandmarks {
  return landmarks.map((point) =>
    transformPoint(point, transform)
  ) as FaceLandmarks;
}