"use client";

import { useEffect, useRef } from "react";

export default function AmbientLight() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!field || !finePointer.matches) return;

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const step = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      field.style.setProperty("--pointer-x", `${currentX.toFixed(2)}px`);
      field.style.setProperty("--pointer-y", `${currentY.toFixed(2)}px`);

      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.1) {
        frame = requestAnimationFrame(step);
      } else {
        frame = 0;
      }
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 24;
      targetY = (event.clientY / window.innerHeight - 0.5) * 16;
      start();
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      targetX = 0;
      targetY = 0;
      start();
    };

    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      cancelAnimationFrame(frame);
      frame = 0;
      currentX = currentY = targetX = targetY = 0;
      field.style.setProperty("--pointer-x", "0px");
      field.style.setProperty("--pointer-y", "0px");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerLeave);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
      reducedMotion.removeEventListener("change", onMotionChange);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ambient-light" aria-hidden="true" ref={fieldRef}>
      <span className="ambient-source ambient-cool" />
      <span className="ambient-source ambient-violet" />
      <span className="ambient-source ambient-warm" />
      <span className="ambient-source ambient-green" />
    </div>
  );
}
