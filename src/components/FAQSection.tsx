import React, { useState } from 'react';
import {
  ChevronDown,
  Utensils,
  Users,
  Car,
  Clock,
  CreditCard,
  PackageCheck,
  HelpCircle,
  Phone,
  Sparkles,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FAQItem {
  id: string;
  category: 'dietary' | 'groups' | 'parking' | 'general';
  question: string;
  answer: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'dietary-options',
    category: 'dietary',
    question: 'What dietary preferences and spice customizations do you accommodate?',
    answer:
      'We offer an extensive selection of dedicated pure vegetarian delicacies alongside our authentic non-vegetarian specialties. Our master chefs are happy to calibrate spice intensities (from mild family-friendly seasoning to authentic high-heat Andhra spice). For guests with specific dietary requirements or allium-free preferences, please inform our service captains when seated.',
    badge: 'Dietary & Allergies',
    icon: Utensils,
  },
  {
    id: 'group-bookings',
    category: 'groups',
    question: 'Can you host large family gatherings, corporate lunches, or tour groups?',
    answer:
      'Yes, absolutely. Sai Datta features expansive family dining spaces and dedicated banqueting arrangements accommodating intimate parties of 10 up to large gatherings of 80+ guests. For parties exceeding 10 guests or customized celebratory menus, we recommend reserving 24–48 hours in advance via our direct phone line.',
    badge: 'Events & Parties',
    icon: Users,
  },
  {
    id: 'parking-access',
    category: 'parking',
    question: 'Is there convenient parking available for cars and highway travelers?',
    answer:
      'Yes. Located directly along the Muthangi NH 65 highway corridor, we provide generous, well-lit parking that accommodates passenger cars, family SUVs, and highway travel buses with ease and security.',
    badge: 'Highway & Parking',
    icon: Car,
  },
  {
    id: 'operating-hours',
    category: 'general',
    question: 'What are your dining hours, and do you close between lunch and dinner?',
    answer:
      'We are open 7 days a week continuously from 11:00 AM to 11:00 PM without any afternoon closure. Whether you are seeking a leisurely afternoon lunch, late evening snacks, or a celebratory family dinner, our kitchen remains fully active throughout.',
    badge: 'Operating Hours',
    icon: Clock,
  },
  {
    id: 'online-food-delivery',
    category: 'general',
    question: 'Can I order online from Sai Datta Restaurant for home delivery?',
    answer:
      'Yes! Sai Datta Restaurant is officially available on both Swiggy and Zomato for doorstep delivery across Patancheru, Muthangi, and surrounding Hyderabad localities. You can browse our full menu, customize your order, and track your hot meals live.',
    badge: 'Online Delivery (Swiggy & Zomato)',
    icon: ShoppingBag,
  },
  {
    id: 'takeaway-highway-orders',
    category: 'general',
    question: 'Do you offer takeaway parcels for highway travelers?',
    answer:
      'Yes! We provide a dedicated takeaway counter with heat-sealed, insulated containers designed to preserve temperature and aroma during travel. You can call ahead (+91 91772 73007) 20 minutes prior to arrival, and our team will have your order freshly prepared and ready for express pickup.',
    badge: 'Takeaway & Pickup',
    icon: PackageCheck,
  },
  {
    id: 'payment-methods',
    category: 'general',
    question: 'Which payment methods are accepted at the restaurant?',
    answer:
      'We accept all modern payment options, including instant UPI payments (Google Pay, PhonePe, Paytm, BHIM), all major Indian and international credit/debit cards (Visa, Mastercard, RuPay), and cash.',
    badge: 'Billing & Payments',
    icon: CreditCard,
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('dietary-options');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-[#280507] text-white relative transition-colors duration-300"
    >
      {/* Background Decorative Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4A0F12]/25 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4A0F12] border border-[#F4C928]/40 mb-3.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#F4C928]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F4C928] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Dining & Guest Information
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mt-2.5 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about our culinary offerings, reservations, highway parking, and services.
          </p>
        </div>

        {/* Minimalist Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {[
            { key: 'all', label: 'All Questions' },
            { key: 'dietary', label: 'Dietary & Menu' },
            { key: 'groups', label: 'Group Bookings' },
            { key: 'parking', label: 'Parking & Travel' },
            { key: 'general', label: 'Hours & Services' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              id={`faq-tab-${tab.key}`}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeCategory === tab.key
                  ? 'bg-[#F4C928] text-[#2B0709] shadow-md font-bold'
                  : 'bg-[#380b0e] text-neutral-300 hover:text-[#F4C928] border border-[#F4C928]/25 hover:border-[#F4C928]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Minimalist Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            const Icon = faq.icon;

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-[#380b0e] border-[#F4C928]/50 shadow-xl'
                    : 'bg-[#32080b]/80 hover:bg-[#380b0e] border-[#F4C928]/20'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C928] rounded-2xl"
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                          isOpen
                            ? 'bg-[#F4C928] text-[#2B0709]'
                            : 'bg-[#250406] text-[#F4C928] border border-[#F4C928]/30'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>

                      <div>
                        {faq.badge && (
                          <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#F4C928] uppercase block mb-1">
                            {faq.badge}
                          </span>
                        )}
                        <span className="text-base sm:text-lg font-serif font-semibold text-[#FFF4D6] block leading-snug">
                          {faq.question}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 mt-1 ${
                        isOpen
                          ? 'rotate-180 bg-[#F4C928]/20 text-[#F4C928]'
                          : 'bg-[#250406] text-neutral-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${faq.id}`}
                    className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-[#F4C928]/15 animate-in fade-in duration-200"
                  >
                    <div className="pl-12 sm:pl-14">
                      <p>{faq.answer}</p>
                      {faq.id === 'online-food-delivery' && (
                        <div className="mt-3.5 pt-3 border-t border-[#F4C928]/15 flex flex-wrap items-center gap-3">
                          <a
                            href={RESTAURANT_INFO.swiggyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="faq-order-swiggy-btn"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FC8019] to-[#E26E0E] text-white text-xs font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow border border-white/20"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 fill-white/20" />
                            <span>ORDER ON SWIGGY</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={RESTAURANT_INFO.zomatoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="faq-order-zomato-btn"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E23744] to-[#CB202D] text-white text-xs font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow border border-white/20"
                          >
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span>ORDER ON ZOMATO</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Assistance Callout */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-2xl bg-[#380b0e]/70 border border-[#F4C928]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#F4C928] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Have a specific request or dietary question?</span>
            </div>
            <p className="text-sm text-neutral-300">
              Our front-desk team is on hand 11:00 AM – 11:00 PM to assist with table bookings, customized dishes, or highway directions.
            </p>
          </div>

          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            id="faq-call-desk-button"
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] text-xs font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>CALL US DIRECTLY</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
