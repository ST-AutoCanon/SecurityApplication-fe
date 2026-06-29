import HospitalHero from "../components/hospital/HospitalHero";
import HospitalFeatures from "../components/hospital/HospitalFeatures";
import PatientVisitorFlow from "../components/hospital/PatientVisitorFlow";
import HospitalSecurity from "../components/hospital/HospitalSecurity";
import HospitalDashboard from "../components/hospital/HospitalDashboard";
import HospitalBenefits from "../components/hospital/HospitalBenefits";
import HospitalFAQ from "../components/hospital/HospitalFAQ";
import HospitalCTA from "../components/hospital/HospitalCTA";

export default function Hospital() {
  return (
    <>
      <HospitalHero />
      <HospitalFeatures />
      <PatientVisitorFlow />
      <HospitalSecurity />
      <HospitalDashboard />
      <HospitalBenefits />
      <HospitalFAQ />
      <HospitalCTA />
    </>
  );
}
