import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { expertsList } from '../data/mockData';
import { Expert, ExpertBooking } from '../types';
import {
  Users,
  Calendar,
  Star,
  CheckCircle2,
  PhoneCall,
  X,
  Award,
  Clock,
} from 'lucide-react';

export const MentorsView: React.FC = () => {
  const { profile, expertBookings, addExpertBooking } = useApp();

  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [phone, setPhone] = useState('');
  const [confirmedModal, setConfirmedModal] = useState<ExpertBooking | null>(null);

  const handleOpen = (expert: Expert) => {
    setSelectedExpert(expert);
    setSelectedSlot(expert.availableSlots[0] || '11:00 AM');
  };

  const handleBook = () => {
    if (!selectedExpert || !phone.trim()) {
      alert('Please enter your phone number to receive confirmation SMS.');
      return;
    }

    const booking: ExpertBooking = {
      id: `mb-${Date.now()}`,
      expertId: selectedExpert.id,
      expertName: selectedExpert.name,
      date: selectedDate,
      timeSlot: selectedSlot,
      userName: profile.name,
      userPhone: phone,
      topic: `${profile.businessCategory} Expansion & Bank Loan Guidance`,
      status: 'Confirmed',
      bookingRef: `VS-MOB-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    addExpertBooking(booking);
    setConfirmedModal(booking);
    setSelectedExpert(null);
  };

  return (
    <div className="space-y-4 px-3.5 pt-3 pb-24 animate-fade-in-up">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded">
          1-on-1 Guidance
        </span>
        <h1 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
          Agri-Business Mentors
        </h1>
        <p className="text-[11px] text-slate-500">
          Book phone appointments with verified agricultural specialists & loan advisors.
        </p>
      </div>

      {/* Confirmed booking alerts */}
      {expertBookings.length > 0 && (
        <div className="bg-emerald-900 text-white rounded-2xl p-3.5 space-y-2 border border-emerald-700 shadow-md">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
            <CheckCircle2 className="h-4 w-4" /> Active Bookings ({expertBookings.length})
          </div>
          {expertBookings.slice(0, 2).map((b) => (
            <div key={b.id} className="bg-emerald-950/70 p-2.5 rounded-xl border border-emerald-800 text-[11px] space-y-0.5">
              <div className="flex justify-between font-bold">
                <span>{b.expertName}</span>
                <span className="text-amber-300">{b.bookingRef}</span>
              </div>
              <p className="text-emerald-200">{b.date} • {b.timeSlot}</p>
            </div>
          ))}
        </div>
      )}

      {/* Experts List */}
      <div className="space-y-3">
        {expertsList.map((expert) => (
          <div
            key={expert.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3"
          >
            <div className="flex items-start gap-3">
              <img
                src={expert.imageUrl}
                alt={expert.name}
                className="h-14 w-14 rounded-2xl object-cover border border-emerald-600 shrink-0"
              />
              <div className="space-y-0.5 flex-1 min-w-0">
                <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                  {expert.name}
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium truncate">
                  {expert.title}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>{expert.rating}</span>
                  <span className="text-slate-400 font-normal">({expert.reviewsCount} calls)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Specialty:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{expert.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Languages:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{expert.languages.join(', ')}</span>
              </div>
            </div>

            <button
              onClick={() => handleOpen(expert)}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 touch-bounce shadow-xs"
            >
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span>Book 1-on-1 Call</span>
            </button>
          </div>
        ))}
      </div>

      {/* Booking Sheet Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in-up">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-sm border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-serif font-bold text-base text-slate-900 dark:text-slate-100">
                Book with {selectedExpert.name}
              </h3>
              <button
                onClick={() => setSelectedExpert(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Select Time Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                >
                  {selectedExpert.availableSlots.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Phone (for SMS confirmation)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs touch-bounce shadow-md"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Success Modal */}
      {confirmedModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-xs w-full text-center space-y-3 border border-emerald-500 shadow-2xl">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
              Booking Confirmed!
            </h3>
            <p className="text-xs text-slate-500">
              Reference: <strong className="text-emerald-700">{confirmedModal.bookingRef}</strong>
            </p>
            <p className="text-[11px] text-slate-400">
              An SMS with meeting call details has been sent to +91 {confirmedModal.userPhone}.
            </p>
            <button
              onClick={() => setConfirmedModal(null)}
              className="w-full bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs touch-bounce"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
