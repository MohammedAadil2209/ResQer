import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Square, Play, ArrowLeft, Check, Edit3, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

interface AIStructuredVoiceData {
  hazard: string;
  location: string;
  people: number;
  vulnerability: string;
  severity: string;
  trend: string;
  notes: string;
}

const SAMPLE_SPEECHES = [
  "There are elderly people trapped inside the school and the road is flooded.",
  "Car crash on OMR Expressway near Perungudi with smoke coming from the engine.",
  "Transformer exploded near Royapuram harbour with sparking live wires."
];

export const VoxRescueModal: React.FC = () => {
  const { setCitizenView, submitVoiceEmergency } = useEmergency();

  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiStructured, setAiStructured] = useState<AIStructuredVoiceData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const timerRef = useRef<any>(null);

  // Audio waveform animation simulation
  const [waveHeights, setWaveHeights] = useState<number[]>([12, 18, 24, 30, 42, 36, 28, 18, 14, 22, 38, 20]);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 45) + 10));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const startRecording = (prefilledText?: string) => {
    setIsRecording(true);
    setRecordSeconds(0);
    setAiStructured(null);
    setIsEditing(false);
    setTranscript('');

    timerRef.current = setInterval(() => {
      setRecordSeconds(prev => prev + 1);
    }, 1000);

    // If prefilled test phrase or simulate live recording
    const targetText = prefilledText || "There are elderly people trapped inside the school and the road is flooded.";

    // Simulate speech accumulation
    setTimeout(() => {
      setTranscript(targetText.slice(0, 32) + '...');
    }, 1200);

    setTimeout(() => {
      setTranscript(targetText);
    }, 2500);
  };

  const stopRecordingAndAnalyze = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    setIsProcessing(true);

    const spoken = transcript || "There are elderly people trapped inside the school and the road is flooded.";

    setTimeout(() => {
      // AI extraction logic
      if (spoken.toLowerCase().includes('school') || spoken.toLowerCase().includes('flood')) {
        setAiStructured({
          hazard: 'Flood',
          location: 'Guru Nanak College — Zone 13 - Velachery',
          people: 20,
          vulnerability: 'Elderly citizens & children',
          severity: 'High',
          trend: 'Worsening (Rising water)',
          notes: spoken
        });
      } else if (spoken.toLowerCase().includes('crash') || spoken.toLowerCase().includes('car')) {
        setAiStructured({
          hazard: 'Accident',
          location: 'OMR IT Corridor — Zone 14 - Perungudi',
          people: 4,
          vulnerability: 'Trapped passengers',
          severity: 'High',
          trend: 'Smoke hazard active',
          notes: spoken
        });
      } else {
        setAiStructured({
          hazard: 'Emergency Incident',
          location: 'Zone 13 - Velachery',
          people: 2,
          vulnerability: 'Vulnerable residents',
          severity: 'High',
          trend: 'Ongoing',
          notes: spoken
        });
      }
      setIsProcessing(false);
    }, 1000);
  };

  const handleConfirmAndSend = () => {
    if (!aiStructured) return;
    submitVoiceEmergency(aiStructured);
    setCitizenView('confirmation');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCitizenView('home')}
            className="flex items-center gap-1.5 text-sm text-stone-700 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 px-3 py-1.5 rounded-lg border border-beige-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel</span>
          </button>

          <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
            VOXRESCUE AI 2.0
          </span>
        </div>

        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            SPEAK YOUR EMERGENCY
          </h1>
          <p className="text-sm text-stone-600 max-w-md mx-auto mt-1 font-medium">
            You can speak naturally. RESQER will organize the information.
          </p>
        </div>

        {/* Center Microphone / Waveform Box */}
        {!aiStructured && (
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white border-2 border-beige-300 shadow-lg relative overflow-hidden">
            {/* Soft backdrop radial glow */}
            <div className={`absolute w-64 h-64 rounded-full filter blur-3xl transition-opacity duration-500 pointer-events-none ${
              isRecording ? 'bg-red-200/40 opacity-100' : 'bg-beige-200/30 opacity-70'
            }`} />

            {/* Listening status */}
            <div className="h-8 flex items-center justify-center mb-4 z-10">
              {isRecording ? (
                <div className="flex items-center gap-2 bg-red-100 text-red-800 border border-red-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase font-mono">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span>LISTENING ({recordSeconds}s)</span>
                </div>
              ) : isProcessing ? (
                <div className="flex items-center gap-2 text-stone-700 text-xs font-bold">
                  <Sparkles className="w-4 h-4 animate-spin text-red-600" />
                  <span>AI structuring voice intelligence...</span>
                </div>
              ) : (
                <span className="text-xs text-stone-600 font-medium">
                  Tap microphone or use sample emergency below
                </span>
              )}
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-xs mb-6 z-10">
              {waveHeights.map((h, i) => (
                <div
                  key={i}
                  style={{ height: isRecording ? `${h}px` : '6px' }}
                  className={`w-1.5 rounded-full transition-all duration-100 ${
                    isRecording ? 'bg-red-600' : 'bg-beige-300'
                  }`}
                />
              ))}
            </div>

            {/* Primary Mic Button */}
            <div className="relative z-10 mb-4">
              {!isRecording ? (
                <button
                  id="btn-start-voxrescue"
                  onClick={() => startRecording()}
                  disabled={isProcessing}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center shadow-xl shadow-red-600/30 border-2 border-red-700 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-red-500/30"
                  aria-label="Start recording voice emergency"
                >
                  <Mic className="w-10 h-10 stroke-[2.2] text-white" />
                  <span className="text-[11px] font-black uppercase tracking-wider mt-1 text-white">
                    TAP TO SPEAK
                  </span>
                </button>
              ) : (
                <button
                  id="btn-stop-voxrescue"
                  onClick={stopRecordingAndAnalyze}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-stone-900 hover:bg-black text-white flex flex-col items-center justify-center shadow-xl shadow-stone-900/40 active:scale-95 transition-all border-2 border-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-500/30"
                  aria-label="Stop recording voice emergency"
                >
                  <Square className="w-8 h-8 fill-current" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider mt-1">
                    DONE
                  </span>
                </button>
              )}
            </div>

            {/* Live Transcript text box */}
            {transcript && (
              <div className="z-10 w-full mt-2 p-3 bg-beige-50 border border-beige-300 rounded-xl text-center">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block mb-0.5 font-mono font-bold">Spoken Transcription</span>
                <p className="text-sm text-stone-900 font-medium italic">"{transcript}"</p>
              </div>
            )}

            {/* Sample quick voice prompts for instant testing */}
            {!isRecording && !isProcessing && (
              <div className="w-full mt-4 pt-4 border-t border-beige-200 z-10">
                <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-2 text-center font-mono">
                  Or test with sample voice report:
                </span>
                <div className="space-y-1.5">
                  {SAMPLE_SPEECHES.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => startRecording(sample)}
                      className="w-full text-left p-2.5 rounded-lg bg-beige-50 hover:bg-beige-100 border border-beige-300 text-xs text-stone-800 hover:text-stone-900 transition-colors flex items-center justify-between font-medium"
                    >
                      <span className="truncate">"{sample}"</span>
                      <Play className="w-3 h-3 text-red-600 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI UNDERSTANDING CARD */}
        {aiStructured && (
          <div className="rounded-2xl bg-white border border-beige-300 p-5 sm:p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-beige-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                  AI UNDERSTANDING
                </h2>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1 text-xs text-stone-800 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 border border-beige-300 px-2.5 py-1 rounded-md font-medium"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditing ? 'Done' : 'Edit'}</span>
              </button>
            </div>

            {/* Structured Fields */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-beige-50 border border-beige-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block font-mono">
                  HAZARD
                </span>
                {isEditing ? (
                  <input
                    aria-label="Edit emergency hazard"
                    type="text"
                    value={aiStructured.hazard}
                    onChange={(e) => setAiStructured({ ...aiStructured, hazard: e.target.value })}
                    className="w-full bg-white text-stone-900 rounded px-2 py-1 mt-1 text-sm border border-beige-300"
                  />
                ) : (
                  <span className="text-base font-bold text-stone-900 mt-0.5 block">
                    {aiStructured.hazard}
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-beige-50 border border-beige-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block font-mono">
                  LOCATION
                </span>
                {isEditing ? (
                  <input
                    aria-label="Edit emergency location"
                    type="text"
                    value={aiStructured.location}
                    onChange={(e) => setAiStructured({ ...aiStructured, location: e.target.value })}
                    className="w-full bg-white text-stone-900 rounded px-2 py-1 mt-1 text-sm border border-beige-300"
                  />
                ) : (
                  <span className="text-base font-bold text-stone-900 mt-0.5 block truncate">
                    {aiStructured.location}
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-beige-50 border border-beige-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block font-mono">
                  PEOPLE
                </span>
                {isEditing ? (
                  <input
                    aria-label="Edit people count"
                    type="number"
                    value={aiStructured.people}
                    onChange={(e) => setAiStructured({ ...aiStructured, people: parseInt(e.target.value) || 1 })}
                    className="w-full bg-white text-stone-900 rounded px-2 py-1 mt-1 text-sm border border-beige-300"
                  />
                ) : (
                  <span className="text-base font-bold text-stone-900 mt-0.5 block">
                    Approximately {aiStructured.people}
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-beige-50 border border-beige-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block font-mono">
                  VULNERABILITY
                </span>
                {isEditing ? (
                  <input
                    aria-label="Edit vulnerability description"
                    type="text"
                    value={aiStructured.vulnerability}
                    onChange={(e) => setAiStructured({ ...aiStructured, vulnerability: e.target.value })}
                    className="w-full bg-white text-stone-900 rounded px-2 py-1 mt-1 text-sm border border-beige-300"
                  />
                ) : (
                  <span className="text-base font-bold text-stone-800 mt-0.5 block truncate">
                    {aiStructured.vulnerability}
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-beige-50 border border-beige-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block font-mono">
                  SEVERITY
                </span>
                <span className="text-base font-bold text-red-700 mt-0.5 block">
                  {aiStructured.severity}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-beige-50 border border-beige-200">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block font-mono">
                  TREND
                </span>
                <span className="text-base font-bold text-stone-800 mt-0.5 block">
                  {aiStructured.trend}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-beige-50 border border-beige-200 text-xs">
              <span className="text-stone-600 block font-bold mb-1">Spoken Content:</span>
              <p className="text-stone-900 italic font-medium">"{aiStructured.notes}"</p>
            </div>

            <div className="p-2.5 rounded-lg bg-beige-100 border border-beige-300 text-[11px] text-stone-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Review before transmitting. Verified voice interpretation is routed directly to rescue dispatch.</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 pt-4 border-t border-beige-200">
        {aiStructured ? (
          <div className="space-y-2">
            <button
              id="btn-confirm-send-voice"
              onClick={handleConfirmAndSend}
              className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/20 border border-red-700 active:scale-[0.99] flex items-center justify-center gap-2 transition-all"
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>CONFIRM &amp; SEND</span>
            </button>
            <button
              id="btn-re-record-voice"
              onClick={() => {
                setAiStructured(null);
                setTranscript('');
              }}
              className="w-full py-2.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
            >
              Record Again
            </button>
          </div>
        ) : (
          <p className="text-xs text-center text-stone-500 font-medium">
            Emergency audio is processed locally and securely summarized for dispatchers.
          </p>
        )}
      </div>
    </div>
  );
};
