import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove state
const stateCode = `  const [customApiKeys, setCustomApiKeys] = useState<string>(() => {
    return localStorage.getItem('jesha_custom_api_keys') || '';
  });`;
code = code.replace(stateCode, '');

// Remove Headers in fetches
code = code.replace(/, 'x-custom-api-keys': localStorage\.getItem\('jesha_custom_api_keys'\) \|\| ''/g, '');

// Remove Settings UI
const startIdx = code.indexOf('<div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">');
if (startIdx !== -1) {
  // It's followed by another div like this:
  // <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
  // We need to cut out exactly the custom keys box.
  const endMarker = '<div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">';
  const endIdx = code.indexOf(endMarker, startIdx);
  if (endIdx !== -1) {
    code = code.substring(0, startIdx) + code.substring(endIdx);
  }
}

fs.writeFileSync('src/App.tsx', code);
