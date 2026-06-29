import EventHero from "../components/events/EventHero";
import EventFeatures from "../components/events/EventFeatures";
import EventFlow from "../components/events/EventFlow";
import EventSecurity from "../components/events/EventSecurity";
import EventDashboard from "../components/events/EventDashboard";
import EventBenefits from "../components/events/EventBenefits";
import EventFAQ from "../components/events/EventFAQ";
import EventCTA from "../components/events/EventCTA";

export default function Event() {
  return (
    <>
      <EventHero />
      <EventFeatures />
      <EventFlow />
      <EventSecurity />
      <EventDashboard />
      <EventBenefits />
      <EventFAQ />
      <EventCTA />
    </>
  );
}
