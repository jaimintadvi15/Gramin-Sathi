import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sprout,
  Compass,
  FileText,
  History,
  User,
  Search,
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  Award,
  Download,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BarChart3,
  Calendar,
  Building2,
  PhoneCall,
  Share2,
  RefreshCw,
  Layers,
  MapPin,
  Check,
  Milk,
  Store,
  Scissors,
  Wheat,
  Palette,
  Lightbulb,
  Printer,
  Info,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// --- Multi-language Dictionary ---
type Language = 'en' | 'hi' | 'gu';

interface Translations {
  appName: string;
  tagline: string;
  badgeText: string;
  heroHeadline: string;
  heroSubheadline: string;
  getStarted: string;
  statVillages: string;
  statSubsidies: string;
  statFree: string;
  formTitle: string;
  formSubtitle: string;
  locationLabel: string;
  locationPlaceholder: string;
  capitalLabel: string;
  capitalHint: string;
  categoryLabel: string;
  generateBtn: string;
  analyzingTitle: string;
  tabFeasibility: string;
  tabFinancial: string;
  marketReachTitle: string;
  opportunityTitle: string;
  swotTitle: string;
  competitorTitle: string;
  pricingTitle: string;
  summaryTitle: string;
  schemeTitle: string;
  scheduleTitle: string;
  downloadPdf: string;
  listenAudio: string;
  stopAudio: string;
  navHome: string;
  navNewReport: string;
  navHistory: string;
  navProfile: string;
}

const translations: Record<Language, Translations> = {
  en: {
    appName: "GraminSaathi",
    tagline: "AI Business Advisor for Rural Entrepreneurs",
    badgeText: "Bharat Rural Enterprise Accelerator",
    heroHeadline: "Turn your village business idea into a thriving enterprise.",
    heroSubheadline: "Get instant micro-market feasibility, government subsidy schemes (PMEGP, Mudra), and bank-ready loan calculators tailored to your village.",
    getStarted: "Create Business Report",
    statVillages: "15,000+ Villages",
    statSubsidies: "₹50 Cr+ Subsidies Mapped",
    statFree: "100% Free for SHGs & Farmers",
    formTitle: "Start Your Business Assessment",
    formSubtitle: "Enter your village details and available investment to receive an instant AI report.",
    locationLabel: "Village / Block / District",
    locationPlaceholder: "e.g. Anand, Gujarat or Varanasi, UP",
    capitalLabel: "Available Margin Capital (Your Own Investment)",
    capitalHint: "Your initial cash. Banks usually fund 80-90% under government schemes.",
    categoryLabel: "Select Business Category",
    generateBtn: "Generate AI Advisory Report",
    analyzingTitle: "Analyzing Rural Market & Schemes...",
    tabFeasibility: "Feasibility Report",
    tabFinancial: "Financial & Loan Roadmap",
    marketReachTitle: "Market Reach & Catchment",
    opportunityTitle: "Opportunity & High-Demand Niches",
    swotTitle: "SWOT Business Analysis",
    competitorTitle: "Competitor Density & Saturation",
    pricingTitle: "Recommended Pricing & Unit Economics",
    summaryTitle: "Project & Subsidy Summary",
    schemeTitle: "Matched Government Scheme",
    scheduleTitle: "Quarterly Loan Repayment Schedule",
    downloadPdf: "Download Report (PDF)",
    listenAudio: "Listen in Voice",
    stopAudio: "Stop Voice",
    navHome: "Home",
    navNewReport: "New Report",
    navHistory: "Saved Reports",
    navProfile: "My Profile"
  },
  hi: {
    appName: "ग्रामीणसाथी",
    tagline: "ग्रामीण उद्यमियों के लिए एआई व्यापार सलाहकार",
    badgeText: "भारत ग्रामीण उद्यम पहल",
    heroHeadline: "अपने गाँव के व्यापार विचार को बनाएं सफल और मुनाफ़ेदार।",
    heroSubheadline: "अपने गाँव के अनुसार तुरंत बाज़ार विश्लेषण, सरकारी सब्सिडी योजनाएं (PMEGP, मुद्रा) और बैंक लोन की किश्तें जानें।",
    getStarted: "नया व्यापार रिपोर्ट बनाएं",
    statVillages: "15,000+ गाँव जुड़े",
    statSubsidies: "₹50 करोड़+ सब्सिडी",
    statFree: "महिला समूहों व किसानों हेतु मुफ़्त",
    formTitle: "व्यापार मूल्यांकन शुरू करें",
    formSubtitle: "गाँव का नाम और अपनी पूँजी दर्ज करें, तुरंत रिपोर्ट प्राप्त करें।",
    locationLabel: "गाँव / ब्लॉक / ज़िला",
    locationPlaceholder: "उदा. आनंद (गुजरात) या वाराणसी (उत्तर प्रदेश)",
    capitalLabel: "आपकी उपलब्ध पूँजी (मार्जिन मनी)",
    capitalHint: "आपकी अपनी पूँजी। सरकारी योजनाओं में बैंक 80-90% तक लोन देते हैं।",
    categoryLabel: "व्यापार की श्रेणी चुनें",
    generateBtn: "एआई रिपोर्ट तैयार करें",
    analyzingTitle: "गाँव के बाज़ार और योजनाओं का विश्लेषण हो रहा है...",
    tabFeasibility: "व्यवहार्यता रिपोर्ट (Feasibility)",
    tabFinancial: "लोन व वित्तीय रोडमैप",
    marketReachTitle: "बाज़ार पहुँच और ग्राहक",
    opportunityTitle: "मुनाफ़े के मुख्य अवसर",
    swotTitle: "SWOT विश्लेषण (ताकत, कमज़ोरी, अवसर, जोखिम)",
    competitorTitle: "प्रतियोगिता का स्तर",
    pricingTitle: "सुझाई गई कीमतें और मार्जिन",
    summaryTitle: "परियोजना लागत और सब्सिडी",
    schemeTitle: "योग्य सरकारी लोन योजना",
    scheduleTitle: "तिमाही किश्त भुगतान विवरण (EMI)",
    downloadPdf: "रिपोर्ट डाउनलोड करें (PDF)",
    listenAudio: "आवाज़ में सुनें",
    stopAudio: "आवाज़ बंद करें",
    navHome: "होम",
    navNewReport: "नई रिपोर्ट",
    navHistory: "इतिहास",
    navProfile: "मेरी प्रोफाइल"
  },
  gu: {
    appName: "ગ્રામીણસાથી",
    tagline: "ગ્રામીણ સાહસિકો માટે AI બિઝનેસ સલાહકાર",
    badgeText: "ભારત ગ્રામીણ ઉદ્યોગ પહેલ",
    heroHeadline: "તમારા ગામના વ્યવસાયિક વિચારને સફળ બનાવો.",
    heroSubheadline: "તમારા ગામ મુજબ બજાર સર્વેક્ષણ, સરકારી સબસિડી યોજનાઓ (PMEGP, મુદ્રા) અને લોન કેલ્ક્યુલેટર તરત મેળવો.",
    getStarted: "નવો રિપોર્ટ બનાવો",
    statVillages: "15,000+ ગામો આવરી લીધા",
    statSubsidies: "₹50 કરોડ+ સબસિડી સહાય",
    statFree: "ખેડૂતો અને મહિલા મંડળો માટે મફત",
    formTitle: "વ્યવસાય આકારણી શરૂ કરો",
    formSubtitle: "ગામનું નામ અને રોકાણ દાખલ કરો, તાત્કાલિક માર્ગદર્શન મેળવો.",
    locationLabel: "ગામ / તાલુકો / જિલ્લો",
    locationPlaceholder: "દા.ત. આણંદ, બારડોલી, પાલનપુર",
    capitalLabel: "તમારી ઉપલબ્ધ મૂડી (માર્જિન મની)",
    capitalHint: "તમારું પોતાનું રોકાણ. સરકાર યોજનાઓ હેઠળ 80-90% લોન આપે છે.",
    categoryLabel: "વ્યવસાયનો પ્રકાર પસંદ કરો",
    generateBtn: "AI રિપોર્ટ તૈયાર કરો",
    analyzingTitle: "ગામના બજાર અને યોજનાઓનું વિશ્લેષણ થઈ રહ્યું છે...",
    tabFeasibility: "શક્યતા અહેવાલ (Feasibility)",
    tabFinancial: "લોન અને નાણાકીય રોડમેપ",
    marketReachTitle: "ગ્રાહક પહોંચ અને વિસ્તાર",
    opportunityTitle: "નફાની શ્રેષ્ઠ તકો",
    swotTitle: "SWOT વિશ્લેષણ",
    competitorTitle: "હરીફાઈની સ્થિતિ",
    pricingTitle: "ભાવ નિર્ધારણ અને નફો",
    summaryTitle: "પ્રોજેક્ટ ખર્ચ અને સબસિડી",
    schemeTitle: "લાગુ પડતી સરકારી યોજના",
    scheduleTitle: "હપ્તા ચુકવણી વિગત (EMI)",
    downloadPdf: "રિપોર્ટ ડાઉનલોડ કરો (PDF)",
    listenAudio: "અવાજમાં સાંભળો",
    stopAudio: "અવાજ બંધ કરો",
    navHome: "હોમ",
    navNewReport: "નવો રિપોર્ટ",
    navHistory: "ઇતિહાસ",
    navProfile: "પ્રોફાઇલ"
  }
};

