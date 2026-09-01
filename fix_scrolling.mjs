import fs from 'fs';

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix Navigation Tabs
code = code.replace(
  'px-2 py-2 flex justify-center space-x-1 md:space-x-4 text-xs md:text-sm font-medium z-10 overflow-x-auto scrollbar-none',
  'px-4 py-2 flex items-center space-x-2 md:space-x-4 text-xs md:text-sm font-medium z-10 overflow-x-auto scrollbar-none snap-x'
);

// To ensure items don't shrink and can scroll fully, let's make sure flex-shrink-0 is on the tabs (it already is)
// And for the persona selector:
code = code.replace(
  '<div className="flex space-x-3 w-max">',
  '<div className="flex space-x-3 w-max pr-4">' // Added pr-4 to prevent cutting off the last item due to flex
);

fs.writeFileSync('src/App.tsx', code);
