const PAPER = "#F2F1EE", NIGHT = "#101012";
const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const lum = (h) => { const [r,g,b] = [1,3,5].map(i => parseInt(h.slice(i,i+2),16)/255).map(lin); return 0.2126*r+0.7152*g+0.0722*b; };
const ratio = (a,b) => { const [l1,l2] = [lum(a),lum(b)].sort((x,y)=>y-x); return (l1+0.05)/(l2+0.05); };
const pairs = {
  ULTRAMARINE: { light: "#2C2BE8", dark: ["#6E6DFF", "#7C7BFF", "#8A89FF"] },
  CHARTREUSE:  { light: "#6B8400", dark: ["#A8C400", "#B7D42A", "#C6E23F"] },
  AMBER:       { light: "#C25E0A", dark: ["#E8912E", "#F0A250", "#FFB061"] },
  MAGENTA:     { light: "#C2007A", dark: ["#FF4FA8", "#F26BB4", "#FF80BF"] },
};
for (const [k, v] of Object.entries(pairs)) {
  console.log(k, "light", v.light, "on paper", ratio(v.light, PAPER).toFixed(2));
  for (const d of v.dark) console.log("   dark", d, "on night", ratio(d, NIGHT).toFixed(2));
}
