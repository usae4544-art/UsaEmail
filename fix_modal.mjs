import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const settingsModalHtml = `
      {settingsOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
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

const anchor = '{/* Tracking Status HUD */}';
if (!code.includes('Setup Permissions')) {
  code = code.replace(anchor, settingsModalHtml + '\n      ' + anchor);
}

fs.writeFileSync('src/App.tsx', code);
