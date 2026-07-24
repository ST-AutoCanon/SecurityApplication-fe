// import * as ort from "onnxruntime-web";

// import { sessionManager } from "../core/session";
// import { detectorPreprocessor } from "./preprocess";

// import type { FaceDetection } from "../types/detection";


// export class SCRFD {


//   private get session(): ort.InferenceSession {
//     return sessionManager.detector;
//   }



//   async detect(
//     image:
//       | HTMLImageElement
//       | HTMLCanvasElement
//       | HTMLVideoElement
//       | ImageBitmap

//   ): Promise<FaceDetection[]> {


    

//     const preprocessed =
//       detectorPreprocessor.preprocess(
//         image
//       );


//     const inputName =
//       this.session.inputNames[0];


//     const outputs =
//       await this.session.run({
//         [inputName]:
//           preprocessed.tensor,
//       });


//     console.log("========== INPUT ==========");
// console.log("Input Names:", this.session.inputNames);

// console.log("========== OUTPUT ==========");
// console.log("Output Names:", this.session.outputNames);

// for (const name of this.session.outputNames) {
//   const tensor = outputs[name];

//   console.log("Name:", name);
//   console.log("Dims:", tensor.dims);
//   console.log(
//     "First 20 values:",
//     Array.from((tensor.data as Float32Array).slice(0, 20))
//   );
// }

// console.log("========== PREPROCESS ==========");
// console.log(preprocessed);

//     return this.decode(
//       outputs,
//       preprocessed
//     );

//   }
//   private decode(
//     outputs: ort.InferenceSession.ReturnType,
//     preprocess: ReturnType<typeof detectorPreprocessor.preprocess>
// ): FaceDetection[] {

//     const detections: FaceDetection[] = [];

//     const outputNames = this.session.outputNames;

//     for (let i = 0; i < outputNames.length; i += 3) {

//         // SCRFD 10G order:
//         // score -> bbox -> landmark

//         const scoreTensor =
//             outputs[outputNames[i]];

//         const boxTensor =
//             outputs[outputNames[i + 1]];

//         const landmarkTensor =
//             outputs[outputNames[i + 2]];

//         if (
//             !scoreTensor ||
//             !boxTensor ||
//             !landmarkTensor
//         ) {
//             continue;
//         }

//         const scores =
//             scoreTensor.data as Float32Array;

//         const boxes =
//             boxTensor.data as Float32Array;

//         const landmarks =
//             landmarkTensor.data as Float32Array;

//       // const count = scores.length;
//       const count = Math.min(
//   scores.length,
//   Math.floor(boxes.length / 4),
//   Math.floor(landmarks.length / 10)
// );

// //         for (let j = 0; j < count; j++) {

// //             const score = scores[j];

// //             if (score < 0.6)
// //                 continue;

// //             const boxIndex = j * 4;
// //             const landmarkIndex = j * 10;

// //             const x1 =
// //                 boxes[boxIndex] *
// //                 preprocess.scaleX;

// //             const y1 =
// //                 boxes[boxIndex + 1] *
// //                 preprocess.scaleY;

// //             const x2 =
// //                 boxes[boxIndex + 2] *
// //                 preprocess.scaleX;

// //             const y2 =
// //                 boxes[boxIndex + 3] *
// //                 preprocess.scaleY;

// //           console.log("================================");
// // console.log("Detection", j);

// // console.log("score =", score);

// // console.log("boxIndex =", boxIndex);
// // console.log("landmarkIndex =", landmarkIndex);

// // console.log("boxes:",
// // [
// //     boxes[boxIndex],
// //     boxes[boxIndex + 1],
// //     boxes[boxIndex + 2],
// //     boxes[boxIndex + 3]
// // ]);

// // console.log("landmarks:",
// // Array.from(
// //     landmarks.slice(
// //         landmarkIndex,
// //         landmarkIndex + 10
// //     )
// // ));

// // console.log("scaleX =", preprocess.scaleX);
// // console.log("scaleY =", preprocess.scaleY);

// //           console.log("================================");
          
// //             detections.push({

// //                 score,

// //                 bbox: {

// //                     x: x1,

// //                     y: y1,

// //                     width: x2 - x1,

// //                     height: y2 - y1

// //                 },

// //                 landmarks: [

// //                     {
// //                         x:
// //                             landmarks[landmarkIndex] *
// //                             preprocess.scaleX,

// //                         y:
// //                             landmarks[landmarkIndex + 1] *
// //                             preprocess.scaleY
// //                     },

// //                     {
// //                         x:
// //                             landmarks[landmarkIndex + 2] *
// //                             preprocess.scaleX,

