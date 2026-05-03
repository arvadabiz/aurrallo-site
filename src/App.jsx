import config from './config.json';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import SocialProof from './components/SocialProof';
import Pain       from './components/Pain';
import Solution   from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Benefits   from './components/Benefits';
import Pricing    from './components/Pricing';
import FinalCTA   from './components/FinalCTA';
import Footer     from './components/Footer';

export default function App() {
  const { colors, brand, navbar, hero, socialProof, pain, solution, howItWorks, benefits, pricing, finalCta, footer } = config;

  return (
    <div className="font-sans overflow-x-hidden">
      <Navbar config={navbar} colors={colors} brand={brand} />

      <main>
        <Hero
          config={hero}
          colors={colors}
          brand={brand}
          nextSectionBg={colors.socialProofBg}
        />
        <SocialProof config={socialProof} colors={colors} />
        <Pain        config={pain}        colors={colors} />
        <Solution    config={solution}    colors={colors} />
        <HowItWorks  config={howItWorks}  colors={colors} />
        <Benefits    config={benefits}    colors={colors} />
        <Pricing     config={pricing}     colors={colors} />
        <FinalCTA    config={finalCta}    colors={colors} />
      </main>

      <Footer config={footer} colors={colors} brand={brand} />
    </div>
  );
}
