const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Imports
code = code.replace(
  "import React, { useState, useEffect, useMemo, useRef } from 'react';",
  "import React, { useState, useEffect, useMemo, useRef, useReducer } from 'react';"
);

// 2. Reducer & App State
const stateOld = `export default function App() {
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
  const [activeTab, setActiveTab] = useState<'feasibility' | 'financial'>('feasibility');`;

const stateNew = `type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;

interface WizardState {
  step: WizardStep;
  locationInput: string;
  selectedLocation: LocationOption;
  isLocationDropdownOpen: boolean;
  marginCapital: number;
  selectedCategory: string;
  analysisStep: number;
  hasReport: boolean;
}

type WizardAction = 
  | { type: 'SET_STEP'; payload: WizardStep }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_LOCATION_INPUT'; payload: string }
  | { type: 'SET_SELECTED_LOCATION'; payload: LocationOption }
  | { type: 'SET_LOCATION_DROPDOWN'; payload: boolean }
  | { type: 'SET_MARGIN_CAPITAL'; payload: number }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'START_ANALYSIS' }
  | { type: 'UPDATE_ANALYSIS_PROGRESS'; payload: number }
  | { type: 'FINISH_ANALYSIS' }
  | { type: 'RESET_WIZARD' };

const initialWizardState: WizardState = {
  step: 1,
  locationInput: '',
  selectedLocation: POPULAR_LOCATIONS[0],
  isLocationDropdownOpen: false,
  marginCapital: 50000,
  selectedCategory: '',
  analysisStep: 0,
  hasReport: false
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 6) as WizardStep };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 1) as WizardStep };
    case 'SET_LOCATION_INPUT':
      return { ...state, locationInput: action.payload };
    case 'SET_SELECTED_LOCATION':
      return { ...state, selectedLocation: action.payload, locationInput: \`\${action.payload.name}, \${action.payload.state}\` };
    case 'SET_LOCATION_DROPDOWN':
      return { ...state, isLocationDropdownOpen: action.payload };
    case 'SET_MARGIN_CAPITAL':
      return { ...state, marginCapital: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'START_ANALYSIS':
      return { ...state, step: 4, analysisStep: 0 };
    case 'UPDATE_ANALYSIS_PROGRESS':
      return { ...state, analysisStep: action.payload };
    case 'FINISH_ANALYSIS':
      return { ...state, step: 5, hasReport: true };
    case 'RESET_WIZARD':
      return initialWizardState;
    default:
      return state;
  }
}

export default function App() {
  // State
  const [lang, setLang] = useState<Language>('en');
  const [wizardState, dispatch] = useReducer(wizardReducer, initialWizardState);
  const { step, locationInput, selectedLocation, isLocationDropdownOpen, marginCapital, selectedCategory, analysisStep, hasReport } = wizardState;
  const isAnalyzing = step === 4;`;

code = code.replace(stateOld, stateNew);

// 3. handleGenerateReport
const generateOld = `  // Handle Form Submission
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
  };`;

const generateNew = `  // Handle Form Submission
  const handleGenerateReport = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    dispatch({ type: 'START_ANALYSIS' });

    // Step-by-step loading animation
    const timer1 = setTimeout(() => dispatch({ type: 'UPDATE_ANALYSIS_PROGRESS', payload: 1 }), 1200);
    const timer2 = setTimeout(() => dispatch({ type: 'UPDATE_ANALYSIS_PROGRESS', payload: 2 }), 2400);
    const timer3 = setTimeout(() => dispatch({ type: 'UPDATE_ANALYSIS_PROGRESS', payload: 3 }), 3600);
    const timer4 = setTimeout(() => {
      dispatch({ type: 'FINISH_ANALYSIS' });
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };`;

code = code.replace(generateOld, generateNew);

// 4. Form Header pre-fill button
const prefillOld = `                setLocationInput("Anand Block, Gujarat");
                setSelectedLocation(POPULAR_LOCATIONS[0]);
                setMarginCapital(50000);
                setSelectedCategory('dairy');`;
