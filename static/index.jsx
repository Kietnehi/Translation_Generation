import React, { useState, useEffect, useCallback } from 'react';
import { 
  Languages, 
  Settings2, 
  Sparkles, 
  History, 
  Copy, 
  CheckCircle2, 
  AlertCircle,
  LayoutDashboard,
  Save,
  Trash2,
  Maximize2,
  ListChecks
} from 'lucide-react';

const API_KEY = ""; // Environment handles this

const AVAILABLE_LANGUAGES = [
  "Chinese", "English", "French", "Portuguese", "Spanish", "Japanese",
  "Turkish", "Russian", "Arabic", "Korean", "Thai", "Italian", "German",
  "Vietnamese", "Malay", "Indonesian", "Filipino", "Hindi", "Traditional Chinese",
  "Polish", "Czech", "Dutch", "Khmer", "Burmese", "Persian", "Gujarati",
  "Urdu", "Telugu", "Marathi", "Hebrew", "Bengali", "Tamil", "Ukrainian",
  "Tibetan", "Kazakh", "Mongolian", "Uyghur", "Cantonese"
];

const App = () => {
  // --- State Management ---
  const [sourceText, setSourceText] = useState('Hello, this is a sample text to translate.');
  const [translations, setTranslations] = useState({}); // Lưu trữ kết quả đa ngôn ngữ
  const [selectedLangs, setSelectedLangs] = useState(["Vietnamese"]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Prompt System Logic State
  const [promptConfig, setPromptConfig] = useState({
    role: "Expert Translator",
    tone: "Professional and Nuanced",
    context: "General content",
    constraints: "Keep the same length, maintain formatting",
    sourceLang: "Detect Automatically"
  });

  const [activeTab, setActiveTab] = useState('translate'); 
  const [history, setHistory] = useState([]);

  // --- Logic Splitting: Constructing the System Prompt ---
  const constructSystemPrompt = useCallback((targetLang) => {
    return `You are an ${promptConfig.role}.
Tone: ${promptConfig.tone}.
Context: ${promptConfig.context}.
Specific Constraints: ${promptConfig.constraints}.

Your task is to translate the following text from ${promptConfig.sourceLang} to ${targetLang}. 
Ensure the output is natural, culturally appropriate, and follows the specified tone. 
Return ONLY the translated text without any conversational preamble.`;
  }, [promptConfig]);

  // --- API Execution for Multiple Languages ---
  const translateAll = async () => {
    if (!sourceText.trim() || selectedLangs.length === 0) return;

    setIsLoading(true);
    setError(null);
    const newTranslations = {};

    // Hàm gọi API cho từng ngôn ngữ
    const fetchSingleTranslation = async (lang, retryCount = 0) => {
      const systemPrompt = constructSystemPrompt(lang);
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: sourceText }] }],
              systemInstruction: { parts: [{ text: systemPrompt }] }
            })
          }
        );

        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        return text?.trim() || "";
      } catch (err) {
        if (retryCount < 3) {
          await new Promise(res => setTimeout(res, Math.pow(2, retryCount) * 1000));
          return fetchSingleTranslation(lang, retryCount + 1);
        }
        throw err;
      }
    };

    try {
      // Chạy song song các yêu cầu dịch
      const promises = selectedLangs.map(async (lang) => {
        const result = await fetchSingleTranslation(lang);
        newTranslations[lang] = result;
      });

      await Promise.all(promises);
      setTranslations(newTranslations);
      
      // Lưu vào lịch sử
      setHistory(prev => [{
        id: Date.now(),
        source: sourceText.substring(0, 40) + "...",
        langs: selectedLangs.join(", "),
        timestamp: new Date().toLocaleTimeString()
      }, ...prev]);
      
    } catch (err) {
      setError("Một số bản dịch bị lỗi. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const toggleLang = (lang) => {
    setSelectedLangs(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Languages className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            PromptLingua Studio
          </h1>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('translate')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'translate' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Translator
          </button>
          <button 
            onClick={() => setActiveTab('designer')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'designer' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            System Prompt Designer
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Language Selection & Config */}
        <aside className="lg:col-span-3 space-y-6">
          <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-indigo-600">
              <ListChecks className="w-5 h-5" />
              <h2 className="font-semibold text-sm uppercase tracking-wider">Target Languages</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {AVAILABLE_LANGUAGES.map(lang => (
                <button
                  key={lang}
                  onClick={() => toggleLang(lang)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    selectedLangs.includes(lang) 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-amber-600">
              <History className="w-5 h-5" />
              <h2 className="font-semibold text-sm uppercase tracking-wider">Recent</h2>
            </div>
            <div className="space-y-3 max-h-[200px] overflow-y-auto">
              {history.map(item => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  <p className="text-slate-400 mb-1">{item.timestamp}</p>
                  <p className="text-slate-700 truncate font-medium">{item.source}</p>
                  <p className="text-indigo-500 mt-1 truncate">Langs: {item.langs}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Right Column: Main Workspace */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === 'translate' ? (
            <div className="space-y-6">
              {/* Input Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[250px]">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-tight">Source Text</span>
                  <button onClick={() => setSourceText('')} className="text-slate-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea 
                  className="flex-1 p-4 resize-none outline-none text-slate-800 text-lg leading-relaxed placeholder:text-slate-300 min-h-[150px]"
                  placeholder="Nhập nội dung cần dịch..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                />
                <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
                  <button 
                    disabled={isLoading || !sourceText || selectedLangs.length === 0}
                    onClick={translateAll}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                      isLoading || !sourceText || selectedLangs.length === 0
                        ? 'bg-slate-300 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                    }`}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                    Dịch sang {selectedLangs.length} ngôn ngữ
                  </button>
                </div>
              </div>

              {/* Results Grid */}
              {Object.keys(translations).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  {Object.entries(translations).map(([lang, text]) => (
                    <div key={lang} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                      <div className="px-4 py-2 bg-indigo-50/50 border-b border-indigo-100 flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-700 uppercase">{lang}</span>
                        <button 
                          onClick={() => copyToClipboard(text)}
                          className="text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed min-h-[100px]">
                        {text}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          ) : (
            /* System Prompt Designer View (Giữ nguyên từ version trước) */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <div className="bg-violet-100 p-3 rounded-2xl">
                  <LayoutDashboard className="text-violet-600 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Logic Splitting & System Prompt Design</h2>
                  <p className="text-sm text-slate-500">Cấu hình cách AI xử lý ngôn ngữ và ngữ cảnh.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Persona Role (Vai trò)</label>
                    <input 
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                      value={promptConfig.role}
                      onChange={(e) => setPromptConfig({...promptConfig, role: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Project Context (Ngữ cảnh)</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none h-24 resize-none transition-all"
                      value={promptConfig.context}
                      onChange={(e) => setPromptConfig({...promptConfig, context: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                   <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Strict Constraints (Ràng buộc)</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none h-44 resize-none transition-all"
                      value={promptConfig.constraints}
                      onChange={(e) => setPromptConfig({...promptConfig, constraints: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" />
                  Mẫu System Instruction (Sẽ được gửi tới API)
                </label>
                <div className="bg-slate-900 rounded-2xl p-6 relative group">
                  <pre className="text-emerald-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                    {constructSystemPrompt("[Target Language]")}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center gap-4 text-slate-400">
        <div className="h-px w-24 bg-slate-200" />
        <p className="text-xs font-medium tracking-widest uppercase">Intelligent Batch Translation Layer</p>
      </footer>
    </div>
  );
};

export default App;