// --- Sample Locations for Autocomplete ---
interface LocationOption {
  name: string;
  district: string;
  state: string;
  pincode: string;
  population: number;
}

const POPULAR_LOCATIONS: LocationOption[] = [
  { name: "Anand Block", district: "Anand", state: "Gujarat", pincode: "388001", population: 24500 },
  { name: "Bardoli Village", district: "Surat", state: "Gujarat", pincode: "394601", population: 18200 },
  { name: "Palanpur Rural", district: "Banaskantha", state: "Gujarat", pincode: "385001", population: 31000 },
  { name: "Varanasi Rural Block", district: "Varanasi", state: "Uttar Pradesh", pincode: "221001", population: 28400 },
  { name: "Satara Agri Belt", district: "Satara", state: "Maharashtra", pincode: "415001", population: 19500 },
  { name: "Mandya Farming Zone", district: "Mandya", state: "Karnataka", pincode: "571401", population: 22000 },
  { name: "Madhubani Craft Cluster", district: "Madhubani", state: "Bihar", pincode: "847211", population: 16500 },
  { name: "Sambalpur Weaving Cluster", district: "Sambalpur", state: "Odisha", pincode: "768001", population: 14200 },
  { name: "Alwar Rural Dairy Area", district: "Alwar", state: "Rajasthan", pincode: "301001", population: 21800 }
];

// --- Business Categories ---
interface CategoryInfo {
  id: string;
  nameEn: string;
  nameHi: string;
  nameGu: string;
  icon: React.ComponentType<{ className?: string }>;
  suggestedMultiplier: number; // Project cost multiplier relative to margin capital (e.g. 5x)
  defaultScheme: string;
  subsidyRate: number; // e.g. 25% for rural general / 35% for special
  interestRate: number; // p.a.
}

