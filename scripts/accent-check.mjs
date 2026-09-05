const PAPER = "#F2F1EE", NIGHT = "#101012", INK = "#0B0B0C";
const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const lum = (h) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const mix = (h, over, alpha) => {
  const p = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const q = [1, 3, 5].map((i) => parseInt(over.slice(i, i + 2), 16));
  const m = p.map((v, i) => Math.round(q[i] * alpha + v * (1 - alpha)));
  return "#" + m.map((v) => v.toString(16).padStart(2, "0")).join("");
};

const cands = {
  "ULTRAMARINE (selected)": "#2C2BE8",
  "A1 chartreuse bright": "#A8C400",
  "A2 chartreuse deep": "#7E9B00",
  "A3 chartreuse olive": "#6B8400",
  "B1 amber bright": "#E07A0C",
  "B2 industrial amber": "#C25E0A",
  "B3 burnt orange": "#A8480A",
  "C1 magenta": "#C2007A",
  "C2 magenta deep": "#A50068",
  "C3 plum": "#7E1E5E",
};

for (const [name, hex] of Object.entries(cands)) {
  const onPaper = ratio(hex, PAPER);
  const onNight = ratio(hex, NIGHT);
  const markTint = mix(PAPER, hex, 0.16);
  const inkOnMark = ratio(INK, markTint);
  console.log(
    name.padEnd(24),
    hex,
    "paper:", onPaper.toFixed(2).padStart(5),
    "night:", onNight.toFixed(2).padStart(5),
    "ink-on-16%-mark:", inkOnMark.toFixed(2),
  );
}
