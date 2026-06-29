import React from "react";
import {
  Mic,
  MicOff,
  RotateCcw,
  SkipForward,
  CheckCircle,
  Volume2,
} from "lucide-react";

type Field = {
  field_key: string;
  field_label: string;
  is_required: boolean;
};

interface VoiceQuestionProps {
  field: Field | null;
  currentStep: number;
  totalSteps: number;
  transcript: string;
  listening: boolean;
  speaking: boolean;
  processing: boolean;
  onStartListening: () => void;
  onRepeat: () => void;
  onSkip: () => void;
  onNext: () => void;
}

const VoiceQuestion: React.FC<VoiceQuestionProps> = ({
  field,
  currentStep,
  totalSteps,
  transcript,
  listening,
  speaking,
  processing,
  onStartListening,
  onRepeat,
  onSkip,
  onNext,
}) => {
  if (!field) return null;

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              AI Voice Assistant
            </h2>
            <p className="opacity-90 text-sm sm:text-base">
              Answer the following question
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <div className="text-xs sm:text-sm opacity-80">Step</div>
            <div className="text-2xl sm:text-3xl font-bold">
              {currentStep + 1}
              <span className="text-sm sm:text-lg font-normal">
                /{totalSteps}
              </span>
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-4 sm:mt-5 h-2 sm:h-3 rounded-full bg-white/20 overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-white transition-all duration-500"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-6 md:p-10">
        {/* QUESTION */}
        <div className="text-center">
          <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest mb-2">
            Current Question
          </div>

          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 break-words">
            {field.field_label}
          </h1>

          {!field.is_required && (
            <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs sm:text-sm">
              Optional Field
            </div>
          )}
        </div>

        {/* SPEAKING */}
        {speaking && (
          <div className="mt-6 sm:mt-10 flex justify-center">
            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-blue-100 text-sm sm:text-base">
              <Volume2
                size={18}
                className="sm:w-5 sm:h-5 text-blue-700 animate-pulse"
              />
              <span className="font-medium text-blue-700">
                AI is asking the question...
              </span>
            </div>
          </div>
        )}

        {/* MIC */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <button
            onClick={onStartListening}
            disabled={listening || processing}
            className={`relative h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-full flex items-center justify-center transition-all duration-300 ${
              listening
                ? "bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.6)]"
                : "bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105"
            }`}
          >
            {listening ? (
              <>
                <Mic size={40} className="sm:w-14 sm:h-14 text-white" />
                <span className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
                <span className="absolute inset-3 rounded-full border-2 border-red-200 animate-ping delay-150" />
              </>
            ) : (
              <Mic size={40} className="sm:w-14 sm:h-14 text-white" />
            )}
          </button>
        </div>

        {/* STATUS */}
        <div className="mt-6 sm:mt-8 text-center">
          {listening ? (
            <div className="text-red-500 text-lg sm:text-xl font-bold">
              🎤 Listening...
            </div>
          ) : (
            <div className="text-gray-500 text-sm sm:text-lg">
              Tap the microphone to answer
            </div>
          )}
        </div>

        {/* TRANSCRIPT */}
        <div className="mt-6 sm:mt-10">
          <div className="text-gray-500 mb-2 sm:mb-3 font-semibold text-sm sm:text-base">
            Your Response
          </div>

          <div className="min-h-[90px] sm:min-h-[110px] rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 p-4 sm:p-6 text-base sm:text-xl break-words">
            {transcript ? (
              transcript
            ) : (
              <span className="text-gray-400">Waiting for your answer...</span>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-10">
          <button
            onClick={onRepeat}
            className="rounded-xl border border-gray-300 py-3 text-sm sm:text-base font-semibold hover:bg-gray-100 flex justify-center items-center gap-2"
          >
            <RotateCcw size={16} />
            Repeat
          </button>

          <button
            onClick={onSkip}
            disabled={field.is_required}
            className="rounded-xl border border-gray-300 py-3 text-sm sm:text-base font-semibold hover:bg-gray-100 disabled:opacity-40 flex justify-center items-center gap-2"
          >
            <SkipForward size={16} />
            Skip
          </button>

          <button
            onClick={onStartListening}
            disabled={listening}
            className="rounded-xl bg-blue-600 text-white py-3 text-sm sm:text-base font-semibold hover:bg-blue-700 flex justify-center items-center gap-2"
          >
            {listening ? (
              <>
                <MicOff size={16} />
                Listening
              </>
            ) : (
              <>
                <Mic size={16} />
                Listen
              </>
            )}
          </button>

          <button
            onClick={onNext}
            className="rounded-xl bg-green-600 text-white py-3 text-sm sm:text-base font-semibold hover:bg-green-700 flex justify-center items-center gap-2"
          >
            <CheckCircle size={16} />
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceQuestion;
