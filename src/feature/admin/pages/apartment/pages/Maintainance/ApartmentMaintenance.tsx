
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
    saveBhkRate,
    getMaintenancePreview,
    getFlats,
    updateFlatDetails,
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

interface ApartmentFlat {
    id: number;
    apartment_name: string;
    block_tower: string;
    floor_number: string;
    flat_number: string;
    bhk_type: string | null;
    area_sqft: number | null;
    ownership_type: string;
    occupancy_status: string;
    is_active: boolean;
}

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


const getTodayLocalDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};


/* -------------------------------------------------------------------------- */
/* DEFAULT FORM VALUES                                                        */
/* -------------------------------------------------------------------------- */


const MONTH_OPTIONS = [
    { value: 1, label: "Jan" },
    { value: 2, label: "Feb" },
    { value: 3, label: "Mar" },
    { value: 4, label: "Apr" },
    { value: 5, label: "May" },
    { value: 6, label: "Jun" },
    { value: 7, label: "Jul" },
    { value: 8, label: "Aug" },
    { value: 9, label: "Sep" },
    { value: 10, label: "Oct" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Dec" },
];

const getDefaultPayableMonths = (frequency: string): number[] => {
    switch (frequency) {
        case "monthly":
            return MONTH_OPTIONS.map((m) => m.value);

        case "quarterly":
            return [1, 4, 7, 10];

        case "half_yearly":
            return [1, 7];

        case "yearly":
            return [1];

        case "custom":
            return [];

        default:
            return [];
    }
};

const parsePayableMonths = (value: string | number | null): number[] => {
    if (!value) return [];

    return String(value)
        .split(",")
        .map(Number)
        .filter((month) => Number.isInteger(month) && month >= 1 && month <= 12)
        .filter((month, index, array) => array.indexOf(month) === index)
        .sort((a, b) => a - b);
};

// Finds the next applicable billing month and sets its first day.
// If all selected months have passed this year, use the first selected month
// in the next year.
const getAutomaticEffectiveFrom = (months: number[]): string => {
    if (!months.length) return "";

    const sortedMonths = [...months].sort((a, b) => a - b);
    const today = new Date();
    const currentMonth = today.getMonth() + 1;

    const nextMonth = sortedMonths.find(
        (month) => month >= currentMonth
    );

    const effectiveMonth = nextMonth ?? sortedMonths[0];
    const effectiveYear = nextMonth
        ? today.getFullYear()
        : today.getFullYear() + 1;

    return `${effectiveYear}-${String(effectiveMonth).padStart(2, "0")}-01`;
};

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
const createSpecialCharge = (): SpecialCharge => {
    const frequency = "monthly";
    const months = getDefaultPayableMonths(frequency);

    return {
        charge_name: "",
        amount: "",
        charge_type: "recurring",
        frequency,
        interval_months: 1,
        payable_months: months.join(","),
        applicable_units: "all",
        effective_from: getAutomaticEffectiveFrom(months),
        effective_to: "",
    };
};
const createLateRule = (): LateRule => ({
    delay_from_days: 1,
    delay_to_days: 10,
    fee_type: "fixed",
    fee_value: "",
    effective_from: getTodayLocalDate(),
    effective_to: "",
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

    // Flats are maintained separately from maintenance settings.
    const [flats, setFlats] = useState<ApartmentFlat[]>([]);
const [flatBhkType, setFlatBhkType] = useState("");
const [flatAreaSqft, setFlatAreaSqft] = useState("");

const [savingFlatDetails, setSavingFlatDetails] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [savingBhkIndex, setSavingBhkIndex] =
        useState<number | null>(null);

    // Always stores apartment_flats.id.
    const [selectedFlatId, setSelectedFlatId] = useState("");

    const [billingMonth, setBillingMonth] = useState(
        new Date().toISOString().slice(0, 7)
    );

const [asOfDate, setAsOfDate] = useState(getTodayLocalDate());


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
    /* LOAD SETTINGS AND FLATS                                                */
    /* ---------------------------------------------------------------------- */

    const loadSettings = async () => {
        try {
            setLoading(true);
            setError("");

            // Load configuration and flats independently.
            const [configResult, flatsResult] =
                await Promise.allSettled([
                    getMaintenanceSettings(),
                    getFlats(),
                ]);

            /* -------------------- LOAD FLATS -------------------- */

            if (flatsResult.status === "fulfilled") {
                const flatsResponse: any = flatsResult.value;

                const flatsData =
                    flatsResponse?.flats ??
                    flatsResponse?.data?.flats ??
                    flatsResponse?.data?.data?.flats ??
                    [];

                const normalizedFlats: ApartmentFlat[] =
                    Array.isArray(flatsData)
                        ? flatsData
                            .filter((flat: any) =>
                                flat.is_active !== false
                            )
                            .map((flat: any) => ({
                                ...flat,
                                id: Number(flat.id),
                                apartment_name:
                                    flat.apartment_name ?? "",
                                block_tower:
                                    flat.block_tower ?? "",
                                floor_number:
                                    flat.floor_number ?? "",
                                flat_number:
                                    flat.flat_number ?? "",
                                bhk_type:
                                    flat.bhk_type ?? null,
                                area_sqft:
                                    flat.area_sqft ?? null,
                            }))
                        : [];

                setFlats(normalizedFlats);

                console.log(
                    "Apartment flats loaded:",
                    normalizedFlats
                );

            } else {
                console.error(
                    "Flats loading error:",
                    flatsResult.reason
                );

                setFlats([]);
            }

            /* -------------------- LOAD CONFIGURATION -------------------- */

            if (configResult.status === "rejected") {
                throw configResult.reason;
            }

            // const configResponse: any = configResult.value;

            // const config =
            //     configResponse?.data ?? configResponse;

            // const data = config?.settings ?? {};

            const config: any = configResult.value ?? {};

const data = config?.settings ?? {};

            const oldBhkRates =
                config?.bhkRates ??
                data.bhk_rates ??
                [];

            const normalizedBhkRates: BhkRate[] =
                Array.isArray(oldBhkRates)
                    ? oldBhkRates.map((rate: any) => ({
                        bhk_type: String(
                            rate.bhk_type || ""
                        ),
                        monthly_amount: Number(
                            rate.monthly_amount ??
                            rate.amount ??
                            0
                        ),
                    }))
                    : [];

            const method = String(
                data.calculation_method || ""
            ).toUpperCase();

            const calculationMethod: CalculationMethod =
                method === "PER_SQFT" || method === "AREA"
                    ? "area"
                    : "bhk";


                    const rawSpecialCharges =
    config?.specialCharges ??
    data.special_charges ??
    [];

const normalizedSpecialCharges: SpecialCharge[] =
    Array.isArray(rawSpecialCharges)
        ? rawSpecialCharges.map((charge: any) => {
            const frequency = charge.frequency || "monthly";

            const chargeMode = String(
                charge.charge_mode || ""
            ).toUpperCase();

            const chargeType =
                chargeMode === "ONE_TIME" ||
                String(charge.charge_type).toLowerCase() === "one_time"
                    ? "one_time"
                    : "recurring";

            const months = charge.payable_months
                ? parsePayableMonths(charge.payable_months)
                : getDefaultPayableMonths(frequency);

            return {
                ...charge,
                charge_name: charge.charge_name || "",
                amount: Number(charge.amount || 0),
                charge_type: chargeType,
                frequency,
                interval_months: Number(charge.interval_months || 1),
                payable_months: months.join(","),
                applicable_units: String(
                    charge.applicable_units ??
                    charge.applicable_for ??
                    "ALL"
                ).toLowerCase(),
                effective_from: charge.effective_from
                    ? String(charge.effective_from).slice(0, 10)
                    : getAutomaticEffectiveFrom(months),
                effective_to: charge.effective_to
                    ? String(charge.effective_to).slice(0, 10)
                    : "",
            };
        })
        : [];

        /* -------------------- LOAD LATE PAYMENT RULES -------------------- */

const rawLateRules =
    config?.late_rules ??
    config?.lateRules ??
    config?.data?.late_rules ??
    config?.data?.lateRules ??
    data?.late_rules ??
    data?.lateRules ??
    (config?.lateRule ? [config.lateRule] : []);

const normalizedLateRules: LateRule[] =
    Array.isArray(rawLateRules)
        ? rawLateRules.map((rule: any) => ({
            ...(rule.id ? { id: Number(rule.id) } : {}),

            delay_from_days: Number(
                rule.delay_from_days ?? ""
            ),

            delay_to_days: Number(
                rule.delay_to_days ?? ""
            ),

            fee_type: String(
                rule.fee_type ??
                rule.late_fee_type ??
                "fixed"
            ).toLowerCase(),

            fee_value: Number(
                rule.fee_value ??
                rule.late_fee_value ??
                0
            ),

            effective_from: rule.effective_from
                ? String(rule.effective_from).slice(0, 10)
                : "",

            effective_to: rule.effective_to
                ? String(rule.effective_to).slice(0, 10)
                : "",
        }))
        : [];

console.log(
    "[Maintenance] Late rules loaded:",
    normalizedLateRules
);
            setSettings({
                ...emptySettings,

                calculation_method: calculationMethod,

                effective_from: data.effective_from
                    ? String(data.effective_from).slice(0, 10)
                    : "",

                description: data.description ?? "",

                rate_per_sqft:
                    data.rate_per_sqft ??
                    data.base_rate ??
                    0,

                fixed_monthly_amount:
                    data.fixed_monthly_amount ??
                    data.flat_amount ??
                    0,

                bhk_rates: normalizedBhkRates,

                // floor_charges:
                //     config?.floorCharges ??
                //     data.floor_charges ??
                //     [],
floor_charges: (
    config?.floorCharges ??
    data.floor_charges ??
    []
).map((charge: any) => ({
    ...charge,
    floor_from: charge.floor_from ?? charge.floor_number ?? "",
    floor_to:
        charge.floor_to ??
        charge.floor_from ??
        charge.floor_number ??
        "",
    monthly_amount: Number(
        charge.monthly_amount ?? charge.amount ?? 0
    ),
    applicable_units: charge.applicable_units ?? "all",
})),
//                 special_charges: (
//     data.specialCharges ??
//     data.special_charges ??
//     []
// ).map((charge: any) => ({
//     ...charge,
//     charge_name: charge.charge_name || "",
//     amount: Number(charge.amount || 0),
//     charge_type:
//         String(charge.charge_mode || "").toUpperCase() === "ONE_TIME"
//             ? "one_time"
//             : "recurring",
//     frequency: charge.frequency || "monthly",
//     interval_months: Number(charge.interval_months || 1),
//     payable_months: charge.payable_months || "",
//     applicable_units: String(
//         charge.applicable_for || charge.applicable_units || "ALL"
//     ).toLowerCase(),
//     effective_from: charge.effective_from
//         ? String(charge.effective_from).slice(0, 10)
//         : "",
//     effective_to: charge.effective_to
//         ? String(charge.effective_to).slice(0, 10)
//         : "",
// })),



special_charges: normalizedSpecialCharges,
                // late_rules: config?.lateRule
                //     ? [config.lateRule]
                //     : data.late_rules ?? [],
late_rules: normalizedLateRules,
                // Flats are intentionally not stored here.
                // They are maintained in the separate flats state.
            });

        } catch (err: any) {
            console.error(
                "Maintenance settings loading error:",
                err?.response?.data || err
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load maintenance settings."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    /* ---------------------------------------------------------------------- */
    /* SAVE COMPLETE MAINTENANCE CONFIGURATION                                */
    /* ---------------------------------------------------------------------- */

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (!settings.effective_from) {
                setError(
                    "Please select the maintenance effective date."
                );
                setActiveSection("base");
                return;
            }

            if (
                settings.fixed_monthly_amount === "" ||
                Number(settings.fixed_monthly_amount) <= 0
            ) {
                setError(
                    "Please enter the compulsory monthly flat amount for every flat."
                );
                setActiveSection("base");
                return;
            }

            if (
                settings.calculation_method === "area" &&
                (
                    settings.rate_per_sqft === "" ||
                    Number(settings.rate_per_sqft) <= 0
                )
            ) {
                setError(
                    "Please enter a valid rate per Sq.ft."
                );
                setActiveSection("base");
                return;
            }

            if (
                settings.calculation_method === "bhk" &&
                settings.bhk_rates.length === 0
            ) {
                setError(
                    "Please add at least one BHK rate."
                );
                setActiveSection("bhk");
                return;
            }

            await saveMaintenanceSettings(settings);

            setSuccess(
                "Maintenance configuration saved successfully."
            );

        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to save maintenance configuration."
            );

        } finally {
            setSaving(false);
        }
    };

    /* ---------------------------------------------------------------------- */
    /* INDIVIDUAL BHK RATE SAVE                                               */
    /* ---------------------------------------------------------------------- */

    const handleSaveBhkRate = async (
        rate: BhkRate,
        index: number
    ) => {
        if (settings.calculation_method !== "bhk") {
            setError(
                "Select Per BHK as the calculation method before saving BHK rates."
            );
            return;
        }

        if (!settings.effective_from) {
            setError(
                "Please select Effective From in Base Charges before saving BHK rates."
            );
            setActiveSection("base");
            return;
        }

        if (
            !rate.bhk_type.trim() ||
            rate.monthly_amount === "" ||
            Number(rate.monthly_amount) <= 0
        ) {
            setError(
                "Enter a BHK type and a valid monthly amount."
            );
            return;
        }

        try {
            setSavingBhkIndex(index);
            setError("");
            setSuccess("");

            // Backend requires effective_from when saving a BHK rate.
            const response = await saveBhkRate({
                ...rate,
                effective_from: settings.effective_from,
            } as BhkRate);

            const result: any = response?.data ?? response;

            if (result?.success !== false) {
                setSuccess(
                    `${rate.bhk_type} rate saved successfully.`
                );

                await loadSettings();

            } else {
                setError(
                    result?.message ||
                    "Unable to save BHK rate."
                );
            }

        } catch (err: any) {
            console.error(
                "BHK rate save error:",
                err?.response?.data || err?.message
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to save BHK rate."
            );

        } finally {
            setSavingBhkIndex(null);
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

    // const updateSpecialCharge = (
    //     index: number,
    //     key: keyof SpecialCharge,
    //     value: string
    // ) => {
    //     const updated = [...settings.special_charges];

    //     updated[index] = {
    //         ...updated[index],
    //         [key]:
    //             key === "amount" ||
    //             key === "interval_months"
    //                 ? numberValue(value)
    //                 : value,
    //     } as SpecialCharge;

    //     updateSettings("special_charges", updated);
    // };


const updateSpecialCharge = (
    index: number,
    key: keyof SpecialCharge,
    value: string
) => {
    const updated = [...settings.special_charges];
    const current = updated[index];

    if (key === "frequency") {
        const months = getDefaultPayableMonths(value);

        updated[index] = {
            ...current,
            frequency: value,
            payable_months: months.join(","),
            effective_from: getAutomaticEffectiveFrom(months),
        };

    } else {
        updated[index] = {
            ...current,
            [key]:
                key === "amount" || key === "interval_months"
                    ? numberValue(value)
                    : value,
        } as SpecialCharge;
    }

    updateSettings("special_charges", updated);
};

const updateSpecialChargeMonths = (
    index: number,
    month: number
) => {
    const updated = [...settings.special_charges];
    const current = updated[index];

    const selectedMonths = parsePayableMonths(
        current.payable_months
    );

    const nextMonths = selectedMonths.includes(month)
        ? selectedMonths.filter((m) => m !== month)
        : [...selectedMonths, month];

    nextMonths.sort((a, b) => a - b);

    updated[index] = {
        ...current,
        payable_months: nextMonths.join(","),
        effective_from: getAutomaticEffectiveFrom(nextMonths),
    };

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



    const handleSaveFlatDetails = async () => {
    if (!selectedUnit) {
        setError("Please select an apartment flat.");
        return;
    }

    if (!flatBhkType.trim()) {
        setError("Please enter the BHK type for this flat.");
        return;
    }

    const area = Number(flatAreaSqft);

    if (
        flatAreaSqft.trim() === "" ||
        !Number.isFinite(area) ||
        area <= 0
    ) {
        setError("Please enter a valid flat area greater than zero.");
        return;
    }

    try {
        setSavingFlatDetails(true);
        setError("");
        setSuccess("");
        setPreview(null);

        const response = await updateFlatDetails(
            selectedUnit.id,
            {
                bhk_type: flatBhkType.trim(),
                area_sqft: area,
            }
        );

        const result: any = response?.data ?? response;

        if (result?.success === false) {
            throw new Error(
                result.message || "Unable to save flat details."
            );
        }

        const updatedFlat =
            result?.flat ??
            result?.data?.flat ??
            result?.data ??
            result;

        // Update the existing flat in local state.
        setFlats((previous) =>
            previous.map((flat) =>
                flat.id === selectedUnit.id
                    ? {
                        ...flat,
                        bhk_type: updatedFlat.bhk_type ?? flatBhkType.trim(),
                        area_sqft: updatedFlat.area_sqft ?? area,
                    }
                    : flat
            )
        );

        setSuccess(
            `Flat ${selectedUnit.flat_number} details saved successfully.`
        );

    } catch (err: any) {
        console.error(
            "Save flat details error:",
            err?.response?.data || err
        );

        setError(
            err?.response?.data?.message ||
            err?.message ||
            "Unable to save flat details."
        );

    } finally {
        setSavingFlatDetails(false);
    }
};
    /* ---------------------------------------------------------------------- */
    /* PREVIEW                                                                */
    /* ---------------------------------------------------------------------- */

    const runPreview = async () => {
        if (!selectedFlatId) {
            setError(
                "Please select an apartment flat first."
            );
            return;
        }


        if (!selectedUnit) {
    setError("Selected apartment flat was not found.");
    return;
}

if (
    settings.calculation_method === "bhk" &&
    !selectedUnit.bhk_type?.trim()
) {
    setError(
        "BHK type is missing. Please update and save Flat Details before calculating maintenance."
    );
    return;
}

if (
    settings.calculation_method === "area" &&
    Number(selectedUnit.area_sqft || 0) <= 0
) {
    setError(
        "Flat area is missing. Please update and save Flat Details before calculating maintenance."
    );
    return;
}
        if (!billingMonth) {
            setError(
                "Please select a billing month."
            );
            return;
        }


if (!asOfDate) {
    setError("Please select the date for late fee calculation.");
    return;
}


        try {
            setPreviewLoading(true);
            setError("");
            setSuccess("");
            setPreview(null);

            const response = await getMaintenancePreview(
                Number(selectedFlatId),
                billingMonth,
                asOfDate
            );

            const data: any =
                response?.data ?? response;

            if (
                !data?.bills ||
                !Array.isArray(data.bills) ||
                data.bills.length === 0
            ) {
                setError(
                    "No maintenance preview is available for the selected flat."
                );
                return;
            }

            setPreview(data.bills[0]);

        } catch (err: any) {
            console.error(
                "Maintenance preview error:",
                err?.response?.data || err
            );

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
            flats.find(
                (unit) =>
                    Number(unit.id) === Number(selectedFlatId)
            ),
        [flats, selectedFlatId]
    );

    useEffect(() => {
    if (!selectedUnit) {
        setFlatBhkType("");
        setFlatAreaSqft("");
        return;
    }

    setFlatBhkType(selectedUnit.bhk_type ?? "");

    setFlatAreaSqft(
        selectedUnit.area_sqft == null
            ? ""
            : String(selectedUnit.area_sqft)
    );
}, [selectedUnit]);
    /* ---------------------------------------------------------------------- */
    /* CURRENCY FORMAT                                                        */
    /* ---------------------------------------------------------------------- */

    const money = (
        value: number | string | undefined
    ) =>
        `₹${Number(value || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;


        const getSpecialChargeFrequencyLabel = (item: {
    charge_mode: string;
    frequency?: string;
    interval_months?: number | null;
}) => {
    if (item.charge_mode === "ONE_TIME") {
        return "One-time";
    }

    switch (item.frequency?.toLowerCase()) {
        case "monthly":
            return "Monthly";
        case "quarterly":
            return "Quarterly";
        case "half_yearly":
            return "Half-yearly";
        case "yearly":
            return "Yearly";
        case "custom":
            return `Every ${Number(item.interval_months || 1)} months`;
        default:
            return "Recurring";
    }
};

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
                                disabled={
                                    section.key === "bhk" &&
                                    settings.calculation_method !== "bhk"
                                }
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
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
                        description="Choose the calculation basis and enter the compulsory monthly flat amount charged to every flat."
                    >
                        <div>
                            <label className={labelClass}>
                                Calculation Method
                            </label>

                            <div className="grid gap-3 sm:grid-cols-2">
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
                                    ] as [
                                        CalculationMethod,
                                        string,
                                        string
                                    ][]
                                ).map(([value, title, description]) => (
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
                                ))}
                            </div>
                        </div>

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

                        <div className="mt-6 max-w-sm">
                            <Field label="Compulsory Flat Amount per Month (₹) *">
                                <input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    required
                                    className={inputClass}
                                    value={settings.fixed_monthly_amount}
                                    onChange={(e) =>
                                        updateSettings(
                                            "fixed_monthly_amount",
                                            numberValue(e.target.value)
                                        )
                                    }
                                    placeholder="Enter common monthly amount"
                                />

                                <p className="mt-1.5 text-xs text-slate-500">
                                    This amount is charged to every flat in addition to the selected Per BHK or Per Sq.ft calculation.
                                </p>
                            </Field>
                        </div>

                        {settings.calculation_method === "bhk" && (
                            <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                                Configure monthly charges for each BHK type in the
                                <strong> BHK Mapping </strong>
                                section. The compulsory flat amount will also apply to every flat.
                            </p>
                        )}

                        <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                            Floor-wise charges are additional charges. Configure them separately in the
                            <strong> Floor Charges </strong>
                            section.
                        </p>

                        <div className="mt-7 border-t border-slate-200 pt-6">
                            <h3 className="mb-4 text-base font-semibold text-slate-800">
                                Charge Details
                            </h3>

                            <div className="grid gap-5 md:grid-cols-2">
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
                        description="Configure a monthly maintenance amount for each BHK type."
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
                            {settings.bhk_rates.map((rate, index) => (
                                <div
                                    key={index}
                                    className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-3"
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

                                    <div className="flex items-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSaveBhkRate(
                                                    rate,
                                                    index
                                                )
                                            }
                                            disabled={
                                                savingBhkIndex !== null
                                            }
                                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {savingBhkIndex === index ? (
                                                <RefreshCw
                                                    size={15}
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <Save size={15} />
                                            )}

                                            {savingBhkIndex === index
                                                ? "Saving..."
                                                : "Save"}
                                        </button>

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
                            ))}
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
                                                                (_, i) =>
                                                                    i !== index
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

                                                    {/* <Field label="Payable Months">
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
                                                    </Field> */}


<Field label="Payable Months">
    <div className="grid grid-cols-4 gap-2">
        {MONTH_OPTIONS.map((month) => {
            const selectedMonths = parsePayableMonths(
                charge.payable_months
            );

            const selected = selectedMonths.includes(month.value);

            return (
                <button
                    key={month.value}
                    type="button"
                    disabled={charge.frequency === "monthly"}
                    onClick={() =>
                        updateSpecialChargeMonths(
                            index,
                            month.value
                        )
                    }
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        selected
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-500 hover:border-blue-300"
                    } ${
                        charge.frequency === "monthly"
                            ? "cursor-not-allowed opacity-70"
                            : ""
                    }`}
                >
                    {month.label}
                </button>
            );
        })}
    </div>

    <p className="mt-2 text-xs text-slate-500">
        {charge.frequency === "monthly"
            ? "Monthly charges apply in all 12 months."
            : "Select the months in which this charge should be collected."}
    </p>
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
                                                        All
                                                    </option>
                                                    <option value="Owner">
                                                        Owner
                                                    </option>
                                                    <option value="Tenant">
                                                        Tenant
                                                    </option>
                                                </select>
                                            </Field>



                                            {/* <Field label="Effective From">
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
                                            </Field> */}


<Field label="Effective From">
    <input
        type="date"
        className={`${inputClass} ${
            charge.charge_type === "recurring"
                ? "cursor-not-allowed bg-slate-100"
                : ""
        }`}
        value={charge.effective_from}
        readOnly={charge.charge_type === "recurring"}
        onChange={(e) =>
            updateSpecialCharge(
                index,
                "effective_from",
                e.target.value
            )
        }
    />

    {charge.charge_type === "recurring" && (
        <p className="mt-1 text-xs text-blue-600">
            Automatically calculated from the first upcoming payable month.
        </p>
    )}
</Field>

<Field label="Effective To (Optional)">
    <input
        type="date"
        min={charge.effective_to || undefined}
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

    <p className="mt-1 text-xs text-slate-500">
        Leave empty if this charge should continue indefinitely.
    </p>
</Field>

                                            <div className="flex items-end">
                                                <RemoveButton
                                                    onClick={() =>
                                                        updateSettings(
                                                            "special_charges",
                                                            settings.special_charges.filter(
                                                                (_, i) =>
                                                                    i !== index
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
                                {/* {settings.late_rules.map(
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
                                                                (_, i) =>
                                                                    i !== index
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                )} */}


{settings.late_rules.map((rule, index) => (
    <div
        key={rule.id ?? index}
        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
        <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">
                Late Fee Slab {index + 1}
            </h3>

            <button
                type="button"
                onClick={() => {
                    updateSettings(
                        "late_rules",
                        settings.late_rules.filter(
                            (_, i) => i !== index
                        )
                    );
                }}
                className="text-red-600 hover:text-red-700"
            >
                <Trash2 size={17} />
            </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Delay From (Days)">
                <input
                    type="number"
                    min="1"
                    className={inputClass}
                    value={rule.delay_from_days}
                    onChange={(e) =>
                        updateLateRule(
                            index,
                            "delay_from_days",
                            e.target.value
                        )
                    }
                    placeholder="e.g. 1"
                />
            </Field>

            <Field label="Delay To (Days)">
                <input
                    type="number"
                    min="1"
                    className={inputClass}
                    value={rule.delay_to_days}
                    onChange={(e) =>
                        updateLateRule(
                            index,
                            "delay_to_days",
                            e.target.value
                        )
                    }
                    placeholder="e.g. 10"
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
                    <option value="fixed">Fixed Amount (₹)</option>
                    <option value="percentage">Percentage (%)</option>
                </select>
            </Field>

            <Field
                label={
                    rule.fee_type === "percentage"
                        ? "Fee Percentage (%)"
                        : "Late Fee Amount (₹)"
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
                    placeholder={
                        rule.fee_type === "percentage"
                            ? "e.g. 2"
                            : "e.g. 100"
                    }
                />
            </Field>

            <Field label="Effective From">
                <input
                    type="date"
                    className={inputClass}
                    value={rule.effective_from || ""}
                    onChange={(e) =>
                        updateLateRule(
                            index,
                            "effective_from",
                            e.target.value
                        )
                    }
                />
            </Field>

            <Field label="Effective To (Optional)">
                <input
                    type="date"
                    className={inputClass}
                    value={rule.effective_to || ""}
                    onChange={(e) =>
                        updateLateRule(
                            index,
                            "effective_to",
                            e.target.value
                        )
                    }
                />
            </Field>
        </div>

        <p className="mt-3 text-xs text-slate-500">
            {rule.fee_type === "percentage"
                ? "The percentage will be calculated on the outstanding maintenance amount."
                : "The configured fixed amount will be charged when this delay slab applies."}
        </p>
    </div>
))}

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

                            {/* FLAT DROPDOWN */}

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
                                        Select Apartment Flat
                                    </option>

                                    {flats.map((unit) => (
                                        <option
                                            key={unit.id}
                                            value={String(unit.id)}
                                        >
                                            {unit.apartment_name}
                                            {" - Block "}
                                            {unit.block_tower}
                                            {" - Floor "}
                                            {unit.floor_number}
                                            {" - Flat "}
                                            {unit.flat_number}
                                        </option>
                                    ))}
                                </select>

                                {flats.length === 0 && (
                                    <p className="mt-1 text-xs text-red-500">
                                        No active apartment flats found.
                                    </p>
                                )}
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
                                        setError("");
                                    }}
                                />
                            </Field>

{/* LATE FEE CALCULATION DATE */}

<Field label="Calculate Late Fee As Of">
    <input
        type="date"
        className={inputClass}
        value={asOfDate}
        onChange={(e) => {
            setAsOfDate(e.target.value);
            setPreview(null);
            setError("");
        }}
    />

    <p className="mt-1 text-xs text-slate-500">
        Select the date up to which overdue days and late payment fees
        should be calculated. Defaults to today.
    </p>
</Field>

                            {/* CALCULATE BUTTON */}

                            <div className="flex items-end">
                                <button
                                    type="button"
                                    onClick={runPreview}
                                    disabled={
                                        previewLoading ||
                                        flats.length === 0
                                    }
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

                        {/* {selectedUnit && (
                            <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                                <h3 className="font-semibold text-blue-900">
                                    Selected Flat Details
                                </h3>

                                <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                                    <p>
                                        <strong>Apartment:</strong>{" "}
                                        {selectedUnit.apartment_name || "-"}
                                    </p>

                                    <p>
                                        <strong>Flat Number:</strong>{" "}
                                        {selectedUnit.flat_number || "-"}
                                    </p>

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
                                        {selectedUnit.area_sqft
                                            ? `${selectedUnit.area_sqft} Sq.ft`
                                            : "-"}
                                    </p>

                                    <p>
                                        <strong>Ownership:</strong>{" "}
                                        {selectedUnit.ownership_type || "-"}
                                    </p>

                                    <p>
                                        <strong>Occupancy:</strong>{" "}
                                        {selectedUnit.occupancy_status || "-"}
                                    </p>

                                    <p>
                                        <strong>Flat ID:</strong>{" "}
                                        {selectedUnit.id}
                                    </p>
                                </div>
                            </div>
                        )} */}

{/* EDITABLE APARTMENT FLAT DETAILS */}

{selectedUnit && (
    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>
                <h3 className="text-lg font-bold text-slate-900">
                    Apartment Flat Details
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Flat {selectedUnit.flat_number}
                    {" · Block "}
                    {selectedUnit.block_tower}
                    {" · Floor "}
                    {selectedUnit.floor_number}
                </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                {selectedUnit.occupancy_status || "Occupied"}
            </span>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">

            {/* BHK TYPE */}

            <Field label="BHK Type">
                <select
                    className={inputClass}
                    value={flatBhkType}
                    onChange={(e) =>
                        setFlatBhkType(e.target.value)
                    }
                >
                    <option value="">
                        Select BHK Type
                    </option>

                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="5 BHK">5 BHK</option>
                    <option value="Studio">Studio</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Penthouse">Penthouse</option>
                </select>
            </Field>

            {/* AREA */}

            <Field label="Area (sq.ft.)">
                <input
                    type="number"
                    min="1"
                    step="0.01"
                    className={inputClass}
                    value={flatAreaSqft}
                    onChange={(e) =>
                        setFlatAreaSqft(e.target.value)
                    }
                    placeholder="Enter flat area"
                />
            </Field>
        </div>

        {/* MISSING DETAILS WARNING */}

        {(!flatBhkType.trim() || !flatAreaSqft.trim()) && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                />

                <div>
                    <p className="font-semibold">
                        Flat details are incomplete.
                    </p>

                    <p className="mt-1">
                        Please enter the missing BHK type and area
                        before calculating maintenance.
                    </p>
                </div>
            </div>
        )}

        {/* SAVE */}

        <div className="mt-5 flex justify-end">

            <button
                type="button"
                onClick={handleSaveFlatDetails}
                disabled={savingFlatDetails}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {savingFlatDetails ? (
                    <RefreshCw
                        size={16}
                        className="animate-spin"
                    />
                ) : (
                    <Save size={16} />
                )}

                {savingFlatDetails
                    ? "Saving..."
                    : "Save Flat Details"}
            </button>

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
                                    {/* extra added */}
                                    <div className="flex justify-between">
    <span>Fixed Monthly Amount</span>
    <span>
        ₹{Number(preview.fixed_monthly_amount || 0).toLocaleString("en-IN")}
    </span>
</div>

<div className="flex justify-between">
    <span>
        {preview.calculation_method === "PER_BHK"
            ? "BHK Charge"
            : "Per Sq.ft Charge"}
    </span>
    <span>
        ₹{Number(preview.calculated_method_amount || 0).toLocaleString("en-IN")}
    </span>
</div>

<div className="flex justify-between font-semibold">
    <span>Base Maintenance Amount</span>
    <span>
        ₹{Number(preview.base_amount || 0).toLocaleString("en-IN")}
    </span>
</div>
                                    {/* extra added */}

                                    {/* <AmountRow
                                        label="Base Maintenance"
                                        amount={preview.base_amount}
                                    /> */}

                                    <AmountRow
                                        label="Floor Charge"
                                        amount={preview.floor_charge}
                                    />

                                    <AmountRow
                                        label="Special Charges"
                                        amount={preview.special_charges}
                                    />

{/* INDIVIDUAL SPECIAL CHARGES */}
<div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
    <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-slate-800">
            Special Charge Breakdown
        </h4>

        <span className="text-xs text-slate-500">
            {preview.special_charge_items?.length || 0} applicable
        </span>
    </div>

    {preview.special_charge_items &&
    preview.special_charge_items.length > 0 ? (
        <div className="space-y-3">
            {preview.special_charge_items.map((item, index) => (
                <div
                    key={item.id ?? index}
                    className="flex items-center justify-between gap-3 border-b border-amber-100 pb-3 last:border-0 last:pb-0"
                >
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800">
                            {item.charge_name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                            {getSpecialChargeFrequencyLabel(item)}
                        </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold text-slate-800">
                        {money(item.amount)}
                    </span>
                </div>
            ))}
        </div>
    ) : Number(preview.special_charges || 0) === 0 ? (
        <p className="text-xs text-slate-500">
            No special charges apply to this flat for the selected month.
        </p>
    ) : (
        <p className="text-xs text-amber-700">
            Individual charge details are unavailable. Please calculate the preview again.
        </p>
    )}
</div>
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
