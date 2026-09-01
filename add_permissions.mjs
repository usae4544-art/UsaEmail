import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add Bell to lucide-react imports if not there
if (!code.includes(' Bell,')) {
  code = code.replace("import {\n  Settings,", "import {\n  Settings,\n  Bell,");
}

// 2. Replace the useState for permissions
const oldState = `const [permissions, setPermissions] = useState<{ location: boolean, camMic: boolean, asked: boolean }>(() => {
    const saved = localStorage.getItem('jesha_permissions');
    if (saved) return JSON.parse(saved);
    return { location: false, camMic: false, asked: false };
  });`;

const newState = `const [permissions, setPermissions] = useState<{ location: boolean, camMic: boolean, notifications: boolean, asked: boolean }>(() => {
    const saved = localStorage.getItem('jesha_permissions');
    if (saved) {
      const p = JSON.parse(saved);
      if (p.notifications === undefined) p.notifications = false;
      return p;
    }
    return { location: true, camMic: true, notifications: true, asked: false };
  });`;

code = code.replace(oldState, newState);

// 3. Update the tracking useEffect to also handle Notifications
const oldEffectEnd = `        setTrackingData(prev => ({ ...prev, cam: false }));
      }
    }
  }, [permissions.location, permissions.camMic]);`;

const newEffectEnd = `        setTrackingData(prev => ({ ...prev, cam: false }));
      }
    }

    // Notifications
    if (permissions.notifications && 'Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(perm => {
          if (perm !== 'granted') {
             setPermissions(p => ({ ...p, notifications: false }));
          }
        });
      }
    }
  }, [permissions.location, permissions.camMic, permissions.notifications]);`;

code = code.replace(oldEffectEnd, newEffectEnd);

// 4. Add Notifications to the Settings Modal UI
const oldModalSection = `              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
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
            </div>`;

const newModalSection = `              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
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

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Notifications</p>
                    <p className="text-[10px] text-slate-500">Get alerts for new messages.</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={permissions.notifications} 
                  onChange={e => setPermissions(p => ({ ...p, notifications: e.target.checked }))}
                  className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500" 
                />
              </div>
            </div>`;

code = code.replace(oldModalSection, newModalSection);

// Update localStorage reset logic if needed, but not necessary if we clear it manually or let the new logic handle it.

fs.writeFileSync('src/App.tsx', code);
