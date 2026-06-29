import ApartmentHero from "../components/apartment/ApartmentHero";
import ApartmentFeatures from "../components/apartment/ApartmentFeatures";
import VisitorFlow from "../components/apartment/VisitorFlow";
import SecurityFeatures from "../components/apartment/SecurityFeatures";
import Dashboard from "../components/apartment/Dashboard";
import Benefits from "../components/apartment/Benefits";
import FAQ from "../components/apartment/FAQ";
import CTA from "../components/apartment/CTA";

export default function Apartment() {
  return (
    <>
      <ApartmentHero />
      <ApartmentFeatures />
      <VisitorFlow />
      <SecurityFeatures />
      <Dashboard />
      <Benefits />
      <FAQ />
      <CTA />
    </>
  );
}
