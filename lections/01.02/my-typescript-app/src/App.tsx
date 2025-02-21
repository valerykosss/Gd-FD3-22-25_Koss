import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import './App.css';
import TestPage from './pages/TestPage';
import DynamicPage from './pages/DynamicPage';
import ExternalPage from './pages/ExternalPage';
import Canvas from './components/Canvas';
import CounterComponent from './components/CounterComponent';
import TestNavigate from './pages/TestNavigate';
import MyLink from "./components/MyLink";
// import { useState } from "react";
import { NameProvider } from "./contexts/nameContext";
import { ColorThemeProvider } from "./contexts/themeContext";
import ThemeButton from "./components/ThemeButton";
import { Header } from "./components/layout/Header";

function App() {
  // const [name, setName] = useState('');

  return (
    <NameProvider>
      <ColorThemeProvider>
      <BrowserRouter>
        <Header />
        {/* <nav>
          <MyLink url="/">Home |</MyLink>
          <MyLink url="/test">Test |</MyLink>
          <MyLink url="/dynamic/123/courses/new">Dyn |</MyLink>
          <MyLink url="/external">External |</MyLink>
          <MyLink url="/external/canvas">Canvas |</MyLink>
          <MyLink url="/external/counter">Counter |</MyLink>
          <TestNavigate />
          <ThemeButton></ThemeButton>
        </nav> */}

        <Routes>
          {/* <Route path="/" element={<HomePage setName={setName} />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/dynamic/:id/courses/:courseId" element={<DynamicPage />} />
          <Route path="/external" element={<ExternalPage />}>
            <Route path="canvas" element={<Canvas />} />
            <Route path="counter" element={<CounterComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ColorThemeProvider>
    </NameProvider>
  );
}

export default App;