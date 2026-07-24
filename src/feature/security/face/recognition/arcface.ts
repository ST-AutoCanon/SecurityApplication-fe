import * as ort from "onnxruntime-web";

import { sessionManager } from "../core/session";
import { embeddingProcessor } from "./embedding";

export class ArcFaceRecognizer {
  private get session(): ort.InferenceSession {
    return sessionManager.recognizer;
  }

  /**
   * Generate a normalized 512-D embedding from an aligned face.
   * Input image must already be aligned to 112x112.
   */
  async getEmbedding(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | ImageBitmap
  ): Promise<Float32Array> {
    const tensor = embeddingProcessor.toTensor(image);

    const inputName = this.session.inputNames[0];

    const outputs = await this.session.run({
      [inputName]: tensor,
    });

    const outputName = this.session.outputNames[0];

    const embedding = outputs[outputName] as ort.Tensor;

    return embeddingProcessor.fromOutput(embedding);
  }

  /**
   * Generate embeddings for multiple aligned faces.
   */
  async getEmbeddings(
    images: (
      | HTMLCanvasElement
      | HTMLImageElement
      | ImageBitmap
    )[]
  ): Promise<Float32Array[]> {
    const results: Float32Array[] = [];

    for (const image of images) {
      results.push(await this.getEmbedding(image));
    }

    return results;
  }

  /**
   * Returns embedding size (typically 512).
   */
  async embeddingSize(
    image:
      | HTMLCanvasElement
      | HTMLImageElement
      | ImageBitmap
  ): Promise<number> {
    const embedding = await this.getEmbedding(image);
    return embedding.length;
  }
}

export const arcFaceRecognizer = new ArcFaceRecognizer();

export default arcFaceRecognizer;