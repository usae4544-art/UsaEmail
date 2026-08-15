const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// The issue is inside the "profile" tab (Jesha's Vibe).
// Let's check what was replaced.
const badCode = `<div className="pt-2">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Select Photo for {activePersonaObj.name}</h2>`;

// Let's replace it with the correct structure.
// Wait, before the regex I had:
/*
          <div className="space-y-6 pb-20 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-rose-100 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Select Girlfriend Persona</h2>
                ...
              </div>

              <div className="border-t border-rose-100 pt-6">
*/
// And I replaced it so it became:
/*
          <div className="space-y-6 pb-20 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-rose-100 space-y-6">
              <div>
                <div className="pt-2">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Select Photo for {activePersonaObj.name}</h2>
*/
// It left an extra <div> (the one before `<div className="pt-2">` which was `<div className="bg-white ..."><div>`).
// Actually, `<div>` was before `<h2 className="text-xl font-bold text-slate-900 mb-4">Select Girlfriend Persona</h2>`.

// Let's just fix it by finding the start of Tab 4 and replacing its contents up to "Select Photo"

let fixed = content.replace(
  /{activeTab === 'profile' && \(\s*<div className="space-y-6 pb-20 max-w-2xl mx-auto">\s*<div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-rose-100 space-y-6">\s*<div>\s*<div className="pt-2">/,
  `{activeTab === 'profile' && (
          <div className="space-y-6 pb-20 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-rose-100 space-y-6">
              <div className="pt-2">`
);

fs.writeFileSync('src/App.tsx', fixed);
