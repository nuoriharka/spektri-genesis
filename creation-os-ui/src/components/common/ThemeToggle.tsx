
"use client";
export function ThemeToggle() {
  const set = (v: "tech" | "designer") => {
    document.documentElement.setAttribute("data-theme", v);
    localStorage.setItem("creation-os-theme", v);
  };
  return (
    <div className="flex gap-2">
      <button className="btn" onClick={() => set("tech")}>Tech</button>
      <button className="btn" onClick={() => set("designer")}>Designer</button>
    </div>
  );
}
