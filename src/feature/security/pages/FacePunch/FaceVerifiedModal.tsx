import React from "react";
import { ScanFace } from "lucide-react";

export default function FaceVerifiedModal({
  verifiedUser,
  loading,
  onConfirm,
  onReject,
}: any) {
  if (!verifiedUser) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900/95 p-6 shadow-[0_25px_100px_rgba(0,0,0,.6)] sm:p-8">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10">
            <ScanFace size={42} className="text-cyan-400" />
          </div>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          Face Verified
        </h2>

        <p className="mt-3 text-center text-sm text-slate-400">Are you</p>

        <h3 className="mt-2 text-center text-2xl font-bold text-cyan-400 sm:text-3xl">
          {verifiedUser.full_name}
        </h3>

        <p className="mt-2 text-center text-sm capitalize text-slate-500">
          {verifiedUser.module_name}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-xl
              bg-green-500
              py-3
              font-semibold
              text-white
              transition
              hover:bg-green-600
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Yes
          </button>

          <button
            type="button"
            onClick={onReject}
            disabled={loading}
            className="
              rounded-xl
              border
              border-red-400/20
              bg-red-500/10
              py-3
              font-semibold
              text-red-300
              transition
              hover:bg-red-500
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
