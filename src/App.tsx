/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import CinematicHero from './components/CinematicHero';
import ActivitiesStack from './components/ActivitiesStack';
import InternshipSection from './components/InternshipSection';
import VolunteerSection from './components/VolunteerSection';
import OthersSection from './components/OthersSection';
import ArchiveSection from './components/ArchiveSection';
import TextMarquee from './components/TextMarquee';
import ScrollGradient from './components/ScrollGradient';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // Immediate Background Switch (Black to White)
      gsap.to(mainRef.current, {
        backgroundColor: "#FFFFFF",
        scrollTrigger: {
          trigger: "#activities-section",
          start: "top 80%", // Switch earlier for smoothness
          toggleActions: "play none none reverse", // Stay white when scrolling down, revert only when scrolling back up
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={mainRef}
      className="relative bg-black min-h-screen selection:bg-[#D2D904] selection:text-black"
    >
      <CustomCursor />
      <GrainOverlay />
      <ScrollGradient />
      
      <div className="relative z-10">
        <CinematicHero />
      </div>

      <div id="activities-section" className="relative z-20">
        <ActivitiesStack />
      </div>

      <div className="relative z-20">
        <InternshipSection />
      </div>
      
      {/* Spacer between Internship and Volunteer */}
      <div className="h-[5vh]" />

      <div className="relative z-20">
        <VolunteerSection />
      </div>

      <div className="h-[5vh]" />

      <div className="relative z-20">
        <OthersSection />
      </div>

      <ArchiveSection />
      
      <TextMarquee />
    </main>
  );
}

