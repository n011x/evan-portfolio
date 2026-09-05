const PAPER = "#F2F1EE", NIGHT = "#101012";
const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const lum = (h) => { const [r,g,b] = [1,3,5].map(i => parseInt(h.slice(i,i+2),16)/255).map(lin); return 0.2126*r+0.7152*g+0.0722*b; };
const ratio = (a,b) => { const [l1,l2] = [lum(a),lum(b)].sort((x,y)=>y-x); return (l1+0.05)/(l2+0.05); };
console.log("— paper candidates —");
for (const h of ["#E33127","#D8342A","#CC2E24","#C0261C","#B31E14","#A81A12"]) console.log(h, "paper", ratio(h, PAPER).toFixed(2), "night", ratio(h, NIGHT).toFixed(2));
console.log("— dark-surface candidates —");
for (const h of ["#F0564A","#FF6B5E","#FF7A6E","#FF8C80","#E8574B"]) console.log(h, "night", ratio(h, NIGHT).toFixed(2), "paper", ratio(h, PAPER).toFixed(2));
