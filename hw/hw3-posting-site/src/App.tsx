import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import StartPage from './pages/StartPage';
import ContactPage from './pages/ContactPage';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Content from './components/layouts/Content';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Content>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/contact" element={<ContactPage />}>
          <Route path="about" element={<AboutPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Content>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
