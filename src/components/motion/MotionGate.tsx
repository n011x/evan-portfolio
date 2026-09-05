"use client";

import { useEffect } from "react";

/**
 * One listener, no render loop: marks the document when motion must stop.
 * Motion is off while the tab is hidden and whenever the user asks for reduced motion,
 * so the background material never burns cycles in the background.
 */
export function MotionGate() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const off = document.hidden || reduce.matches;
      root.dataset.motion = off ? "off" : "on";
    };

    apply();
    document.addEventListener("visibilitychange", apply);
    reduce.addEventListener("change", apply);
    return () => {
      document.removeEventListener("visibilitychange", apply);
      reduce.removeEventListener("change", apply);
    };
  }, []);

  return null;
}
