 npm init
 npm i express
 npm install -D tailwindcss
 npx tailwindcss init

 -- modify tailwind.config.js  
 content:["./views/*.ejs"],

 -- modify packageJson, build main.css file from tailwind
  "scripts": {
 "tw:build":"tailwindcss build -i ./assets/css/tailwind.css -o ./assets/css/main.css"
  }

  -- create tailwind.css file
@tailwind base;
@tailwind components;
@tailwind utilities;


-- add stylesheet link to home.ejs
 <link rel="stylesheet" href="/css/main.css">

-- run tw:build to create main.css file automatically
npm run tw:build

-- add some tailwind format style in home.ejs file, then create a new terminal
npm run tw:build
-- refresh the webpage, the format style will apply


--install daisyUI
npm i @tailwindcss/typography daisyui

--Register daisyUI as a plugin (tailwind.config.js):
 plugins: [require('@tailwindcss/typography'),require('daisyui')],


-- run tw:build to create main.css file automatically
npm run tw:build


