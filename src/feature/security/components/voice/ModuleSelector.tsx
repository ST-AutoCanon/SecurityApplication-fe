import React from "react";
import { Bot, PlayCircle } from "lucide-react";

type Module = {
  template_id: number;
  template_name: string;
  table_name: string;
};

interface ModuleSelectorProps {
  modules: Module[];
  selectedModule: Module | null;
  loading: boolean;
  onSelect: (module: Module) => void;
  onStart: () => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  modules,
  selectedModule,
  loading,
  onSelect,
  onStart,
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 text-center sm:text-left">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
            <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Voice Registration
            </h2>

            <p className="text-sm sm:text-base text-gray-500">
              Select a registration module to begin.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Registration Module
            </label>

            <select
              value={selectedModule?.table_name || ""}
              disabled={loading}
              onChange={(e) => {
                const module = modules.find(
                  (m) => m.table_name === e.target.value,
                );

                if (module) {
                  onSelect(module);
                }
              }}
              className="
w-full
rounded-xl
border
border-gray-300
px-4
sm:px-5
py-3
sm:py-4
text-base
sm:text-lg
focus:ring-2
focus:ring-blue-500
outline-none
"
            >
              <option value="">Select Module</option>

              {modules.map((module) => (
                <option key={module.template_id} value={module.table_name}>
                  {module.template_name}
                </option>
              ))}
            </select>
          </div>

          {selectedModule && (
            <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 sm:p-5">
              <div className="text-sm text-gray-500">Selected Module</div>

              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 mt-1 wrap-break-word">
                {selectedModule.template_name}
              </div>

              <div className="text-sm mt-2 text-gray-600">
                Voice Assistant will automatically ask every field configured in
                this module.
              </div>
            </div>
          )}

          <button
            disabled={!selectedModule || loading}
            onClick={onStart}
            className="
w-full
rounded-2xl
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
disabled:opacity-40
disabled:cursor-not-allowed
flex
justify-center
items-center
gap-2
sm:gap-3
"
          >
            <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6" />

            {loading ? "Loading..." : "Start Voice Registration"}
          </button>
        </div>

        <div className="mt-8 border-t pt-5">
          <div className="text-sm text-gray-500">Voice Tips</div>

          <ul className="mt-3 space-y-2 text-sm sm:text-base text-gray-600 leading-6">
            <li>• Speak clearly and naturally.</li>
            <li>• Wait until the microphone starts listening.</li>
            <li>
              • Say <strong>"Skip"</strong> for optional fields.
            </li>
            <li>
              • Say <strong>"Repeat"</strong> to hear the question again.
            </li>
            <li>• Look directly at the camera when requested.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModuleSelector;