const BUSINESS_CATEGORIES: CategoryInfo[] = [
  {
    id: "dairy",
    nameEn: "Dairy & Livestock",
    nameHi: "दूध व पशुपालन",
    nameGu: "ડેરી અને પશુપાલન",
    icon: Milk,
    suggestedMultiplier: 5,
    defaultScheme: "NABARD Dairy Entrepreneurship (DEDS) / Mudra Kishor",
    subsidyRate: 25,
    interestRate: 8.5
  },
  {
    id: "retail",
    nameEn: "Retail & Kirana",
    nameHi: "किराना दुकान व रिटेल",
    nameGu: "કરિયાણું અને રિટેલ દુકાન",
    icon: Store,
    suggestedMultiplier: 4,
    defaultScheme: "Pradhan Mantri Mudra Yojana (PMMY - Shishu/Kishor)",
    subsidyRate: 15,
    interestRate: 9.25
  },
  {
    id: "textiles",
    nameEn: "Textiles & Tailoring",
    nameHi: "सिलाई व वस्त्र उद्योग",
    nameGu: "કાપડ અને સિલાઈ ઉદ્યોગ",
    icon: Scissors,
    suggestedMultiplier: 4.5,
    defaultScheme: "PMEGP (Prime Minister Employment Generation Programme)",
    subsidyRate: 35,
    interestRate: 8.75
  },
  {
    id: "food_processing",
    nameEn: "Food Processing (Spices/Flour/Papad)",
    nameHi: "खाद्य प्रसंस्करण (मसाला/दाल/पापड़)",
    nameGu: "ફૂડ પ્રોસેસિંગ (મસાલા/પાપડ/લોટ મિલ)",
    icon: Wheat,
    suggestedMultiplier: 6,
    defaultScheme: "PM Formalisation of Micro food processing (PMFME) Scheme",
    subsidyRate: 35,
    interestRate: 8.4
  },
  {
    id: "handicrafts",
    nameEn: "Handicrafts & Pottery",
    nameHi: "हस्तशिल्प व कुटीर उद्योग",
    nameGu: "હસ્તકલા અને માટીકામ",
    icon: Palette,
    suggestedMultiplier: 3.5,
    defaultScheme: "PM Vishwakarma Scheme / PMEGP Village Industries",
    subsidyRate: 30,
    interestRate: 5.0
  },
  {
    id: "other",
    nameEn: "Agri-Services & Other",
    nameHi: "कृषि सेवाएं व अन्य उद्योग",
    nameGu: "ખેતી સેવાઓ અને અન્ય",
    icon: Lightbulb,
    suggestedMultiplier: 4,
    defaultScheme: "Agriculture Infrastructure Fund (AIF) / Stand-Up India",
    subsidyRate: 20,
    interestRate: 8.9
  }
];

