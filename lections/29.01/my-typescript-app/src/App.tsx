import { BrowserRouter, Routes, Route, Link } from "react-router";
import HomePage from './pages/HomePage';
import './App.css';
import TestPage from './pages/TestPage';
import DynamicPage from './pages/DynamicPage';
import ExternalPage from './pages/ExternalPage';
import Canvas from './components/Canvas';
import CounterComponent from './components/CounterComponent';
import TestNavigate from './pages/TestNavigate';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home |</Link>
        <Link to="/test">Test |</Link>
        <Link to="/dynamic/123/courses/new">Dyn |</Link>
        <Link to="/external">External |</Link>
        <Link to="/external/canvas">Canvas |</Link>
        <Link to="/external/counter">Counter |</Link>
        <TestNavigate />
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/dynamic/:id/courses/:courseId" element={<DynamicPage />} />
        <Route path="/external" element={<ExternalPage />}>
          <Route path="canvas" element={<Canvas />} />
          <Route path="counter" element={<CounterComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;