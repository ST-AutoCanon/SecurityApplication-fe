
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/apartment-maintenance`;

// export type CalculationMethod = "bhk" | "area" | "floor" | "fixed";
export type CalculationMethod = "bhk" | "area" | "fixed";
export interface BhkRate {
  bhk_type: string;
  min_area: number | "";
  max_area: number | "";
  monthly_amount: number | "";
}

export interface FloorCharge {
  floor_from: string;
  floor_to: string;
  monthly_amount: number | "";
  applicable_units: string;
}

export interface SpecialCharge {
  id?: number;
  charge_name: string;
  amount: number | "";
  charge_type: "one_time" | "recurring";
  frequency: "monthly" | "quarterly" | "half_yearly" | "yearly" | "custom";
  interval_months: number;
  payable_months: string;
  applicable_units: string;
  effective_from: string;
  effective_to: string;
}

export interface LateRule {
  id?: number;
  delay_from_days: number | "";
  delay_to_days: number | "";
  fee_type: "fixed" | "percentage";
  fee_value: number | "";
}

// export interface MaintenanceUnit {
//   member_id: number;
//   member_name: string;
//   flat_number: string;
//   block_tower: string;
//   floor_number: string;
//   bhk_type: string;
//   area_sqft: number | "";
// }

export interface MaintenanceUnit {
  id: number; // apartment_flats.id
  apartment_name?: string;
  block_tower: string;
  flat_number: string;
  floor_number: string;
  bhk_type: string;
  area_sqft: number | "";
  ownership_type?: "OWNER" | "TENANT";
  occupancy_status?: string;
  is_active?: boolean;
}

export interface MaintenanceSettings {
    
  calculation_method: CalculationMethod;
applicable_for: "all" | "owner" | "tenant";  
effective_from: string;
  description: string;

  rate_per_sqft: number | "";
  fixed_monthly_amount: number | "";
  bhk_rates: BhkRate[];
  floor_charges: FloorCharge[];
  special_charges: SpecialCharge[];
  late_rules: LateRule[];
  units: MaintenanceUnit[];
}
export interface MaintenancePreviewBill {
  flat_id: number; // apartment_flats.id
  flat_number: string;
  block_tower: string;
  floor_number: string;
  bhk_type: string;
  area_sqft: number;
  base_amount: number;
  floor_charge: number;
  special_charges: number;
  late_fee: number;
  total_amount: number;
}
export interface MaintenancePreview {
  bill_month: string;
  due_date: string | null;
  calculation_method: string;
  flats_count: number;
  total_amount: number;
  bills: MaintenancePreviewBill[];
}
// export interface MaintenancePreview {
//   member_id: number;
//   member_name: string;
//   flat_number: string;
//   billing_month: string;
//   base_amount: number;
//   floor_amount: number;
//   special_charges: {
//     charge_name: string;
//     amount: number;
//   }[];
//   late_fee: number;
//   total_amount: number;
// }

// export const emptySettings: MaintenanceSettings = {
//   calculation_method: "bhk",
//   rate_per_sqft: 0,
//   fixed_monthly_amount: 0,
//   bhk_rates: [
//     { bhk_type: "1 BHK", min_area: "", max_area: "", monthly_amount: 0 },
//     { bhk_type: "2 BHK", min_area: "", max_area: "", monthly_amount: 0 },
//     { bhk_type: "3 BHK", min_area: "", max_area: "", monthly_amount: 0 },
//   ],
//   floor_charges: [],
//   special_charges: [],
//   late_rules: [],
//   units: [],
// };
export const emptySettings: MaintenanceSettings = {
  calculation_method: "bhk",

  // Base Charge fields
  applicable_for: "all",
  effective_from: "",
  description: "",

  rate_per_sqft: 0,
  fixed_monthly_amount: 0,

  bhk_rates: [
    { bhk_type: "1 BHK", min_area: "", max_area: "", monthly_amount: 0 },
    { bhk_type: "2 BHK", min_area: "", max_area: "", monthly_amount: 0 },
    { bhk_type: "3 BHK", min_area: "", max_area: "", monthly_amount: 0 },
  ],

  floor_charges: [],
  special_charges: [],
  late_rules: [],
  units: [],
};
export const getMaintenanceSettings = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });
  return response.data;
};

// export const saveMaintenanceSettings = async (
//   settings: MaintenanceSettings,
// ) => {
//   const response = await axios.put(`${API_URL}/settings`, settings, {
//     withCredentials: true,
//   });
//   return response.data;
// };



export const saveMaintenanceSettings = async (
  settings: MaintenanceSettings,
) => {
  const methodMap: Record<string, string> = {
    bhk: "PER_BHK",
    area: "PER_SQFT",
    fixed: "FLAT_AMOUNT",
  };

  const calculationMethod =
    methodMap[settings.calculation_method];

  if (!calculationMethod) {
    throw new Error(
      "Please select Per BHK, Per Sq.ft or Flat Amount. Floor charges are configured separately."
    );
  }

  const applicableMap: Record<string, string> = {
    all: "ALL",
    owner: "OWNER",
    tenant: "TENANT",
  };

  const payload = {
    ...settings,
    calculation_method: calculationMethod,
    applicable_for:
      applicableMap[settings.applicable_for] || "ALL",

    base_rate:
      settings.calculation_method === "area"
        ? Number(settings.rate_per_sqft || 0)
        : settings.calculation_method === "fixed"
          ? Number(settings.fixed_monthly_amount || 0)
          : 0,
  };

  const response = await axios.put(`${API_URL}/settings`, payload, {
    withCredentials: true,
  });

  return response.data;
};

// export const getMaintenancePreview = async (
//   memberId: number,
//   billingMonth: string,
// ) => {
//   const response = await axios.get(`${API_URL}/preview`, {
//     params: {
//       member_id: memberId,
//       billing_month: billingMonth,
//     },
//     withCredentials: true,
//   });

//   return response.data;
// };
export const getMaintenancePreview = async (
  flatId: number,
  billingMonth: string
) => {
  if (!Number.isInteger(Number(flatId)) || Number(flatId) <= 0) {
    throw new Error("Please select a valid flat");
  }

  const response = await axios.get(`${API_URL}/preview`, {
    params: {
      flat_id: flatId,
      month: billingMonth,
    },
    withCredentials: true,
  });

  return response.data;
};