import * as ort from "onnxruntime-web";

import { getConfig } from "../core/config";


// export interface PreprocessResult {
//   tensor: ort.Tensor;

//   scaleX: number;

//   scaleY: number;

//   originalWidth: number;

//   originalHeight: number;
// }


export interface PreprocessResult {
    tensor: ort.Tensor;

    scaleX: number;
    scaleY: number;

    offsetX: number;
    offsetY: number;

    originalWidth: number;
    originalHeight: number;
}



export class DetectorPreprocessor {

  preprocess(
    source:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): PreprocessResult {

    const inputSize =
      getConfig().detectorInputSize;


    const width =
      this.getWidth(source);

    const height =
      this.getHeight(source);


    const scale =
      Math.min(
        inputSize / width,
        inputSize / height
      );


    const resizedWidth =
      Math.round(width * scale);


    const resizedHeight =
      Math.round(height * scale);



    const canvas =
      document.createElement("canvas");


    canvas.width = inputSize;

    canvas.height = inputSize;



    const ctx =
      canvas.getContext(
        "2d",
        {
          willReadFrequently: true,
        }
      );


    if (!ctx) {
      throw new Error(
        "Unable to create canvas context."
      );
    }


    // black padding
    ctx.fillStyle = "black";

    ctx.fillRect(
      0,
      0,
      inputSize,
      inputSize
    );


    const offsetX =
      (inputSize - resizedWidth) / 2;


    const offsetY =
      (inputSize - resizedHeight) / 2;



    ctx.drawImage(
      source,
      offsetX,
      offsetY,
      resizedWidth,
      resizedHeight
    );



    const imageData =
      ctx.getImageData(
        0,
        0,
        inputSize,
        inputSize
      );


    const tensor =
      this.imageDataToTensor(
        imageData
      );

    
    return {
    tensor,

    scaleX: 1 / scale,
    scaleY: 1 / scale,

    offsetX,
    offsetY,

    originalWidth: width,
    originalHeight: height,
};


   
  }



  private imageDataToTensor(
    imageData: ImageData
  ): ort.Tensor {


    const {
      data,
      width,
      height,
    } = imageData;



    const area =
      width * height;



    const floatData =
      new Float32Array(
        area * 3
      );



    for (
      let i = 0;
      i < area;
      i++
    ) {

      const pixel =
        i * 4;


      floatData[i] =
        (data[pixel] - 127.5) /
        128.0;



      floatData[i + area] =
        (data[pixel + 1] - 127.5) /
        128.0;



      floatData[i + area * 2] =
        (data[pixel + 2] - 127.5) /
        128.0;

    }



    return new ort.Tensor(
      "float32",
      floatData,
      [
        1,
        3,
        height,
        width,
      ]
    );
  }



  private getWidth(
    source:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): number {

    if (
      source instanceof HTMLVideoElement
    ) {
      return source.videoWidth;
    }


    return source.width;
  }



  private getHeight(
    source:
      | HTMLImageElement
      | HTMLCanvasElement
      | HTMLVideoElement
      | ImageBitmap
  ): number {

    if (
      source instanceof HTMLVideoElement
    ) {
      return source.videoHeight;
    }


    return source.height;
  }

}



export const detectorPreprocessor =
  new DetectorPreprocessor();


export default detectorPreprocessor;