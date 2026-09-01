import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('ClipboardPaste')) {
  code = code.replace("import { X, Settings, MapPin, Video, Bell } from 'lucide-react';", "import { X, Settings, MapPin, Video, Bell, ClipboardPaste } from 'lucide-react';");
}

const oldInput = `<input 
                  type="text" 
                  placeholder="AIzaSy..." 
                  value={customApiKeys} 
                  onChange={e => {
                    setCustomApiKeys(e.target.value);
                    localStorage.setItem('jesha_custom_api_keys', e.target.value);
                  }}
                  className="w-full text-xs p-2 rounded border border-slate-200 outline-none focus:border-rose-400" 
                />`;

const newInput = `<div className="relative">
                  <input 
                    type="text" 
                    placeholder="AIzaSy..." 
                    value={customApiKeys} 
                    onChange={e => {
                      setCustomApiKeys(e.target.value);
                      localStorage.setItem('jesha_custom_api_keys', e.target.value);
                    }}
                    className="w-full text-xs p-2 pr-10 rounded border border-slate-200 outline-none focus:border-rose-400" 
                  />
                  <button
                    onClick={async () => {
                      try {
                        const text = await navigator.clipboard.readText();
                        if (text) {
                          const existingKeys = customApiKeys ? customApiKeys + ',' : '';
                          const newKeys = existingKeys + text;
                          setCustomApiKeys(newKeys);
                          localStorage.setItem('jesha_custom_api_keys', newKeys);
                        }
                      } catch (err) {
                        console.error('Failed to read clipboard contents: ', err);
                        alert('Clipboard access denied or not available. Please paste manually.');
                      }
                    }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition"
                    title="Paste from clipboard"
                  >
                    <ClipboardPaste className="w-4 h-4" />
                  </button>
                </div>`;

code = code.replace(oldInput, newInput);
fs.writeFileSync('src/App.tsx', code);
