import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, User, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSectionProps {
  onReservationSubmitted: (details: { name: string; phone: string; guests: string; time: string; date: string }) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationSubmitted,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    guests: '2',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      onReservationSubmitted(formData);
    }, 600);
  };

  return (
    <section id="reserve" className="py-20 sm:py-28 bg-[#2B0709] text-white relative">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#4A0F12]/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#F4C928] font-semibold block mb-2">
            PLAN YOUR VISIT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Reserve Your Table
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            Join us for lunch or dinner with family and friends at Muthangi, Patancheru.
          </p>
        </div>

        {submittedData ? (
          /* Confirmation State */
          <div
            id="reservation-confirmed-card"
            className="bg-[#380b0e] border border-[#F4C928] rounded-2xl p-8 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-[#4A0F12] border-2 border-[#F4C928] flex items-center justify-center mx-auto mb-4 text-[#F4C928]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#F4C928] block mb-1">
              REQUEST RECEIVED
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#FFF4D6] mb-2">
              Thank You, {submittedData.name}
            </h3>

            <div className="bg-[#240507] p-4 rounded-xl max-w-md mx-auto my-4 text-xs sm:text-sm text-neutral-300 border border-[#F4C928]/20 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-400">Date:</span>
                <span className="font-semibold text-white">{submittedData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Time:</span>
                <span className="font-semibold text-white">{submittedData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Guests:</span>
                <span className="font-semibold text-white">{submittedData.guests} Persons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Contact:</span>
                <span className="font-semibold text-[#F4C928]">{submittedData.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-amber-200/90 max-w-md mx-auto mb-6">
              <AlertCircle className="w-4 h-4 text-[#F4C928] shrink-0" />
              <span>
                Please note: Reservation requests require verification. Our manager will call you shortly to confirm table availability.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="px-6 py-2.5 rounded-full bg-[#F4C928] text-[#2B0709] text-xs font-bold tracking-wider hover:bg-[#E5B81B] transition-colors"
              >
                CALL RESTAURANT DIRECTLY
              </a>
              <button
                onClick={() => setSubmittedData(null)}
                className="px-6 py-2.5 rounded-full bg-[#4A0F12] text-[#FFF4D6] text-xs font-bold tracking-wider hover:bg-[#5f1317] border border-[#F4C928]/30 transition-colors"
              >
                BOOK ANOTHER TABLE
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form
            onSubmit={handleSubmit}
            id="reservation-form"
            className="bg-[#380b0e] border border-[#F4C928]/30 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="res-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                >
                  Your Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#F4C928] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    id="res-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-[#240507] border border-[#F4C928]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F4C928] focus:ring-1 focus:ring-[#F4C928]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="res-phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#F4C928] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    id="res-phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#240507] border border-[#F4C928]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F4C928] focus:ring-1 focus:ring-[#F4C928]"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="res-date"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                >
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#F4C928] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    id="res-date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#240507] border border-[#F4C928]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4C928] focus:ring-1 focus:ring-[#F4C928]"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="res-time"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                >
                  Time * (11:00 AM – 11:00 PM)
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#F4C928] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="res-time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#240507] border border-[#F4C928]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4C928] focus:ring-1 focus:ring-[#F4C928]"
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="13:00">1:00 PM (Lunch)</option>
                    <option value="13:30">1:30 PM (Lunch)</option>
                    <option value="14:00">2:00 PM (Lunch)</option>
                    <option value="14:30">2:30 PM (Lunch)</option>
                    <option value="19:00">7:00 PM (Dinner)</option>
                    <option value="19:30">7:30 PM (Dinner)</option>
                    <option value="20:00">8:00 PM (Dinner)</option>
                    <option value="20:30">8:30 PM (Dinner)</option>
                    <option value="21:00">9:00 PM (Dinner)</option>
                    <option value="21:30">9:30 PM (Dinner)</option>
                    <option value="22:00">10:00 PM (Late Dinner)</option>
                  </select>
                </div>
              </div>

              {/* Number of Guests */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="res-guests"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                >
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#F4C928] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="res-guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#240507] border border-[#F4C928]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4C928] focus:ring-1 focus:ring-[#F4C928]"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons (Family Table)</option>
                    <option value="5">5 Persons</option>
                    <option value="6">6 Persons (Large Family)</option>
                    <option value="8">8+ Persons (Party / Group Gathering)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="res-notes"
                  className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                >
                  Special Requests (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#F4C928] absolute left-3.5 top-3 pointer-events-none" />
                  <textarea
                    id="res-notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g., Birthday celebration, prefer quiet corner, high chair needed"
                    className="w-full bg-[#240507] border border-[#F4C928]/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F4C928] focus:ring-1 focus:ring-[#F4C928]"
                  />
                </div>
              </div>
            </div>

            {/* Note on table booking */}
            <div className="p-3.5 rounded-xl bg-[#240507] border border-[#F4C928]/20 mb-6 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#F4C928] shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong>Reservation Notice:</strong> Submitting this form sends a reservation request. Our staff will confirm your booking via phone call at{' '}
                <span className="text-[#F4C928]">{formData.phone || '+91 98668 82999'}</span>.
              </p>
            </div>

            <button
              type="submit"
              id="res-submit-btn"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F4C928] to-[#E5B81B] text-[#2B0709] font-bold text-sm sm:text-base tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? 'SENDING REQUEST...' : 'REQUEST A TABLE'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
