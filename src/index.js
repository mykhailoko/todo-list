import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import global_en from "./translation/en/global.json";
import global_ru from "./translation/ru/global.json";
import i18next from "i18next";
import { I18nextProvider } from 'react-i18next';

const savedLanguage = localStorage.getItem("language") || "ru";

i18next.init({
  intetpolation: {escapeValue: false},
  lng: savedLanguage,
  resources: {
    ru: {
      global: global_ru
    },
    en: {
      global: global_en
    },
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
