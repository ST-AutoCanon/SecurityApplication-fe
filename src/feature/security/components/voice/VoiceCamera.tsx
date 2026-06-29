import React from "react";
import Webcam from "react-webcam";
import { Camera, CheckCircle2, Loader2, ScanFace, XCircle } from "lucide-react";

interface VoiceCameraProps {
  webcamRef: React.RefObject<Webcam>;
  loading: boolean;
  modelsLoaded: boolean;
  detected: boolean;
  captured: boolean;
  onCapture: () => void;
  onCancel: () => void;
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const VoiceCamera: React.FC<VoiceCameraProps> = ({
  webcamRef,
  loading,
  modelsLoaded,
  detected,
  captured,
  onCapture,
  onCancel,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-200">
      {/* Header */}

      <div
        className="
bg-linear-to-r
from-blue-700
to-cyan-600
text-white
px-4
py-5
sm:px-6
sm:py-6
md:px-8
md:py-7
"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <ScanFace aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10" />

          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Face Verification
            </h2>

            <p className="opacity-90 mt-1">
              Please look directly at the camera
            </p>
          </div>
        </div>
      </div>

      {/* Camera */}

      <div className="p-4 sm:p-6 md:p-8">
        <div className="relative rounded-3xl overflow-hidden border-4 border-blue-500 bg-black z-0">
          <Webcam
            ref={webcamRef}
            mirrored
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="
w-full
aspect-3/4
sm:aspect-video
lg:aspect-auto
lg:h-137.5
object-cover
"
          />

          {/* Face Guide */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div
              className="
      relative
      w-40 h-56
      sm:w-52 sm:h-72
      md:w-64 md:h-80
      lg:w-72 lg:h-96
      rounded-[80px]
      sm:rounded-[100px]
      lg:rounded-[120px]
      border-[5px]
      border-cyan-400
    "
            >
              <div className="absolute left-0 top-0 w-10 h-10 border-l-4 border-t-4 border-white rounded-tl-xl" />
              <div className="absolute right-0 top-0 w-10 h-10 border-r-4 border-t-4 border-white rounded-tr-xl" />
              <div className="absolute left-0 bottom-0 w-10 h-10 border-l-4 border-b-4 border-white rounded-bl-xl" />
              <div className="absolute right-0 bottom-0 w-10 h-10 border-r-4 border-b-4 border-white rounded-br-xl" />
            </div>
          </div>

          {/* Loading */}

          {loading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
              <Loader2 size={60} className="animate-spin text-white" />

              <p className="text-white mt-4 text-base sm:text-lg md:text-xl">
                Detecting Face...
              </p>
            </div>
          )}
        </div>

        {/* Status */}

        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-4
sm:gap-5
mt-8
"
        >
          {/* Model */}

          <div className="rounded-2xl border p-4 sm:p-5 md:p-6">
            <div className="text-gray-500 text-sm">Face Model</div>

            <div className="mt-3 flex items-center gap-2">
              {modelsLoaded ? (
                <>
                  <CheckCircle2 className="text-green-600" size={24} />

                  <span className="font-semibold text-green-700">Loaded</span>
                </>
              ) : (
                <>
                  <Loader2 className="animate-spin text-orange-500" size={22} />

                  <span className="font-semibold text-orange-600">
                    Loading...
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Face */}

          <div className="rounded-2xl border p-4 sm:p-5 md:p-6">
            <div className="text-gray-500 text-sm">Face Detection</div>

            <div className="mt-3 flex items-center gap-2">
              {detected ? (
                <>
                  <CheckCircle2 className="text-green-600" size={24} />

                  <span className="font-semibold text-green-700">
                    Face Detected
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-500" size={24} />

                  <span className="font-semibold text-red-600">No Face</span>
                </>
              )}
            </div>
          </div>

          {/* Capture */}

          <div className="rounded-2xl border p-4 sm:p-5 md:p-6">
            <div className="text-gray-500 text-sm">Capture Status</div>

            <div className="mt-3 flex items-center gap-2">
              {captured ? (
                <>
                  <CheckCircle2 className="text-green-600" size={24} />

                  <span className="font-semibold text-green-700">
                    Completed
                  </span>
                </>
              ) : (
                <>
                  <Camera className="text-blue-600" size={24} />

                  <span className="font-semibold text-blue-700">Waiting</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tips */}

        <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-200 p-6">
          <h3 className="font-bold text-blue-800 mb-3">
            Tips for Best Face Detection
          </h3>

          <ul className="space-y-2 text-blue-700">
            <li>• Face should be inside the guide.</li>

            <li>• Remove sunglasses or face masks.</li>

            <li>• Keep good lighting.</li>

            <li>• Look directly at the camera.</li>

            <li>• Stay still during capture.</li>
          </ul>
        </div>

        {/* Buttons */}

        <div
          className="grid
grid-cols-1
sm:grid-cols-2
gap-4
mt-8"
        >
          <button
            onClick={onCancel}
            className="rounded-xl border border-red-400 py-4 font-semibold text-red-600 hover:bg-red-50 transition"
          >
            Cancel
          </button>

          <button
            disabled={!modelsLoaded || loading}
            onClick={onCapture}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Capturing..." : "Capture Face"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceCamera;
