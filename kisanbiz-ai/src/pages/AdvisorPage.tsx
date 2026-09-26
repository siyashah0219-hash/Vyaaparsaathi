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
  const { profile, financialResult, financialInput, language } = useApp();

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
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
            Interactive Voice & Text Assistant
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 mt-1">
            Talk to VYPAAR SAATHI AI Advisor
          </h1>
          <p className="text-gray-600 text-xs mt-0.5">
            Ask in Hindi, Marathi, or English. Audio read-aloud available for all responses.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs text-emerald-950 font-bold">
          <Sparkles className="h-4 w-4 text-amber-500" /> Tailored to {profile.name}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-emerald-200 shadow-md flex flex-col h-[580px] overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-emerald-900 text-white p-4 px-6 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">VYPAAR SAATHI AI Advisor</p>
              <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live External API Connected ({profile.district})
              </p>
            </div>
          </div>

          <div className="text-xs text-amber-300 font-bold bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-700">
            Language: {language}
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-emerald-50/30">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSpeaking = isSpeakingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-800 text-white'
                  }`}
                >
                  {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs relative ${
                      isUser
                        ? 'bg-emerald-800 text-white rounded-tr-none'
                        : 'bg-white text-emerald-950 border border-emerald-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {!isUser && (
                      <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-2 text-[10px]">
                        <span className="text-gray-400">{msg.timestamp}</span>
                        <button
                          onClick={() => speakText(msg.id, msg.text)}
                          className={`flex items-center gap-1 px-2 py-1 rounded font-bold transition-colors ${
                            isSpeaking
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'text-emerald-700 hover:bg-emerald-50'
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
                          onClick={() => handleSendMessage(act)}
                          className="text-[11px] font-bold text-emerald-800 bg-white hover:bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full shadow-2xs transition-colors flex items-center gap-1"
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
            <div className="flex gap-3 max-w-[85%] mr-auto items-center text-xs text-emerald-800 bg-white border border-emerald-200 rounded-2xl p-3 px-4 shadow-2xs">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-700" />
              <span>Analyzing market context and generating response...</span>
            </div>
          )}
        </div>

        {/* Input Controls Footer */}
        <div className="bg-white p-3 sm:p-4 border-t border-emerald-200 space-y-2">
          {isListening && (
            <div className="bg-amber-100 border border-amber-300 text-amber-900 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 animate-pulse">
              <Mic className="h-4 w-4 text-red-600" /> Listening to your voice... Speak now in {language}.
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={toggleListening}
              className={`p-3 rounded-xl border transition-all ${
                isListening
                  ? 'bg-red-600 text-white border-red-700 animate-pulse'
                  : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
              }`}
              title="Voice Input (Mic)"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5 text-amber-800" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Ask your question in ${language}... (or tap mic to speak)`}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isThinking}
              className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <Send className="h-4 w-4" /> Send
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
