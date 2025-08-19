# Setup Guide

## 1. Setup the environments

In the root of your project folder, enter the following commands in your terminal.

```bash
npm install 
npm run create-venv   
npm run create-env
```

1. create-venv creates a virtual environment and installs all backend dependencies.
2. create-env  generates a template .env file with fields to fill in.


### .env 
You must manually fill in your own SECRET_KEY, ADMIN INFORMATION, and optionally the DATABASE_URL.

Note: Installing the actual database server (e.g., sqlite, PostgreSQL) is outside the scope of this guide.


```bash
SECRET_KEY= #fill
ADMIN=#fill
EMAIL=#fill
PASSWORD= #fill
DATABASE_URL=sqlite:///gamelibrary.db
DATABASE_TRACKING=False
FLASK_APP=gameok.py
FLASK_ENV=development
FLASK_DEBUG=1
```


## 2. Setup the database

Once you've properly set up your secret key and admin information, you can create the database and add an admin to the Users table. The admin is in charge of adding games and consoles. Don't forget to change your interpreter to the one from the virtual enviroment created in step 1.
 
```bash

cd backend && source .venv/bin/activate \
&& flask cli create-db \
&& flask cli create-admin \
&& flask cli add-consoles 
```

## 3. Run the application

Once everything is set up, run in two separate terminals:
```bash
npm run dev
```
```bash
npm run backend
```

and you'll be all set.

Alternatively, you can install <a href="https://www.npmjs.com/package/concurrently#installation">concurrently</a> to run it only one terminal: 
# Usage Guide 


The main usage and explanations of this application is covered on my website: https://joefarah.com/projects/gameok/



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
