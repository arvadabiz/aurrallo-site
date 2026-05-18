import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage  from './pages/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage  from './pages/PricingPage';
import BlogPage     from './pages/BlogPage';
import ArticlePage  from './pages/ArticlePage';
import SignUpPage   from './pages/SignUpPage';
import LoginPage    from './pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<LandingPage />}  />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing"  element={<PricingPage />}  />
        <Route path="/sign-up"  element={<SignUpPage />}   />
        <Route path="/login"    element={<LoginPage />}    />
        <Route path="/blog"     element={<BlogPage />}     />
        <Route path="/:slug"    element={<ArticlePage />}  />
      </Routes>
    </BrowserRouter>
  );
}
