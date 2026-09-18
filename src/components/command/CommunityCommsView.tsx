import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Radio, 
  Megaphone,
  User,
  Truck,
  HeartHandshake,
  Filter
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { CommunityMessage, SafetyCheckIn } from '../../types';

export const CommunityCommsView: React.FC = () => {
  const { 
    communityMessages, 
    sendCommunityMessage, 
    safetyCheckIns, 
    assignResponderToIncident,
    addToast 
  } = useEmergency();

  const [filterSector, setFilterSector] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'messages' | 'safety'>('messages');
  const [replyText, setReplyText] = useState('');
  const [targetSector, setTargetSector] = useState('Sector B2');
  const [senderRole, setSenderRole] = useState<'Dispatcher' | 'Responder'>('Dispatcher');

  const filteredMessages = communityMessages.filter(m => {
    if (filterSector !== 'all' && m.sector !== filterSector) return false;
    return true;
  });

  const filteredCheckIns = safetyCheckIns.filter(c => {
    if (filterSector !== 'all' && c.sector !== filterSector) return false;
    return true;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    sendCommunityMessage(
      replyText,
      senderRole,
      senderRole === 'Dispatcher' ? 'RESQER Ops Center' : 'Unit Lead on Scene',
      targetSector
    );
    setReplyText('');
    addToast('Direct response message transmitted to community channel', 'success');
  };

  const handleQuickReply = (text: string) => {
    sendCommunityMessage(
      text,
      senderRole,
      senderRole === 'Dispatcher' ? 'RESQER Ops Center' : 'Unit Lead on Scene',
      targetSector
    );
    addToast('Quick guidance advisory transmitted', 'success');
  };

  const safeCount = safetyCheckIns.filter(c => c.status === 'SAFE' || c.status === 'EVACUATED').length;
  const assistCount = safetyCheckIns.filter(c => c.status === 'NEEDS_ASSISTANCE').length;
  const totalAccounted = safetyCheckIns.reduce((acc, c) => acc + c.peopleCount, 0);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      {/* Top Telemetry KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>COMMUNITY COMMS DISPATCH</span>
            <MessageSquare className="w-4 h-4 text-stone-800" />
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1 font-mono">{communityMessages.length}</div>
          <span className="text-[10px] text-emerald-700 font-medium">Real-time two-way bridge active</span>
        </div>

        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>CITIZENS ACCOUNTED FOR</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">{totalAccounted}</div>
          <span className="text-[10px] text-stone-500 font-medium">{safeCount} households checked in safe</span>
        </div>

        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>NEEDS URGENT ASSISTANCE</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-red-600 mt-1 font-mono">{assistCount}</div>
          <span className="text-[10px] text-red-600 font-bold uppercase">Priority triage required</span>
        </div>

        <div className="p-3.5 bg-white border border-beige-300 rounded-xl shadow-sm">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>AVERAGE LATENCY</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 mt-1 font-mono">18 sec</div>
          <span className="text-[10px] text-stone-500 font-medium">Direct dispatch turnaround</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-beige-300 rounded-2xl p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 shadow-sm">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-beige-200">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-red-600" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                COMMUNITY &lt;—&gt; RESPONSE TEAMS DIRECT COMMUNICATION
              </h2>
              <span className="text-[10px] font-mono text-white bg-red-600 px-1.5 py-0.2 rounded font-bold">
                SYSTEM OBJECTIVE #5
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5 font-medium">
              Enable direct two-way coordination, verification, and live safety check-ins between affected citizens and frontline emergency personnel.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-beige-100 p-1 rounded-xl flex items-center border border-beige-300">
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'messages' 
                    ? 'bg-red-600 text-white shadow-sm' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Two-Way Comms ({communityMessages.length})
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'safety' 
                    ? 'bg-red-600 text-white shadow-sm' 
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Safety Check-in Registry ({safetyCheckIns.length})
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Two-Way Comms Channel */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[460px]">
            {/* Left: Message Log Stream (7 cols) */}
            <div className="lg:col-span-7 bg-beige-50/70 border border-beige-200 rounded-xl p-3 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-beige-200 text-xs font-bold text-stone-700">
                <span className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-red-600" />
                  <span>LIVE TWO-WAY EMERGENCY DISPATCH FEED</span>
                </span>
                <span className="text-[10px] font-mono text-stone-500">
                  {filteredMessages.length} Messages
                </span>
              </div>

              {/* Messages list */}
              <div className="overflow-y-auto space-y-3 py-3 pr-1 max-h-[360px] flex-1">
                {filteredMessages.map((msg) => {
                  const isCitizen = msg.senderType === 'Citizen';
                  const isResponder = msg.senderType === 'Responder';
                  const isDispatcher = msg.senderType === 'Dispatcher';

                  return (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-xl text-xs space-y-1.5 shadow-sm transition-all ${
                        isCitizen
                          ? 'bg-white border-2 border-red-200 ml-0 mr-6'
                          : isResponder
                          ? 'bg-red-50 border border-red-300 ml-6 mr-0'
                          : 'bg-stone-800 text-white ml-4 mr-4'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 font-bold">
                          {isCitizen && <User className="w-3.5 h-3.5 text-red-600" />}
                          {isResponder && <Truck className="w-3.5 h-3.5 text-red-700" />}
                          {isDispatcher && <Radio className="w-3.5 h-3.5 text-red-400" />}
                          <span className={isDispatcher ? 'text-white' : 'text-stone-900'}>
                            {msg.senderName}
                          </span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                            isCitizen ? 'bg-red-100 text-red-800' :
                            isResponder ? 'bg-blue-100 text-blue-800' :
                            'bg-stone-700 text-stone-200'
                          }`}>
                            {msg.senderType}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-80">
                          <span>{msg.sector}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>

                      <p className={`text-xs font-medium leading-relaxed ${isDispatcher ? 'text-stone-200' : 'text-stone-800'}`}>
                        {msg.text}
                      </p>

                      {msg.incidentId && (
                        <div className="text-[10px] font-mono font-semibold text-red-600">
                          Linked: #{msg.incidentId}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick Reply Recommendations */}
              <div className="pt-2 border-t border-beige-200">
                <span className="text-[10px] font-mono text-stone-500 block mb-1 uppercase font-bold">
                  Quick Responder Broadcast Directives:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Rescue boat 04 is 3 minutes away. Wave a light from upper floor.',
                    'Shelter C is open on Road 3 with 275 beds available.',
                    'Power to Sector B2 isolated. Stay clear of electrical fixtures.'
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => handleQuickReply(phrase)}
                      className="px-2 py-1 rounded bg-white hover:bg-beige-100 border border-beige-300 text-[10px] text-stone-800 font-medium text-left truncate max-w-xs transition-colors"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Dispatcher Reply Composer (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-beige-300 rounded-xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 pb-2 border-b border-beige-200">
                  <Megaphone className="w-4 h-4 text-red-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
                    DISPATCH TWO-WAY RESPONSE
                  </h3>
                </div>

                <form onSubmit={handleSendMessage} className="mt-3 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Transmit As:
                      </label>
                      <select
                        value={senderRole}
                        onChange={(e) => setSenderRole(e.target.value as any)}
                        className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 font-semibold outline-none focus:border-red-500"
                      >
                        <option value="Dispatcher">Ops Dispatcher</option>
                        <option value="Responder">On-Scene Responder</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Target Sector Channel:
                      </label>
                      <select
                        value={targetSector}
                        onChange={(e) => setTargetSector(e.target.value)}
                        className="w-full bg-beige-50 border border-beige-300 rounded-lg p-2 text-stone-900 font-mono outline-none focus:border-red-500"
                      >
                        <option value="Sector B2">Sector B2 (River Valley)</option>
                        <option value="Sector B1">Sector B1 (Civic/Medical)</option>
                        <option value="Sector A1">Sector A1 (Industrial)</option>
                        <option value="Sector C4">Sector C4 (Transit)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Direct Operational Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type life-safety guidance, ETA updates, or verification queries directly to citizens..."
                      className="w-full bg-beige-50 border border-beige-300 rounded-xl p-3 text-stone-900 font-medium outline-none focus:border-red-500 focus:bg-white text-xs leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>TRANSMIT TO COMMUNITY CHANNEL</span>
                  </button>
                </form>
              </div>

              <div className="p-3 rounded-lg bg-beige-50 border border-beige-200 text-[11px] text-stone-600 space-y-1">
                <span className="font-bold text-stone-900 block">Verified Communication Corridor</span>
                <p>
                  Transmissions from this panel are synchronized across the Citizen Emergency app, SMS relays, and field tablet displays.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Safety Check-in Registry */}
        {activeTab === 'safety' && (
          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredCheckIns.map((check) => {
                const isUrgent = check.status === 'NEEDS_ASSISTANCE';
                const isEvacuated = check.status === 'EVACUATED';

                return (
                  <div
                    key={check.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 shadow-sm ${
                      isUrgent 
                        ? 'bg-red-50/50 border-red-300 hover:border-red-500' 
                        : 'bg-white border-beige-300 hover:border-beige-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                          isUrgent ? 'bg-red-600 text-white animate-pulse border-red-700' :
                          isEvacuated ? 'bg-blue-100 text-blue-800 border-blue-300' :
                          'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}>
                          {check.status.replace('_', ' ')}
                        </span>

                        <span className="text-[10px] font-mono text-stone-600">
                          {check.timestamp}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-stone-900">
                        {check.citizenName}
                      </h4>

                      <div className="flex items-center gap-2 text-xs font-mono text-stone-600 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-600" />
                          <span>{check.sector}</span>
                        </span>
                        <span>•</span>
                        <span>{check.peopleCount} Household Members</span>
                      </div>

                      <p className="text-xs text-stone-700 mt-2 p-2 rounded-lg bg-beige-50 border border-beige-200 leading-relaxed font-medium">
                        "{check.notes}"
                      </p>

                      {check.contact && (
                        <div className="mt-2 text-[11px] font-mono text-stone-500">
                          Phone: {check.contact}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-beige-200">
                      {isUrgent ? (
                        <button
                          onClick={() => {
                            assignResponderToIncident('INC-0241', 'Amphibious Swiftwater 02');
                            addToast(`Assigned rescue squad to assist ${check.citizenName}`, 'success');
                          }}
                          className="w-full py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
                        >
                          <Truck className="w-3 h-3" />
                          <span>DISPATCH RESCUE TO HOUSEHOLD</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Accounted for &amp; verified safe</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