const prefillNew = `                dispatch({ type: 'SET_SELECTED_LOCATION', payload: POPULAR_LOCATIONS[0] });
                dispatch({ type: 'SET_MARGIN_CAPITAL', payload: 50000 });
                dispatch({ type: 'SET_SELECTED_CATEGORY', payload: 'dairy' });
                dispatch({ type: 'SET_STEP', payload: 3 });`;
code = code.replace(prefillOld, prefillNew);

const prefillHistoryOld = `                    setLocationInput(item.location);
                    setShowHistoryModal(false);
                    handleGenerateReport();`;
const prefillHistoryNew = `                    dispatch({ type: 'SET_LOCATION_INPUT', payload: item.location });
                    setShowHistoryModal(false);
                    handleGenerateReport();`;
code = code.replace(prefillHistoryOld, prefillHistoryNew);


// 5. Replace <main> entirely. We will find it with a regex since it's large.
const mainRegex = /<main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">[\s\S]*?<\/main>/;

const newMain = `      <main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 transition-all duration-300">
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
                  {step <= 3 ? step : 4}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 transition-opacity">
                  {step === 1 && "Let's find out if your business idea will work"}
                  {step === 2 && "How much capital do you have ready?"}
                  {step === 3 && "What business do you want to start?"}
                  {step === 4 && t.analyzingTitle}
                </h2>
              </div>
              <p className="text-stone-500 text-sm mt-1 transition-opacity">
                {step === 1 && t.formSubtitle}
                {step === 2 && "This is the amount you can invest today (usually 10% of your total project)"}
                {step === 3 && "Select from high-demand rural categories below"}
                {step === 4 && "Please wait while we crunch the numbers for your village..."}
              </p>
            </div>

            {/* Quick Demo Pre-fill chip */}
            {step === 1 && (
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: 'SET_SELECTED_LOCATION', payload: POPULAR_LOCATIONS[0] });
                  dispatch({ type: 'SET_MARGIN_CAPITAL', payload: 50000 });
                  dispatch({ type: 'SET_SELECTED_CATEGORY', payload: 'dairy' });
                  dispatch({ type: 'SET_STEP', payload: 3 });
                }}
                className="text-xs font-semibold px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Sample Anand Dairy</span>
              </button>
            )}
          </div>

          <form onSubmit={handleGenerateReport} className="mt-6 space-y-6">
            
            {/* Step 1: Location */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
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
                      dispatch({ type: 'SET_LOCATION_INPUT', payload: e.target.value });
                      dispatch({ type: 'SET_LOCATION_DROPDOWN', payload: true });
                    }}
                    onFocus={() => dispatch({ type: 'SET_LOCATION_DROPDOWN', payload: true })}
                    placeholder={t.locationPlaceholder}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 border border-stone-300 text-stone-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-base transition-all"
                    required
                  />
                </div>

                {isLocationDropdownOpen && filteredLocations.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 z-30 max-h-60 overflow-y-auto divide-y divide-stone-100">
                    <div className="p-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider bg-stone-50/80 rounded-t-xl px-3">
                      Suggested Rural Clusters
                    </div>
                    {filteredLocations.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          dispatch({ type: 'SET_SELECTED_LOCATION', payload: item });
                          dispatch({ type: 'SET_LOCATION_DROPDOWN', payload: false });
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
                
                <div className="pt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'NEXT_STEP' })}
                    disabled={!locationInput}
                    className="py-3 px-8 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 disabled:text-stone-500 transition-colors flex items-center gap-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Capital */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
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
                    onChange={(e) => dispatch({ type: 'SET_MARGIN_CAPITAL', payload: Number(e.target.value) })}
                    placeholder="50000"
                    className="w-full pl-10 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-300 text-stone-900 font-extrabold text-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <p className="text-xs text-stone-500 mt-2 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{t.capitalHint}</span>
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {[25000, 50000, 100000, 250000, 500000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => dispatch({ type: 'SET_MARGIN_CAPITAL', payload: preset })}
                      className={\`px-4 py-2 rounded-xl text-sm font-bold border transition-all \${
                        marginCapital === preset
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/80'
                      }\`}
                    >
                      ₹{preset >= 100000 ? \`\${preset / 100000} Lakh\` : \`\${preset / 1000}k\`}
                    </button>
                  ))}
                </div>

                <div className="pt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'PREV_STEP' })}
                    className="py-3 px-6 rounded-xl font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'NEXT_STEP' })}
                    disabled={!marginCapital}
                    className="py-3 px-8 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 disabled:text-stone-500 transition-colors flex items-center gap-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Category */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
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
                        onClick={() => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: cat.id })}
                        className={\`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-start justify-between min-h-[100px] \${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/60 shadow-xs scale-[1.02]'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                        }\`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className={\`w-10 h-10 rounded-xl flex items-center justify-center \${
                            isSelected ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
                          }\`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className={\`text-sm font-bold mt-3 leading-snug \${
                          isSelected ? 'text-emerald-950' : 'text-stone-800'
                        }\`}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'PREV_STEP' })}
                    className="py-3 px-6 rounded-xl font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    id="generate-report-btn"
                    type="submit"
                    disabled={!selectedCategory}
                    className="py-3 px-8 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 disabled:from-stone-300 disabled:to-stone-400 disabled:text-stone-500 shadow-lg transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{t.generateBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Step 4: Loading Animation Box */}
          {step === 4 && (
            <div className="mt-2 p-8 rounded-3xl bg-amber-50/80 border border-amber-200 text-center animate-in zoom-in-95 duration-300">
              <RefreshCw className="w-12 h-12 animate-spin text-emerald-700 mx-auto mb-6" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider mx-auto">
                  AI Synthesis in Progress
                </span>
              </div>
              <div className="w-full bg-amber-200/70 h-3 rounded-full overflow-hidden mb-6 max-w-sm mx-auto">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: \`\${(analysisStep + 1) * 25}%\` }}
                ></div>
              </div>
              <p className="text-lg font-bold text-stone-800 flex items-center justify-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-600 animate-ping"></span>
                <span>{analysisSteps[analysisStep][lang]}</span>
              </p>
            </div>
          )}
        </div>
      </main>`;
