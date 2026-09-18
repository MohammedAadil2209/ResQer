import React from 'react';
import { X, Download, ShieldCheck } from 'lucide-react';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  caption?: string;
  senderName?: string;
  timestamp?: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  caption,
  senderName,
  timestamp
}) => {
  if (!isOpen || !imageUrl) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `resqer-field-telemetry-${Date.now()}.png`;
    a.click();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-stone-900 border border-stone-700 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-white uppercase">
              On-Scene Photo Telemetry Evidence
            </span>
            {timestamp && (
              <span className="text-[11px] font-mono text-stone-400">
                • {timestamp}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white border border-stone-700 hover:bg-stone-700 transition-colors"
              title="Download Telemetry"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white border border-stone-700 hover:bg-stone-700 transition-colors"
              title="Close View"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Full Image */}
        <div className="p-2 sm:p-4 flex-1 flex items-center justify-center bg-black/80 overflow-auto">
          <img
            src={imageUrl}
            alt={caption || 'Field Telemetry'}
            className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-md"
          />
        </div>

        {/* Footer info */}
        {(caption || senderName) && (
          <div className="px-4 py-2.5 bg-stone-950/90 border-t border-stone-800 text-xs flex items-center justify-between">
            <div className="text-stone-300 font-medium">
              {caption}
            </div>
            {senderName && (
              <div className="text-[11px] font-mono text-red-400 font-bold">
                Transmitted by: {senderName}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
