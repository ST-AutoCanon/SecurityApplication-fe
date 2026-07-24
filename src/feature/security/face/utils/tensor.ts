import * as ort from "onnxruntime-web";

export class TensorUtils {
  /**
   * Create a Float32 ONNX tensor.
   */
  createFloat32(
    data: Float32Array,
    dims: readonly number[]
  ): ort.Tensor {
    return new ort.Tensor("float32", data, [...dims]);
  }

  /**
   * Create an Int64 ONNX tensor.
   */
  createInt64(
    data: BigInt64Array,
    dims: readonly number[]
  ): ort.Tensor {
    return new ort.Tensor("int64", data, [...dims]);
  }

  /**
   * Clone a tensor.
   */
  clone(tensor: ort.Tensor): ort.Tensor {
    const data = (tensor.data as Float32Array).slice();

    return new ort.Tensor(
      tensor.type,
      data,
      [...tensor.dims]
    );
  }

  /**
   * Flatten nested arrays.
   */
  flatten(values: number[][]): Float32Array {
    const flattened = values.flat();

    return new Float32Array(flattened);
  }

  /**
   * Convert ImageData (RGBA) to CHW Float32 tensor.
   */
  fromImageData(
    imageData: ImageData,
    normalize = true
  ): ort.Tensor {
    const { data, width, height } = imageData;

    const area = width * height;
    const output = new Float32Array(area * 3);

    for (let i = 0; i < area; i++) {
      const pixel = i * 4;

      let r = data[pixel];
      let g = data[pixel + 1];
      let b = data[pixel + 2];

      if (normalize) {
        r = (r - 127.5) / 128;
        g = (g - 127.5) / 128;
        b = (b - 127.5) / 128;
      }

      output[i] = r;
      output[i + area] = g;
      output[i + area * 2] = b;
    }

    return new ort.Tensor(
      "float32",
      output,
      [1, 3, height, width]
    );
  }

  /**
   * Convert tensor to Float32Array.
   */
  toFloat32(tensor: ort.Tensor): Float32Array {
    return tensor.data as Float32Array;
  }

  /**
   * Return tensor shape.
   */
  shape(tensor: ort.Tensor): number[] {
    return [...tensor.dims];
  }

  /**
   * Number of elements.
   */
  size(tensor: ort.Tensor): number {
    return tensor.dims.reduce(
      (acc, dim) => acc * dim,
      1
    );
  }

  /**
   * Validate tensor dimensions.
   */
  validate(
    tensor: ort.Tensor,
    expected: readonly number[]
  ): boolean {
    if (tensor.dims.length !== expected.length) {
      return false;
    }

    return tensor.dims.every(
      (dim, index) => dim === expected[index]
    );
  }
}

export const tensorUtils = new TensorUtils();

export default tensorUtils;