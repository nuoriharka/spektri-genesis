"use client";
import React from "react";

const useGlobalError = () => {
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const handler = (e: any) => {
      setError(e?.error?.stack || e?.error?.message || e?.reason || e?.message || String(e));
      (window as any).__LAST_ERROR__ = error;
    };
    window.addEventListener("error", handler);
    window.addEventListener("unhandledrejection", handler);
    return () => {
      window.removeEventListener("error", handler);
      window.removeEventListener("unhandledrejection", handler);
    };
  }, [error]);
  return error;
};

export default function DevErrorOverlay() {
  const error = useGlobalError();
  if (!error || process.env.NODE_ENV !== "development") return null;
  return (
    <div style={{
      position: "fixed",
      bottom: 16,
      right: 16,
      zIndex: 9999,
      background: "rgba(255,0,0,0.85)",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: "12px",
      fontSize: "13px",
      maxWidth: "400px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      pointerEvents: "none"
    }}>
      <strong>Virhe:</strong>
      <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{error}</pre>
    </div>
  );
}