code = code.replace(mainRegex, newMain);

// 6. Section 3: Remove Dashboard Tabs Selector & Update activeTab logic to use 'step'
const tabsRegex = /<div className="mt-6 flex items-center bg-stone-100 p-1\.5 rounded-2xl border border-stone-200">[\s\S]*?<\/div>\s*<\/div>\s*\{\/\* TAB 1: FEASIBILITY REPORT \*\/\}/;
code = code.replace(tabsRegex, `</div>

            {/* TAB 1: FEASIBILITY REPORT */}`);

code = code.replace("{activeTab === 'feasibility' && (", "{step === 5 && (");
code = code.replace("{activeTab === 'financial' && (", "{step === 6 && (");

// Add the 'See Your Funding Plan ->' button at the bottom of the Feasibility tab
const feasibilityEndRegex = /<\/div>\s*<\/div>\s*\}\s*\{\/\* TAB 2: FINANCIAL ROADMAP \*\/\}/;
const ctaToAdd = `              </div>
              
              <div className="mt-8 flex justify-center pb-4">
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: 'SET_STEP', payload: 6 });
                    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                  }}
                  className="py-4 px-10 rounded-2xl font-extrabold text-white text-lg bg-emerald-700 hover:bg-emerald-800 shadow-xl shadow-emerald-700/20 transition-all flex items-center gap-3 transform hover:scale-[1.02]"
                >
                  <span>See Your Funding Plan</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: FINANCIAL ROADMAP */}`;
code = code.replace(feasibilityEndRegex, ctaToAdd);

fs.writeFileSync('src/App.tsx', code);
console.log('Successfully updated App.tsx');
