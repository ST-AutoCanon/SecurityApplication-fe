
// import React, { useEffect, useMemo, useState } from "react";
// import {
//     Calculator,
//     Building2,
//     Layers,
//     Plus,
//     Trash2,
//     Save,
//     RefreshCw,
//     Eye,
//     Settings,
//     IndianRupee,
//     AlertCircle,
// } from "lucide-react";

// import {
//     emptySettings,
//     getMaintenanceSettings,
//     saveMaintenanceSettings,
//     getMaintenancePreview,
//     type MaintenanceSettings,
//     type MaintenancePreview,
//     type CalculationMethod,
//     type BhkRate,
//     type FloorCharge,
//     type SpecialCharge,
//     type LateRule,
// } from "./apartmentMaintenance.service";

// type SectionKey =
//     | "base"
//     | "bhk"
//     | "floor"
//     | "special"
//     | "late"
//     | "preview";

// const sections: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
//     { key: "base", label: "Base Charges", icon: <Calculator size={17} /> },
//     { key: "bhk", label: "BHK Mapping", icon: <Building2 size={17} /> },
//     { key: "floor", label: "Floor Charges", icon: <Layers size={17} /> },
//     { key: "special", label: "Special Charges", icon: <IndianRupee size={17} /> },
//     { key: "late", label: "Late Payment", icon: <AlertCircle size={17} /> },
//     { key: "preview", label: "Preview & Apply", icon: <Eye size={17} /> },
// ];

// const inputClass =
//     "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

// const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

// const numberValue = (value: string) =>
//     value === "" ? "" : Number(value);

// const createSpecialCharge = (): SpecialCharge => ({
//     charge_name: "",
//     amount: "",
//     charge_type: "recurring",
//     frequency: "monthly",
//     interval_months: 1,
//     payable_months: "",
//     applicable_units: "all",
//     effective_from: "",
//     effective_to: "",
// });

// const createLateRule = (): LateRule => ({
//     delay_from_days: 1,
//     delay_to_days: 10,
//     fee_type: "fixed",
//     fee_value: "",
// });

// const createFloorCharge = (): FloorCharge => ({
//     floor_from: "",
//     floor_to: "",
//     monthly_amount: "",
//     applicable_units: "all",
// });

// export default function ApartmentMaintenance() {
//     const [activeSection, setActiveSection] = useState<SectionKey>("base");
//     const [settings, setSettings] =
//         useState<MaintenanceSettings>(emptySettings);

//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     const [selectedFlatId, setSelectedMember] = useState("");
//     const [billingMonth, setBillingMonth] = useState(
//         new Date().toISOString().slice(0, 7),
//     );
//     const [preview, setPreview] = useState<MaintenancePreview | null>(null);
//     const [previewLoading, setPreviewLoading] = useState(false);

//     const updateSettings = <K extends keyof MaintenanceSettings>(
//         key: K,
//         value: MaintenanceSettings[K],
//     ) => {
//         setSettings((previous) => ({ ...previous, [key]: value }));
//     };

//     useEffect(() => {
//         loadSettings();
//     }, []);

//     const loadSettings = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             const response = await getMaintenanceSettings();

//             // Supports the expanded response and the existing legacy settings.
//             const data = response?.data ?? response;
//             const oldBhkRates = data.bhk_rates;

//             const normalizedBhkRates: BhkRate[] = Array.isArray(oldBhkRates)
//                 ? oldBhkRates
//                 : oldBhkRates && typeof oldBhkRates === "object"
//                     ? Object.entries(oldBhkRates).map(([bhk, amount]) => ({
//                         bhk_type: `${bhk} BHK`,
//                         min_area: "",
//                         max_area: "",
//                         monthly_amount: Number(amount || 0),
//                     }))
//                     : emptySettings.bhk_rates;

//             //   setSettings({
//             //     ...emptySettings,
//             //     ...data,
//             //     calculation_method:
//             //       data.calculation_method === "fixed"
//             //         ? "fixed"
//             //         : data.calculation_method === "area"
//             //           ? "area"
//             //           : data.calculation_method === "floor"
//             //             ? "floor"
//             //             : "bhk",
//             //     rate_per_sqft: data.rate_per_sqft ?? 0,
//             //     fixed_monthly_amount: data.fixed_monthly_amount ?? 0,
//             //     bhk_rates:
//             //       Array.isArray(data.bhk_rates) &&
//             //       data.bhk_rates.length > 0 &&
//             //       !Array.isArray(data.bhk_rates)
//             //         ? data.bhk_rates
//             //         : emptySettings.bhk_rates,
//             //     floor_charges: data.floor_charges ?? [],
//             //     special_charges: data.special_charges ?? [],
//             //     late_rules: data.late_rules ?? [],
//             //     units: data.units ?? [],
//             //   });

//             setSettings({
//                 ...emptySettings,
//                 ...data,
//                 calculation_method:
//   data.calculation_method === "PER_SQFT" ||
//   data.calculation_method === "area"
//     ? "area"
//     : data.calculation_method === "FLAT_AMOUNT" ||
//         data.calculation_method === "fixed"
//       ? "fixed"
//       : data.calculation_method === "FLOOR_WISE" ||
//           data.calculation_method === "floor"
//         ? "floor"
//         : "bhk",               
//          applicable_for: data.applicable_for ?? "all",
//                 effective_from: data.effective_from
//                     ? String(data.effective_from).slice(0, 10)
//                     : "",
//                 description: data.description ?? "",
//                 rate_per_sqft: data.rate_per_sqft ?? 0,
//                 fixed_monthly_amount: data.fixed_monthly_amount ?? 0,
//                 bhk_rates: normalizedBhkRates,
//                 floor_charges: data.floor_charges ?? [],
//                 special_charges: data.special_charges ?? [],
//                 late_rules: data.late_rules ?? [],
//                 units: data.units ?? [],

