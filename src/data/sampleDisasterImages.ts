// Pre-configured on-scene telemetry images for instant demonstration and live camera fallbacks

export const SAMPLE_DISASTER_IMAGES = [
  {
    id: 'ram-nagar-flood',
    title: 'Ram Nagar 3rd Main Flood Inundation',
    category: 'Flood Water Level',
    watermark: 'RESQER FIELD SURVEILLANCE • CHENNAI ZONE 13',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" width="100%" height="100%"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23334155"/><stop offset="100%" stop-color="%2364748b"/></linearGradient><linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%230369a1"/><stop offset="100%" stop-color="%23082f49"/></linearGradient></defs><rect width="640" height="420" fill="url(%23sky)"/><rect y="210" width="640" height="210" fill="url(%23water)"/><path d="M0 210 Q 160 195 320 210 T 640 205 L 640 420 L 0 420 Z" fill="%230284c7" opacity="0.6"/><rect x="60" y="110" width="120" height="150" fill="%23cbd5e1" rx="4"/><rect x="80" y="130" width="30" height="35" fill="%23fbbf24"/><rect x="130" y="130" width="30" height="35" fill="%23475569"/><rect x="80" y="180" width="30" height="35" fill="%230369a1"/><rect x="220" y="70" width="160" height="190" fill="%2394a3b8" rx="4"/><rect x="245" y="90" width="40" height="40" fill="%23fbbf24"/><rect x="315" y="90" width="40" height="40" fill="%23fbbf24"/><rect x="245" y="150" width="40" height="40" fill="%230284c7"/><rect x="315" y="150" width="40" height="40" fill="%230284c7"/><rect x="420" y="130" width="140" height="130" fill="%23cbd5e1" rx="4"/><rect x="450" y="150" width="35" height="35" fill="%23f59e0b"/><rect x="35" y="170" width="12" height="120" fill="%23eab308"/><line x1="30" y1="210" x2="52" y2="210" stroke="%23dc2626" stroke-width="3"/><text x="58" y="214" fill="%23fee2e2" font-family="monospace" font-size="12" font-weight="bold">3.5 FT WATER DEPTH</text><rect x="15" y="15" width="360" height="52" rx="6" fill="%230f172a" opacity="0.85"/><text x="28" y="36" fill="%23f8fafc" font-family="sans-serif" font-weight="bold" font-size="13">FIELD CAPTURE: Ram Nagar 3rd Main</text><text x="28" y="54" fill="%2394a3b8" font-family="monospace" font-size="10">Zone 13 - Velachery | Resident Live Upload</text></svg>`
  },
  {
    id: 'velachery-lake-surge',
    title: 'Velachery Lake Basin Overflow & Route Cutoff',
    category: 'Road Inundation',
    watermark: 'RESQER FIELD SURVEILLANCE • CHENNAI ZONE 13',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" width="100%" height="100%"><rect width="640" height="420" fill="%231e293b"/><path d="M0 240 Q 150 200 320 230 T 640 220 L 640 420 L 0 420 Z" fill="%230284c7"/><rect x="180" y="240" width="140" height="60" rx="8" fill="%23dc2626" opacity="0.9"/><rect x="200" y="225" width="100" height="30" rx="6" fill="%23991b1b"/><circle cx="215" cy="300" r="18" fill="%230f172a"/><circle cx="285" cy="300" r="18" fill="%230f172a"/><text x="195" y="275" fill="%23ffffff" font-family="sans-serif" font-weight="bold" font-size="11">STRANDED BUS</text><rect x="15" y="15" width="370" height="52" rx="6" fill="%230f172a" opacity="0.85"/><text x="28" y="36" fill="%23f8fafc" font-family="sans-serif" font-weight="bold" font-size="13">FIELD CAPTURE: 100 Feet Bypass Road</text><text x="28" y="54" fill="%2394a3b8" font-family="monospace" font-size="10">Zone 13 - Velachery | Water Depth ~4.0 FT</text></svg>`
  },
  {
    id: 'omr-waterlogging',
    title: 'Perungudi OMR Service Lane Flooded',
    category: 'Access Blockage',
    watermark: 'RESQER FIELD SURVEILLANCE • CHENNAI ZONE 14',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" width="100%" height="100%"><rect width="640" height="420" fill="%230f172a"/><path d="M0 250 L 640 250 L 640 420 L 0 420 Z" fill="%23075985"/><rect x="120" y="160" width="220" height="90" fill="%23475569" rx="6"/><text x="140" y="210" fill="%23f8fafc" font-family="sans-serif" font-weight="bold" font-size="12">OMR IT CORRIDOR FLYOVER</text><rect x="15" y="15" width="370" height="52" rx="6" fill="%230f172a" opacity="0.85"/><text x="28" y="36" fill="%23f8fafc" font-family="sans-serif" font-weight="bold" font-size="13">FIELD CAPTURE: Perungudi Toll Gate Junction</text><text x="28" y="54" fill="%2394a3b8" font-family="monospace" font-size="10">Zone 14 - Perungudi | Impassable for light vehicles</text></svg>`
  }
];
