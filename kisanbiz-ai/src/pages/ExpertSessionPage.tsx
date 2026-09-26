import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { expertsList } from '../data/mockData';
import { Expert, ExpertBooking } from '../types';
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  PhoneCall,
  X,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const ExpertSessionPage: React.FC = () => {
  const { profile, expertBookings, addExpertBooking } = useApp();

  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [userPhone, setUserPhone] = useState<string>('');
  const [topic, setTopic] = useState<string>(
    `Bank loan approval & PMFME subsidy strategy for ${profile.businessCategory}`
  );
  const [confirmedBooking, setConfirmedBooking] = useState<ExpertBooking | null>(null);

  const handleOpenBookingModal = (expert: Expert) => {
    setSelectedExpert(expert);
    setSelectedSlot(expert.availableSlots[0] || 'Tomorrow 11:00 AM');
  };

  const handleConfirmBooking = () => {
    if (!selectedExpert || !userPhone.trim()) {
      alert('Please enter your phone number to receive appointment SMS.');
      return;
    }

    const bookingRef = `VS-EXP-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: ExpertBooking = {
      id: `booking-${Date.now()}`,
      expertId: selectedExpert.id,
      expertName: selectedExpert.name,
      date: selectedDate,
      timeSlot: selectedSlot,
      userName: profile.name,
      userPhone: userPhone,
      topic: topic,
      status: 'Confirmed',
      bookingRef: bookingRef,
    };

    addExpertBooking(newBooking);
    setConfirmedBooking(newBooking);
    setSelectedExpert(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
            1-on-1 Expert Advisory Sessions
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 mt-2">
            Book a Guidance Session with Domain Specialists
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Connect directly with rural banking managers, agri-supply chain experts, and SHG enterprise mentors to review your bank loan project report.
          </p>
        </div>
      </div>

      {/* Confirmed Bookings Banner if any */}
      {expertBookings.length > 0 && (
        <div className="bg-emerald-900 text-white rounded-3xl p-6 space-y-4 shadow-lg border border-emerald-700">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
            <CheckCircle2 className="h-5 w-5 text-amber-400" /> Active Confirmed Appointments ({expertBookings.length})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expertBookings.map((b) => (
              <div key={b.id} className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">Ref ID: {b.bookingRef}</span>
                  <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {b.status}
                  </span>
                </div>
                <p className="text-sm font-bold text-white">{b.expertName}</p>
                <p className="text-emerald-200 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" /> Date: {b.date} • {b.timeSlot}
                </p>
                <p className="text-emerald-300 text-[11px] truncate">Topic: {b.topic}</p>
                <p className="text-[10px] text-emerald-400">SMS reminder sent to +91 {b.userPhone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expert Listing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {expertsList.map((expert) => (
          <div
            key={expert.id}
            className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              {/* Image & Avatar Info */}
              <div className="flex items-start gap-3">
                <img
                  src={expert.imageUrl}
                  alt={expert.name}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-2xs"
                />
                <div>
                  <h3 className="font-serif text-lg font-bold text-emerald-950">
                    {expert.name}
                  </h3>
                  <p className="text-xs text-emerald-700 font-medium">
                    {expert.title}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{expert.rating}</span>
                    <span className="text-gray-400 font-normal">({expert.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Specialty & Location Details */}
              <div className="space-y-2 text-xs text-gray-600 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-500">Domain Specialty:</span>
                  <span className="font-bold text-emerald-950">{expert.specialty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-500">Experience:</span>
                  <span className="font-bold text-emerald-950">{expert.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-500">Languages:</span>
                  <span className="font-bold text-emerald-950">{expert.languages.join(', ')}</span>
                </div>
              </div>

              {/* Available Slots Preview */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                  Next Available Slots:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {expert.availableSlots.map((slot, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-100 text-emerald-900 text-[11px] font-semibold px-2.5 py-1 rounded-md"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <button
              onClick={() => handleOpenBookingModal(expert)}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 mt-4"
            >
              <Calendar className="h-4 w-4 text-amber-300" /> Book 1-on-1 Session
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Booking Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-emerald-200 shadow-2xl space-y-5 relative">
            
            <button
              onClick={() => setSelectedExpert(null)}
              className="absolute right-5 top-5 p-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded border border-rose-200">
                1-on-1 Consultation
              </span>
              <h3 className="font-serif text-2xl font-bold text-emerald-950 mt-1">
                Book Session with {selectedExpert.name}
              </h3>
              <p className="text-xs text-gray-500">{selectedExpert.title}</p>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Preferred Date */}
              <div>
                <label className="block font-bold text-emerald-950 mb-1">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border rounded-xl font-medium text-emerald-950 outline-none focus:border-emerald-600"
                />
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="block font-bold text-emerald-950 mb-1">Select Time Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedExpert.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                        selectedSlot === slot
                          ? 'border-emerald-700 bg-emerald-700 text-white shadow-xs'
                          : 'border-gray-200 text-gray-700 hover:bg-emerald-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-bold text-emerald-950 mb-1">Your Mobile Number (for SMS reminder)</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full p-3 border rounded-xl font-medium text-emerald-950 outline-none focus:border-emerald-600"
                />
              </div>

              {/* Topic */}
              <div>
                <label className="block font-bold text-emerald-950 mb-1">Primary Topic / Question</label>
                <textarea
                  rows={2}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 border rounded-xl font-medium text-emerald-950 outline-none focus:border-emerald-600"
                />
              </div>

            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-400/30 text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="h-5 w-5" /> Confirm Appointment
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
