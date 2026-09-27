import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, Zap, Building2, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playSuccessChime } from '../services/soundEffects';

interface PricingModalProps {
  isPro: boolean;
  onActivatePro: () => void;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isPro,
  onActivatePro,
  onClose
}) => {
  const [currency, setCurrency] = useState<'DZD' | 'EUR'>('DZD');
  const [annualBilling, setAnnualBilling] = useState(true);

  const handleUpgrade = () => {
    playSuccessChime();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    onActivatePro();
  };

  const getPrice = (type: 'pro' | 'school') => {
    if (currency === 'DZD') {
      if (type === 'pro') {
        return annualBilling ? '9,900 DZD / yr' : '1,200 DZD / mo';
      }
      return annualBilling ? '35,000 DZD / yr' : '3,900 DZD / mo';
    } else {
      if (type === 'pro') {
        return annualBilling ? '49 € / yr' : '5.90 € / mo';
      }
      return annualBilling ? '190 € / yr' : '22 € / mo';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-50 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦊</span>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base font-display">
                Fenneco Pro Plans · For Families & Schools
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Algerian 3PS primary English simplified with unlimited AI voice coaching
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency & Cadence Selectors */}
        <div className="p-6 text-center space-y-4">
          <div className="inline-flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => {
                playPopSound();
                setCurrency('DZD');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                currency === 'DZD' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🇩🇿 Algerian Dinar (DZD)
            </button>
            <button
              onClick={() => {
                playPopSound();
                setCurrency('EUR');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                currency === 'EUR' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              🇪🇺 Euro (€)
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
            <span className={!annualBilling ? 'text-slate-900 font-bold' : ''}>Monthly</span>
            <button
              onClick={() => {
                playPopSound();
                setAnnualBilling(!annualBilling);
              }}
              className="w-11 h-6 bg-blue-600 rounded-full relative p-0.5 transition-colors"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  annualBilling ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={annualBilling ? 'text-slate-900 font-bold' : ''}>
              Annual <span className="text-blue-700 font-bold">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-8">
          {/* Plan 1: Free Explorer */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-1">
                Explorer
              </p>
              <h3 className="text-xl font-extrabold text-slate-900">Free</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4 font-medium">
                Ideal for trying out the early lessons of Term 1.
              </p>
              <div className="text-2xl font-black text-slate-900 mb-4 font-mono">
                0 {currency}
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Access to World 1 (Units 1 & 2)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3 voice practice drills per day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard flashcard camera scan</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition"
            >
              Current Active Plan
            </button>
          </div>

          {/* Plan 2: Family Pro (Highlighted) */}
          <div className="bg-blue-50/50 rounded-xl p-5 border-2 border-blue-600 flex flex-col justify-between shadow-md relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full shadow-sm">
              Recommended for Families
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider font-extrabold text-blue-800 mb-1">
                Family Pro
              </p>
              <h3 className="text-xl font-extrabold text-slate-900">Fennec Club</h3>
              <p className="text-xs text-slate-600 mt-1 mb-4 font-medium">
                Complete official 3PS curriculum with unlimited AI practice.
              </p>
              <div className="text-2xl font-black text-blue-900 mb-4 font-mono">
                {getPrice('pro')}
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 border-t border-blue-200/60 pt-4 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="font-semibold">All 3 Worlds & 6 Units unlocked</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="font-semibold">Unlimited real-time AI voice coach</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Official certified printable 3PS diploma</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Printable PDF worksheets for home revision</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Up to 3 student child profiles</span>
                </li>
              </ul>
            </div>

            {isPro ? (
              <div className="w-full mt-6 py-2 px-3 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-lg text-center flex items-center justify-center gap-1.5">
                <UserCheck className="w-4 h-4" />
                <span>Pro Plan Active</span>
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                className="w-full mt-6 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/25 transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Activate Fennec Pro</span>
              </button>
            )}
          </div>

          {/* Plan 3: Schools */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-1">
                Institutions
              </p>
              <h3 className="text-xl font-extrabold text-slate-900">Schools & Classes</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4 font-medium">
                For private primary schools and tutoring academies.
              </p>
              <div className="text-2xl font-black text-slate-900 mb-4 font-mono">
                {getPrice('school')}
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">Multi-class Teacher Portal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Individual tracking for up to 150 pupils</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Weekly collective homework assignment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bank transfer or postal mandate accepted</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                handleUpgrade();
              }}
              className="w-full mt-6 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition"
            >
              Request School Quote
            </button>
          </div>
        </div>

        {/* Local Payment Badges */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 text-center text-[11px] text-slate-600 flex flex-wrap items-center justify-center gap-4 font-medium">
          <span className="font-semibold">Accepted payment methods:</span>
          <span>💳 Edahabia / CIB (Algérie Poste)</span>
          <span>·</span>
          <span>📱 BaridiMob</span>
          <span>·</span>
          <span>🔒 Credit Card / PayPal</span>
        </div>
      </div>
    </div>
  );
};
