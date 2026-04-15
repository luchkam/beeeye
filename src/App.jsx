import React, { useCallback, useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import ValueProp from './components/ValueProp.jsx';
import Services from './components/Services.jsx';
import Solutions from './components/Solutions.jsx';
import Scenarios from './components/Scenarios.jsx';
import Demos from './components/Demos.jsx';
import Process from './components/Process.jsx';
import WhyUs from './components/WhyUs.jsx';
import Niches from './components/Niches.jsx';
import FAQ from './components/FAQ.jsx';
import LeadForm from './components/LeadForm.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import CallbackModal from './components/CallbackModal.jsx';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [demoOpenRequest, setDemoOpenRequest] = useState({ id: null, nonce: 0 });

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);
  const openCallback = useCallback(() => setCallbackOpen(true), []);
  const closeCallback = useCallback(() => setCallbackOpen(false), []);
  const requestOpenDemo = useCallback((id) => {
    setDemoOpenRequest((prev) => ({ id, nonce: prev.nonce + 1 }));
  }, []);

  // Lock scroll when modals open
  useEffect(() => {
    const locked = chatOpen || callbackOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [chatOpen, callbackOpen]);

  return (
    <div className="relative min-h-screen">
      <Nav onOpenChat={openChat} />

      <main>
        <Hero
          onOpenChat={openChat}
          onRequestCallback={openCallback}
          onOpenWhatsAppDemo={() => requestOpenDemo('whatsapp')}
        />
        <ValueProp />
        <Services />
        <Solutions />
        <Scenarios />
        <Demos onOpenChat={openChat} openRequest={demoOpenRequest} />
        <Process />
        <WhyUs />
        <Niches />
        <FAQ />
        <LeadForm />
        <FinalCTA onOpenChat={openChat} onRequestCallback={openCallback} />
      </main>

      <Footer />

      {/* Floating chat trigger */}
      <FloatingChatButton onClick={openChat} hidden={chatOpen} />

      {/* Overlays */}
      <ChatWidget open={chatOpen} onClose={closeChat} />
      <CallbackModal open={callbackOpen} onClose={closeCallback} />
    </div>
  );
}

function FloatingChatButton({ onClick, hidden }) {
  if (hidden) return null;
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-bee-400 text-ink-950 shadow-[0_20px_60px_-10px_rgba(255,221,34,0.7)] hover:bg-bee-300 transition"
      aria-label="Открыть AI-чат"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span className="absolute inset-0 rounded-full border border-bee-400/60 animate-ping opacity-60" />
    </button>
  );
}
