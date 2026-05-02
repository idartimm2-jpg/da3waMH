import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MapPin, Map, X, CalendarClock, Heart } from "lucide-react";

const Branch = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 200" fill="none" className={className}>
    <path d="M 50 200 Q 40 100 80 0" stroke="#d4af37" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 45 150 Q 20 140 10 120" stroke="#d4af37" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 55 100 Q 80 90 90 70" stroke="#d4af37" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 80 0 C 70 10 75 25 85 25 C 95 25 95 10 80 0 Z" fill="#eaddc4" stroke="#d4af37" strokeWidth="1" />
    <path d="M 10 120 C 15 135 25 135 30 130 C 35 125 25 115 10 120 Z" fill="#eaddc4" stroke="#d4af37" strokeWidth="1" />
    <path d="M 90 70 C 80 85 70 80 65 80 C 60 80 70 65 90 70 Z" fill="#eaddc4" stroke="#d4af37" strokeWidth="1" />
  </svg>
);

const FloralBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 z-0">
    <Branch className="absolute top-0 left-0 w-32 h-64 -translate-y-8 -translate-x-8 opacity-80" />
    <Branch className="absolute top-0 right-0 w-32 h-64 -translate-y-8 translate-x-8 scale-x-[-1] opacity-80" />
    <Branch className="absolute bottom-0 left-0 w-32 h-64 translate-y-8 -translate-x-8 scale-y-[-1] opacity-80" />
    <Branch className="absolute bottom-0 right-0 w-32 h-64 translate-y-8 translate-x-8 scale-y-[-1] scale-x-[-1] opacity-80" />
  </div>
);

const CoupleIllustration = () => (
  <svg width="140" height="140" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
    {/* Decor circle */}
    <circle cx="80" cy="80" r="75" fill="#fcf9f2" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 4" />
    
    {/* Groom */}
    <g transform="translate(35, 45)">
      {/* Suit */}
      <path d="M15 35 C5 35 0 50 0 70 L30 70 C30 50 25 35 15 35 Z" fill="#1f2937" />
      {/* Shirt */}
      <path d="M15 35 L10 50 L20 50 Z" fill="#f8fafc" />
      <path d="M12 42 L8 45 L8 39 Z" fill="#0f172a" />
      <path d="M18 42 L22 45 L22 39 Z" fill="#0f172a" />
      <circle cx="15" cy="42" r="2" fill="#0f172a" />
      {/* Head */}
      <circle cx="15" cy="15" r="12" fill="#fed7aa" />
      {/* Hair */}
      <path d="M3 15 C3 5 15 0 25 5 C27 10 27 15 27 15 C20 12 10 12 3 15 Z" fill="#1e1b18" />
    </g>

    {/* Bride */}
    <g transform="translate(90, 45)">
      {/* Dress */}
      <path d="M15 30 C-5 60 -10 80 -15 85 L45 85 C40 80 35 60 15 30 Z" fill="#ffffff" stroke="#eaddc4" strokeWidth="1" />
      <path d="M5 85 L25 85 C20 70 15 50 15 30 C10 50 8 70 5 85 Z" fill="#fdfdfd" stroke="#eaddc4" strokeWidth="1" />
      {/* Head */}
      <circle cx="15" cy="15" r="11" fill="#fed7aa" />
      {/* Veil */}
      <path d="M-5 45 C-5 10 15 -5 25 5 C35 15 30 50 25 60 C15 70 -5 60 -5 45 Z" fill="#ffffff" opacity="0.95" stroke="#f0e6d2" strokeWidth="1" />
      {/* Crown */}
      <circle cx="10" cy="5" r="2.5" fill="#d4af37" />
      <circle cx="15" cy="3" r="2.5" fill="#d4af37" />
      <circle cx="20" cy="5" r="2.5" fill="#d4af37" />
    </g>
  </svg>
);

