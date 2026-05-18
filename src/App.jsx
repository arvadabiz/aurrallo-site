import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/:slug" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}
