import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add imports if not present
if (!code.includes(' Settings,')) {
  code = code.replace("import {\n  Bot,", "import {\n  Settings,\n  MapPin,\n  Video,\n  Bot,");
}

// 2. Add State variables
const stateToAdd = `
  const [permissions, setPermissions] = useState<{ location: boolean, camMic: boolean, asked: boolean }>(() => {
    const saved = localStorage.getItem('jesha_permissions');
    if (saved) return JSON.parse(saved);
    return { location: false, camMic: false, asked: false };
  });
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const watchIdRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    localStorage.setItem('jesha_permissions', JSON.stringify(permissions));
  }, [permissions]);

  useEffect(() => {
    if (!permissions.asked) {
      setSettingsOpen(true);
    }
  }, [permissions.asked]);
`;

code = code.replace("const [trackingData, setTrackingData] = useState", stateToAdd + "\n  const [trackingData, setTrackingData] = useState");

// 3. Replace the original tracking useEffect
const trackingOldEffect = `  useEffect(() => {
    const initTracking = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Track camera & mic
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setTrackingData(prev => ({ ...prev, cam: true }));
        }
      } catch (e) { 
        console.warn("Cam/Mic access denied, continuing without it."); 
      }

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (pos) => setTrackingData(prev => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude })),
          (err) => console.warn("Location access denied, continuing without it."),
          { enableHighAccuracy: true }
        );
      }
    };
    initTracking();
  }, []);`;

const trackingNewEffect = `  useEffect(() => {
    // Location
    if (permissions.location && navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => setTrackingData(prev => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude })),
        (err) => console.warn("Location access denied, continuing without it."),
        { enableHighAccuracy: true }
      );
    } else {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
        setTrackingData(prev => ({ ...prev, lat: undefined, lng: undefined }));
      }
    }

    // Cam/Mic
    if (permissions.camMic && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          streamRef.current = stream;
          setTrackingData(prev => ({ ...prev, cam: true }));
        })
        .catch(e => {
          console.warn("Cam/Mic access denied, continuing without it.");
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        setTrackingData(prev => ({ ...prev, cam: false }));
      }
    }
  }, [permissions.location, permissions.camMic]);`;

code = code.replace(trackingOldEffect, trackingNewEffect);

// 4. Add the Settings Modal right after <div className="h-full w-full max-w-md mx-auto ...">
const settingsModalHtml = `
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                <Settings className="w-6 h-6 text-rose-500" /> Setup Permissions
              </h2>
              <p className="text-slate-500 text-sm">Allow permissions so the AI can know where you are and see/hear you for a better experience.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Location Access</p>
                    <p className="text-[10px] text-slate-500">Allow AI to know your location.</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={permissions.location} 
                  onChange={e => setPermissions(p => ({ ...p, location: e.target.checked }))}
                  className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500" 
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Camera & Mic</p>
                    <p className="text-[10px] text-slate-500">Allow AI to see & hear you.</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={permissions.camMic} 
                  onChange={e => setPermissions(p => ({ ...p, camMic: e.target.checked }))}
                  className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500" 
                />
              </div>
            </div>

            <button 
              onClick={() => { setPermissions(p => ({ ...p, asked: true })); setSettingsOpen(false); }}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl shadow-md transition"
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}
`;

code = code.replace(
  '<div className="h-full w-full max-w-md mx-auto md:max-w-none md:w-[400px] bg-white md:border-r border-slate-200 flex flex-col relative z-20 overflow-hidden shadow-2xl">',
  '<div className="h-full w-full max-w-md mx-auto md:max-w-none md:w-[400px] bg-white md:border-r border-slate-200 flex flex-col relative z-20 overflow-hidden shadow-2xl">\n' + settingsModalHtml
);

// 5. Add the Settings Button to the header
const settingsBtn = `
          <button 
            onClick={() => setSettingsOpen(true)}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-full cursor-pointer transition shadow-xs"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
`;

code = code.replace(
  'title="Toggle Romantic Night Mode"\n          >\n            {isDarkMode ? <Sun className="w-4 h-4 text-rose-500" /> : <Moon className="w-4 h-4 text-rose-500" />}\n          </button>',
  'title="Toggle Romantic Night Mode"\n          >\n            {isDarkMode ? <Sun className="w-4 h-4 text-rose-500" /> : <Moon className="w-4 h-4 text-rose-500" />}\n          </button>' + settingsBtn
);

fs.writeFileSync('src/App.tsx', code);
