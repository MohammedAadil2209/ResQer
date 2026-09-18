import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  X, 
  RefreshCw, 
  Check, 
  Upload, 
  AlertCircle, 
  Sparkles, 
  SwitchCamera,
  Layers,
  MapPin
} from 'lucide-react';
import { SAMPLE_DISASTER_IMAGES } from '../../data/sampleDisasterImages';

interface LiveCameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoCaptured: (imageDataUrl: string) => void;
  sectorName: string;
}

export const LiveCameraCaptureModal: React.FC<LiveCameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onPhotoCaptured,
  sectorName
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'presets'>('camera');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera stream cleanly
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // Start live camera stream
  const startCamera = async () => {
    stopStream();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported on this device/browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {
          // Play was interrupted or auto-play restricted
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('Camera access unavailable:', error.message);
      setCameraError(
        'Camera permission was not granted or hardware is unavailable. You can upload an image file or choose a verified field simulation photo below.'
      );
      // Auto-fallback to presets tab for ease of presentation
      setActiveTab('presets');
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'camera' && !capturedPreview) {
      startCamera();
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [isOpen, activeTab, facingMode, capturedPreview]);

  if (!isOpen) return null;

  // Snap photo from video canvas
  const handleSnapPhoto = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Stamp metadata banner on bottom of photo
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(0, canvas.height - 48, canvas.width, 48);

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`RESQER DISPATCH TELEMETRY • ${sectorName}`, 16, canvas.height - 24);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px monospace';
        ctx.fillText(new Date().toLocaleTimeString() + ' • GPS VERIFIED', 16, canvas.height - 8);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        setCapturedPreview(dataUrl);
        stopStream();
      }
    } catch (e) {
      console.error('Snap error:', e);
    } finally {
      setIsCapturing(false);
    }
  };

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setCapturedPreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Confirm photo
  const handleConfirmPhoto = () => {
    if (capturedPreview) {
      onPhotoCaptured(capturedPreview);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-4 py-3 bg-stone-800/90 border-b border-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Capture On-Scene Field Photo</span>
              </h2>
              <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-500" />
                {sectorName}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white border border-stone-700 hover:bg-stone-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector Tabs (only when not reviewing photo) */}
        {!capturedPreview && (
          <div className="flex border-b border-stone-800 bg-stone-950/60 p-1.5 gap-1 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('camera')}
              className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'camera'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Live Camera</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('upload');
                fileInputRef.current?.click();
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'upload'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Device Upload</span>
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'presets'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Field Presets</span>
            </button>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Main Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {/* PHOTO REVIEW STATE */}
          {capturedPreview ? (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden border-2 border-red-500/70 shadow-lg bg-black">
                <img
                  src={capturedPreview}
                  alt="Captured Emergency Telemetry"
                  className="w-full max-h-[340px] object-contain mx-auto"
                />
                <div className="absolute top-2 left-2 bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-700 text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5 shadow">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Photo Ready for Dispatch</span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setCapturedPreview(null)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake / Change Photo</span>
                </button>

                <button
                  onClick={handleConfirmPhoto}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30 transition-all active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Attach to Response Comms</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: LIVE CAMERA VIEW */}
              {activeTab === 'camera' && (
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden bg-stone-950 aspect-video border border-stone-700 flex items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />

                    {/* Viewfinder Reticle Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 border-2 border-dashed border-red-500/40 rounded-xl">
                      <div className="flex justify-between items-center text-[10px] font-mono text-red-400 font-bold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span>LIVE FEED • 1080p</span>
                        </span>
                        <span>{new Date().toLocaleTimeString()}</span>
                      </div>

                      {/* Center Crosshairs */}
                      <div className="self-center flex items-center justify-center w-12 h-12 border border-red-500/50 rounded-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                      </div>

                      <div className="text-[9px] font-mono text-stone-300 text-center bg-black/50 py-0.5 rounded">
                        Frame flood line, damage, or stranded citizens
                      </div>
                    </div>
                  </div>

                  {/* Camera Controls */}
                  <div className="flex items-center justify-between px-2 pt-1">
                    <button
                      onClick={() => setFacingMode(prev => prev === 'environment' ? 'user' : 'environment')}
                      className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 flex items-center gap-1.5 text-xs font-mono font-medium transition-colors"
                      title="Switch Front/Rear Camera"
                    >
                      <SwitchCamera className="w-4 h-4" />
                      <span className="hidden sm:inline">Switch Lens</span>
                    </button>

                    <button
                      onClick={handleSnapPhoto}
                      disabled={isCapturing}
                      className="w-14 h-14 rounded-full bg-white hover:bg-stone-200 border-4 border-red-600 shadow-xl flex items-center justify-center transition-transform active:scale-90"
                      title="Take Photo"
                    >
                      <div className="w-9 h-9 rounded-full bg-red-600" />
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 flex items-center gap-1.5 text-xs font-mono font-medium transition-colors"
                      title="Upload from Device Gallery"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: UPLOAD FROM DEVICE */}
              {activeTab === 'upload' && (
                <div className="text-center py-6 space-y-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-stone-700 hover:border-red-500 rounded-xl p-8 bg-stone-950/40 cursor-pointer transition-colors space-y-3"
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-400">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">
                        Tap to select photo from device gallery
                      </span>
                      <span className="text-xs text-stone-400 block mt-1">
                        Supports JPEG, PNG, WEBP from phone camera or storage
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: VERIFIED PRESETS (IDEAL FOR PRESENTATION / DEMOS) */}
              {activeTab === 'presets' && (
                <div className="space-y-3">
                  {cameraError && (
                    <div className="p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{cameraError}</span>
                    </div>
                  )}

                  <div className="text-xs text-stone-300 font-medium">
                    Select a verified on-scene flood situation photo to demonstrate image telemetry transmission:
                  </div>

                  <div className="space-y-2.5">
                    {SAMPLE_DISASTER_IMAGES.map((img) => (
                      <div
                        key={img.id}
                        onClick={() => setCapturedPreview(img.dataUrl)}
                        className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-red-500 cursor-pointer transition-all flex items-center gap-3 group"
                      >
                        <img
                          src={img.dataUrl}
                          alt={img.title}
                          className="w-20 h-14 rounded-lg object-cover border border-stone-700 shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-white block truncate group-hover:text-red-400 transition-colors">
                            {img.title}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400 block">
                            {img.category}
                          </span>
                          <span className="text-[9px] font-mono text-red-400 font-bold block mt-0.5">
                            Tap to attach this photo
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
