import { s as u } from "./index-d475d2ea.js";
var z = "measureEnabled";
const { useEffect: W } = __STORYBOOK_MODULE_PREVIEW_API__;
function Y() {
  let e = u.document.documentElement,
    t = Math.max(e.scrollHeight, e.offsetHeight);
  return { width: Math.max(e.scrollWidth, e.offsetWidth), height: t };
}
function j() {
  let e = u.document.createElement("canvas");
  e.id = "storybook-addon-measure";
  let t = e.getContext("2d"),
    { width: o, height: l } = Y();
  return (
    A(e, t, { width: o, height: l }),
    (e.style.position = "absolute"),
    (e.style.left = "0"),
    (e.style.top = "0"),
    (e.style.zIndex = "2147483647"),
    (e.style.pointerEvents = "none"),
    u.document.body.appendChild(e),
    { canvas: e, context: t, width: o, height: l }
  );
}
function A(e, t, { width: o, height: l }) {
  (e.style.width = `${o}px`), (e.style.height = `${l}px`);
  let i = u.window.devicePixelRatio;
  (e.width = Math.floor(o * i)), (e.height = Math.floor(l * i)), t.scale(i, i);
}
var m = {};
function K() {
  m.canvas || (m = j());
}
function X() {
  m.context && m.context.clearRect(0, 0, m.width, m.height);
}
function V(e) {
  X(), e(m.context);
}
function Z() {
  A(m.canvas, m.context, { width: 0, height: 0 });
  let { width: e, height: t } = Y();
  A(m.canvas, m.context, { width: e, height: t }),
    (m.width = e),
    (m.height = t);
}
function U() {
  m.canvas && (X(), m.canvas.parentNode.removeChild(m.canvas), (m = {}));
}
var w = {
    margin: "#f6b26b",
    border: "#ffe599",
    padding: "#93c47d",
    content: "#6fa8dc",
    text: "#232020",
  },
  c = 6;
function T(e, { x: t, y: o, w: l, h: i, r: n }) {
  (t = t - l / 2),
    (o = o - i / 2),
    l < 2 * n && (n = l / 2),
    i < 2 * n && (n = i / 2),
    e.beginPath(),
    e.moveTo(t + n, o),
    e.arcTo(t + l, o, t + l, o + i, n),
    e.arcTo(t + l, o + i, t, o + i, n),
    e.arcTo(t, o + i, t, o, n),
    e.arcTo(t, o, t + l, o, n),
    e.closePath();
}
function G(e, { padding: t, border: o, width: l, height: i, top: n, left: r }) {
  let f = l - o.left - o.right - t.left - t.right,
    a = i - t.top - t.bottom - o.top - o.bottom,
    s = r + o.left + t.left,
    h = n + o.top + t.top;
  return (
    e === "top"
      ? (s += f / 2)
      : e === "right"
      ? ((s += f), (h += a / 2))
      : e === "bottom"
      ? ((s += f / 2), (h += a))
      : e === "left"
      ? (h += a / 2)
      : e === "center" && ((s += f / 2), (h += a / 2)),
    { x: s, y: h }
  );
}
function J(e, t, { margin: o, border: l, padding: i }, n, r) {
  let f = (d) => 0,
    a = 0,
    s = 0,
    h = r ? 1 : 0.5,
    g = r ? n * 2 : 0;
  return (
    e === "padding"
      ? (f = (d) => i[d] * h + g)
      : e === "border"
      ? (f = (d) => i[d] + l[d] * h + g)
      : e === "margin" && (f = (d) => i[d] + l[d] + o[d] * h + g),
    t === "top"
      ? (s = -f("top"))
      : t === "right"
      ? (a = f("right"))
      : t === "bottom"
      ? (s = f("bottom"))
      : t === "left" && (a = -f("left")),
    { offsetX: a, offsetY: s }
  );
}
function Q(e, t) {
  return (
    Math.abs(e.x - t.x) < Math.abs(e.w + t.w) / 2 &&
    Math.abs(e.y - t.y) < Math.abs(e.h + t.h) / 2
  );
}
function x(e, t, o) {
  return (
    e === "top"
      ? (t.y = o.y - o.h - c)
      : e === "right"
      ? (t.x = o.x + o.w / 2 + c + t.w / 2)
      : e === "bottom"
      ? (t.y = o.y + o.h + c)
      : e === "left" && (t.x = o.x - o.w / 2 - c - t.w / 2),
    { x: t.x, y: t.y }
  );
}
function _(e, t, { x: o, y: l, w: i, h: n }, r) {
  return (
    T(e, { x: o, y: l, w: i, h: n, r: 3 }),
    (e.fillStyle = `${w[t]}dd`),
    e.fill(),
    (e.strokeStyle = w[t]),
    e.stroke(),
    (e.fillStyle = w.text),
    e.fillText(r, o, l),
    T(e, { x: o, y: l, w: i, h: n, r: 3 }),
    (e.fillStyle = `${w[t]}dd`),
    e.fill(),
    (e.strokeStyle = w[t]),
    e.stroke(),
    (e.fillStyle = w.text),
    e.fillText(r, o, l),
    { x: o, y: l, w: i, h: n }
  );
}
function C(e, t) {
  (e.font = "600 12px monospace"),
    (e.textBaseline = "middle"),
    (e.textAlign = "center");
  let o = e.measureText(t),
    l = o.actualBoundingBoxAscent + o.actualBoundingBoxDescent,
    i = o.width + c * 2,
    n = l + c * 2;
  return { w: i, h: n };
}
function tt(e, t, { type: o, position: l = "center", text: i }, n, r = !1) {
  let { x: f, y: a } = G(l, t),
    { offsetX: s, offsetY: h } = J(o, l, t, c + 1, r);
  (f += s), (a += h);
  let { w: g, h: d } = C(e, i);
  if (n && Q({ x: f, y: a, w: g, h: d }, n)) {
    let M = x(l, { x: f, y: a, w: g, h: d }, n);
    (f = M.x), (a = M.y);
  }
  return _(e, o, { x: f, y: a, w: g, h: d }, i);
}
function et(e, { w: t, h: o }) {
  let l = t * 0.5 + c,
    i = o * 0.5 + c;
  return {
    offsetX: (e.x === "left" ? -1 : 1) * l,
    offsetY: (e.y === "top" ? -1 : 1) * i,
  };
}
function ot(e, t, { type: o, text: l }) {
  let { floatingAlignment: i, extremities: n } = t,
    r = n[i.x],
    f = n[i.y],
    { w: a, h: s } = C(e, l),
    { offsetX: h, offsetY: g } = et(i, { w: a, h: s });
  return (r += h), (f += g), _(e, o, { x: r, y: f, w: a, h: s }, l);
}
function E(e, t, o, l) {
  let i = [];
  o.forEach((n, r) => {
    let f =
      l && n.position === "center" ? ot(e, t, n) : tt(e, t, n, i[r - 1], l);
    i[r] = f;
  });
}
function it(e, t, o, l) {
  let i = o.reduce(
    (n, r) => (
      Object.prototype.hasOwnProperty.call(n, r.position) ||
        (n[r.position] = []),
      n[r.position].push(r),
      n
    ),
    {}
  );
  i.top && E(e, t, i.top, l),
    i.right && E(e, t, i.right, l),
    i.bottom && E(e, t, i.bottom, l),
    i.left && E(e, t, i.left, l),
    i.center && E(e, t, i.center, l);
}
var S = {
    margin: "#f6b26ba8",
    border: "#ffe599a8",
    padding: "#93c47d8c",
    content: "#6fa8dca8",
  },
  R = 30;
