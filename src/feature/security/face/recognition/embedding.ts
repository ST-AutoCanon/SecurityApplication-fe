import * as ort from "onnxruntime-web";

import { getConfig } from "../core/config";

export class EmbeddingProcessor {
  /**
   * Convert aligned face (112x112) to ArcFace tensor.
   * Output shape: [1, 3, 112, 112]
   */
  toTensor(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | ImageBitmap
  ): ort.Tensor {
    const inputSize = getConfig().recognitionInputSize;

    const canvas = document.createElement("canvas");
    canvas.width = inputSize;
    canvas.height = inputSize;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) {
      throw new Error("Unable to create canvas context.");
    }

    ctx.drawImage(image, 0, 0, inputSize, inputSize);

    const { data, width, height } = ctx.getImageData(
      0,
      0,
      inputSize,
      inputSize
    );

    const area = width * height;
    const tensorData = new Float32Array(area * 3);

    for (let i = 0; i < area; i++) {
      const pixel = i * 4;

      // RGB → CHW
      tensorData[i] = (data[pixel] - 127.5) / 128.0;
      tensorData[i + area] =
        (data[pixel + 1] - 127.5) / 128.0;
      tensorData[i + area * 2] =
        (data[pixel + 2] - 127.5) / 128.0;
    }

    return new ort.Tensor(
      "float32",
      tensorData,
      [1, 3, height, width]
    );
  }

  /**
   * L2 normalize embedding.
   */
  normalize(vector: Float32Array): Float32Array {
    let norm = 0;

    for (let i = 0; i < vector.length; i++) {
      norm += vector[i] * vector[i];
    }

    norm = Math.sqrt(norm);

    if (norm === 0) {
      return vector;
    }

    const normalized = new Float32Array(vector.length);

    for (let i = 0; i < vector.length; i++) {
      normalized[i] = vector[i] / norm;
    }

    return normalized;
  }

  /**
   * Convert ONNX output to normalized embedding.
   */
  fromOutput(output: ort.Tensor): Float32Array {
    return this.normalize(output.data as Float32Array);
  }

  /**
   * Embedding dimension.
   */
  dimension(vector: Float32Array): number {
    return vector.length;
  }

  /**
   * Clone embedding.
   */
  clone(vector: Float32Array): Float32Array {
    return new Float32Array(vector);
  }
}

export const embeddingProcessor =
  new EmbeddingProcessor();

export default embeddingProcessor;