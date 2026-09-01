import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace h-screen with fixed inset-0
code = code.replace(/flex flex-col h-screen/g, 'flex flex-col fixed inset-0');

// Add style to the main div
code = code.replace(
  /className=\{`flex flex-col fixed inset-0/g,
  'style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + ${keyboardHeight}px)` }} className={`flex flex-col fixed inset-0'
);

// Add the visualViewport listener in App component
const hookCode = `
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height;
        // If height diff is significant, assume it's keyboard
        setKeyboardHeight(heightDiff > 50 ? heightDiff : 0);
      }
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
    }
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      }
    };
  }, []);
`;

// Insert after function App() {
code = code.replace(/export default function App\(\) \{/, 'export default function App() {\n' + hookCode);

fs.writeFileSync('src/App.tsx', code);
