import React, { useState } from 'react';
import { PARTNERS_PRODUCTS, PartnerProduct } from '../data/partnersData';
import { playPopSound } from '../services/soundEffects';
import { ArrowLeft, Tag, ArrowRight, Building2, CheckCircle2, Search, Filter } from 'lucide-react';

interface MarketplaceViewProps {
  onBackToHome: () => void;
  onSelectPartnerProduct: (product: PartnerProduct) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onBackToHome,
  onSelectPartnerProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'books' | 'supplies' | 'audio' | 'reading' | 'courses'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredProducts = PARTNERS_PRODUCTS.filter((prod) => {
    const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch = searchFilter === '' ||
      prod.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.partnerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Top Breadcrumb & Return Button */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <button
          onClick={() => {
            playPopSound();
            onBackToHome();
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>Verified suppliers · Delivery across 58 Wilayas</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
          <span>🛍️ Independent Category · 3PS Bookstore</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          Official textbooks, handwriting slates, and supplies
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-medium">
          Access physical school resources recommended by inspectors and educators for 3rd Primary Year in Algeria. Benefit from exclusive discounts negotiated with certified publishers.
        </p>

        {/* Search & Category Filter */}
        <div className="pt-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-t border-slate-100">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search for a textbook, slate, headset..."
              className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0">
            {[
              { id: 'all', label: 'All supplies' },
              { id: 'books', label: '📚 Textbooks' },
              { id: 'supplies', label: '🎒 Slates & Pens' },
              { id: 'audio', label: '🎧 Audio & Headsets' },
              { id: 'reading', label: '📖 Bilingual Books' },
              { id: 'courses', label: '🎓 Workshops' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playPopSound();
                  setSelectedCategory(cat.id as any);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            onClick={() => {
              playPopSound();
              onSelectPartnerProduct(prod);
            }}
            className="group bg-white rounded-3xl p-5 border border-slate-200/80 hover:border-blue-500 shadow-xs hover:shadow-xl ventureo-card-hover cursor-pointer flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl">{prod.partnerLogo}</span>
                  <span className="text-[11px] font-bold text-slate-700 truncate max-w-[130px]">
                    {prod.partnerName}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-900 px-2 py-0.5 rounded shrink-0">
                  {prod.badge}
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                {prod.title}
              </h3>
              <p className="text-[11px] font-bold text-blue-900 font-['Tajawal'] mt-1 line-clamp-1" dir="rtl">
                {prod.titleAr}
              </p>

              <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed font-medium">
                {prod.description}
              </p>

              <div className="mt-3.5 p-2 bg-blue-50/70 rounded-xl border border-blue-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-blue-950 font-bold text-[11px]">
                  <Tag className="w-3.5 h-3.5 text-blue-600" />
                  <span>Code: {prod.promoCode}</span>
                </div>
                <span className="text-[11px] font-extrabold text-blue-700 bg-blue-200/60 px-1.5 py-0.5 rounded">
                  -{prod.discountPercentage}%
                </span>
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 line-through block">
                  {prod.originalPriceDzd} DZD
                </span>
                <span className="text-lg font-extrabold text-slate-900 font-mono">
                  {prod.promoPriceDzd} DZD
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playPopSound();
                  onSelectPartnerProduct(prod);
                }}
                className="px-3.5 py-2 bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1.5"
              >
                <span>Order Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Onboarding Callout */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-blue-400">
            <Building2 className="w-4 h-4" />
            <span>BOOKSTORE & PUBLISHER CORNER</span>
          </div>
          <h4 className="text-lg sm:text-xl font-extrabold">
            Do you publish or distribute school supplies in Algeria?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-medium">
            List your recommended 3PS textbooks, workbooks, and handwriting supplies on Fenneco to reach thousands of parents and school principals across all 58 Wilayas.
          </p>
        </div>
        <button
          onClick={() => {
            playPopSound();
            alert("Contact our bookstore partnership team at: partenaires@fenneco3ps.dz / Phone: 0550 00 33 00");
          }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition whitespace-nowrap shadow-xs active:scale-95"
        >
          Become an Approved Partner
        </button>
      </div>
    </div>
  );
};
