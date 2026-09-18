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
  Heart,
  Camera,
  Image as ImageIcon,
  X,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { SafetyCheckInStatus } from '../../types';
import { LiveCameraCaptureModal } from './LiveCameraCaptureModal';
import { ImageLightboxModal } from '../common/ImageLightboxModal';

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
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // Lightbox view
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxCaption, setLightboxCaption] = useState<string | null>(null);
  const [lightboxSender, setLightboxSender] = useState<string | null>(null);
  const [lightboxTimestamp, setLightboxTimestamp] = useState<string | null>(null);

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
    if (!chatMessage.trim() && !attachedImage) return;

    sendCommunityMessage(
      chatMessage.trim() || 'On-scene field photograph transmitted.',
      'Citizen',
      citizenName || 'Resident (You)',
      currentSector,
      undefined,
      attachedImage || undefined
    );
    setChatMessage('');
    setAttachedImage(null);
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
        <div className="bg-beige-50 border border-beige-200 rounded-xl p-3 max-h-[340px] overflow-y-auto space-y-2.5">
          {sectorMessages.map((msg) => {
            const isMe = msg.senderType === 'Citizen';
            return (
              <div
                key={msg.id}
                className={`p-3 rounded-xl text-xs space-y-2 shadow-sm ${
                  isMe 
                    ? 'bg-white border-2 border-red-200 ml-4' 
                    : 'bg-stone-800 text-white mr-4'
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

                <p className={`text-xs font-medium leading-relaxed ${isMe ? 'text-stone-800' : 'text-stone-100'}`}>
                  {msg.text}
                </p>

                {/* Transmitted On-Scene Image Attachment */}
                {msg.imageUrl && (
                  <div className="space-y-1 pt-1">
                    <div 
                      onClick={() => {
                        setLightboxImage(msg.imageUrl || null);
                        setLightboxCaption(msg.text);
                        setLightboxSender(msg.senderName);
                        setLightboxTimestamp(msg.timestamp);
                      }}
                      className="group relative rounded-xl overflow-hidden border border-stone-300 dark:border-stone-700 bg-black/5 cursor-pointer max-w-sm"
                    >
                      <img 
                        src={msg.imageUrl} 
                        alt="Transmitted incident evidence" 
                        className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 shadow">
                          <Maximize2 className="w-3 h-3" />
                          <span>Tap to view full telemetry</span>
                        </span>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-stone-900/80 backdrop-blur-sm px-2 py-1 flex items-center justify-between text-[10px] text-white">
                        <span className="flex items-center gap-1">
                          <Camera className="w-3 h-3 text-red-400" />
                          <span>Field Photo Evidence</span>
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Attached Photo Preview Bar (before sending) */}
        {attachedImage && (
          <div className="p-2.5 rounded-xl bg-red-50 border-2 border-red-200 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src={attachedImage} 
                alt="Selected preview" 
                className="w-12 h-12 rounded-lg object-cover border border-red-300 shrink-0 cursor-pointer"
                onClick={() => {
                  setLightboxImage(attachedImage);
                  setLightboxCaption('Draft photograph ready for dispatch');
                }}
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-red-950 block truncate flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>On-Scene Photo Attached</span>
                </span>
                <span className="text-[10px] text-red-700 font-medium block truncate">
                  Ready to transmit directly to NDRF & TNFRS rescue units
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsCameraModalOpen(true)}
                className="px-2 py-1 rounded-lg bg-white border border-red-200 text-stone-700 hover:text-stone-900 text-[11px] font-bold"
              >
                Retake
              </button>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="p-1 rounded-lg bg-white border border-red-200 text-red-600 hover:text-red-700"
                title="Remove Photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Reply Box */}
        <form onSubmit={handleSendChat} className="space-y-2">
          <div className="flex gap-2">
            {/* Capture / Attach Image Button */}
            <button
              type="button"
              onClick={() => setIsCameraModalOpen(true)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                attachedImage 
                  ? 'bg-red-100 text-red-900 border-red-300' 
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
              }`}
              title="Capture On-Scene Photo (Camera / Upload)"
            >
              <Camera className="w-4 h-4 text-red-600" />
              <span className="hidden sm:inline font-mono">Photo</span>
            </button>

            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder={attachedImage ? "Add situation note (optional)..." : "Type message or capture on-scene photo..."}
              className="flex-1 bg-beige-50 border border-beige-300 rounded-xl px-3 py-2 text-xs text-stone-900 outline-none focus:border-red-500 focus:bg-white font-medium"
            />

            <button
              type="submit"
              disabled={!chatMessage.trim() && !attachedImage}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-stone-500 px-1 font-mono">
            <span>Direct link to GCC Disaster Control & NDRF</span>
            <button 
              type="button" 
              onClick={() => setIsCameraModalOpen(true)}
              className="text-red-600 hover:underline flex items-center gap-1 font-bold"
            >
              <Sparkles className="w-3 h-3" />
              <span>Send On-Scene Photo</span>
            </button>
          </div>
        </form>
      </div>

      {/* Camera Capture Modal */}
      <LiveCameraCaptureModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onPhotoCaptured={(dataUrl) => setAttachedImage(dataUrl)}
        sectorName={currentSector}
      />

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={Boolean(lightboxImage)}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage}
        caption={lightboxCaption || undefined}
        senderName={lightboxSender || undefined}
        timestamp={lightboxTimestamp || undefined}
      />
    </div>
  );
};
