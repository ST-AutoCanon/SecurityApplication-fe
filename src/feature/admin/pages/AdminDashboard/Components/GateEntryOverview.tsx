import React, { useState } from "react";
import {
  Building2,
  DoorOpen,
  Warehouse,
  Home,
  Landmark,
  ChevronDown,
} from "lucide-react";

interface Gate {
  id: number;
  name: string;
  gateNumber: string;
  enteredToday: number;
  inPremises: number;
  status: "Open" | "Closed";
  icon: React.ElementType;
  color: string;
  iconBg: string;
  borderColor: string;
}

const gates: Gate[] = [
  {
    id: 1,
    name: "Main Gate",
    gateNumber: "Gate 1",
    enteredToday: 128,
    inPremises: 42,
    status: "Open",
    icon: Building2,
    color: "text-teal-600",
    iconBg: "bg-teal-50",
    borderColor: "border-emerald-200",
  },
  {
    id: 2,
    name: "Tower Gate",
    gateNumber: "Gate 2",
    enteredToday: 96,
    inPremises: 31,
    status: "Open",
    icon: Landmark,
    color: "text-blue-600",
    iconBg: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: 3,
    name: "Service Gate",
    gateNumber: "Gate 3",
    enteredToday: 54,
    inPremises: 18,
    status: "Open",
    icon: DoorOpen,
    color: "text-orange-500",
    iconBg: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: 4,
    name: "Basement Gate",
    gateNumber: "Gate 4",
    enteredToday: 72,
    inPremises: 27,
    status: "Open",
    icon: Warehouse,
    color: "text-purple-600",
    iconBg: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: 5,
    name: "Event Gate",
    gateNumber: "Gate 5",
    enteredToday: 38,
    inPremises: 12,
    status: "Open",
    icon: Home,
    color: "text-cyan-600",
    iconBg: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
   {
    id: 6,
    name: "Event Gate",
    gateNumber: "Gate 5",
    enteredToday: 38,
    inPremises: 12,
    status: "Open",
    icon: Home,
    color: "text-cyan-600",
    iconBg: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
   {
    id: 7,
    name: "Event Gate",
    gateNumber: "Gate 5",
    enteredToday: 38,
    inPremises: 12,
    status: "Open",
    icon: Home,
    color: "text-cyan-600",
    iconBg: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
   {
    id: 8,
    name: "Event Gate",
    gateNumber: "Gate 5",
    enteredToday: 38,
    inPremises: 12,
    status: "Open",
    icon: Home,
    color: "text-cyan-600",
    iconBg: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
    
];

const GateEntryOverview: React.FC = () => {
  const [selectedGate, setSelectedGate] = useState("All Gates");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredGates =
    selectedGate === "All Gates"
      ? gates
      : gates.filter((gate) => gate.name === selectedGate);

  const gateOptions = ["All Gates", ...gates.map((gate) => gate.name)];

  return (
    <section className="w-full">
      {/* ------------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------------ */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-slate-900">
          Gate / Entry Point Overview
        </h2>

        {/* Gate Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex min-w-[115px] items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-slate-50"
          >
            <span>{selectedGate}</span>

            <ChevronDown
              size={15}
              className={`text-slate-500 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-30 mt-1 w-[160px] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {gateOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedGate(option);
                    setDropdownOpen(false);
                  }}
                  className={`block w-full px-3 py-2 text-left text-[12px] transition ${
                    selectedGate === option
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* Gate Cards */}
      {/* ------------------------------------------------ */}
      {/* ------------------------------------------------ */}
{/* Gate Cards - Horizontal Scroll */}
{/* ------------------------------------------------ */}
<div className="w-full overflow-x-auto pb-2">
  <div className="flex min-w-max gap-3">
    {filteredGates.map((gate) => {
      const Icon = gate.icon;

      return (
        <div
          key={gate.id}
          className={`relative min-h-[130px] w-[220px] shrink-0 rounded-xl border ${gate.borderColor} bg-white px-3 py-3 shadow-sm transition duration-200 hover:-translate-y-[1px] hover:shadow-md`}
        >
          {/* Gate Header */}
          <div className="flex items-start gap-3">
            <div
              className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl ${gate.iconBg}`}
            >
              <Icon
                size={32}
                strokeWidth={1.5}
                className={gate.color}
              />
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="truncate text-[14px] font-semibold text-slate-800">
                {gate.name}
              </h3>

              <p className="mt-0.5 text-[11px] text-slate-600">
                {gate.gateNumber}
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-medium text-slate-600">
                Entered Today
              </p>

              <p className="mt-0.5 text-[17px] font-medium leading-none text-green-600">
                {gate.enteredToday}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-medium text-slate-600">
                In Premises
              </p>

              <p className="mt-0.5 text-[17px] font-medium leading-none text-blue-600">
                {gate.inPremises}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="mt-2">
            <span
              className={`inline-flex items-center rounded-full px-4 py-1 text-[10px] font-medium ${
                gate.status === "Open"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {gate.status}
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>
    </section>
  );
};

export default GateEntryOverview;