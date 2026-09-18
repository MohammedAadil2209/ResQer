import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Send, 
  MessageSquare, 
  Users, 
  MapPin, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Radio, 
  Truck, 
  User,
  Heart
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { SafetyCheckInStatus } from '../../types';

export const CitizenCheckInCommsView: React.FC = () => {
  const { 
    communityMessages, 
    sendCommunityMessage, 
    submitSafetyCheckIn, 
    safetyCheckIns, 
    citizenDraft, 
    setCitizenView, 
    addToast 
  } = useEmergency();

  // Safety Check-in Form
  const [citizenName, setCitizenName] = useState('Resident (You)');
  const [checkStatus, setCheckStatus] = useState<SafetyCheckInStatus>('SAFE');
  const [peopleCount, setPeopleCount] = useState(2);
  const [checkNotes, setCheckNotes] = useState('We are on second floor, power is off, water clean.');
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  // Chat message form
  const [chatMessage, setChatMessage] = useState('');

  const currentSector = citizenDraft.locationSector || 'Zone 13 - Velachery';
  const sectorMessages = communityMessages.filter(m => m.sector === currentSector);

  const handleSafetySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSafetyCheckIn({
      citizenName,
      sector: currentSector,
      status: checkStatus,
      peopleCount: Number(peopleCount),
      notes: checkNotes,
      contact: 'Citizen App Direct'
    });
    setHasCheckedIn(true);
    addToast(`Safety check-in registered: ${checkStatus}`, 'success');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    sendCommunityMessage(
      chatMessage,
      'Citizen',
      citizenName || 'Resident',
      currentSector
    );
    setChatMessage('');
    addToast('Message sent to emergency responders', 'info');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCitizenView('home')}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 border border-beige-300 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-mono text-stone-600 bg-beige-100 px-2.5 py-1 rounded border border-beige-300">
          <MapPin className="w-3.5 h-3.5 text-red-600" />
          <span>{currentSector}</span>
        </div>
      </div>

      {/* SECTION 1: Safety Status Check-In */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-beige-300 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-600" />
            <h1 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide">
              CITIZEN SAFETY CHECK-IN
            </h1>
          </div>
          <span className="text-[10px] font-mono text-white bg-red-600 px-2 py-0.5 rounded font-bold">
            DIRECT TO DISPATCH
          </span>
        </div>

        <p className="text-xs text-stone-600">
          Let emergency response coordinators know if your household is safe, evacuated, or in immediate need of rescue assistance.
        </p>

        {hasCheckedIn ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Safety Status Transmitted to Command Center</span>
            </div>
            <p className="text-[11px] text-emerald-700">
              Status logged as <strong>{checkStatus}</strong> for {peopleCount} person(s) in {currentSector}. Coordinators and rescue teams have your report in the active registry.
            </p>
            <button
              onClick={() => setHasCheckedIn(false)}
              className="text-xs text-emerald-800 underline font-semibold mt-1 hover:no-underline"
            >
              Update or Change Check-In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSafetySubmit} className="space-y-3 text-xs">
            {/* Status Radio Buttons */}
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Your Current Safety Condition:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCheckStatus('SAFE')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    checkStatus === 'SAFE'
                      ? 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-sm'
                      : 'bg-beige-50 border-beige-300 text-stone-700 hover:bg-beige-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[11px] block">I Am Safe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCheckStatus('NEEDS_ASSISTANCE')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    checkStatus === 'NEEDS_ASSISTANCE'
                      ? 'bg-red-600 text-white border-red-700 font-bold shadow-sm animate-pulse'
                      : 'bg-beige-50 border-beige-300 text-stone-700 hover:bg-beige-100'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[11px] block">Need Assistance</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCheckStatus('EVACUATED')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    checkStatus === 'EVACUATED'
                      ? 'bg-blue-600 text-white border-blue-700 font-bold shadow-sm'
                      : 'bg-beige-50 border-beige-300 text-stone-700 hover:bg-beige-100'
                  }`}
                >
                  <Users className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[11px] block">Evacuated</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Household Headcount
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Number(e.target.value))}
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 font-mono outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Contact / Name
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Current Condition / Urgent Needs Notes
              </label>
              <textarea
                rows={2}
                value={checkNotes}
                onChange={(e) => setCheckNotes(e.target.value)}
                placeholder="e.g. Water at porch level, 1 elderly family member requires wheelchair assistance..."
                className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 outline-none focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
            >
              TRANSMIT SAFETY CHECK-IN TO RESQER
            </button>
          </form>
        )}
      </div>

      {/* SECTION 2: Direct Two-Way Messenger with Dispatchers */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-beige-300 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-beige-200">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide">
              DIRECT COMMS WITH RESPONSE TEAMS
            </h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            <span>DISPATCH ONLINE</span>
          </span>
        </div>

        {/* Message Feed */}
        <div className="bg-beige-50 border border-beige-200 rounded-xl p-3 max-h-[300px] overflow-y-auto space-y-2.5">
          {sectorMessages.map((msg) => {
            const isMe = msg.senderType === 'Citizen';
            return (
              <div
                key={msg.id}
                className={`p-2.5 rounded-xl text-xs space-y-1 shadow-sm ${
                  isMe 
                    ? 'bg-white border-2 border-red-200 ml-6' 
                    : 'bg-stone-800 text-white mr-6'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold flex items-center gap-1">
                    {isMe ? <User className="w-3 h-3 text-red-600" /> : <Truck className="w-3 h-3 text-red-400" />}
                    <span>{msg.senderName}</span>
                    <span className={`px-1 rounded text-[9px] font-mono ${isMe ? 'bg-red-100 text-red-800' : 'bg-stone-700 text-stone-200'}`}>
                      {msg.senderType}
                    </span>
                  </span>
                  <span className="font-mono opacity-75">{msg.timestamp}</span>
                </div>
                <p className={`text-xs font-medium ${isMe ? 'text-stone-800' : 'text-stone-100'}`}>
                  {msg.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <form onSubmit={handleSendChat} className="flex gap-2">
          <input
            type="text"
            required
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type a message to on-scene rescue teams..."
            className="flex-1 bg-beige-50 border border-beige-300 rounded-xl px-3 py-2 text-xs text-stone-900 outline-none focus:border-red-500 focus:bg-white font-medium"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
