import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const settingsState = `const [customApiKeys, setCustomApiKeys] = useState<string>(() => {
    return localStorage.getItem('jesha_custom_api_keys') || '';
  });`;

code = code.replace("const [settingsOpen, setSettingsOpen] = useState<boolean>(false);", settingsState + "\n  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);");

const settingsUI = `              <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Your API Keys (Optional)</p>
                    <p className="text-[10px] text-slate-500">Paste your own Gemini API keys (comma separated if multiple). If empty, app uses default keys.</p>
                  </div>
                </div>
                <input 
                  type="text" 
                  placeholder="AIzaSy..." 
                  value={customApiKeys} 
                  onChange={e => {
                    setCustomApiKeys(e.target.value);
                    localStorage.setItem('jesha_custom_api_keys', e.target.value);
                  }}
                  className="w-full text-xs p-2 rounded border border-slate-200 outline-none focus:border-rose-400" 
                />
              </div>`;

code = code.replace("            <div className=\"space-y-4\">", "            <div className=\"space-y-4\">\n" + settingsUI);

// add to fetch headers in 3 places
const chatFetch1 = `      const res = await fetch(API_BASE + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },`;
const chatFetch1New = `      const res = await fetch(API_BASE + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-custom-api-keys': localStorage.getItem('jesha_custom_api_keys') || '' },`;
code = code.replace(chatFetch1, chatFetch1New);

const chatFetch2 = `      const res = await fetch(API_BASE + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },`;
const chatFetch2New = `      const res = await fetch(API_BASE + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-custom-api-keys': localStorage.getItem('jesha_custom_api_keys') || '' },`;
code = code.replace(chatFetch2, chatFetch2New); // wait, will replace both? 
// string.replace replaces the first occurrence. 
// Instead let's just do a regex replace
code = code.replace(/headers: \{ 'Content-Type': 'application\/json' \},/g, "headers: { 'Content-Type': 'application/json', 'x-custom-api-keys': localStorage.getItem('jesha_custom_api_keys') || '' },");

fs.writeFileSync('src/App.tsx', code);