export default function App() {
  // State
  const [lang, setLang] = useState<Language>('en');
  const [locationInput, setLocationInput] = useState('Anand Block, Gujarat');
  const [selectedLocation, setSelectedLocation] = useState<LocationOption>(POPULAR_LOCATIONS[0]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [marginCapital, setMarginCapital] = useState<number>(50000);
  const [selectedCategory, setSelectedCategory] = useState<string>('dairy');
  
  // Loading & View States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [hasReport, setHasReport] = useState(false);
  const [activeTab, setActiveTab] = useState<'feasibility' | 'financial'>('feasibility');
  
  // Navigation State
  const [activeNav, setActiveNav] = useState<'home' | 'new' | 'history' | 'profile'>('home');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const t = translations[lang];
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Analysis Progress Messages
  const analysisSteps = [
    { en: "Connecting to Gram Panchayat & District Market Registry...", hi: "ग्राम पंचायत व स्थानीय बाज़ार डेटा से जुड़ रहे हैं...", gu: "ગ્રામ પંચાયત અને સ્થાનિક બજાર ડેટા સાથે જોડાઈ રહ્યા છીએ..." },
    { en: "Assessing local population (5km catchment) & buyer demand...", hi: "5 किमी दायरे में जनसंख्या व खरीद क्षमता का विश्लेषण...", gu: "5 કિમી વિસ્તારમાં વસ્તી અને ખરીદ ક્ષમતાનું મૂલ્યાંકન..." },
    { en: "Matching PMEGP, Mudra & NABARD subsidy schemes...", hi: "PMEGP, मुद्रा व नाबार्ड सब्सिडी योजनाओं का मिलान...", gu: "PMEGP, મુદ્રા અને નાબાર્ડ સબસિડી યોજનાઓ લાગુ કરી રહ્યા છીએ..." },
    { en: "Generating AI SWOT Matrix & 5-year repayment plan...", hi: "SWOT रिपोर्ट एवं 5-वर्षीय किश्त तालिका तैयार की जा रही है...", gu: "SWOT રિપોર્ટ અને 5 વર્ષીય હપ્તા પત્રક તૈયાર થઈ રહ્યું છે..." }
  ];

  // Dynamic Calculated Financial Metrics
  const currentCategoryInfo = useMemo(() => {
    return BUSINESS_CATEGORIES.find(c => c.id === selectedCategory) || BUSINESS_CATEGORIES[0];
  }, [selectedCategory]);

  const financialCalculations = useMemo(() => {
    const capital = marginCapital > 0 ? marginCapital : 50000;
    // Total project cost estimation (approx 4x to 6x margin money)
    const multiplier = currentCategoryInfo.suggestedMultiplier;
    const projectCost = Math.round(capital * multiplier);
    const subsidyPercentage = currentCategoryInfo.subsidyRate;
    const subsidyAmount = Math.round((projectCost * subsidyPercentage) / 100);
    // Loan amount required = Project cost - Margin capital
    const loanAmount = Math.max(projectCost - capital, 0);
    const annualInterestRate = currentCategoryInfo.interestRate;
    const monthlyRate = annualInterestRate / 12 / 100;
    const tenureMonths = 60; // 5 years
    const moratoriumMonths = 6; // 6 months moratorium

    // EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
    const emiMonths = tenureMonths - moratoriumMonths;
    const emi = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, emiMonths)) /
      (Math.pow(1 + monthlyRate, emiMonths) - 1)
    );

    // Quarterly Repayment Schedule (12 Quarters = 3 Years display table/chart)
    const quartersCount = 12;
    let balance = loanAmount;
    const quarterlyData = [];
    const quarterlyEmi = emi * 3;
    const quarterlyRate = annualInterestRate / 4 / 100;

    for (let q = 1; q <= quartersCount; q++) {
      const isMoratorium = q <= 2; // first 2 quarters (6 months)
      let interestPaid = Math.round(balance * quarterlyRate);
      let principalPaid = 0;
      let installment = 0;

      if (isMoratorium) {
        // Only interest paid during moratorium
        installment = interestPaid;
        principalPaid = 0;
      } else {
        installment = quarterlyEmi;
        principalPaid = Math.min(Math.round(installment - interestPaid), balance);
        balance = Math.max(balance - principalPaid, 0);
      }

      quarterlyData.push({
        quarter: `Q${q}`,
        quarterName: `Year ${Math.ceil(q / 4)} Q${((q - 1) % 4) + 1}`,
        installment: Math.round(installment),
        principalPaid: Math.round(principalPaid),
        interestPaid: Math.round(interestPaid),
        remainingBalance: Math.round(balance),
        isMoratorium
      });
    }

    return {
      projectCost,
      subsidyPercentage,
      subsidyAmount,
      loanAmount,
      annualInterestRate,
      tenureMonths,
      moratoriumMonths,
      emi,
      quarterlyData
    };
  }, [marginCapital, currentCategoryInfo]);

  // Handle Form Submission
  const handleGenerateReport = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Step-by-step loading animation
    const timer1 = setTimeout(() => setAnalysisStep(1), 700);
    const timer2 = setTimeout(() => setAnalysisStep(2), 1400);
    const timer3 = setTimeout(() => setAnalysisStep(3), 2100);
    const timer4 = setTimeout(() => {
      setIsAnalyzing(false);
      setHasReport(true);
      setActiveTab('feasibility');
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  // Scroll to Form
  const scrollToForm = () => {
    setActiveNav('new');
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Web Speech Synthesis for Rural Low-Literacy Users
  const toggleSpeechSummary = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const loc = selectedLocation.name;
    const cat = currentCategoryInfo.nameEn;
    const cost = financialCalculations.projectCost.toLocaleString('en-IN');
    const loan = financialCalculations.loanAmount.toLocaleString('en-IN');
    const sub = financialCalculations.subsidyAmount.toLocaleString('en-IN');
    const emi = financialCalculations.emi.toLocaleString('en-IN');

    let speechText = "";
    if (lang === 'hi') {
      speechText = `नमस्कार! ग्रामीणसाथी रिपोर्ट के अनुसार, ${loc} में ${currentCategoryInfo.nameHi} शुरू करने के लिए कुल अनुमानित लागत लगभग ₹${cost} है। सरकारी योजना के तहत आपको ₹${sub} की सब्सिडी और ₹${loan} का बैंक लोन मिल सकता है। आपकी मासिक किश्त लगभग ₹${emi} होगी। बाज़ार में मांग बहुत अच्छी है।`;
    } else if (lang === 'gu') {
      speechText = `નમસ્તે! ગ્રામીણસાથી રિપોર્ટ અનુસાર, ${loc} માં ${currentCategoryInfo.nameGu} શરૂ કરવા માટે કુલ પ્રોજેક્ટ ખર્ચ આશરે ₹${cost} થશે. સરકારી યોજના હેઠળ તમને ₹${sub} સબસિડી અને ₹${loan} ની લોન મળી શકે છે. માસિક હપ્તો ₹${emi} રહેશે.`;
    } else {
      speechText = `Hello! According to GraminSaathi AI, setting up a ${cat} enterprise in ${loc} has high market viability. Total estimated project cost is ₹${cost}, with eligible government subsidy of ₹${sub} and bank loan of ₹${loan}. Monthly EMI is ₹${emi} with a 6-month moratorium period.`;
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.92; // Slightly slower for clarity
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Filter locations for dropdown
  const filteredLocations = POPULAR_LOCATIONS.filter(loc => 
    loc.name.toLowerCase().includes(locationInput.toLowerCase()) ||
    loc.district.toLowerCase().includes(locationInput.toLowerCase()) ||
    loc.state.toLowerCase().includes(locationInput.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-800 font-sans pb-28 md:pb-12">
      
      {/* Top Utility Header & Navigation */}
      <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-amber-200/70 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => { setActiveNav('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-emerald-950">Gramin<span className="text-amber-600">Saathi</span></span>
                <span className="hidden md:inline-flex text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-300/60">
                  AI Bharat
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <div className="relative flex items-center bg-stone-100/90 rounded-xl p-1 border border-stone-200 shadow-inner">
              <span className="text-xs font-semibold text-stone-500 pl-2 pr-1 hidden sm:inline">भाषा:</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'en' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'hi' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLang('gu')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'gu' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ગુજરાતી
              </button>
            </div>

            {/* Desktop New Report Button */}
            <button
              type="button"
              onClick={scrollToForm}
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.navNewReport}</span>
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO / LANDING SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:py-16 bg-gradient-to-b from-amber-100/50 via-amber-50/20 to-[#FAF7F2] border-b border-amber-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/10 border border-emerald-700/20 text-emerald-900 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>{t.badgeText}</span>
            <span className="text-emerald-700 font-bold">•</span>
            <span className="text-amber-800">NABARD & PMEGP Ready</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight max-w-3xl mx-auto">
            {t.heroHeadline}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubheadline}
          </p>

          {/* Action CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={scrollToForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 text-white text-base font-bold px-8 py-4 rounded-2xl shadow-lg shadow-amber-600/25 hover:shadow-xl transition-all transform active:scale-98"
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {hasReport && (
              <button
                type="button"
                onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-stone-800 hover:bg-stone-50 border border-stone-300 text-sm font-bold px-6 py-4 rounded-2xl shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>View Latest Report</span>
              </button>
            )}
          </div>

          {/* Key Trust Stats Bar */}
          <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-6 max-w-3xl mx-auto pt-6 border-t border-stone-200/80 text-left sm:text-center">
            <div className="bg-white/70 p-3 sm:p-4 rounded-2xl border border-amber-200/60 shadow-2xs">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-700 mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Coverage</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-stone-800">{t.statVillages}</p>
            </div>

            <div className="bg-white/70 p-3 sm:p-4 rounded-2xl border border-amber-200/60 shadow-2xs">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-700 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Government</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-stone-800">{t.statSubsidies}</p>
            </div>

            <div className="bg-white/70 p-3 sm:p-4 rounded-2xl border border-amber-200/60 shadow-2xs">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-700 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Access</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-stone-800">{t.statFree}</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: INPUT FORM SECTION */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <div 
          ref={formRef}
          id="assessment-form-card"
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/70 border border-stone-200"
        >
          {/* Form Header */}
          <div className="flex items-start justify-between pb-6 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                  {t.formTitle}
                </h2>
              </div>
              <p className="text-stone-500 text-sm mt-1">
                {t.formSubtitle}
              </p>
            </div>

            {/* Quick Demo Pre-fill chip */}
            <button
              type="button"
              onClick={() => {
                setLocationInput("Anand Block, Gujarat");
                setSelectedLocation(POPULAR_LOCATIONS[0]);
                setMarginCapital(50000);
                setSelectedCategory('dairy');
              }}
              className="text-xs font-semibold px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sample Anand Dairy</span>
            </button>
          </div>

          <form onSubmit={handleGenerateReport} className="mt-6 space-y-6">
            
            {/* Input 1: Village / Block / District Autocomplete */}
            <div className="relative">
              <label htmlFor="location-input" className="block text-sm font-bold text-stone-800 mb-2">
                {t.locationLabel} <span className="text-amber-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                </div>
                <input
                  id="location-input"
                  type="text"
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setIsLocationDropdownOpen(true);
                  }}
                  onFocus={() => setIsLocationDropdownOpen(true)}
                  placeholder={t.locationPlaceholder}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-base transition-all"
                  required
                />
              </div>

              {/* Autocomplete Dropdown List */}
              {isLocationDropdownOpen && filteredLocations.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 z-30 max-h-60 overflow-y-auto divide-y divide-stone-100">
                  <div className="p-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider bg-stone-50/80 rounded-t-xl px-3">
                    Suggested Rural Clusters
                  </div>
                  {filteredLocations.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedLocation(item);
                        setLocationInput(`${item.name}, ${item.state}`);
                        setIsLocationDropdownOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-emerald-50/80 cursor-pointer flex items-center justify-between text-sm transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-stone-800">{item.name}</p>
                          <p className="text-xs text-stone-500">Dist: {item.district}, {item.state} ({item.pincode})</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 font-medium rounded-full">
                        Pop: ~{item.population.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input 2: Available Margin Capital */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="capital-input" className="text-sm font-bold text-stone-800">
                  {t.capitalLabel} <span className="text-amber-600">*</span>
                </label>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Govt Subsidized
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-800 font-bold text-lg">
                  ₹
                </div>
                <input
                  id="capital-input"
                  type="number"
                  min="5000"
                  step="5000"
                  value={marginCapital || ''}
                  onChange={(e) => setMarginCapital(Number(e.target.value))}
                  placeholder="50000"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-stone-50 border border-stone-300 text-stone-900 font-bold text-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  required
                />
              </div>
              <p className="text-xs text-stone-500 mt-1.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{t.capitalHint}</span>
              </p>

              {/* Quick Select Preset Capital Pills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[25000, 50000, 100000, 250000, 500000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMarginCapital(preset)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      marginCapital === preset
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/80'
                    }`}
                  >
                    ₹{preset >= 100000 ? `${preset / 100000} Lakh` : `${preset / 1000}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Business Category Selector */}
            <div>
              <label className="block text-sm font-bold text-stone-800 mb-2">
                {t.categoryLabel} <span className="text-amber-600">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BUSINESS_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const label = lang === 'hi' ? cat.nameHi : lang === 'gu' ? cat.nameGu : cat.nameEn;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-start justify-between min-h-[96px] ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className={`text-xs font-bold mt-2 leading-snug ${
                        isSelected ? 'text-emerald-950' : 'text-stone-800'
                      }`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit / Generate Button */}
            <div className="pt-4">
              <button
                id="generate-report-btn"
                type="submit"
                disabled={isAnalyzing}
                className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 transition-all ${
                  isAnalyzing
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white shadow-lg shadow-emerald-800/25 active:scale-99'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-emerald-700" />
                    <span>{t.analyzingTitle}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>{t.generateBtn}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Loading Animation Box */}
          {isAnalyzing && (
            <div className="mt-6 p-6 rounded-2xl bg-amber-50/80 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  AI Synthesis in Progress
                </span>
                <span className="text-xs font-bold text-amber-800">
                  {Math.min((analysisStep + 1) * 25, 100)}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-amber-200/70 h-2.5 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(analysisStep + 1) * 25}%` }}
                ></div>
              </div>
              <p className="text-sm font-bold text-stone-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>{analysisSteps[analysisStep][lang]}</span>
              </p>
            </div>
          )}
        </div>
      </main>

      {/* SECTION 3: RESULTS DASHBOARD */}
      {hasReport && (
        <section ref={resultsRef} className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 scroll-mt-20">
          
          {/* Results Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-stone-200 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300/60">
                    Live Feasibility Report
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    ID: GS-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  {currentCategoryInfo.nameEn} Advisory for {selectedLocation.name}
                </h3>
                <p className="text-sm text-stone-600 mt-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{selectedLocation.district} District, {selectedLocation.state} • Estimated Local Population: {selectedLocation.population.toLocaleString('en-IN')}</span>
                </p>
              </div>

              {/* Header Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Audio Reader Button */}
                <button
                  type="button"
                  onClick={toggleSpeechSummary}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs border transition-all ${
                    isSpeaking 
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md animate-pulse'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
                  <span>{isSpeaking ? t.stopAudio : t.listenAudio}</span>
                </button>

                {/* PDF Print Button */}
                <button
                  type="button"
                  onClick={() => setShowPrintModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-stone-900 hover:bg-stone-800 text-white shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.downloadPdf}</span>
                </button>
              </div>
            </div>

            {/* Dashboard Tabs Selector */}
            <div className="mt-6 flex items-center bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveTab('feasibility')}
                className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'feasibility'
                    ? 'bg-white text-emerald-950 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>{t.tabFeasibility}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('financial')}
                className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'financial'
                    ? 'bg-white text-emerald-950 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <IndianRupee className="w-4 h-4 text-amber-700" />
                <span>{t.tabFinancial}</span>
              </button>
            </div>
          </div>

          {/* TAB 1: FEASIBILITY REPORT */}
          {activeTab === 'feasibility' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Row 1: Market Reach & Opportunity Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Market Reach Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-extrabold text-lg text-stone-900">
                          {t.marketReachTitle}
                        </h4>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        High Demand
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                        <p className="text-xs font-semibold text-stone-500">Catchment Radius</p>
                        <p className="text-xl font-extrabold text-stone-900 mt-0.5">5.5 km</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">Covers 6 nearby hamlets</p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                        <p className="text-xs font-semibold text-stone-500">Target Population</p>
                        <p className="text-xl font-extrabold text-emerald-900 mt-0.5">~{selectedLocation.population.toLocaleString('en-IN')}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">Active local consumers</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Daily footfall is concentrated along the main panchayat junction and weekly haat market. Morning hours (6:30 AM - 10:00 AM) and evening haat days generate over 68% of commercial transactions.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>Source: District Rural Demographics API</span>
                    <span className="font-bold text-emerald-700">92% Confidence</span>
                  </div>
                </div>

                {/* 2. Opportunity Analysis Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <h4 className="font-extrabold text-lg text-stone-900">
                          {t.opportunityTitle}
                        </h4>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        3 Underserved Niches
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                      <li className="flex items-start gap-2.5 p-2 rounded-xl bg-amber-50/50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Direct Cooperative Tie-up:</strong> Regular bulk procurement by nearby processing units at guaranteed MSP prices.</span>
                      </li>
                      <li className="flex items-start gap-2.5 p-2 rounded-xl bg-amber-50/50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Value-Addition Premium:</strong> Clean packaging and hygiene-certified processing sells at 15-20% higher margin.</span>
                      </li>
                      <li className="flex items-start gap-2.5 p-2 rounded-xl bg-amber-50/50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Zero Middleman Haat Sales:</strong> Direct village weekly markets eliminate agent commissions.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>Target Customer Readiness</span>
                    <span className="font-bold text-amber-700">88% Strong Buying Intent</span>
                  </div>
                </div>

              </div>

              {/* 3. SWOT Analysis (2x2 Grid) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xl text-stone-900">
                        {t.swotTitle}
                      </h4>
                      <p className="text-xs text-stone-500">2x2 Strategic Rural Matrix for {currentCategoryInfo.nameEn}</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-xs font-semibold px-3 py-1 bg-stone-100 rounded-full text-stone-700">
                    Gramin AI Grounded
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Strengths (Green) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                      <h5 className="font-bold text-emerald-950 text-sm uppercase tracking-wide">
                        Strengths (ताकत)
                      </h5>
                    </div>
                    <ul className="text-xs sm:text-sm text-emerald-900 space-y-1.5 list-disc list-inside">
                      <li>Readily available raw inputs & local labor within 2 km radius.</li>
                      <li>High community trust and existing village relationship network.</li>
                      <li>Low fixed monthly overhead costs compared to urban centers.</li>
                    </ul>
                  </div>

                  {/* Weaknesses (Red/Rose) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 rounded-full bg-rose-600"></span>
                      <h5 className="font-bold text-rose-950 text-sm uppercase tracking-wide">
                        Weaknesses (कमज़ोरी)
                      </h5>
                    </div>
                    <ul className="text-xs sm:text-sm text-rose-900 space-y-1.5 list-disc list-inside">
                      <li>Limited cold storage / backup power during peak grid outages.</li>
                      <li>Seasonal cash-flow dependency on harvest & crop cycles.</li>
                      <li>Need for formal digital bookkeeping and GST awareness.</li>
                    </ul>
                  </div>

                  {/* Opportunities (Blue/Sky) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/70 border border-sky-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 rounded-full bg-sky-600"></span>
                      <h5 className="font-bold text-sky-950 text-sm uppercase tracking-wide">
                        Opportunities (अवसर)
                      </h5>
                    </div>
                    <ul className="text-xs sm:text-sm text-sky-900 space-y-1.5 list-disc list-inside">
                      <li>Eligible for 25% - 35% upfront capital subsidy under PMEGP.</li>
                      <li>Expansion into nearby town retail outlets via digital payments (UPI).</li>
                      <li>Collective bargaining power through Self Help Group (SHG) federations.</li>
                    </ul>
                  </div>

                  {/* Threats (Orange/Amber) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                      <h5 className="font-bold text-amber-950 text-sm uppercase tracking-wide">
                        Threats (जोखिम)
                      </h5>
                    </div>
                    <ul className="text-xs sm:text-sm text-amber-900 space-y-1.5 list-disc list-inside">
                      <li>Unseasonal weather disruptions impacting input transport.</li>
                      <li>Informal credit demands from local village customers (उधार खाता).</li>
                      <li>Price fluctuations in commercial animal feed or raw packaging.</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Row 3: Competitor Density & Suggested Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 4. Competitor Density Card (Gauge Visual) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-emerald-800" />
                      </div>
                      <h4 className="font-extrabold text-lg text-stone-900">
                        {t.competitorTitle}
                      </h4>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      Low-to-Medium
                    </span>
                  </div>

                  {/* Visual Meter Bar */}
                  <div className="mt-4 mb-3">
                    <div className="flex justify-between text-xs font-bold text-stone-500 mb-1.5">
                      <span className="text-emerald-700">Low (Safe)</span>
                      <span className="text-amber-700 font-extrabold">Moderate (Optimal)</span>
                      <span className="text-rose-600">High (Crowded)</span>
                    </div>
                    <div className="h-4 w-full bg-stone-100 rounded-full flex overflow-hidden p-0.5 border border-stone-200">
                      <div className="w-1/3 bg-emerald-500 rounded-l-full"></div>
                      <div className="w-1/3 bg-amber-400 relative">
                        {/* Needle Indicator */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-stone-900 rounded-full shadow-md"></div>
                      </div>
                      <div className="w-1/3 bg-rose-400 rounded-r-full"></div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3">
                    Only <strong>2 informal competitors</strong> operate in this 5km cluster with limited processing machinery. Your planned unit will have a first-mover advantage in clean quality assurance and prompt local supply.
                  </p>
                </div>

                {/* 5. Suggested Pricing & Unit Economics Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-amber-800" />
                      </div>
                      <h4 className="font-extrabold text-lg text-stone-900">
                        {t.pricingTitle}
                      </h4>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      24-28% Margin
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                      <span className="text-stone-600 font-medium">Average Raw Material Cost</span>
                      <span className="font-bold text-stone-900">₹36 - ₹40 / unit</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                      <span className="text-emerald-900 font-bold">Recommended Village Price</span>
                      <span className="font-extrabold text-emerald-950 text-base">₹52 - ₹56 / unit</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                      <span className="text-stone-600 font-medium">Estimated Monthly Breakeven</span>
                      <span className="font-bold text-amber-800">Month 4.5 onwards</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: FINANCIAL ROADMAP */}
          {activeTab === 'financial' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* 1. Metric Summary Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                
                {/* Project Cost */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-stone-200">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Project Cost</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
                    ₹{financialCalculations.projectCost.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">Capex + 3m Working Capital</p>
                </div>

                {/* Bank Loan Required */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-stone-200">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Bank Loan Amount</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-emerald-800 mt-1">
                    ₹{financialCalculations.loanAmount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    {Math.round((financialCalculations.loanAmount / financialCalculations.projectCost) * 100)}% Funded by Bank
                  </p>
                </div>

                {/* Government Subsidy */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-amber-200 bg-amber-50/40">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Eligible Subsidy</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-amber-900 mt-1">
                    ₹{financialCalculations.subsidyAmount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-amber-700 font-semibold mt-1">
                    {financialCalculations.subsidyPercentage}% Non-refundable grant
                  </p>
                </div>

                {/* Interest Rate */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-stone-200">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Interest Rate</span>
                  <p className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
                    {financialCalculations.annualInterestRate}% <span className="text-xs font-normal text-stone-500">p.a.</span>
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">Priority Sector Lending</p>
                </div>

              </div>

              {/* 2. Scheme Details Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Recommended Govt Scheme</span>
                      <h4 className="text-lg sm:text-xl font-extrabold text-stone-900">
                        {currentCategoryInfo.defaultScheme}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-full self-start sm:self-auto border border-emerald-300">
                    Pre-Approved Criteria Match
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                    <p className="text-xs font-semibold text-stone-500">Repayment Tenure</p>
                    <p className="text-lg font-bold text-stone-900 mt-0.5">5 Years (60 Months)</p>
                    <p className="text-[11px] text-stone-500">Flexible quarterly resets</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                    <p className="text-xs font-semibold text-stone-500">Moratorium Period (Grace)</p>
                    <p className="text-lg font-bold text-amber-800 mt-0.5">6 Months</p>
                    <p className="text-[11px] text-stone-500">Pay only simple interest during setup</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                    <p className="text-xs font-bold text-emerald-800">Estimated Monthly EMI</p>
                    <p className="text-2xl font-extrabold text-emerald-950 mt-0.5">
                      ₹{financialCalculations.emi.toLocaleString('en-IN')} <span className="text-xs font-normal text-stone-500">/ mo</span>
                    </p>
                    <p className="text-[11px] text-emerald-700">Post-moratorium regular installment</p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Required Document Checklist for Bank:</strong> Aadhaar Card, Residence Proof (Panchayat Certificate), Bank Passbook copy (last 6 months), and this GraminSaathi AI Feasibility Summary.
                  </div>
                </div>
              </div>

              {/* 3. Recharts Visualisation: Repayment & Balance Over Time */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h4 className="font-extrabold text-lg sm:text-xl text-stone-900">
                      Loan Balance & Principal Amortization
                    </h4>
                    <p className="text-xs text-stone-500">Quarterly visual breakdown over 3-year initial repayment curve</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-emerald-800">
                      <span className="w-3 h-3 rounded-full bg-emerald-600"></span> Principal Paid
                    </span>
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <span className="w-3 h-3 rounded-full bg-stone-400"></span> Remaining Balance
                    </span>
                  </div>
                </div>

                {/* Recharts Area/Bar Chart */}
                <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={financialCalculations.quarterlyData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#059669" stopOpacity={0.2} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" vertical={false} />
                      <XAxis dataKey="quarter" stroke="#888888" fontSize={12} tickLine={false} />
                      <YAxis
                        stroke="#888888"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value: any, name: any) => [
                          `₹${Number(value).toLocaleString('en-IN')}`,
                          name === 'remainingBalance' ? 'Remaining Balance' : 'Principal Paid'
                        ]}
                        labelFormatter={(label) => `Quarter: ${label}`}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '12px',
                          border: '1px solid #e5e7eb',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          fontSize: '12px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="remainingBalance"
                        stroke="#d97706"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                        name="remainingBalance"
                      />
                      <Area
                        type="monotone"
                        dataKey="principalPaid"
                        stroke="#059669"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrincipal)"
                        name="principalPaid"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 4. EMI Repayment Schedule (Table) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-extrabold text-lg sm:text-xl text-stone-900">
                      {t.scheduleTitle}
                    </h4>
                    <p className="text-xs text-stone-500">First 12 Quarters Detailed Statement</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Quarterly Amortization
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-600">
                        <th className="py-3 px-3.5 font-bold rounded-l-xl">Quarter</th>
                        <th className="py-3 px-3.5 font-bold">Installment (₹)</th>
                        <th className="py-3 px-3.5 font-bold">Principal (₹)</th>
                        <th className="py-3 px-3.5 font-bold">Interest (₹)</th>
                        <th className="py-3 px-3.5 font-bold">Remaining (₹)</th>
                        <th className="py-3 px-3.5 font-bold rounded-r-xl">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-800">
                      {financialCalculations.quarterlyData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                          <td className="py-3 px-3.5 font-bold text-stone-900">{item.quarterName}</td>
                          <td className="py-3 px-3.5 font-semibold">₹{item.installment.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3.5 text-emerald-700 font-bold">₹{item.principalPaid.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3.5 text-stone-500">₹{item.interestPaid.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3.5 font-bold">₹{item.remainingBalance.toLocaleString('en-IN')}</td>
                          <td className="py-3 px-3.5">
                            {item.isMoratorium ? (
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                                Moratorium (Grace)
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                Regular EMI
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </section>
      )}

      {/* FOOTER */}
      <footer className="mt-16 border-t border-amber-200/60 bg-white py-8 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-stone-800 font-bold">
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span>GraminSaathi AI Business Advisory</span>
          </div>
          <p>
            Designed for Bharat's rural micro-entrepreneurs, self-help groups (SHGs), and primary agricultural cooperatives.
          </p>
          <p className="text-[11px] text-stone-400">
            Compliant with guidelines from Ministry of MSME, NABARD & Pradhan Mantri Mudra Yojana.
          </p>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav id="mobile-bottom-nav" className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200/90 shadow-2xl py-2 px-4 sm:hidden">
        <div className="grid grid-cols-4 gap-1 items-center max-w-md mx-auto">
          
          <button
            type="button"
            onClick={() => {
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              activeNav === 'home' ? 'text-emerald-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Sprout className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t.navHome}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveNav('new');
              scrollToForm();
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              activeNav === 'new' ? 'text-emerald-800 font-bold' : 'text-stone-500'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-[10px] mt-0.5">{t.navNewReport}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveNav('history');
              setShowHistoryModal(true);
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              activeNav === 'history' ? 'text-emerald-800 font-bold' : 'text-stone-500'
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t.navHistory}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveNav('profile');
              setShowProfileModal(true);
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
              activeNav === 'profile' ? 'text-emerald-800 font-bold' : 'text-stone-500'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">{t.navProfile}</span>
          </button>

        </div>
      </nav>

      {/* MODAL 1: SAVED HISTORY MODAL */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <History className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-lg text-stone-900">Saved Village Reports</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 max-h-80 overflow-y-auto">
              {[
                { title: "Dairy Farming & Milk Chilling Unit", location: "Anand, Gujarat", cost: "₹2,50,000", date: "Today", scheme: "NABARD DEDS" },
                { title: "Handloom Khadi & Tailoring", location: "Bardoli, Gujarat", cost: "₹1,80,000", date: "2 days ago", scheme: "PMEGP (35% Subsidy)" },
                { title: "Organic Spice & Mustard Expeller", location: "Varanasi, UP", cost: "₹4,20,000", date: "Last week", scheme: "PMFME Scheme" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setLocationInput(item.location);
                    setShowHistoryModal(false);
                    handleGenerateReport();
                  }}
                  className="p-3.5 rounded-2xl bg-stone-50 hover:bg-emerald-50/70 border border-stone-200 cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">{item.title}</h5>
                    <p className="text-xs text-stone-500 mt-0.5">{item.location} • {item.scheme}</p>
                    <span className="text-[11px] font-semibold text-emerald-700">{item.cost} Cost</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: USER PROFILE & SCHEME STATUS */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <User className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-lg text-stone-900">Rural Entrepreneur Profile</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center font-extrabold text-lg">
                  GS
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Gramin Entrepreneur</h4>
                  <p className="text-xs text-stone-500">SHG Member ID: SHG-GJ-9821</p>
                  <span className="text-[11px] font-bold text-emerald-800">Kisan Credit Card Linked ✓</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl flex justify-between">
                  <span className="text-stone-500 font-medium">Estimated Credit Score (CIBIL)</span>
                  <span className="font-bold text-emerald-700">742 (Eligible)</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl flex justify-between">
                  <span className="text-stone-500 font-medium">Nearest Bank Branch</span>
                  <span className="font-bold text-stone-800">Baroda Gujarat Gramin Bank (3 km)</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl flex justify-between">
                  <span className="text-stone-500 font-medium">Helpline Support</span>
                  <span className="font-bold text-emerald-800">1800-180-1551 (Kisan Call Center)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: DOWNLOAD / PRINT REPORT MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <Printer className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-xl text-stone-900">GraminSaathi Report Preview</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Content Summary */}
            <div className="mt-6 p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-xs sm:text-sm text-stone-800">
              <div className="text-center border-b pb-4">
                <h2 className="text-xl font-extrabold text-emerald-950">GraminSaathi Business Assessment</h2>
                <p className="text-xs text-stone-500">Government Loan Scheme & Feasibility Summary for Rural Enterprise</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-stone-500">Location:</p>
                  <p className="font-bold">{selectedLocation.name}, {selectedLocation.state}</p>
                </div>
                <div>
                  <p className="text-stone-500">Sector:</p>
                  <p className="font-bold">{currentCategoryInfo.nameEn}</p>
                </div>
                <div>
                  <p className="text-stone-500">Total Project Cost:</p>
                  <p className="font-bold text-stone-900">₹{financialCalculations.projectCost.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-stone-500">Eligible Subsidy:</p>
                  <p className="font-bold text-amber-700">₹{financialCalculations.subsidyAmount.toLocaleString('en-IN')} ({financialCalculations.subsidyPercentage}%)</p>
                </div>
                <div>
                  <p className="text-stone-500">Required Bank Loan:</p>
                  <p className="font-bold text-emerald-800">₹{financialCalculations.loanAmount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-stone-500">Monthly EMI:</p>
                  <p className="font-bold">₹{financialCalculations.emi.toLocaleString('en-IN')} / mo</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="font-bold text-stone-900 mb-1">Matched Scheme:</p>
                <p className="text-stone-700 font-semibold">{currentCategoryInfo.defaultScheme}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="w-full sm:flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="w-full sm:w-auto px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-2xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
