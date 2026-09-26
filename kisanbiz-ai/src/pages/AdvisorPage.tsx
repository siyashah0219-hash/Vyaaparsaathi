import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { AdvisorMessage } from '../types';
import { sendQueryToAIAdvisor } from '../services/apiService';
import {
  MessageSquare,
  Mic,
  MicOff,
  Send,
  Volume2,
  Sparkles,
  Bot,
  User,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const AdvisorPage: React.FC = () => {
  const { profile, financialResult, financialInput, language, setActiveTab } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const [messages, setMessages] = useState<AdvisorMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Namaskar ${profile.name.split(' ')[0]}! I am VYPAAR SAATHI — your hyper-local AI advisor for ${profile.businessCategory} in ${profile.district}, ${profile.state}. I have analyzed your profile (Capital: ₹${profile.capital.toLocaleString('en-IN')}, Stage: ${profile.businessType === 'new' ? 'New Setup' : 'Existing Unit'}). What business question can I answer for you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'How do I get my PM MUDRA loan approved?',
        'How can I lower my monthly operating costs?',
        'What documents do I need for PMFME 35% subsidy?',
        'What is my target break-even sales?',
      ],
    },
  ]);

  const recognitionRef = useRef<any>(null);

  // Speech Recognition (Voice Input)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your browser. Please type your message.');
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
          setInputMessage(transcript);
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

  // Text to Speech Output
  const speakText = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-IN';

    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    setIsSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Async Backend / External API AI Advisor query handler
  const handleSendMessage = async (textToSend = inputMessage) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isThinking) return;

    const userMsg: AdvisorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const historyForApi = messages.map((m) => ({ sender: m.sender, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsThinking(true);

    try {
      const replyText = await sendQueryToAIAdvisor(
        trimmed,
        historyForApi,
        profile,
        financialResult
      );

      let actions: string[] = [];
      const q = trimmed.toLowerCase();
      if (q.includes('mudra') || q.includes('loan')) {
        actions = ['Calculate EMI for higher loan', 'Check PMFME subsidy eligibility'];
      } else if (q.includes('cost') || q.includes('expense')) {
        actions = ['View Risk Matrix', 'Recalculate Budget'];
      } else if (q.includes('pmfme') || q.includes('subsidy')) {
        actions = ['Visit Official PMFME Portal', 'Book Expert Session with Ex-NABARD Manager'];
      } else {
        actions = ['Explore Govt Schemes', 'Review Hyper-Local Market Report'];
      }

      const assistantMsg: AdvisorMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: actions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('AI Advisor request failed', err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn w-full max-w-[1820px] mx-auto">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
            Interactive Voice & Text Assistant
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-slate-100 mt-2">
            Talk to VYPAAR SAATHI AI Advisor
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Ask in Hindi, Marathi, or English. Audio read-aloud available for all responses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 px-3.5 py-2 rounded-2xl text-xs text-emerald-950 dark:text-slate-200 font-bold">
            <Sparkles className="h-4 w-4 text-amber-500" /> Tailored to {profile.name} ({profile.district})
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="hidden sm:inline-flex text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Widescreen 12-Column Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Main Chat Interface (8 Columns on xl/2xl) */}
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col h-[520px] lg:h-[560px] 2xl:h-[680px] overflow-hidden transition-colors">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-white p-4 px-6 flex items-center justify-between border-b border-emerald-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/20 text-amber-300 flex items-center justify-center font-bold">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">VYPAAR SAATHI AI Advisor</p>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live External API Connected ({profile.district})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs text-amber-300 font-bold bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-700">
                Language: {language}
              </div>
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSpeaking = isSpeakingId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div
                    className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                      isUser ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-800 text-white'
                    }`}
                  >
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs relative ${
                        isUser
                          ? 'bg-gradient-to-r from-emerald-700 to-green-700 text-white rounded-tr-xs'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-xs'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {!isUser && (
                        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 mt-2 text-[10px]">
                          <span className="text-slate-400">{msg.timestamp}</span>
                          <button
                            onClick={() => speakText(msg.id, msg.text)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-colors ${
                              isSpeaking
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300'
                                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700'
                            }`}
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                            <span>{isSpeaking ? 'Stop Audio' : 'Listen Audio'}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Prompt Action Chips */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedActions.map((act, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              const lower = act.toLowerCase();
                              if (lower.includes('scheme') || lower.includes('pmfme')) {
                                setActiveTab('schemes');
                              } else if (lower.includes('budget') || lower.includes('emi')) {
                                setActiveTab('financial-plan');
                              } else if (lower.includes('risk')) {
                                setActiveTab('risk-analysis');
                              } else if (lower.includes('expert')) {
                                setActiveTab('expert-session');
                              } else {
                                handleSendMessage(act);
                              }
                            }}
                            className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-emerald-200 dark:border-slate-700 px-3 py-1 rounded-full shadow-2xs transition-all flex items-center gap-1 hover:scale-102"
                          >
                            <Lightbulb className="h-3 w-3 text-amber-500" /> {act}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-center text-xs text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 px-4 shadow-2xs">
                <RefreshCw className="h-4 w-4 animate-spin text-emerald-700 dark:text-emerald-400" />
                <span>Analyzing market context and generating response...</span>
              </div>
            )}
          </div>

          {/* Input Controls Footer */}
          <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 shrink-0">
            {isListening && (
              <div className="bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs px-3 py-1.5 rounded-xl flex items-center gap-2 animate-pulse">
                <Mic className="h-4 w-4 text-red-600" /> Listening to your voice... Speak now in {language}.
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={toggleListening}
                className={`p-3 rounded-2xl border transition-all ${
                  isListening
                    ? 'bg-red-600 text-white border-red-700 animate-pulse'
                    : 'bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-400 border-amber-300 dark:border-slate-700 hover:bg-amber-200 dark:hover:bg-slate-700'
                }`}
                title="Voice Input (Mic)"
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5 text-amber-800 dark:text-amber-400" />}
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Ask your question in ${language}... (or tap mic to speak)`}
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isThinking}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-sm disabled:opacity-40 transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-700/20"
              >
                <Send className="h-4 w-4" /> Send
              </button>
            </div>
          </div>

        </div>

        {/* Right Sidebar: Advisor Intelligence & Profile Context Panel (4 Columns on xl/2xl) */}
        <div className="xl:col-span-4 space-y-5 flex flex-col justify-between">
          
          {/* Profile Overview Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Active Enterprise Profile
              </span>
              <span className="text-[10px] font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                {profile.businessType === 'new' ? 'New Setup' : 'Expansion'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Entrepreneur</span>
                <strong className="text-slate-900 dark:text-slate-100 font-semibold">{profile.name}</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Location</span>
                <strong className="text-slate-900 dark:text-slate-100 font-semibold truncate block">{profile.district}, {profile.state}</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Capital</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-bold">₹{profile.capital.toLocaleString('en-IN')}</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Category</span>
                <strong className="text-slate-900 dark:text-slate-100 font-semibold truncate block">{profile.businessCategory}</strong>
              </div>
            </div>
          </div>

          {/* Rapid Ask Question Shortcuts */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" /> Quick Questions
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Click any question to receive hyper-local guidance:
            </p>

            <div className="space-y-2">
              {[
                'How do I get my PM MUDRA loan approved in ' + profile.district + '?',
                'What documents are needed for PMFME 35% subsidy?',
                'How can I lower my monthly raw material costs?',
                'What is the mandatory FSSAI registration process?',
                'How do I calculate my monthly break-even sales?',
              ].map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(query)}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-medium transition-colors flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{query}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Policy & Subsidy Highlight Bulletin */}
          <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-5 border border-emerald-800 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Policy Intelligence
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Under PMFME, micro food enterprises in <strong>{profile.district}</strong> receive up to <strong>35% credit-linked capital subsidy</strong> (max ₹10 Lakh) with collateral-free bank tie-up.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="text-emerald-300">Govt of India MoFPI</span>
              <button
                onClick={() => setActiveTab('schemes')}
                className="text-amber-300 font-bold hover:underline inline-flex items-center gap-1"
              >
                View Schemes <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
