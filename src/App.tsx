import React, { useState, useEffect } from 'react';
import { Unit, ActivityType, UserProgress } from './types/curriculum';
import { WORLDS_DATA } from './data/curriculumData';
import { PartnerProduct } from './data/partnersData';
import { Navbar, ActivePortalView } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { SaaSHeroBanner } from './components/SaaSHeroBanner';
import { WorldMap } from './components/WorldMap';
import { UnitDashboard } from './components/UnitDashboard';
import { ExploreVocabActivity } from './components/ExploreVocabActivity';
import { AudioActivity } from './components/AudioActivity';
import { CameraActivity } from './components/CameraActivity';
import { HandwritingActivity } from './components/HandwritingActivity';
import { QuizActivity } from './components/QuizActivity';
import { BadgeModal } from './components/BadgeModal';
import { CurriculumGuideModal } from './components/CurriculumGuideModal';
import { CertificateModal } from './components/CertificateModal';
import { WorksheetsModal } from './components/WorksheetsModal';
import { PricingModal } from './components/PricingModal';
import { PartnerOfferModal } from './components/PartnerOfferModal';
import { ParentPortal } from './components/ParentPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { MarketplaceView } from './components/MarketplaceView';
import { CurriculumView } from './components/CurriculumView';
import { ToolsHubView } from './components/ToolsHubView';
import { playPopSound, playStarEarnedSound, playSuccessChime } from './services/soundEffects';

const STORAGE_KEY = 'fenneco_3ps_edtech_progress_v2';

