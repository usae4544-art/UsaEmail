import fs from 'fs';

// 1. Update capacitor.config.ts
try {
  let cap = fs.readFileSync('capacitor.config.ts', 'utf8');
  cap = cap.replace(/appName:\s*'[^']*'/, "appName: 'ai'");
  fs.writeFileSync('capacitor.config.ts', cap);
  console.log("capacitor.config.ts updated.");
} catch(e) {}

// 2. Update index.html
try {
  let html = fs.readFileSync('index.html', 'utf8');
  html = html.replace(/<title>.*?<\/title>/, "<title>ai</title>");
  fs.writeFileSync('index.html', html);
  console.log("index.html updated.");
} catch(e) {}

// 3. Update android strings.xml
try {
  let xml = fs.readFileSync('android/app/src/main/res/values/strings.xml', 'utf8');
  xml = xml.replace(/<string name="app_name">.*?<\/string>/, '<string name="app_name">ai</string>');
  fs.writeFileSync('android/app/src/main/res/values/strings.xml', xml);
  console.log("strings.xml updated.");
} catch(e) {}

// 4. Update metadata.json
try {
  let meta = JSON.parse(fs.readFileSync('metadata.json', 'utf8'));
  meta.name = "ai";
  fs.writeFileSync('metadata.json', JSON.stringify(meta, null, 2));
  console.log("metadata.json updated.");
} catch(e) {}

