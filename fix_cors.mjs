import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

if (!code.includes('import cors from "cors";')) {
  code = code.replace('import path from "path";', 'import path from "path";\nimport cors from "cors";');
}

if (!code.includes('app.use(cors(')) {
  code = code.replace('const app = express();', 'const app = express();\napp.use(cors({ origin: "*" }));');
}

fs.writeFileSync('server.ts', code);