const BackgroundHearts = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => {
        const isLeft = i % 2 === 0;
        const xOffset = isLeft ? -100 - Math.random() * 150 : 100 + Math.random() * 150;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 300, x: xOffset, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0], y: -300, x: xOffset + (Math.random() * 80 - 40), scale: Math.random() * 0.5 + 0.6 }}
            transition={{ duration: 4 + Math.random() * 3, delay: Math.random() * 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 text-[#d4af37]/40 -ml-3 -mt-3"
          >
            <Heart fill="currentColor" stroke="none" className="w-6 h-6" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [inviteState, setInviteState] = useState<'closed' | 'verse' | 'opened'>('closed');
  const isOpen = inviteState === 'opened';
  const [showDetails, setShowDetails] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [wishText, setWishText] = useState("");
  const [wishName, setWishName] = useState("");
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [wishStatus, setWishStatus] = useState<"idle" | "success" | "error">("idle");
  const [clicks, setClicks] = useState<{id: number, x: number, y: number}[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setInviteState('verse');
    const audio = new Audio("https://everyayah.com/data/Alafasy_128kbps/030021.mp3");
    audioRef.current = audio;
    
    audio.play().catch(err => {
      console.warn("Audio play failed:", err);
      setTimeout(() => {
        setInviteState(prev => prev === 'verse' ? 'opened' : prev);
      }, 4000);
    });
    
    audio.onended = () => {
      setInviteState(prev => prev === 'verse' ? 'opened' : prev);
    };
  };

  const skipVerse = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setInviteState('opened');
  };

  const submitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim() || !wishName.trim()) return;

    setIsSubmittingWish(true);
    setWishStatus("idle");

    const formData = new URLSearchParams();
    formData.append("message", wishText);
    formData.append("name", wishName);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbz-rjI_w-9yMGO6QJCWjNbhqrvP308bpbfkhjqi6pAV-Z6LYlE-n5lNcfRQIMbsi5BjKw/exec", {
        method: "POST",
        body: formData.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        mode: "no-cors",
      });
      setWishStatus("success");
      setWishText("");
      setWishName("");
      setTimeout(() => {
        setShowWishes(false);
        setWishStatus("idle");
      }, 3000);
    } catch (error) {
      setWishStatus("error");
    } finally {
      setIsSubmittingWish(false);
    }
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    if (!isOpen || showDetails) return;
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setClicks(prev => [...prev.slice(-15), newHeart]);
    setTimeout(() => {
      setClicks(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1500);
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-[#fcf9f2] flex flex-col items-center justify-center p-4 overflow-hidden" 
      onClick={handleScreenClick}
    >
      <FloralBackground />
      <BackgroundHearts active={isOpen} />

      {/* Verse Overlay */}
      <AnimatePresence>
        {inviteState === 'verse' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#fcf9f2] p-6 lg:p-12 text-center"
          >
            <FloralBackground />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10 text-center max-w-4xl"
            >
               <p className="text-[#d4af37] text-2xl md:text-3xl mb-8 font-[family-name:var(--font-amiri)]">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
               <h2 className="text-[#8b6f4e] text-3xl md:text-5xl lg:text-5xl leading-[2] md:leading-[2.2] lg:leading-[2.2] font-[family-name:var(--font-amiri)] drop-shadow-sm">
                 ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ ﴾
               </h2>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={skipVerse}
              className="absolute bottom-12 px-8 py-2 border border-[#d4c19c] text-[#a39171] rounded-full hover:bg-[#f0e4d4] transition-colors z-10 hover:text-[#8b6f4e]"
            >
              تخطي الآية
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {clicks.map(click => (
         <motion.div
            key={click.id}
            initial={{ opacity: 1, y: click.y, x: click.x, scale: 0.5 }}
            animate={{ opacity: 0, y: click.y - 120, scale: 1.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed top-0 left-0 pointer-events-none z-[200] text-[#d4af37]/70"
            style={{ marginLeft: -12, marginTop: -12 }}
         >
            <Heart fill="currentColor" stroke="none" className="w-8 h-8 drop-shadow-sm" />
         </motion.div>
      ))}

      {/* Main Envelope Container */}
      <motion.div 
        className="relative w-[340px] md:w-[400px] h-[220px] md:h-[260px] flex items-end justify-center z-10"
        initial={{ y: 0 }}
        animate={{ y: 0, scale: 1 }}
      >
        
        {/* Envelope Back */}
        <motion.div 
          className="absolute inset-0 bg-[#e6d5b8] rounded-xl shadow-2xl border border-[#d4c19c] z-0" 
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.6, delay: isOpen ? 0.8 : 0 }}
        />

        {/* Letter */}
        <motion.div
           className="absolute bottom-[20px] w-[310px] md:w-[360px] h-[480px] bg-white rounded-[20px] shadow-[0_20px_60px_rgba(139,111,78,0.15)] flex flex-col items-center justify-start p-6 pt-10 text-[#4a3b2c] border border-[#f0e4d4]"
           initial={{ y: 20, opacity: 0, scale: 0.8 }}
           animate={isOpen ? { y: [20, -180, 110], scale: [0.8, 1, 1.05], opacity: [0, 1, 1], zIndex: 40 } : { y: 20, opacity: 0, scale: 0.8, zIndex: 10 }}
           transition={{ duration: 1.6, times: [0, 0.45, 1], ease: "easeInOut", delay: isOpen ? 0.1 : 0 }}
           style={{ transformOrigin: "bottom center" }}
        >
          <h1 className="font-[family-name:var(--font-arabic-title)] text-4xl text-[#8b6f4e] mb-5 mt-2 drop-shadow-sm text-center leading-relaxed">
             ندعوكم لكتب كتابنا
          </h1>
          
          <CoupleIllustration />

          <div className="flex w-full justify-between items-center px-4 mb-6">
            <span className="text-3xl text-[#5a4836] font-[family-name:var(--font-signature)]">Mohamed</span>
            <span className="text-xl text-[#d4af37] px-2 font-[family-name:var(--font-amiri)]">&</span>
            <span className="text-3xl text-[#5a4836] font-[family-name:var(--font-signature)]">Habiba</span>
          </div>

          <div className="w-full border-t border-b border-[#f0e4d4] py-4 mb-3 text-center">
            <p className="text-xl font-bold text-[#8b6f4e] mb-2 tracking-wide font-[family-name:var(--font-sans)]">29 / 5 / 2026</p>
            <p className="text-lg text-[#5a4836] font-bold">الجمعة، بعد صلاة العصر</p>
          </div>

          <div className="flex flex-col gap-2 mb-auto mt-2 w-full px-8">
            <button 
              onClick={() => setShowDetails(true)}
              className="w-full py-2 bg-[#fcf9f2] text-[#8b6f4e] rounded-full border border-[#e6d5b8] font-bold text-sm shadow-sm hover:bg-[#f0e4d4] transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>التفاصيل والموقع</span>
            </button>
            <button 
              onClick={() => setShowWishes(true)}
              className="w-full py-2 bg-[#d4af37] text-white rounded-full font-bold text-sm shadow-sm hover:bg-[#c4a030] transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span>تهنئة العروسين</span>
            </button>
          </div>

          <p className="text-sm text-[#a39171] mt-4 uppercase tracking-wide opacity-80 mb-2">بحضوركم تكتمل فرحتنا</p>
        </motion.div>

        {/* Envelope Front Folds */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-[140px] md:h-[160px] z-30 pointer-events-none rounded-b-xl overflow-hidden"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.6, delay: isOpen ? 0.8 : 0 }}
        >
          {/* Left fold */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-[#ebdcc2] opacity-95 shadow-inner" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }} />
          {/* Right fold */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-[#f2e6d0] opacity-95 shadow-inner" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }} />
          {/* Bottom fold */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-[#e3cdab] shadow-[0_-5px_15px_rgba(0,0,0,0.05)] border-t border-[#d4c19c]/30" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }} />
        </motion.div>

        {/* Envelope Flap (Top Rotate) */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[130px] md:h-[150px] origin-top bg-[#dbccb2] drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)] border-b border-[#c2b49c]/20"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          initial={{ rotateX: 0, zIndex: 40 }}
          animate={isOpen ? { rotateX: 180, zIndex: 5, opacity: 0 } : { rotateX: 0, zIndex: 40, opacity: 1 }}
          transition={{ rotateX: { duration: 0.6, ease: "easeInOut" }, opacity: { duration: 0.5, delay: 0.8 } }}
        />
        
        {/* Open Button (visible when closed) */}
        <AnimatePresence>
          {inviteState === 'closed' && (
             <motion.button 
               onClick={handleOpen}
               initial={{ opacity: 0, scale: 0.8, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.8, y: -20 }}
               transition={{ delay: 0.5 }}
               className="absolute z-50 bottom-[60px] md:bottom-[80px] bg-white text-[#8b6f4e] px-10 py-3 rounded-full font-bold text-xl shadow-[0_4px_20px_rgba(139,111,78,0.2)] hover:bg-[#fdfbf7] flex items-center justify-center gap-2 border border-[#e6d5b8] font-[family-name:var(--font-arabic-body)]"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <Sparkles className="w-5 h-5 text-[#d4af37]" />
               افتح
             </motion.button>
          )}
        </AnimatePresence>

      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#fcf9f2]/60 backdrop-blur-md"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#fcf9f2] w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden text-center p-8 border border-[#eaddc4]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 text-[#8b6f4e] hover:text-[#5a4836] bg-[#f0e4d4] p-1.5 rounded-full transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="font-[family-name:var(--font-arabic-title)] text-3xl text-[#8b6f4e] mb-6">
                تفاصيل الحفل
              </h2>
              
              <div className="space-y-6 text-[#5a4836] font-[family-name:var(--font-arabic-body)] font-medium">
                <div className="flex flex-col items-center gap-2">
                  <CalendarClock className="w-6 h-6 text-[#d4af37]" />
                  <p>الجمعة، 29 مايو 2026</p>
                  <p>بعد صلاة العصر مباشرة</p>
                </div>
                
                <div className="w-16 h-px bg-[#eaddc4] mx-auto"></div>
                
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="w-6 h-6 text-[#d4af37]" />
                  <p className="font-bold text-lg">مسجد أبوقرين البحري</p>
                  <p className="text-sm text-[#8b6f4e]">المنيا - بني محمد سلطان - أبوقرين</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col items-center justify-center gap-2">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://maps.app.goo.gl/Jz8U76L5i4TGxc9WA" 
                  alt="QR Code للموقع" 
                  className="w-32 h-32 rounded-lg p-2 bg-white shadow-sm border border-[#eaddc4]"
                  width={150}
                  height={150}
                />
                <span className="text-xs text-[#a39171]">امسح الكود للوصول للموقع</span>
              </div>

              <a 
                href="https://maps.app.goo.gl/Jz8U76L5i4TGxc9WA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-[#d4af37] text-white rounded-xl font-bold shadow-md hover:bg-[#c4a030] transition-colors font-[family-name:var(--font-arabic-body)]"
              >
                <Map className="w-5 h-5" />
                <span>فتح في خرائط جوجل</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishes Modal */}
      <AnimatePresence>
        {showWishes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#fcf9f2]/60 backdrop-blur-md"
            onClick={() => setShowWishes(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#fcf9f2] w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden text-center p-8 border border-[#eaddc4]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowWishes(false)}
                className="absolute top-4 right-4 text-[#8b6f4e] hover:text-[#5a4836] bg-[#f0e4d4] p-1.5 rounded-full transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="font-[family-name:var(--font-arabic-title)] text-3xl text-[#8b6f4e] mb-2 flex items-center justify-center gap-3">
                <span>اكتب لنا تهنئة</span>
                <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]/20" />
              </h2>
              <p className="text-sm text-[#a39171] mb-6 font-[family-name:var(--font-arabic-body)]">شاركنا فرحتنا برسالة خاصة منك</p>
              
              {wishStatus === 'success' ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="py-10 flex flex-col items-center gap-4 text-[#d4af37]"
                 >
                   <Heart className="w-12 h-12 fill-current" />
                   <p className="font-bold text-lg text-[#8b6f4e] font-[family-name:var(--font-arabic-body)]">تم إرسال تهنئتك بنجاح!</p>
                   <p className="text-sm text-[#a39171]">شكراً لمشاركتنا فرحتنا</p>
                 </motion.div>
              ) : (
                <form onSubmit={submitWish} className="flex flex-col gap-4 font-[family-name:var(--font-arabic-body)]">
                  <div className="flex flex-col text-right">
                    <label htmlFor="message" className="text-sm font-bold text-[#8b6f4e] mb-1">الرسالة</label>
                    <textarea 
                      id="message"
                      value={wishText}
                      onChange={(e) => setWishText(e.target.value)}
                      placeholder="اكتب تهنئتك هنا..."
                      required
                      rows={4}
                      className="w-full p-3 rounded-xl border border-[#eaddc4] bg-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] resize-none text-[#5a4836]"
                    ></textarea>
                  </div>

                  <div className="flex flex-col text-right">
                    <label htmlFor="name" className="text-sm font-bold text-[#8b6f4e] mb-1">الاسم</label>
                    <input 
                      type="text"
                      id="name"
                      value={wishName}
                      onChange={(e) => setWishName(e.target.value)}
                      placeholder="اكتب اسمك"
                      required
                      className="w-full p-3 rounded-xl border border-[#eaddc4] bg-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-[#5a4836]"
                    />
                  </div>

                  {wishStatus === 'error' && (
                    <p className="text-red-500 text-sm font-bold">حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.</p>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmittingWish || !wishText.trim() || !wishName.trim()}
                    className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-[#d4af37] text-white rounded-xl font-bold shadow-md hover:bg-[#c4a030] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingWish ? (
                      <span className="animate-pulse flex items-center gap-2">جاري الإرسال...</span>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 fill-white" />
                        <span>إرسال التهنئة</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
