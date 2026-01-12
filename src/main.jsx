import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UseStatePage from './pages/UseStatePage.jsx'
import UseEffectPage from './pages/UseEffectPage.jsx'
import UseRefPage from './pages/UseRefPage.jsx'
import UseCallbackPage from './pages/UseCallbackPage.jsx'
import UseMemoPage from './pages/UseMemoPage.jsx'
import UseTransitionPage from './pages/UseTransitionPage.jsx'
import UseLayoutEffectPage from './pages/UseLayoutEffectPage.jsx'
import UseContextPage from './pages/UseContextPage.jsx'
import UseReducerPage from './pages/UseReducerPage.jsx'
import UseIdPage from './pages/UseIdPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/usestate" element={<UseStatePage />} />
        <Route path="/useeffect" element={<UseEffectPage />} />
        <Route path="/useref" element={<UseRefPage />} />
        <Route path="/usecallback" element={<UseCallbackPage />} />
        <Route path="/usememo" element={<UseMemoPage />} />
        <Route path="/usetransition" element={<UseTransitionPage />} />
        <Route path="/uselayouteffect" element={<UseLayoutEffectPage />} />
        <Route path="/usecontext" element={<UseContextPage />} />
        <Route path="/usereducer" element={<UseReducerPage />} />
        <Route path="/useid" element={<UseIdPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
