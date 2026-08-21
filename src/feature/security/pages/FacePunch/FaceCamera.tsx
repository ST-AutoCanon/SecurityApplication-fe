import React from "react";
import Webcam from "react-webcam";
import { Loader2 } from "lucide-react";

export default function FaceCamera({ webcamRef, loading, onClose }: any) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md">
      <div className="flex w-full max-w-sm flex-col items-center">
        <div className="mb-5 text-center">
          <h2 className="text-lg font-bold text-white sm:text-xl">
            Face Verification
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Position your face inside the scanner
          </p>
        </div>

        <div className="relative">
          <div
            className={`
              absolute
              -inset-5
              rounded-full
              blur-2xl
              transition-all
              duration-500
              ${loading ? "bg-blue-500/25" : "bg-cyan-400/20"}
            `}
          />

          <div
            className="
              relative
              flex
              h-[250px]
              w-[250px]
              items-center
              justify-center
              rounded-full
              border-[3px]
              border-cyan-400
              bg-slate-950
              shadow-[0_0_45px_rgba(6,182,212,.45)]
              sm:h-[290px]
              sm:w-[290px]
              md:h-[320px]
              md:w-[320px]
            "
          >
            <div
              className="
                relative
                h-[228px]
                w-[228px]
                overflow-hidden
                rounded-full
                bg-black
                sm:h-[268px]
                sm:w-[268px]
                md:h-[298px]
                md:w-[298px]
              "
            >
              <Webcam
                ref={webcamRef}
                mirrored
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 720,
                  height: 720,
                  facingMode: "user",
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-black/10" />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-[15%]
                  rounded-[45%]
                  border-2
                  border-white/80
                "
              />

              <div className="pointer-events-none absolute left-[15%] top-[15%] h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-cyan-300" />

              <div className="pointer-events-none absolute right-[15%] top-[15%] h-7 w-7 rounded-tr-lg border-r-2 border-t-2 border-cyan-300" />

              <div className="pointer-events-none absolute bottom-[15%] left-[15%] h-7 w-7 rounded-bl-lg border-b-2 border-l-2 border-cyan-300" />

              <div className="pointer-events-none absolute bottom-[15%] right-[15%] h-7 w-7 rounded-br-lg border-b-2 border-r-2 border-cyan-300" />

              {!loading && (
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-[18%]
                    right-[18%]
                    top-1/2
                    h-[2px]
                    bg-cyan-400
                    shadow-[0_0_15px_rgba(34,211,238,1)]
                    animate-[scan_2s_ease-in-out_infinite]
                  "
                />
              )}

              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-[2px]">
                  <Loader2 size={38} className="animate-spin text-white" />

                  <p className="mt-3 text-xs font-semibold text-white">
                    Scanning Face...
                  </p>
                </div>
              )}
            </div>

            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />

            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />

            <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />

            <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_cyan]" />
          </div>

          <div
            className="
              absolute
              -bottom-4
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              rounded-full
              border
              border-cyan-400/30
              bg-slate-950
              px-4
              py-1.5
              text-[11px]
              font-semibold
              text-cyan-300
              shadow-xl
            "
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

            {loading ? "Scanning Face..." : "Position Face Inside Circle"}
          </div>
        </div>

        <p className="mt-9 text-center text-xs text-slate-400">
          Look directly at the camera and stay still
        </p>

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            mt-5
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-8
            py-2.5
            text-sm
            font-semibold
            text-slate-300
            transition
            hover:bg-white/10
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Close Camera
        </button>
      </div>
    </div>
  );
}
