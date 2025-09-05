import HeroSection from "./_components/HeroSection";
import StatsSection from "./_components/StatsSection";
import WhoWeAreSection from "./_components/WhoWeAreSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import WhenYouBookSection from "./_components/WhenYouBookSection";
import TabbedContentSection from "./_components/TabbedContentSection";
import CTASection from "./_components/CTASection";

const About = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <div className="w-full flex flex-col gap-10 mt-10 container">
        <StatsSection />
        <WhoWeAreSection />
        <TabbedContentSection />
        <HowItWorksSection />
        <WhenYouBookSection />
        <CTASection />
      </div>
    </div>
  );
};

export default About;
