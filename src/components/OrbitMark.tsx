import { lazy, Suspense, useEffect, useState } from "react";
import type { Theme } from "../hooks/usePreferences";

const OrbitScene = lazy(() => import("./OrbitScene"));

function StaticOrbit() {
  return (
    <div className="orbit-static" aria-hidden="true">
      <div className="orbit orbit-wide" />
      <div className="orbit orbit-tall" />
      <div className="orbit orbit-dashed" />
      <div className="orbit-core"><span /></div>
      <div className="orbit-satellite" />
    </div>
  );
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function OrbitMark({ label, theme }: { label: string; theme: Theme }) {
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnhanced(desktop.matches && !reduced.matches && canUseWebGL());
    update();
    desktop.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="orbit-stage" role="img" aria-label={label} data-enhanced={enhanced}>
      {enhanced ? <Suspense fallback={<StaticOrbit />}><OrbitScene theme={theme} /></Suspense> : <StaticOrbit />}
    </div>
  );
}
