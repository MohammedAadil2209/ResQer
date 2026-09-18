import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users, 
  Truck, 
  ShieldCheck, 
  PhoneCall, 
  AlertCircle, 
  RefreshCw,
  PlusCircle,
  Camera,
  Maximize2,
  X
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { LiveCameraCaptureModal } from './LiveCameraCaptureModal';
import { ImageLightboxModal } from '../common/ImageLightboxModal';

export const EmergencyStatusView: React.FC = () => {
  const { 
    setCitizenView, 
    activeCitizenIncidentId, 
    incidents,
    citizenDraft,
    addToast,
    addIncidentTimelineEvent,
    sendCommunityMessage
  } = useEmergency();

  const [updateNote, setUpdateNote] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const incident = incidents.find(i => i.id === activeCitizenIncidentId) || incidents[0];

  const handleSendUpdate = () => {
    if (!updateNote.trim() && !attachedImage) return;

    if (addIncidentTimelineEvent) {
      addIncidentTimelineEvent(
        incident.id, 
        attachedImage ? 'Field Photo Update' : 'Citizen Situation Update',
        updateNote.trim() || 'Resident submitted on-scene situation photo to dispatch.',
        attachedImage || undefined
      );
    }

    if (sendCommunityMessage) {
      sendCommunityMessage(
        updateNote.trim() || 'Updated field photo submitted for incident ' + incident.id,
        'Citizen',
        `Resident (Incident #${incident.id})`,
        incident.sector,
        incident.id,
        attachedImage || undefined
      );
    }

    addToast('Update & photo attached to incident ' + incident.id, 'success');
    setUpdateNote('');
    setAttachedImage(null);
    setShowAddUpdate(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCitizenView('home')}
            className="flex items-center gap-1.5 text-sm text-stone-700 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 px-3 py-1.5 rounded-lg border border-beige-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Emergency Home</span>
          </button>

          {/* DEMO DATA badge */}
          <span className="text-[10px] font-mono uppercase font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
            LIVE TELEMETRY
          </span>
        </div>

        {/* Title Area */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block font-mono">
            YOUR EMERGENCY
          </span>
          <div className="flex items-center justify-between mt-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              #{incident.id}
            </h1>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              {incident.status === 'Active' ? 'Response Coordinating' : incident.status}
            </span>
          </div>
        </div>

        {/* Core Info Cards Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Location */}
          <div className="p-4 rounded-2xl bg-white border border-beige-300 shadow-sm">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Location</span>
            </div>
            <div className="text-base font-bold text-stone-900 truncate">
              {incident.sector}
            </div>
            <span className="text-[11px] text-stone-500 font-medium">Chennai Region, Tamil Nadu</span>
          </div>

          {/* Report / Hazard */}
          <div className="p-4 rounded-2xl bg-white border border-beige-300 shadow-sm">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span>Report</span>
            </div>
            <div className="text-base font-bold text-stone-900">
              {incident.type}
            </div>
            <span className="text-[11px] text-stone-500 font-medium">High severity condition</span>
          </div>

          {/* People Affected */}
          <div className="p-4 rounded-2xl bg-white border border-beige-300 shadow-sm">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
              <Users className="w-3.5 h-3.5 text-red-600" />
              <span>People Affected</span>
            </div>
            <div className="text-base font-bold text-stone-900">
              Approximately {incident.peopleAffected}
            </div>
            <span className="text-[11px] text-red-700 font-medium">Triage priority flagged</span>
          </div>

          {/* Response & ETA */}
          <div className="p-4 rounded-2xl bg-beige-50 border border-beige-300 shadow-sm">
            <div className="flex items-center gap-2 text-stone-600 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
              <Truck className="w-3.5 h-3.5 text-red-600" />
              <span>Response</span>
            </div>
            <div className="text-base font-bold text-stone-900 truncate">
              {incident.assignedResponder || 'Rescue Team assigned'}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3 h-3 text-red-600" />
              <span className="text-xs font-bold text-red-700 font-mono">ETA: ~12 min</span>
            </div>
          </div>
        </div>

        {/* Live Timeline */}
        <div className="p-5 rounded-2xl bg-white border border-beige-300 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-beige-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-mono">
              Response Timeline
            </h2>
            <span className="text-[11px] text-red-700 font-bold flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              Live Feed
            </span>
          </div>

          <div className="space-y-4">
            {incident.timeline.map((event, idx) => (
              <div key={idx} className="flex items-start gap-3 relative">
                {idx !== incident.timeline.length - 1 && (
                  <div className={`absolute left-2.5 top-5 bottom-0 w-0.5 ${
                    event.completed ? 'bg-red-400' : 'bg-beige-200'
                  }`} />
                )}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  event.completed 
                    ? 'bg-red-600 text-white ring-4 ring-red-100' 
                    : 'bg-beige-100 text-stone-400 border border-beige-300'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${event.completed ? 'bg-white' : 'bg-stone-400'}`} />
                </div>
                <div className="flex-1 -mt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-stone-600">
                      {event.time}
                    </span>
                    <span className={`text-sm font-semibold ${event.completed ? 'text-stone-900' : 'text-stone-500'}`}>
                      {event.label}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-xs text-stone-600 mt-0.5 font-medium">
                      {event.description}
                    </p>
                  )}

                  {event.imageUrl && (
                    <div className="mt-2">
                      <div
                        onClick={() => setLightboxImage(event.imageUrl || null)}
                        className="group relative rounded-xl overflow-hidden border border-stone-300 max-w-xs cursor-pointer shadow-sm"
                      >
                        <img
                          src={event.imageUrl}
                          alt="Timeline evidence"
                          className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-stone-900/80 px-2 py-0.5 text-[9px] text-white flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Camera className="w-2.5 h-2.5 text-red-400" />
                            <span>Photo Telemetry</span>
                          </span>
                          <span className="font-mono text-emerald-400">ENLARGE</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Report Update Drawer */}
        {showAddUpdate ? (
          <div className="p-4 rounded-xl bg-white border border-beige-300 shadow-md mb-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-stone-900 block">
                Send Additional Situation Update
              </span>
              <button
                type="button"
                onClick={() => setIsCameraModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-beige-100 hover:bg-beige-200 border border-beige-300 text-stone-800 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-red-600" />
                <span>{attachedImage ? 'Replace Photo' : 'Capture / Attach Photo'}</span>
              </button>
            </div>

            {attachedImage && (
              <div className="p-2 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={attachedImage}
                    alt="Draft preview"
                    className="w-10 h-10 rounded object-cover border border-red-300 cursor-pointer"
                    onClick={() => setLightboxImage(attachedImage)}
                  />
                  <div className="text-[11px]">
                    <span className="font-bold text-stone-900 block">On-Scene Photo Ready</span>
                    <span className="text-stone-500">Will attach to live incident timeline</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachedImage(null)}
                  className="p-1 text-stone-400 hover:text-red-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <input
              type="text"
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
              placeholder="e.g. Water reached 1st step, moved to second floor..."
              className="w-full bg-beige-50 border border-beige-300 text-stone-900 placeholder-stone-400 rounded-lg p-3 text-sm focus:border-red-500 focus:bg-white outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSendUpdate}
                disabled={!updateNote.trim() && !attachedImage}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs shadow transition-colors"
              >
                Send Update to Responders
              </button>
              <button
                onClick={() => {
                  setShowAddUpdate(false);
                  setAttachedImage(null);
                }}
                className="px-4 py-2 rounded-lg bg-beige-100 hover:bg-beige-200 text-stone-700 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddUpdate(true)}
            className="w-full mb-4 py-3 rounded-xl bg-beige-50 hover:bg-beige-100 border border-beige-300 text-stone-800 flex items-center justify-center gap-2 text-xs font-bold transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-red-600" />
            <span>REPORT UPDATE / NEW DETAILS</span>
          </button>
        )}
      </div>

      {/* Bottom Emergency Controls */}
      <div className="pt-4 border-t border-beige-200 flex items-center gap-3">
        <a
          href="tel:112"
          className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 border border-red-700"
        >
          <PhoneCall className="w-4 h-4 text-white" />
          <span>Call 112 / 108</span>
        </a>

        <button
          onClick={() => setCitizenView('home')}
          className="px-4 py-3.5 rounded-xl font-semibold text-xs text-stone-700 hover:text-stone-900 bg-beige-100 hover:bg-beige-200 border border-beige-300 transition-colors"
        >
          Return Home
        </button>
      </div>

      {/* Camera Capture Modal */}
      <LiveCameraCaptureModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onPhotoCaptured={(dataUrl) => setAttachedImage(dataUrl)}
        sectorName={incident.sector}
      />

      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={Boolean(lightboxImage)}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage}
        caption={`Incident #${incident.id} Telemetry`}
      />
    </div>
  );
};