// //                         y:
// //                             landmarks[landmarkIndex + 3] *
// //                             preprocess.scaleY
// //                     },

// //                     {
// //                         x:
// //                             landmarks[landmarkIndex + 4] *
// //                             preprocess.scaleX,

// //                         y:
// //                             landmarks[landmarkIndex + 5] *
// //                             preprocess.scaleY
// //                     },

// //                     {
// //                         x:
// //                             landmarks[landmarkIndex + 6] *
// //                             preprocess.scaleX,

// //                         y:
// //                             landmarks[landmarkIndex + 7] *
// //                             preprocess.scaleY
// //                     },

// //                     {
// //                         x:
// //                             landmarks[landmarkIndex + 8] *
// //                             preprocess.scaleX,

// //                         y:
// //                             landmarks[landmarkIndex + 9] *
// //                             preprocess.scaleY
// //                     }

// //                 ]

// //             });

//       //         }
      



// for (let j = 0; j < count; j++) {

//     const score = scores[j];

//     if (score < 0.6) {
//         continue;
//     }

//     const boxIndex = j * 4;
//     const landmarkIndex = j * 10;

//     // Safety check
//     if (
//         boxIndex + 3 >= boxes.length ||
//         landmarkIndex + 9 >= landmarks.length
//     ) {
//         console.warn("Skipping invalid detection", {
//             j,
//             boxIndex,
//             landmarkIndex,
//             boxesLength: boxes.length,
//             landmarksLength: landmarks.length,
//         });
//         continue;
//     }

//     const x1 = boxes[boxIndex] * preprocess.scaleX;
//     const y1 = boxes[boxIndex + 1] * preprocess.scaleY;
//     const x2 = boxes[boxIndex + 2] * preprocess.scaleX;
//     const y2 = boxes[boxIndex + 3] * preprocess.scaleY;

//     console.log("================================");
//     console.log("Detection", j);
//     console.log("score =", score);
//     console.log("boxIndex =", boxIndex);
//     console.log("landmarkIndex =", landmarkIndex);

//     console.log("boxes =", [
//         boxes[boxIndex],
//         boxes[boxIndex + 1],
//         boxes[boxIndex + 2],
//         boxes[boxIndex + 3],
//     ]);

//     console.log(
//         "landmarks =",
//         Array.from(
//             landmarks.slice(
//                 landmarkIndex,
//                 landmarkIndex + 10
//             )
//         )
//     );

//     console.log("Decoded Box =", {
//         x1,
//         y1,
//         x2,
//         y2,
//         width: x2 - x1,
//         height: y2 - y1,
//     });

//     console.log("================================");

//     detections.push({
//         score,

//         bbox: {
//             x: x1,
//             y: y1,
//             width: x2 - x1,
//             height: y2 - y1,
//         },

//         landmarks: [
//             {
//                 x: landmarks[landmarkIndex] * preprocess.scaleX,
//                 y: landmarks[landmarkIndex + 1] * preprocess.scaleY,
//             },
//             {
//                 x: landmarks[landmarkIndex + 2] * preprocess.scaleX,
//                 y: landmarks[landmarkIndex + 3] * preprocess.scaleY,
//             },
//             {
//                 x: landmarks[landmarkIndex + 4] * preprocess.scaleX,
//                 y: landmarks[landmarkIndex + 5] * preprocess.scaleY,
//             },
//             {
//                 x: landmarks[landmarkIndex + 6] * preprocess.scaleX,
//                 y: landmarks[landmarkIndex + 7] * preprocess.scaleY,
//             },
//             {
//                 x: landmarks[landmarkIndex + 8] * preprocess.scaleX,
//                 y: landmarks[landmarkIndex + 9] * preprocess.scaleY,
//             },
//         ],
//     });
// }

//     }

//     return detections.sort((a, b) => b.score - a.score);

// }
// }



// export const scrfd =
//   new SCRFD();


// export default scrfd;





import * as ort from "onnxruntime-web";

import { sessionManager } from "../core/session";
import { detectorPreprocessor } from "./preprocess";
import { getConfig } from "../core/config";

import type { FaceDetection } from "../types/detection";
import type { scrfd } from "..";

interface Anchor {
  x: number;
  y: number;
}

interface DetectionCandidate extends FaceDetection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export class SCRFD {
  private readonly strides = [8, 16, 32];

  private readonly anchorsPerLocation = 2;

  private readonly anchorCache = new Map<string, Anchor[]>();

  private get session(): ort.InferenceSession {
    return sessionManager.detector;
  }

  async detect(
    image:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): Promise<FaceDetection[]> {
    const preprocess =
      detectorPreprocessor.preprocess(image);

    const inputName =
      this.session.inputNames[0];

    const outputs =
      await this.session.run({
        [inputName]: preprocess.tensor,
      });

    return this.decode(outputs, preprocess);
  }

