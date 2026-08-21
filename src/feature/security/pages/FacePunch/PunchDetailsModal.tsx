import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function PunchDetailsModal({
  verifiedUser,
  activePunchField,
  apartmentNumber,
  vehicleNumber,
  punchDetailsListening,
  loading,

  onStartListening,
  onSkipApartment,
  onSkipVehicle,
  onConfirm,
  onCancel,
}: any) {
  if (!verifiedUser) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl">
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-[0_30px_120px_rgba(0,0,0,0.75)]">
        {/* =====================================================
            APARTMENT
        ===================================================== */}

        {activePunchField === "apartment" && (
          <div className="px-6 py-8 sm:px-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">
                <span className="text-3xl">🏠</span>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                Apartment Number
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Please provide your apartment number
              </p>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => onStartListening("apartment")}
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-cyan-400/30
                bg-cyan-400/10
                py-5
                text-white
                transition
                hover:bg-cyan-400/20
                disabled:opacity-50
              "
            >
              <span className="text-2xl">🎤</span>

              <span className="font-semibold">
                {punchDetailsListening
                  ? "Listening..."
                  : "Speak Apartment Number"}
              </span>
            </button>

            {apartmentNumber && (
              <div className="mt-4 rounded-xl bg-green-500/10 p-4 text-center">
                <p className="text-xs text-slate-500">Captured</p>

                <p className="mt-1 text-lg font-bold text-green-400">
                  {apartmentNumber}
                </p>
              </div>
            )}

            <button
              type="button"
              disabled={loading}
              onClick={onSkipApartment}
              className="
                mt-4
                w-full
                rounded-xl
                border
                border-yellow-400/20
                bg-yellow-400/10
                py-3
                text-sm
                font-semibold
                text-yellow-300
                hover:bg-yellow-400/20
              "
            >
              Skip Apartment
            </button>
          </div>
        )}

        {/* =====================================================
            VEHICLE
        ===================================================== */}

        {activePunchField === "vehicle" && (
          <div className="px-6 py-8 sm:px-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10">
                <span className="text-3xl">🚗</span>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                Vehicle Number
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Please provide your vehicle number
              </p>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => onStartListening("vehicle")}
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-cyan-400/30
                bg-cyan-400/10
                py-5
                text-white
                transition
                hover:bg-cyan-400/20
                disabled:opacity-50
              "
            >
              <span className="text-2xl">🎤</span>

              <span className="font-semibold">
                {punchDetailsListening
                  ? "Listening..."
                  : "Speak Vehicle Number"}
              </span>
            </button>

            {vehicleNumber && (
              <div className="mt-4 rounded-xl bg-green-500/10 p-4 text-center">
                <p className="text-xs text-slate-500">Captured</p>

                <p className="mt-1 text-lg font-bold uppercase text-green-400">
                  {vehicleNumber}
                </p>
              </div>
            )}

            <button
              type="button"
              disabled={loading}
              onClick={onSkipVehicle}
              className="
                mt-4
                w-full
                rounded-xl
                border
                border-yellow-400/20
                bg-yellow-400/10
                py-3
                text-sm
                font-semibold
                text-yellow-300
                hover:bg-yellow-400/20
              "
            >
              Skip Vehicle
            </button>
          </div>
        )}

        {/* =====================================================
            REVIEW
        ===================================================== */}

        {activePunchField === null && (
          <div className="px-6 py-8 sm:px-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-400/10">
                <CheckCircle2 size={34} className="text-green-400" />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                Review Details
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Please confirm your punch
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-4">
                <span className="text-sm text-slate-500">Apartment</span>

                <span className="font-semibold text-white">
                  {apartmentNumber || "Not provided"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-4">
                <span className="text-sm text-slate-500">Vehicle</span>

                <span className="font-semibold uppercase text-white">
                  {vehicleNumber || "Not provided"}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className="
                mt-6
                w-full
                rounded-xl
                bg-green-500
                py-4
                font-bold
                text-white
                transition
                hover:bg-green-600
                disabled:opacity-50
              "
            >
              {loading ? "Saving..." : "Confirm Punch"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={onCancel}
              className="
                mt-3
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                py-3
                font-semibold
                text-slate-400
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
