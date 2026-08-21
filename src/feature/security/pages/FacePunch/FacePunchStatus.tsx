import React from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export default function FacePunchStatus({ message, punchData }: any) {
  return (
    <>
      {/* =====================================================
          MESSAGE
      ===================================================== */}

      {message && (
        <div
          className={`rounded-2xl border p-4 ${
            message.includes("✅")
              ? "border-green-500/20 bg-green-500/10"
              : message.includes("❌")
                ? "border-red-500/20 bg-red-500/10"
                : "border-blue-500/20 bg-blue-500/10"
          }`}
        >
          <div className="flex items-start gap-3">
            {message.includes("✅") ? (
              <CheckCircle2
                className="mt-0.5 shrink-0 text-green-400"
                size={20}
              />
            ) : message.includes("❌") ? (
              <XCircle className="mt-0.5 shrink-0 text-red-400" size={20} />
            ) : (
              <Loader2
                className="mt-0.5 shrink-0 animate-spin text-blue-400"
                size={20}
              />
            )}

            <p className="text-sm font-medium text-white">{message}</p>
          </div>
        </div>
      )}

      {/* =====================================================
          PUNCH DATA
      ===================================================== */}

      {punchData && (
        <div className="space-y-3 rounded-2xl border border-green-400/20 bg-green-500/10 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-400">Name</span>

            <span className="text-right text-sm font-semibold text-white">
              {punchData.full_name}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-400">Module</span>

            <span className="text-right text-sm font-semibold capitalize text-cyan-300">
              {punchData.module_name}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-400">Punch Type</span>

            <span
              className={`text-sm font-bold ${
                punchData.punch_type === "IN"
                  ? "text-green-400"
                  : "text-orange-400"
              }`}
            >
              {punchData.punch_type}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