  private clamp(
    value: number,
    min: number,
    max: number
  ): number {
    return Math.max(
      min,
      Math.min(max, value)
    );
  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  private outputShape(
    stride: number,
    inputSize: number
  ) {
    return {
      width: Math.ceil(inputSize / stride),
      height: Math.ceil(inputSize / stride),
    };
  }

  private getAnchors(
    stride: number,
    inputSize: number
  ): Anchor[] {
    const key =
      `${stride}_${inputSize}`;

    const cached =
      this.anchorCache.get(key);

    if (cached) {
      return cached;
    }

    const anchors =
      this.generateAnchors(
        stride,
        inputSize
      );

    this.anchorCache.set(
      key,
      anchors
    );

    return anchors;
  }

  private generateAnchors(
    stride: number,
    inputSize: number
  ): Anchor[] {

    const anchors: Anchor[] = [];

    const featureWidth =
      Math.ceil(inputSize / stride);

    const featureHeight =
      Math.ceil(inputSize / stride);

    for (let y = 0; y < featureHeight; y++) {

      for (let x = 0; x < featureWidth; x++) {

        const cx =
          (x + 0.5) * stride;

        const cy =
          (y + 0.5) * stride;

        for (
          let k = 0;
          k < this.anchorsPerLocation;
          k++
        ) {

          anchors.push({
            x: cx,
            y: cy,
          });

        }

      }

    }

    return anchors;

  }

  private distance2bbox(
    anchor: Anchor,
    box: Float32Array,
    index: number,
    stride: number
  ) {

    const left =
      box[index] * stride;

    const top =
      box[index + 1] * stride;

    const right =
      box[index + 2] * stride;

    const bottom =
      box[index + 3] * stride;

    return {

      x1:
        anchor.x - left,

      y1:
        anchor.y - top,

      x2:
        anchor.x + right,

      y2:
        anchor.y + bottom,

    };

  }

  private distance2kps(
    anchor: Anchor,
    landmark: Float32Array,
    index: number,
    stride: number
  ) {

    return [

      {
        x:
          anchor.x +
          landmark[index] * stride,

        y:
          anchor.y +
          landmark[index + 1] * stride,
      },

      {
        x:
          anchor.x +
          landmark[index + 2] * stride,

        y:
          anchor.y +
          landmark[index + 3] * stride,
      },

      {
        x:
          anchor.x +
          landmark[index + 4] * stride,

        y:
          anchor.y +
          landmark[index + 5] * stride,
      },

      {
        x:
          anchor.x +
          landmark[index + 6] * stride,

        y:
          anchor.y +
          landmark[index + 7] * stride,
      },

      {
        x:
          anchor.x +
          landmark[index + 8] * stride,

        y:
          anchor.y +
          landmark[index + 9] * stride,
      },

    ];

  }
  private iou(
    a: DetectionCandidate,
    b: DetectionCandidate
  ): number {

    const xx1 =
      Math.max(a.x1, b.x1);

    const yy1 =
      Math.max(a.y1, b.y1);

    const xx2 =
      Math.min(a.x2, b.x2);

    const yy2 =
      Math.min(a.y2, b.y2);

    const w =
      Math.max(0, xx2 - xx1);

    const h =
      Math.max(0, yy2 - yy1);

    const inter =
      w * h;

    const areaA =
      (a.x2 - a.x1) *
      (a.y2 - a.y1);

    const areaB =
      (b.x2 - b.x1) *
      (b.y2 - b.y1);

    return (
      inter /
      (areaA + areaB - inter + 1e-5)
    );

  }

  private nms(
    detections: DetectionCandidate[]
  ): FaceDetection[] {

    const threshold =
      getConfig().nmsThreshold;

    detections.sort(
      (a, b) =>
        b.score - a.score
    );

    const result:
      FaceDetection[] = [];

    while (
      detections.length > 0
    ) {

      const best =
        detections.shift();

      if (!best) {
        break;
      }

      result.push(best);

      for (
        let i =
          detections.length - 1;
        i >= 0;
        i--
      ) {

        if (
          this.iou(
            best,
            detections[i]
          ) > threshold
        ) {

          detections.splice(
            i,
            1
          );

        }

      }

    }

    return result;

  }
private decode(
  outputs: ort.InferenceSession.ReturnType,
  preprocess: ReturnType<typeof detectorPreprocessor.preprocess>
): FaceDetection[] {

  const candidates: DetectionCandidate[] = [];

  const outputNames = this.session.outputNames;

  console.log("===== SESSION =====");
  console.log(this.session);
  console.log("Input Names:", this.session.inputNames);
  console.log("Output Names:", this.session.outputNames);

  this.session.outputNames.forEach((name) => {
    const t = outputs[name];

    console.log(name);
    console.log("dims:", t.dims);
    console.log("length:", t.data.length);
  });

  const inputSize =
    getConfig().detectorInputSize;

  for (
    let level = 0;
    level < this.strides.length;
    level++
  ) {

    const stride =
      this.strides[level];

    const scoreTensor =
      outputs[outputNames[level]];

    const boxTensor =
      outputs[outputNames[level + 3]];

    const landmarkTensor =
      outputs[outputNames[level + 6]];

    if (
      !scoreTensor ||
      !boxTensor ||
      !landmarkTensor
    ) {
      continue;
    }

    const scores =
      scoreTensor.data as Float32Array;

    const boxes =
      boxTensor.data as Float32Array;

    const landmarks =
      landmarkTensor.data as Float32Array;

    if (stride === 8) {

      console.log("================================");
      console.log("Stride:", stride);

      console.log(
        "Score sample",
        Array.from(scores.slice(0, 20))
      );

      console.log(
        "Box sample",
        Array.from(boxes.slice(0, 20))
      );

      console.log(
        "Landmark sample",
        Array.from(landmarks.slice(0, 20))
      );

      console.log("================================");

    }

    const anchors =
      this.getAnchors(
        stride,
        inputSize
      );

    const count =
      Math.min(
        scores.length,
        anchors.length,
        Math.floor(boxes.length / 4),
        Math.floor(landmarks.length / 10)
      );

    for (
      let i = 0;
      i < count;
      i++
    ) {

      const score =
        scores[i];

      if (
        score <
        getConfig().confidenceThreshold
      ) {
        continue;
      }

      const anchor =
        anchors[i];

      const box =
        this.distance2bbox(
          anchor,
          boxes,
          i * 4,
          stride
        );

      const kps =
        this.distance2kps(
          anchor,
          landmarks,
          i * 10,
          stride
        );

      const x1 =
        this.clamp(
          (box.x1 - preprocess.offsetX) *
            preprocess.scaleX,
          0,
          preprocess.originalWidth
        );

      const y1 =
        this.clamp(
          (box.y1 - preprocess.offsetY) *
            preprocess.scaleY,
          0,
          preprocess.originalHeight
        );

      const x2 =
        this.clamp(
          (box.x2 - preprocess.offsetX) *
            preprocess.scaleX,
          0,
          preprocess.originalWidth
        );

      const y2 =
        this.clamp(
          (box.y2 - preprocess.offsetY) *
            preprocess.scaleY,
          0,
          preprocess.originalHeight
        );

      candidates.push({

        score,

        x1,
        y1,
        x2,
        y2,

        bbox: {
          x: x1,
          y: y1,
          width: x2 - x1,
          height: y2 - y1,
        },

   landmarks: [
  {
    x: this.clamp(
      (kps[0].x - preprocess.offsetX) * preprocess.scaleX,
      0,
      preprocess.originalWidth
    ),
    y: this.clamp(
      (kps[0].y - preprocess.offsetY) * preprocess.scaleY,
      0,
      preprocess.originalHeight
    ),
  },
  {
    x: this.clamp(
      (kps[1].x - preprocess.offsetX) * preprocess.scaleX,
      0,
      preprocess.originalWidth
    ),
    y: this.clamp(
      (kps[1].y - preprocess.offsetY) * preprocess.scaleY,
      0,
      preprocess.originalHeight
    ),
  },
  {
    x: this.clamp(
      (kps[2].x - preprocess.offsetX) * preprocess.scaleX,
      0,
      preprocess.originalWidth
    ),
    y: this.clamp(
      (kps[2].y - preprocess.offsetY) * preprocess.scaleY,
      0,
      preprocess.originalHeight
    ),
  },
  {
    x: this.clamp(
      (kps[3].x - preprocess.offsetX) * preprocess.scaleX,
      0,
      preprocess.originalWidth
    ),
    y: this.clamp(
      (kps[3].y - preprocess.offsetY) * preprocess.scaleY,
      0,
      preprocess.originalHeight
    ),
  },
  {
    x: this.clamp(
      (kps[4].x - preprocess.offsetX) * preprocess.scaleX,
      0,
      preprocess.originalWidth
    ),
    y: this.clamp(
      (kps[4].y - preprocess.offsetY) * preprocess.scaleY,
      0,
      preprocess.originalHeight
    ),
  },
],

      });

    }

  }

  return this.nms(candidates);

}
}
export const scrfd = new SCRFD();

export default scrfd;