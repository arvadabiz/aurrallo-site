import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ArticlePage from './pages/ArticlePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:slug" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}
