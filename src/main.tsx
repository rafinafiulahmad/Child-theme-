import { createRoot } from 'react-dom/client';
import '../ai-governance-academy-child/assets/css/base.css';
import '../ai-governance-academy-child/assets/css/layout.css';
import '../ai-governance-academy-child/assets/css/components.css';
import '../ai-governance-academy-child/assets/css/header-footer.css';
import '../ai-governance-academy-child/assets/css/home.css';
import '../ai-governance-academy-child/assets/css/blog.css';
import '../ai-governance-academy-child/assets/css/bookstore.css';
import '../ai-governance-academy-child/assets/css/tutor-lms.css';
import '../ai-governance-academy-child/assets/css/reader.css';
import '../ai-governance-academy-child/assets/css/responsive.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
