import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Flame, 
  Flower, 
  Gift, 
  Music, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  Heart,
  Star,
  Sparkles
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '../context/LanguageContext';

const VirtualTemple = () => {
  const { language } = useLanguage();
  // Move translations object inside the component
  const translations = {
    hindi: {
      backgroundVerses: ["ॐ", "जय श्री राम", "हनुमान जी की जय", "🕉️"],
      aarti: "आरती",
      bell: "घंटी",
      incense: "अगरबत्ती",
      flowers: "पुष्पांजलि",
      prasad: "प्रसाद अर्पण",
      fullAarti: "पूर्ण आरती",
      wishTitle: "अपनी मनोकामना लिखें",
      wishPlaceholder: "श्री हनुमान जी से अपनी इच्छा व्यक्त करें...",
      wishButton: "मनोकामना भेजें",
      wishCount: "कुल मनोकामनाएं:",
      wishConfirmTitle: "मनोकामना स्वीकार",
      wishConfirmMsg: "आपकी प्रार्थना श्री हनुमान जी तक पहुँचा दी गई है।",
      wishConfirmBless: "हनुमान जी आपकी मनोकामना पूरी करेंगे।",
      aartiStarted: "श्री हनुमान जी की आरती शुरू हुई",
      bellRung: "🔔 घंटी बजी",
      incenseLit: "🕉️ अगरबत्ती जली",
      incenseMsg: "धूप की सुगंध से मंदिर पवित्र हुआ",
      flowersMsg: "फूलों की वर्षा से हनुमान जी को सजाया",
      prasadMsg: "हनुमान जी को प्रसाद स्वीकार हुआ",
      fullAartiStarted: "श्री हनुमान जी की विधिवत आरती शुरू हुई",
      aartiOngoing: "आरती जारी है...",
      wishAccepted: "🙏 मनोकामना स्वीकार",
      wishDelivered: "आपकी प्रार्थना श्री हनुमान जी तक पहुँचा दी गई है",
      prasadTitle: "प्रसाद अर्पण",
      volume: "वॉल्यूम",
      exitTemple: 'मंदिर से बाहर जाएं',
      exitTempleAria: 'मंदिर से बाहर निकलें',
    },
    english: {
      backgroundVerses: ["ॐ", "Jai Shree Ram", "Victory to Hanumanji", "🕉️"],
      aarti: "Aarti",
      bell: "Bell",
      incense: "Incense",
      flowers: "Pushpanjali",
      prasad: "Offer Prasad",
      fullAarti: "Full Aarti",
      wishTitle: "Write Your Wish",
      wishPlaceholder: "Express your wish to Shri Hanumanji...",
      wishButton: "Send Wish",
      wishCount: "Total Wishes:",
      wishConfirmTitle: "Wish Accepted",
      wishConfirmMsg: "Your prayer has been delivered to Shri Hanumanji.",
      wishConfirmBless: "Hanumanji will fulfill your wish.",
      aartiStarted: "Aarti to Shri Hanumanji has started",
      bellRung: "🔔 Bell Rung",
      incenseLit: "🕉️ Incense Lit",
      incenseMsg: "The temple is purified with incense fragrance",
      flowersMsg: "Hanumanji is adorned with a shower of flowers",
      prasadMsg: "Prasad has been offered to Hanumanji",
      fullAartiStarted: "Full Aarti to Shri Hanumanji has started",
      aartiOngoing: "Aarti is ongoing...",
      wishAccepted: "🙏 Wish Accepted",
      wishDelivered: "Your prayer has been delivered to Shri Hanumanji",
      prasadTitle: "Offer Prasad",
      volume: "Volume",
      exitTemple: 'Exit Temple',
      exitTempleAria: 'Exit the temple',
    },
    bhojpuri: {
      backgroundVerses: ["ॐ", "जय श्री राम", "हनुमान जी के जय", "🕉️"],
      aarti: "आरती",
      bell: "घंटी",
      incense: "अगरबत्ती",
      flowers: "फूल चढ़ाईं",
      prasad: "प्रसाद चढ़ाईं",
      fullAarti: "पूरा आरती",
      wishTitle: "अपना मनोकामना लिखीं",
      wishPlaceholder: "हनुमान जी से आपन इच्छा बताईं...",
      wishButton: "मनोकामना भेजीं",
      wishCount: "कुल मनोकामना:",
      wishConfirmTitle: "मनोकामना स्वीकार भइल",
      wishConfirmMsg: "रउआ प्रार्थना हनुमान जी तक पहुँचा दिहल गइल बा।",
      wishConfirmBless: "हनुमान जी रउआ मनोकामना पूरा करिहें।",
      aartiStarted: "हनुमान जी के आरती शुरू भइल",
      bellRung: "🔔 घंटी बाजल",
      incenseLit: "🕉️ अगरबत्ती जलाईल",
      incenseMsg: "मंदिर अगरबत्ती के सुगंध से पवित्र भइल",
      flowersMsg: "फूलन के वर्षा से हनुमान जी सजाइलें",
      prasadMsg: "हनुमान जी के प्रसाद चढ़ावल गइल",
      fullAartiStarted: "हनुमान जी के पूरा आरती शुरू भइल",
      aartiOngoing: "आरती चल रहल बा...",
      wishAccepted: "🙏 मनोकामना स्वीकार भइल",
      wishDelivered: "रउआ प्रार्थना हनुमान जी तक पहुँचा दिहल गइल बा",
      prasadTitle: "प्रसाद चढ़ाईं",
      volume: "वॉल्यूम",
      exitTemple: 'मंदिर से बाहर जाईं',
      exitTempleAria: 'मंदिर से बाहर निकलीं',
    },
    gujarati: {
      backgroundVerses: ["ॐ", "જય શ્રી રામ", "હનુમાન જી કે જય", "��️"],
      aarti: "આરતી",
      bell: "ઘંટી",
      incense: "અગરબત્તી",
      flowers: "પુષ્પાંજલિ",
      prasad: "પ્રસાદ અર્પણ",
      fullAarti: "પૂર્ણ આરતી",
      wishTitle: "તમારી મનોકામના લખો",
      wishPlaceholder: "શ્રી હનુમાન જીને તમારી ઇચ્છા વિસ્તાર કરો...",
      wishButton: "મનોકામના ભેજો",
      wishCount: "કુલ મનોકામના:",
      wishConfirmTitle: "મનોકામનું સ્વીકાર્ય",
      wishConfirmMsg: "તમારી પ્રાર્થના શ્રી હનુમાન જીને વિતરિત થઈ ગઈ છે.",
      wishConfirmBless: "હનુમાન જી તમારી મનોકામનું પૂરું કરશે.",
      aartiStarted: "શ્રી હનુમાન જીને આરતી શરૂ થઈ ગઈ",
      bellRung: "🔔 ઘંટી બજવામાં આવી",
      incenseLit: "🕉️ અગરબત્તી જલાઈ",
      incenseMsg: "મંદિર અગરબત્તીની સુગંધથી પવિત્ર થઈ ગઈ",
      flowersMsg: "ફૂલોની વર્ષાથી હનુમાન જીને સજાવવામાં આવી",
      prasadMsg: "હનુમાન જીને પ્રસાદ અર્પણ થઈ ગઈ",
      fullAartiStarted: "શ્રી હનુમાન જીને પૂર્ણ આરતી શરૂ થઈ ગઈ",
      aartiOngoing: "આરતી જારી છે...",
      wishAccepted: "🙏 મનોકામનું સ્વીકાર્ય",
      wishDelivered: "તમારી પ્રાર્થના શ્રી હનુમાન જીને વિતરિત થઈ ગઈ",
      prasadTitle: "પ્રસાદ અર્પણ",
      volume: "વોલ્યૂમ",
      exitTemple: 'મંદિરમાંથી બહાર નીકળો',
      exitTempleAria: 'મંદિરમાંથી બહાર જાઓ',
    },
    tamil: {
      backgroundVerses: ["ॐ", "ஜய ஶ்ரீ ராம", "ஹநுமான ஜீ க்கு ஜய", "🕉️"],
      aarti: "ஆர்தி",
      bell: "கிருமி",
      incense: "அகரபத்தி",
      flowers: "புஷ்பாஞ்சலி",
      prasad: "பிரஸாத் அர்ப்பண்",
      fullAarti: "முழு ஆர்தி",
      wishTitle: "உங்கள் மனம் விரும்பின்றி எழுதுங்கள்",
      wishPlaceholder: "சிரீ ஹநுமான ஜீக்கு உங்கள் விரும்பின்றி வெளிப்படுத்துங்கள்...",
      wishButton: "மனம் விரும்பின்றி அனுப்புங்கள்",
      wishCount: "மொத்த மனம் விரும்பின்றிகள்:",
      wishConfirmTitle: "மனம் விரும்பின்றி ஏற்றுக்கொள்ளப்பட்டது",
      wishConfirmMsg: "உங்கள் பிரார்த்தனை சிரீ ஹநுமான ஜீக்கு விதரிக்கப்பட்டது.",
      wishConfirmBless: "ஹநுமான ஜீ உங்கள் மனம் விரும்பின்றி முழுவதும் மேற்க்கும்.",
      aartiStarted: "சிரீ ஹநுமான ஜீக்கு ஆர்தி தொடங்கியது",
      bellRung: "🔔 கிருமி அழைக்கப்பட்டது",
      incenseLit: "🕉️ அகரபத்தி ஒன்றியது",
      incenseMsg: "மந்திரம் அகரபத்தியின் சுகம் மூலம் பவித்ரமாக்கப்பட்டது",
      flowersMsg: "புகையில் முட்டைகள் மூலம் ஹநுமான ஜீ அமர்ந்திருக்கிறார்",
      prasadMsg: "பிரஸாத் ஹநுமான ஜீக்கு அர்ப்பண் அளிக்கப்பட்டது",
      fullAartiStarted: "சிரீ ஹநுமான ஜீக்கு முழு ஆர்தி தொடங்கியது",
      aartiOngoing: "ஆர்தி தொடர்ந்து உள்ளது...",
      wishAccepted: "🙏 மனம் விரும்பின்றி ஏற்றுக்கொள்ளப்பட்டது",
      wishDelivered: "உங்கள் பிரார்த்தனை சிரீ ஹநுமான ஜீக்கு விதரிக்கப்பட்டது",
      prasadTitle: "பிரஸாத் அர்ப்பண்",
      volume: "வோல்யூம்",
      exitTemple: 'கோவிலிருந்து வெளியேறு',
      exitTempleAria: 'கோவிலிருந்து வெளியேறவும்',
    },
  };
  const t = translations[language];
  const [isAartiPlaying, setIsAartiPlaying] = useState(false);
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [isAgarbattiLit, setIsAgarbattiLit] = useState(false);
  const [isFullAartiActive, setIsFullAartiActive] = useState(false);
  const [wish, setWish] = useState('');
  const [showWishDialog, setShowWishDialog] = useState(false);
  const [wishesCount, setWishesCount] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isPrasadOffered, setIsPrasadOffered] = useState(false);
  const [prasadPosition, setPrasadPosition] = useState({ x: 0, y: 0 });
  const [isDraggingPrasad, setIsDraggingPrasad] = useState(false);
  const { toast } = useToast();
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const bellAudioRef = useRef<HTMLAudioElement>(null);
  const aartiAudioRef = useRef<HTMLAudioElement>(null);
  const templeRef = useRef<HTMLDivElement>(null);

  // 1. Replace isFlowersRaining with an array of flower sets
  const [flowerSets, setFlowerSets] = useState<{id: number, offset: number}[]>([]);
  let flowerSetId = 0; // outside component, but for hot reload safety, use Date.now()

  // Initialize temple
  useEffect(() => {
    // Load saved wishes count
    const savedWishes = localStorage.getItem('hanumanTemple_wishes');
    if (savedWishes) {
      setWishesCount(parseInt(savedWishes));
    }
  }, []);

  // Audio controls
  const toggleAarti = () => {
    if (isAartiPlaying) {
      aartiAudioRef.current?.pause();
      setIsAartiPlaying(false);
    } else {
      aartiAudioRef.current?.play();
      setIsAartiPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsAudioMuted(!isAudioMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isAudioMuted;
    }
    if (aartiAudioRef.current) {
      aartiAudioRef.current.muted = !isAudioMuted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
    if (aartiAudioRef.current) aartiAudioRef.current.volume = newVolume;
  };

  // Interactive elements
  const ringBell = () => {
    setIsBellRinging(true);
    console.log('Bell icon clicked');
    if (bellAudioRef.current) {
      console.log('bellAudioRef.current exists', bellAudioRef.current);
      bellAudioRef.current.currentTime = 0;
      const playPromise = bellAudioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Bell sound played successfully');
        }).catch((err) => {
          console.error('Error playing bell sound:', err);
        });
      }
    } else {
      console.warn('bellAudioRef.current is null');
    }
    toast({
      title: t.bellRung,
      description: t.aartiStarted,
    });
    setTimeout(() => setIsBellRinging(false), 2000);
  };

  const lightAgarbatti = () => {
    setIsAgarbattiLit(true);
    toast({
      title: t.incenseLit,
      description: t.incenseMsg,
    });
    setTimeout(() => setIsAgarbattiLit(false), 5000);
  };

  // 2. Update rainFlowers to add a new set with random offset
  const rainFlowers = () => {
    const id = Date.now() + Math.random();
    const offset = Math.floor(Math.random() * 120) - 60; // -60px to +60px
    setFlowerSets(prev => [...prev, {id, offset}]);
    toast({
      title: t.flowers,
      description: t.flowersMsg,
    });
    setTimeout(() => {
      setFlowerSets(prev => prev.filter(set => set.id !== id));
    }, 60000); // 1 minute
  };

  const startFullAarti = () => {
    setIsFullAartiActive(true);
    aartiAudioRef.current?.play();
    setIsAartiPlaying(true);
    toast({
      title: t.fullAarti,
      description: t.fullAartiStarted,
    });
    setTimeout(() => {
      setIsFullAartiActive(false);
      setIsAartiPlaying(false);
      aartiAudioRef.current?.pause();
    }, 30000); // 30 seconds aarti
  };

  const submitWish = () => {
    if (wish.trim()) {
      setWishesCount(prev => prev + 1);
      localStorage.setItem('hanumanTemple_wishes', (wishesCount + 1).toString());
      setShowWishDialog(true);
      setWish('');
      toast({
        title: t.wishAccepted,
        description: t.wishDelivered,
      });
    }
  };

  // Prasad dragging
  const handlePrasadMouseDown = (e: React.MouseEvent) => {
    setIsDraggingPrasad(true);
    e.preventDefault();
  };

  const handlePrasadMouseMove = (e: React.MouseEvent) => {
    if (isDraggingPrasad && templeRef.current) {
      const rect = templeRef.current.getBoundingClientRect();
      setPrasadPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handlePrasadMouseUp = () => {
    if (isDraggingPrasad) {
      setIsDraggingPrasad(false);
      setIsPrasadOffered(true);
      toast({
        title: t.prasadTitle,
        description: t.prasadMsg,
      });
      setTimeout(() => setIsPrasadOffered(false), 3000);
    }
  };

  // Helper to handle click animation
  const handleButtonClick = (key: string, action: () => void) => {
    setClickedButton(key);
    action();
    setTimeout(() => setClickedButton(null), 350);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Responsive, Centered Background Image */}
      <img
        src="/5.jpeg"
        alt="Temple Background"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-xs md:w-2/3 md:max-w-lg object-contain z-0"
        style={{
          pointerEvents: 'none',
          opacity: 0.85,
          filter: 'none',
          zIndex: 0
        }}
        draggable="false"
      />
      {/* Exit Temple Button */}
      <Link to="/" aria-label={t.exitTempleAria} className="fixed top-6 left-6 z-50">
        <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-200 via-orange-100 to-amber-100 shadow-lg border-2 border-amber-400 text-[hsl(var(--maroon))] font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 animate-glow">
          <span className="text-2xl" role="img" aria-label="conch">🪔</span>
          {t.exitTemple}
        </button>
      </Link>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-sacred-pattern opacity-20"></div>
      
      {/* Floating Sanskrit Verses */}
      <div className="absolute inset-0 pointer-events-none">
        {t.backgroundVerses.map((verse, index) => (
          <div
            key={index}
            className="absolute top-10 left-10 text-amber-200 text-2xl opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {verse}
          </div>
        ))}
      </div>

      {/* Audio Elements */}
      <audio ref={audioRef} loop>
        <source src="/Shri Hanuman Chalisa.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={bellAudioRef}>
        <source src="/bell.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={aartiAudioRef}>
        <source src="/aarti-sound.mp3" type="audio/mpeg" />
      </audio>

      {/* Temple Container */}
      <div ref={templeRef} 
           className="relative w-full h-screen perspective-1000"
           style={{
             background: "url('/5.png') center calc(50% - 40px) / cover no-repeat",
             backgroundColor: 'transparent',
             filter: 'none',
           }}
           onMouseMove={handlePrasadMouseMove}
           onMouseUp={handlePrasadMouseUp}>
        {/* Removed overlay for maximum clarity */}
        {/* Temple Structure - 3D Effect */}
        <div className="absolute inset-0 flex items-center justify-center" style={{zIndex:2}}>
          <div className="temple-sanctum relative w-96 h-96 transform-style-preserve-3d">
            
            {/* Temple Floor */}
            {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-2 bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-800 rounded-full shadow-2xl"></div> */}
            
            {/* Temple Walls */}
            {/* Remove the following div to eliminate the card background */}
            {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-72 h-64 bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-100 rounded-t-3xl border-4 border-amber-300 shadow-2xl"> */}
            {/* Temple Arch and Toran can remain if desired, but remove the background and border classes */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-72 h-64" style={{zIndex:3}}>
              {/* Temple Arch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-16" />
              {/* Temple Toran (moved title outside for global positioning) */}
            </div>
            {/* Global Hanuman Mandir Title at top center of wallpaper */}
            <div className="absolute" style={{top: '-6cm', left: '50%', transform: 'translateX(-80%)', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 40, pointerEvents: 'none'}}>
              <span className="text-xl md:text-2xl font-extrabold text-yellow-50 drop-shadow-lg" style={{
                textShadow: '0 0 12px #FFD700, 0 2px 8px #FFA500, 0 0 2px #FFD700',
                letterSpacing: '2px',
                WebkitTextStroke: '1px #FFD700',
              }}>
                श्री हनुमान मंदिर
              </span>
            </div>

            {/* Main Hanumanji Idol */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-96 h-96 z-20" style={{ left: 'calc(50% - 2.5cm)', bottom: 'calc(4rem - 2.5cm)' }}>
              <img
                src="/7.png"
                alt="Shri Hanumanji"
                className="w-full h-full object-contain filter drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 16px 64px rgba(255, 215, 0, 0.8)) brightness(1.1)',
                  background: 'none',
                }}
              />
              
              {/* Aarti Light Effect */}
              {isAartiPlaying && (
                <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
              )}
              
              {/* Flower Rain Effect */}
              {flowerSets.map((set, setIdx) => (
                <div
                  key={set.id}
                  className="absolute w-full flex justify-center items-end bottom-0 left-0 z-30 pointer-events-none"
                  style={{height: '30%', transform: `translateX(${set.offset}px)`}}
                >
                  {["/8.4.png", "/8.5.png", "/8.6.png", "/8.7.png"].map((src, i) => (
                    <img
                      key={src + set.id}
                      src={src}
                      alt={`Flower ${i+1}`}
                      className="mx-2"
                      style={{
                        width: '54px',
                        height: '54px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 4px 16px #FFD70088) brightness(1.08)',
                        opacity: 0.98,
                        transition: 'transform 0.5s',
                        transform: `translateY(-${16 + i*8}px) scale(1.08)`
                      }}
                      draggable="false"
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Prasad Offering */}
            {isPrasadOffered && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 z-30">
                <div className="w-full h-full bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                  🍛
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Pooja Elements - Redesigned */}
        <style>{`
          .spiritual-click {
            animation: spiritualPulse 0.35s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes spiritualPulse {
            0% { box-shadow: 0 0 0 0 #FFD70088, 0 0 0 0 #FFA50044; transform: scale(1); }
            50% { box-shadow: 0 0 32px 16px #FFD70088, 0 0 64px 32px #FFA50044; transform: scale(1.12); }
            100% { box-shadow: 0 0 0 0 #FFD70000, 0 0 0 0 #FFA50000; transform: scale(1); }
          }
          .spiritual-bg {
            position: absolute;
            width: 4.5rem;
            height: 4.5rem;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
            pointer-events: none;
            opacity: 0.55;
          }
          .spiritual-icon-glow {
            filter: drop-shadow(0 0 6px #fff) drop-shadow(0 0 2px #fff) drop-shadow(0 0 1px #fff);
          }
          .spiritual-label {
            color: #FF6600;
            font-size: 1.25rem;
            font-weight: 900;
            letter-spacing: 0.5px;
            -webkit-text-stroke: 1px #FFD700;
            text-stroke: 1px #FFD700;
            text-shadow:
              0 0 6px #fff,
              0 2px 8px #FFD700,
              0 0 2px #FFD700,
              0 0 1px #fff;
            filter: drop-shadow(0 0 4px #fff) drop-shadow(0 0 2px #FFD700);
          }
        `}</style>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-8 z-30">
          {/* Diya/Aarti Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleButtonClick('aarti', toggleAarti)}
              className={`w-20 h-20 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 relative group bg-transparent ring-0 ${isAartiPlaying ? 'animate-pulse' : ''} ${clickedButton==='aarti' ? 'spiritual-click' : ''}`}
              style={{ boxShadow: 'none', background: 'transparent' }}
              aria-label="Aarti"
            >
              {/* Subtle Mandala/Halo Background */}
              <span className="spiritual-bg">
                <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none">
                  <defs>
                    <radialGradient id="haloAarti" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFDE4" stopOpacity="0.85"/>
                      <stop offset="70%" stopColor="#FFD700" stopOpacity="0.13"/>
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <circle cx="36" cy="36" r="34" fill="url(#haloAarti)"/>
                  <circle cx="36" cy="36" r="24" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.18"/>
                  <circle cx="36" cy="36" r="16" fill="none" stroke="#FFA500" strokeWidth="1" opacity="0.10"/>
                </svg>
              </span>
              <img
                src="/8.2.png"
                alt="Aarti Icon"
                className="w-20 h-20 object-contain drop-shadow-lg relative z-10 spiritual-icon-glow"
                style={{ filter: 'drop-shadow(0 0 16px #FFD70088) brightness(1.08)' }}
                draggable="false"
              />
            </button>
            <span className="mt-2 spiritual-label">आरती</span>
          </div>
          {/* Bell Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleButtonClick('bell', ringBell)}
              className={`w-20 h-20 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 relative group bg-transparent ring-0 ${isBellRinging ? 'animate-pulse' : ''} ${clickedButton==='bell' ? 'spiritual-click' : ''}`}
              style={{ boxShadow: 'none', background: 'transparent' }}
              aria-label="Bell"
            >
              {/* Subtle Mandala/Halo Background */}
              <span className="spiritual-bg">
                <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none">
                  <defs>
                    <radialGradient id="haloBell" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFDE4" stopOpacity="0.85"/>
                      <stop offset="70%" stopColor="#FFD700" stopOpacity="0.13"/>
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <circle cx="36" cy="36" r="34" fill="url(#haloBell)"/>
                  <circle cx="36" cy="36" r="24" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.18"/>
                  <circle cx="36" cy="36" r="16" fill="none" stroke="#FFA500" strokeWidth="1" opacity="0.10"/>
                </svg>
              </span>
              <img
                src="/8.1.png"
                alt="Bell Icon"
                className="w-20 h-20 object-contain drop-shadow-lg relative z-10 spiritual-icon-glow"
                style={{ filter: 'drop-shadow(0 0 16px #FFD70088) brightness(1.08)' }}
                draggable="false"
              />
            </button>
            <span className="mt-2 spiritual-label">घंटी</span>
          </div>
          {/* Agarbatti Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleButtonClick('agarbatti', lightAgarbatti)}
              className={`w-20 h-20 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 relative group bg-transparent ring-0 ${isAgarbattiLit ? 'animate-pulse' : ''} ${clickedButton==='agarbatti' ? 'spiritual-click' : ''}`}
              style={{ boxShadow: 'none', background: 'transparent' }}
              aria-label="Agarbatti"
            >
              {/* Subtle Mandala/Halo Background */}
              <span className="spiritual-bg">
                <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none">
                  <defs>
                    <radialGradient id="haloAgarbatti" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFDE4" stopOpacity="0.85"/>
                      <stop offset="70%" stopColor="#FFD700" stopOpacity="0.13"/>
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <circle cx="36" cy="36" r="34" fill="url(#haloAgarbatti)"/>
                  <circle cx="36" cy="36" r="24" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.18"/>
                  <circle cx="36" cy="36" r="16" fill="none" stroke="#FFA500" strokeWidth="1" opacity="0.10"/>
                </svg>
              </span>
              {/* Beautiful Agarbatti SVG */}
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="relative z-10 spiritual-icon-glow">
                <rect x="24" y="16" width="4" height="22" rx="2" fill="#795548"/>
                <rect x="25" y="10" width="2" height="8" rx="1" fill="#FF7043"/>
                <ellipse cx="26" cy="10" rx="2" ry="1.2" fill="#FFAB91"/>
                <ellipse cx="26" cy="7" rx="3" ry="1.5" fill="#FFFDE4" opacity="0.7"/>
                <ellipse cx="26" cy="4" rx="1.5" ry="0.9" fill="#FFFDE4" opacity="0.4"/>
              </svg>
            </button>
            <span className="mt-2 spiritual-label">अगरबत्ती</span>
          </div>
          {/* Pushpanjali Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleButtonClick('pushpanjali', rainFlowers)}
              className={`w-20 h-20 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 relative group bg-transparent ring-0 ${clickedButton==='pushpanjali' ? 'spiritual-click' : ''}`}
              style={{ boxShadow: 'none', background: 'transparent' }}
              aria-label="Pushpanjali"
            >
              {/* Subtle Mandala/Halo Background */}
              <span className="spiritual-bg">
                <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none">
                  <defs>
                    <radialGradient id="haloPushpanjali" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFDE4" stopOpacity="0.85"/>
                      <stop offset="70%" stopColor="#FFD700" stopOpacity="0.13"/>
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <circle cx="36" cy="36" r="34" fill="url(#haloPushpanjali)"/>
                  <circle cx="36" cy="36" r="24" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.18"/>
                  <circle cx="36" cy="36" r="16" fill="none" stroke="#FFA500" strokeWidth="1" opacity="0.10"/>
                </svg>
              </span>
              <img
                src="/8.png"
                alt="Pushpanjali Flower"
                className="w-20 h-20 object-contain drop-shadow-lg relative z-10 spiritual-icon-glow"
                style={{ filter: 'drop-shadow(0 0 16px #FFD70088) brightness(1.08)' }}
                draggable="false"
              />
            </button>
            <span className="mt-2 spiritual-label">पुष्पांजलि</span>
          </div>
          {/* Music/Chant Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleButtonClick('music', toggleMute)}
              className={`w-20 h-20 flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 relative group bg-transparent ring-0 ${!isAudioMuted ? 'animate-pulse' : ''} ${clickedButton==='music' ? 'spiritual-click' : ''}`}
              style={{ boxShadow: 'none', background: 'transparent' }}
              aria-label="Music/Chant"
            >
              {/* Subtle Mandala/Halo Background */}
              <span className="spiritual-bg">
                <svg width="100%" height="100%" viewBox="0 0 72 72" fill="none">
                  <defs>
                    <radialGradient id="haloMusic" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFDE4" stopOpacity="0.85"/>
                      <stop offset="70%" stopColor="#FFD700" stopOpacity="0.13"/>
                      <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <circle cx="36" cy="36" r="34" fill="url(#haloMusic)"/>
                  <circle cx="36" cy="36" r="24" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.18"/>
                  <circle cx="36" cy="36" r="16" fill="none" stroke="#FFA500" strokeWidth="1" opacity="0.10"/>
                </svg>
              </span>
              <img
                src="/8.3.png"
                alt="Music Icon"
                className="w-20 h-20 object-contain drop-shadow-lg relative z-10 spiritual-icon-glow"
                style={{ filter: 'drop-shadow(0 0 16px #FFD70088) brightness(1.08)' }}
                draggable="false"
              />
            </button>
            <span className="mt-2 spiritual-label">संगीत</span>
          </div>
        </div>

        {/* Prasad Dragging Area */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center cursor-grab border-4 border-yellow-400 shadow-lg"
             onMouseDown={handlePrasadMouseDown}>
          <div className="text-3xl">🍛</div>
        </div>

        {/* Audio Controls */}
        <div className="absolute top-10 left-10 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg z-40">
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleMute}
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full"
            >
              {isAudioMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t.volume}</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20"
              />
            </div>
          </div>
        </div>

        {/* Wish Section */}
        <div className="absolute top-10 right-10 w-80 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg z-40">
          <h3 className="text-lg font-bold text-amber-800 mb-4">{t.wishTitle}</h3>
          <Textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder={t.wishPlaceholder}
            className="mb-4 resize-none"
            rows={3}
          />
          <Button
            onClick={submitWish}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            disabled={!wish.trim()}
          >
            <Heart className="w-4 h-4 mr-2" />
            {t.wishButton}
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            {t.wishCount} {wishesCount}
          </p>
        </div>

        {/* Full Aarti Overlay */}
        {isFullAartiActive && (
          <div className="absolute inset-0 bg-yellow-200/30 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-spin">🪔</div>
              <h2 className="text-2xl font-bold text-amber-800 mb-2">{t.aarti}</h2>
              <p className="text-amber-700">{t.aartiOngoing}</p>
            </div>
          </div>
        )}
      </div>

      {/* Wish Confirmation Dialog */}
      <Dialog open={showWishDialog} onOpenChange={setShowWishDialog}>
        <DialogContent className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <DialogHeader>
            <DialogTitle className="text-amber-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {t.wishConfirmTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="text-4xl mb-4">🙏</div>
            <p className="text-lg text-amber-700">
              {t.wishConfirmMsg}
            </p>
            <p className="text-sm text-amber-600 mt-2">
              {t.wishConfirmBless}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VirtualTemple; 