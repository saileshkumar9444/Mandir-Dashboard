import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  Play, 
  Pause,
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
  Video,
  Camera,
  Globe,
  BookOpen as BookOpenIcon,
  Sparkles
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SpiritualBookViewer from '@/components/SpiritualBookViewer';
import FloatingSymbols from '@/components/FloatingSymbols';
import SubtleDivineBackground from '@/components/SubtleDivineBackground';
import DivineEffects from '@/components/DivineEffects';
import DownloadLanguageModal from '../components/DownloadLanguageModal';
import RamChakra from '../components/RamChakra';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import DivineParticles from '@/components/DivineParticles';

// Language content
const content = {
  hindi: {
    title: "🙏 जय श्री राम 🙏",
    subtitle: "श्री महावीर हनुमान मंदिर",
    nav: {
      home: "मुख्य पृष्ठ",
      about: "हमारे बारे में", 
      donate: "दान करें",
      granths: "धर्म ग्रंथ",
      stories: "हनुमान कथाएं",
      donors: "दानदाता",
      progress: "प्रगति",
      achievements: "उपलब्धियां",
      contact: "संपर्क"
    },
    about: {
      title: "श्री हनुमान मंदिर के बारे में",
      story: `श्री हनुमान मंदिर, धनहारा, टोले रामपुर, औरंगाबाद (बिहार) में स्थित एक अत्यंत पावन और श्रद्धा का स्थान है। वर्तमान में यह मंदिर निर्माणाधीन है, लेकिन जिस भूमि पर यह स्थित है, वह अत्यंत प्राचीन और धार्मिक दृष्टि से महत्वपूर्ण मानी जाती है।\n\nयह स्थान भगवान श्री हनुमान जी की दिव्य उपस्थिति का प्रतीक रहा है और वर्षों से स्थानीय श्रद्धालुओं द्वारा पूजा जाता रहा है। यहाँ की भूमि को मंदिर निर्माण के लिए समर्पित किया जा चुका है और भक्तगण इसे चमत्कारी और कृपा से भरपूर मानते हैं।\n\nयह स्थान न केवल एक भविष्य का भव्य मंदिर बनेगा, बल्कि पूरे समुदाय की आस्था, एकता और आध्यात्मिकता का केंद्र भी सिद्ध होगा। सभी श्रद्धालुओं की सामूहिक सहयोग और आस्था से बहुत जल्द यहाँ एक दिव्य श्री हनुमान मंदिर का निर्माण संभव होगा।`,
      address: "पूरा पता: धनहारा, टोले रामपुर, औरंगाबाद, बिहार, 824121, भारत"
    },
    donate: {
      title: "दान करें",
      upi: "UPI ID: shreehanumanmandir@jio",
      form: {
        name: "आपका नाम",
        amount: "दान राशि (₹)",
        button: "अभी दान करें"
      },
      thank: "🙏 आपके दान के लिए धन्यवाद। हनुमानजी आपको आशीर्वाद देंगे।",
      motivation: "आपकी दी गई एक-एक ईंट इस पवित्र मंदिर का हिस्सा बनेगी।"
    },
    donors: {
      title: "दानदाता सूची",
      empty: "अभी तक कोई दान नहीं मिला है।"
    },
    granths: {
      title: "धर्म ग्रंथ",
      gita: "भगवद गीता", 
      ramayana: "रामचरितमानस",
      chalisa: "हनुमान चालीसा",
      stories: "हनुमान कथाएं"
    },
    videos: {
      title: "हनुमान कथाएं और वीडियो"
    },
    progress: {
      title: "मंदिर निर्माण प्रगति",
      target: "लक्ष्य: ₹5,00,000",
      raised: "एकत्रित: ₹",
      remaining: "शेष: ₹",
      percentage: "पूर्णता:",
      construction: "निर्माण प्रगति:",
      foundation: "नींव पूर्ण",
      walls: "दीवारें पूर्ण",
      roof: "छत पूर्ण",
      finishing: "सजावट जारी"
    },
    achievements: {
      title: "उपलब्धियां",
      milestone1: "पहला 100 दानदाता",
      milestone2: "₹1,00,000 का लक्ष्य पूर्ण",
      milestone3: "मंदिर नींव पूर्ण",
      milestone4: "दीवार निर्माण पूर्ण",
      milestone5: "छत का काम पूर्ण",
      milestone6: "₹5,00,000 का लक्ष्य पूर्ण",
      completed: "पूर्ण",
      inProgress: "जारी"
    },
    contact: {
      title: "संपर्क करें",
      address: "पता",
      phone: "फ़ोन",
      email: "ईमेल"
    },
    footer: "भगवान हनुमान आपको और आपके परिवार को आशीर्वाद दें।",
    virtualTempleTitle: "🕉️ आभासी हनुमान मंदिर 🕉️",
    virtualTempleDesc: "अपने घर से ही श्री हनुमान जी के दर्शन करें और आभासी पूजा का अनुभव लें",
    virtualTempleEnter: "आभासी मंदिर में प्रवेश करें",
    virtualTempleAarti: "आरती",
    virtualTempleAartiDesc: "श्री हनुमान जी की आरती करें",
    virtualTempleWish: "मनोकामना",
    virtualTempleWishDesc: "अपनी इच्छा हनुमान जी को बताएं",
    virtualTemplePushpanjali: "पुष्पांजलि",
    virtualTemplePushpanjaliDesc: "फूलों से हनुमान जी को सजाएं",
  },
  english: {
    title: "🙏 Jai Shree Ram 🙏",
    subtitle: "Shree Hanuman Mandir",
    nav: {
      home: "Home",
      about: "About",
      donate: "Donate", 
      granths: "Scriptures",
      stories: "Hanuman Stories",
      donors: "Donors",
      progress: "Progress",
      contact: "Contact"
    },
    about: {
      title: "About Shree Hanuman Mandir",
      story: "This sacred Hanuman Temple is located in Dhanhara, Tole Rampur, Aurangabad, Bihar. Here, through the great power and grace of Lord Hanuman, thousands of devotees' wishes are fulfilled. This temple is not just a place of worship, but also the center of the community's spiritual strength.",
      address: "Complete Address: Dhanhara, Tole Rampur, Aurangabad, Bihar, 824121, India"
    },
    donate: {
      title: "Make a Donation",
      upi: "UPI ID: shreehanumanmandir@jio",
      form: {
        name: "Your Name",
        amount: "Donation Amount (₹)",
        button: "Donate Now"
      },
      thank: "🙏 Thank you for your donation. Hanumanji will bless you.",
      motivation: "Even a single brick you donate becomes part of this holy temple."
    },
    donors: {
      title: "List of Donors",
      empty: "No donations received yet."
    },
    granths: {
      title: "Sacred Scriptures",
      gita: "Bhagavad Gita",
      ramayana: "Ramcharitmanas", 
      chalisa: "Hanuman Chalisa",
      stories: "Hanuman Stories"
    },
    videos: {
      title: "Hanuman Stories and Videos"
    },
    progress: {
      title: "Temple Construction Progress",
      target: "Target: ₹500,000",
      raised: "Raised: ₹",
      remaining: "Remaining: ₹",
      percentage: "Completion:",
      construction: "Construction Progress:",
      foundation: "Foundation Complete",
      walls: "Walls Complete",
      roof: "Roof Complete",
      finishing: "Finishing Ongoing"
    },
    achievements: {
      title: "Achievements",
      milestone1: "First 100 Donors",
      milestone2: "₹100,000 Target Achieved",
      milestone3: "Temple Foundation Complete",
      milestone4: "Wall Construction Complete",
      milestone5: "Roof Work Complete",
      milestone6: "₹500,000 Target Achieved",
      completed: "Completed",
      inProgress: "In Progress"
    },
    contact: {
      title: "Contact Us",
      address: "Address",
      phone: "Phone", 
      email: "Email"
    },
    footer: "May Lord Hanuman bless you and your family.",
    virtualTempleTitle: "🕉️ Virtual Hanuman Temple 🕉️",
    virtualTempleDesc: "Experience Hanumanji's darshan and virtual pooja from your home",
    virtualTempleEnter: "Enter Virtual Temple",
    virtualTempleAarti: "Aarti",
    virtualTempleAartiDesc: "Perform aarti of Shri Hanumanji",
    virtualTempleWish: "Wish",
    virtualTempleWishDesc: "Tell your wish to Hanumanji",
    virtualTemplePushpanjali: "Pushpanjali",
    virtualTemplePushpanjaliDesc: "Adorn Hanumanji with flowers",
  },
  bhojpuri: {
    title: "🙏 जय श्री राम 🙏",
    subtitle: "श्री हनुमान मंदिर",
    nav: {
      home: "घर",
      about: "हमरे बारे में",
      donate: "दान करीं",
      granths: "धरम ग्रंथ",
      stories: "हनुमान कथा",
      donors: "दानी लोग",
      progress: "प्रगति",
      contact: "संपर्क"
    },
    about: {
      title: "श्री हनुमान मंदिर के बारे में",
      story: "ई पवित्र हनुमान मंदिर धनहारा, टोले रामपुर, औरंगाबाद, बिहार में बा। यहाँ भगवान हनुमान के महान शक्ति आउ कृपा से हजारों भक्तन के मनोकामना पूरा होखेला। ई मंदिर ना सिर्फ पूजा के जगह बा, बल्कि समुदाय के आध्यात्मिक शक्ति के केंद्र भी बा।",
      address: "पूरा पता: धनहारा, टोले रामपुर, औरंगाबाद, बिहार, 824121, भारत"
    },
    donate: {
      title: "दान करीं",
      upi: "UPI ID: shreehanumanmandir@jio",
      form: {
        name: "रउआ के नाम",
        amount: "दान राशि (₹)",
        button: "अभी दान करीं"
      },
      thank: "🙏 रउआ के दान खातिर धन्यवाद। हनुमानजी रउआ के आशीर्वाद देत।",
      motivation: "रउआ के दिहल एक-एक ईंट एह पवित्र मंदिर के हिस्सा बनी।"
    },
    donors: {
      title: "दानी लोगन के सूची",
      empty: "अभी तक कवनो दान ना मिलल बा।"
    },
    granths: {
      title: "धरम ग्रंथ",
      gita: "भगवद गीता",
      ramayana: "रामचरितमानस",
      chalisa: "हनुमान चालीसा", 
      stories: "हनुमान कथा"
    },
    videos: {
      title: "हनुमान कथा आउ वीडियो"
    },
    progress: {
      title: "मंदिर निर्माण प्रगति",
      target: "लक्ष्य: ₹5,00,000",
      raised: "जुटल: ₹",
      remaining: "बाकी: ₹",
      percentage: "पूरा भइल:",
      construction: "निर्माण प्रगति:",
      foundation: "नींव पूरा",
      walls: "दीवार पूरा",
      roof: "छत पूरा",
      finishing: "सजावट जारी बा"
    },
    achievements: {
      title: "उपलब्धि",
      milestone1: "पहिला 100 दानी",
      milestone2: "₹1,00,000 के लक्ष्य पूरा",
      milestone3: "मंदिर के नींव पूरा",
      milestone4: "दीवार बन गइल",
      milestone5: "छत के काम पूरा",
      milestone6: "₹5,00,000 के लक्ष्य पूरा",
      completed: "पूरा",
      inProgress: "जारी बा"
    },
    contact: {
      title: "संपर्क करीं",
      address: "पता",
      phone: "फोन",
      email: "ईमेल"
    },
    footer: "भगवान हनुमान रउआ आउ रउआ के परिवार के आशीर्वाद दें।",
    virtualTempleTitle: "🕉️ आभासी हनुमान मंदिर 🕉️",
    virtualTempleDesc: "घर बैठे हनुमान जी के दर्शन करीं आ आभासी पूजा के अनुभव लीं",
    virtualTempleEnter: "आभासी मंदिर में जाईं",
    virtualTempleAarti: "आरती",
    virtualTempleAartiDesc: "हनुमान जी के आरती करीं",
    virtualTempleWish: "मनोकामना",
    virtualTempleWishDesc: "अपना इच्छा हनुमान जी के बताईं",
    virtualTemplePushpanjali: "पुष्पांजलि",
    virtualTemplePushpanjaliDesc: "फूल से हनुमान जी के सजाईं",
  }
};

