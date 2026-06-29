import React, { useMemo } from "react";

interface VoiceWaveProps {
  listening: boolean;
  speaking?: boolean;
  size?: "sm" | "md" | "lg";
}

const VoiceWave: React.FC<VoiceWaveProps> = ({
  listening,
  speaking = false,
  size = "md",
}) => {
  const bars = useMemo(() => Array.from({ length: 12 }), []);

  const sizeClass = size === "sm" ? "h-10" : size === "lg" ? "h-24" : "h-16";

  const barBase = "w-1.5 sm:w-2 rounded-full transition-all duration-300";

  const getBarClass = (index: number) => {
    const baseDelay = index * 80;

    return `${barBase} ${
      listening
        ? "bg-red-500 animate-wave"
        : speaking
          ? "bg-blue-500 animate-wave"
          : "bg-gray-300 h-3"
    }`;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Wave */}
      <div className={`flex items-end justify-center gap-1 ${sizeClass}`}>
        {bars.map((_, index) => (
          <div
            key={index}
            className={getBarClass(index)}
            style={{
              animationDelay: `${index * 80}ms`,
            }}
          />
        ))}
      </div>

      {/* Status */}
      <div className="mt-5 text-center">
        {listening ? (
          <>
            <div className="font-bold text-red-600 text-lg sm:text-xl">
              🎤 Listening...
            </div>
            <div className="text-gray-500 text-sm sm:text-base mt-1">
              Speak naturally
            </div>
          </>
        ) : speaking ? (
          <>
            <div className="font-bold text-blue-600 text-lg sm:text-xl">
              🤖 AI Speaking...
            </div>
            <div className="text-gray-500 text-sm sm:text-base mt-1">
              Please wait
            </div>
          </>
        ) : (
          <>
            <div className="font-bold text-gray-600 text-lg sm:text-xl">
              Ready
            </div>
            <div className="text-gray-500 text-sm sm:text-base mt-1">
              Press microphone to continue
            </div>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center gap-6 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-gray-600">Listening</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-gray-600">Speaking</span>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes wave {
            0% { height: 15%; }
            25% { height: 45%; }
            50% { height: 100%; }
            75% { height: 50%; }
            100% { height: 15%; }
          }

          .animate-wave {
            animation: wave 1.1s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default VoiceWave;
