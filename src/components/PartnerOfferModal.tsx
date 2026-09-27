import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Star, ShieldCheck, Truck, ShoppingBag, Sparkles } from 'lucide-react';
import { PartnerProduct } from '../data/partnersData';
import { playPopSound, playSuccessChime } from '../services/soundEffects';
import confetti from 'canvas-confetti';

interface PartnerOfferModalProps {
  product: PartnerProduct;
  onClose: () => void;
}

export const PartnerOfferModal: React.FC<PartnerOfferModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWilaya, setCustomerWilaya] = useState('16 - Algiers');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(product.promoCode);
    playPopSound();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{product.partnerLogo}</span>
            <div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                Official Fenneco Partner Deal
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm font-display">
                {product.partnerName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Product Banner */}
          <div className="bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-slate-50 p-5 rounded-2xl border border-blue-100 flex flex-col sm:flex-row justify-between gap-4 items-start">
            <div className="space-y-1">
              <span className="inline-block bg-blue-600 text-white text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full mb-1">
                {product.badge}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 leading-snug font-display">
                {product.title}
              </h2>
              <p className="text-xs font-bold text-blue-800 font-['Tajawal']" dir="rtl">
                {product.titleAr}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {product.rating}
                </span>
                <span>·</span>
                <span>{product.reviewsCount} verified parent reviews</span>
              </div>
            </div>

            <div className="text-right shrink-0 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-400 line-through">
                {product.originalPriceDzd} DZD
              </div>
              <div className="text-2xl font-black text-blue-900 font-mono">
                {product.promoPriceDzd} DZD
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                Save {product.discountPercentage}%
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {product.description}
          </p>

          {/* Key specs list */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Educational Highlights & Standards:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Code Box */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-900 block">
                Exclusive Fenneco Community Promo Code:
              </span>
              <p className="text-[11px] text-amber-800 font-medium">
                Mention this code when placing your order to claim your {product.discountPercentage}% discount.
              </p>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-mono font-bold text-xs rounded-xl shadow-xs transition active:scale-95 whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied: {product.promoCode}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy {product.promoCode}</span>
                </>
              )}
            </button>
          </div>

          {/* Order Simulation Form */}
          {!orderSent ? (
            <form onSubmit={handleSimulateOrder} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-900">
                  Reserve Directly with Bookstore Partner (Cash on Delivery)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
                />
                <input
                  type="tel"
                  placeholder="Phone (e.g. 0550...)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
                />
                <select
                  value={customerWilaya}
                  onChange={(e) => setCustomerWilaya(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
                >
                  <option value="16 - Algiers">16 - Algiers</option>
                  <option value="31 - Oran">31 - Oran</option>
                  <option value="25 - Constantine">25 - Constantine</option>
                  <option value="19 - Sétif">19 - Sétif</option>
                  <option value="28 - M'Sila">28 - M'Sila</option>
                  <option value="09 - Blida">09 - Blida</option>
                  <option value="15 - Tizi Ouzou">15 - Tizi Ouzou</option>
                  <option value="All 58 Wilayas">All 58 Wilayas</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>{product.deliveryInfo}</span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition active:scale-95"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-1 text-emerald-900">
              <div className="text-2xl mb-1">🎉</div>
              <h4 className="text-sm font-extrabold">
                Reservation Request Forwarded to Partner!
              </h4>
              <p className="text-xs text-emerald-700 max-w-md mx-auto font-medium">
                Customer support from <strong>{product.partnerName}</strong> will contact you by phone to confirm your delivery address and apply your {product.discountPercentage}% discount.
              </p>
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Fenneco Partner
            </span>
            <span>·</span>
            <span>Algerian Ministry 3PS Curriculum Aligned</span>
            <span>·</span>
            <span>Payment upon parcel inspection</span>
          </div>
        </div>
      </div>
    </div>
  );
};
