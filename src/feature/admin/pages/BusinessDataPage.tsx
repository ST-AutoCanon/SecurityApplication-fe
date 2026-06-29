import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search, RefreshCw, Database, Table2 } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL;

type TableData = {
  columns: string[];
  rows: any[];
};

export default function BusinessDataPage() {
  const [loading, setLoading] = useState(true);

  const [tables, setTables] = useState<Record<string, TableData>>({});

  const [selectedTable, setSelectedTable] = useState("");

  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/api/admin/business-data`, {
        withCredentials: true,
      });

      const data = res.data.data || {};

      setTables(data);

      if (!selectedTable && Object.keys(data).length) {
        setSelectedTable(Object.keys(data)[0]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const table = tables[selectedTable];

  const filteredRows = useMemo(() => {
    if (!table) return [];

    return table.rows.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(search.toLowerCase()),
    );
  }, [table, search]);

  const header = (text: string) =>
    text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const renderCell = (column: string, value: any) => {
    if (value == null || value === "") return "-";

    if (typeof value === "string" && value.startsWith("http")) {
      return (
        <img
          src={value}
          alt=""
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border"
        />
      );
    }

    if (
      column.includes("date") ||
      column.includes("created") ||
      column.includes("updated")
    ) {
      const d = new Date(value);

      if (!isNaN(d.getTime())) {
        return d.toLocaleString();
      }
    }

    if (column === "status" && typeof value === "string") {
      const color =
        value.toLowerCase() === "active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";

      return (
        <span
          className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${color}`}
        >
          {value}
        </span>
      );
    }

    return String(value);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg sm:text-xl font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-5 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
            Business Data
          </h1>

          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            View data from every organisation
          </p>
        </div>

        <button
          onClick={loadData}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#020b3d] hover:bg-cyan-700 text-white px-5 py-3 rounded-xl transition"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-8">
        {Object.entries(tables).map(([name, table]) => (
          <div
            key={name}
            onClick={() => setSelectedTable(name)}
            className={`cursor-pointer rounded-2xl p-6 transition shadow-md

            ${
              selectedTable === name
                ? "bg-blue-600 text-white"
                : "bg-white hover:shadow-xl"
            }`}
          >
            <Table2 className="mb-4" />

            <h3 className="font-semibold text-lg">{header(name)}</h3>

            <p className="text-4xl font-bold mt-3">{table.rows.length}</p>

            <p className="text-sm opacity-80">Records</p>
          </div>
        ))}
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 mb-6 flex items-center gap-3">
        <Search size={20} />

        <input
          className="w-full outline-none"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}

      {table && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b flex items-center gap-3">
            <Database />

            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              {header(selectedTable)}
            </h2>
          </div>

          <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
            <table className="min-w-[900px] lg:min-w-full w-full">
              <thead className="sticky top-0 bg-slate-100 z-10">
                <tr>
                  {table.columns.map((column) => (
                    <th
                      key={column}
                      className="text-left px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-semibold whitespace-nowrap"
                    >
                      {header(column)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredRows.map((row, i) => (
                  <tr key={i} className="border-t hover:bg-slate-50">
                    {table.columns.map((column) => (
                      <td
                        key={column}
                        className="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
                      >
                        {renderCell(column, row[column])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              {filteredRows.length === 0 && (
                <tr>
                  <td
                    colSpan={table.columns.length}
                    className="text-center py-10 text-gray-500"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}