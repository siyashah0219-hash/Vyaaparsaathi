import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { sendQueryToAIAdvisor } from '../services/apiService';
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  Trash2,
  Minimize2,
  Maximize2,
  ExternalLink,
  ChevronDown,
  Globe,
  HelpCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionTab?: string;
  actionLabel?: string;
}

export const AIChatBox: React.FC = () => {
  const { profile, financialResult, activeTab, setActiveTab, language, setLanguage } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Namaskar ${profile.name.split(' ')[0]} ji! 🙏 I am your KisanBiz AI & Vypaar Saathi. I have loaded your business profile for ${profile.businessCategory} in ${profile.district}, ${profile.state}. How can I assist you with funding, mandi rates, or reducing costs today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickPrompts = [
    { label: '💰 PM MUDRA Loan', query: 'How do I apply for PM MUDRA collateral-free loan for my business?', tab: 'schemes', action: 'View Govt Schemes' },
    { label: '🌾 35% PMFME Subsidy', query: 'What documents are required for 35% PMFME subsidy in my district?', tab: 'schemes', action: 'Explore PMFME' },
    { label: '📊 Break-Even Target', query: 'What should be my target break-even monthly sales and margin?', tab: 'financial-plan', action: 'Open Financial Plan' },
    { label: '📉 Reduce Operating Costs', query: 'How can I reduce monthly operating expenses for my farm/business?', tab: 'analyze', action: 'Check Market Analysis' },
    { label: '🛡️ Mitigate Market Risks', query: 'What steps should I take if crop or sales demand drops suddenly?', tab: 'risk-analysis', action: 'Simulate Risks' },
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isThinking]);

  // Voice Input Speech Recognition
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported on this browser. Please type your message.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  // Text to Speech
  const toggleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-IN';
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string, autoActionTab?: string, autoActionLabel?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsThinking(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const reply = await sendQueryToAIAdvisor(text, history, profile, financialResult);

      let actionTab = autoActionTab;
      let actionLabel = autoActionLabel;

      if (!actionTab) {
        const lower = text.toLowerCase();
        if (lower.includes('loan') || lower.includes('mudra') || lower.includes('scheme') || lower.includes('subsidy')) {
          actionTab = 'schemes';
          actionLabel = 'Explore Matching Schemes';
        } else if (lower.includes('cost') || lower.includes('financial') || lower.includes('emi') || lower.includes('break-even')) {
          actionTab = 'financial-plan';
          actionLabel = 'View Financial Plan';
        } else if (lower.includes('risk') || lower.includes('drop') || lower.includes('loss')) {
          actionTab = 'risk-analysis';
          actionLabel = 'Run Risk Sensitivity';
        } else if (lower.includes('expert') || lower.includes('consultant')) {
          actionTab = 'expert-session';
          actionLabel = 'Book 1-on-1 Expert Session';
        }
      }

      const botMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionTab,
        actionLabel,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: `For your ${profile.businessCategory} in ${profile.district}: You can apply for PM MUDRA collateral-free loans up to ₹10 Lakhs with valid Udyam registration and a 6-month bank statement.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionTab: 'schemes',
          actionLabel: 'Check Govt Schemes',
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: `Chat reset. Ask me anything about business setup, loans, PM MUDRA, or APMC mandi rates for ${profile.district}, ${profile.state}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Always visible on bottom right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-fade-in-up">
          {/* Pulsing Hint Badge */}
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 text-emerald-950 dark:text-emerald-300 text-xs font-bold shadow-xl shadow-emerald-900/15 cursor-pointer hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">Ask KisanBiz AI</span>
            <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold bg-amber-100/80 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
              {profile.district}
            </span>
          </div>

          {/* Main Bubble Icon Button with Glow Aura and Float */}
          <div className="relative group">
            {/* Glowing Aura Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-amber-400 opacity-75 blur-md group-hover:opacity-100 animate-pulse-glow transition-all duration-300"></div>

            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open KisanBiz AI Chat Assistant"
              className="relative h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-700/50 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
            >
              <Bot className="h-7 w-7 transition-transform group-hover:rotate-12 duration-300" />
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-400 border-2 border-white dark:border-slate-900 flex items-center justify-center animate-bounce">
                <Sparkles className="h-2.5 w-2.5 text-emerald-950" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Expandable Chat Box Window with Pop-in Animation */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 animate-pop-in flex flex-col shadow-2xl overflow-hidden border border-emerald-500/30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl ${
            isExpanded
              ? 'inset-4 sm:inset-8 md:inset-12 w-auto h-auto max-w-5xl 2xl:max-w-6xl mx-auto'
              : 'bottom-4 sm:bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] xl:w-[410px] 2xl:w-[460px] h-[500px] sm:h-[540px] 2xl:h-[650px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white flex items-center justify-between border-b border-emerald-700/60 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
                <Bot className="h-6 w-6" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-emerald-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-sm tracking-tight text-white">
                    VYPAAR SAATHI AI
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200 truncate max-w-[210px]">
                  {profile.businessCategory} • {profile.district}, {profile.state}
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1">
              {/* Language Switch */}
              <button
                onClick={() => {
                  const nextLang = language === 'English' ? 'Hindi' : language === 'Hindi' ? 'Marathi' : 'English';
                  setLanguage(nextLang);
                }}
                className="px-2 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-700/60 text-[11px] font-bold text-amber-300 transition-colors"
                title="Change language"
              >
                {language === 'English' ? 'EN' : language === 'Hindi' ? 'हिन्दी' : 'मराठी'}
              </button>

              {/* Clear */}
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-700/50 transition-colors"
                title="Clear conversation"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              {/* Maximize / Minimize toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:block p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-700/50 transition-colors"
                title={isExpanded ? 'Minimize' : 'Maximize'}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-700/50 transition-colors"
                title="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel Bar */}
          <div className="bg-emerald-50/70 dark:bg-slate-800/60 border-b border-emerald-100 dark:border-slate-800 px-3 py-2 overflow-x-auto flex items-center gap-2 no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-emerald-900 dark:text-emerald-400 shrink-0 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" /> Prompts:
            </span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.query, p.tab, p.action)}
                className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-700 hover:bg-emerald-600 hover:text-white text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:scale-105 active:scale-95 transition-all shadow-2xs"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-900/60">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 animate-fade-in-up ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[80%] space-y-1.5 ${isAssistant ? '' : 'text-right'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                        isAssistant
                          ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 rounded-tl-xs'
                          : 'bg-gradient-to-r from-emerald-700 to-green-700 text-white rounded-tr-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Interactive Action Button linked to tab */}
                      {msg.actionTab && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setActiveTab(msg.actionTab as any);
                              if (!isExpanded) setIsOpen(false);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-300 dark:border-emerald-700 transition-all hover:scale-102"
                          >
                            <span>{msg.actionLabel || 'View Recommended Action'}</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Metadata & Audio Speak */}
                    <div className={`flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400 px-1 ${isAssistant ? '' : 'justify-end'}`}>
                      <span>{msg.timestamp}</span>
                      {isAssistant && (
                        <button
                          onClick={() => toggleSpeak(msg.id, msg.text)}
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 font-semibold"
                          title="Listen in speech audio"
                        >
                          {speakingId === msg.id ? (
                            <>
                              <VolumeX className="h-3 w-3 text-red-500 animate-pulse" />
                              <span className="text-red-500">Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-3 w-3" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="h-8 w-8 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center shrink-0 shadow-xs mt-0.5 font-bold text-xs">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 pl-1">
                <div className="h-7 w-7 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center animate-spin">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="italic">KisanBiz AI is researching local rates & policies...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Listening Active Banner */}
          {isListening && (
            <div className="bg-red-50 dark:bg-red-950/60 border-t border-red-200 dark:border-red-900 px-4 py-2 flex items-center justify-between text-xs text-red-700 dark:text-red-300 animate-pulse">
              <span className="flex items-center gap-2 font-bold">
                <Mic className="h-4 w-4" /> Listening in {language}... Speak your question!
              </span>
              <button
                onClick={toggleListening}
                className="underline text-[11px] font-bold hover:text-red-900"
              >
                Stop
              </button>
            </div>
          )}

          {/* Input Box Footer */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  language === 'Hindi'
                    ? 'अपना सवाल यहाँ पूछें (e.g. मुद्रा लोन कैसे लें)...'
                    : language === 'Marathi'
                    ? 'येथे प्रश्न विचारा (उदा. पीएम मुद्रा कर्ज कसे मिळवायचे)...'
                    : 'Ask about loans, schemes, market rates, or budget...'
                }
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-600 dark:placeholder:text-slate-400 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              />

              {/* Speech to text */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-red-600 text-white border-red-600 shadow-md animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700'
                }`}
                title="Voice input"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>

              {/* Send button */}
              <button
                type="submit"
                disabled={!inputMessage.trim() || isThinking}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-700/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span>Send</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
