import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { sendQueryToAIAdvisor, getActiveGeminiApiKey, setLocalGeminiApiKey } from '../services/apiService';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  Trash2,
  ExternalLink,
  ChevronRight,
  Key,
  Check,
  X,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionTab?: string;
  actionLabel?: string;
}

export const AIChatView: React.FC = () => {
  const { profile, language, setActiveTab, financialResult } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Gemini API Key State
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [activeApiKey, setActiveApiKey] = useState<string>(() => getActiveGeminiApiKey());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Namaskar ${profile.name.split(' ')[0]} ji! 🙏 I am your Vypaar Saathi AI. I have your profile loaded for ${profile.businessCategory} in ${profile.district}, ${profile.state}.\n\nHow can I help you with PM MUDRA loans, 35% subsidies, or mandi rates today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickPrompts = [
    { label: '💰 PM MUDRA Loan', query: 'How do I apply for PM MUDRA loan?', tab: 'schemes', action: 'View Schemes' },
    { label: '🌾 35% PMFME Subsidy', query: 'What documents are required for 35% PMFME subsidy?', tab: 'schemes', action: 'Explore PMFME' },
    { label: '📊 Break-Even Target', query: 'What should be my target monthly sales?', tab: 'finance', action: 'Open Loan Calculator' },
    { label: '📉 Reduce Operating Costs', query: 'How can I reduce operating expenses for my farm business?', tab: 'mandi', action: 'Check Mandi Rates' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

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
    } catch {
      setIsListening(false);
    }
  };

  const toggleSpeak = (msgId: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingId === msgId) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-IN';
      utterance.rate = 0.95;

      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);

      setSpeakingId(msgId);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (customQuery?: string, tabLink?: string, tabText?: string) => {
    const textToSend = (customQuery || inputMessage).trim();
    if (!textToSend || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
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
      const aiReplyText = await sendQueryToAIAdvisor(textToSend, history, profile, financialResult, language);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionTab: tabLink,
        actionLabel: tabText,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `For your ${profile.businessCategory} in ${profile.district}, PM MUDRA provides up to ₹50,000 Shishu loans with zero collateral. Please verify in the Schemes tab!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionTab: 'schemes',
          actionLabel: 'View Schemes',
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
        text: `Chat reset. Ask me anything about loans, PM MUDRA, or APMC mandi rates for ${profile.district}, ${profile.state}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-115px)] animate-fade-in-up">
      
      {/* Top Chat Bar */}
      <div className="bg-emerald-950 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-emerald-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Vypaar Saathi AI</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${activeApiKey ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-800 text-emerald-200'}`}>
                {activeApiKey ? 'Gemini AI' : 'Online'}
              </span>
            </h2>
            <p className="text-[10px] text-emerald-300">
              {profile.businessCategory} • {profile.district}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Key configuration button */}
          <button
            onClick={() => {
              setApiKeyInput(activeApiKey);
              setShowApiKeyModal((prev) => !prev);
            }}
            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
              activeApiKey
                ? 'bg-emerald-900 border border-emerald-700 text-amber-300'
                : 'bg-amber-400 text-emerald-950 font-bold'
            }`}
            title={activeApiKey ? 'Gemini Key Connected' : 'Set Gemini Key'}
          >
            <Key className="h-3.5 w-3.5" />
            {!activeApiKey && <span className="text-[9px]">Key</span>}
          </button>

          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800"
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile Gemini API Key Configuration Drawer */}
      {showApiKeyModal && (
        <div className="p-3 bg-emerald-900 text-white border-b border-emerald-700 animate-fade-in-up space-y-2 z-10 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold">
              <Key className="h-3.5 w-3.5 text-amber-300" />
              <span>Google Gemini API Key</span>
            </div>
            <button onClick={() => setShowApiKeyModal(false)} className="text-emerald-300 hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <input
            type="password"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="Paste Gemini API key (AIzaSy...)"
            className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-emerald-950 border border-emerald-600 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
          />
          <div className="flex items-center justify-between">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:underline text-[10px] flex items-center gap-1"
            >
              <span>Get free key</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
            <div className="flex items-center gap-1.5">
              {activeApiKey && (
                <button
                  onClick={() => {
                    setLocalGeminiApiKey('');
                    setActiveApiKey('');
                    setApiKeyInput('');
                    setShowApiKeyModal(false);
                  }}
                  className="text-[10px] px-2 py-1 rounded border border-red-400/40 text-red-300"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => {
                  setLocalGeminiApiKey(apiKeyInput.trim());
                  setActiveApiKey(getActiveGeminiApiKey());
                  setShowApiKeyModal(false);
                }}
                className="text-[10px] font-bold px-3 py-1 rounded bg-amber-400 text-emerald-950 shadow-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Prompts Bar */}
      <div className="bg-emerald-50/80 dark:bg-slate-800/80 px-3 py-1.5 overflow-x-auto flex items-center gap-1.5 no-scrollbar border-b border-emerald-100 dark:border-slate-700">
        <span className="text-[9px] uppercase font-bold text-emerald-800 dark:text-emerald-300 shrink-0 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-amber-500" /> Prompts:
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.query, p.tab, p.action)}
            className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs touch-bounce"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-900/60">
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${isAssistant ? 'justify-start' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="h-7 w-7 rounded-xl bg-gradient-to-tr from-emerald-800 to-green-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-1 ${isAssistant ? '' : 'text-right'}`}>
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isAssistant
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700/80 rounded-tl-xs'
                      : 'bg-emerald-700 text-white rounded-tr-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {msg.actionTab && (
                    <button
                      onClick={() => setActiveTab(msg.actionTab as any)}
                      className="mt-2.5 inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] border border-emerald-300 dark:border-emerald-700 touch-bounce"
                    >
                      <span>{msg.actionLabel || 'View Action'}</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${isAssistant ? '' : 'justify-end'}`}>
                  <span>{msg.timestamp}</span>
                  {isAssistant && (
                    <button
                      onClick={() => toggleSpeak(msg.id, msg.text)}
                      className="flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400 font-semibold"
                    >
                      {speakingId === msg.id ? (
                        <>
                          <VolumeX className="h-3 w-3 text-rose-500 animate-pulse" />
                          <span className="text-rose-500">Stop</span>
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
                <div className="h-7 w-7 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-2xs">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-slate-500 pl-1">
            <div className="h-6 w-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 flex items-center justify-center animate-spin">
              <Sparkles className="h-3 w-3" />
            </div>
            <span className="italic text-[11px]">Vypaar Saathi is analyzing local rates...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Listening Active Alert */}
      {isListening && (
        <div className="bg-rose-50 dark:bg-rose-950/80 px-3 py-1.5 flex items-center justify-between text-[11px] text-rose-700 dark:text-rose-300 border-t border-rose-200 animate-pulse">
          <span className="flex items-center gap-1.5 font-bold">
            <Mic className="h-3.5 w-3.5" /> Listening in {language}... Speak your question!
          </span>
          <button onClick={toggleListening} className="underline font-bold">
            Stop
          </button>
        </div>
      )}

      {/* Input Box Bar */}
      <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-1.5"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about loans, subsidies, mandi rates..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-600"
          />

          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-xl border transition-all touch-bounce ${
              isListening
                ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
            title="Voice input"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          <button
            type="submit"
            disabled={!inputMessage.trim() || isThinking}
            className="p-2.5 rounded-xl bg-emerald-700 text-white font-bold disabled:opacity-40 touch-bounce shadow-md"
            title="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
