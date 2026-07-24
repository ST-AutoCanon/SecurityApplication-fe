/// <reference lib="webworker" />

import * as ort from "onnxruntime-web";

let session: ort.InferenceSession | null = null;

interface InitMessage {
  type: "init";
  model: string;
}

interface RunMessage {
  type: "run";
  input: {
    data: Float32Array;
    dims: number[];
  };
}

type WorkerMessage = InitMessage | RunMessage;

self.onmessage = async (
  event: MessageEvent<WorkerMessage>
) => {
  const message = event.data;

  try {
    switch (message.type) {
      case "init": {
        session = await ort.InferenceSession.create(
          message.model,
          {
            executionProviders: ["wasm"],
          }
        );

        self.postMessage({
          type: "initialized",
        });

        break;
      }

      case "run": {
        if (!session) {
          throw new Error(
            "Inference session has not been initialized."
          );
        }

        const inputName = session.inputNames[0];

        const tensor = new ort.Tensor(
          "float32",
          message.input.data,
          message.input.dims
        );

        const outputs = await session.run({
          [inputName]: tensor,
        });

        const outputName = session.outputNames[0];

        const output = outputs[outputName] as ort.Tensor;

        self.postMessage(
          {
            type: "result",
            data: output.data,
            dims: output.dims,
          },
          [output.data.buffer]
        );

        break;
      }

      default:
        throw new Error("Unknown worker message.");
    }
  } catch (error) {
    self.postMessage({
      type: "error",
      error:
        error instanceof Error
          ? error.message
          : "Unknown worker error.",
    });
  }
};

export {};