function p(e) {
  return parseInt(e.replace("px", ""), 10);
}
function b(e) {
  return Number.isInteger(e) ? e : e.toFixed(2);
}
function P(e) {
  return e.filter((t) => t.text !== 0 && t.text !== "0");
}
function lt(e) {
  let t = {
      top: u.window.scrollY,
      bottom: u.window.scrollY + u.window.innerHeight,
      left: u.window.scrollX,
      right: u.window.scrollX + u.window.innerWidth,
    },
    o = {
      top: Math.abs(t.top - e.top),
      bottom: Math.abs(t.bottom - e.bottom),
      left: Math.abs(t.left - e.left),
      right: Math.abs(t.right - e.right),
    };
  return {
    x: o.left > o.right ? "left" : "right",
    y: o.top > o.bottom ? "top" : "bottom",
  };
}
function nt(e) {
  let t = u.getComputedStyle(e),
    {
      top: o,
      left: l,
      right: i,
      bottom: n,
      width: r,
      height: f,
    } = e.getBoundingClientRect(),
    {
      marginTop: a,
      marginBottom: s,
      marginLeft: h,
      marginRight: g,
      paddingTop: d,
      paddingBottom: M,
      paddingLeft: O,
      paddingRight: k,
      borderBottomWidth: F,
      borderTopWidth: I,
      borderLeftWidth: $,
      borderRightWidth: D,
    } = t;
  (o = o + u.window.scrollY),
    (l = l + u.window.scrollX),
    (n = n + u.window.scrollY),
    (i = i + u.window.scrollX);
  let y = { top: p(a), bottom: p(s), left: p(h), right: p(g) },
    N = { top: p(d), bottom: p(M), left: p(O), right: p(k) },
    q = { top: p(I), bottom: p(F), left: p($), right: p(D) },
    L = {
      top: o - y.top,
      bottom: n + y.bottom,
      left: l - y.left,
      right: i + y.right,
    };
  return {
    margin: y,
    padding: N,
    border: q,
    top: o,
    left: l,
    bottom: n,
    right: i,
    width: r,
    height: f,
    extremities: L,
    floatingAlignment: lt(L),
  };
}
function ft(
  e,
  { margin: t, width: o, height: l, top: i, left: n, bottom: r, right: f }
) {
  let a = l + t.bottom + t.top;
  (e.fillStyle = S.margin),
    e.fillRect(n, i - t.top, o, t.top),
    e.fillRect(f, i - t.top, t.right, a),
    e.fillRect(n, r, o, t.bottom),
    e.fillRect(n - t.left, i - t.top, t.left, a);
  let s = [
    { type: "margin", text: b(t.top), position: "top" },
    { type: "margin", text: b(t.right), position: "right" },
    { type: "margin", text: b(t.bottom), position: "bottom" },
    { type: "margin", text: b(t.left), position: "left" },
  ];
  return P(s);
}
function rt(
  e,
  {
    padding: t,
    border: o,
    width: l,
    height: i,
    top: n,
    left: r,
    bottom: f,
    right: a,
  }
) {
  let s = l - o.left - o.right,
    h = i - t.top - t.bottom - o.top - o.bottom;
  (e.fillStyle = S.padding),
    e.fillRect(r + o.left, n + o.top, s, t.top),
    e.fillRect(a - t.right - o.right, n + t.top + o.top, t.right, h),
    e.fillRect(r + o.left, f - t.bottom - o.bottom, s, t.bottom),
    e.fillRect(r + o.left, n + t.top + o.top, t.left, h);
  let g = [
    { type: "padding", text: t.top, position: "top" },
    { type: "padding", text: t.right, position: "right" },
    { type: "padding", text: t.bottom, position: "bottom" },
    { type: "padding", text: t.left, position: "left" },
  ];
  return P(g);
}
function at(
  e,
  { border: t, width: o, height: l, top: i, left: n, bottom: r, right: f }
) {
  let a = l - t.top - t.bottom;
  (e.fillStyle = S.border),
    e.fillRect(n, i, o, t.top),
    e.fillRect(n, r - t.bottom, o, t.bottom),
    e.fillRect(n, i + t.top, t.left, a),
    e.fillRect(f - t.right, i + t.top, t.right, a);
  let s = [
    { type: "border", text: t.top, position: "top" },
    { type: "border", text: t.right, position: "right" },
    { type: "border", text: t.bottom, position: "bottom" },
    { type: "border", text: t.left, position: "left" },
  ];
  return P(s);
}
function st(
  e,
  { padding: t, border: o, width: l, height: i, top: n, left: r }
) {
  let f = l - o.left - o.right - t.left - t.right,
    a = i - t.top - t.bottom - o.top - o.bottom;
  return (
    (e.fillStyle = S.content),
    e.fillRect(r + o.left + t.left, n + o.top + t.top, f, a),
    [{ type: "content", position: "center", text: `${b(f)} x ${b(a)}` }]
  );
}
function ht(e) {
  return (t) => {
    if (e && t) {
      let o = nt(e),
        l = ft(t, o),
        i = rt(t, o),
        n = at(t, o),
        r = st(t, o),
        f = o.width <= R * 3 || o.height <= R;
      it(t, o, [...r, ...i, ...n, ...l], f);
    }
  };
}
function mt(e) {
  V(ht(e));
}
var ut = (e, t) => {
    let o = u.document.elementFromPoint(e, t),
      l = (i) => {
        if (i && i.shadowRoot) {
          let n = i.shadowRoot.elementFromPoint(e, t);
          return i.isEqualNode(n) ? i : n.shadowRoot ? l(n) : n;
        }
        return i;
      };
    return l(o) || o;
  },
  B,
  v = { x: 0, y: 0 };
function H(e, t) {
  (B = ut(e, t)), mt(B);
}
var dt = (e, t) => {
    let { measureEnabled: o } = t.globals;
    return (
      W(() => {
        let l = (i) => {
          window.requestAnimationFrame(() => {
            i.stopPropagation(), (v.x = i.clientX), (v.y = i.clientY);
          });
        };
        return (
          document.addEventListener("pointermove", l),
          () => {
            document.removeEventListener("pointermove", l);
          }
        );
      }, []),
      W(() => {
        let l = (n) => {
            window.requestAnimationFrame(() => {
              n.stopPropagation(), H(n.clientX, n.clientY);
            });
          },
          i = () => {
            window.requestAnimationFrame(() => {
              Z();
            });
          };
        return (
          t.viewMode === "story" &&
            o &&
            (document.addEventListener("pointerover", l),
            K(),
            window.addEventListener("resize", i),
            H(v.x, v.y)),
          () => {
            window.removeEventListener("resize", i), U();
          }
        );
      }, [o, t.viewMode]),
      e()
    );
  },
  pt = [dt],
  ct = { [z]: !1 };
export { pt as decorators, ct as globals };
//# sourceMappingURL=preview-2cd4e1a1.js.map