//             });
//         } catch (err: any) {
//             setError(
//                 err?.response?.data?.message ||
//                 "Unable to load apartment maintenance settings.",
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSave = async () => {
//         try {
//             setSaving(true);
//             setError("");
//             setSuccess("");

//             await saveMaintenanceSettings(settings);

//             setSuccess("Maintenance configuration saved successfully.");
//         } catch (err: any) {
//             setError(
//                 err?.response?.data?.message ||
//                 "Unable to save maintenance configuration.",
//             );
//         } finally {
//             setSaving(false);
//         }
//     };

//     const updateBhkRate = (
//         index: number,
//         key: keyof BhkRate,
//         value: string,
//     ) => {
//         const updated = [...settings.bhk_rates];
//         updated[index] = {
//             ...updated[index],
//             [key]:
//                 key === "bhk_type"
//                     ? value
//                     : numberValue(value),
//         };
//         updateSettings("bhk_rates", updated);
//     };

//     const addBhkRate = () => {
//         updateSettings("bhk_rates", [
//             ...settings.bhk_rates,
//             {
//                 bhk_type: "",
//                 min_area: "",
//                 max_area: "",
//                 monthly_amount: "",
//             },
//         ]);
//     };

//     const updateFloorCharge = (
//         index: number,
//         key: keyof FloorCharge,
//         value: string,
//     ) => {
//         const updated = [...settings.floor_charges];
//         updated[index] = {
//             ...updated[index],
//             [key]:
//                 key === "monthly_amount"
//                     ? numberValue(value)
//                     : value,
//         };
//         updateSettings("floor_charges", updated);
//     };

//     const updateSpecialCharge = (
//         index: number,
//         key: keyof SpecialCharge,
//         value: string,
//     ) => {
//         const updated = [...settings.special_charges];
//         updated[index] = {
//             ...updated[index],
//             [key]:
//                 key === "amount" || key === "interval_months"
//                     ? numberValue(value)
//                     : value,
//         } as SpecialCharge;
//         updateSettings("special_charges", updated);
//     };

//     const updateLateRule = (
//         index: number,
//         key: keyof LateRule,
//         value: string,
//     ) => {
//         const updated = [...settings.late_rules];
//         updated[index] = {
//             ...updated[index],
//             [key]:
//                 key === "fee_value" ||
//                     key === "delay_from_days" ||
//                     key === "delay_to_days"
//                     ? numberValue(value)
//                     : value,
//         } as LateRule;
//         updateSettings("late_rules", updated);
//     };

//     const runPreview = async () => {
//         if (!selectedFlatId) {
//             setError("Please select an apartment member first.");
//             return;
//         }

//         try {
//             setPreviewLoading(true);
//             setError("");
//             setPreview(null);

//             // const response = await getMaintenancePreview(
//             //     Number(selectedMember),
//             //     billingMonth,
//             // );
//             const response = await getMaintenancePreview(
//   Number(selectedFlatId),
//   billingMonth
// );

//             setPreview(response?.data ?? response);
//         } catch (err: any) {
//             setError(
//                 err?.response?.data?.message ||
//                 "Unable to calculate maintenance preview.",
//             );
//         } finally {
//             setPreviewLoading(false);
//         }
//     };

//     const selectedUnit = useMemo(
//         () =>
//             settings.units.find(
//                 (unit) => String(unit.id) === selectedFlatId,
//             ),
//         [settings.units, selectedFlatId],
//     );

//     const money = (value: number | string | undefined) =>
//         `₹${Number(value || 0).toLocaleString("en-IN", {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//         })}`;

//     if (loading) {
//         return (
//             <div className="flex min-h-[60vh] items-center justify-center">
//                 <div className="flex items-center gap-3 text-sm text-slate-600">
//                     <RefreshCw className="animate-spin" size={20} />
//                     Loading maintenance settings...
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-7">
//             <div className="mx-auto max-w-7xl space-y-6">
//                 {/* PAGE HEADER */}
//                 <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//                     <div>
//                         <div className="flex items-center gap-2 text-blue-700">
//                             <Settings size={20} />
//                             <span className="text-xs font-semibold uppercase tracking-wider">
//                                 Apartment Management
//                             </span>
//                         </div>
//                         <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
//                             Apartment Maintenance
//                         </h1>
//                         <p className="mt-1 text-sm text-slate-500">
//                             Configure monthly maintenance charges and billing rules.
//                         </p>
//                     </div>

//                     <button
//                         type="button"
//                         onClick={handleSave}
//                         disabled={saving}
//                         className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//                     >
//                         {saving ? (
//                             <RefreshCw size={17} className="animate-spin" />
//                         ) : (
//                             <Save size={17} />
//                         )}
//                         {saving ? "Saving..." : "Save Configuration"}
//                     </button>
//                 </div>

//                 {error && (
//                     <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                         {error}
//                     </div>
//                 )}

//                 {success && (
//                     <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//                         {success}
//                     </div>
//                 )}

//                 {/* SECTION NAVIGATION */}
//                 <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
//                     <div className="flex min-w-max gap-2">
//                         {sections.map((section) => (
//                             <button
//                                 key={section.key}
//                                 type="button"
//                                 onClick={() => {
//                                     setActiveSection(section.key);
//                                     setError("");
//                                     setSuccess("");
//                                 }}
//                                 className={`inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${activeSection === section.key
//                                         ? "bg-blue-600 text-white shadow-sm"
//                                         : "text-slate-600 hover:bg-slate-100"
//                                     }`}
//                             >
//                                 {section.icon}
//                                 {section.label}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* SECTION 1: BASE CHARGES */}
//                 {/* {activeSection === "base" && (
//                     <SectionCard
//                         title="Base Maintenance Charges"
//                         description="Choose how the monthly base maintenance amount is calculated."
//                     >
//                         <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//                             {(
//                                 [
//                                     ["bhk", "Per BHK", "Charge according to flat BHK type."],
//                                     ["area", "Per Sq.ft", "Charge according to carpet or built-up area."],
//                                     ["floor", "Floor Wise", "Use configured floor-wise charges."],
//                                     ["fixed", "Flat Amount", "Same monthly amount for each unit."],
//                                 ] as [CalculationMethod, string, string][]
//                             ).map(([value, title, description]) => (
//                                 <button
//                                     key={value}
//                                     type="button"
//                                     onClick={() => updateSettings("calculation_method", value)}
//                                     className={`rounded-xl border p-4 text-left transition ${settings.calculation_method === value
//                                             ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
//                                             : "border-slate-200 bg-white hover:border-blue-200"
//                                         }`}
//                                 >
//                                     <div className="flex items-center justify-between">
//                                         <span className="font-semibold text-slate-800">
//                                             {title}
//                                         </span>
//                                         <span
//                                             className={`h-4 w-4 rounded-full border-2 ${settings.calculation_method === value
//                                                     ? "border-blue-600 bg-blue-600 ring-2 ring-white"
//                                                     : "border-slate-300"
//                                                 }`}
//                                         />
//                                     </div>
//                                     <p className="mt-2 text-xs leading-5 text-slate-500">
//                                         {description}
//                                     </p>
//                                 </button>
//                             ))}
//                         </div>

//                         {settings.calculation_method === "area" && (
//                             <div className="mt-6 max-w-sm">
//                                 <label className={labelClass}>
//                                     Rate per Sq.ft (₹)
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min="0"
//                                     step="0.01"
//                                     className={inputClass}
//                                     value={settings.rate_per_sqft}
//                                     onChange={(e) =>
//                                         updateSettings(
//                                             "rate_per_sqft",
//                                             numberValue(e.target.value),
//                                         )
//                                     }
//                                 />
//                             </div>
//                         )}

//                         {settings.calculation_method === "fixed" && (
//                             <div className="mt-6 max-w-sm">
//                                 <label className={labelClass}>
//                                     Monthly Amount per Flat (₹)
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min="0"
//                                     step="0.01"
//                                     className={inputClass}
//                                     value={settings.fixed_monthly_amount}
//                                     onChange={(e) =>
//                                         updateSettings(
//                                             "fixed_monthly_amount",
//                                             numberValue(e.target.value),
//                                         )
//                                     }
//                                 />
//                             </div>
//                         )}

//                         {settings.calculation_method === "bhk" && (
//                             <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
//                                 Configure the monthly amount for each BHK type in the
//                                 <strong> BHK Mapping </strong>
//                                 section.
//                             </p>
//                         )}

//                         {settings.calculation_method === "floor" && (
//                             <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
//                                 Configure the applicable floor ranges in the
//                                 <strong> Floor Charges </strong>
//                                 section.
//                             </p>
//                         )}
//                     </SectionCard>
//                 )} */}

// {activeSection === "base" && (
//   <SectionCard
//     title="Base Maintenance Charges"
//     description="Configure the basic monthly maintenance amount and its applicability."
//   >
//     {/* CALCULATION METHOD */}
//     <div>
//       <label className={labelClass}>Calculation Method</label>
// {/*             ["floor", "Floor Wise", "Use configured floor-wise charges."],
//  */}
//       <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//         {(
//           [
//             ["bhk", "Per BHK", "Charge according to flat BHK type."],
//             ["area", "Per Sq.ft", "Charge according to flat area."],
//             ["fixed", "Flat Amount", "Same monthly amount for each unit."],
//           ] as [CalculationMethod, string, string][]
//         ).map(([value, title, description]) => (
//           <button
//             key={value}
//             type="button"
//             onClick={() =>
//               updateSettings("calculation_method", value)
//             }
//             className={`rounded-xl border p-4 text-left transition ${
//               settings.calculation_method === value
//                 ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
//                 : "border-slate-200 bg-white hover:border-blue-200"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <span className="font-semibold text-slate-800">
//                 {title}
//               </span>

//               <span
//                 className={`h-4 w-4 rounded-full border-2 ${
//                   settings.calculation_method === value
//                     ? "border-blue-600 bg-blue-600 ring-2 ring-white"
//                     : "border-slate-300"
//                 }`}
//               />
//             </div>

//             <p className="mt-2 text-xs leading-5 text-slate-500">
//               {description}
//             </p>
//           </button>
//         ))}
//       </div>
//     </div>

//     {/* METHOD-SPECIFIC AMOUNT */}
//     {settings.calculation_method === "area" && (
//       <div className="mt-6 max-w-sm">
//         <label className={labelClass}>Rate per Sq.ft (₹)</label>
//         <input
//           type="number"
//           min="0"
//           step="0.01"
//           className={inputClass}
//           value={settings.rate_per_sqft}
//           onChange={(e) =>
//             updateSettings(
//               "rate_per_sqft",
//               numberValue(e.target.value),
//             )
//           }
//         />
//       </div>
//     )}

//     {settings.calculation_method === "fixed" && (
//       <div className="mt-6 max-w-sm">
//         <label className={labelClass}>
//           Monthly Amount per Flat (₹)
//         </label>
//         <input
//           type="number"
//           min="0"
//           step="0.01"
//           className={inputClass}
//           value={settings.fixed_monthly_amount}
//           onChange={(e) =>
//             updateSettings(
//               "fixed_monthly_amount",
//               numberValue(e.target.value),
//             )
//           }
//         />
//       </div>
//     )}

//     {settings.calculation_method === "bhk" && (
//       <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
//         Configure monthly charges for each BHK type in the
//         <strong> BHK Mapping </strong>
//         section.
//       </p>
//     )}

//     {settings.calculation_method === "floor" && (
//       <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
//         {/* Configure applicable floor ranges in the
//         <strong> Floor Charges </strong>
//         section. */}
//           Floor-wise charges are additional charges. Configure them separately
//   in the <strong>Floor Charges</strong> section.

//       </p>
//     )}

//     {/* APPLICABILITY, EFFECTIVE DATE AND DESCRIPTION */}
//     <div className="mt-7 border-t border-slate-200 pt-6">
//       <h3 className="mb-4 text-base font-semibold text-slate-800">
//         Charge Details
//       </h3>

//       <div className="grid gap-5 md:grid-cols-2">
//         <Field label="Applicable For">
//           <select
//             className={inputClass}
//             value={settings.applicable_for}
//             onChange={(e) =>
//             //   updateSettings(
//             //     "applicable_for",
//             //     e.target.value as "all" | "residential" | "commercial",
//             //   )
//             updateSettings(
//       "applicable_for",
//       e.target.value as "all" | "owner" | "tenant",
//     )
//             }
//           >
//             <option value="all">All Units</option>
//             <option value="owner">Owner Units</option>
//             <option value="tenant">Tenant Units</option>
//           </select>
//         </Field>

//         <Field label="Effective From">
//           <input
//             type="date"
//             className={inputClass}
//             value={settings.effective_from}
//             onChange={(e) =>
//               updateSettings("effective_from", e.target.value)
//             }
//           />
//         </Field>

//         <div className="md:col-span-2">
//           <Field label="Description">
//             <textarea
//               rows={3}
//               className={inputClass}
//               value={settings.description}
//               onChange={(e) =>
//                 updateSettings("description", e.target.value)
//               }
//               placeholder="Enter details about this maintenance charge..."
//             />
//           </Field>
//         </div>
//       </div>
//     </div>
//   </SectionCard>
// )}

//                 {/* SECTION 2: BHK MAPPING */}
//                 {activeSection === "bhk" && (
//                     <SectionCard
//                         title="Unit Type / BHK Mapping"
//                         description="Set BHK types, area ranges and their monthly maintenance amounts."
//                         action={
//                             <button
//                                 type="button"
//                                 onClick={addBhkRate}
//                                 className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                             >
//                                 <Plus size={16} /> Add BHK Type
//                             </button>
//                         }
//                     >
//                         <div className="space-y-3">
//                             {settings.bhk_rates.map((rate, index) => (
//                                 <div
//                                     key={index}
//                                     className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-5"
//                                 >
//                                     <Field label="BHK Type">
//                                         <input
//                                             className={inputClass}
//                                             value={rate.bhk_type}
//                                             onChange={(e) =>
//                                                 updateBhkRate(index, "bhk_type", e.target.value)
//                                             }
//                                             placeholder="e.g. 2 BHK"
//                                         />
//                                     </Field>
//                                     <Field label="Minimum Area (Sq.ft)">
//                                         <input
//                                             type="number"
//                                             className={inputClass}
//                                             value={rate.min_area}
//                                             onChange={(e) =>
//                                                 updateBhkRate(index, "min_area", e.target.value)
//                                             }
//                                         />
//                                     </Field>
//                                     <Field label="Maximum Area (Sq.ft)">
//                                         <input
//                                             type="number"
//                                             className={inputClass}
//                                             value={rate.max_area}
//                                             onChange={(e) =>
//                                                 updateBhkRate(index, "max_area", e.target.value)
//                                             }
//                                         />
//                                     </Field>
//                                     <Field label="Monthly Charge (₹)">
//                                         <input
//                                             type="number"
//                                             className={inputClass}
//                                             value={rate.monthly_amount}
//                                             onChange={(e) =>
//                                                 updateBhkRate(
//                                                     index,
//                                                     "monthly_amount",
//                                                     e.target.value,
//                                                 )
//                                             }
//                                         />
//                                     </Field>
//                                     <div className="flex items-end">
//                                         <RemoveButton
//                                             onClick={() =>
//                                                 updateSettings(
//                                                     "bhk_rates",
//                                                     settings.bhk_rates.filter((_, i) => i !== index),
//                                                 )
//                                             }
//                                         />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </SectionCard>
//                 )}

//                 {/* SECTION 3: FLOOR CHARGES */}
//                 {activeSection === "floor" && (
//                     <SectionCard
//                         title="Floor Wise Charges"
//                         description="Add optional floor ranges and their monthly charges."
//                         action={
//                             <button
//                                 type="button"
//                                 onClick={() =>
//                                     updateSettings("floor_charges", [
//                                         ...settings.floor_charges,
//                                         createFloorCharge(),
//                                     ])
//                                 }
//                                 className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                             >
//                                 <Plus size={16} /> Add Floor Rule
//                             </button>
//                         }
//                     >
//                         {settings.floor_charges.length === 0 ? (
//                             <EmptyState text="No floor-wise charges added. Floor charges are optional." />
//                         ) : (
//                             <div className="space-y-3">
//                                 {settings.floor_charges.map((charge, index) => (
//                                     <div
//                                         key={index}
//                                         className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-5"
//                                     >
//                                         <Field label="From Floor">
//                                             <input
//                                                 className={inputClass}
//                                                 value={charge.floor_from}
//                                                 onChange={(e) =>
//                                                     updateFloorCharge(index, "floor_from", e.target.value)
//                                                 }
//                                                 placeholder="e.g. Ground"
//                                             />
//                                         </Field>
//                                         <Field label="To Floor">
//                                             <input
//                                                 className={inputClass}
//                                                 value={charge.floor_to}
//                                                 onChange={(e) =>
//                                                     updateFloorCharge(index, "floor_to", e.target.value)
//                                                 }
//                                                 placeholder="e.g. 5"
//                                             />
//                                         </Field>
//                                         <Field label="Monthly Charge (₹)">
//                                             <input
//                                                 type="number"
//                                                 className={inputClass}
//                                                 value={charge.monthly_amount}
//                                                 onChange={(e) =>
//                                                     updateFloorCharge(
//                                                         index,
//                                                         "monthly_amount",
//                                                         e.target.value,
//                                                     )
//                                                 }
//                                             />
//                                         </Field>
//                                         <Field label="Applicable Units">
//                                             <select
//                                                 className={inputClass}
//                                                 value={charge.applicable_units}
//                                                 onChange={(e) =>
//                                                     updateFloorCharge(
//                                                         index,
//                                                         "applicable_units",
//                                                         e.target.value,
//                                                     )
//                                                 }
//                                             >
//                                                 <option value="all">All Units</option>
//                                                 <option value="residential">Residential</option>
//                                                 <option value="commercial">Commercial</option>
//                                             </select>
//                                         </Field>
//                                         <div className="flex items-end">
//                                             <RemoveButton
//                                                 onClick={() =>
//                                                     updateSettings(
//                                                         "floor_charges",
//                                                         settings.floor_charges.filter((_, i) => i !== index),
//                                                     )
//                                                 }
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </SectionCard>
//                 )}

//                 {/* SECTION 4: SPECIAL CHARGES */}
//                 {activeSection === "special" && (
//                     <SectionCard
//                         title="Additional / Special Charges"
//                         description="Configure one-time or recurring additional charges."
//                         action={
//                             <button
//                                 type="button"
//                                 onClick={() =>
//                                     updateSettings("special_charges", [
//                                         ...settings.special_charges,
//                                         createSpecialCharge(),
//                                     ])
//                                 }
//                                 className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                             >
//                                 <Plus size={16} /> Add Charge
//                             </button>
//                         }
//                     >
//                         {settings.special_charges.length === 0 ? (
//                             <EmptyState text="No additional charges configured." />
//                         ) : (
//                             <div className="space-y-4">
//                                 {settings.special_charges.map((charge, index) => (
//                                     <div
//                                         key={index}
//                                         className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-3"
//                                     >
//                                         <Field label="Charge Name">
//                                             <input
//                                                 className={inputClass}
//                                                 value={charge.charge_name}
//                                                 onChange={(e) =>
//                                                     updateSpecialCharge(index, "charge_name", e.target.value)
//                                                 }
//                                                 placeholder="e.g. Lift Maintenance"
//                                             />
//                                         </Field>
//                                         <Field label="Amount (₹)">
//                                             <input
//                                                 type="number"
//                                                 min="0"
//                                                 className={inputClass}
//                                                 value={charge.amount}
//                                                 onChange={(e) =>
//                                                     updateSpecialCharge(index, "amount", e.target.value)
//                                                 }
//                                             />
//                                         </Field>
//                                         <Field label="Charge Type">
//                                             <select
//                                                 className={inputClass}
//                                                 value={charge.charge_type}
//                                                 onChange={(e) =>
//                                                     updateSpecialCharge(index, "charge_type", e.target.value)
//                                                 }
//                                             >
//                                                 <option value="recurring">Recurring</option>
//                                                 <option value="one_time">One Time</option>
//                                             </select>
//                                         </Field>
//                                         {charge.charge_type === "recurring" && (
//                                             <>
//                                                 <Field label="Frequency">
//                                                     <select
//                                                         className={inputClass}
//                                                         value={charge.frequency}
//                                                         onChange={(e) =>
//                                                             updateSpecialCharge(index, "frequency", e.target.value)
//                                                         }
//                                                     >
//                                                         <option value="monthly">Monthly</option>
//                                                         <option value="quarterly">Quarterly</option>
//                                                         <option value="half_yearly">Half Yearly</option>
//                                                         <option value="yearly">Yearly</option>
//                                                         <option value="custom">Custom Interval</option>
//                                                     </select>
//                                                 </Field>
//                                                 {charge.frequency === "custom" && (
//                                                     <Field label="Interval (Months)">
//                                                         <input
//                                                             type="number"
//                                                             min="1"
//                                                             className={inputClass}
//                                                             value={charge.interval_months}
//                                                             onChange={(e) =>
//                                                                 updateSpecialCharge(
//                                                                     index,
//                                                                     "interval_months",
//                                                                     e.target.value,
//                                                                 )
//                                                             }
//                                                         />
//                                                     </Field>
//                                                 )}
//                                                 <Field label="Payable Months">
//                                                     <input
//                                                         className={inputClass}
//                                                         value={charge.payable_months}
//                                                         onChange={(e) =>
//                                                             updateSpecialCharge(
//                                                                 index,
//                                                                 "payable_months",
//                                                                 e.target.value,
//                                                             )
//                                                         }
//                                                         placeholder="e.g. 1,4,7,10 or leave blank"
//                                                     />
//                                                 </Field>
//                                             </>
//                                         )}
//                                         <Field label="Applicable Units">
//                                             <select
//                                                 className={inputClass}
//                                                 value={charge.applicable_units}
//                                                 onChange={(e) =>
//                                                     updateSpecialCharge(
//                                                         index,
//                                                         "applicable_units",
//                                                         e.target.value,
//                                                     )
//                                                 }
//                                             >
//                                                 <option value="all">All Units</option>
//                                                 <option value="residential">Residential</option>
//                                                 <option value="commercial">Commercial</option>
//                                             </select>
//                                         </Field>
//                                         <Field label="Effective From">
//                                             <input
//                                                 type="date"
//                                                 className={inputClass}
//                                                 value={charge.effective_from}
//                                                 onChange={(e) =>
//                                                     updateSpecialCharge(index, "effective_from", e.target.value)
//                                                 }
//                                             />
//                                         </Field>
//                                         <Field label="Effective To">
//                                             <input
//                                                 type="date"
//                                                 className={inputClass}
//                                                 value={charge.effective_to}
//                                                 onChange={(e) =>
//                                                     updateSpecialCharge(index, "effective_to", e.target.value)
//                                                 }
//                                             />
//                                         </Field>
//                                         <div className="flex items-end">
//                                             <RemoveButton
//                                                 onClick={() =>
//                                                     updateSettings(
//                                                         "special_charges",
//                                                         settings.special_charges.filter((_, i) => i !== index),
//                                                     )
//                                                 }
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </SectionCard>
//                 )}

//                 {/* SECTION 5: LATE PAYMENT RULES */}
//                 {activeSection === "late" && (
//                     <SectionCard
//                         title="Late Payment Rules"
//                         description="Set late fees based on the number of days after the due date."
//                         action={
//                             <button
//                                 type="button"
//                                 onClick={() =>
//                                     updateSettings("late_rules", [
//                                         ...settings.late_rules,
//                                         createLateRule(),
//                                     ])
//                                 }
//                                 className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                             >
//                                 <Plus size={16} /> Add Late Rule
//                             </button>
//                         }
//                     >
//                         {settings.late_rules.length === 0 ? (
//                             <EmptyState text="No late payment rules configured." />
//                         ) : (
//                             <div className="space-y-3">
//                                 {settings.late_rules.map((rule, index) => (
//                                     <div
//                                         key={index}
//                                         className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-5"
//                                     >
//                                         <Field label="Delay From (Days)">
//                                             <input
//                                                 type="number"
//                                                 min="0"
//                                                 className={inputClass}
//                                                 value={rule.delay_from_days}
//                                                 onChange={(e) =>
//                                                     updateLateRule(index, "delay_from_days", e.target.value)
//                                                 }
//                                             />
//                                         </Field>
//                                         <Field label="Delay To (Days)">
//                                             <input
//                                                 type="number"
//                                                 min="0"
//                                                 className={inputClass}
//                                                 value={rule.delay_to_days}
//                                                 onChange={(e) =>
//                                                     updateLateRule(index, "delay_to_days", e.target.value)
//                                                 }
//                                             />
//                                         </Field>
//                                         <Field label="Fee Type">
//                                             <select
//                                                 className={inputClass}
//                                                 value={rule.fee_type}
//                                                 onChange={(e) =>
//                                                     updateLateRule(index, "fee_type", e.target.value)
//                                                 }
//                                             >
//                                                 <option value="fixed">Fixed Amount</option>
//                                                 <option value="percentage">Percentage</option>
//                                             </select>
//                                         </Field>
//                                         <Field label={rule.fee_type === "fixed" ? "Fee (₹)" : "Fee (%)"}>
//                                             <input
//                                                 type="number"
//                                                 min="0"
//                                                 step="0.01"
//                                                 className={inputClass}
//                                                 value={rule.fee_value}
//                                                 onChange={(e) =>
//                                                     updateLateRule(index, "fee_value", e.target.value)
//                                                 }
//                                             />
//                                         </Field>
//                                         <div className="flex items-end">
//                                             <RemoveButton
//                                                 onClick={() =>
//                                                     updateSettings(
//                                                         "late_rules",
//                                                         settings.late_rules.filter((_, i) => i !== index),
//                                                     )
//                                                 }
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </SectionCard>
//                 )}

//                 {/* SECTION 6: PREVIEW */}
//                 {activeSection === "preview" && (
//                     <SectionCard
//                         title="Preview & Apply"
//                         description="Choose a unit and billing month to preview its maintenance calculation."
//                     >
//                         <div className="grid gap-4 md:grid-cols-3">
//                             <Field label="Select Apartment Unit">
//                                 <select
//                                     className={inputClass}
//                                     value={selectedFlatId}
//                                     onChange={(e) => {
//                                         setSelectedMember(e.target.value);
//                                         setPreview(null);
//                                     }}
//                                 >
//                                     <option value="">Select member / flat</option>
//                                     {settings.units.map((unit) => (
//                                         <option
//                                             key={unit.id}
//                                             value={unit.id}
//                                         >
//                                             {unit.block_tower || "Block"} - Flat {unit.flat_number} (
//                                             {unit.member_name})
//                                         </option>
//                                     ))}
//                                 </select>
//                             </Field>

//                             <Field label="Billing Month">
//                                 <input
//                                     type="month"
//                                     className={inputClass}
//                                     value={billingMonth}
//                                     onChange={(e) => {
//                                         setBillingMonth(e.target.value);
//                                         setPreview(null);
//                                     }}
//                                 />
//                             </Field>

//                             <div className="flex items-end">
//                                 <button
//                                     type="button"
//                                     onClick={runPreview}
//                                     disabled={previewLoading}
//                                     className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
//                                 >
//                                     {previewLoading ? (
//                                         <RefreshCw size={17} className="animate-spin" />
//                                     ) : (
//                                         <Calculator size={17} />
//                                     )}
//                                     Calculate Preview
//                                 </button>
//                             </div>
//                         </div>

//                         {selectedUnit && (
//                             <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
//                                 <p className="font-semibold text-slate-800">
//                                     {selectedUnit.member_name}
//                                 </p>
//                                 <p className="mt-1 text-sm text-slate-500">
//                                     Flat {selectedUnit.flat_number} · Block{" "}
//                                     {selectedUnit.block_tower || "-"} · Floor{" "}
//                                     {selectedUnit.floor_number || "-"}
//                                 </p>
//                             </div>
//                         )}

//                         {preview && (
//                             <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
//                                 <div className="bg-slate-900 px-5 py-4 text-white">
//                                     <h3 className="font-semibold">Maintenance Bill Estimate</h3>
//                                     <p className="mt-1 text-sm text-slate-300">
//                                         {preview.flat_number} · {preview.billing_month}
//                                     </p>
//                                 </div>

//                                 <div className="space-y-3 p-5">
//                                     <AmountRow
//                                         label="Base Maintenance"
//                                         amount={preview.base_amount}
//                                     />
//                                     <AmountRow
//                                         label="Floor Charge"
//                                         amount={preview.floor_amount}
//                                     />

//                                     {preview.special_charges?.map((charge, index) => (
//                                         <AmountRow
//                                             key={index}
//                                             label={charge.charge_name}
//                                             amount={charge.amount}
//                                         />
//                                     ))}

//                                     <AmountRow
//                                         label="Late Fee"
//                                         amount={preview.late_fee}
//                                     />

//                                     <div className="border-t border-slate-200 pt-4">
//                                         <div className="flex items-center justify-between gap-3">
//                                             <span className="text-base font-bold text-slate-900">
//                                                 Total Amount
//                                             </span>
//                                             <span className="text-2xl font-bold text-blue-700">
//                                                 {money(preview.total_amount)}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {!preview && (
//                             <EmptyState text="Select a unit and billing month, then calculate the preview." />
//                         )}
//                     </SectionCard>
//                 )}

//                 {/* SAVE FOOTER */}
//                 <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
//                     <p className="text-xs text-slate-500">
//                         Save your configuration after making changes to any section.
//                     </p>
//                     <button
//                         type="button"
//                         onClick={handleSave}
//                         disabled={saving}
//                         className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
//                     >
//                         <Save size={16} />
//                         {saving ? "Saving..." : "Save Configuration"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// /* -------------------------------------------------------------------------- */
// /* REUSABLE UI COMPONENTS                                                     */
// /* -------------------------------------------------------------------------- */

// function SectionCard({
//     title,
//     description,
//     action,
//     children,
// }: {
//     title: string;
//     description: string;
//     action?: React.ReactNode;
//     children: React.ReactNode;
// }) {
//     return (
//         <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
//             <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//                 <div>
//                     <h2 className="text-lg font-bold text-slate-900">{title}</h2>
//                     <p className="mt-1 text-sm text-slate-500">{description}</p>
//                 </div>
//                 {action}
//             </div>
//             {children}
//         </section>
//     );
// }

// function Field({
//     label,
//     children,
// }: {
//     label: string;
//     children: React.ReactNode;
// }) {
//     return (
//         <div className="min-w-0">
//             <label className={labelClass}>{label}</label>
//             {children}
//         </div>
//     );
// }

// function RemoveButton({ onClick }: { onClick: () => void }) {
//     return (
//         <button
//             type="button"
//             onClick={onClick}
//             className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 text-sm text-red-600 hover:bg-red-50"
//         >
//             <Trash2 size={16} />
//             Remove
//         </button>
//     );
// }

// function EmptyState({ text }: { text: string }) {
//     return (
//         <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
//             {text}
//         </div>
//     );
// }

// function AmountRow({
//     label,
//     amount,
// }: {
//     label: string;
//     amount: number;
// }) {
//     return (
//         <div className="flex items-center justify-between gap-3 text-sm">
//             <span className="text-slate-600">{label}</span>
//             <span className="font-semibold tabular-nums text-slate-800">
//                 ₹{Number(amount || 0).toLocaleString("en-IN", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                 })}
//             </span>
//         </div>
//     );
// }

import React, { useEffect, useMemo, useState } from "react";

import {
    Calculator,
    Building2,
    Layers,
    Plus,
    Trash2,
    Save,
    RefreshCw,
    Eye,
    Settings,
    IndianRupee,
    AlertCircle,
} from "lucide-react";

import {
    emptySettings,
    getMaintenanceSettings,
    saveMaintenanceSettings,
    getMaintenancePreview,
    type MaintenanceSettings,
    type MaintenancePreview,
    type CalculationMethod,
    type BhkRate,
    type FloorCharge,
    type SpecialCharge,
    type LateRule,
} from "./apartmentMaintenance.service";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type SectionKey =
    | "base"
    | "bhk"
    | "floor"
    | "special"
    | "late"
    | "preview";

type ApplicableFor = "all" | "owner" | "tenant";

/* -------------------------------------------------------------------------- */
/* CONSTANTS                                                                  */
/* -------------------------------------------------------------------------- */

const sections: {
    key: SectionKey;
    label: string;
    icon: React.ReactNode;
}[] = [
    { key: "base", label: "Base Charges", icon: <Calculator size={17} /> },
    { key: "bhk", label: "BHK Mapping", icon: <Building2 size={17} /> },
    { key: "floor", label: "Floor Charges", icon: <Layers size={17} /> },
    { key: "special", label: "Special Charges", icon: <IndianRupee size={17} /> },
    { key: "late", label: "Late Payment", icon: <AlertCircle size={17} /> },
    { key: "preview", label: "Preview & Apply", icon: <Eye size={17} /> },
];

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

const numberValue = (value: string): number | "" =>
    value === "" ? "" : Number(value);

/* -------------------------------------------------------------------------- */
/* DEFAULT FORM VALUES                                                        */
/* -------------------------------------------------------------------------- */

const createSpecialCharge = (): SpecialCharge => ({
    charge_name: "",
    amount: "",
    charge_type: "recurring",
    frequency: "monthly",
    interval_months: 1,
    payable_months: "",
    applicable_units: "all",
    effective_from: "",
    effective_to: "",
});

const createLateRule = (): LateRule => ({
    delay_from_days: 1,
    delay_to_days: 10,
    fee_type: "fixed",
    fee_value: "",
});

const createFloorCharge = (): FloorCharge => ({
    floor_from: "",
    floor_to: "",
    monthly_amount: "",
    applicable_units: "all",
});

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function ApartmentMaintenance() {
    const [activeSection, setActiveSection] =
        useState<SectionKey>("base");

    const [settings, setSettings] =
        useState<MaintenanceSettings>(emptySettings);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // This ID always refers to apartment_flats.id.
    const [selectedFlatId, setSelectedFlatId] = useState("");

    const [billingMonth, setBillingMonth] = useState(
        new Date().toISOString().slice(0, 7)
    );

    // Preview stores only the selected flat's bill.
    const [preview, setPreview] =
        useState<MaintenancePreview["bills"][number] | null>(null);

    const [previewLoading, setPreviewLoading] = useState(false);

    /* ---------------------------------------------------------------------- */
    /* SETTINGS UPDATE                                                        */
    /* ---------------------------------------------------------------------- */

    const updateSettings = <K extends keyof MaintenanceSettings>(
        key: K,
        value: MaintenanceSettings[K]
    ) => {
        setSettings((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    /* ---------------------------------------------------------------------- */
    /* LOAD SETTINGS                                                          */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getMaintenanceSettings();
            const data = response?.data ?? response;

            const oldBhkRates = data.bhk_rates;

            const normalizedBhkRates: BhkRate[] =
                Array.isArray(oldBhkRates)
                    ? oldBhkRates
                    : oldBhkRates &&
                        typeof oldBhkRates === "object"
                        ? Object.entries(oldBhkRates).map(
                            ([bhk, amount]) => ({
                                bhk_type: `${bhk} BHK`,
                                min_area: "",
                                max_area: "",
                                monthly_amount: Number(amount || 0),
                            })
                        )
                        : emptySettings.bhk_rates;

            const method = String(
                data.calculation_method || ""
            ).toUpperCase();

            const calculationMethod: CalculationMethod =
                method === "PER_SQFT" || method === "AREA"
                    ? "area"
                    : method === "FLAT_AMOUNT" || method === "FIXED"
                        ? "fixed"
                        : "bhk";

            const applicableFor = String(
                data.applicable_for || "ALL"
            ).toLowerCase();

            setSettings({
                ...emptySettings,
                ...data,

                calculation_method: calculationMethod,

                applicable_for:
                    applicableFor === "owner" ||
                    applicableFor === "tenant"
                        ? applicableFor
                        : "all",

                effective_from: data.effective_from
                    ? String(data.effective_from).slice(0, 10)
                    : "",

                description: data.description ?? "",

                rate_per_sqft:
                    data.rate_per_sqft ??
                    (calculationMethod === "area"
                        ? data.base_rate ?? 0
                        : 0),

                fixed_monthly_amount:
                    data.fixed_monthly_amount ??
                    (calculationMethod === "fixed"
                        ? data.base_rate ?? 0
                        : 0),

                bhk_rates: normalizedBhkRates,
                floor_charges: data.floor_charges ?? [],
                special_charges: data.special_charges ?? [],
                late_rules: data.late_rules ?? [],

                // Unit IDs must be apartment_flats.id.
                units: Array.isArray(data.units)
                    ? data.units
                    : [],
            });
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Unable to load apartment maintenance settings."
            );
        } finally {
            setLoading(false);
        }
    };

    /* ---------------------------------------------------------------------- */
    /* SAVE SETTINGS                                                          */
    /* ---------------------------------------------------------------------- */

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            await saveMaintenanceSettings(settings);

            setSuccess(
                "Maintenance configuration saved successfully."
            );
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Unable to save maintenance configuration."
            );
        } finally {
            setSaving(false);
        }
    };

    /* ---------------------------------------------------------------------- */
    /* BHK RATE HANDLERS                                                      */
    /* ---------------------------------------------------------------------- */

    const updateBhkRate = (
        index: number,
        key: keyof BhkRate,
        value: string
    ) => {
        const updated = [...settings.bhk_rates];

        updated[index] = {
            ...updated[index],
            [key]:
                key === "bhk_type"
                    ? value
                    : numberValue(value),
        };

        updateSettings("bhk_rates", updated);
    };

    const addBhkRate = () => {
        updateSettings("bhk_rates", [
            ...settings.bhk_rates,
            {
                bhk_type: "",
                min_area: "",
                max_area: "",
                monthly_amount: "",
            },
        ]);
    };

    /* ---------------------------------------------------------------------- */
    /* FLOOR CHARGE HANDLERS                                                  */
    /* ---------------------------------------------------------------------- */

    const updateFloorCharge = (
        index: number,
        key: keyof FloorCharge,
        value: string
    ) => {
        const updated = [...settings.floor_charges];

        updated[index] = {
            ...updated[index],
            [key]:
                key === "monthly_amount"
                    ? numberValue(value)
                    : value,
        };

        updateSettings("floor_charges", updated);
    };

    const addFloorCharge = () => {
        updateSettings("floor_charges", [
            ...settings.floor_charges,
            createFloorCharge(),
        ]);
    };

    /* ---------------------------------------------------------------------- */
    /* SPECIAL CHARGE HANDLERS                                                */
    /* ---------------------------------------------------------------------- */

    const updateSpecialCharge = (
        index: number,
        key: keyof SpecialCharge,
        value: string
    ) => {
        const updated = [...settings.special_charges];

        updated[index] = {
            ...updated[index],
            [key]:
                key === "amount" || key === "interval_months"
                    ? numberValue(value)
                    : value,
        } as SpecialCharge;

        updateSettings("special_charges", updated);
    };

    const addSpecialCharge = () => {
        updateSettings("special_charges", [
            ...settings.special_charges,
            createSpecialCharge(),
        ]);
    };

    /* ---------------------------------------------------------------------- */
    /* LATE RULE HANDLERS                                                     */
    /* ---------------------------------------------------------------------- */

    const updateLateRule = (
        index: number,
        key: keyof LateRule,
        value: string
    ) => {
        const updated = [...settings.late_rules];

        updated[index] = {
            ...updated[index],
            [key]:
                key === "fee_value" ||
                key === "delay_from_days" ||
                key === "delay_to_days"
                    ? numberValue(value)
                    : value,
        } as LateRule;

        updateSettings("late_rules", updated);
    };

    const addLateRule = () => {
        updateSettings("late_rules", [
            ...settings.late_rules,
            createLateRule(),
        ]);
    };

    /* ---------------------------------------------------------------------- */
    /* PREVIEW                                                                */
    /* ---------------------------------------------------------------------- */

    const runPreview = async () => {
        if (!selectedFlatId) {
            setError("Please select an apartment flat first.");
            return;
        }

        if (!billingMonth) {
            setError("Please select a billing month.");
            return;
        }

        try {
            setPreviewLoading(true);
            setError("");
            setSuccess("");
            setPreview(null);

            const response = await getMaintenancePreview(
                Number(selectedFlatId),
                billingMonth
            );

            const data = response?.data ?? response;

            if (!data?.bills || data.bills.length === 0) {
                setError(
                    "No maintenance preview is available for the selected flat."
                );
                return;
            }

            // Backend returns bills as an array.
            // This page displays only the selected flat's bill.
            setPreview(data.bills[0]);
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Unable to calculate maintenance preview."
            );
        } finally {
            setPreviewLoading(false);
        }
    };

    /* ---------------------------------------------------------------------- */
    /* SELECTED FLAT                                                          */
    /* ---------------------------------------------------------------------- */

    const selectedUnit = useMemo(
        () =>
            settings.units.find(
                (unit) =>
                    Number(unit.id) === Number(selectedFlatId)
            ),
        [settings.units, selectedFlatId]
    );

    /* ---------------------------------------------------------------------- */
    /* CURRENCY FORMAT                                                        */
    /* ---------------------------------------------------------------------- */

    const money = (value: number | string | undefined) =>
        `₹${Number(value || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;

    /* ---------------------------------------------------------------------- */
    /* LOADING                                                                */
    /* ---------------------------------------------------------------------- */

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                    <RefreshCw
                        className="animate-spin"
                        size={20}
                    />
                    Loading maintenance settings...
                </div>
            </div>
        );
    }

    /* ---------------------------------------------------------------------- */
    /* PAGE                                                                   */
    /* ---------------------------------------------------------------------- */

    return (
        <div className="min-h-full bg-slate-50 p-3 sm:p-5 lg:p-7">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* PAGE HEADER */}

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2 text-blue-700">
                            <Settings size={20} />

                            <span className="text-xs font-semibold uppercase tracking-wider">
                                Apartment Management
                            </span>
                        </div>

                        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                            Apartment Maintenance
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Configure monthly maintenance charges and billing rules.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? (
                            <RefreshCw
                                size={17}
                                className="animate-spin"
                            />
                        ) : (
                            <Save size={17} />
                        )}

                        {saving
                            ? "Saving..."
                            : "Save Configuration"}
                    </button>
                </div>

                {/* ERROR MESSAGE */}

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* SUCCESS MESSAGE */}

                {success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {success}
                    </div>
                )}

                {/* SECTION NAVIGATION */}

                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                    <div className="flex min-w-max gap-2">
                        {sections.map((section) => (
                            <button
                                key={section.key}
                                type="button"
                                onClick={() => {
                                    setActiveSection(section.key);
                                    setError("");
                                    setSuccess("");
                                }}
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                    activeSection === section.key
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-slate-600 hover:bg-slate-100"
                                }`}
                            >
                                {section.icon}
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ========================================================== */}
                {/* SECTION 1: BASE CHARGES                                     */}
                {/* ========================================================== */}

                {activeSection === "base" && (
                    <SectionCard
                        title="Base Maintenance Charges"
                        description="Configure the basic monthly maintenance amount and its applicability."
                    >
                        {/* CALCULATION METHOD */}

                        <div>
                            <label className={labelClass}>
                                Calculation Method
                            </label>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {(
                                    [
                                        [
                                            "bhk",
                                            "Per BHK",
                                            "Charge according to flat BHK type.",
                                        ],
                                        [
                                            "area",
                                            "Per Sq.ft",
                                            "Charge according to flat area.",
                                        ],
                                        [
                                            "fixed",
                                            "Flat Amount",
                                            "Same monthly amount for each unit.",
                                        ],
                                    ] as [
                                        CalculationMethod,
                                        string,
                                        string
                                    ][]
                                ).map(
                                    ([value, title, description]) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() =>
                                                updateSettings(
                                                    "calculation_method",
                                                    value
                                                )
                                            }
                                            className={`rounded-xl border p-4 text-left transition ${
                                                settings.calculation_method === value
                                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                                    : "border-slate-200 bg-white hover:border-blue-200"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-slate-800">
                                                    {title}
                                                </span>

                                                <span
                                                    className={`h-4 w-4 rounded-full border-2 ${
                                                        settings.calculation_method === value
                                                            ? "border-blue-600 bg-blue-600 ring-2 ring-white"
                                                            : "border-slate-300"
                                                    }`}
                                                />
                                            </div>

                                            <p className="mt-2 text-xs leading-5 text-slate-500">
                                                {description}
                                            </p>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        {/* PER SQ.FT */}

                        {settings.calculation_method === "area" && (
                            <div className="mt-6 max-w-sm">
                                <label className={labelClass}>
                                    Rate per Sq.ft (₹)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className={inputClass}
                                    value={settings.rate_per_sqft}
                                    onChange={(e) =>
                                        updateSettings(
                                            "rate_per_sqft",
                                            numberValue(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        )}

                        {/* FIXED AMOUNT */}

                        {settings.calculation_method === "fixed" && (
                            <div className="mt-6 max-w-sm">
                                <label className={labelClass}>
                                    Monthly Amount per Flat (₹)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className={inputClass}
                                    value={settings.fixed_monthly_amount}
                                    onChange={(e) =>
                                        updateSettings(
                                            "fixed_monthly_amount",
                                            numberValue(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        )}

                        {/* BHK INFORMATION */}

                        {settings.calculation_method === "bhk" && (
                            <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                                Configure monthly charges for each BHK type in the
                                <strong> BHK Mapping </strong>
                                section.
                            </p>
                        )}

                        {/* FLOOR INFORMATION */}

                        <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                            Floor-wise charges are additional charges. Configure them separately
                            in the <strong>Floor Charges</strong> section.
                        </p>

                        {/* CHARGE DETAILS */}

                        <div className="mt-7 border-t border-slate-200 pt-6">
                            <h3 className="mb-4 text-base font-semibold text-slate-800">
                                Charge Details
                            </h3>

                            <div className="grid gap-5 md:grid-cols-2">

                                <Field label="Applicable For">
                                    <select
                                        className={inputClass}
                                        value={settings.applicable_for}
                                        onChange={(e) =>
                                            updateSettings(
                                                "applicable_for",
                                                e.target.value as ApplicableFor
                                            )
                                        }
                                    >
                                        <option value="all">
                                            All Units
                                        </option>

                                        <option value="owner">
                                            Owner Units
                                        </option>

                                        <option value="tenant">
                                            Tenant Units
                                        </option>
                                    </select>
                                </Field>

                                <Field label="Effective From">
                                    <input
                                        type="date"
                                        className={inputClass}
                                        value={settings.effective_from}
                                        onChange={(e) =>
                                            updateSettings(
                                                "effective_from",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Field>

                                <div className="md:col-span-2">
                                    <Field label="Description">
                                        <textarea
                                            rows={3}
                                            className={inputClass}
                                            value={settings.description}
                                            onChange={(e) =>
                                                updateSettings(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter details about this maintenance charge..."
                                        />
                                    </Field>
                                </div>
                            </div>
                        </div>
                    </SectionCard>
                )}

                {/* ========================================================== */}
                {/* SECTION 2: BHK MAPPING                                      */}
                {/* ========================================================== */}

                {activeSection === "bhk" && (
                    <SectionCard
                        title="Unit Type / BHK Mapping"
                        description="Set BHK types, area ranges and their monthly maintenance amounts."
                        action={
                            <button
                                type="button"
                                onClick={addBhkRate}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                <Plus size={16} />
                                Add BHK Type
                            </button>
                        }
                    >
                        <div className="space-y-3">
                            {settings.bhk_rates.map(
                                (rate, index) => (
                                    <div
                                        key={index}
                                        className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-5"
                                    >
                                        <Field label="BHK Type">
                                            <input
                                                className={inputClass}
                                                value={rate.bhk_type}
                                                onChange={(e) =>
                                                    updateBhkRate(
                                                        index,
                                                        "bhk_type",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g. 2 BHK"
                                            />
                                        </Field>

                                        <Field label="Minimum Area (Sq.ft)">
                                            <input
                                                type="number"
                                                min="0"
                                                className={inputClass}
                                                value={rate.min_area}
                                                onChange={(e) =>
                                                    updateBhkRate(
                                                        index,
                                                        "min_area",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Field>

                                        <Field label="Maximum Area (Sq.ft)">
                                            <input
                                                type="number"
                                                min="0"
                                                className={inputClass}
                                                value={rate.max_area}
                                                onChange={(e) =>
                                                    updateBhkRate(
                                                        index,
                                                        "max_area",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Field>

                                        <Field label="Monthly Charge (₹)">
                                            <input
                                                type="number"
                                                min="0"
                                                className={inputClass}
                                                value={rate.monthly_amount}
                                                onChange={(e) =>
                                                    updateBhkRate(
                                                        index,
                                                        "monthly_amount",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Field>

                                        <div className="flex items-end">
                                            <RemoveButton
                                                onClick={() =>
                                                    updateSettings(
                                                        "bhk_rates",
                                                        settings.bhk_rates.filter(
                                                            (_, i) => i !== index
                                                        )
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        {settings.bhk_rates.length === 0 && (
                            <EmptyState text="No BHK rates added. Click Add BHK Type to configure rates." />
                        )}
                    </SectionCard>
                )}

                {/* ========================================================== */}
                {/* SECTION 3: FLOOR CHARGES                                    */}
                {/* ========================================================== */}

                {activeSection === "floor" && (
                    <SectionCard
                        title="Floor Wise Charges"
                        description="Add optional floor ranges and their monthly charges."
                        action={
                            <button
                                type="button"
                                onClick={addFloorCharge}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                <Plus size={16} />
                                Add Floor Rule
                            </button>
                        }
                    >
                        {settings.floor_charges.length === 0 ? (
                            <EmptyState text="No floor-wise charges added. Floor charges are optional." />
                        ) : (
                            <div className="space-y-3">
                                {settings.floor_charges.map(
                                    (charge, index) => (
                                        <div
                                            key={index}
                                            className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-5"
                                        >
                                            <Field label="From Floor">
                                                <input
                                                    className={inputClass}
                                                    value={charge.floor_from}
                                                    onChange={(e) =>
                                                        updateFloorCharge(
                                                            index,
                                                            "floor_from",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. Ground"
                                                />
                                            </Field>

                                            <Field label="To Floor">
                                                <input
                                                    className={inputClass}
                                                    value={charge.floor_to}
                                                    onChange={(e) =>
                                                        updateFloorCharge(
                                                            index,
                                                            "floor_to",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. 5"
                                                />
                                            </Field>

                                            <Field label="Monthly Charge (₹)">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className={inputClass}
                                                    value={charge.monthly_amount}
                                                    onChange={(e) =>
                                                        updateFloorCharge(
                                                            index,
                                                            "monthly_amount",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Field>

                                            <Field label="Applicable Units">
                                                <select
                                                    className={inputClass}
                                                    value={charge.applicable_units}
                                                    onChange={(e) =>
                                                        updateFloorCharge(
                                                            index,
                                                            "applicable_units",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="all">
                                                        All Units
                                                    </option>

                                                    <option value="residential">
                                                        Residential
                                                    </option>

                                                    <option value="commercial">
                                                        Commercial
                                                    </option>
                                                </select>
                                            </Field>

                                            <div className="flex items-end">
                                                <RemoveButton
                                                    onClick={() =>
                                                        updateSettings(
                                                            "floor_charges",
                                                            settings.floor_charges.filter(
                                                                (_, i) => i !== index
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </SectionCard>
                )}

                {/* ========================================================== */}
                {/* SECTION 4: SPECIAL CHARGES                                  */}
                {/* ========================================================== */}

                {activeSection === "special" && (
                    <SectionCard
                        title="Additional / Special Charges"
                        description="Configure one-time or recurring additional charges."
                        action={
                            <button
                                type="button"
                                onClick={addSpecialCharge}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                <Plus size={16} />
                                Add Charge
                            </button>
                        }
                    >
                        {settings.special_charges.length === 0 ? (
                            <EmptyState text="No additional charges configured." />
                        ) : (
                            <div className="space-y-4">
                                {settings.special_charges.map(
                                    (charge, index) => (
                                        <div
                                            key={index}
                                            className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-3"
                                        >
                                            <Field label="Charge Name">
                                                <input
                                                    className={inputClass}
                                                    value={charge.charge_name}
                                                    onChange={(e) =>
                                                        updateSpecialCharge(
                                                            index,
                                                            "charge_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. Lift Maintenance"
                                                />
                                            </Field>

                                            <Field label="Amount (₹)">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className={inputClass}
                                                    value={charge.amount}
                                                    onChange={(e) =>
                                                        updateSpecialCharge(
                                                            index,
                                                            "amount",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Field>

                                            <Field label="Charge Type">
                                                <select
                                                    className={inputClass}
                                                    value={charge.charge_type}
                                                    onChange={(e) =>
                                                        updateSpecialCharge(
                                                            index,
                                                            "charge_type",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="recurring">
                                                        Recurring
                                                    </option>

                                                    <option value="one_time">
                                                        One Time
                                                    </option>
                                                </select>
                                            </Field>

                                            {charge.charge_type === "recurring" && (
                                                <>
                                                    <Field label="Frequency">
                                                        <select
                                                            className={inputClass}
                                                            value={charge.frequency}
                                                            onChange={(e) =>
                                                                updateSpecialCharge(
                                                                    index,
                                                                    "frequency",
                                                                    e.target.value
                                                                )
                                                            }
                                                        >
                                                            <option value="monthly">
                                                                Monthly
                                                            </option>

                                                            <option value="quarterly">
                                                                Quarterly
                                                            </option>

                                                            <option value="half_yearly">
                                                                Half Yearly
                                                            </option>

                                                            <option value="yearly">
                                                                Yearly
                                                            </option>

                                                            <option value="custom">
                                                                Custom Interval
                                                            </option>
                                                        </select>
                                                    </Field>

                                                    {charge.frequency === "custom" && (
                                                        <Field label="Interval (Months)">
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                className={inputClass}
                                                                value={charge.interval_months}
                                                                onChange={(e) =>
                                                                    updateSpecialCharge(
                                                                        index,
                                                                        "interval_months",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </Field>
                                                    )}

                                                    <Field label="Payable Months">
                                                        <input
                                                            className={inputClass}
                                                            value={charge.payable_months}
                                                            onChange={(e) =>
                                                                updateSpecialCharge(
                                                                    index,
                                                                    "payable_months",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="e.g. 1,4,7,10 or leave blank"
                                                        />
                                                    </Field>
                                                </>
                                            )}

                                            <Field label="Applicable Units">
                                                <select
                                                    className={inputClass}
                                                    value={charge.applicable_units}
                                                    onChange={(e) =>
                                                        updateSpecialCharge(
                                                            index,
                                                            "applicable_units",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="all">
                                                        All Units
                                                    </option>

                                                    <option value="residential">
                                                        Residential
                                                    </option>

                                                    <option value="commercial">
                                                        Commercial
                                                    </option>
                                                </select>
                                            </Field>

                                            <Field label="Effective From">
                                                <input
                                                    type="date"
                                                    className={inputClass}
                                                    value={charge.effective_from}
                                                    onChange={(e) =>
                                                        updateSpecialCharge(
                                                            index,
                                                            "effective_from",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Field>

                                            <Field label="Effective To">
                                                <input
                                                    type="date"
                                                    className={inputClass}
                                                    value={charge.effective_to}
                                                    onChange={(e) =>
                                                        updateSpecialCharge(
                                                            index,
                                                            "effective_to",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Field>

                                            <div className="flex items-end">
                                                <RemoveButton
                                                    onClick={() =>
                                                        updateSettings(
                                                            "special_charges",
                                                            settings.special_charges.filter(
                                                                (_, i) => i !== index
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </SectionCard>
                )}

                {/* ========================================================== */}
                {/* SECTION 5: LATE PAYMENT RULES                               */}
                {/* ========================================================== */}

                {activeSection === "late" && (
                    <SectionCard
                        title="Late Payment Rules"
                        description="Set late fees based on the number of days after the due date."
                        action={
                            <button
                                type="button"
                                onClick={addLateRule}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                <Plus size={16} />
                                Add Late Rule
                            </button>
                        }
                    >
                        {settings.late_rules.length === 0 ? (
                            <EmptyState text="No late payment rules configured." />
                        ) : (
                            <div className="space-y-3">
                                {settings.late_rules.map(
                                    (rule, index) => (
                                        <div
                                            key={index}
                                            className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-5"
                                        >
                                            <Field label="Delay From (Days)">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className={inputClass}
                                                    value={rule.delay_from_days}
                                                    onChange={(e) =>
                                                        updateLateRule(
                                                            index,
                                                            "delay_from_days",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Field>

                                            <Field label="Delay To (Days)">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className={inputClass}
                                                    value={rule.delay_to_days}
                                                    onChange={(e) =>
                                                        updateLateRule(
                                                            index,
                                                            "delay_to_days",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Field>

                                            <Field label="Fee Type">
                                                <select
                                                    className={inputClass}
                                                    value={rule.fee_type}
                                                    onChange={(e) =>
                                                        updateLateRule(
                                                            index,
                                                            "fee_type",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="fixed">
                                                        Fixed Amount
                                                    </option>

                                                    <option value="percentage">
                                                        Percentage
                                                    </option>
                                                </select>
                                            </Field>

                                            <Field
                                                label={
                                                    rule.fee_type === "fixed"
                                                        ? "Fee (₹)"
                                                        : "Fee (%)"
                                                }
                                            >
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    className={inputClass}
                                                    value={rule.fee_value}
                                                    onChange={(e) =>
                                                        updateLateRule(
                                                            index,
                                                            "fee_value",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Field>

                                            <div className="flex items-end">
                                                <RemoveButton
                                                    onClick={() =>
                                                        updateSettings(
                                                            "late_rules",
                                                            settings.late_rules.filter(
                                                                (_, i) => i !== index
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </SectionCard>
                )}

                {/* ========================================================== */}
                {/* SECTION 6: PREVIEW & APPLY                                 */}
                {/* ========================================================== */}

                {activeSection === "preview" && (
                    <SectionCard
                        title="Preview & Apply"
                        description="Choose a unit and billing month to preview its maintenance calculation."
                    >
                        <div className="grid gap-4 md:grid-cols-3">

                            {/* FLAT SELECTOR */}

                            <Field label="Select Apartment Flat">
                                <select
                                    className={inputClass}
                                    value={selectedFlatId}
                                    onChange={(e) => {
                                        setSelectedFlatId(e.target.value);
                                        setPreview(null);
                                        setError("");
                                    }}
                                >
                                    <option value="">
                                        Select Flat
                                    </option>

                                    {settings.units.map((unit) => (
                                        <option
                                            key={unit.id}
                                            value={unit.id}
                                        >
                                            {unit.block_tower || "Block"} - Flat{" "}
                                            {unit.flat_number}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            {/* BILLING MONTH */}

                            <Field label="Billing Month">
                                <input
                                    type="month"
                                    className={inputClass}
                                    value={billingMonth}
                                    onChange={(e) => {
                                        setBillingMonth(e.target.value);
                                        setPreview(null);
                                    }}
                                />
                            </Field>

                            {/* CALCULATE BUTTON */}

                            <div className="flex items-end">
                                <button
                                    type="button"
                                    onClick={runPreview}
                                    disabled={previewLoading}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                                >
                                    {previewLoading ? (
                                        <RefreshCw
                                            size={17}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Calculator size={17} />
                                    )}

                                    {previewLoading
                                        ? "Calculating..."
                                        : "Calculate Preview"}
                                </button>
                            </div>
                        </div>

                        {/* SELECTED FLAT DETAILS */}

                        {selectedUnit && (
                            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="font-semibold text-slate-800">
                                    Flat {selectedUnit.flat_number}
                                </p>

                                <div className="mt-2 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                                    <p>
                                        <strong>Block:</strong>{" "}
                                        {selectedUnit.block_tower || "-"}
                                    </p>

                                    <p>
                                        <strong>Floor:</strong>{" "}
                                        {selectedUnit.floor_number || "-"}
                                    </p>

                                    <p>
                                        <strong>BHK:</strong>{" "}
                                        {selectedUnit.bhk_type || "-"}
                                    </p>

                                    <p>
                                        <strong>Area:</strong>{" "}
                                        {selectedUnit.area_sqft || "-"} Sq.ft
                                    </p>

                                    <p>
                                        <strong>Ownership:</strong>{" "}
                                        {selectedUnit.ownership_type || "-"}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* MAINTENANCE PREVIEW */}

                        {preview && (
                            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                                <div className="bg-slate-900 px-5 py-4 text-white">
                                    <h3 className="font-semibold">
                                        Maintenance Bill Estimate
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-300">
                                        Flat {preview.flat_number} · {billingMonth}
                                    </p>
                                </div>

                                <div className="space-y-3 p-5">
                                    <AmountRow
                                        label="Base Maintenance"
                                        amount={preview.base_amount}
                                    />

                                    <AmountRow
                                        label="Floor Charge"
                                        amount={preview.floor_charge}
                                    />

                                    <AmountRow
                                        label="Special Charges"
                                        amount={preview.special_charges}
                                    />

                                    <AmountRow
                                        label="Late Fee"
                                        amount={preview.late_fee}
                                    />

                                    <div className="border-t border-slate-200 pt-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-base font-bold text-slate-900">
                                                Total Amount
                                            </span>

                                            <span className="text-2xl font-bold text-blue-700">
                                                {money(preview.total_amount)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!preview && (
                            <div className="mt-6">
                                <EmptyState text="Select a flat and billing month, then calculate the preview." />
                            </div>
                        )}
                    </SectionCard>
                )}

                {/* ========================================================== */}
                {/* SAVE FOOTER                                                 */}
                {/* ========================================================== */}

                <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
                    <p className="text-xs text-slate-500">
                        Save your configuration after making changes to any section.
                    </p>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                        {saving ? (
                            <RefreshCw
                                size={16}
                                className="animate-spin"
                            />
                        ) : (
                            <Save size={16} />
                        )}

                        {saving
                            ? "Saving..."
                            : "Save Configuration"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* REUSABLE UI COMPONENTS                                                     */
/* -------------------------------------------------------------------------- */

function SectionCard({
    title,
    description,
    action,
    children,
}: {
    title: string;
    description: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {description}
                    </p>
                </div>

                {action}
            </div>

            {children}
        </section>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="min-w-0">
            <label className={labelClass}>
                {label}
            </label>

            {children}
        </div>
    );
}

function RemoveButton({
    onClick,
}: {
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 text-sm text-red-600 hover:bg-red-50"
        >
            <Trash2 size={16} />
            Remove
        </button>
    );
}

function EmptyState({
    text,
}: {
    text: string;
}) {
    return (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            {text}
        </div>
    );
}

function AmountRow({
    label,
    amount,
}: {
    label: string;
    amount: number | string | undefined;
}) {
    return (
        <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-600">
                {label}
            </span>

            <span className="font-semibold tabular-nums text-slate-800">
                ₹{Number(amount || 0).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
        </div>
    );
}