// Sample data for localStorage
const sampleData = {
  donors: [
    { name: "राम कुमार", amount: 5100, date: "2024-01-15" },
    { name: "Sita Devi", amount: 2100, date: "2024-01-14" },
    { name: "Arjun Singh", amount: 1001, date: "2024-01-13" },
    { name: "Gunjan Chandravansi", amount: 200, date: "2024-01-16" },
    { name: "Prince Yadav", amount: 1, date: "2024-01-16" },
    { name: "Uttam Shahu", amount: 200, date: "2024-01-16" }
  ],
  granths: [
    { 
      title: "भगवद गीता", 
      titleEn: "Bhagavad Gita",
      description: "श्रीमद्भगवद्गीता",
      downloadUrl: "/gita.pdf",
      audioUrl: "#"
    },
    {
      title: "रामचरितमानस", 
      titleEn: "Ramcharitmanas",
      description: "गोस्वामी तुलसीदास कृत",
      downloadUrl: "#", 
      audioUrl: "#"
    },
    {
      title: "हनुमान चालीसा",
      titleEn: "Hanuman Chalisa", 
      description: "संकटमोचन हनुमान चालीसा",
      downloadUrl: "#",
      audioUrl: "#"
    }
  ],
  videos: [
    {
      title: "हनुमान जन्म कथा",
      titleEn: "Hanuman Birth Story",
      videoUrl: "#",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      title: "मंदिर निर्माण",
      titleEn: "Temple Construction", 
      videoUrl: "#",
      thumbnail: "/api/placeholder/300/200"
    }
  ],
  progress: [
    {
      image: "/api/placeholder/400/300",
      caption: "मंदिर की नींव",
      captionEn: "Temple Foundation",
      date: "जनवरी 2024"
    },
    {
      image: "/api/placeholder/400/300", 
      caption: "दीवार निर्माण",
      captionEn: "Wall Construction",
      date: "फरवरी 2024"
    },
    {
      image: "/api/placeholder/400/300",
      caption: "छत का काम",
      captionEn: "Roof Work", 
      date: "मार्च 2024"
    }
  ]
};

