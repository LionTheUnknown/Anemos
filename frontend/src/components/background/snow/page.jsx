"use client"

import SnowEffect from "./SnowEffect";
import React, { useState } from "react";

const SNOW_TYPES = [
  { type: "gentle", label: "Gentle" },
  { type: "storm", label: "Storm" },
];

const BG_IMAGE = "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function SnowPage() {
  const [snowType, setSnowType] = useState("gentle");

  return (
    <>
      <SnowEffect backgroundImageUrl={BG_IMAGE} type={snowType} />
      <div
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex items-center justify-center px-6 py-3 rounded-2xl shadow-xl backdrop-blur-md bg-white/20 border border-white/30"
        style={{
          background: "rgba(60,53,47,0.65)",
          boxShadow: "0 0.5rem 2rem 0 rgba(255, 255, 255, 0.17)",
          border: "0.0625rem solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(0.75rem)",
        }}
      >
        {SNOW_TYPES.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => setSnowType(type)}
            className={`mx-2 px-4 py-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400/40
              ${snowType === type ? "bg-white/20 text-white shadow-md scale-105" : " text-zinc-400 hover:text-white"}`}
            style={{
              border: snowType === type ? "0.0625rem solid rgba(255,255,255,0.2)" : "0.0625rem solid transparent",
              boxShadow: snowType === type ? "0 0.125rem 0.5rem 0 rgba(96,165,250,0.12)" : undefined,
              minWidth: "4.5rem",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}   