import React, { useState, Suspense, lazy } from 'react';
import { BrandedLoader } from './components/BrandedLoader';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickInfo } from './components/QuickInfo';
import { BrandStory } from './components/BrandStory';
import { SignatureDishes } from './components/SignatureDishes';
import { DiningExperience } from './components/DiningExperience';
import { FoodStoryParallax } from './components/FoodStoryParallax';
import { FAQSection } from './components/FAQSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { BackToTop } from './components/BackToTop';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { MenuSectionSkeleton } from './components/MenuSectionSkeleton';
import { GallerySkeleton } from './components/GallerySkeleton';
import { ScrollReveal } from './components/ScrollReveal';
import { ThemeProvider } from './context/ThemeContext';
import { MenuCategory } from './types';

// Code-split heavy components using React.lazy to optimize initial page load performance
const MenuSection = lazy(() => import('./components/MenuSection'));
const FoodGallery = lazy(() => import('./components/FoodGallery'));

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('ALL');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleExploreMenuDish = (dishName: string) => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#2B0709] text-white flex flex-col selection:bg-[#F4C928] selection:text-[#2B0709]"
    >
      {/* Slim Gold Scroll-Progress Indicator */}
      <ScrollProgressBar />

      {/* Branded Entry Animation */}
      <BrandedLoader />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Fullscreen Hero */}
        <Hero />

        {/* 3-Item Quick Info Strip */}
        <ScrollReveal distance={20} duration={0.6}>
          <QuickInfo />
        </ScrollReveal>

        {/* Editorial Brand Story */}
        <ScrollReveal distance={28} duration={0.7}>
          <BrandStory />
        </ScrollReveal>

        {/* Signature Dishes Highlights */}
        <ScrollReveal distance={28} duration={0.7}>
          <SignatureDishes />
        </ScrollReveal>

        {/* Dining Experience Categories */}
        <ScrollReveal distance={28} duration={0.7}>
          <DiningExperience
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </ScrollReveal>

        {/* Code-Split Complete Menu with Luxury Suspense Fallback */}
        <ScrollReveal distance={28} duration={0.7}>
          <Suspense fallback={<MenuSectionSkeleton />}>
            <MenuSection
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </Suspense>
        </ScrollReveal>

        {/* Parallax Food Story Section */}
        <ScrollReveal distance={24} duration={0.7}>
          <FoodStoryParallax />
        </ScrollReveal>

        {/* Code-Split Food Gallery with Luxury Suspense Fallback */}
        <ScrollReveal distance={28} duration={0.7}>
          <Suspense fallback={<GallerySkeleton />}>
            <FoodGallery onExploreMenuDish={handleExploreMenuDish} />
          </Suspense>
        </ScrollReveal>

        {/* Minimalist Frequently Asked Questions Section */}
        <ScrollReveal distance={28} duration={0.7}>
          <FAQSection />
        </ScrollReveal>

        {/* Location & Directions Section */}
        <ScrollReveal distance={28} duration={0.7}>
          <LocationSection />
        </ScrollReveal>
      </main>

      {/* Large Premium Footer */}
      <Footer />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomBar />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Interactive Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