// Add this SVG for the Hanuman flag (dhwaj)
const HanumanFlag = () => (
  <svg className="flag-wave" width="24" height="32" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',top:-12,right:-12,zIndex:3}}>
    <g>
      <rect x="16" y="6" width="4" height="36" rx="2" fill="#B91C1C"/>
      <path d="M20 8 Q32 12 20 18 Q32 24 20 30 Q32 36 20 40" fill="#FF9800" stroke="#FFD700" strokeWidth="2"/>
      <circle cx="20" cy="8" r="2" fill="#FFD700"/>
    </g>
  </svg>
);

// Add this Om and flower icon row for the fixed player
const FixedOmFlowerRow = () => (
  <div className="flex items-center justify-center gap-1 mb-1">
    <span style={{fontSize:16, color:'#FF9800', textShadow:'0 0 4px #FFD700'}}>ॐ</span>
    <span style={{fontSize:14, color:'#FFD700', textShadow:'0 0 3px #FFA500'}}>✿</span>
    <span style={{fontSize:16, color:'#FF9800', textShadow:'0 0 4px #FFD700'}}>ॐ</span>
  </div>
);

// Animated wave bar for audio
const AudioWaveBar = ({playing}) => (
  <div className="flex items-end gap-1 h-4 mb-1 justify-center" aria-hidden>
    {[0,1,2,3,4].map(i => (
      <div key={i} className="rounded bg-gradient-to-t from-[hsl(var(--saffron))] to-[hsl(var(--gold))]" style={{width:3, height:playing ? `${4+Math.sin(Date.now()/200+i)*8}px` : '4px', transition:'height 0.2s'}}></div>
    ))}
  </div>
);

// Fixed Audio Player Component
const FixedAudioPlayer = ({ isVisible, onClose, audioRef, audioPlaying, setAudioPlaying }) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        background: 'linear-gradient(135deg, #fffbe6 0%, #ff9800 100%)',
        boxShadow: '0 -4px 20px 0 rgba(255, 152, 0, 0.3)',
        borderTop: '2px solid #FFD700'
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <HanumanFlag />
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--saffron))] to-[hsl(var(--gold))] flex items-center justify-center shadow-lg">
                <span style={{fontSize:20, color:'white', textShadow:'0 0 4px rgba(0,0,0,0.3)'}}>🎵</span>
              </div>
            </div>
            <div className="flex-1">
              <FixedOmFlowerRow />
              <div className="text-sm font-semibold text-[hsl(var(--maroon))] mb-1">
                श्री हनुमान चालीसा
              </div>
              <AudioWaveBar playing={audioPlaying} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <audio
              ref={audioRef}
              src="/Shri Hanuman Chalisa.mp3"
              autoPlay
              controls
              style={{width:'200px',outline:'none',background:'transparent'}}
              className="opacity-90 hover:opacity-100 transition-opacity"
              onPlay={()=>setAudioPlaying(true)}
              onPause={()=>setAudioPlaying(false)}
            />
            <button 
              aria-label="Close audio player" 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--maroon))] flex items-center justify-center shadow hover:bg-[hsl(var(--saffron))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--saffron))] transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add FloatingDivineSymbols component for Om, Swastik, and flower
const FloatingDivineSymbols = () => (
  <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:3}}>
    {[...Array(7)].map((_,i) => {
      const symbols = ['ॐ','卐','✿'];
      const symbol = symbols[i%3];
      const top = Math.random()*80+5;
      const left = Math.random()*80+5;
      const size = Math.random()*18+18;
      const opacity = 0.13 + Math.random()*0.12;
      const duration = 8+Math.random()*6;
      return (
        <span key={i} style={{
          position:'absolute',
          top:`${top}%`,
          left:`${left}%`,
          fontSize:size,
          opacity,
          color:'#FF9800',
          textShadow:'0 0 12px #FFD700, 0 0 4px #fff8dc',
          animation:`floatY${i} ${duration}s ease-in-out ${Math.random()*3}s infinite alternate`,
          userSelect:'none',
        }}>{symbol}</span>
      );
    })}
    <style>{`
      ${[...Array(7)].map((_,i)=>`@keyframes floatY${i}{0%{transform:translateY(0);}100%{transform:translateY(${Math.random()>0.5?'-':'+'}${Math.random()*32+16}px);}}`).join('\n')}
    `}</style>
  </div>
);

// Add CSS for divine button and title effects

