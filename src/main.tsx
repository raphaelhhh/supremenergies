import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import './index.css'

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
