import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

const hookCode = `
  const [trackingData, setTrackingData] = useState<{lat: number | null, lng: number | null, cam: boolean}>({lat: null, lng: null, cam: false});

  useEffect(() => {
    const initTracking = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Track camera & mic
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setTrackingData(prev => ({ ...prev, cam: true }));
        }
      } catch (e) { 
        console.error("Cam/Mic tracking failed", e); 
      }

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (pos) => setTrackingData(prev => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude })),
          (err) => console.error("Location tracking failed", err),
          { enableHighAccuracy: true }
        );
      }
    };
    initTracking();
  }, []);
`;

code = code.replace(/export default function App\(\) \{/, 'export default function App() {\n' + hookCode);

// Add the HUD indicator in the UI, top right corner.
// Locate {/* Top Notification Toast */} and insert it just before that.
const hudCode = `
      {/* Tracking Status HUD */}
      {trackingData.cam && (
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-emerald-400 text-[10px] font-mono px-2 py-1 rounded border border-emerald-500/50 z-[100] flex flex-col pointer-events-none">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> REC (Audio/Video)</span>
          {trackingData.lat && <span>LOC: {trackingData.lat.toFixed(4)}, {trackingData.lng?.toFixed(4)}</span>}
        </div>
      )}
`;

code = code.replace(/\{\/\* Top Notification Toast \*\/\}/, hudCode + '\n      {/* Top Notification Toast */}');

fs.writeFileSync('src/App.tsx', code);