export default function App() {
  // Load persistent progress from localStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved progress', e);
        }
      }
    }
    return {
      stars: 18,
      completedUnits: ['u1-greetings'],
      unitScores: { 'u1-greetings': 15 },
      unlockedBadges: ['badge-fennec-friend'],
      voicePracticeCount: 14,
      cameraCardsFound: 5,
      learnedWords: ['Hello', 'Father', 'Mother', 'Book', 'Pen'],
      streakDays: 4,
      studentName: 'Amina Benali',
      isProAccount: false,
      dailyStarsGoal: 15,
      todayStars: 8
    };
  });

  const [activePortalView, setActivePortalView] = useState<ActivePortalView>('home');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [currentActivity, setCurrentActivity] = useState<ActivityType | null>(null);

  // Modals state
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showWorksheetsModal, setShowWorksheetsModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedPartnerProduct, setSelectedPartnerProduct] = useState<PartnerProduct | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Award stars helper
  const handleAwardStars = (count: number) => {
    playStarEarnedSound();
    setProgress((prev) => {
      const nextStars = prev.stars + count;
      const todayNext = (prev.todayStars || 0) + count;
      const unitId = selectedUnit ? selectedUnit.id : 'general';
      const currentUnitScore = prev.unitScores[unitId] || 0;

      return {
        ...prev,
        stars: nextStars,
        todayStars: todayNext,
        unitScores: {
          ...prev.unitScores,
          [unitId]: currentUnitScore + count
        }
      };
    });
  };

  const handleActivatePro = () => {
    setProgress((prev) => ({
      ...prev,
      isProAccount: true,
      stars: prev.stars + 50
    }));
    setShowPricingModal(false);
  };

  const handleReturnHome = () => {
    playPopSound();
    setSelectedUnit(null);
    setCurrentActivity(null);
    setActivePortalView('home');
  };

  const handleSelectUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setCurrentActivity(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex flex-col text-slate-800 selection:bg-blue-200">
      {/* Strict 3-Zone Top Bar */}
      <Navbar
        stars={progress.stars}
        streakDays={progress.streakDays || 4}
        isPro={progress.isProAccount}
        activeView={activePortalView}
        onChangeView={(view) => {
          setActivePortalView(view);
          setSelectedUnit(null);
          setCurrentActivity(null);
        }}
        onOpenBadges={() => setShowBadgesModal(true)}
        onOpenPricing={() => setShowPricingModal(true)}
        currentUnitTitle={selectedUnit ? `Unit ${selectedUnit.unitNumber}: ${selectedUnit.titleEn}` : undefined}
        onReturnToHome={handleReturnHome}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 pb-16">
        {/* VIEW 0: MASTER HOME HUB (Épuré & Essentiel) */}
        {activePortalView === 'home' && (
          <HomePage
            progress={progress}
            onGoToStudent={() => {
              setActivePortalView('student');
              setSelectedUnit(null);
              setCurrentActivity(null);
            }}
            onGoToParent={() => {
              setActivePortalView('parent');
              setSelectedUnit(null);
              setCurrentActivity(null);
            }}
            onGoToTeacher={() => {
              setActivePortalView('teacher');
              setSelectedUnit(null);
              setCurrentActivity(null);
            }}
            onGoToMarketplace={() => {
              setActivePortalView('marketplace');
              setSelectedUnit(null);
              setCurrentActivity(null);
            }}
            onGoToCurriculum={() => {
              setActivePortalView('curriculum');
              setSelectedUnit(null);
              setCurrentActivity(null);
            }}
            onGoToTools={() => {
              setActivePortalView('tools');
              setSelectedUnit(null);
              setCurrentActivity(null);
            }}
            onOpenPricing={() => setShowPricingModal(true)}
          />
        )}

        {/* VIEW 1: PARENT PORTAL */}
        {activePortalView === 'parent' && (
          <ParentPortal
            progress={progress}
            onOpenCertificate={() => setShowCertificateModal(true)}
            onOpenWorksheets={() => setShowWorksheetsModal(true)}
            onOpenPricing={() => setShowPricingModal(true)}
            onReturnToQuest={() => setActivePortalView('student')}
          />
        )}

        {/* VIEW 2: TEACHER / CLASSROOM PORTAL */}
        {activePortalView === 'teacher' && (
          <TeacherPortal
            onOpenWorksheets={() => setShowWorksheetsModal(true)}
            onOpenPricing={() => setShowPricingModal(true)}
            onReturnToQuest={() => setActivePortalView('student')}
          />
        )}

        {/* VIEW 3: MARKETPLACE / BOUTIQUE INDÉPENDANTE */}
        {activePortalView === 'marketplace' && (
          <MarketplaceView
            onBackToHome={handleReturnHome}
            onSelectPartnerProduct={(prod) => setSelectedPartnerProduct(prod)}
          />
        )}

        {/* VIEW 4: PROGRAMME & RÉFÉRENTIEL MEN INDÉPENDANT */}
        {activePortalView === 'curriculum' && (
          <CurriculumView
            onBackToHome={handleReturnHome}
            onOpenGuideModal={() => setShowGuideModal(true)}
            onGoToStudent={() => {
              setActivePortalView('student');
              setSelectedUnit(null);
              setCurrentActivity(null);
            }}
          />
        )}

        {/* VIEW 5: BOÎTE À OUTILS & ATELIERS INTERACTIFS INDÉPENDANTE */}
        {activePortalView === 'tools' && (
          <ToolsHubView
            onBackToHome={handleReturnHome}
            onOpenActivityShortcut={(actType) => {
              const defaultUnit = selectedUnit || WORLDS_DATA[0].units[0];
              setSelectedUnit(defaultUnit);
              setCurrentActivity(actType);
              setActivePortalView('student');
            }}
            onOpenCertificate={() => setShowCertificateModal(true)}
            onOpenWorksheets={() => setShowWorksheetsModal(true)}
            onOpenCurriculumGuide={() => setShowGuideModal(true)}
          />
        )}

        {/* VIEW 6: STUDENT QUEST & ADVENTURE */}
        {activePortalView === 'student' && (
          <>
            {!selectedUnit ? (
              <>
                {/* Hero SaaS introduction banner */}
                <SaaSHeroBanner
                  onGoToStudent={() => {
                    const el = document.getElementById('curriculum-map');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onGoToParent={() => setActivePortalView('parent')}
                  onGoToTeacher={() => setActivePortalView('teacher')}
                  onOpenPricing={() => setShowPricingModal(true)}
                  isPro={Boolean(progress.isProAccount)}
                />

                {/* World Adventure Map */}
                <div id="curriculum-map">
                  <WorldMap
                    progress={progress}
                    onSelectUnit={handleSelectUnit}
                    onOpenPricing={() => setShowPricingModal(true)}
                  />
                </div>
              </>
            ) : !currentActivity ? (
              // Unit Hub & Activity Selector
              <UnitDashboard
                unit={selectedUnit}
                stars={progress.unitScores[selectedUnit.id] || 0}
                onSelectActivity={(act) => setCurrentActivity(act)}
                onBackToMap={() => setSelectedUnit(null)}
              />
            ) : (
              // Specific Interactive Activity (Voice, Camera, Tracing, Quiz, Explore)
              <>
                {currentActivity === 'explore' && (
                  <ExploreVocabActivity
                    unit={selectedUnit}
                    onAwardStars={handleAwardStars}
                    onBack={() => setCurrentActivity(null)}
                  />
                )}

                {currentActivity === 'pronunciation' && (
                  <AudioActivity
                    unit={selectedUnit}
                    onAwardStars={(stars) => {
                      handleAwardStars(stars);
                      setProgress((p) => ({
                        ...p,
                        voicePracticeCount: (p.voicePracticeCount || 0) + 1
                      }));
                    }}
                    onBack={() => setCurrentActivity(null)}
                  />
                )}

                {currentActivity === 'camera' && (
                  <CameraActivity
                    unit={selectedUnit}
                    onAwardStars={(stars) => {
                      handleAwardStars(stars);
                      setProgress((p) => ({
                        ...p,
                        cameraCardsFound: (p.cameraCardsFound || 0) + 1
                      }));
                    }}
                    onBack={() => setCurrentActivity(null)}
                  />
                )}

                {currentActivity === 'handwriting' && (
                  <HandwritingActivity
                    unit={selectedUnit}
                    onAwardStars={handleAwardStars}
                    onBack={() => setCurrentActivity(null)}
                  />
                )}

                {currentActivity === 'quiz' && (
                  <QuizActivity
                    unit={selectedUnit}
                    onAwardStars={handleAwardStars}
                    onBack={() => setCurrentActivity(null)}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Badges / Trophy Modal */}
      {showBadgesModal && (
        <BadgeModal
          progress={progress}
          onClose={() => setShowBadgesModal(false)}
        />
      )}

      {/* Algerian 3PS Official Curriculum Guide Modal */}
      {showGuideModal && (
        <CurriculumGuideModal
          onClose={() => setShowGuideModal(false)}
        />
      )}

      {/* Official 3PS Certificate of Achievement Modal */}
      {showCertificateModal && (
        <CertificateModal
          studentName={progress.studentName || 'Amina Benali'}
          starsCount={progress.stars}
          completedUnitsCount={progress.completedUnits.length}
          onUpdateStudentName={(name) => setProgress((p) => ({ ...p, studentName: name }))}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* Printable Revision Worksheets Modal */}
      {showWorksheetsModal && (
        <WorksheetsModal
          onClose={() => setShowWorksheetsModal(false)}
        />
      )}

      {/* SaaS Pricing & Subscription Modal */}
      {showPricingModal && (
        <PricingModal
          isPro={Boolean(progress.isProAccount)}
          onActivatePro={handleActivatePro}
          onClose={() => setShowPricingModal(false)}
        />
      )}

      {/* Partner Product & Offer Modal */}
      {selectedPartnerProduct && (
        <PartnerOfferModal
          product={selectedPartnerProduct}
          onClose={() => setSelectedPartnerProduct(null)}
        />
      )}

      {/* Refined SaaS EdTech Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 px-4 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900">Fenneco EdTech 3PS</span>
            <span>·</span>
            <span className="font-['Tajawal',sans-serif] font-bold text-stone-700" dir="rtl">
              منصة تعليم الإنجليزية وفق المنهاج الجزائري الرسمي
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-600">
            <button
              onClick={() => {
                playPopSound();
                setActivePortalView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-700 font-bold transition"
            >
              Accueil
            </button>
            <span>·</span>
            <button
              onClick={() => {
                playPopSound();
                setActivePortalView('student');
              }}
              className="hover:text-blue-700 transition"
            >
              Espace Élève
            </button>
            <span>·</span>
            <button
              onClick={() => {
                playPopSound();
                setActivePortalView('home');
                setTimeout(() => {
                  const el = document.getElementById('partners-marketplace');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-blue-700 transition text-blue-700 font-bold"
            >
              🛍️ Partenaires & Livres
            </button>
            <span>·</span>
            <button
              onClick={() => {
                playPopSound();
                setActivePortalView('parent');
              }}
              className="hover:text-blue-700 transition"
            >
              Espace Parents
            </button>
            <span>·</span>
            <button
              onClick={() => {
                playPopSound();
                setActivePortalView('teacher');
              }}
              className="hover:text-blue-700 transition"
            >
              Portail Écoles
            </button>
            <span>·</span>
            <button
              onClick={() => {
                playPopSound();
                setShowCertificateModal(true);
              }}
              className="hover:text-blue-700 transition"
            >
              Attestation 3PS
            </button>
            <span>·</span>
            <button
              onClick={() => setShowPricingModal(true)}
              className="text-blue-600 hover:text-blue-800 font-bold transition"
            >
              Tarifs DZD
            </button>
          </div>

          <div className="text-[11px] text-stone-400">
            © 2026 Fenneco EdTech · Conforme MEN Algérie
          </div>
        </div>
      </footer>
    </div>
  );
}
