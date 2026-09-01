import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldCatch = `                      } catch (err) {
                        console.error('Failed to read clipboard contents: ', err);
                        alert('Clipboard access denied or not available. Please paste manually.');
                      }`;

const newCatch = `                      } catch (err) {
                        console.error('Failed to read clipboard contents: ', err);
                        const fallbackText = window.prompt('Clipboard access is restricted in this preview. Please long-press or right-click to paste your keys here:');
                        if (fallbackText) {
                          const existingKeys = customApiKeys ? customApiKeys + ',' : '';
                          const newKeys = existingKeys + fallbackText;
                          setCustomApiKeys(newKeys);
                          localStorage.setItem('jesha_custom_api_keys', newKeys);
                        }
                      }`;

code = code.replace(oldCatch, newCatch);
fs.writeFileSync('src/App.tsx', code);
