import React from "react";
import {
  CheckCircle2,
  User,
  Send,
  Edit,
  Image as ImageIcon,
  ScanFace,
} from "lucide-react";

interface VoiceSummaryProps {
  moduleName?: string;
  form: Record<string, any>;
  loading: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

const formatLabel = (key: string) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const VoiceSummary: React.FC<VoiceSummaryProps> = ({
  moduleName,
  form,
  loading,
  onSubmit,
  onBack,
}) => {
  const entries = Object.entries(form);

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-4 sm:p-6 md:p-8">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <CheckCircle2 size={28} className="sm:w-8 sm:h-8" />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Review Information
            </h2>
            <p className="text-sm sm:text-base opacity-90">
              Verify all details before submission
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-6 md:p-8">
        {/* MODULE */}
        {moduleName && (
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 sm:p-5 mb-6 sm:mb-8">
            <div className="text-xs sm:text-sm text-gray-500">
              Registration Module
            </div>
            <div className="text-lg sm:text-xl font-bold text-blue-700 mt-1 break-words">
              {moduleName}
            </div>
          </div>
        )}

        {/* FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {entries.map(([key, value]) => {
            const lower = key.toLowerCase();

            // FACE
            if (lower.includes("face_descriptor")) {
              return (
                <div
                  key={key}
                  className="rounded-2xl border p-4 sm:p-5 bg-green-50"
                >
                  <div className="flex items-start gap-3">
                    <ScanFace className="text-green-600 shrink-0" size={24} />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-gray-500">
                        {formatLabel(key)}
                      </div>
                      <div className="font-semibold text-green-700 text-sm sm:text-base">
                        Face Registered
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // IMAGE
            if (lower.includes("profile_photo") || lower.includes("photo")) {
              return (
                <div key={key} className="rounded-2xl border p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <ImageIcon className="text-blue-600 shrink-0" size={24} />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-gray-500">
                        {formatLabel(key)}
                      </div>
                      <div className="font-semibold text-sm sm:text-base">
                        Photo Captured
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // NORMAL FIELD
            return (
              <div
                key={key}
                className="rounded-2xl border p-4 sm:p-5 hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-3">
                  <User className="text-blue-600 mt-0.5 shrink-0" size={20} />

                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm text-gray-500">
                      {formatLabel(key)}
                    </div>

                    <div className="font-semibold text-gray-800 mt-1 text-sm sm:text-base break-words">
                      {String(value || "-")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* STATS */}
        <div className="mt-6 sm:mt-8 rounded-2xl bg-gray-50 border p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-center sm:text-left">
            <div>
              <div className="text-xs sm:text-sm text-gray-500">
                Total Fields
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                {entries.length}
              </div>
            </div>

            <div>
              <div className="text-xs sm:text-sm text-gray-500">Completion</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600">
                100%
              </div>
            </div>

            <div>
              <div className="text-xs sm:text-sm text-gray-500">Status</div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                Ready
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={onBack}
            className="rounded-xl border border-blue-400 text-blue-600 py-3 sm:py-4 font-semibold hover:bg-blue-50 flex justify-center items-center gap-2"
          >
            <Edit size={18} />
            Review Again
          </button>

          <button
            disabled={loading}
            onClick={onSubmit}
            className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 sm:py-4 font-semibold hover:scale-[1.02] transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            <Send size={18} />
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceSummary;