export default function HanumanMandir() {
  const { language, setLanguage } = useLanguage();
  const [donors, setDonors] = useState([]);
  const [donorName, setDonorName] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(null);
  const { toast } = useToast();
  const [showGitaModal, setShowGitaModal] = useState(false);
  const [showRamModal, setShowRamModal] = useState(false);
  const [showChalisaModal, setShowChalisaModal] = useState(false);
  const [showReadModal, setShowReadModal] = useState({ open: false, granth: null });
  const [bookViewer, setBookViewer] = useState({ open: false, file: '', title: '' });
  const audioRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false);
  // Add state for download modal
  const [showDownloadModal, setShowDownloadModal] = useState({ open: false, granth: null });

  const t = content[language];

  // Initialize localStorage data
  useEffect(() => {
    const savedDonors = localStorage.getItem('hanumanMandir_donors');
    if (savedDonors) {
      setDonors(JSON.parse(savedDonors));
    } else {
      localStorage.setItem('hanumanMandir_donors', JSON.stringify(sampleData.donors));
      setDonors(sampleData.donors);
    }

    // Initialize other data if not exists
    if (!localStorage.getItem('hanumanMandir_granths')) {
      localStorage.setItem('hanumanMandir_granths', JSON.stringify(sampleData.granths));
    }
    if (!localStorage.getItem('hanumanMandir_videos')) {
      localStorage.setItem('hanumanMandir_videos', JSON.stringify(sampleData.videos));
    }
    if (!localStorage.getItem('hanumanMandir_progress')) {
      localStorage.setItem('hanumanMandir_progress', JSON.stringify(sampleData.progress));
    }
  }, []);

  const handleDonation = () => {
    if (!donorName || !donationAmount) {
      toast({
        title: "कृपया सभी फ़ील्ड भरें",
        description: "नाम और राशि दोनों आवश्यक हैं।",
        variant: "destructive"
      });
      return;
    }

    const newDonor = {
      name: donorName,
      amount: parseInt(donationAmount),
      date: new Date().toISOString().split('T')[0]
    };

    const updatedDonors = [newDonor, ...donors];
    setDonors(updatedDonors);
    localStorage.setItem('hanumanMandir_donors', JSON.stringify(updatedDonors));

    toast({
      title: t.donate.thank,
      description: t.donate.motivation,
    });

    setDonorName('');
    setDonationAmount('');
  };

  const granths = JSON.parse(localStorage.getItem('hanumanMandir_granths') || '[]');
  const videos = JSON.parse(localStorage.getItem('hanumanMandir_videos') || '[]');
  const progress = JSON.parse(localStorage.getItem('hanumanMandir_progress') || '[]');

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % progress.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + progress.length) % progress.length);
  };

  // Helper to trigger file download
  const handleGitaDownload = (lang: 'english' | 'hindi') => {
    const file = lang === 'english' ? '/gita.pdf' : '/Bhagavad-Gita-Hindi.pdf';
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop() || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowGitaModal(false);
  };
  const handleRamDownload = (lang: 'english' | 'hindi') => {
    const file = lang === 'english' ? '/Shri-Ram-Charitmanas-English.pdf' : '/ramcharitmanas-Hindi.pdf';
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop() || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowRamModal(false);
  };
  const handleChalisaDownload = (lang: 'english' | 'hindi') => {
    const file = lang === 'english' ? '/Sri_Hanuman_Chalisa_English.pdf' : '/hanuman-chalisa-hindi.pdf';
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop() || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowChalisaModal(false);
  };

  const handleRead = (granth) => setShowReadModal({ open: true, granth });
  const handleReadLanguage = (lang) => {
    let file = '';
    let title = '';
    if (showReadModal.granth.titleEn === 'Bhagavad Gita') {
      file = lang === 'english' ? '/gita.pdf' : '/Bhagavad-Gita-Hindi.pdf';
      title = 'Bhagavad Gita';
    } else if (showReadModal.granth.titleEn === 'Ramcharitmanas') {
      file = lang === 'english' ? '/Shri-Ram-Charitmanas-English.pdf' : '/ramcharitmanas-Hindi.pdf';
      title = 'Ramcharitmanas';
    } else if (showReadModal.granth.titleEn === 'Hanuman Chalisa') {
      file = lang === 'english' ? '/Sri_Hanuman_Chalisa_English.pdf' : '/hanuman-chalisa-hindi.pdf';
      title = 'Hanuman Chalisa';
    }
    setBookViewer({ open: true, file, title });
    setShowReadModal({ open: false, granth: null });
  };

  // Handle Hanuman Chalisa audio player
  const handleChalisaAudio = (index) => {
    if (playingAudio === index) {
      setPlayingAudio(null);
      setIsAudioPlayerVisible(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setPlayingAudio(index);
      setIsAudioPlayerVisible(true);
    }
  };

  // Handler for PDF download button
  const handleDownload = (granth) => setShowDownloadModal({ open: true, granth });

  // Handler for language selection in download modal
  const handleDownloadLanguage = (lang) => {
    let file = '';
    let scripture = '';
    if (showDownloadModal.granth.titleEn === 'Bhagavad Gita') {
      file = lang === 'english' ? '/gita.pdf' : '/Bhagavad-Gita-Hindi.pdf';
      scripture = 'Bhagavad Gita';
    } else if (showDownloadModal.granth.titleEn === 'Ramcharitmanas') {
      file = lang === 'english' ? '/Shri-Ram-Charitmanas-English.pdf' : '/ramcharitmanas-Hindi.pdf';
      scripture = 'Ramcharitmanas';
    } else if (showDownloadModal.granth.titleEn === 'Hanuman Chalisa') {
      file = lang === 'english' ? '/Sri_Hanuman_Chalisa_English.pdf' : '/hanuman-chalisa-hindi.pdf';
      scripture = 'Hanuman Chalisa';
    }
    toast({
      title: `Downloading ${scripture} PDF in ${lang === 'english' ? 'English' : 'Hindi'}`,
      description: 'Your download will begin shortly.',
    });
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop() || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadModal({ open: false, granth: null });
  };

  // Add the handler for Ramcharitmanas download:
  const handleDownloadRamcharitmanas = (lang) => {
    let file = '';
    if (lang === 'english') {
      file = '/Shri-Ram-Charitmanas-English.pdf';
    } else if (lang === 'hindi') {
      file = '/ramcharitmanas-Hindi.pdf';
    }
    if (file) {
      const link = document.createElement('a');
      link.href = file;
      link.download = file.split('/').pop() || '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowDownloadModal({ open: false, granth: null });
  };

  return (
    <div className="min-h-screen bg-sacred-pattern mandala-bg">

      {/* Language Selector */}
      <div className="fixed top-4 left-4 z-50">
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="btn-gold rounded-lg px-3 py-2 text-sm font-medium"
        >
          <option value="hindi">हिंदी</option>
          <option value="english">English</option>
          <option value="bhojpuri">भोजपुरी</option>
        </select>
      </div>

      {/* Navigation */}
      <nav className="bg-gradient-to-r from-[hsl(var(--maroon-dark))] to-[hsl(var(--maroon))] text-white shadow-[var(--shadow-sacred)] sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            {Object.entries(t.nav).map(([key, value]) => (
              <a
                key={key}
                href={`#${key}`}
                className="hover:text-[hsl(var(--gold))] transition-[var(--transition-divine)] px-3 py-1 rounded"
              >
                {String(value)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 text-center animate-fade-in relative">
        <div className="flex flex-row items-center justify-center gap-8" style={{position: 'relative', zIndex: 2}}>
          <div style={{ marginLeft: '-6cm' }}>
            <RamChakra />
          </div>
          <div>
            <h1 className="text-sanskrit text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-4 animate-fade-in" 
                style={{
                  background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #FF4500 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 8px #6b1b1b, 0 4px 16px #fffbe6, 0 0 2px #fff',
                  filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.5))',
                  WebkitTextStroke: '1px #6b1b1b'
                }}>
              <span role="img" aria-label="folded hands" className="animate-bounce">🙏</span>
              {t.title}
              <span role="img" aria-label="folded hands" className="animate-bounce" style={{animationDelay: '0.5s'}}>🙏</span>
            </h1>
            <h2 className="text-sanskrit text-2xl md:text-4xl mb-8 animate-fade-in" 
                style={{
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 50%, #FFA500 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 8px #b36b00, 0 4px 16px #fffbe6, 0 0 2px #fff',
                  filter: 'drop-shadow(0 1px 2px rgba(255, 215, 0, 0.4))',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  WebkitTextStroke: '0.7px #b36b00'
                }}>
              {t.subtitle}
            </h2>
            <div className="animate-pulse-sacred inline-block p-4 rounded-full bg-gradient-to-r from-[hsl(var(--saffron))] to-[hsl(var(--gold))]">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          {/* Right side image with artistic styling */}
          <div className="hidden md:block" style={{ marginRight: '-6cm' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--saffron))] rounded-full blur-xl opacity-30 animate-pulse"></div>
              <img 
                src="/download (1).jpeg" 
                alt="Divine Hanuman"
                className="relative z-10 w-64 h-64 object-cover rounded-full border-4 border-[hsl(var(--gold))] shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 8px 32px rgba(255, 193, 7, 0.4)) brightness(1.1) contrast(1.2) saturate(1.3)',
                  clipPath: 'circle(50% at 50% 50%)',
                  background: 'transparent',
                  mixBlendMode: 'multiply',
                  backgroundColor: 'transparent'
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-[hsl(var(--gold)/0.1)] pointer-events-none"></div>
            </div>
          </div>
          {/* Mobile version of the image */}
          <div className="md:hidden flex justify-center mt-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--saffron))] rounded-full blur-xl opacity-30 animate-pulse"></div>
              <img 
                src="/download (1).jpeg" 
                alt="Divine Hanuman"
                className="relative z-10 w-48 h-48 object-cover rounded-full border-4 border-[hsl(var(--gold))] shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 8px 32px rgba(255, 193, 7, 0.4)) brightness(1.1) contrast(1.2) saturate(1.3)',
                  clipPath: 'circle(50% at 50% 50%)',
                  background: 'transparent',
                  mixBlendMode: 'multiply',
                  backgroundColor: 'transparent'
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-[hsl(var(--gold)/0.1)] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 container mx-auto px-4 relative">
        <Card
          className="card-sacred animate-slide-in-left max-w-4xl mx-auto relative overflow-hidden"
          style={{
            backgroundImage: "url('/Hanuman ji.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay for readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.75)', // Soft overlay for readability
              zIndex: 1,
              pointerEvents: 'none',
              borderRadius: 'inherit',
              boxSizing: 'border-box',
            }}
          />
          <div className="relative z-10">
            <CardHeader>
              <CardTitle className="text-sanskrit text-3xl text-center text-[hsl(var(--maroon))]">
                {t.about.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-center">
                {t.about.story}
              </p>
              <div className="text-center">
                <p className="font-semibold text-[hsl(var(--maroon))] flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t.about.address}
                </p>
              </div>
              {/* Google Maps */}
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1529.4653403470595!2d84.36240244828377!3d24.809591260273233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d03003d66f1fd%3A0xe6b25ba06efbf139!2sMahaveer%20Hanuman%20mandir!5e1!3m2!1sen!2sin!4v1752425886742!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hanuman Mandir Location"
                ></iframe>
              </div>
            </CardContent>
          </div>
        </Card>
        
        {/* 4.png image on the right side */}
        <img
          src="/4.png"
          alt="Divine Hanuman"
          className="absolute w-56 md:w-72 lg:w-96 h-auto pointer-events-none select-none"
          style={{
            objectFit: 'contain',
            background: 'transparent',
            filter: 'drop-shadow(0 8px 24px rgba(255, 215, 0, 0.4)) drop-shadow(0 4px 12px rgba(255, 165, 0, 0.3))',
            transition: 'all 0.3s ease-in-out',
            zIndex: 10,
            top: 'calc(50% + 5cm)',
            right: '1cm',
            transform: 'translateY(-50%)'
          }}
          draggable="false"
        />
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-16 bg-gradient-to-br from-[hsl(var(--cream-dark))] to-[hsl(var(--cream))]">
        <div className="container mx-auto px-4">
          <h2 className="text-sanskrit text-3xl font-bold text-center mb-12 text-[hsl(var(--maroon))]">
            {t.donate.title}
          </h2>
          <div className="relative flex justify-center items-center">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* QR Code */}
            <Card className="card-sacred animate-slide-in-left">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">{t.donate.upi}</h3>
                <div className="w-48 h-48 mx-auto bg-white rounded-lg shadow-inner p-4 mb-4">
                  <img 
                    src="/lovable-uploads/5731e681-e78a-4132-bd66-2204a53043f8.png" 
                    alt="Hanuman Mandir QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Scan QR for UPI Payment</p>
              </CardContent>
            </Card>
            {/* Donation Form */}
            <Card className="card-sacred animate-slide-in-right">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t.donate.form.name}</Label>
                    <Input
                      id="name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder={t.donate.form.name}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">{t.donate.form.amount}</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="1001"
                    />
                  </div>
                  <Button 
                    onClick={handleDonation}
                    className="btn-saffron w-full py-3"
                  >
                    {t.donate.form.button}
                  </Button>
                </div>
                <p className="text-center text-sm mt-4 text-[hsl(var(--gold))] font-medium">
                  {t.donate.motivation}
                </p>
              </CardContent>
            </Card>
            </div>
            {/* Hanuman image on the left */}
            <img
              src="/1.png"
              alt="Hanuman ji"
              className="hidden md:block absolute left-[-20px] top-1/3 -translate-y-1/2 w-80 h-auto pointer-events-none select-none"
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 16px #FFD70088) drop-shadow(0 0 8px #FF6F00AA)',
                background: 'transparent',
              }}
              draggable="false"
            />
            {/* Mobile version of Hanuman image */}
            <img
              src="/1.png"
              alt="Hanuman ji"
              className="md:hidden mx-auto mt-8 w-32 h-auto pointer-events-none select-none"
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 16px #FFD70088) drop-shadow(0 0 8px #FF6F00AA)',
                background: 'transparent',
              }}
              draggable="false"
            />
          </div>
        </div>
      </section>

      {/* Donors Section */}
      <section id="donors" className="py-16 container mx-auto px-4">
        <h2 className="text-sanskrit text-3xl font-bold text-center mb-12 text-[hsl(var(--maroon))]">
          {t.donors.title}
        </h2>
        <Card className="card-sacred max-w-4xl mx-auto" style={{
          backgroundImage: "url('/11.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: 'inherit',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <CardContent className="p-6" style={{ position: 'relative', zIndex: 2 }}>
            {donors.length === 0 ? (
              <p className="text-center text-muted-foreground">{t.donors.empty}</p>
            ) : (
              <div className="space-y-3">
                {donors.map((donor, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-[hsl(var(--cream))] to-[hsl(var(--cream-dark))] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[hsl(var(--saffron))]" />
                      <span className="font-medium">{donor.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[hsl(var(--gold))]">₹{donor.amount}</span>
                      <div className="text-xs text-muted-foreground">{donor.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Inspirational Quote */}
        <div className="text-center mt-8 animate-fade-in">
          <p className="text-sanskrit text-lg font-semibold text-[hsl(var(--maroon))] bg-gradient-to-r from-[hsl(var(--gold-light))] to-[hsl(var(--gold))] bg-clip-text text-transparent px-4 py-2 rounded-lg shadow-[var(--shadow-gold)]">
            "दान वही जो हृदय से निकले, और मंदिर वही जो श्रद्धा से खड़ा हो।"
          </p>
        </div>
      </section>

      {/* Virtual Temple Section - Redesigned */}
      <section
        id="virtual-temple"
        className="py-20 md:py-28 relative overflow-hidden flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #fff7e6 60%, #ffe0b2 100%)',
          borderTop: '8px solid #FFD700',
          borderBottom: '8px solid #FFD700',
          boxShadow: '0 0 64px 0 #ffd70044',
          position: 'relative',
        }}
      >
        {/* Surya Mandala SVG background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <svg width="700" height="700" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.13}}>
            <circle cx="350" cy="350" r="320" stroke="#FFD700" strokeWidth="18" fill="url(#mandalaGradient)"/>
            <circle cx="350" cy="350" r="220" stroke="#FFA500" strokeWidth="8" fill="none"/>
            <circle cx="350" cy="350" r="120" stroke="#FFB300" strokeWidth="4" fill="none"/>
            <defs>
              <radialGradient id="mandalaGradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="#fffbe6"/>
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2"/>
              </radialGradient>
            </defs>
          </svg>
        </div>
        {/* Subtle Sanskrit watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span className="text-[10rem] md:text-[16rem] font-sanskrit text-[#FFD700] opacity-10 select-none" style={{fontFamily:'Tiro Devanagari Sanskrit, serif'}}>ॐ</span>
        </div>
        {/* Divine Particles */}
        <DivineParticles />
        {/* Temple Arch Title */}
        <div className="relative z-10 flex flex-col items-center mb-8">
          <svg width="420" height="120" viewBox="0 0 420 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-[-2.5rem] hidden md:block">
            <path d="M10 110 Q210 10 410 110" stroke="#FFD700" strokeWidth="10" fill="none"/>
            <path d="M30 110 Q210 30 390 110" stroke="#FFA500" strokeWidth="6" fill="none"/>
          </svg>
          <div className="relative flex items-center justify-center gap-4">
            <span className="text-[2.5rem] md:text-[3.5rem] text-[#FFD700] drop-shadow-glow animate-glow-mandala" style={{textShadow:'0 0 24px #FFD700, 0 0 48px #FFA500'}}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="inline-block align-middle mr-1"><circle cx="30" cy="30" r="28" stroke="#FFD700" strokeWidth="4" fill="#fffbe6"/><text x="50%" y="54%" textAnchor="middle" fill="#FFA500" fontSize="2.2rem" fontFamily="Tiro Devanagari Sanskrit, serif">ॐ</text></svg>
            </span>
            <h2 className="text-sanskrit text-3xl md:text-5xl font-bold text-center px-6 py-2 rounded-xl bg-gradient-to-r from-[#fffbe6cc] to-[#ffe0b2cc] shadow-lg border-4 border-[#FFD700]" style={{fontFamily:'Tiro Devanagari Sanskrit, serif', letterSpacing:'0.04em', color:'#B91C1C', textShadow:'0 2px 8px #FFD700, 0 0 2px #fff'}}>
              {t.virtualTempleTitle}
            </h2>
            <span className="text-[2.5rem] md:text-[3.5rem] text-[#FFD700] drop-shadow-glow animate-glow-mandala" style={{textShadow:'0 0 24px #FFD700, 0 0 48px #FFA500'}}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="inline-block align-middle ml-1"><circle cx="30" cy="30" r="28" stroke="#FFD700" strokeWidth="4" fill="#fffbe6"/><text x="50%" y="54%" textAnchor="middle" fill="#FFA500" fontSize="2.2rem" fontFamily="Tiro Devanagari Sanskrit, serif">ॐ</text></svg>
            </span>
          </div>
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-lg md:text-xl mb-8 text-amber-900 font-sanskrit" style={{fontFamily:'Tiro Devanagari Sanskrit, serif'}}>
            {t.virtualTempleDesc}
          </p>
          <Link to="/virtual-temple">
            <Button className="btn-saffron text-lg px-8 py-4 text-xl rounded-full border-4 border-[#FFD700] shadow-lg hover:shadow-[0_0_32px_4px_#FFD70055] transition-all duration-200 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#B91C1C] font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 mr-3 animate-pulse-sacred" />
              {t.virtualTempleEnter}
            </Button>
          </Link>
          {/* Pooja Thali Buttons */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Aarti Thali */}
            <div className="relative group flex flex-col items-center justify-center">
              <div className="rounded-full border-4 border-[#FFD700] bg-gradient-to-br from-[#fffbe6] to-[#ffe0b2] shadow-xl p-8 transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_32px_8px_#FFD70055] flex flex-col items-center justify-center" style={{minWidth:180, minHeight:180, position:'relative'}}>
                <span className="text-5xl mb-2 animate-diya-flicker">🪔</span>
                <h3 className="text-xl font-bold mb-1 text-[#B91C1C] font-sanskrit" style={{fontFamily:'Tiro Devanagari Sanskrit, serif'}}>{t.virtualTempleAarti}</h3>
                <p className="text-sm text-amber-800 font-sanskrit" style={{fontFamily:'Tiro Devanagari Sanskrit, serif'}}>{t.virtualTempleAartiDesc}</p>
                {/* Diya Glow */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-t from-[#FFD70099] to-transparent rounded-full blur-lg opacity-70 animate-pulse-sacred" />
              </div>
            </div>
            {/* Mannat Thali */}
            <div className="relative group flex flex-col items-center justify-center">
              <div className="rounded-full border-4 border-[#FFD700] bg-gradient-to-br from-[#fffbe6] to-[#ffe0b2] shadow-xl p-8 transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_32px_8px_#FFD70055] flex flex-col items-center justify-center" style={{minWidth:180, minHeight:180, position:'relative'}}>
                <span className="text-5xl mb-2 animate-hands">🙏</span>
                <h3 className="text-xl font-bold mb-1 text-[#B91C1C] font-sanskrit" style={{fontFamily:'Tiro Devanagari Sanskrit, serif'}}>{t.virtualTempleWish}</h3>
                <p className="text-sm text-amber-800 font-sanskrit" style={{fontFamily:'Tiro Devanagari Sanskrit, serif'}}>{t.virtualTempleWishDesc}</p>
                {/* Hands Glow */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-t from-[#FFD70099] to-transparent rounded-full blur-lg opacity-70 animate-pulse-sacred" />
              </div>
            </div>
            {/* Pushpanjali Thali */}
            <div className="relative group flex flex-col items-center justify-center">
              <div className="rounded-full border-4 border-[#FFD700] bg-gradient-to-br from-[#fffbe6] to-[#ffe0b2] shadow-xl p-8 transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_32px_8px_#FFD70055] flex flex-col items-center justify-center" style={{minWidth:180, minHeight:180, position:'relative'}}>
                <span className="text-5xl mb-2 animate-flower-fall">🌸</span>
                <h3 className="text-xl font-bold mb-1 text-[#B91C1C] font-sanskrit" style={{fontFamily:'Tiro Devanagari Sanskrit, serif'}}>{t.virtualTemplePushpanjali}</h3>
                <p className="text-sm text-amber-800 font-sanskrit" style={{fontFamily:'Tiro Devanagari Sanskrit, serif'}}>{t.virtualTemplePushpanjaliDesc}</p>
                {/* Flower Glow */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-t from-[#FFD70099] to-transparent rounded-full blur-lg opacity-70 animate-pulse-sacred" />
              </div>
            </div>
          </div>
          {/* Audio Chant Toggle */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-[#fffbe6cc] rounded-full px-4 py-2 shadow border-2 border-[#FFD700]">
            <span className="text-amber-900 font-sanskrit text-sm">चैन्टिंग</span>
            <button
              onClick={() => setIsAudioPlayerVisible((v) => !v)}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow hover:scale-110 transition-all"
              aria-label="Toggle Chant Audio"
            >
              {isAudioPlayerVisible ? <Pause className="w-5 h-5 text-[#B91C1C]" /> : <Play className="w-5 h-5 text-[#B91C1C]" />}
            </button>
          </div>
          {/* Audio Player (soft chant, muted by default) */}
          {isAudioPlayerVisible && (
            <audio autoPlay loop controls style={{display:'block',margin:'1rem auto 0'}}>
              <source src="/Shri Hanuman Chalisa.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        {/* Responsive temple-style divider for mobile */}
        <div className="block md:hidden w-full mt-12">
          <svg width="100%" height="32" viewBox="0 0 400 32" fill="none"><path d="M0 30 Q200 2 400 30" stroke="#FFD700" strokeWidth="6" fill="none"/></svg>
        </div>
      </section>

      {/* Dharma Granth Section redesign */}
      <section id="granths" className="py-16 relative overflow-visible" style={{background:'linear-gradient(135deg,#fffbe6 60%,#fffbe6 100%)'}}>
        <FloatingDivineSymbols />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-sanskrit text-3xl font-bold text-center mb-12 text-[hsl(var(--maroon))] drop-shadow-lg">
            {t.granths.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {granths.map((granth, index) => {
              let bgImg = '';
              if(granth.titleEn==='Bhagavad Gita') bgImg = "/bhagwat.jpeg";
              if(granth.titleEn==='Hanuman Chalisa') bgImg = "/chalisa.jpeg";
              if(granth.titleEn==='Ramcharitmanas') bgImg = "/Ramayanam.jpeg";
              return (
                <div key={index} className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-double border-[hsl(var(--gold))] transition-transform duration-300 hover:scale-105" style={{background:`center/cover no-repeat url('${bgImg}')`, minHeight:340}}>
                  {/* Saffron-gold gradient overlay */}
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#ff9800cc 0%,#ffd700bb 100%)',opacity:0.32,zIndex:1}} />
                  {/* Faint radial aura */}
                  <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 60% 40%,#fffbe6bb 0%,transparent 70%)',zIndex:2}} />
                  {/* Floating symbols inside card */}
                  <FloatingDivineSymbols />
                  {/* Mandala/lotus SVGs */}
                  <span className="absolute left-0 top-0 z-10"><svg width={32} height={32}><circle cx={16} cy={16} r={12} fill="none" stroke="#FFD700" strokeWidth={2} /><circle cx={16} cy={16} r={6} fill="none" stroke="#FFA500" strokeWidth={1} /></svg></span>
                  <span className="absolute right-0 top-0 z-10"><svg width={32} height={32}><circle cx={16} cy={16} r={12} fill="none" stroke="#FFD700" strokeWidth={2} /><circle cx={16} cy={16} r={6} fill="none" stroke="#FFA500" strokeWidth={1} /></svg></span>
                  <span className="absolute left-0 bottom-0 z-10"><svg width={32} height={32}><circle cx={16} cy={16} r={12} fill="none" stroke="#FFD700" strokeWidth={2} /><circle cx={16} cy={16} r={6} fill="none" stroke="#FFA500" strokeWidth={1} /></svg></span>
                  <span className="absolute right-0 bottom-0 z-10"><svg width={32} height={32}><circle cx={16} cy={16} r={12} fill="none" stroke="#FFD700" strokeWidth={2} /><circle cx={16} cy={16} r={6} fill="none" stroke="#FFA500" strokeWidth={1} /></svg></span>
                  <div className="relative flex flex-col items-center justify-center h-full py-8 px-4 z-20">
                    <span className="inline-block animate-pulse-sacred mb-2">
                      <BookOpen className="w-14 h-14 mx-auto text-[hsl(var(--saffron))] drop-shadow-lg" />
                    </span>
                    <CardTitle className="text-sanskrit text-2xl text-center tracking-wide drop-shadow-lg mb-2" style={{fontFamily:'Tiro Devanagari Sanskrit, serif',letterSpacing:'0.02em'}}>
                    {language === 'english' ? granth.titleEn : granth.title}
                  </CardTitle>
                    <p className="text-sm text-muted-foreground font-sanskrit tracking-wide mb-4" style={{fontWeight:500}}>{granth.description}</p>
                    <div className="flex gap-3 justify-center mt-2">
                      <Button size="sm" className="rounded-full border-2 border-[hsl(var(--gold))] bg-white/60 text-[hsl(var(--maroon))] shadow transition-all duration-200 hover:shadow-[0_0_16px_2px_hsl(var(--gold)/0.5)] hover:scale-110 focus:outline-none" style={{backdropFilter:'blur(2px)'}} onClick={() => handleRead(granth)}>
                        <BookOpenIcon className="w-5 h-5 mr-1" />
                        Read
                      </Button>
                      {/* PDF and Audio buttons, same style */}
                      {granth.titleEn === 'Bhagavad Gita' && (
                        <Button size="sm" className="rounded-full border-2 border-[hsl(var(--gold))] bg-white/60 text-[hsl(var(--maroon))] shadow transition-all duration-200 hover:shadow-[0_0_16px_2px_hsl(var(--gold)/0.5)] hover:scale-110 focus:outline-none" style={{backdropFilter:'blur(2px)'}} onClick={() => setShowDownloadModal({ open: true, granth })}>
                          <Download className="w-5 h-5 mr-1" />
                      PDF
                    </Button>
                      )}
                      {granth.titleEn === 'Ramcharitmanas' && (
                        <Button size="sm" className="rounded-full border-2 border-[hsl(var(--gold))] bg-white/60 text-[hsl(var(--maroon))] shadow transition-all duration-200 hover:shadow-[0_0_16px_2px_hsl(var(--gold)/0.5)] hover:scale-110 focus:outline-none" style={{backdropFilter:'blur(2px)'}} onClick={() => setShowDownloadModal({ open: true, granth })}>
                          <Download className="w-5 h-5 mr-1" />
                          PDF
                        </Button>
                      )}
                      {granth.titleEn === 'Hanuman Chalisa' && (
                        <Button size="sm" className="rounded-full border-2 border-[hsl(var(--gold))] bg-white/60 text-[hsl(var(--maroon))] shadow transition-all duration-200 hover:shadow-[0_0_16px_2px_hsl(var(--gold)/0.5)] hover:scale-110 focus:outline-none" style={{backdropFilter:'blur(2px)'}} onClick={() => setShowDownloadModal({ open: true, granth })}>
                          <Download className="w-5 h-5 mr-1" />
                          PDF
                        </Button>
                      )}
                      {/* Audio button for Hanuman Chalisa */}
                      {granth.titleEn === 'Hanuman Chalisa' ? (
                        <Button size="sm" className="rounded-full border-2 border-[hsl(var(--gold))] bg-white/60 text-[hsl(var(--maroon))] shadow transition-all duration-200 hover:shadow-[0_0_16px_2px_hsl(var(--gold)/0.5)] hover:scale-110 focus:outline-none" style={{backdropFilter:'blur(2px)'}} onClick={() => handleChalisaAudio(index)}>
                          {playingAudio === index ? (
                            <Pause className="w-5 h-5 mr-1" />
                          ) : (
                            <Play className="w-5 h-5 mr-1" />
                          )}
                          Audio
                        </Button>
                      ) : (
                    <Button 
                      size="sm" 
                          className="rounded-full border-2 border-[hsl(var(--gold))] bg-white/60 text-[hsl(var(--maroon))] shadow transition-all duration-200 hover:shadow-[0_0_16px_2px_hsl(var(--gold)/0.5)] hover:scale-110 focus:outline-none"
                          style={{backdropFilter:'blur(2px)'}}
                      onClick={() => setPlayingAudio(playingAudio === index ? null : index)}
                    >
                      {playingAudio === index ? (
                            <Pause className="w-5 h-5 mr-1" />
                      ) : (
                            <Play className="w-5 h-5 mr-1" />
                      )}
                      Audio
                    </Button>
                      )}
                  </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stories/Videos Section */}
      <section id="stories" className="py-16 container mx-auto px-4">
        <h2 className="text-sanskrit text-3xl font-bold text-center mb-12 text-[hsl(var(--maroon))]">
          {t.videos.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {videos.map((video, index) => (
            <Card key={index} className="card-sacred">
              <CardContent className="p-6 text-center">
                <Video className="w-16 h-16 mx-auto mb-4 text-[hsl(var(--saffron))]" />
                <h3 className="font-semibold mb-2">
                  {language === 'english' ? video.titleEn : video.title}
                </h3>
                <Button className="btn-maroon">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Progress Section */}
      <section id="progress" className="py-16 bg-gradient-to-br from-[hsl(var(--cream-dark))] to-[hsl(var(--cream))]">
        <div className="container mx-auto px-4">
          <h2 className="text-sanskrit text-3xl font-bold text-center mb-12 text-[hsl(var(--maroon))]">
            {t.progress.title}
          </h2>

          {/* Donation Progress & Achievements Section (restored) */}
          <Card className="card-sacred max-w-3xl mx-auto mb-8">
            <CardContent className="p-6">
              {(() => {
                const totalDonation = donors.reduce((sum, d) => sum + (d.amount || 0), 0);
                const target = 500000;
                const percent = Math.min(100, Math.round((totalDonation / target) * 100));
                return (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div className="text-lg font-semibold text-[hsl(var(--maroon))]">
                        {t.progress.raised}{totalDonation.toLocaleString()}
                      </div>
                      <div className="text-lg font-semibold text-[hsl(var(--gold))]">
                        {t.progress.target}
                      </div>
                      <div className="text-lg font-semibold text-[hsl(var(--saffron))]">
                        {t.progress.remaining}{(target-totalDonation).toLocaleString()}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6 mb-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[hsl(var(--saffron))] to-[hsl(var(--gold))] h-6 rounded-full flex items-center justify-end pr-2 text-white font-bold text-sm transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      >
                        {percent}%
                      </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      {t.progress.percentage} {percent}%
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {/* Construction Progress Carousel (remains here) */}
          <div className="max-w-4xl mx-auto">
            <Card className="card-sacred">
              <CardContent className="p-6">
                <div className="relative">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={prevSlide} size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="text-center">
                      <h3 className="font-semibold">
                        {language === 'english' ? progress[currentSlide]?.captionEn : progress[currentSlide]?.caption}
                      </h3>
                      <p className="text-sm text-muted-foreground">{progress[currentSlide]?.date}</p>
                    </div>
                    <Button variant="outline" onClick={nextSlide} size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-center mt-4 gap-2">
                    {progress.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentSlide ? 'bg-[hsl(var(--saffron))]' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 container mx-auto px-4">
        <h2 className="text-sanskrit text-3xl font-bold text-center mb-12 text-[hsl(var(--maroon))]">
          {t.contact.title}
        </h2>
        <Card className="card-sacred max-w-2xl mx-auto">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[hsl(var(--saffron))]" />
              <div>
                <h3 className="font-semibold">{t.contact.address}</h3>
                <p className="text-sm text-muted-foreground">
                  Dhanhara, Tole Rampur, Aurangabad, Bihar, 824121, India
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[hsl(var(--saffron))]" />
              <div>
                <h3 className="font-semibold">{t.contact.phone}</h3>
                <p className="text-sm text-muted-foreground">8102369869</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[hsl(var(--saffron))]" />
              <div>
                <h3 className="font-semibold">{t.contact.email}</h3>
                <p className="text-sm text-muted-foreground">shreehanumanmandir@gmail.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[hsl(var(--maroon-dark))] to-[hsl(var(--maroon))] text-[hsl(var(--gold))] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sanskrit text-lg font-semibold">
            {t.footer}
          </p>
          <div className="mt-4 text-sm opacity-75">
            © 2024 श्री हनुमान मंदिर - All Rights Reserved
          </div>
        </div>
      </footer>

      <Dialog open={showReadModal.open} onOpenChange={open => setShowReadModal({ open, granth: showReadModal.granth })}>
        <DialogContent className="max-w-xs w-full p-6">
          <DialogHeader>
            <DialogTitle>Select Language</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <Button variant="outline" onClick={() => handleReadLanguage('english')}>English</Button>
            <Button variant="outline" onClick={() => handleReadLanguage('hindi')}>Hindi</Button>
          </div>
        </DialogContent>
      </Dialog>
      {bookViewer.open && (
        <SpiritualBookViewer
          open={bookViewer.open}
          file={bookViewer.file}
          title={bookViewer.title}
          onClose={() => setBookViewer({ open: false, file: '', title: '' })}
        />
      )}
      <FixedAudioPlayer 
        isVisible={isAudioPlayerVisible}
        onClose={() => {
          setIsAudioPlayerVisible(false);
          setPlayingAudio(null);
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }}
        audioRef={audioRef}
        audioPlaying={audioPlaying}
        setAudioPlaying={setAudioPlaying}
      />
      <DownloadLanguageModal open={showDownloadModal.open} onClose={() => setShowDownloadModal({ open: false, granth: null })} granth={showDownloadModal.granth} />
      {/* Hanuman ji image sitting on the top right border of the screen */}
      <img
        src="/hanu.png"
        alt="Hanuman ji"
        className="fixed -top-4 right-2 z-50 w-20 h-20 md:w-32 md:h-32 pointer-events-none select-none"
        style={{
          objectFit: 'contain',
          background: 'transparent',
          borderRadius: '50%',
          filter: 'drop-shadow(0 4px 16px #FFD70088) drop-shadow(0 0 8px #FF6F00AA)',
        }}
        draggable="false"
      />
    </div>
  );
}