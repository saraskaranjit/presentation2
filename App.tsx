import React, { useState } from "react";
import { PARTICIPANTS } from "./constants";
import { Participant } from "./types";

const App: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>(PARTICIPANTS);
  const [activeSpeaker, setActiveSpeaker] = useState<Participant | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [history, setHistory] = useState<Participant[]>([]);

  const selectRandomSpeaker = () => {
    const available = participants.filter((p) => !p.hasSpoken);

    if (available.length === 0) {
      alert("All members have participated! Resetting the table.");
      setParticipants(PARTICIPANTS.map((p) => ({ ...p, hasSpoken: false })));
      setHistory([]);
      setActiveSpeaker(null);
      return;
    }

    setIsSelecting(true);
    let counter = 0;
    const rounds = 25;
    const interval = setInterval(() => {
      const tempIdx = Math.floor(Math.random() * available.length);
      setActiveSpeaker(available[tempIdx]);
      counter++;

      if (counter >= rounds) {
        clearInterval(interval);
        const finalIdx = Math.floor(Math.random() * available.length);
        const speaker = available[finalIdx];

        setActiveSpeaker(speaker);
        setParticipants((prev) =>
          prev.map((p) => (p.id === speaker.id ? { ...p, hasSpoken: true } : p))
        );
        setHistory((prev) => [speaker, ...prev]);
        setIsSelecting(false);
      }
    }, 80);
  };

  const resetTable = () => {
    if (window.confirm("Restore everyone to the round table?")) {
      setParticipants(PARTICIPANTS.map((p) => ({ ...p, hasSpoken: false })));
      setActiveSpeaker(null);
      setHistory([]);
    }
  };

  // Calculate coordinates for participants around the table
  const radius = 290;
  const centerX = 350;
  const centerY = 350;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start overflow-hidden pt-10 px-4">
      {/* Royal Header */}
      <header className="z-20 text-center mb-6">
        <h1 className="royal-font text-4xl md:text-5xl font-bold text-yellow-500 tracking-widest drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
          The Royal Council of AI
        </h1>
        <p className="text-slate-400 mt-2 font-light italic tracking-tight uppercase text-sm">
          RTD: Recruitment & Selection
        </p>
      </header>

      {/* 3D Round Table Environment */}
      <div className="table-container relative w-full max-w-[700px] h-[700px] flex items-center justify-center scale-90 sm:scale-100">
        {/* The Table Surface */}
        <div className="round-table-surface absolute w-[620px] h-[620px] rounded-full flex items-center justify-center wood-texture border-[12px] border-[#d4af37]">
          {/* Inner Glowing Decorative Ring */}
          <div className="w-[520px] h-[520px] rounded-full border border-sky-500/30 animate-pulse flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-sky-500/10 blur-xl"></div>
          </div>
        </div>

        {/* Floating Center Card (The Hologram) */}
        <div className="z-10 flex flex-col items-center justify-center mt-[-120px]">
          {activeSpeaker && !isSelecting ? (
            <div className="spotlight-anim bg-slate-900/90 backdrop-blur-xl border border-sky-400 p-6 rounded-2xl w-80 text-center shadow-[0_0_50px_rgba(56,189,248,0.5)]">
              <p className="text-xl text-slate-200 leading-relaxed italic border-t border-sky-900/50 pt-3">
                "{activeSpeaker.question}"
              </p>
            </div>
          ) : (
            <div className="w-80 h-32 flex flex-col items-center justify-center">
              <div className="hologram-effect w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-sky-400 rounded-full animate-ping"></div>
              </div>
              {isSelecting && (
                <p className="text-sky-400 royal-font text-lg animate-pulse tracking-widest">
                  CONSULTING COUNCIL...
                </p>
              )}
            </div>
          )}

          {/* Speaker Announcement */}
          {activeSpeaker && !isSelecting && (
            <div className="mt-6 text-center bg-yellow-500/10 px-6 py-2 rounded-full border border-yellow-500/20 backdrop-blur-sm">
              <p className="text-yellow-500 royal-font text-2xl font-bold uppercase tracking-widest">
                {activeSpeaker.fullName}
              </p>
            </div>
          )}
        </div>

        {/* Chairs (Participants) */}
        {participants.map((p, index) => {
          const angle = index * (360 / participants.length) * (Math.PI / 180);
          const x = centerX + radius * Math.cos(angle) - 35;
          const y = centerY + radius * Math.sin(angle) - 35;
          const isActive = activeSpeaker?.id === p.id;
          const hasSpoken = p.hasSpoken;

          return (
            <div
              key={p.id}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                position: "absolute",
              }}
              className={`chair-item flex flex-col items-center justify-center w-[70px] h-[70px] rounded-xl border-2 transition-all duration-500 ${
                isActive
                  ? "border-yellow-400 bg-yellow-400/20 scale-125 z-50 shadow-[0_0_25px_#fbbf24]"
                  : hasSpoken
                  ? "border-slate-800 bg-slate-900 opacity-20 grayscale scale-90"
                  : "border-slate-600 bg-slate-800/60 hover:border-sky-500"
              }`}
            >
              <div
                className={`text-[8px] font-bold uppercase tracking-tighter mb-1 ${
                  isActive ? "text-yellow-400" : "text-slate-500"
                }`}
              >
                Seat {index + 1}
              </div>
              <div
                className={`text-[10px] font-bold text-center px-1 leading-tight ${
                  isActive ? "text-white" : "text-slate-300"
                }`}
              >
                {p.name}
              </div>
              {isActive && (
                <div className="absolute -bottom-2 w-12 h-1 bg-yellow-400 blur-sm animate-pulse rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls Overlay */}
      <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center z-30 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-4 bg-slate-900/90 border border-slate-700 p-4 rounded-full shadow-2xl backdrop-blur-sm">
          <button
            onClick={selectRandomSpeaker}
            disabled={isSelecting}
            className={`px-10 py-3 rounded-full font-bold uppercase tracking-widest transition-all ${
              isSelecting
                ? "bg-slate-700 text-slate-500 cursor-not-allowed opacity-50"
                : "bg-yellow-500 text-slate-900 hover:bg-yellow-400 hover:scale-105 active:scale-95 shadow-[0_4px_0_rgb(161,98,7)]"
            }`}
          >
            {isSelecting ? "Summoning..." : "Summon Speaker"}
          </button>

          <button
            onClick={resetTable}
            className="p-3 rounded-full bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors border border-slate-700"
            title="Reset Council"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {/* History Ticker */}
        <div className="mt-4 flex gap-2 overflow-hidden max-w-lg px-4 justify-center">
          {history.slice(0, 4).map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="bg-slate-800/40 border border-slate-700 text-[10px] px-3 py-1 rounded-full text-slate-500 italic whitespace-nowrap opacity-60"
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Panel */}
      <div className="fixed top-24 right-8 bg-slate-900/80 border border-slate-800 p-4 rounded-xl hidden lg:block backdrop-blur-md">
        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest">
          The Council's Progress
        </div>
        <div className="text-2xl font-bold text-sky-400 royal-font">
          {history.length}{" "}
          <span className="text-slate-600 font-normal text-sm">
            / {participants.length}
          </span>
        </div>
        <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-sky-500 transition-all duration-1000"
            style={{
              width: `${(history.length / participants.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default App;
