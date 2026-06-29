import React from "react";
import {
  CheckCircle2,
  Home,
  RotateCcw,
  Sparkles,
  UserCheck,
} from "lucide-react";

interface SuccessScreenProps {
  moduleName?: string;
  registrationId?: string | number;
  personName?: string;
  onNewRegistration: () => void;
  onHome?: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  moduleName,
  registrationId,
  personName,
  onNewRegistration,
  onHome,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}

      <div
        className="
relative
overflow-hidden
bg-linear-to-r
from-green-600
via-emerald-500
to-green-700
px-5
py-8
sm:px-8
sm:py-10
md:px-10
md:py-12
lg:px-14
lg:py-14
text-white
"
      >
        {/* Background Glow */}

        <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30" />

            <div
              className="
relative
h-24
w-24
sm:h-28
sm:w-28
md:h-32
md:w-32
lg:h-36
lg:w-36
rounded-full
bg-white
flex
items-center
justify-center
shadow-2xl
"
            >
              <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-green-600" />
            </div>
          </div>

          <h1
            className="
mt-6
sm:mt-8
text-2xl
sm:text-3xl
md:text-4xl
lg:text-5xl
font-bold
text-center
"
          >
            Registration Successful
          </h1>

          <p
            className="
mt-4
text-sm
sm:text-base
md:text-lg
lg:text-xl
opacity-95
text-center
max-w-2xl
px-2
wrap-break-word
"
          >
            The visitor has been successfully registered.
          </p>
        </div>
      </div>

      {/* Body */}

      <div
        className="
p-4
sm:p-6
md:p-8
lg:p-10
"
      >
        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-4
sm:gap-6
"
        >
          {/* Visitor */}

          <div
            className="
rounded-2xl
border
bg-gray-50
p-4
sm:p-5
md:p-6
"
          >
            <div className="flex items-center gap-3">
              <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />

              <div>
                <div className="text-sm text-gray-500">Visitor</div>

                <div className="font-bold text-base sm:text-lg md:text-xl wrap-anywhere text-gray-800">
                  {personName || "Completed"}
                </div>
              </div>
            </div>
          </div>

          {/* Module */}

          <div
            className="
rounded-2xl
border
bg-gray-50
p-4
sm:p-5
md:p-6
"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />

              <div>
                <div className="text-sm text-gray-500">Module</div>

                <div className="font-bold text-base sm:text-lg md:text-xl wrap-anywhere text-gray-800">
                  {moduleName || "-"}
                </div>
              </div>
            </div>
          </div>

          {/* ID */}

          <div
            className="
rounded-2xl
border
bg-gray-50
p-4
sm:p-5
md:p-6
"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />

              <div>
                <div className="text-sm text-gray-500">Registration ID</div>

                <div className="font-bold text-base sm:text-lg md:text-xl wrap-anywhere text-gray-800">
                  {registrationId || "Generated"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Box */}

        <div
          className="
mt-8
rounded-2xl
bg-green-50
border
border-green-200
p-4
sm:p-6
md:p-8
"
        >
          <h2
            className="
text-xl
sm:text-2xl
md:text-3xl
font-bold
text-green-700
mb-3
"
          >
            Everything is Complete 🎉
          </h2>

          <ul
            className="
pl-5
space-y-2
text-sm
sm:text-base
leading-7
text-green-700
"
          >
            <li>✅ Dynamic form data saved successfully.</li>

            <li>✅ Face verification completed.</li>

            <li>✅ Registration stored in database.</li>

            <li>✅ Voice assistant session finished.</li>
          </ul>
        </div>

        {/* Buttons */}

        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
gap-4
sm:gap-5
mt-8
"
        >
          <button
            onClick={onNewRegistration}
            className="
rounded-xl
bg-linear-to-r
from-blue-600
to-cyan-500
text-white
py-3
sm:py-4
text-base
sm:text-lg
font-semibold
hover:scale-[1.02]
transition-all
duration-200
flex
items-center
justify-center
gap-2
sm:gap-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:ring-offset-2
"
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
            New Registration
          </button>

          {onHome && (
            <button
              onClick={onHome}
              className="rounded-xl border border-gray-300 py-4 text-base sm:text-lg md:text-xl wrap-break-word font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
              Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
