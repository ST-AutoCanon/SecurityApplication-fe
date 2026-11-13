
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/apartment-maintenance`;

// =====================================
// TYPES
// =====================================

export type CalculationMethod = "bhk" | "area";

export interface BhkRate {
    bhk_type: string;
    monthly_amount: number | "";
}

export interface FloorCharge {
    id?: number;
    floor_from: number | string;
    floor_to: number | string;
    monthly_amount: number | "";
    applicable_units: "all" | "owner" | "tenant" | string;
}

// export interface SpecialCharge {
//     id?: number;
//     charge_name: string;
//     amount: number | "";
//     charge_type: "one_time" | "recurring" | string;
//     frequency:
//         | "monthly"
//         | "quarterly"
//         | "half_yearly"
//         | "yearly"
//         | "custom"
//         | string;
//     interval_months: number | "";
//     payable_months: number | "";
//     applicable_units: "all" | "owner" | "tenant" | string;
//     effective_from: string;
//     effective_to: string;
// }
export interface SpecialCharge {
    id?: number;
    charge_name: string;
    amount: number | "";
    charge_type: "one_time" | "recurring" | string;
    frequency: "monthly" | "quarterly" | "half_yearly" | "yearly" | "custom" | string;
    interval_months: number | "";
    payable_months: string;
    applicable_units: "all" | "owner" | "tenant" | string;
    effective_from: string;
    effective_to: string;
}
// export interface LateRule {
//     id?: number;
//     delay_from_days: number | "";
//     delay_to_days: number | "";
//     fee_type: "fixed" | "percentage" | string;
//     fee_value: number | "";
// }
export interface LateRule {
    id?: number;
    delay_from_days: number | "";
    delay_to_days: number | "";
    fee_type: "fixed" | "percentage" | string;
    fee_value: number | "";
    effective_from: string;
    effective_to: string;
}
export interface MaintenanceUnit {
    id: number;
    apartment_name?: string;
    block_tower?: string;
    floor_number?: string | number;
    flat_number: string | number;
    bhk_type?: string;
    area_sqft?: number | string;
    ownership_type?: string;
    occupancy_status?: string;
}

export interface MaintenanceSettings {
    calculation_method: CalculationMethod;
    effective_from: string;
    description: string;

    // Per Sq.ft calculation rate
    rate_per_sqft: number | "";

    // Compulsory monthly amount charged to every flat
    fixed_monthly_amount: number | "";

    bhk_rates: BhkRate[];
    floor_charges: FloorCharge[];
    special_charges: SpecialCharge[];
    late_rules: LateRule[];
    units: MaintenanceUnit[];
}

export interface SpecialChargePreviewItem {
    id?: number;
    charge_name: string;
    charge_mode: "ONE_TIME" | "RECURRING" | string;
    frequency?: string;
    interval_months?: number | null;
    payable_months?: string | null;
    amount: number | string;
}
export interface MaintenanceBillPreview {
    id?: number;
    flat_id?: number;
    flat_number: string | number;
    billing_month?: string;
    base_amount: number | string;
    floor_charge: number | string;
    special_charges: number | string;
    late_fee: number | string;
    total_amount: number | string;
    fixed_monthly_amount: number | string;
calculated_method_amount: number | string;
calculation_method?: string;
special_charge_items?: SpecialChargePreviewItem[];
}

export interface MaintenancePreview {
    bills: MaintenanceBillPreview[];
}

export interface UpdateFlatDetailsPayload {
    bhk_type: string;
    area_sqft: number;
}

export const updateFlatDetails = async (
    flatId: number,
    payload: UpdateFlatDetailsPayload
) => {
    if (!Number.isInteger(flatId) || flatId <= 0) {
        throw new Error("Invalid apartment flat ID.");
    }

    const response = await axios.put(
        `${API_URL}/flats/${flatId}/details`,
        payload,
        { withCredentials: true }
    );

    return unwrap(response);
};
// =====================================
// EMPTY SETTINGS
// =====================================

export const emptySettings: MaintenanceSettings = {
    calculation_method: "bhk",
    effective_from: "",
    description: "",
    rate_per_sqft: "",
    fixed_monthly_amount: "",
    bhk_rates: [],
    floor_charges: [],
    special_charges: [],
    late_rules: [],
    units: [],
};

// =====================================
// RESPONSE HANDLER
// =====================================

const unwrap = (response: any) => {
    return response?.data ?? response;
};

// =====================================
// GET APARTMENT FLATS
// =====================================

export const getFlats = async () => {
    const response = await axios.get(`${API_URL}/flats`, {
        withCredentials: true,
    });

    return unwrap(response);
};

// =====================================
// UPDATE FLAT DETAILS (BHK TYPE / AREA)
// =====================================

export interface UpdateFlatPayload {
    bhk_type: string;
    area_sqft: number | "";
}

export const updateFlat = async (
    flatId: number,
    data: UpdateFlatPayload
) => {
    if (!flatId) {
        throw new Error("Valid flat ID is required.");
    }

    if (!data.bhk_type?.trim()) {
        throw new Error("Please select the BHK type.");
    }

    const payload = {
        bhk_type: data.bhk_type.trim(),
        area_sqft:
            data.area_sqft === ""
                ? null
                : Number(data.area_sqft),
    };

    const response = await axios.put(
        `${API_URL}/flats/${flatId}`,
        payload,
        {
            withCredentials: true,
        }
    );

    return unwrap(response);
};

// =====================================
// GET MAINTENANCE SETTINGS
// =====================================

// export const getMaintenanceSettings = async () => {
//     const response = await axios.get(`${API_URL}/settings`, {
//         withCredentials: true,
//     });

//     return unwrap(response);
// };
export const getMaintenanceSettings = async () => {
    const response = await axios.get(`${API_URL}/settings`, {
        withCredentials: true,
    });

    const result = unwrap(response);

    // Controller response is wrapped inside { success, message, data }
    const configuration = result?.data ?? result;

    return {
        ...configuration,

        // Normalize backend camelCase and frontend snake_case
        late_rules:
            configuration?.late_rules ??
            configuration?.lateRules ??
            [],

        bhk_rates:
            configuration?.bhk_rates ??
            configuration?.bhkRates ??
            [],

        floor_charges:
            configuration?.floor_charges ??
            configuration?.floorCharges ??
            [],

        special_charges:
            configuration?.special_charges ??
            configuration?.specialCharges ??
            [],
    };
};

// =====================================
// SAVE MAINTENANCE SETTINGS
// =====================================

export const saveMaintenanceSettings = async (
    settings: MaintenanceSettings
) => {
    // Compulsory flat amount validation
    if (
        settings.fixed_monthly_amount === "" ||
        Number(settings.fixed_monthly_amount) <= 0
    ) {
        throw new Error(
            "Compulsory monthly flat amount must be greater than zero."
        );
    }

    // Per Sq.ft validation
    if (
        settings.calculation_method === "area" &&
        (settings.rate_per_sqft === "" ||
            Number(settings.rate_per_sqft) <= 0)
    ) {
        throw new Error(
            "Rate per Sq.ft must be greater than zero."
        );
    }

    // Per BHK validation
    if (
        settings.calculation_method === "bhk" &&
        settings.bhk_rates.length === 0
    ) {
        throw new Error(
            "Add at least one BHK rate."
        );
    }

    const payload = {
        ...settings,

        // Only Per BHK or Per Sq.ft can be selected
        calculation_method:
            settings.calculation_method === "area"
                ? "PER_SQFT"
                : "PER_BHK",

        // Compulsory common monthly amount for every flat
        fixed_monthly_amount: Number(
            settings.fixed_monthly_amount
        ),

        // Only send the selected calculation method's values
        rate_per_sqft:
            settings.calculation_method === "area"
                ? Number(settings.rate_per_sqft)
                : 0,

        base_rate:
            settings.calculation_method === "area"
                ? Number(settings.rate_per_sqft)
                : 0,

        // BHK rates are used only for Per BHK calculation
        bhk_rates:
            settings.calculation_method === "bhk"
                ? settings.bhk_rates.map((rate) => ({
                      bhk_type: rate.bhk_type.trim(),
                      amount: Number(rate.monthly_amount),
                      monthly_amount: Number(rate.monthly_amount),
                  }))
                : [],

        // floor_charges: settings.floor_charges,
        floor_charges: settings.floor_charges.map((charge) => ({
    ...charge,
    floor_from: String(charge.floor_from).trim(),
    floor_to: String(charge.floor_to).trim(),
    monthly_amount: Number(charge.monthly_amount),
    amount: Number(charge.monthly_amount),
    charge_type: "FIXED",
})),

//         special_charges: settings.special_charges.map((charge) => ({
//     charge_name: charge.charge_name.trim(),
//     amount: Number(charge.amount),
//     charge_mode:
//         charge.charge_type === "one_time"
//             ? "ONE_TIME"
//             : "RECURRING",
//     applicable_for: charge.applicable_units.toUpperCase(),
//     frequency: charge.frequency,
//     interval_months: Number(charge.interval_months || 1),
//     payable_months: charge.payable_months || null,
//     effective_from: charge.effective_from || null,
//     effective_to: charge.effective_to || null,
// })),

special_charges: settings.special_charges.map((charge) => ({
  charge_name: charge.charge_name,
  amount: Number(charge.amount),

  // Actual database calculation type
  charge_type: "FIXED",

  // One-time or recurring
  charge_mode:
    charge.charge_type === "one_time"
      ? "ONE_TIME"
      : "RECURRING",

  applicable_for: (
    charge.applicable_units || "all"
  ).toUpperCase(),

  frequency:
    charge.charge_type === "one_time"
      ? null
      : charge.frequency,

  interval_months:
    charge.charge_type === "one_time"
      ? null
      : charge.interval_months,

  payable_months: charge.payable_months || null,
  effective_from: charge.effective_from,
  effective_to: charge.effective_to || null,
})),
        late_rules: settings.late_rules.map((rule) => ({
    ...(rule.id ? { id: rule.id } : {}),

    delay_from_days: Number(rule.delay_from_days),
    delay_to_days: Number(rule.delay_to_days),

    fee_type: String(rule.fee_type || "fixed").toUpperCase(),
    fee_value: Number(rule.fee_value),

    effective_from:
        rule.effective_from || settings.effective_from,

    effective_to: rule.effective_to || null,
}))};
        
        // =====================================
// LATE PAYMENT RULES
// =====================================

// Validate late-payment rules first.
// settings.late_rules.forEach((rule, index) => {
//     const from = Number(rule.delay_from_days);
//     const to = Number(rule.delay_to_days);
//     const fee = Number(rule.fee_value);

//     if (
//         rule.delay_from_days === "" ||
//         rule.delay_to_days === "" ||
//         !Number.isInteger(from) ||
//         from < 1 ||
//         !Number.isInteger(to) ||
//         to < from
//     ) {
//         throw new Error(
//             `Invalid delay range in late rule ${index + 1}`
//         );
//     }

//     if (
//         rule.fee_value === "" ||
//         !Number.isFinite(fee) ||
//         fee <= 0
//     ) {
//         throw new Error(
//             `Invalid late fee in rule ${index + 1}`
//         );
//     }

//     if (!rule.effective_from && !settings.effective_from) {
//         throw new Error(
//             `Effective from date is required for late rule ${index + 1}`
//         );
//     }

//     const feeType = String(rule.fee_type || "fixed").toLowerCase();

//     if (!["fixed", "percentage"].includes(feeType)) {
//         throw new Error(
//             `Invalid fee type in late rule ${index + 1}`
//         );
//     }
// })};


//         settings.late_rules.forEach((rule, index) => {
//     if (
//         rule.delay_from_days === "" ||
//         rule.delay_to_days === "" ||
//         Number(rule.delay_from_days) < 0 ||
//         Number(rule.delay_to_days) < Number(rule.delay_from_days)
//     ) {
//         throw new Error(`Invalid delay range in late rule ${index + 1}`);
//     }

//     if (
//         rule.fee_value === "" ||
//         Number(rule.fee_value) <= 0
//     ) {
//         throw new Error(`Invalid late fee in rule ${index + 1}`);
//     }

//     if (!rule.effective_from && !settings.effective_from) {
//         throw new Error("Effective from date is required for late payment rules.");
//     }
// }),
// };
        
//         settings.late_rules.map((rule) => ({
//     ...(rule.id ? { id: rule.id } : {}),

//     delay_from_days: Number(rule.delay_from_days),
//     delay_to_days: Number(rule.delay_to_days),

//     fee_type: rule.fee_type.toUpperCase(),
//     fee_value: Number(rule.fee_value),

//     effective_from: rule.effective_from || settings.effective_from,
//     effective_to: rule.effective_to || null,
// })),
    
console.log(
    "[Maintenance Settings] Date being saved:",
    settings.effective_from
);

console.log(
    "[Maintenance Settings] Payload:",
    payload
);
    const response = await axios.put(
        `${API_URL}/settings`,
        payload,
        {
            withCredentials: true,
        }
    );

    return unwrap(response);
};

// =====================================
// SAVE INDIVIDUAL BHK RATE
// =====================================

export const saveBhkRate = async (rate: BhkRate) => {
    if (!rate.bhk_type.trim()) {
        throw new Error("BHK type is required.");
    }

    if (
        rate.monthly_amount === "" ||
        Number(rate.monthly_amount) <= 0
    ) {
        throw new Error(
            "BHK monthly amount must be greater than zero."
        );
    }

    const response = await axios.post(
        `${API_URL}/bhk-rates`,
        {
            bhk_type: rate.bhk_type.trim(),
            amount: Number(rate.monthly_amount),
            monthly_amount: Number(rate.monthly_amount),
        },
        {
            withCredentials: true,
        }
    );

    return unwrap(response);
};

// =====================================
// GET MAINTENANCE PREVIEW
// =====================================

// export const getMaintenancePreview = async (
//     flatId: number,
//     billingMonth: string
// ) => {
//     const response = await axios.get(
//         `${API_URL}/preview`,
//         {
//             params: {
//                 flat_id: flatId,
//                 billing_month: billingMonth,
//             },
//             withCredentials: true,
//         }
//     );

//     return unwrap(response);
// };
// export const getMaintenancePreview = async (
//     flatId: number,
//     billingMonth: string
// ) => {
//     const response = await axios.get(`${API_URL}/preview`, {
//         params: {
//             flat_id: flatId,
//             month: billingMonth,
//         },
//         withCredentials: true,
//     });

//     return unwrap(response);
// };

export const getMaintenancePreview = async (
    flatId: number,
    billingMonth: string,
    asOfDate: string
) => {
    const response = await axios.get(`${API_URL}/preview`, {
        params: {
            flat_id: flatId,
            billing_month: billingMonth,
            as_of_date: asOfDate,
        },
        withCredentials: true,
    });

    return unwrap(response);
};
