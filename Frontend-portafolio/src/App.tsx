/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { FeaturedProjects } from './components/FeaturedProjects';
import { TechStack } from './components/TechStack';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { WelcomeScreen } from './components/WelcomeScreen';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isWelcomeDone, setIsWelcomeDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Intro Welcome Screen on web entry: notifies onComplete when text reveal finishes or user dismisses */}
      <WelcomeScreen onComplete={() => setIsWelcomeDone(true)} />

      {/* Top Navbar with the exact links requested: Inicio, About Me, Proyectos, Mi Stack, Contáctame */}
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Kinetic Hero: Tech squares fall from the sky once welcome screen reveals */}
        <Hero
          onOpenContact={() => setIsContactModalOpen(true)}
          isWelcomeDone={isWelcomeDone}
        />

        {/* Conóceme / About Me: Preserved exactly as requested */}
        <AboutMe />

        {/* Proyectos: Features dynamic projects with scroll-linked appear/disappear animation */}
        <FeaturedProjects />

        {/* Mi Stack: Interactive keyboard with scroll-linked appear/disappear animation */}
        <TechStack />

        {/* Contáctame: Refined contact cards with scroll-linked appear/disappear animation */}
        <ContactSection onOpenModal={() => setIsContactModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick interactive contact modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
