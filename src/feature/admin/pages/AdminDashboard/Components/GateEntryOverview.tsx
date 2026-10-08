import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import {
  Building2,
  DoorOpen,
  Warehouse,
  Landmark,
  ChevronDown,
  Users,
  RefreshCw,
} from "lucide-react";

const API =
  import.meta.env.VITE_BACKEND_URL;

type Period =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

interface CategoryCount {
  category: string;
  count: number;
}

interface Gate {
  id: number;
  name: string;
  gateNumber: string;
  enteredToday: number;
  inPremises: number;
  status: "Open" | "Closed";
  categories: CategoryCount[];
}

interface GateEntryOverviewProps {
  period: Period;
}

const getGateIcon = (
  index: number
) => {
  const icons = [
    Building2,
    Landmark,
    DoorOpen,
    Warehouse,
  ];

  return icons[
    index % icons.length
  ];
};

const gateStyles = [
  {
    color: "text-teal-600",
    iconBg: "bg-teal-50",
    borderColor:
      "border-emerald-200",
  },
  {
    color: "text-blue-600",
    iconBg: "bg-blue-50",
    borderColor:
      "border-blue-200",
  },
  {
    color: "text-orange-500",
    iconBg: "bg-orange-50",
    borderColor:
      "border-orange-200",
  },
  {
    color: "text-purple-600",
    iconBg: "bg-purple-50",
    borderColor:
      "border-purple-200",
  },
];

const GateEntryOverview: React.FC<
  GateEntryOverviewProps
> = ({ period }) => {
  const [selectedGate, setSelectedGate] =
    useState("All Gates");

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [gates, setGates] =
    useState<Gate[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const fetchGateData =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await axios.get(
            `${API}/api/admin/dashboard/gate-entry-overview`,
            {
              params: {
                period,
              },
              withCredentials: true,
            }
          );

        const data =
          response.data?.data ||
          response.data;

        setGates(
          data?.gates || []
        );
      } catch (err: any) {
        console.error(
          "Gate overview error:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Unable to load gate data."
        );

        setGates([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchGateData();
  }, [period]);

  const filteredGates =
    useMemo(() => {
      if (
        selectedGate ===
        "All Gates"
      ) {
        return gates;
      }

      return gates.filter(
        (gate) =>
          gate.name ===
          selectedGate
      );
    }, [
      gates,
      selectedGate,
    ]);

  const gateOptions = [
    "All Gates",
    ...gates.map(
      (gate) => gate.name
    ),
  ];

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-slate-900">
          Gate / Entry Point Overview
        </h2>

        <div className="flex items-center gap-2">
          {/* Refresh */}
          {/* <button
            type="button"
            onClick={fetchGateData}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-blue-300 hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw
              size={14}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />
          </button> */}

          {/* Gate Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setDropdownOpen(
                  (prev) => !prev
                )
              }
              className="flex min-w-[115px] items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-slate-50"
            >
              <span>
                {selectedGate}
              </span>

              <ChevronDown
                size={15}
                className={`text-slate-500 transition-transform ${
                  dropdownOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-30 mt-1 max-h-[220px] w-[180px] overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                {gateOptions.map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSelectedGate(
                          option
                        );
                        setDropdownOpen(
                          false
                        );
                      }}
                      className={`block w-full px-3 py-2 text-left text-[12px] transition ${
                        selectedGate ===
                        option
                          ? "bg-blue-50 font-semibold text-blue-600"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-[12px] text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading &&
        gates.length === 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="h-[175px] animate-pulse rounded-xl border border-slate-200 bg-white"
                />
              )
            )}
          </div>
        )}


      {/* Empty */}
      {!loading &&
        !error &&
        filteredGates.length ===
          0 && (
          <div className="flex min-h-[150px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white">
            <div className="text-center">
              <Users
                size={28}
                className="mx-auto mb-2 text-slate-300"
              />

              <p className="text-[13px] font-medium text-slate-500">
                No gate entry data
              </p>

              <p className="mt-1 text-[11px] text-slate-400">
                No entries found for
                this period.
              </p>
            </div>
          </div>
        )}

      {/* Gate Grid */}
      {!loading &&
        filteredGates.length >
          0 && (
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGates.map(
              (gate, index) => {
                const Icon =
                  getGateIcon(
                    index
                  );

                const style =
                  gateStyles[
                    index %
                      gateStyles.length
                  ];

                return (
                  <div
                    key={gate.id}
                    className={`relative min-h-[175px] w-full rounded-xl border ${style.borderColor} bg-white px-3 py-3 shadow-sm transition duration-200 hover:-translate-y-[1px] hover:shadow-md`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-xl ${style.iconBg}`}
                      >
                        <Icon
                          size={29}
                          strokeWidth={
                            1.5
                          }
                          className={
                            style.color
                          }
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[14px] font-semibold text-slate-800">
                          {gate.name}
                        </h3>

                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {gate.gateNumber}
                        </p>
                      </div>
                    </div>

                    {/* Counts */}
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-[9px] font-medium text-slate-500">
                          People Entered
                        </p>

                        <p className="mt-0.5 text-[18px] font-semibold leading-none text-green-600">
                          {
                            gate.enteredToday
                          }
                        </p>
                      </div>

                      {/* <div className="text-right">
                        <p className="text-[9px] font-medium text-slate-500">
                          In Premises
                        </p>

                        <p className="mt-0.5 text-[18px] font-semibold leading-none text-blue-600">
                          {
                            gate.inPremises
                          }
                        </p>
                      </div> */}
                    </div>

                    {/* Category Breakdown */}
                    <div className="mt-3 border-t border-slate-100 pt-2">
                      {/* <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                        Entry Breakdown
                      </p> */}

                      {gate.categories
                        ?.length >
                      0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {gate.categories.map(
                            (
                              item
                            ) => (
                              <span
                                key={
                                  item.category
                                }
                                className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-[9px] font-medium text-slate-600"
                              >
                                <span>
                                  {
                                    item.category
                                  }
                                </span>

                                <span className="font-semibold text-slate-900">
                                  {
                                    item.count
                                  }
                                </span>
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-400">
                          No entries
                          yet
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    {/* <div className="absolute right-3 top-3">
                      <span
                        className={`rounded-full px-2 py-1 text-[8px] font-medium ${
                          gate.status ===
                          "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {
                          gate.status
                        }
                      </span>
                    </div> */}
                  </div>
                );
              }
            )}
          </div>
        )}
    </section>
  );
};

export default GateEntryOverview;