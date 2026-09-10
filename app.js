"use strict";
/* ══════════════════════════════════════════════════════════════════════════
   KOSH — a manual ledger.
   Everything here was typed in by hand, so the app owes you two things:
   entry that takes under five seconds, and a picture worth the typing.
   Data lives in this browser only. Nothing is sent anywhere.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── icons ────────────────────────────────────────────────────────────── */
const SVG = (b, o) => '<svg width="' + (o && o.s || 18) + '" height="' + (o && o.s || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (o && o.w || 2.6) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + b + '</svg>';
const I = {
  menu: s => '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2.2" fill="var(--k-bg)"/><circle cx="16" cy="12" r="2.2" fill="var(--k-bg)"/><circle cx="8" cy="18" r="2.2" fill="var(--k-bg)"/></svg>',
  eye: s => SVG('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>', { s: s, w: 2.6 }),
  eyeOff: s => SVG('<path d="M10.7 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a19 19 0 0 1-3.2 4.1M6.4 6.7A18.6 18.6 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 4.4-1"/><path d="m2 2 20 20"/>', { s: s, w: 2.6 }),
  trendUp: s => SVG('<path d="M3 17 10 10l4 4 7-7"/><path d="M15 6h6v6"/>', { s: s, w: 3 }),
  trendDown: s => SVG('<path d="M3 7 10 14l4-4 7 7"/><path d="M15 18h6v-6"/>', { s: s, w: 3 }),
  inArrow: s => SVG('<path d="M17 7 7 17M17 17H7V7"/>', { s: s, w: 3 }),
  outArrow: s => SVG('<path d="M7 17 17 7M7 7h10v10"/>', { s: s, w: 3 }),
  plus: s => SVG('<path d="M12 5v14M5 12h14"/>', { s: s, w: 3.2 }),
  move: s => SVG('<path d="m16 3 4 4-4 4M20 7H5M8 21l-4-4 4-4M4 17h15"/>', { s: s, w: 2.75 }),
  split: s => SVG('<path d="M12 21v-7M12 14 5 9V4M12 14l7-5V4"/>', { s: s, w: 2.75 }),
  home: s => SVG('<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>', { s: s }),
  bank: s => SVG('<path d="M19 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6"/><path d="M16.5 13h.01"/>', { s: s }),
  card: s => SVG('<rect x="2" y="5" width="20" height="14" rx="3.5"/><path d="M2 10h20"/>', { s: s }),
  users: s => SVG('<path d="M16 21v-1.6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V21"/><circle cx="9" cy="7" r="3.6"/><path d="M22 21v-1.6a4 4 0 0 0-3-3.85"/><path d="M16.5 3.6a4 4 0 0 1 0 7"/>', { s: s }),
  pulse: s => SVG('<path d="M22 12h-4l-3 8L9 4l-3 8H2"/>', { s: s }),
  chev: s => SVG('<path d="m9 5 7 7-7 7"/>', { s: s, w: 3 }),
  chevL: s => SVG('<path d="m15 5-7 7 7 7"/>', { s: s, w: 3 }),
  close: s => SVG('<path d="M6 6 18 18M18 6 6 18"/>', { s: s, w: 3 }),
  clock: s => SVG('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>', { s: s, w: 2.75 }),
  check: s => SVG('<path d="m4 12 6 6L20 6"/>', { s: s, w: 3.2 }),
  lock: s => SVG('<rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>', { s: s, w: 2.75 }),
  down: s => SVG('<path d="M12 3v12M7 11l5 5 5-5M4 20h16"/>', { s: s, w: 2.75 }),
  up: s => SVG('<path d="M12 21V9M7 13l5-5 5 5M4 4h16"/>', { s: s, w: 2.75 }),
  pct: s => SVG('<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.6"/><circle cx="17" cy="17" r="2.6"/>', { s: s, w: 2.75 }),
  grid: s => SVG('<rect x="3" y="3" width="7.5" height="7.5" rx="2.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2.5"/><path d="M17.25 14.5v5.5M14.5 17.25h5.5"/>', { s: s, w: 2.75 }),
  undo: s => SVG('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>', { s: s, w: 2.75 }),
  backspace: s => SVG('<path d="M9.4 4.4H20a2.4 2.4 0 0 1 2.4 2.4v10.4A2.4 2.4 0 0 1 20 19.6H9.4L1.4 12z"/><path d="m18.4 9.2-5.2 5.6M13.2 9.2l5.2 5.6"/>', { s: s, w: 2.5 }),
  trash: s => SVG('<path d="M4 7h16M10 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>', { s: s, w: 2.6 }),
  bars: s => SVG('<path d="M4 20v-6M10 20V4M16 20v-9M22 20H2"/>', { s: s, w: 2.8 }),
  spark: s => SVG('<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>', { s: s, w: 2.6 })
};

/* ── formatting ───────────────────────────────────────────────────────── */
const YEAR_MS = 31557600000;        /* 365.25 days */
const FREQ_N = { Daily: 365, Monthly: 12, Quarterly: 4 };
const FREQS = ['Daily', 'Monthly', 'Quarterly'];
const ATYPES = ['Savings', 'Checking', 'Deposit', 'Investment', 'Cash'];
const TGRP = { Savings: 'liquid', Checking: 'liquid', Deposit: 'locked', Investment: 'locked', Cash: 'cash' };
const INTAGS = ['Salary', 'Freelance', 'Reimbursement', 'Interest', 'Refund', 'Gift'];
const SW = ['#c67139', '#f6a06b', '#aebf92', '#8fa073', '#c0b6a5', '#d67f48', '#82796a'];
const GL = ['Fd', 'Rn', 'Tx', 'Sh', 'Hl', 'Sb', 'Iv', 'Gf'];
const CARD_SKINS = [
  { bg: 'linear-gradient(150deg,#3b2c1e,#221a14 68%)', ring: '#f6a06b' },
  { bg: 'linear-gradient(150deg,#3a2119,#1f1512 68%)', ring: '#c67139' },
  { bg: 'linear-gradient(150deg,#2c3324,#191c14 68%)', ring: '#aebf92' },
  { bg: 'linear-gradient(150deg,#33302a,#1a1815 68%)', ring: '#c0b6a5' }
];
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/* Indian digit grouping: 14,99,360 */
function fmt(n) {
  const neg = n < -0.5;
  const s = Math.round(Math.abs(n)).toString();
  let last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  if (rest) last3 = ',' + last3;
  return (neg ? '−₹' : '₹') + rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + last3;
}
function fmtPaise(n) {
  const w = Math.floor(Math.abs(n));
  const p = Math.abs(n) - w;
  return fmt(w).replace('₹', '₹') + p.toFixed(2).slice(1);
}
/* Lakh / crore shorthand — a tile is too narrow for ₹17,69,840 in full */
function fmtShort(n) {
  const a = Math.abs(n), sign = n < -0.5 ? '−' : '';
  if (a >= 10000000) return sign + '₹' + (a / 10000000).toFixed(2).replace(/\.00$/, '') + 'Cr';
  if (a >= 100000) return sign + '₹' + (a / 100000).toFixed(2).replace(/\.00$/, '') + 'L';
  return fmt(n);
}
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function uid(p) { return (p || 'k') + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function initials(s) {
  const w = String(s || '').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return '••';
  const t = w.length > 1 ? w[0][0] + w[1][0] : w[0].slice(0, 2);
  return t.toUpperCase();
}
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function ymOf(ts) { const d = new Date(ts); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
const MONTHS_LONG = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
function ymLabel(ym) {
  const p = ym.split('-');
  const long = MONTHS_LONG[+p[1] - 1];
  return +p[0] === new Date().getFullYear() ? long : long + ' ' + p[0];
}
function dayLabel(ts) {
  const d = new Date(ts), n = new Date();
  const sameDay = d.toDateString() === n.toDateString();
  if (sameDay) return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }).toLowerCase();
  return d.getDate() + ' ' + MONTHS[d.getMonth()];
}
function daysBetween(a, b) { return Math.round((b - a) / 86400000); }

/* ── store ────────────────────────────────────────────────────────────── */
const KEY = 'kosh.ledger.v1';
const OPENED_AT = Date.now();

function blankDB() {
  const now = Date.now();
  return {
    v: 1,
    accounts: [],
    cards: [],
    cats: [
      { id: 'rent', name: 'Rent & utilities', color: '#c67139', glyph: 'Rn', cap: 45000, kind: 'expense' },
      { id: 'food', name: 'Food & drink', color: '#f6a06b', glyph: 'Fd', cap: 22000, kind: 'expense' },
      { id: 'shop', name: 'Shopping', color: '#d67f48', glyph: 'Sh', cap: 10000, kind: 'expense' },
      { id: 'txp', name: 'Transport', color: '#aebf92', glyph: 'Tx', cap: 9000, kind: 'expense' },
      { id: 'hlth', name: 'Health', color: '#8fa073', glyph: 'Hl', cap: 8000, kind: 'expense' },
      { id: 'subs', name: 'Subscriptions', color: '#c0b6a5', glyph: 'Sb', cap: 3000, kind: 'expense' },
      { id: 'invest', name: 'Investments', color: '#82796a', glyph: 'Iv', cap: 25000, kind: 'investment' }
    ],
    people: [{ id: 'you', name: 'You' }],
    groups: [],
    txns: [],
    bills: [],
    ui: { hidden: false, dismissed: {} },
    settings: { autoBackup: true, createdAt: now, lastBackup: null, theme: 'dark' }
  };
}

let DB = blankDB();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p && p.v === 1) DB = Object.assign(blankDB(), p);
    }
  } catch (e) { /* private mode, cleared storage — start fresh */ }
  DB.ui = DB.ui || {}; DB.ui.dismissed = DB.ui.dismissed || {};
  DB.settings = DB.settings || {};
  if (!DB.settings.theme) DB.settings.theme = 'dark';
  crystallizeAll();
}
/* 'system' hands the decision back to the OS / the page it is embedded in;
   'light' and 'dark' stamp the root and win over both. */
function applyTheme() {
  const t = (DB.settings && DB.settings.theme) || 'dark';
  const root = document.documentElement;
  if (t === 'system') root.removeAttribute('data-kosh');
  else root.setAttribute('data-kosh', t);
}
let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(DB)); }
    catch (e) { toast('Could not save — this browser is blocking storage'); }
  }, 120);
}

/* ── volatile UI state (not persisted) ────────────────────────────────── */
const S = {
  screen: 'home',
  sheet: null,
  cardIndex: 0,
  group: 'all',
  editCat: null,
  month: ymOf(Date.now()),
  recalc: false,
  detailId: null,
  stmtMonth: null,
  stmtCycle: 0,
  form: {},
  tick: 0
};

/* ── interest engine ──────────────────────────────────────────────────── */
function effRate(a) {
  const r = +a.rate || 0;
  if (!r) return 0;
  const n = FREQ_N[a.freq] || 12;
  return Math.pow(1 + (r / 100) / n, n) - 1;
}
/* Money in the account, not counting interest that has not been posted yet. */
function principal(a) {
  let v = +a.opening || 0;
  v += (a.accBase || 0);
  for (const t of DB.txns) {
    if (t.dir === 'in' && t.src === a.id) v += t.amount;
    else if (t.dir === 'out' && t.src === a.id) v -= t.amount;
    else if (t.dir === 'transfer') {
      if (t.src === a.id) v -= t.amount;
      if (t.to === a.id) v += t.amount;
    }
  }
  return v;
}
/* (1 + r/n)^(n·t) − 1, not a straight-line slice of the annual figure.
   Compounds properly within the period, and — because (1+x)^(a+b) equals
   (1+x)^a·(1+x)^b — posting interest more often no longer earns you more. */
function pendingInterest(a, now) {
  const r = +a.rate || 0;
  if (!r) return 0;
  const n = FREQ_N[a.freq] || 12;
  const dt = Math.max(0, (now || Date.now()) - (a.accAnchor || DB.settings.createdAt));
  const years = dt / YEAR_MS;
  return principal(a) * (Math.pow(1 + (r / 100) / n, n * years) - 1);
}
function accBalance(a, now) { return principal(a) + pendingInterest(a, now); }
/* Post the interest earned so far, so the next stretch compounds on it. */
function crystallize(a) {
  const earned = pendingInterest(a);
  a.accBase = (a.accBase || 0) + earned;
  a.accAnchor = Date.now();
  return earned;
}
function crystallizeAll() { DB.accounts.forEach(crystallize); }
function yearlyInterest() {
  return DB.accounts.reduce((t, a) => t + principal(a) * effRate(a), 0);
}
function liveAccrued() {
  const y = yearlyInterest();
  return y * ((Date.now() - OPENED_AT) / YEAR_MS);
}

/* ── card cycles ──────────────────────────────────────────────────────── */
/* offset 0 = the statement that has already closed, 1 = the next one,
   −k = k statements before the last one */
function statementDate(day, offset) {
  const now = new Date();
  let y = now.getFullYear(), m = now.getMonth();
  const at = (yy, mm) => new Date(yy, mm, Math.min(day, daysInMonth(yy, mm)), 23, 59, 59, 999);
  if (at(y, m) > now) m -= 1;
  m += (offset || 0);
  y += Math.floor(m / 12);
  m = ((m % 12) + 12) % 12;
  return at(y, m);
}
/* the first due-day that falls after a statement closes */
function dueDateFor(end, dueDay) {
  let y = end.getFullYear(), m = end.getMonth();
  const at = (yy, mm) => new Date(yy, mm, Math.min(dueDay, daysInMonth(yy, mm)), 23, 59, 59, 999);
  if (at(y, m) <= end) { m += 1; if (m > 11) { m = 0; y += 1; } }
  return at(y, m);
}
function defaultDueDay(statementDay) { return ((statementDay + 18 - 1) % 31) + 1; }
/* 29–31 mean "the last day the month has" — statementDate clamps per month */
function dayName(d) { return d >= 29 ? d + ' (or month end)' : String(d); }
function cycleLabel(cy) {
  const s = new Date(cy.start.getTime() + 1000);
  return s.getDate() + ' ' + MONTHS[s.getMonth()] + ' – ' + cy.end.getDate() + ' ' + MONTHS[cy.end.getMonth()];
}

/* Every cycle this card has run, oldest first, with payments applied the way an
   issuer applies them: oldest balance first. The last entry is the open cycle. */
function cardCycles(c, n) {
  n = (n == null ? 5 : n);
  const dueDay = +c.dueDay || defaultDueDay(c.statementDay);
  const list = [];
  for (let k = n; k >= 0; k--) {
    const start = statementDate(c.statementDay, -k);
    const end = statementDate(c.statementDay, 1 - k);
    let charged = 0, count = 0;
    for (const t of DB.txns) {
      if (t.src !== c.id || t.ts <= start.getTime() || t.ts > end.getTime()) continue;
      if (t.dir === 'out') { charged += t.amount; count++; }
      else if (t.dir === 'in') charged -= t.amount;
    }
    list.push({ start, end, charged: Math.max(0, charged), count, open: k === 0, due: dueDateFor(end, dueDay) });
  }
  /* anything older than the window, plus whatever the card carried when it was added */
  const firstStart = list[0].start.getTime();
  let older = +c.openingDue || 0;
  for (const t of DB.txns) {
    if (t.src !== c.id || t.ts > firstStart) continue;
    if (t.dir === 'out') older += t.amount; else if (t.dir === 'in') older -= t.amount;
  }
  older = Math.max(0, older);

  let pool = 0;
  for (const t of DB.txns) if (t.dir === 'transfer' && t.to === c.id) pool += t.amount;
  const payOff = amt => { const p = Math.min(pool, amt); pool -= p; return Math.max(0, amt - p); };

  const carried = payOff(older);
  const now = Date.now();
  for (const cy of list) {
    cy.outstanding = payOff(cy.charged);
    cy.label = cycleLabel(cy);
    cy.state = cy.open ? 'open'
      : cy.outstanding <= 0.5 ? 'paid'
        : now > cy.due.getTime() ? 'overdue' : 'due';
  }
  return { cycles: list, carried, credit: pool };
}

function cardStats(c) {
  const last = statementDate(c.statementDay, 0);
  const next = statementDate(c.statementDay, 1);
  const cc = cardCycles(c);
  const open = cc.cycles[cc.cycles.length - 1];
  const closed = cc.cycles.slice(0, -1);
  const unbilled = open.outstanding;
  const billed = cc.carried + closed.reduce((t, cy) => t + cy.outstanding, 0);
  const outstanding = billed + unbilled;
  const limit = +c.limit || 1;
  const avail = Math.max(0, limit - outstanding);
  const elapsed = Math.max(1, daysBetween(last.getTime(), Date.now()));
  const cycleLen = Math.max(1, daysBetween(last.getTime(), next.getTime()));
  const owing = closed.filter(cy => cy.outstanding > 0.5);
  /* a balance carried in from before the window is due by the oldest cycle's date */
  const nextDue = owing.length ? owing[0].due : (cc.carried > 0.5 ? cc.cycles[0].due : null);
  return {
    outstanding, unbilled, billed, avail, limit,
    pctFree: Math.max(0, Math.min(100, Math.round(avail / limit * 100))),
    last, next, daysToStatement: Math.max(0, daysBetween(Date.now(), next.getTime())),
    projected: Math.round(open.charged / elapsed * cycleLen),
    cycleLabel: cycleLabel(open),
    cycleCount: open.count,
    cycles: cc.cycles, carried: cc.carried, credit: cc.credit,
    nextDue, daysToDue: nextDue ? daysBetween(Date.now(), nextDue.getTime()) : null,
    overdue: owing.some(cy => cy.state === 'overdue')
  };
}
/* Average charged per month across the three *completed* months before this one.
   Returns 0 when there is not enough history — a forecast off one month is noise. */
function cardAvg3(c) {
  const d = new Date();
  const keys = [1, 2, 3].map(k => { const t = new Date(d.getFullYear(), d.getMonth() - k, 1); return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0'); });
  const per = {};
  for (const t of DB.txns) if (t.dir === 'out' && t.src === c.id) { const y = ymOf(t.ts); if (keys.indexOf(y) > -1) per[y] = (per[y] || 0) + t.amount; }
  const months = Object.keys(per);
  if (months.length < 2) return 0;
  return months.reduce((s, k) => s + per[k], 0) / months.length;
}

/* ── totals ───────────────────────────────────────────────────────────── */
function assetsTotal() { return DB.accounts.reduce((t, a) => t + accBalance(a), 0); }
function duesTotal() { return DB.cards.reduce((t, c) => t + cardStats(c).outstanding, 0); }
function netWorth() { return assetsTotal() - duesTotal(); }
function groupTotal(g) { return DB.accounts.filter(a => a.group === g).reduce((t, a) => t + accBalance(a), 0); }

function monthFlows(ym) {
  let inn = 0, out = 0, invest = 0;
  for (const t of DB.txns) {
    if (ymOf(t.ts) !== ym) continue;
    if (t.dir === 'in') inn += t.amount;
    else if (t.dir === 'out') {
      const c = catById(t.catId);
      if (c && c.kind === 'investment') invest += t.amount; else out += t.amount;
    }
  }
  return { inn, out, invest };
}
/* Invested = transfers into a locked/invested account, plus spending tagged to
   an investment category. It leaves the liquid side but it does not burn. */
function isInvestFlow(t) {
  if (t.dir === 'transfer' && t.to) {
    const a = DB.accounts.find(x => x.id === t.to);
    return !!(a && a.group === 'locked');
  }
  if (t.dir === 'out') {
    const c = DB.cats.find(x => x.id === t.catId);
    return !!(c && c.kind === 'investment');
  }
  return false;
}
function monthInvested(ym) {
  let v = 0;
  for (const t of DB.txns) if (ymOf(t.ts) === ym && isInvestFlow(t)) v += t.amount;
  return v;
}
function catById(id) { return DB.cats.find(c => c.id === id) || null; }
function acctById(id) { return DB.accounts.find(a => a.id === id) || null; }
function cardById(id) { return DB.cards.find(c => c.id === id) || null; }
function sourceById(id) { return acctById(id) || cardById(id); }
/* a card goes by its product name and an account by its bank, so a charge on
   HDFC Infinia never reads the same as one from HDFC Savings */
function sourceLabel(id) {
  const s = sourceById(id);
  if (!s) return 'unknown';
  const w = (s.name || '').split(' ');
  return (cardById(id) ? (w[1] || w[0]) : w[0]).toLowerCase();
}
function catSpend(catId, ym) {
  let v = 0;
  for (const t of DB.txns) if (t.dir === 'out' && t.catId === catId && ymOf(t.ts) === ym) v += t.amount;
  return v;
}
function prevYm(ym) {
  const p = ym.split('-'); let y = +p[0], m = +p[1] - 2;
  if (m < 0) { m = 11; y -= 1; }
  return y + '-' + String(m + 1).padStart(2, '0');
}
function spendCats() { return DB.cats.filter(c => c.kind !== 'investment'); }
function ceilingTotal() { return spendCats().reduce((t, c) => t + (+c.cap || 0), 0); }

/* ── statements ───────────────────────────────────────────────────────── */
/* every entry that touched this account or card, newest first — no cap */
function txnsFor(id) {
  return DB.txns.filter(t => t.src === id || t.to === id).sort((a, b) => b.ts - a.ts);
}
function monthsFor(id) {
  const seen = {};
  for (const t of txnsFor(id)) seen[ymOf(t.ts)] = 1;
  return Object.keys(seen).sort().reverse();
}
/* what a month did to one account or card */
function periodSummary(id, list) {
  let inn = 0, out = 0;
  const isCard = !!cardById(id);
  for (const t of list) {
    if (t.dir === 'in' && t.src === id) inn += t.amount;
    else if (t.dir === 'out' && t.src === id) out += t.amount;
    else if (t.dir === 'transfer') {
      if (t.to === id) inn += t.amount;
      else if (t.src === id) out += t.amount;
    }
  }
  /* on a card, money "in" is a payment or refund against what you owe */
  return { inn, out, net: isCard ? inn - out : inn - out, count: list.length };
}
function txnsInMonth(id, ym) { return txnsFor(id).filter(t => ymOf(t.ts) === ym); }
function txnsInCycle(c, cy) {
  return txnsFor(c.id).filter(t => t.ts > cy.start.getTime() && t.ts <= cy.end.getTime());
}

/* ── shared bills ─────────────────────────────────────────────────────── */
function personName(id) { const p = DB.people.find(x => x.id === id); return p ? p.name : 'someone'; }
function billShares(b) {
  const total = +b.total || 0;
  return (b.shares || []).map(s => ({ pid: s.pid, pct: s.pct, amount: Math.round(total * s.pct / 100), name: personName(s.pid) }));
}
/* What this bill means for you, in rupees. Positive = coming to you. */
function billDelta(b) {
  if (b.settled) return 0;
  const shares = billShares(b);
  if (b.payerId === 'you') return shares.filter(s => s.pid !== 'you').reduce((t, s) => t + s.amount, 0);
  const mine = shares.find(s => s.pid === 'you');
  return mine ? -mine.amount : 0;
}
function sharedSummary() {
  let owed = 0, owe = 0;
  const owedBy = new Set(), oweTo = new Set();
  for (const b of DB.bills) {
    const d = billDelta(b);
    if (d > 0) { owed += d; billShares(b).forEach(s => { if (s.pid !== 'you' && s.amount > 0) owedBy.add(s.name); }); }
    else if (d < 0) { owe += -d; oweTo.add(personName(b.payerId)); }
  }
  return { owed, owe, owedBy: [...owedBy], oweTo: [...oweTo] };
}
function billOwedLine(b) {
  const d = billDelta(b);
  if (b.settled) return 'settled ' + (b.settledAt ? dayLabel(b.settledAt) : '');
  if (d > 0) {
    const others = billShares(b).filter(s => s.pid !== 'you' && s.amount > 0);
    if (!others.length) return 'all yours';
    if (others.length === 1) return others[0].name + ' owes you ' + fmt(others[0].amount);
    return others.length + ' people owe you ' + fmt(d);
  }
  if (d < 0) return 'you owe ' + personName(b.payerId) + ' ' + fmt(-d);
  return 'nothing outstanding';
}

/* ── the alert engine — every rule below fires off real numbers ───────── */
function buildAlerts() {
  const out = [];
  const ym = ymOf(Date.now());
  const now = Date.now();
  const push = a => { if (!DB.ui.dismissed[a.id]) out.push(a); };

  /* ceilings */
  for (const c of spendCats()) {
    const sp = catSpend(c.id, ym), cap = +c.cap || 0;
    if (cap > 0 && sp > cap) push({
      id: 'ceil-' + c.id + '-' + ym, glyph: '!', kind: 'CEILING', hue: 'var(--k-acc)',
      tint: 'color-mix(in srgb,var(--k-acc) 16%,transparent)', line: 'color-mix(in srgb,var(--k-acc) 40%,transparent)',
      title: c.name + ' broke its ceiling',
      body: fmt(sp) + ' spent against a ' + fmt(cap) + ' ceiling — ' + fmt(sp - cap) + ' over. Raise the ceiling or stop here.',
      cta: 'Adjust the ceiling', act: 'goTrendsCat', p: c.id
    });
  }
  /* three or more entries on one tag today */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const counts = {};
  for (const t of DB.txns) if (t.dir === 'out' && t.ts >= today.getTime() && t.catId) counts[t.catId] = (counts[t.catId] || 0) + 1;
  for (const cid in counts) if (counts[cid] >= 3) {
    const c = catById(cid); if (!c) continue;
    push({
      id: 'freq-' + cid + '-' + today.getTime(), glyph: '↻', kind: 'FREQUENCY', hue: 'var(--k-acc)',
      tint: 'color-mix(in srgb,var(--k-acc) 16%,transparent)', line: 'color-mix(in srgb,var(--k-acc) 40%,transparent)',
      title: c.name.toLowerCase() + ', ' + counts[cid] + ' times today',
      body: 'Three or more entries on one tag in a single day is unusual. Worth a look before it becomes a habit.',
      cta: 'See the trend', act: 'goTrendsCat', p: cid
    });
  }
  /* cards */
  for (const c of DB.cards) {
    const st = cardStats(c), avg = cardAvg3(c);
    if (st.billed > 0) push({
      id: 'due-' + c.id + '-' + st.last.getTime(), glyph: '₹', kind: 'DUE', hue: 'var(--k-acc)',
      tint: 'color-mix(in srgb,var(--k-acc) 16%,transparent)', line: 'color-mix(in srgb,var(--k-acc) 40%,transparent)',
      title: fmt(st.billed) + ' billed on ' + c.name,
      body: 'Statement generated ' + st.last.getDate() + ' ' + MONTHS[st.last.getMonth()] + '. Log the payment the moment it clears, or the balance here is fiction.',
      cta: 'Log the payment', act: 'payCard', p: c.id
    });
    if (avg > 0 && st.projected > avg * 1.2) push({
      id: 'fc-' + c.id + '-' + ym, glyph: '↑', kind: 'FORECAST', hue: 'var(--k-acc)',
      tint: 'color-mix(in srgb,var(--k-acc) 14%,transparent)', line: 'color-mix(in srgb,var(--k-acc) 28%,transparent)',
      title: 'This bill is running hot',
      body: c.name + ' generates in ' + st.daysToStatement + ' days at a projected ' + fmt(st.projected) + ' — ' + Math.round((st.projected / avg - 1) * 100) + '% over your three-month average of ' + fmt(avg) + '.',
      cta: 'See the cards', act: 'goCard', p: c.id
    });
    if (st.pctFree < 20) push({
      id: 'hr-' + c.id + '-' + ym, glyph: '◔', kind: 'HEADROOM', hue: 'var(--k-acc)',
      tint: 'color-mix(in srgb,var(--k-acc) 14%,transparent)', line: 'var(--k-line)',
      title: c.name + ' is down to ' + st.pctFree + '% free',
      body: fmt(st.avail) + ' of a ' + fmt(st.limit) + ' limit. Utilisation above 30% is the part credit scores notice.',
      cta: 'See the cards', act: 'goCard', p: c.id
    });
  }
  /* cash that has not been counted */
  for (const a of DB.accounts) {
    if (a.group !== 'cash') continue;
    const d = daysBetween(a.lastCounted || a.createdAt || now, now);
    if (d >= 5) push({
      id: 'stale-' + a.id + '-' + Math.floor(now / 86400000), glyph: '₹', kind: 'UNREVIEWED', hue: 'var(--k-acc)',
      tint: 'color-mix(in srgb,var(--k-acc) 14%,transparent)', line: 'var(--k-line)',
      title: a.name + ' has drifted',
      body: 'Last counted ' + d + ' days ago. In a manual ledger cash is the entity most likely to be wrong — recount it, or safe-to-spend is guessing.',
      cta: 'Recount it', act: 'openDetail', p: a.id
    });
  }
  /* shared bills left hanging */
  const stale = DB.bills.filter(b => !b.settled && daysBetween(b.ts, now) >= 14);
  if (stale.length) {
    const sum = stale.reduce((t, b) => t + Math.abs(billDelta(b)), 0);
    push({
      id: 'settle-' + Math.floor(now / 86400000), glyph: '⇄', kind: 'SETTLEMENT', hue: 'var(--k-sage)',
      tint: 'color-mix(in srgb,var(--k-sage) 14%,transparent)', line: 'var(--k-line)',
      title: stale.length + (stale.length === 1 ? ' bill has' : ' bills have') + ' been open a fortnight',
      body: fmt(sum) + ' still moving between you and ' + (stale.length === 1 ? 'someone' : 'people') + '. Older than two weeks and people stop remembering the same numbers.',
      cta: 'Open shared', act: 'goShared'
    });
  }
  /* month is nearly out and the ceilings still hold */
  const f = monthFlows(ym), cap = ceilingTotal();
  const d = new Date(), left = daysInMonth(d.getFullYear(), d.getMonth()) - d.getDate();
  if (cap > 0 && left <= 6 && f.out < cap * 0.85) push({
    id: 'under-' + ym, glyph: '✓', kind: 'PACE', hue: 'var(--k-sage)',
    tint: 'color-mix(in srgb,var(--k-sage) 14%,transparent)', line: 'var(--k-line)',
    title: 'You are under every ceiling with ' + left + ' days left',
    body: fmt(cap - f.out) + ' of the month\'s ' + fmt(cap) + ' is unspent. Sweep some of it before the reset takes the credit.',
    cta: 'Move it somewhere', act: 'openMove'
  });
  return out;
}
function safeToSpend() {
  const ym = ymOf(Date.now()), f = monthFlows(ym), cap = ceilingTotal();
  const d = new Date(), dim = daysInMonth(d.getFullYear(), d.getMonth());
  const left = Math.max(1, dim - d.getDate() + 1);
  const unallocated = Math.max(0, cap - f.out);
  return { unallocated, perDay: Math.floor(unallocated / left), left, day: d.getDate(), dim, cap, spent: f.out };
}

/* ══════════════════════════════════════════════════════════════════════════
   Screens
   ══════════════════════════════════════════════════════════════════════════ */
function mask(str) { return DB.ui.hidden ? '₹ ••••••' : str; }
function money(v) { return mask(fmt(v)); }
const A = (act, p, extra) => 'data-a="' + act + '"' + (p != null ? ' data-p="' + esc(p) + '"' : '') + (extra ? ' ' + extra : '');

/* six-point sparkline over the last six days */
function sparkline(vals, color, fill) {
  if (!vals.some(v => v > 0)) {
    return '<div style="height:30px;display:flex;align-items:flex-end"><div style="width:100%;border-top:1.5px dashed ' + color + ';opacity:.3"></div></div>';
  }
  const max = Math.max.apply(null, vals.concat([1]));
  const pts = vals.map((v, i) => (i * 24) + ',' + (30 - (v / max) * 26).toFixed(1));
  return '<svg width="100%" height="30" viewBox="0 0 120 34" preserveAspectRatio="none" fill="none" aria-hidden="true">'
    + '<polyline points="' + pts.join(' ') + ' 120,34 0,34" fill="' + fill + '"></polyline>'
    + '<polyline points="' + pts.join(' ') + '" stroke="' + color + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>';
}
function last6(dir) {
  const out = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const s = d.getTime(), e = s + 86400000;
    let v = 0;
    for (const t of DB.txns) if (t.dir === dir && t.ts >= s && t.ts < e) v += t.amount;
    out.push(v);
  }
  return out;
}

function last6invested() {
  const out = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const s = d.getTime(), e = s + 86400000;
    let v = 0;
    for (const t of DB.txns) if (t.ts >= s && t.ts < e && isInvestFlow(t)) v += t.amount;
    out.push(v);
  }
  return out;
}

function txnRow(t) {
  const isIn = t.dir === 'in';
  const isTr = t.dir === 'transfer';
  const c = catById(t.catId);
  const glyph = isIn ? 'In' : isTr ? '⇄' : (c ? c.glyph : 'Nw');
  const hue = isIn ? 'var(--k-sage)' : isTr ? 'var(--k-ink2)' : 'var(--k-ink)';
  const tint = isIn ? 'color-mix(in srgb,var(--k-sage) 12%,transparent)' : 'color-mix(in srgb,var(--k-ink) 7%,transparent)';
  const title = isTr
    ? 'Moved to ' + (sourceById(t.to) ? sourceById(t.to).name : 'somewhere')
    : (t.note || (isIn ? (t.tag || 'Income') : (c ? c.name : 'Uncategorised')));
  const meta = (isIn ? (t.tag || 'income') : isTr ? 'transfer' : (c ? c.name.toLowerCase() : 'untagged'))
    + ' · ' + sourceLabel(t.src) + ' · ' + dayLabel(t.ts);
  const amt = mask((isIn ? '+' : isTr ? '' : '−') + fmt(t.amount).replace('−', ''));
  return '<button class="row" style="gap:13px" ' + A('openTxn', t.id) + '>'
    + '<div class="glyph sm" style="background:' + tint + ';color:' + hue + '">' + esc(glyph) + '</div>'
    + '<div style="flex:1;min-width:0">'
    + '<div style="font-size:14px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(title) + '</div>'
    + '<div style="font-size:11.5px;color:var(--k-ink3);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(meta) + '</div>'
    + '</div>'
    + '<div class="knum" style="font-size:15px;font-weight:700;color:' + hue + '">' + esc(amt) + '</div>'
    + '</button>';
}

/* ── 01 Overview ──────────────────────────────────────────────────────── */
function screenHome() {
  const ym = ymOf(Date.now());
  const f = monthFlows(ym);
  const iMTD = yearlyInterest() * (new Date().getDate() / 365.25);
  const delta = f.inn - f.out - f.invest + iMTD;
  const net = netWorth();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const todays = DB.txns.filter(t => t.ts >= today.getTime()).sort((a, b) => b.ts - a.ts);
  const earlier = DB.txns.filter(t => t.ts < today.getTime()).sort((a, b) => b.ts - a.ts).slice(0, 5);
  const fresh = !DB.accounts.length && !DB.cards.length && !DB.txns.length;

  let h = '';
  h += '<div style="display:flex;align-items:center;justify-content:space-between;margin:6px 0 22px">'
    + '<div style="display:flex;align-items:baseline;gap:9px">'
    + '<span style="font-family:var(--k-dis);font-size:25px;line-height:1">kosh</span>'
    + '<span style="width:5px;height:5px;border-radius:50%;background:var(--k-acc);display:inline-block"></span>'
    + '<span style="font-size:11px;color:var(--k-ink3)">' + MONTHS[new Date().getMonth()] + ' ' + new Date().getFullYear() + '</span>'
    + '</div></div>';

  /* hero */
  h += '<div class="hero">'
    + '<div style="display:flex;align-items:center;justify-content:space-between">'
    + '<span style="font-size:11px;letter-spacing:.14em;color:var(--k-ink3)">NET WORTH</span>'
    + '<button style="display:flex;align-items:center;gap:7px;height:32px;padding:0 13px;border-radius:999px;background:color-mix(in srgb,var(--k-ink) 7%,transparent);border:1px solid var(--k-line);color:var(--k-ink2);font-size:11px;font-weight:600" '
    + 'aria-label="' + (DB.ui.hidden ? 'Show balances' : 'Hide balances') + '" ' + A('toggleHidden') + '>'
    + (DB.ui.hidden ? I.eyeOff(15) : I.eye(15)) + (DB.ui.hidden ? 'Show' : 'Hide') + '</button>'
    + '</div>'
    + '<div class="knum" style="font-size:46px;font-weight:700;line-height:1.05;margin:12px 0 0">' + money(net) + '</div>'
    + '<div style="display:flex;align-items:center;gap:8px;margin-top:14px;flex-wrap:wrap">'
    + '<span class="knum" style="display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 11px;border-radius:999px;'
    + 'background:color-mix(in srgb,var(' + (delta < 0 ? '--k-acc' : '--k-sage') + ') 14%,transparent);color:' + (delta < 0 ? 'var(--k-acc)' : 'var(--k-sage)') + ';font-size:11.5px;font-weight:700">'
    + (delta < 0 ? I.trendDown(13) : I.trendUp(13)) + mask(fmt(Math.abs(delta))) + '</span>'
    + '<span style="font-size:11.5px;color:var(--k-ink3)">' + (delta < 0 ? 'down' : 'up') + ', month to date</span>'
    + '</div>'
    + '<div style="display:flex;gap:22px;margin-top:18px;padding-top:16px;border-top:1px solid var(--k-line)">'
    + '<div><div style="font-size:10.5px;letter-spacing:.1em;color:var(--k-ink3)">ASSETS</div>'
    + '<div class="knum" style="font-size:16px;font-weight:700;margin-top:3px">' + money(assetsTotal()) + '</div></div>'
    + '<div><div style="font-size:10.5px;letter-spacing:.1em;color:var(--k-ink3)">CARDS OWED</div>'
    + '<div class="knum" style="font-size:16px;font-weight:700;margin-top:3px;color:var(--k-acc)">' + money(duesTotal()) + '</div></div>'
    + '</div></div>';

  /* pulse — in, out, and the third direction: money that moved rather than burned */
  const tile = (icon, hue, label, value, series) =>
    '<div class="surf" style="padding:13px 12px 11px;border-radius:22px;min-width:0">'
    + '<div style="display:flex;align-items:center;gap:5px;color:' + hue + '">' + icon
    + '<span style="font-size:9.5px;letter-spacing:.08em;font-weight:700;white-space:nowrap">' + label + '</span></div>'
    + '<div class="knum tile-fig" style="font-size:16.5px;font-weight:700;margin:6px 0 8px;white-space:nowrap">' + value + '</div>'
    + sparkline(series, hue, 'color-mix(in srgb,' + hue + ' 12%,transparent)') + '</div>';
  h += '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:14px">'
    + tile(I.inArrow(13), 'var(--k-sage)', 'CAME IN', mask(fmtShort(f.inn)), last6('in'))
    + tile(I.outArrow(13), 'var(--k-acc)', 'WENT OUT', mask(fmtShort(f.out)), last6('out'))
    + tile(I.bars(13), 'var(--k-ink2)', 'INVESTED', mask(fmtShort(monthInvested(ym))), last6invested())
    + '</div>';

  /* shortcuts — Add is filled, the other two are outlined */
  const sc = (act, icon, label, primary) =>
    '<button style="flex:1;height:56px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border-radius:20px;'
    + (primary ? 'background:var(--k-acc);color:var(--k-on-acc);border:0;font-weight:700;' : 'background:var(--k-surface);color:var(--k-ink);border:1px solid var(--k-line);font-weight:600;')
    + 'font-size:11.5px;transition:transform .12s,background .15s" ' + A(act) + '>' + icon + label + '</button>';
  h += '<div style="display:flex;gap:9px;margin-top:14px">'
    + sc('openLog', I.plus(18), 'Add', true)
    + sc('openMove', I.move(18), 'Move', false)
    + sc('openBill', I.split(18), 'Split', false)
    + '</div>';

  if (fresh) {
    h += '<div class="empty" style="margin-top:22px">'
      + '<div class="t">Nothing in the ledger yet</div>'
      + '<div style="display:flex;gap:8px;margin-top:16px">'
      + '<button class="btn-primary" style="height:46px;font-size:13px" ' + A('openAccount') + '>Add an account</button>'
      + '<button class="btn-quiet" style="height:46px" ' + A('loadDemo') + '>Load a sample</button>'
      + '</div></div>';
    return h;
  }

  h += '<div style="display:flex;align-items:baseline;justify-content:space-between;margin:26px 0 10px">'
    + '<h3 style="font-family:var(--k-dis);font-weight:400;font-size:19px;margin:0">Today\'s ledger</h3>'
    + '<span class="knum" style="font-size:11.5px;color:var(--k-ink3)">' + todays.length + (todays.length === 1 ? ' entry' : ' entries') + '</span>'
    + '</div>';
  h += '<div style="display:flex;flex-direction:column;gap:7px">';
  if (todays.length) h += todays.map(txnRow).join('');
  else h += '<div style="padding:20px;border-radius:20px;border:1px dashed var(--k-hair);text-align:center;font-size:12.5px;color:var(--k-ink3)">Nothing logged today.</div>';
  h += '</div>';

  if (earlier.length) {
    h += '<div style="display:flex;align-items:baseline;justify-content:space-between;margin:22px 0 10px">'
      + '<h3 style="font-family:var(--k-dis);font-weight:400;font-size:19px;margin:0">Before that</h3></div>'
      + '<div style="display:flex;flex-direction:column;gap:7px">' + earlier.map(txnRow).join('') + '</div>';
  }
  return h;
}

/* ── 02 Accounts ──────────────────────────────────────────────────────── */
function acctRow(a) {
  const bal = accBalance(a);
  const eff = effRate(a);
  const stale = a.group === 'cash' && daysBetween(a.lastCounted || a.createdAt, Date.now()) >= 5;
  const dot = stale ? 'var(--k-acc)' : 'var(--k-sage)';
  const tint = stale ? 'color-mix(in srgb,var(--k-acc) 12%,transparent)' : 'color-mix(in srgb,var(--k-sage) 12%,transparent)';
  const days = daysBetween(a.lastCounted || a.createdAt, Date.now());
  const tag = a.group === 'cash'
    ? (stale ? 'stale · ' + days + ' days' : (days === 0 ? 'counted today' : 'counted ' + days + 'd ago'))
    : (eff ? (+a.rate).toFixed(1) + '% · ' + (a.freq || 'Monthly').toLowerCase() : a.type.toLowerCase());
  const sub = eff ? mask(fmt(principal(a) * eff / 12)) + '/mo' : a.type.toLowerCase();
  return '<button class="row" style="' + (stale ? 'border:1px dashed color-mix(in srgb,var(--k-acc) 32%,transparent)' : '') + '" ' + A('openDetail', a.id) + '>'
    + '<div class="glyph" style="background:' + tint + ';color:' + dot + '">' + esc(a.glyph) + '</div>'
    + '<div style="flex:1;min-width:0">'
    + '<div style="font-size:14.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(a.name) + '</div>'
    + '<div style="display:flex;align-items:center;gap:7px;margin-top:4px">'
    + '<span style="width:6px;height:6px;border-radius:50%;background:' + dot + ';flex:none"></span>'
    + '<span style="font-size:11px;color:var(--k-ink3)">' + esc(tag) + '</span></div>'
    + '</div>'
    + '<div style="text-align:right">'
    + '<div class="knum" style="font-size:16px;font-weight:700">' + money(bal) + '</div>'
    + '<div class="knum" style="font-size:10.5px;color:var(--k-ink3);margin-top:3px">' + esc(sub) + '</div>'
    + '</div></button>';
}
function screenAccounts() {
  const groups = [['liquid', 'LIQUID'], ['locked', 'LOCKED &amp; INVESTED'], ['cash', 'CASH ON HAND']];
  let h = '<h2 class="h2">Accounts</h2>';
  const n = DB.accounts.length;
  h += '<p class="sub">' + (n ? n + (n === 1 ? ' entity' : ' entities') + ' · ' + money(assetsTotal()) + ' in all' : 'nothing here yet') + '</p>';
  if (!n) {
    h += '<div class="empty"><div class="t">No accounts yet</div>'
      + '<button class="btn-primary" style="margin-top:16px" ' + A('openAccount') + '>Add an account</button></div>';
    return h;
  }
  h += '<div style="display:flex;flex-direction:column;gap:22px">';
  for (const [g, label] of groups) {
    const list = DB.accounts.filter(a => a.group === g);
    if (!list.length) continue;
    h += '<div><div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:9px;padding:0 3px">'
      + '<span style="font-size:11px;letter-spacing:.13em;font-weight:700;color:var(--k-ink2)">' + label + '</span>'
      + '<span class="knum" style="font-size:12px;font-weight:700;color:var(--k-ink3)">' + money(groupTotal(g)) + '</span></div>'
      + '<div style="display:flex;flex-direction:column;gap:7px">' + list.map(acctRow).join('') + '</div>';
    if (g === 'cash') h += '<button class="btn-quiet" style="margin-top:9px" ' + A('recount', list[0].id) + '>Recount the wallet</button>';
    h += '</div>';
  }
  h += '</div>';
  h += '<button class="btn-quiet" style="margin-top:22px" ' + A('openAccount') + '>Add an account</button>';
  return h;
}

/* ── 03 Credit cards ──────────────────────────────────────────────────── */
function screenCards() {
  const cards = DB.cards;
  let h = '<h2 class="h2">Cards</h2>';
  if (!cards.length) {
    h += '<p class="sub">the stack is empty</p>'
      + '<div class="empty"><div class="t">No cards yet</div>'
      + '<button class="btn-primary" style="margin-top:16px" ' + A('openCard') + '>Add a credit card</button></div>';
    return h;
  }
  if (S.cardIndex >= cards.length) S.cardIndex = 0;
  h += '<p class="sub" style="margin-bottom:8px">' + cards.length + (cards.length === 1 ? ' card · ' : ' cards · ') + money(duesTotal()) + ' outstanding</p>';

  const N = cards.length;
  h += '<div style="position:relative;height:252px;margin:0 -4px">';
  cards.forEach((c, i) => {
    const off = (i - S.cardIndex + N) % N;
    const st = cardStats(c);
    const skin = CARD_SKINS[i % CARD_SKINS.length];
    const dash = (2 * Math.PI * 29 * st.pctFree / 100).toFixed(1) + ' 999';
    h += '<button aria-label="' + esc(c.name) + '" style="position:absolute;left:4px;right:4px;top:26px;height:198px;padding:20px 22px;text-align:left;'
      + 'border-radius:26px;border:1px solid rgba(245,234,216,.09);background:' + skin.bg + ';color:var(--k-card-ink);'
      + 'z-index:' + (N - off) + ';opacity:' + (off === 0 ? 1 : Math.max(0.14, 1 - off * 0.29)) + ';'
      + 'transform:translateY(' + (off * -17) + 'px) scale(' + (1 - off * 0.055) + ') rotate(' + (off * -2.4) + 'deg);'
      + 'transition:transform .34s cubic-bezier(.22,1,.36,1),opacity .3s;box-shadow:0 22px 44px rgba(0,0,0,.5)" ' + A('pickCard', i) + '>'
      + '<div style="display:flex;align-items:flex-start;justify-content:space-between">'
      + '<div><div style="font-size:15px;font-weight:700;letter-spacing:-.01em">' + esc(c.name) + '</div>'
      + '<div class="knum" style="font-size:11.5px;color:var(--k-card-ink2);margin-top:3px">•••• ' + esc(c.last4 || '····') + '</div></div>'
      + '<div class="knum" style="display:flex;align-items:center;height:24px;padding:0 10px;border-radius:999px;background:rgba(245,234,216,.09);font-size:10.5px;font-weight:700">'
      + 'day ' + c.statementDay + '</div></div>'
      + '<div style="display:flex;align-items:flex-end;justify-content:space-between;margin-top:34px">'
      + '<div><div style="font-size:10.5px;letter-spacing:.12em;color:var(--k-card-ink3)">UNBILLED</div>'
      + '<div class="knum" style="font-size:29px;font-weight:700;margin-top:4px">' + money(st.unbilled) + '</div>'
      + '<div class="knum" style="font-size:11.5px;color:var(--k-card-ink2);margin-top:6px">' + money(st.avail) + ' still free</div></div>'
      + '<svg width="70" height="70" viewBox="0 0 70 70" style="flex:none" aria-hidden="true">'
      + '<circle cx="35" cy="35" r="29" fill="none" stroke="rgba(245,234,216,.12)" stroke-width="6"></circle>'
      + '<circle cx="35" cy="35" r="29" fill="none" stroke="' + skin.ring + '" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + dash + '" transform="rotate(-90 35 35)"></circle>'
      + '<text x="35" y="33" text-anchor="middle" fill="#f5ead8" font-size="15" font-weight="700" font-family="Figtree,sans-serif">' + st.pctFree + '%</text>'
      + '<text x="35" y="45" text-anchor="middle" fill="#8b8172" font-size="8.5" font-family="Figtree,sans-serif">free</text>'
      + '</svg></div></button>';
  });
  h += '</div>';

  h += '<div style="display:flex;justify-content:center;gap:6px;margin:14px 0 18px">';
  cards.forEach((c, i) => {
    h += '<button aria-label="' + esc(c.name) + '" style="width:' + (S.cardIndex === i ? '22px' : '6px') + ';height:6px;border-radius:999px;border:0;padding:0;'
      + 'background:' + (S.cardIndex === i ? 'var(--k-acc)' : 'color-mix(in srgb,var(--k-ink) 20%,transparent)') + ';transition:width .25s,background .25s" ' + A('pickCard', i) + '></button>';
  });
  h += '</div>';

  const c = cards[S.cardIndex], st = cardStats(c), avg = cardAvg3(c);
  const dstr = d => d.getDate() + ' ' + MONTHS[d.getMonth()];
  let al;
  if (st.billed > 0 && st.nextDue) {
    al = st.overdue
      ? { hard: true, t: fmt(st.billed) + ' overdue', b: 'Was due ' + dstr(st.nextDue) + ' — ' + Math.abs(st.daysToDue) + ' days ago.' }
      : { hard: true, t: fmt(st.billed) + ' due ' + dstr(st.nextDue), b: st.daysToDue + (st.daysToDue === 1 ? ' day left.' : ' days left.') };
  }
  else if (st.billed > 0) al = { hard: true, t: fmt(st.billed) + ' billed and unpaid', b: 'Statement closed ' + dstr(st.last) + '.' };
  else if (st.daysToStatement <= 14) al = { hard: false, t: 'Statement drops in ' + st.daysToStatement + ' days', b: avg > 0 ? 'Tracking at ' + fmt(st.projected) + ' — about ' + Math.abs(Math.round((st.projected / avg - 1) * 100)) + '% ' + (st.projected >= avg ? 'over' : 'under') + ' your three-month average.' : 'Tracking at ' + fmt(st.projected) + ' for this cycle.' };
  else al = { hard: false, t: st.daysToStatement + ' days of cycle left', b: fmt(st.unbilled) + ' charged so far across ' + st.cycleCount + (st.cycleCount === 1 ? ' entry' : ' entries') + '.' };

  h += '<div style="padding:18px 19px;border-radius:26px;background:' + (al.hard ? 'color-mix(in srgb,var(--k-acc) 11%,transparent)' : 'var(--k-surface)') + ';'
    + 'border:1px solid ' + (al.hard ? 'color-mix(in srgb,var(--k-acc) 34%,transparent)' : 'var(--k-line)') + ';transition:background .3s">'
    + '<div style="display:flex;align-items:center;gap:10px">'
    + '<div style="width:34px;height:34px;border-radius:12px;display:grid;place-items:center;background:' + (al.hard ? 'color-mix(in srgb,var(--k-acc) 18%,transparent)' : 'color-mix(in srgb,var(--k-ink) 8%,transparent)') + ';color:' + (al.hard ? 'var(--k-acc)' : 'var(--k-ink)') + ';flex:none">' + I.clock(17) + '</div>'
    + '<div style="flex:1"><div style="font-size:13.5px;font-weight:700;color:' + (al.hard ? 'var(--k-acc)' : 'var(--k-ink)') + '">' + esc(al.t) + '</div>'
    + '<div style="font-size:11.5px;color:var(--k-ink2);margin-top:2px">' + esc(al.b) + '</div></div></div>'
    + '<div style="display:flex;gap:8px;margin-top:14px">'
    + '<button style="flex:1;height:44px;border-radius:999px;background:var(--k-acc);color:var(--k-on-acc);border:0;font-size:13px;font-weight:700" ' + A('payCard', c.id) + '>Log the payment</button>'
    + '<button style="flex:none;padding:0 18px;height:44px;border-radius:999px;background:none;border:1px solid var(--k-line);color:var(--k-ink2);font-size:13px;font-weight:600" ' + A('nudge', c.id) + '>Nudge me</button>'
    + '</div></div>';

  const rows = [
    ['Unbilled now', money(st.unbilled), 'ink'],
    ['Billed, unpaid', money(st.billed), st.billed > 0 ? 'acc' : 'ink'],
    ['Cycle', st.cycleLabel, 'ink'],
    ['Statement / due', c.statementDay + ' → ' + (+c.dueDay || defaultDueDay(c.statementDay)), 'ink'],
    ['Limit', money(st.limit), 'ink'],
    ['Free headroom', money(st.avail) + ' · ' + st.pctFree + '%', st.pctFree < 20 ? 'acc' : 'sage']
  ];
  h += '<div class="datalist" style="margin-top:14px">' + rows.map(r =>
    '<div class="dl-row"><span class="dl-k">' + r[0] + '</span><span class="dl-v" style="color:' + (r[2] === 'acc' ? 'var(--k-acc)' : r[2] === 'sage' ? 'var(--k-sage)' : 'var(--k-ink)') + '">' + esc(r[1]) + '</span></div>'
  ).join('') + '</div>';

  /* cycle by cycle, newest first — payments land on the oldest balance first */
  const shown = st.cycles.slice().reverse().filter((cy, i) => i === 0 || cy.charged > 0 || cy.outstanding > 0);
  h += '<div class="sectlabel" style="margin:22px 0 9px">CYCLES</div><div class="datalist">';
  if (st.carried > 0) {
    h += '<div class="dl-row"><div style="min-width:0"><div style="font-size:13px;font-weight:600">Carried forward</div>'
      + '<div style="font-size:10.5px;color:var(--k-ink3);margin-top:2px">from before this window</div></div>'
      + '<span class="dl-v" style="color:var(--k-acc)">' + money(st.carried) + '</span></div>';
  }
  for (const cy of shown) {
    const hue = cy.state === 'overdue' || cy.state === 'due' ? 'var(--k-acc)' : cy.state === 'paid' ? 'var(--k-sage)' : 'var(--k-ink)';
    const note = cy.state === 'open' ? 'open · ' + cy.count + (cy.count === 1 ? ' entry' : ' entries')
      : cy.state === 'paid' ? 'paid · ' + fmt(cy.charged) + ' billed'
        : cy.state === 'overdue' ? 'overdue since ' + dstr(cy.due)
          : 'due ' + dstr(cy.due);
    const idx = st.cycles.indexOf(cy);
    h += '<button class="dl-row" style="width:100%;background:none;border:0;border-bottom:1px solid var(--k-line);text-align:left;font-family:inherit;color:var(--k-ink)" ' + A('openCycle', c.id + ':' + idx) + '>'
      + '<div style="min-width:0">'
      + '<div class="knum" style="font-size:13px;font-weight:600">' + esc(cy.label) + '</div>'
      + '<div style="font-size:10.5px;color:' + (cy.state === 'paid' ? 'var(--k-sage)' : cy.state === 'open' ? 'var(--k-ink3)' : 'var(--k-acc)') + ';margin-top:2px">' + esc(note) + '</div></div>'
      + '<span style="display:flex;align-items:center;gap:8px">'
      + '<span class="dl-v" style="color:' + hue + '">' + money(cy.state === 'paid' ? 0 : cy.outstanding) + '</span>'
      + '<span style="color:var(--k-ink3);display:grid">' + I.chev(15) + '</span></span></button>';
  }
  if (st.credit > 0.5) {
    h += '<div class="dl-row"><span class="dl-k">Credit on the card</span><span class="dl-v" style="color:var(--k-sage)">' + money(st.credit) + '</span></div>';
  }
  h += '</div>';

  h += '<div style="display:flex;gap:8px;margin-top:14px">'
    + '<button class="btn-quiet" ' + A('editCard', c.id) + '>Edit this card</button>'
    + '<button class="btn-quiet" ' + A('openCard') + '>Add a card</button>'
    + '</div>';
  return h;
}

/* ── 05 Shared bills ──────────────────────────────────────────────────── */
function screenShared() {
  const sum = sharedSummary();
  let h = '<h2 class="h2">Shared</h2>';
  const pplN = DB.people.length - 1;
  h += '<p class="sub" style="margin-bottom:18px">' + (DB.groups.length ? DB.groups.length + (DB.groups.length === 1 ? ' tab' : ' tabs') + ' · ' : '') + pplN + (pplN === 1 ? ' person' : ' people') + '</p>';

  h += '<div style="display:flex;border-radius:26px;overflow:hidden;border:1px solid var(--k-line)">'
    + '<div style="flex:1;padding:18px 18px 17px;background:linear-gradient(160deg,color-mix(in srgb,var(--k-sage) 16%,transparent),var(--k-surface) 70%)">'
    + '<div style="font-size:10.5px;letter-spacing:.11em;color:var(--k-ink3)">COMING TO YOU</div>'
    + '<div class="knum" style="font-size:25px;font-weight:700;color:var(--k-sage);margin-top:6px">' + money(sum.owed) + '</div>'
    + '<div style="font-size:11px;color:var(--k-ink3);margin-top:4px">' + esc(sum.owedBy.length ? sum.owedBy.join(', ').toLowerCase() : 'nobody, for once') + '</div></div>'
    + '<div style="width:1px;background:var(--k-line)"></div>'
    + '<div style="flex:1;padding:18px 18px 17px;background:linear-gradient(160deg,color-mix(in srgb,var(--k-acc) 14%,transparent),var(--k-surface) 70%)">'
    + '<div style="font-size:10.5px;letter-spacing:.11em;color:var(--k-ink3)">YOU STILL OWE</div>'
    + '<div class="knum" style="font-size:25px;font-weight:700;color:var(--k-acc);margin-top:6px">' + money(sum.owe) + '</div>'
    + '<div style="font-size:11px;color:var(--k-ink3);margin-top:4px">' + esc(sum.oweTo.length ? sum.oweTo.join(', ').toLowerCase() : 'nobody, for once') + '</div></div>'
    + '</div>';

  if (DB.groups.length) {
    h += '<div class="ksc chiprow" style="margin:16px 0 14px">'
      + '<button class="chip' + (S.group === 'all' ? ' on' : '') + '" ' + A('pickGroup', 'all') + '>All</button>'
      + DB.groups.map(g => '<button class="chip' + (S.group === g.id ? ' on' : '') + '" ' + A('pickGroup', g.id) + '>' + esc(g.label) + '</button>').join('')
      + '</div>';
  } else h += '<div style="height:16px"></div>';

  h += '<button style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;height:50px;margin-bottom:14px;border-radius:999px;'
    + 'background:var(--k-acc);color:var(--k-on-acc);border:0;font-size:13.5px;font-weight:700" ' + A('openBill') + '>' + I.plus(17) + 'New shared bill</button>';

  const list = DB.bills.filter(b => S.group === 'all' || b.groupId === S.group).sort((a, b) => b.ts - a.ts);
  const open = list.filter(b => !b.settled);
  if (!list.length) {
    h += '<div class="empty"><div class="t">Nothing shared yet</div>'
      + '</div>';
    return h;
  }
  if (!open.length) {
    h += '<div class="empty" style="margin-bottom:14px"><div class="t">All square</div>'
      + '</div>';
  }

  h += '<div style="display:flex;flex-direction:column;gap:9px">';
  for (const b of list) {
    const shares = billShares(b);
    const done = !!b.settled;
    const grp = DB.groups.find(g => g.id === b.groupId);
    const meta = (grp ? grp.label.toLowerCase() + ' · ' : '') + (b.payerId === 'you' ? 'you paid' : personName(b.payerId).toLowerCase() + ' paid') + ' · ' + dayLabel(b.ts) + ' · ' + billOwedLine(b);
    h += '<div style="padding:15px 16px;border-radius:22px;background:var(--k-surface);border:1px solid var(--k-line);opacity:' + (done ? .45 : 1) + ';transition:opacity .25s">'
      + '<div style="display:flex;align-items:flex-start;gap:12px">'
      + '<div class="glyph sm" style="background:' + (done ? 'color-mix(in srgb,var(--k-ink) 6%,transparent)' : 'color-mix(in srgb,var(--k-acc) 12%,transparent)') + ';color:' + (done ? 'var(--k-ink3)' : 'var(--k-acc)') + '">' + esc(initials(grp ? grp.label : b.title)) + '</div>'
      + '<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:600">' + esc(b.title) + '</div>'
      + '<div style="font-size:11.5px;color:var(--k-ink3);margin-top:3px">' + esc(meta) + '</div></div>'
      + '<div class="knum" style="font-size:15px;font-weight:700">' + fmt(b.total) + '</div></div>'
      + '<div style="display:flex;gap:4px;margin:13px 0 11px;height:7px">'
      + shares.map((s, i) => '<div style="width:' + s.pct + '%;background:' + (s.pid === 'you' ? 'var(--k-ink3)' : SW[(i + 1) % SW.length]) + ';border-radius:999px"></div>').join('')
      + '</div>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px">'
      + '<div style="display:flex;flex-wrap:wrap;gap:9px">'
      + shares.map((s, i) => '<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--k-ink2)">'
        + '<span style="width:7px;height:7px;border-radius:2px;background:' + (s.pid === 'you' ? 'var(--k-ink3)' : SW[(i + 1) % SW.length]) + '"></span>'
        + esc(s.name.toLowerCase()) + ' ' + s.pct + '%</span>').join('')
      + '</div>'
      + '<button style="flex:none;display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 14px;border-radius:999px;'
      + 'border:1px solid ' + (done ? 'color-mix(in srgb,var(--k-sage) 30%,transparent)' : 'var(--k-line)') + ';background:' + (done ? 'color-mix(in srgb,var(--k-sage) 14%,transparent)' : 'var(--k-raise)') + ';'
      + 'color:' + (done ? 'var(--k-sage)' : 'var(--k-ink)') + ';font-size:12px;font-weight:700" ' + A('settle', b.id) + '>'
      + I.check(14) + (done ? 'Settled' : 'Mark settled') + '</button>'
      + '</div></div>';
  }
  h += '</div>';
  return h;
}

/* ── 06 Categories & trends ───────────────────────────────────────────── */
function trendPeriods() {
  const out = [];
  const d = new Date();
  for (let i = 2; i >= 0; i--) {
    const t = new Date(d.getFullYear(), d.getMonth() - i, 1);
    const ym = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0');
    out.push({ id: ym, label: MONTHS[t.getMonth()].replace(/^./, ch => ch.toUpperCase()), months: [ym], span: 1 });
  }
  const q = Math.floor(d.getMonth() / 3);
  const qm = [0, 1, 2].map(k => d.getFullYear() + '-' + String(q * 3 + k + 1).padStart(2, '0'));
  out.push({ id: 'Q' + (q + 1), label: 'Q' + (q + 1), months: qm, span: 3 });
  return out;
}
function screenTrends() {
  const periods = trendPeriods();
  const per = periods.find(p => p.id === S.month) || periods[2];
  const spendOf = c => per.months.reduce((t, m) => t + catSpend(c.id, m), 0);
  const capOf = c => (+c.cap || 0) * per.span;
  const cats = DB.cats.slice().sort((a, b) => spendOf(b) - spendOf(a));
  const spent = spendCats().reduce((t, c) => t + spendOf(c), 0);
  const budget = spendCats().reduce((t, c) => t + capOf(c), 0);
  const hasHistory = DB.txns.some(t => ymOf(t.ts) < per.months[0]);

  let h = '<div style="display:flex;align-items:center;justify-content:space-between;margin:10px 0 4px">'
    + '<h2 class="h2" style="margin:0">Trends</h2>'
    + '<button class="chip" style="height:36px" ' + A('go', 'insights') + '>' + I.chevL(14) + 'Insights</button></div>';
  h += '<p class="sub" style="margin-bottom:16px">' + esc(per.span > 1 ? per.label : ymLabel(per.id)) + ' · ' + money(spent) + ' of ' + mask(fmt(budget)) + '</p>';

  h += '<div style="display:flex;gap:7px;margin-bottom:20px">' + periods.map(p =>
    '<button class="chip dash' + (p.id === per.id ? ' on' : '') + '" style="flex:1;justify-content:center;height:34px" ' + A('pickMonth', p.id) + '>' + p.label + '</button>'
  ).join('') + '</div>';

  h += '<div style="display:flex;flex-direction:column;gap:16px">';
  for (const c of cats) {
    const sp = spendOf(c), cap = capOf(c);
    const prev = per.span === 1 ? catSpend(c.id, prevYm(per.id)) : 0;
    const mom = per.span === 1 && prev > 0 ? Math.round((sp / prev - 1) * 100) : null;
    const momStr = mom === null ? (sp > 0 && hasHistory ? 'new' : '—') : (mom > 0 ? '+' : mom < 0 ? '−' : '') + Math.abs(mom) + '%';
    const momHue = mom === null ? 'var(--k-ink3)' : mom > 0 ? 'var(--k-acc)' : mom < 0 ? 'var(--k-sage)' : 'var(--k-ink3)';
    const over = sp - cap;
    const isInv = c.kind === 'investment';
    h += '<button style="display:block;width:100%;text-align:left;padding:0;background:none;border:0" ' + A('editCat', c.id) + '>'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'
      + '<span class="glyph xs" style="background:color-mix(in srgb,var(--k-ink) 7%,transparent);color:' + c.color + '">' + esc(c.glyph) + '</span>'
      + '<span style="flex:1;font-size:13.5px;font-weight:600;color:var(--k-ink)">' + esc(c.name) + (isInv ? ' <span style="font-size:10px;color:var(--k-sage);letter-spacing:.08em">· NOT SPENDING</span>' : '') + '</span>'
      + '<span class="knum" style="font-size:11.5px;font-weight:700;color:' + momHue + '">' + momStr + '</span>'
      + '<span class="knum" style="font-size:14px;font-weight:700;color:var(--k-ink)">' + money(sp) + '</span></div>'
      + '<div class="bar-track"><div class="bar-fill" style="width:' + Math.min(100, cap ? Math.round(sp / cap * 100) : 0) + '%;background:' + c.color + '"></div></div>'
      + '<div style="display:flex;justify-content:space-between;margin-top:6px">'
      + '<span style="font-size:10.5px;color:' + (over > 0 ? 'var(--k-acc)' : 'var(--k-ink3)') + '">' + (over > 0 ? fmt(over) + ' over the ceiling' : fmt(-over) + ' still yours') + '</span>'
      + '<span class="knum" style="font-size:10.5px;color:var(--k-ink3)">ceiling ' + fmt(cap) + '</span></div>'
      + '</button>';
  }
  h += '</div>';

  const ec = catById(S.editCat) || DB.cats[0];
  if (ec) {
    h += '<div class="surf" style="margin-top:26px;padding:19px 19px 17px;border-radius:26px">'
      + '<div style="display:flex;align-items:center;justify-content:space-between">'
      + '<div style="font-size:13.5px;font-weight:700">Editing ' + esc(ec.name) + '</div>'
      + '<span style="font-family:var(--k-mono);font-size:11px;font-weight:600;color:var(--k-ink3)">' + ec.color + '</span></div>'
      + '<div style="display:flex;gap:9px;margin-top:14px;flex-wrap:wrap">'
      + SW.map(hex => '<button class="swatch' + (hex === ec.color ? ' on' : '') + '" style="background:' + hex + '" aria-label="' + hex + '" ' + A('catColor', hex) + '></button>').join('')
      + '</div>'
      + '<div style="display:flex;gap:9px;margin-top:12px;flex-wrap:wrap">'
      + GL.map(g => '<button class="glyphpick' + (g === ec.glyph ? ' on' : '') + '" ' + A('catGlyph', g) + '>' + g + '</button>').join('')
      + '</div>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;padding-top:14px;border-top:1px solid var(--k-line)">'
      + '<span style="font-size:12.5px;color:var(--k-ink3)">monthly ceiling</span>'
      + '<div style="display:flex;align-items:center;gap:10px">'
      + '<button class="stepbtn" aria-label="Lower the ceiling" ' + A('capStep', '-1') + '>−</button>'
      + '<span class="knum" style="font-size:16px;font-weight:700;min-width:82px;text-align:center">' + fmt(ec.cap) + '</span>'
      + '<button class="stepbtn" aria-label="Raise the ceiling" ' + A('capStep', '1') + '>+</button></div></div>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding-top:14px;border-top:1px solid var(--k-line)">'
      + '<div><div style="font-size:12.5px;color:var(--k-ink2)">Counts as spending</div>'
      + '</div>'
      + '<button class="switch" role="switch" aria-checked="' + (ec.kind !== 'investment') + '" aria-label="Counts as spending" ' + A('catKind') + '><span class="knob"></span></button>'
      + '</div>'
      + '<div style="display:flex;gap:8px;margin-top:16px">'
      + '<button class="btn-quiet" ' + A('openCategory') + '>Add a category</button>'
      + '<button class="btn-quiet" style="color:var(--k-acc);border-color:color-mix(in srgb,var(--k-acc) 36%,transparent)" ' + A('removeCat', ec.id) + '>Remove</button>'
      + '</div></div>';
  }
  return h;
}

/* ── 07 Insights ──────────────────────────────────────────────────────── */
function screenInsights() {
  const s = safeToSpend();
  const alerts = buildAlerts();
  let h = '<div style="display:flex;align-items:center;justify-content:space-between;margin:10px 0 18px">'
    + '<h2 class="h2" style="margin:0">Insights</h2>'
    + '<button class="chip" style="height:36px" ' + A('go', 'trends') + '>Trends' + I.chev(14) + '</button></div>';

  h += '<div style="position:relative;overflow:hidden;padding:22px 22px 20px;border-radius:30px;background:linear-gradient(150deg,var(--k-hero-sage1),var(--k-hero-sage2) 62%);border:1px solid var(--k-line)">'
    + '<div style="position:absolute;top:-60px;left:-40px;width:190px;height:190px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--k-sage) 20%,transparent),transparent 70%);pointer-events:none"></div>'
    + '<div style="position:relative;font-size:11px;letter-spacing:.13em;color:var(--k-ink3)">SAFE TO SPEND · TODAY</div>'
    + (S.recalc
      ? '<div class="shimmer" style="position:relative"></div>'
      : '<div class="knum" style="position:relative;font-size:48px;font-weight:700;line-height:1.05;margin:8px 0 0;color:var(--k-sage)">' + mask('₹' + s.perDay.toLocaleString('en-IN')) + '</div>')
    + '<div style="position:relative;font-size:12.5px;color:var(--k-ink2);margin-top:8px">' + mask(fmt(s.unallocated)) + ' unallocated · ' + s.left + ' days left in ' + MONTHS[new Date().getMonth()] + '</div>'
    + '<div style="position:relative;margin-top:16px;height:8px;border-radius:999px;background:color-mix(in srgb,var(--k-ink) 8%,transparent);overflow:hidden">'
    + '<div style="height:100%;width:' + Math.round(s.day / s.dim * 100) + '%;background:linear-gradient(90deg,var(--k-sage),var(--k-acc));border-radius:999px;transition:width .5s cubic-bezier(.22,1,.36,1)"></div></div>'
    + '<div style="position:relative;display:flex;justify-content:space-between;margin-top:7px;font-size:10.5px;color:var(--k-ink3)">'
    + '<span>day ' + s.day + ' of ' + s.dim + '</span>'
    + '<span>' + (s.cap === 0 ? 'set a ceiling to get a number' : (s.spent / s.cap <= s.day / s.dim ? 'ahead of pace by ' + fmt(Math.round(s.cap * s.day / s.dim - s.spent)) : 'burning faster than the month')) + '</span>'
    + '</div></div>';

  h += '<div style="display:flex;flex-direction:column;gap:9px;margin-top:16px">';
  if (!alerts.length) {
    h += '<div class="empty"><div class="t">Nothing needs you today</div>'
      + '</div>';
  }
  for (const al of alerts) {
    h += '<div style="padding:16px 17px;border-radius:24px;background:var(--k-surface);border:1px solid ' + al.line + ';animation:koshFade .3s ease">'
      + '<div style="display:flex;align-items:flex-start;gap:12px">'
      + '<div class="glyph sm" style="background:' + al.tint + ';color:' + al.hue + ';font-size:15px">' + al.glyph + '</div>'
      + '<div style="flex:1;min-width:0">'
      + '<div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">'
      + '<span style="font-size:13.5px;font-weight:700">' + esc(al.title) + '</span>'
      + '<span style="font-size:10px;letter-spacing:.09em;font-weight:700;color:' + al.hue + '">' + al.kind + '</span></div>'
      + '<p style="font-size:12.5px;line-height:1.5;color:var(--k-ink2);margin:5px 0 0;text-wrap:pretty">' + esc(al.body) + '</p>'
      + '<div style="display:flex;gap:8px;margin-top:12px">'
      + '<button style="height:34px;padding:0 14px;border-radius:999px;border:0;background:' + al.tint + ';color:' + al.hue + ';font-size:12px;font-weight:700" ' + A(al.act, al.p) + '>' + esc(al.cta) + '</button>'
      + '<button style="height:34px;padding:0 14px;border-radius:999px;border:1px solid var(--k-line);background:none;color:var(--k-ink3);font-size:12px;font-weight:600" ' + A('dismiss', al.id) + '>Dismiss</button>'
      + '</div></div></div></div>';
  }
  h += '</div>';
  return h;
}

/* ── 08 Settings ──────────────────────────────────────────────────────── */
function settingsRow(act, icon, tint, hue, label, value, param) {
  return '<button class="row" style="height:64px;padding:0 16px;gap:13px" ' + A(act, param) + '>'
    + '<span class="glyph sm" style="background:' + tint + ';color:' + hue + '">' + icon + '</span>'
    + '<span style="flex:1;font-size:14px;font-weight:600">' + label + '</span>'
    + '<span class="knum" style="font-size:11.5px;color:var(--k-ink3)">' + esc(value) + '</span>'
    + '<span style="color:var(--k-ink3);flex:none;display:grid">' + I.chev(16) + '</span></button>';
}
function screenSettings() {
  const yi = yearlyInterest();
  let h = '<h2 class="h2">Settings</h2><div style="height:16px"></div>';

  h += '<div class="sectlabel">LEDGER</div><div style="display:flex;flex-direction:column;gap:7px;margin-bottom:26px">'
    + settingsRow('openAccount', I.bank(17), 'color-mix(in srgb,var(--k-sage) 13%,transparent)', 'var(--k-sage)', 'Add an account', DB.accounts.length + (DB.accounts.length === 1 ? ' entity' : ' entities'))
    + settingsRow('openCards', I.card(17), 'color-mix(in srgb,var(--k-acc) 13%,transparent)', 'var(--k-acc)', 'Cards &amp; billing cycles', DB.cards.length + (DB.cards.length === 1 ? ' card' : ' cards'))
    + settingsRow('openCats', I.grid(17), 'color-mix(in srgb,var(--k-acc) 18%,transparent)', 'var(--k-acc)', 'Categories &amp; ceilings', DB.cats.length + (DB.cats.length === 1 ? ' category' : ' categories'))
    + settingsRow('go', I.users(17), 'color-mix(in srgb,var(--k-sage) 13%,transparent)', 'var(--k-sage)', 'Shared groups &amp; bills', DB.bills.length + (DB.bills.length === 1 ? ' bill' : ' bills'), 'shared')
    + '</div>';

  h += '<div class="sectlabel">MONEY</div>'
    + '<div style="margin-bottom:26px">'
    + settingsRow('openInterest', I.pct(17), 'color-mix(in srgb,var(--k-sage) 13%,transparent)', 'var(--k-sage)', 'Interest engine', yi > 0 ? fmt(yi) + '/yr' : 'no rates set')
    + '</div>';

  const theme = (DB.settings.theme || 'dark');
  h += '<div class="sectlabel">APPEARANCE</div>'
    + '<div class="seg tall" style="margin-bottom:26px">' + [['system', 'System'], ['light', 'Light'], ['dark', 'Dark']].map(t =>
      '<button class="' + (theme === t[0] ? 'on' : '') + '" ' + A('setTheme', t[0]) + '>' + t[1] + '</button>').join('')
    + '</div>';

  h += '<div class="sectlabel">DATA</div><div class="datalist">'
    + '<div class="dl-row" style="padding:15px 17px">'
    + '<div class="glyph sm" style="background:color-mix(in srgb,var(--k-sage) 13%,transparent);color:var(--k-sage)">' + I.lock(17) + '</div>'
    + '<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:600">Keep this browser\'s copy</div>'
    + '<div class="knum" style="font-size:11.5px;color:var(--k-ink3);margin-top:2px">'
    + (DB.settings.autoBackup ? DB.txns.length + (DB.txns.length === 1 ? ' entry saved' : ' entries saved') : 'paused') + '</div></div>'
    + '<button class="switch" role="switch" aria-checked="' + !!DB.settings.autoBackup + '" aria-label="Keep this browser\'s copy" ' + A('toggleAuto') + '><span class="knob"></span></button>'
    + '</div>'
    + '<div style="display:flex;gap:9px;padding:14px 17px">'
    + '<button style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:7px;height:46px;border-radius:999px;background:var(--k-raise);border:1px solid var(--k-line);color:var(--k-ink);font-size:12.5px;font-weight:600" ' + A('exportJson') + '>' + I.down(16) + 'JSON</button>'
    + '<button style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:7px;height:46px;border-radius:999px;background:var(--k-raise);border:1px solid var(--k-line);color:var(--k-ink);font-size:12.5px;font-weight:600" ' + A('exportCsv') + '>' + I.down(16) + 'CSV</button>'
    + '<button style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:7px;height:46px;border-radius:999px;background:none;border:1px solid color-mix(in srgb,var(--k-acc) 36%,transparent);color:var(--k-acc);font-size:12.5px;font-weight:600" ' + A('openRestore') + '>' + I.up(16) + 'Restore</button>'
    + '</div></div>';

  h += '<div class="sectlabel" style="margin-top:26px">SAMPLE &amp; RESET</div>'
    + '<div style="display:flex;gap:8px">'
    + '<button class="btn-quiet" ' + A('loadDemo') + '>Load a sample month</button>'
    + '<button class="btn-quiet" style="color:var(--k-acc);border-color:color-mix(in srgb,var(--k-acc) 36%,transparent)" ' + A('eraseAll') + '>Erase everything</button>'
    + '</div>';

  h += '<div class="sectlabel" style="margin-top:26px">ABOUT</div>'
    + '<div class="row" style="justify-content:space-between;padding:17px">'
    + '<span style="font-size:13.5px;color:var(--k-ink2)">Kosh 1.0 · local build</span>'
    + '<span class="knum" style="font-size:11.5px;color:var(--k-ink3)">' + new Date(DB.settings.createdAt).getDate() + ' ' + MONTHS[new Date(DB.settings.createdAt).getMonth()] + ' ' + new Date(DB.settings.createdAt).getFullYear() + '</span>'
    + '</div>';
  return h;
}

/* ── tab bar ──────────────────────────────────────────────────────────── */
function renderTabs() {
  /* Three tabs a side of a fixed gap, in two equal groups, so the gap's midpoint
     is the phone's midpoint and the + lands dead centre. */
  const left = [['home', 'Home', I.home(21)], ['accounts', 'Accounts', I.bank(21)], ['cards', 'Cards', I.card(21)]];
  const right = [['shared', 'Shared', I.users(21)], ['insights', 'Insights', I.pulse(21)], ['settings', 'Settings', I.menu(21)]];
  const btn = t => {
    const on = S.screen === t[0] || (t[0] === 'insights' && S.screen === 'trends');
    return '<button class="tab' + (on ? ' on' : '') + '" aria-label="' + t[1] + '" ' + A('go', t[0]) + '>'
      + t[2] + '<span class="tablabel">' + t[1] + '</span></button>';
  };
  return '<div class="tabfade"></div>'
    + '<button class="fab" aria-label="Quick log" ' + A('openLog') + '>' + I.plus(26) + '</button>'
    + '<div class="tabbar">'
    + '<div class="tabgroup">' + left.map(btn).join('') + '</div>'
    + '<div class="tabgap"></div>'
    + '<div class="tabgroup">' + right.map(btn).join('') + '</div>'
    + '</div>';
}

/* ══════════════════════════════════════════════════════════════════════════
   Sheets — one task, one sheet
   ══════════════════════════════════════════════════════════════════════════ */
function sheetShell(title, subtitle, body, opts) {
  const o = opts || {};
  return '<button class="scrim" aria-label="Close" ' + A('closeSheet') + '></button>'
    + '<div class="sheet"' + (S._anim ? '' : ' style="animation:none"') + ' role="dialog" aria-label="' + esc(title) + '">'
    + '<div class="sheet-head"><div class="grabber"></div><div class="hrow">'
    + '<div><h3 class="h3">' + esc(title) + '</h3>' + (subtitle ? '<p>' + subtitle + '</p>' : '') + '</div>'
    + '<button class="iconbtn" aria-label="Close" ' + A('closeSheet') + '>' + I.close(17) + '</button>'
    + '</div></div>'
    + '<div class="ksc sheet-body"' + (o.bodyStyle ? ' style="' + o.bodyStyle + '"' : '') + '>' + body + '</div>'
    + (o.footer ? '<div class="sheet-foot">' + o.footer + '</div>' : '')
    + '</div>';
}
function sourceChips(field, includeCards, includeLocked) {
  const f = S.form;
  let list = [];
  /* cards go by their product name, accounts by their bank — so "Infinia" never
     collides with "HDFC" in the same row */
  if (includeCards) list = list.concat(DB.cards.map(c => ({ id: c.id, label: c.name.split(' ')[1] || c.name, dot: 'var(--k-acc)' })));
  list = list.concat(DB.accounts.filter(a => includeLocked || a.group !== 'locked').map(a => ({ id: a.id, label: a.name.split(' ')[0], dot: 'var(--k-sage)' })));
  if (!list.length) return '<div style="font-size:12.5px;color:var(--k-ink3);padding:4px 2px">No accounts yet — add one in Settings first.</div>';
  /* wraps rather than scrolls: every source has to be visible without hunting */
  return '<div class="chipwrap">' + list.map(x =>
    '<button class="chip' + (f[field] === x.id ? ' on' : '') + '" ' + A('setField', field + ':' + x.id) + '>'
    + '<span style="width:8px;height:8px;border-radius:3px;background:' + x.dot + '"></span>' + esc(x.label) + '</button>'
  ).join('') + '</div>';
}
function keypadHtml() {
  return '<div class="keypad">' + ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'].map(k =>
    k === 'del'
      ? '<button class="key" aria-label="Delete the last digit" ' + A('key', 'del') + '><span style="display:grid;color:var(--k-ink)">' + I.backspace(24) + '</span></button>'
      : '<button class="key" aria-label="' + k + '" ' + A('key', k) + '>' + k + '</button>'
  ).join('') + '</div>';
}
/* group the digits as you type, but keep the raw string in state so a trailing
   "." and any decimals survive editing */
function amtDisplay(sv) {
  const s = String(sv || '');
  if (!s) return '\u20b90';
  const i = s.indexOf('.');
  const whole = i < 0 ? s : s.slice(0, i);
  const rest = i < 0 ? '' : s.slice(i);
  const g = whole || '0';
  let last3 = g.slice(-3);
  const head = g.slice(0, -3);
  if (head) last3 = ',' + last3;
  return '\u20b9' + head.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + last3 + rest;
}
function amountBlock(label, amt, hue) {
  return '<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px">'
    + '<div style="min-width:0"><div style="font-size:10.5px;letter-spacing:.13em;color:var(--k-ink3)">' + label + '</div>'
    + '<div class="knum amt-fig" style="color:' + hue + '">' + esc(amtDisplay(amt)) + '</div></div>'
    + '<button class="iconbtn" aria-label="Clear the amount" ' + A('clearAmt') + '>' + I.close(16) + '</button></div>';
}

/* ── 04 Quick log ─────────────────────────────────────────────────────── */
function sheetLog() {
  const f = S.form;
  const isIn = f.dir === 'in';
  const amt = parseFloat(f.amt || '0') || 0;
  const valid = amt > 0;
  const tags = isIn ? INTAGS.map(t => ({ id: t, label: t.toLowerCase() })) : DB.cats.map(c => ({ id: c.id, label: c.name.toLowerCase() }));

  /* what you pick scrolls; what you type never does */
  let b = '<div class="seg tall">'
    + '<button class="' + (!isIn ? 'on' : '') + '" ' + A('setField', 'dir:out') + '>Money out</button>'
    + '<button class="' + (isIn ? 'on sage' : '') + '" ' + A('setField', 'dir:in') + '>Money in</button></div>';

  b += '<div><div class="fieldlabel">' + (isIn ? 'INTO' : 'PAID WITH') + '</div>' + sourceChips('src', !isIn, false) + '</div>';
  b += '<div><div class="fieldlabel">' + (isIn ? 'WHERE IT CAME FROM' : 'CATEGORY') + '</div>'
    + '<div class="chipwrap">' + tags.map(t =>
      '<button class="chip dash' + (f.tag === t.id ? ' on' : '') + '" ' + A('setField', 'tag:' + t.id) + '>' + esc(t.label) + '</button>'
    ).join('') + '</div></div>';

  const label = valid ? (isIn ? 'Log ' + fmt(amt) + ' in' : 'Log ' + fmt(amt)) : 'Type an amount';
  const foot = amountBlock(isIn ? 'MONEY IN' : 'MONEY OUT', f.amt, valid ? (isIn ? 'var(--k-sage)' : 'var(--k-ink)') : 'var(--k-dim)')
    + keypadHtml()
    + '<button class="btn-primary compact" style="'
    + (valid && isIn ? 'background:var(--k-sage);color:var(--k-on-sage)' : '') + '" ' + (valid ? '' : 'disabled ') + A('saveLog') + '>' + label + '</button>';

  return sheetShell('Quick log', '', b, { bodyStyle: 'gap:14px;padding-top:14px', footer: foot });
}

/* ── Move ─────────────────────────────────────────────────────────────── */
function sheetMove() {
  const f = S.form;
  const amt = parseFloat(f.amt || '0') || 0;
  const from = sourceById(f.src), to = sourceById(f.to);
  const valid = amt > 0 && from && to && f.src !== f.to;
  const toIsCard = !!cardById(f.to);

  let b = '<div><div class="fieldlabel">OUT OF</div>' + sourceChips('src', false, true) + '</div>';
  b += '<div><div class="fieldlabel">INTO</div>' + sourceChips('to', true, true) + '</div>';
  const foot = amountBlock('MOVING', f.amt, valid ? 'var(--k-ink)' : 'var(--k-dim)')
    + keypadHtml()
    + '<button class="btn-primary compact" ' + (valid ? '' : 'disabled ') + A('saveMove') + '>'
    + (valid ? 'Move ' + fmt(amt) : 'Pick both ends and an amount') + '</button>';
  return sheetShell('Move money', '', b, { bodyStyle: 'gap:14px;padding-top:14px', footer: foot });
}

/* ── New shared bill ──────────────────────────────────────────────────── */
function sheetBill() {
  const f = S.form;
  const others = DB.people.filter(p => p.id !== 'you');
  const withIds = f.with || [];
  const members = ['you'].concat(withIds);
  const total = parseFloat(f.total || '0') || 0;
  const valid = total > 0 && (f.title || '').trim() && withIds.length > 0;

  let b = '<div><div class="fieldlabel">WHAT WAS IT</div>'
    + '<input class="input" data-f="title" value="' + esc(f.title || '') + '" placeholder="e.g. Diwali groceries"></div>';
  b += '<div><div class="fieldlabel">TOTAL</div>'
    + '<input class="input num" data-f="total" inputmode="decimal" value="' + esc(f.total || '') + '" placeholder="3540"></div>';

  b += '<div><div class="fieldlabel">SPLIT WITH</div><div style="display:flex;gap:8px;flex-wrap:wrap">'
    + others.map(p => '<button class="chip' + (withIds.indexOf(p.id) > -1 ? ' on' : '') + '" style="height:42px" ' + A('toggleWith', p.id) + '>' + esc(p.name) + '</button>').join('')
    + (f.addingPerson ? '' : '<button class="chip dash" style="height:42px" ' + A('addPerson') + '>+ Add someone</button>')
    + '</div>'
    + (f.addingPerson
      ? '<div style="display:flex;gap:8px;margin-top:9px">'
      + '<input class="input" data-f="newPerson" value="' + esc(f.newPerson || '') + '" placeholder="their name" style="flex:1">'
      + '<button class="btn-primary" style="width:auto;padding:0 18px;height:46px;font-size:13px" ' + A('confirmPerson') + '>Add</button></div>'
      : '')
    + '</div>';

  b += '<div><div class="fieldlabel">WHO PAID</div><div class="seg">'
    + members.map(id => '<button class="' + (f.payer === id ? 'on' : '') + '" ' + A('setField', 'payer:' + id) + '>' + esc(personName(id)) + '</button>').join('')
    + '</div></div>';

  b += '<div><div class="fieldlabel">WHICH TAB</div><div class="ksc chiprow">'
    + DB.groups.map(g => '<button class="chip' + (f.group === g.id ? ' on' : '') + '" ' + A('setField', 'group:' + g.id) + '>' + esc(g.label) + '</button>').join('')
    + (f.addingGroup ? '' : '<button class="chip dash" style="height:38px" ' + A('newGroup') + '>+ New tab</button>')
    + '</div>'
    + (f.addingGroup
      ? '<div style="display:flex;gap:8px;margin-top:9px">'
      + '<input class="input" data-f="newGroupName" value="' + esc(f.newGroupName || '') + '" placeholder="e.g. Flat 402" style="flex:1">'
      + '<button class="btn-primary" style="width:auto;padding:0 18px;height:46px;font-size:13px" ' + A('confirmGroup') + '>Add</button></div>'
      : '')
    + '</div>';

  b += '<div><div class="fieldlabel">HOW IT SPLITS</div><div class="seg">'
    + ['Equal', 'Weighted'].map(m => '<button class="' + (f.mode === m ? 'on' : '') + '" ' + A('setField', 'mode:' + m) + '>' + m + '</button>').join('')
    + '</div>';
  if (f.mode === 'Weighted') {
    const w = f.weights || {};
    b += '<div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">'
      + members.map(id => {
        const v = w[id] != null ? w[id] : Math.round(100 / members.length);
        return '<div style="display:flex;align-items:center;gap:10px">'
          + '<span style="flex:1;font-size:13px;color:var(--k-ink2)">' + esc(personName(id)) + '</span>'
          + '<button class="stepbtn sm" aria-label="Less for ' + esc(personName(id)) + '" ' + A('weight', id + ':-5') + '>−</button>'
          + '<span class="knum" style="min-width:44px;text-align:center;font-size:14px;font-weight:700">' + v + '%</span>'
          + '<button class="stepbtn sm" aria-label="More for ' + esc(personName(id)) + '" ' + A('weight', id + ':5') + '>+</button></div>';
      }).join('') + '</div>';
  }
  const shares = billPreviewShares(members);
  b += '<div class="knum" id="billPreview" style="font-size:11.5px;color:var(--k-sage);margin-top:10px">'
    + esc(shares.map(s => personName(s.pid).toLowerCase() + ' ' + fmt(Math.round(total * s.pct / 100))).join(' · ') || 'pick who it splits with') + '</div></div>';

  const foot = '<button class="btn-primary" ' + (valid ? '' : 'disabled ') + A('saveBill') + '>Add shared bill</button>';
  return sheetShell('New shared bill', '', b, { footer: foot });
}
function billPreviewShares(members) {
  const f = S.form;
  if (f.mode === 'Weighted') {
    const w = f.weights || {};
    const raw = members.map(id => ({ pid: id, pct: w[id] != null ? w[id] : Math.round(100 / members.length) }));
    const sum = raw.reduce((t, r) => t + r.pct, 0) || 1;
    return raw.map(r => ({ pid: r.pid, pct: Math.round(r.pct / sum * 100) }));
  }
  const each = Math.round(100 / members.length);
  return members.map((id, i) => ({ pid: id, pct: i === 0 ? 100 - each * (members.length - 1) : each }));
}

/* ── Add an account ───────────────────────────────────────────────────── */
function sheetAccount() {
  const f = S.form;
  const valid = (f.name || '').trim().length > 0;
  let b = '<div><div class="fieldlabel">NAME</div>'
    + '<input class="input" data-f="name" value="' + esc(f.name || '') + '" placeholder="e.g. IDFC First Savings"></div>';
  b += '<div><div class="fieldlabel">KIND — SETS ITS LIQUIDITY GROUP</div><div class="seg">'
    + ATYPES.map(t => '<button class="' + (f.type === t ? 'on' : '') + '" style="font-size:11px" ' + A('setField', 'type:' + t) + '>' + t + '</button>').join('')
    + '</div></div>';
  b += '<div><div class="fieldlabel">OPENING BALANCE</div>'
    + '<input class="input num" data-f="opening" inputmode="decimal" value="' + esc(f.opening || '') + '" placeholder="125000"></div>';
  b += '<div><div class="fieldlabel">ANNUAL RATE — LEAVE 0 IF IT EARNS NOTHING</div>'
    + '<input class="input num" data-f="rate" inputmode="decimal" style="color:var(--k-acc);margin-bottom:8px" value="' + esc(f.rate || '') + '" placeholder="3.5">'
    + '<div class="seg">' + FREQS.map(x => '<button class="' + (f.freq === x ? 'on' : '') + '" style="font-size:11.5px" ' + A('setField', 'freq:' + x) + '>' + x + '</button>').join('') + '</div></div>';
  const foot = '<button class="btn-primary" ' + (valid ? '' : 'disabled ') + A('saveAccount') + '>Add account</button>';
  return sheetShell('Add an account', '', b, { footer: foot });
}

/* ── Cards: every card and its cycle, in one place ────────────────────── */
function sheetCards() {
  let b = '';
  if (!DB.cards.length) {
    b += '<div class="empty"><div class="t">No cards yet</div></div>';
  } else {
    b += '<div style="display:flex;flex-direction:column;gap:7px">';
    for (const c of DB.cards) {
      const st = cardStats(c);
      b += '<button class="row" ' + A('editCard', c.id) + '>'
        + '<div class="glyph" style="background:color-mix(in srgb,var(--k-acc) 13%,transparent);color:var(--k-acc)">' + esc(initials(c.name)) + '</div>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="font-size:14.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(c.name) + '</div>'
        + '<div class="knum" style="font-size:11px;color:var(--k-ink3);margin-top:4px">'
        + 'closes ' + c.statementDay + ' · due ' + (+c.dueDay || defaultDueDay(c.statementDay)) + ' · ' + fmt(st.limit) + ' limit</div></div>'
        + '<div style="text-align:right">'
        + '<div class="knum" style="font-size:15px;font-weight:700;color:' + (st.outstanding > 0 ? 'var(--k-acc)' : 'var(--k-ink)') + '">' + fmt(st.outstanding) + '</div>'
        + '<div style="font-size:10.5px;color:var(--k-ink3);margin-top:3px">outstanding</div></div>'
        + '<span style="color:var(--k-ink3);flex:none;display:grid">' + I.chev(16) + '</span></button>';
    }
    b += '</div>';
  }
  const foot = '<button class="btn-primary" ' + A('openCard') + '>Add a credit card</button>';
  return sheetShell('Cards', DB.cards.length + (DB.cards.length === 1 ? ' card' : ' cards'), b, { footer: foot });
}

/* ── Add or edit a credit card ────────────────────────────────────────── */
function sheetCard() {
  const f = S.form;
  const editing = !!f.editId;
  const valid = (f.name || '').trim().length > 0 && (parseFloat(f.limit || '0') || 0) > 0;
  let b = '<div><div class="fieldlabel">CARD NAME</div>'
    + '<input class="input" data-f="name" value="' + esc(f.name || '') + '" placeholder="e.g. ICICI Amazon Pay"></div>';
  b += '<div style="display:flex;gap:10px">'
    + '<div style="flex:1"><div class="fieldlabel">LAST 4</div>'
    + '<input class="input num" data-f="last4" inputmode="numeric" maxlength="4" value="' + esc(f.last4 || '') + '" placeholder="4102"></div>'
    + '<div style="flex:1.4"><div class="fieldlabel">CREDIT LIMIT</div>'
    + '<input class="input num" data-f="limit" inputmode="decimal" value="' + esc(f.limit || '') + '" placeholder="300000"></div></div>';
  b += '<div><div class="fieldlabel">' + (editing ? 'BALANCE CARRIED WHEN ADDED' : 'OUTSTANDING NOW — LEAVE 0 IF IT IS CLEAR') + '</div>'
    + '<input class="input num" data-f="carried" inputmode="decimal" value="' + esc(f.carried || '') + '" placeholder="0"></div>';
  const stepRow = (label, val, act, aria) =>
    '<div class="row" style="justify-content:space-between;padding:14px 17px">'
    + '<div style="font-size:13.5px;font-weight:600">' + label + '</div>'
    + '<div style="display:flex;align-items:center;gap:10px">'
    + '<button class="stepbtn" aria-label="Earlier ' + aria + '" ' + A(act, '-1') + '>−</button>'
    + '<span class="knum" style="font-size:16px;font-weight:700;min-width:34px;text-align:center">' + val + '</span>'
    + '<button class="stepbtn" aria-label="Later ' + aria + '" ' + A(act, '1') + '>+</button></div></div>';
  const eom = (+f.day >= 29 || +(f.due || 0) >= 29);
  b += '<div><div class="fieldlabel">BILLING CYCLE</div>'
    + '<div style="display:flex;flex-direction:column;gap:7px">'
    + stepRow('Statement closes on', f.day || 1, 'dayStep', 'statement day')
    + stepRow('Payment due on', f.due || defaultDueDay(f.day || 1), 'dueStep', 'due day')
    + '</div>'
    + '<div class="knum" style="font-size:11.5px;color:var(--k-sage);margin-top:9px">' + esc(cyclePreview(f))
    + (eom ? ' · short months use their last day' : '') + '</div></div>';
  if (editing) {
    b += '<button class="btn-quiet" style="color:var(--k-acc);border-color:color-mix(in srgb,var(--k-acc) 36%,transparent)" ' + A('removeCard', f.editId) + '>Remove this card</button>';
  }
  const foot = '<button class="btn-primary" ' + (valid ? '' : 'disabled ') + A('saveCard') + '>' + (editing ? 'Save changes' : 'Add card') + '</button>';
  return sheetShell(editing ? 'Edit card' : 'Add a credit card', '', b, { footer: foot });
}
function cyclePreview(f) {
  const day = +f.day || 1, due = +f.due || defaultDueDay(day);
  const start = statementDate(day, 0), end = statementDate(day, 1);
  const d = dueDateFor(end, due);
  const s = new Date(start.getTime() + 1000);
  return 'this cycle ' + s.getDate() + ' ' + MONTHS[s.getMonth()] + ' – ' + end.getDate() + ' ' + MONTHS[end.getMonth()]
    + ', payable by ' + d.getDate() + ' ' + MONTHS[d.getMonth()];
}

/* ── Categories: the whole set, configured in one place ───────────────── */
function sheetCats() {
  const ym = ymOf(Date.now());
  let b = '';
  if (!DB.cats.length) {
    b += '<div class="empty"><div class="t">No categories yet</div>'
      + '<p>Categories are what give the bars on Trends and the ceilings their meaning. Add the first one.</p></div>';
  } else {
    b += '<div style="display:flex;flex-direction:column;gap:7px">';
    for (const c of DB.cats) {
      const sp = catSpend(c.id, ym), cap = +c.cap || 0;
      const over = cap > 0 && sp > cap;
      const used = DB.txns.filter(t => t.catId === c.id).length;
      b += '<button class="row" ' + A('editCategory', c.id) + '>'
        + '<div class="glyph" style="background:color-mix(in srgb,var(--k-ink) 7%,transparent);color:' + c.color + '">' + esc(c.glyph) + '</div>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="font-size:14.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(c.name) + '</div>'
        + '<div style="font-size:11px;color:var(--k-ink3);margin-top:4px">'
        + (c.kind === 'investment' ? 'investment · not counted as spending'
          : (cap > 0 ? 'ceiling ' + fmt(cap) + ' · ' + used + (used === 1 ? ' entry' : ' entries') : 'no ceiling · ' + used + (used === 1 ? ' entry' : ' entries')))
        + '</div></div>'
        + '<div style="text-align:right">'
        + '<div class="knum" style="font-size:15px;font-weight:700;color:' + (over ? 'var(--k-acc)' : 'var(--k-ink)') + '">' + fmt(sp) + '</div>'
        + '<div style="font-size:10.5px;color:var(--k-ink3);margin-top:3px">this month</div></div>'
        + '<span style="color:var(--k-ink3);flex:none;display:grid">' + I.chev(16) + '</span>'
        + '</button>';
    }
    b += '</div>';
  }
  const foot = '<button class="btn-primary" ' + A('openCategory') + '>Add a category</button>';
  return sheetShell('Categories', DB.cats.length + (DB.cats.length === 1 ? ' category' : ' categories'), b, { footer: foot });
}

/* ── Add or edit one category ─────────────────────────────────────────── */
function sheetCategory() {
  const f = S.form;
  const editing = !!f.editId;
  const valid = (f.name || '').trim().length > 0;
  let b = '<div><div class="fieldlabel">NAME</div>'
    + '<input class="input" data-f="name" value="' + esc(f.name || '') + '" placeholder="e.g. Pets"></div>';
  b += '<div><div class="fieldlabel">COLOUR — FROM THE SYSTEM RAMPS</div><div style="display:flex;gap:9px;flex-wrap:wrap">'
    + SW.map(h => '<button class="swatch' + (f.color === h ? ' on' : '') + '" style="width:38px;height:38px;border-radius:13px;background:' + h + '" aria-label="' + h + '" ' + A('setField', 'color:' + h) + '></button>').join('')
    + '</div></div>';
  b += '<div><div class="fieldlabel">GLYPH</div><div style="display:flex;gap:9px;flex-wrap:wrap">'
    + GL.map(g => '<button class="glyphpick' + (f.glyph === g ? ' on' : '') + '" style="width:38px;height:38px;border-radius:13px" ' + A('setField', 'glyph:' + g) + '>' + g + '</button>').join('')
    + '</div></div>';
  b += '<div class="row" style="justify-content:space-between;padding:14px 17px">'
    + '<span style="font-size:13px;color:var(--k-ink2)">Monthly ceiling</span>'
    + '<div style="display:flex;align-items:center;gap:10px">'
    + '<button class="stepbtn" aria-label="Lower the ceiling" ' + A('ngCap', '-1') + '>−</button>'
    + '<span class="knum" style="font-size:16px;font-weight:700;min-width:78px;text-align:center">' + fmt(f.cap || 0) + '</span>'
    + '<button class="stepbtn" aria-label="Raise the ceiling" ' + A('ngCap', '1') + '>+</button></div></div>';
  b += '<div class="row" style="justify-content:space-between;padding:14px 17px">'
    + '<div><div style="font-size:13px;color:var(--k-ink2)">Counts as spending</div>'
    + '</div>'
    + '<button class="switch" role="switch" aria-checked="' + (f.kind !== 'investment') + '" aria-label="Counts as spending" ' + A('ngKind') + '><span class="knob"></span></button></div>';
  if (editing) {
    const used = DB.txns.filter(t => t.catId === f.editId).length;
    b += '<button class="btn-quiet" style="color:var(--k-acc);border-color:color-mix(in srgb,var(--k-acc) 36%,transparent)" ' + A('removeCat', f.editId) + '>'
      + (used ? 'Remove — ' + used + (used === 1 ? ' entry becomes untagged' : ' entries become untagged') : 'Remove this category') + '</button>';
  }
  const foot = '<button class="btn-primary" ' + (valid ? '' : 'disabled ') + A('saveCategory') + '>'
    + (editing ? 'Save changes' : 'Add category') + '</button>';
  return sheetShell(editing ? 'Edit category' : 'Add a category', '', b, { footer: foot });
}

/* ── Interest engine ──────────────────────────────────────────────────── */
function sheetInterest() {
  const y = yearlyInterest();
  let b = '<div style="padding:18px;border-radius:26px 26px 10px 10px;background:linear-gradient(150deg,color-mix(in srgb,var(--k-sage) 15%,transparent),var(--k-surface) 72%);border:1px solid var(--k-line)">'
    + '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px">'
    + '<div><div style="font-size:10.5px;letter-spacing:.12em;color:var(--k-ink3)">PROJECTED THIS YEAR</div>'
    + '<div class="knum" style="font-size:27px;font-weight:700;color:var(--k-sage);margin-top:5px">' + fmt(y) + '</div></div>'
    + '<div class="knum" style="font-size:12.5px;color:var(--k-ink2);text-align:right">' + fmt(y / 12) + '/mo</div></div>'
    + '<div style="display:flex;align-items:center;gap:8px;margin-top:14px;padding-top:13px;border-top:1px solid var(--k-line)">'
    + '<span class="pulse" style="width:7px;height:7px;border-radius:50%;background:var(--k-sage);flex:none"></span>'
    + '<span style="font-size:11.5px;color:var(--k-ink3);flex:1">earned since you opened this page</span>'
    + '<span class="knum" id="liveAccrued" style="font-size:14px;font-weight:700;color:var(--k-sage)">₹' + liveAccrued().toFixed(2) + '</span></div></div>';

  if (!DB.accounts.length) {
    b += '<div class="empty" style="margin-top:12px"><div class="t">No accounts to earn on</div>'
      + '<p>Add an account with an annual rate and its rule will appear here.</p></div>';
  } else {
    b += '<div style="display:flex;flex-direction:column;gap:7px;margin-top:7px">';
    for (const a of DB.accounts) {
      const eff = effRate(a);
      b += '<div class="surf" style="padding:15px 17px;border-radius:20px">'
        + '<div style="display:flex;align-items:center;gap:12px">'
        + '<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:600">' + esc(a.name) + '</div>'
        + '<div class="knum" style="font-size:11.5px;color:var(--k-ink3);margin-top:2px">' + fmt(principal(a)) + ' · ' + (a.freq || 'Monthly').toLowerCase() + ' compounding</div></div>'
        + '<div style="display:flex;align-items:center;gap:8px;flex:none">'
        + '<button class="stepbtn sm" aria-label="Lower the rate" ' + A('rate', a.id + ':-1') + '>−</button>'
        + '<span class="knum" style="font-size:16px;font-weight:700;min-width:52px;text-align:center;color:var(--k-acc)">' + (+a.rate || 0).toFixed(1) + '%</span>'
        + '<button class="stepbtn sm" aria-label="Raise the rate" ' + A('rate', a.id + ':1') + '>+</button></div></div>'
        + '<div style="display:flex;align-items:center;gap:10px;margin-top:12px">'
        + '<div class="seg" style="flex:1;background:var(--k-bg)">'
        + FREQS.map(x => '<button class="' + (a.freq === x ? 'on' : '') + '" style="height:30px;font-size:11.5px" ' + A('freq', a.id + ':' + x) + '>' + x + '</button>').join('')
        + '</div>'
        + '<span class="knum" style="flex:none;font-size:12.5px;font-weight:700;color:var(--k-sage)">' + fmt(principal(a) * eff / 12) + '/mo</span>'
        + '</div></div>';
    }
    b += '</div>';
  }
  return sheetShell('Interest engine', '', b, { bodyStyle: 'gap:0;padding-top:16px' });
}

/* ── Account detail ───────────────────────────────────────────────────── */
function sheetDetail() {
  const a = acctById(S.detailId);
  if (!a) return '';
  const bal = accBalance(a), pr = principal(a);
  const interest = (a.accBase || 0) + pendingInterest(a);
  let b = '<div class="hero" style="border-radius:26px">'
    + '<div style="font-size:11px;letter-spacing:.14em;color:var(--k-ink3)">BALANCE</div>'
    + '<div class="knum" style="font-size:38px;font-weight:700;margin-top:8px">' + fmt(bal) + '</div>'
    + '<div style="display:flex;gap:22px;margin-top:16px;padding-top:14px;border-top:1px solid var(--k-line)">'
    + '<div><div style="font-size:10.5px;letter-spacing:.1em;color:var(--k-ink3)">FROM ENTRIES</div>'
    + '<div class="knum" style="font-size:15px;font-weight:700;margin-top:3px">' + fmt(pr - interest) + '</div></div>'
    + '<div><div style="font-size:10.5px;letter-spacing:.1em;color:var(--k-ink3)">FROM INTEREST</div>'
    + '<div class="knum" style="font-size:15px;font-weight:700;margin-top:3px;color:var(--k-sage)">' + fmt(interest) + '</div></div>'
    + '</div></div>';

  b += '<div class="datalist">'
    + '<div class="dl-row"><span class="dl-k">Kind</span><span class="dl-v">' + esc(a.type) + '</span></div>'
    + '<div class="dl-row"><span class="dl-k">Group</span><span class="dl-v">' + (a.group === 'liquid' ? 'Liquid' : a.group === 'locked' ? 'Locked &amp; invested' : 'Cash on hand') + '</span></div>'
    + '<div class="dl-row"><span class="dl-k">Annual rate</span><span class="dl-v" style="color:var(--k-acc)">' + (+a.rate || 0).toFixed(1) + '% ' + (a.freq || '').toLowerCase() + '</span></div>'
    + '<div class="dl-row"><span class="dl-k">Last counted</span><span class="dl-v">' + dayLabel(a.lastCounted || a.createdAt) + '</span></div>'
    + '</div>';

  b += '<div><div class="fieldlabel">COUNTED BALANCE</div>'
    + '<div style="display:flex;gap:9px">'
    + '<input class="input num" data-f="recount" inputmode="decimal" value="' + esc(S.form.recount || '') + '" placeholder="' + Math.round(bal) + '" style="flex:1">'
    + '<button class="btn-primary" style="width:auto;padding:0 20px;height:46px;font-size:13px" ' + A('applyRecount', a.id) + '>Reconcile</button></div>'
    + '</div>';

  /* statement — every entry, a month at a time */
  const months = monthsFor(a.id);
  if (months.length) {
    const ym = months.indexOf(S.stmtMonth) > -1 ? S.stmtMonth : months[0];
    const list = txnsInMonth(a.id, ym);
    const sum = periodSummary(a.id, list);
    b += '<div><div class="fieldlabel">STATEMENT</div>'
      + '<div class="chipwrap" style="margin-bottom:12px">' + months.map(m =>
        '<button class="chip' + (m === ym ? ' on' : '') + '" style="height:34px;font-size:12px" ' + A('pickStmtMonth', m) + '>' + esc(ymLabel(m).slice(0, 3) + (m.slice(0, 4) === String(new Date().getFullYear()) ? '' : " '" + m.slice(2, 4))) + '</button>'
      ).join('') + '</div>'
      + '<div class="datalist" style="margin-bottom:9px">'
      + '<div class="dl-row"><span class="dl-k">In</span><span class="dl-v" style="color:var(--k-sage)">' + fmt(sum.inn) + '</span></div>'
      + '<div class="dl-row"><span class="dl-k">Out</span><span class="dl-v" style="color:var(--k-acc)">' + fmt(sum.out) + '</span></div>'
      + '<div class="dl-row"><span class="dl-k">Net</span><span class="dl-v">' + fmt(sum.net) + '</span></div>'
      + '<div class="dl-row"><span class="dl-k">Entries</span><span class="dl-v">' + sum.count + '</span></div>'
      + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:7px">' + list.map(txnRow).join('') + '</div></div>';
  }
  b += '<button class="btn-quiet" style="color:var(--k-acc);border-color:color-mix(in srgb,var(--k-acc) 36%,transparent)" ' + A('removeAccount', a.id) + '>Remove this account</button>';
  return sheetShell(a.name, esc(a.type.toLowerCase()), b);
}

/* ── One billing cycle, entry by entry ────────────────────────────────── */
function sheetCycle() {
  const c = cardById(S.detailId);
  if (!c) return '';
  const st = cardStats(c);
  const cy = st.cycles[Math.min(st.cycles.length - 1, Math.max(0, +S.stmtCycle))];
  if (!cy) return '';
  const list = txnsInCycle(c, cy);
  const charges = list.filter(t => t.dir === 'out' && t.src === c.id).reduce((s, t) => s + t.amount, 0);
  const refunds = list.filter(t => t.dir === 'in' && t.src === c.id).reduce((s, t) => s + t.amount, 0);
  /* payments clear the oldest balance first, so what matters here is how much
     of *this* cycle has been cleared — not what happened to land in the window */
  const clearedOff = Math.max(0, cy.charged - cy.outstanding);
  const dstr = d => d.getDate() + ' ' + MONTHS[d.getMonth()];

  let b = '<div class="hero" style="border-radius:26px">'
    + '<div style="font-size:11px;letter-spacing:.14em;color:var(--k-ink3)">' + (cy.open ? 'CHARGED SO FAR' : 'BILLED') + '</div>'
    + '<div class="knum" style="font-size:36px;font-weight:700;margin-top:8px">' + fmt(cy.charged) + '</div>'
    + '<div style="font-size:12px;color:var(--k-ink2);margin-top:8px">'
    + (cy.open ? 'closes ' + dstr(cy.end) : cy.state === 'paid' ? 'settled' : (cy.state === 'overdue' ? 'was due ' : 'due ') + dstr(cy.due))
    + '</div></div>';

  b += '<div class="datalist">'
    + '<div class="dl-row"><span class="dl-k">Charges</span><span class="dl-v">' + fmt(charges) + '</span></div>'
    + (refunds > 0 ? '<div class="dl-row"><span class="dl-k">Refunds</span><span class="dl-v" style="color:var(--k-sage)">' + fmt(refunds) + '</span></div>' : '')
    + (clearedOff > 0 ? '<div class="dl-row"><span class="dl-k">Paid off</span><span class="dl-v" style="color:var(--k-sage)">' + fmt(clearedOff) + '</span></div>' : '')
    + '<div class="dl-row"><span class="dl-k">Still outstanding</span><span class="dl-v" style="color:' + (cy.outstanding > 0 ? 'var(--k-acc)' : 'var(--k-sage)') + '">' + fmt(cy.outstanding) + '</span></div>'
    + '<div class="dl-row"><span class="dl-k">Entries</span><span class="dl-v">' + list.length + '</span></div>'
    + '</div>';

  /* only cycles that actually happened — an untouched month is not a statement */
  b += '<div class="chipwrap">' + st.cycles.slice().reverse().map((x, n) => {
    const idx = st.cycles.length - 1 - n;
    if (!x.open && x.charged <= 0 && x.outstanding <= 0) return '';
    return '<button class="chip' + (idx === +S.stmtCycle ? ' on' : '') + '" style="height:34px;font-size:12px" ' + A('pickCycle', idx) + '>' + esc(x.label) + '</button>';
  }).join('') + '</div>';

  b += list.length
    ? '<div style="display:flex;flex-direction:column;gap:7px">' + list.map(txnRow).join('') + '</div>'
    : '<div style="padding:20px;border-radius:20px;border:1px dashed var(--k-hair);text-align:center;font-size:12.5px;color:var(--k-ink3)">Nothing charged in this cycle.</div>';

  return sheetShell(c.name, esc(cy.label), b);
}

/* ── Transaction detail ───────────────────────────────────────────────── */
function sheetTxn() {
  const t = DB.txns.find(x => x.id === S.detailId);
  if (!t) return '';
  const c = catById(t.catId);
  const dir = t.dir === 'in' ? 'Money in' : t.dir === 'transfer' ? 'Transfer' : 'Money out';
  let b = '<div class="hero" style="border-radius:26px">'
    + '<div style="font-size:11px;letter-spacing:.14em;color:var(--k-ink3)">' + dir.toUpperCase() + '</div>'
    + '<div class="knum" style="font-size:38px;font-weight:700;margin-top:8px;color:' + (t.dir === 'in' ? 'var(--k-sage)' : 'var(--k-ink)') + '">' + fmt(t.amount) + '</div></div>';
  b += '<div class="datalist">'
    + '<div class="dl-row"><span class="dl-k">When</span><span class="dl-v">' + new Date(t.ts).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) + '</span></div>'
    + '<div class="dl-row"><span class="dl-k">' + (t.dir === 'transfer' ? 'Out of' : 'Source') + '</span><span class="dl-v">' + esc(sourceById(t.src) ? sourceById(t.src).name : '—') + '</span></div>'
    + (t.to ? '<div class="dl-row"><span class="dl-k">Into</span><span class="dl-v">' + esc(sourceById(t.to) ? sourceById(t.to).name : '—') + '</span></div>' : '')
    + '<div class="dl-row"><span class="dl-k">Tag</span><span class="dl-v">' + esc(c ? c.name : (t.tag || '—')) + '</span></div>'
    + (t.note ? '<div class="dl-row"><span class="dl-k">Note</span><span class="dl-v">' + esc(t.note) + '</span></div>' : '')
    + '</div>';
  b += '<button class="btn-quiet" style="color:var(--k-acc);border-color:color-mix(in srgb,var(--k-acc) 36%,transparent)" ' + A('removeTxn', t.id) + '>Delete this entry</button>';
  return sheetShell('Entry', '', b);
}

/* ── Export / restore ─────────────────────────────────────────────────── */
function toCsv() {
  const head = 'date,direction,amount,source,category,note\n';
  const rows = DB.txns.slice().sort((a, b) => a.ts - b.ts).map(t => {
    const c = catById(t.catId);
    const q = s => '"' + String(s == null ? '' : s).replace(/"/g, '""') + '"';
    return [new Date(t.ts).toISOString(), t.dir, t.amount, q(sourceById(t.src) ? sourceById(t.src).name : ''), q(c ? c.name : (t.tag || '')), q(t.note || '')].join(',');
  });
  return head + rows.join('\n');
}
function sheetExport() {
  const isCsv = S.form.kind === 'csv';
  const payload = isCsv ? toCsv() : JSON.stringify(DB, null, 2);
  const b = '<textarea class="input" readonly id="exportBox" style="height:200px">' + esc(payload) + '</textarea>'
    + '<button class="btn-primary" ' + A('copyExport') + '>Copy to clipboard</button>';
  return sheetShell(isCsv ? 'Export CSV' : 'Export JSON', '', b);
}
function sheetRestore() {
  const b = '<p style="font-size:12.5px;color:var(--k-ink2);margin:0">Replaces everything in the ledger.</p>'
    + '<input type="file" accept=".json,application/json" id="restoreFile" class="input" style="height:auto;padding:12px 16px;font-size:12px;font-weight:500">'
    + '<textarea class="input" data-f="paste" placeholder=\'{"v":1,"accounts":[…]}\' style="height:180px"></textarea>'
    + '<button class="btn-primary" style="background:none;border:1px solid color-mix(in srgb,var(--k-acc) 36%,transparent);color:var(--k-acc)" ' + A('doRestore') + '>Restore and overwrite</button>';
  return sheetShell('Restore', '', b);
}

function renderSheets() {
  const map = {
    log: sheetLog, move: sheetMove, bill: sheetBill, account: sheetAccount,
    card: sheetCard, cards: sheetCards, cycle: sheetCycle, cats: sheetCats, category: sheetCategory, interest: sheetInterest,
    detail: sheetDetail, txn: sheetTxn, export: sheetExport, restore: sheetRestore
  };
  const fn = map[S.sheet];
  return fn ? fn() : '';
}

/* ══════════════════════════════════════════════════════════════════════════
   Actions
   ══════════════════════════════════════════════════════════════════════════ */
const SCREENS = { home: screenHome, accounts: screenAccounts, cards: screenCards, shared: screenShared, trends: screenTrends, insights: screenInsights, settings: screenSettings };

let toastTimer = null;
function toast(msg) {
  const host = document.getElementById('toasts');
  host.innerHTML = '<div class="toast' + (S.sheet ? ' top' : '') + '">'
    + '<span style="color:var(--k-toast-ok);display:grid">' + I.check(17) + '</span><span>' + esc(msg) + '</span></div>';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { host.innerHTML = ''; }, 2600);
}

let armed = null, armTimer = null;
function confirmTwice(key, msg) {
  if (armed === key) { armed = null; clearTimeout(armTimer); return true; }
  armed = key;
  clearTimeout(armTimer);
  armTimer = setTimeout(() => { armed = null; }, 4000);
  toast(msg);
  return false;
}

function openSheet(name, form) {
  S.sheet = name;
  S.form = form || {};
  S._anim = true;
  render();
}
function closeSheet() { S.sheet = null; S.form = {}; render(); }

function defaultSource(preferCards) {
  if (preferCards && DB.cards.length) return DB.cards[0].id;
  const liquid = DB.accounts.filter(a => a.group !== 'locked');
  return liquid.length ? liquid[0].id : (DB.accounts[0] ? DB.accounts[0].id : null);
}
function lastUsedSource() {
  for (let i = DB.txns.length - 1; i >= 0; i--) if (DB.txns[i].src) return DB.txns[i].src;
  return defaultSource(true);
}
function lastUsedTag() {
  for (let i = DB.txns.length - 1; i >= 0; i--) if (DB.txns[i].dir === 'out' && DB.txns[i].catId) return DB.txns[i].catId;
  return DB.cats.length ? DB.cats[0].id : null;
}

/* ── writing to the ledger ────────────────────────────────────────────── */
function addTxn(t) {
  const acc = acctById(t.src); if (acc) crystallize(acc);
  const dest = t.to ? acctById(t.to) : null; if (dest) crystallize(dest);
  DB.txns.push(Object.assign({ id: uid('t'), ts: Date.now() }, t));
  save();
}
function removeTxnById(id) {
  const i = DB.txns.findIndex(t => t.id === id);
  if (i < 0) return;
  const t = DB.txns[i];
  const acc = acctById(t.src); if (acc) crystallize(acc);
  const dest = t.to ? acctById(t.to) : null; if (dest) crystallize(dest);
  DB.txns.splice(i, 1);
  save();
}

const ACTIONS = {
  go(p) {
    S.screen = p; S.sheet = null; S.form = {};
    document.getElementById('scroll').scrollTop = 0;
    render();
  },
  goCard(p) { S.screen = 'cards'; const i = DB.cards.findIndex(c => c.id === p); if (i > -1) S.cardIndex = i; S.sheet = null; render(); },
  goShared() { ACTIONS.go('shared'); },
  goTrendsCat(p) { S.screen = 'trends'; S.editCat = p; S.sheet = null; render(); },
  toggleHidden() { DB.ui.hidden = !DB.ui.hidden; save(); render(); },

  openLog() { openSheet('log', { dir: 'out', amt: '', src: lastUsedSource(), tag: lastUsedTag() }); },
  openMove() { openSheet('move', { amt: '', src: defaultSource(false), to: null }); },
  openBill() {
    openSheet('bill', {
      title: '', total: '', mode: 'Equal', payer: 'you',
      with: DB.people.filter(p => p.id !== 'you').map(p => p.id),
      group: DB.groups.length ? DB.groups[0].id : null, weights: {}
    });
  },
  openAccount() { openSheet('account', { name: '', type: 'Savings', opening: '', rate: '', freq: 'Monthly' }); },
  openCards() { openSheet('cards', {}); },
  openCard() { openSheet('card', { name: '', last4: '', limit: '', carried: '', day: 17, due: defaultDueDay(17) }); },
  editCard(p) {
    const c = cardById(p); if (!c) return;
    openSheet('card', {
      editId: c.id, name: c.name, last4: c.last4 || '', limit: String(c.limit || ''),
      carried: String(c.openingDue || ''), day: c.statementDay, due: +c.dueDay || defaultDueDay(c.statementDay)
    });
  },
  openCats() { openSheet('cats', {}); },
  openCategory() { openSheet('category', { name: '', color: SW[1], glyph: 'Sh', cap: 5000, kind: 'expense' }); },
  editCategory(p) {
    const c = catById(p); if (!c) return;
    openSheet('category', { editId: c.id, name: c.name, color: c.color, glyph: c.glyph, cap: +c.cap || 0, kind: c.kind || 'expense' });
  },
  openInterest() { openSheet('interest', {}); },
  openDetail(p) { S.detailId = p; S.stmtMonth = null; openSheet('detail', {}); },
  pickStmtMonth(p) { S.stmtMonth = p; render(); },
  openCycle(p) {
    const i = p.lastIndexOf(':');
    S.detailId = p.slice(0, i); S.stmtCycle = +p.slice(i + 1);
    openSheet('cycle', {});
  },
  pickCycle(p) { S.stmtCycle = +p; render(); },
  openTxn(p) { S.detailId = p; openSheet('txn', {}); },
  openRestore() { openSheet('restore', {}); },
  closeSheet() { closeSheet(); },

  setField(p) {
    const i = p.indexOf(':');
    const k = p.slice(0, i), v = p.slice(i + 1);
    S.form[k] = v;
    if (k === 'dir') S.form.tag = v === 'in' ? INTAGS[0] : lastUsedTag();
    if (k === 'dir') S.form.src = defaultSource(v !== 'in');
    render();
  },
  key(p) {
    const f = S.form;
    let a = f.amt || '';
    if (p === 'del') a = a.slice(0, -1);
    else if (p === '.') { if (a.indexOf('.') > -1) return; a = (a || '0') + '.'; }
    else { if (a.replace('.', '').length > 8) return; if (a === '0') a = ''; a += p; }
    f.amt = a;
    render();
  },
  clearAmt() { S.form.amt = ''; render(); },

  saveLog() {
    const f = S.form;
    const amt = Math.round((parseFloat(f.amt || '0') || 0) * 100) / 100;
    if (amt <= 0) return;
    if (!f.src) { toast('Add an account first — Settings › Add an account'); return; }
    const isIn = f.dir === 'in';
    addTxn({ dir: isIn ? 'in' : 'out', amount: amt, src: f.src, catId: isIn ? null : f.tag, tag: isIn ? f.tag : null });
    const src = sourceById(f.src);
    S.recalc = true;
    setTimeout(() => { S.recalc = false; render(); }, 850);
    closeSheet();
    toast(fmt(amt) + (isIn ? ' into ' : ' on ') + (src ? src.name.split(' ')[0] : '') + '. Done.');
  },
  saveMove() {
    const f = S.form;
    const amt = Math.round((parseFloat(f.amt || '0') || 0) * 100) / 100;
    if (amt <= 0 || !f.src || !f.to || f.src === f.to) return;
    addTxn({ dir: 'transfer', amount: amt, src: f.src, to: f.to });
    const to = sourceById(f.to);
    closeSheet();
    toast(fmt(amt) + ' moved to ' + (to ? to.name.split(' ')[0] : ''));
  },
  saveBill() {
    const f = S.form;
    const total = Math.round((parseFloat(f.total || '0') || 0) * 100) / 100;
    const members = ['you'].concat(f.with || []);
    if (total <= 0 || !(f.title || '').trim() || members.length < 2) return;
    DB.bills.push({
      id: uid('b'), title: f.title.trim(), total: total, groupId: f.group || null,
      payerId: f.payer || 'you', ts: Date.now(), shares: billPreviewShares(members), settled: false
    });
    save(); closeSheet();
    toast(f.title.trim() + ' added to the tab');
  },
  saveAccount() {
    const f = S.form;
    const name = (f.name || '').trim();
    if (!name) return;
    const type = f.type || 'Savings';
    DB.accounts.push({
      id: uid('a'), name: name, glyph: initials(name), type: type, group: TGRP[type] || 'liquid',
      opening: Math.round((parseFloat(f.opening || '0') || 0) * 100) / 100,
      rate: parseFloat(f.rate || '0') || 0, freq: f.freq || 'Monthly',
      accBase: 0, accAnchor: Date.now(), createdAt: Date.now(), lastCounted: Date.now()
    });
    save(); closeSheet(); toast(name + ' added');
  },
  saveCard() {
    const f = S.form;
    const name = (f.name || '').trim();
    const limit = Math.round(parseFloat(f.limit || '0') || 0);
    if (!name || limit <= 0) return;
    const day = Math.min(31, Math.max(1, +f.day || 1));
    const due = Math.min(31, Math.max(1, +f.due || defaultDueDay(day)));
    const carried = Math.round(parseFloat(f.carried || '0') || 0);
    if (f.editId) {
      const c = cardById(f.editId);
      if (c) { c.name = name; c.last4 = (f.last4 || '').slice(0, 4); c.limit = limit; c.openingDue = carried; c.statementDay = day; c.dueDay = due; }
      save(); openSheet('cards', {}); toast(name + ' updated');
      return;
    }
    DB.cards.push({
      id: uid('c'), name: name, last4: (f.last4 || '').slice(0, 4), limit: limit,
      openingDue: carried, statementDay: day, dueDay: due, createdAt: Date.now()
    });
    S.cardIndex = DB.cards.length - 1;
    save(); openSheet('cards', {}); toast(name + ' joined the stack');
  },
  saveCategory() {
    const f = S.form;
    const name = (f.name || '').trim();
    if (!name) return;
    const kind = f.kind === 'investment' ? 'investment' : 'expense';
    if (f.editId) {
      const c = catById(f.editId);
      if (c) { c.name = name; c.color = f.color || c.color; c.glyph = f.glyph || c.glyph; c.cap = +f.cap || 0; c.kind = kind; }
      S.editCat = f.editId;
      save(); openSheet('cats', {}); toast(name + ' updated');
      return;
    }
    const id = uid('g');
    DB.cats.push({ id: id, name: name, color: f.color || SW[1], glyph: f.glyph || 'Sh', cap: +f.cap || 0, kind: kind });
    S.editCat = id;
    save(); openSheet('cats', {}); toast(name + ' added — it has a bar on Trends now');
  },

  /* cards & categories */
  pickCard(p) { S.cardIndex = +p; render(); },
  pickGroup(p) { S.group = p; render(); },
  pickMonth(p) { S.month = p; render(); },
  editCat(p) { S.editCat = p; render(); },
  catColor(p) { const c = catById(S.editCat); if (c) { c.color = p; save(); render(); } },
  catGlyph(p) { const c = catById(S.editCat); if (c) { c.glyph = p; save(); render(); } },
  capStep(p) { const c = catById(S.editCat); if (c) { c.cap = Math.max(0, (+c.cap || 0) + (+p) * 1000); save(); render(); } },
  catKind() { const c = catById(S.editCat); if (c) { c.kind = c.kind === 'investment' ? 'expense' : 'investment'; save(); render(); } },
  removeCat(p) {
    if (!confirmTwice('cat' + p, 'Tap Remove again to delete this category')) return;
    const used = DB.txns.some(t => t.catId === p);
    DB.cats = DB.cats.filter(c => c.id !== p);
    if (S.editCat === p) S.editCat = DB.cats.length ? DB.cats[0].id : null;
    save();
    if (S.sheet === 'category') openSheet('cats', {}); else render();
    toast(used ? 'Category removed — its entries are now untagged' : 'Category removed');
  },
  removeCard(p) {
    if (!confirmTwice('card' + p, 'Tap Remove again to delete this card')) return;
    DB.cards = DB.cards.filter(c => c.id !== p);
    S.cardIndex = 0; save();
    if (S.sheet === 'card') openSheet('cards', {}); else render();
    toast('Card removed');
  },
  removeAccount(p) {
    if (!confirmTwice('acct' + p, 'Tap Remove again to delete this account')) return;
    DB.accounts = DB.accounts.filter(a => a.id !== p);
    save(); closeSheet(); toast('Account removed');
  },
  removeTxn(p) {
    if (!confirmTwice('txn' + p, 'Tap Delete again to remove this entry')) return;
    removeTxnById(p); closeSheet(); toast('Entry deleted');
  },

  /* cards screen */
  payCard(p) {
    const c = cardById(p); if (!c) return;
    const st = cardStats(c);
    const amt = st.billed > 0 ? st.billed : st.outstanding;
    openSheet('move', { amt: amt ? String(Math.round(amt)) : '', src: defaultSource(false), to: p });
  },
  nudge(p) {
    const c = cardById(p); if (!c) return;
    const st = cardStats(c);
    toast('Statement lands ' + st.next.getDate() + ' ' + MONTHS[st.next.getMonth()] + ' — ' + st.daysToStatement + ' days');
  },

  /* shared */
  settle(p) {
    const b = DB.bills.find(x => x.id === p); if (!b) return;
    b.settled = !b.settled;
    b.settledAt = b.settled ? Date.now() : null;
    save(); render();
    toast(b.settled ? b.title + ' — squared up' : b.title + ' reopened');
  },
  toggleWith(p) {
    const w = S.form.with || [];
    const i = w.indexOf(p);
    if (i > -1) w.splice(i, 1); else w.push(p);
    S.form.with = w;
    if (S.form.payer !== 'you' && w.indexOf(S.form.payer) < 0) S.form.payer = 'you';
    render();
  },
  addPerson() { S.form.addingPerson = true; render(); },
  confirmPerson() {
    const n = (S.form.newPerson || '').trim();
    if (!n) { S.form.addingPerson = false; render(); return; }
    const id = uid('p');
    DB.people.push({ id: id, name: n });
    S.form.with = (S.form.with || []).concat([id]);
    S.form.addingPerson = false; S.form.newPerson = '';
    save(); render();
  },
  newGroup() { S.form.addingGroup = true; render(); },
  confirmGroup() {
    const n = (S.form.newGroupName || '').trim();
    if (!n) { S.form.addingGroup = false; render(); return; }
    const id = uid('gr');
    DB.groups.push({ id: id, label: n });
    S.form.group = id; S.form.addingGroup = false; S.form.newGroupName = '';
    save(); render();
  },
  weight(p) {
    const i = p.lastIndexOf(':');
    const id = p.slice(0, i), d = +p.slice(i + 1);
    const members = ['you'].concat(S.form.with || []);
    const w = S.form.weights || {};
    members.forEach(m => { if (w[m] == null) w[m] = Math.round(100 / members.length); });
    w[id] = Math.max(0, Math.min(100, w[id] + d));
    S.form.weights = w;
    render();
  },

  /* interest */
  rate(p) {
    const i = p.lastIndexOf(':');
    const a = acctById(p.slice(0, i)); if (!a) return;
    crystallize(a);
    a.rate = Math.max(0, Math.min(15, Math.round(((+a.rate || 0) + (+p.slice(i + 1)) * 0.1) * 10) / 10));
    save(); render();
  },
  freq(p) {
    const i = p.lastIndexOf(':');
    const a = acctById(p.slice(0, i)); if (!a) return;
    crystallize(a);
    a.freq = p.slice(i + 1);
    save(); render();
  },
  dayStep(p) {
    const prev = +S.form.day || 1;
    S.form.day = Math.min(31, Math.max(1, prev + (+p)));
    if (!S.form.editId || +S.form.due === defaultDueDay(prev)) S.form.due = defaultDueDay(S.form.day);
    render();
  },
  dueStep(p) { S.form.due = Math.min(31, Math.max(1, (+S.form.due || defaultDueDay(+S.form.day || 1)) + (+p))); render(); },
  ngCap(p) { S.form.cap = Math.max(0, (+S.form.cap || 0) + (+p) * 1000); render(); },
  ngKind() { S.form.kind = S.form.kind === 'investment' ? 'expense' : 'investment'; render(); },

  /* accounts */
  recount(p) { S.detailId = p; S.stmtMonth = null; openSheet('detail', {}); },
  applyRecount(p) {
    const a = acctById(p); if (!a) return;
    const target = parseFloat(S.form.recount || '');
    if (isNaN(target)) { toast('Type the amount you actually counted'); return; }
    crystallize(a);
    const diff = Math.round((target - accBalance(a)) * 100) / 100;
    if (Math.abs(diff) >= 0.5) {
      addTxn(diff > 0
        ? { dir: 'in', amount: Math.abs(diff), src: a.id, tag: 'Adjustment', note: 'Reconciled by hand' }
        : { dir: 'out', amount: Math.abs(diff), src: a.id, catId: null, note: 'Reconciled by hand' });
    }
    a.lastCounted = Date.now();
    save(); closeSheet();
    toast(Math.abs(diff) < 0.5 ? a.name + ' was already right' : a.name + ' reconciled by ' + fmt(Math.abs(diff)));
  },

  /* insights */
  dismiss(p) { DB.ui.dismissed[p] = true; save(); render(); },

  setTheme(p) {
    DB.settings.theme = p;
    applyTheme(); save(); render();
    toast(p === 'system' ? 'Following your device' : p === 'light' ? 'Light ground' : 'Dark ground');
  },

  /* data */
  toggleAuto() {
    DB.settings.autoBackup = !DB.settings.autoBackup;
    if (DB.settings.autoBackup) { save(); toast('Saving to this browser again'); }
    else { try { localStorage.removeItem(KEY); } catch (e) { } toast('Paused — changes stay in this tab only'); }
    render();
  },
  exportJson() { openSheet('export', { kind: 'json' }); },
  exportCsv() { openSheet('export', { kind: 'csv' }); },
  copyExport() {
    const box = document.getElementById('exportBox');
    if (!box) return;
    box.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { }
    if (!ok && navigator.clipboard) { navigator.clipboard.writeText(box.value).then(() => toast('Copied')).catch(() => toast('Select the text and copy it by hand')); return; }
    toast(ok ? 'Copied' : 'Select the text and copy it by hand');
  },
  doRestore() {
    const raw = (S.form.paste || '').trim();
    if (!raw) { toast('Paste a Kosh export, or pick the file'); return; }
    try {
      const p = JSON.parse(raw);
      if (!p || p.v !== 1) throw new Error('not kosh');
      DB = Object.assign(blankDB(), p);
      DB.ui = DB.ui || {}; DB.ui.dismissed = DB.ui.dismissed || {};
      crystallizeAll(); applyTheme(); save(); closeSheet(); S.screen = 'home';
      S.editCat = DB.cats.length ? DB.cats[0].id : null;
      document.getElementById('scroll').scrollTop = 0;
      render();
      toast('Restored ' + DB.txns.length + ' entries');
    } catch (e) { toast('That is not a Kosh export — check the file'); }
  },
  loadDemo() {
    if (DB.txns.length && !confirmTwice('demo', 'Tap again — this replaces what is here')) return;
    const th = DB.settings.theme;
    DB = demoData(); DB.settings.theme = th;
    save(); S.screen = 'home'; S.editCat = 'food'; S.month = ymOf(Date.now());
    closeSheet();
    document.getElementById('scroll').scrollTop = 0;
    render();
    toast('Sample month loaded — erase it any time in Settings');
  },
  eraseAll() {
    if (!confirmTwice('erase', 'Tap Erase again — this cannot be undone')) return;
    const th = DB.settings.theme;
    DB = blankDB(); DB.settings.theme = th;
    save(); S.screen = 'home'; S.sheet = null; S.form = {};
    S.editCat = DB.cats[0].id;
    document.getElementById('scroll').scrollTop = 0;
    render();
    toast('Ledger erased');
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   Sample month — Aarav's ledger from the spec board, dated into this month
   ══════════════════════════════════════════════════════════════════════════ */
function demoData() {
  const d = blankDB();
  const now = new Date();
  const day = n => {                                  /* nth of this month, clamped to today */
    const t = new Date(now.getFullYear(), now.getMonth(), Math.min(n, now.getDate()), 10 + (n % 8), (n * 7) % 60);
    return t.getTime();
  };
  const acc = (id, name, glyph, type, opening, rate, freq) => ({
    id, name, glyph, type, group: TGRP[type], opening, rate, freq,
    accBase: 0, accAnchor: Date.now(), createdAt: now.getTime() - 86400000 * 120, lastCounted: now.getTime() - 86400000 * (type === 'Cash' ? 6 : 2)
  });
  d.accounts = [
    acc('hdfc', 'HDFC Savings', 'HD', 'Savings', 486200, 3.5, 'Daily'),
    acc('icici', 'ICICI Salary', 'IC', 'Checking', 87340, 2.7, 'Daily'),
    acc('kotak', 'Kotak 811', 'KO', 'Savings', 112450, 4.0, 'Quarterly'),
    acc('sbifd', 'SBI Fixed Deposit', 'FD', 'Deposit', 300000, 7.1, 'Quarterly'),
    acc('groww', 'Groww Mutual Funds', 'MF', 'Investment', 642880, 0, 'Monthly'),
    acc('cash', 'Cash Wallet', '₹', 'Cash', 4150, 0, 'Monthly')
  ];
  d.cards = [
    { id: 'axis', name: 'Axis Magnus', last4: '4102', limit: 500000, openingDue: 0, statementDay: 17, dueDay: 6, createdAt: now.getTime() - 86400000 * 300 },
    { id: 'infinia', name: 'HDFC Infinia', last4: '7731', limit: 800000, openingDue: 0, statementDay: 24, dueDay: 13, createdAt: now.getTime() - 86400000 * 300 },
    { id: 'amex', name: 'Amex Platinum', last4: '2005', limit: 200000, openingDue: 0, statementDay: 10, dueDay: 28, createdAt: now.getTime() - 86400000 * 300 }
  ];
  d.people = [{ id: 'you', name: 'You' }, { id: 'riya', name: 'Riya' }, { id: 'dev', name: 'Dev' }];
  d.groups = [{ id: 'flat', label: 'Flat 402' }, { id: 'goa', label: "Goa '26" }];

  const back = (m, n) => new Date(now.getFullYear(), now.getMonth() - m, n, 11, (n * 5) % 60).getTime();
  const prev = n => back(1, n);
  const prev2 = n => back(2, n);

  /* two months back — the quietest of the three */
  const PREV2 = [
    ['in', 184000, 'icici', null, 'Salary', 1, 'Salary'],
    ['out', 42000, 'hdfc', 'rent', null, 2, 'Rent'],
    ['out', 2400, 'hdfc', 'rent', null, 4, 'Electricity'],
    ['out', 3500, 'axis', 'food', null, 3, 'Groceries'],
    ['out', 2200, 'axis', 'food', null, 7, 'Swiggy'],
    ['out', 4100, 'infinia', 'food', null, 14, 'Dinner out'],
    ['out', 1900, 'cash', 'food', null, 21, 'Street food'],
    ['out', 4200, 'axis', 'txp', null, 9, 'Fuel'],
    ['out', 900, 'cash', 'txp', null, 15, 'Autos'],
    ['out', 3120, 'infinia', 'subs', null, 6, 'Subscriptions'],
    ['out', 6800, 'axis', 'shop', null, 20, 'Winter jacket'],
    ['out', 1200, 'cash', 'hlth', null, 22, 'Pharmacy'],
    ['out', 1800, 'amex', 'txp', null, 12, 'Airport lounge top-up'],
    ['transfer', 25000, 'hdfc', null, null, 2, null, 'groww']
  ];
  for (const r of PREV2) {
    const t = { id: uid('t'), ts: prev2(r[5]), dir: r[0], amount: r[1], src: r[2], catId: r[3], tag: r[4] };
    if (r[6]) t.note = r[6];
    if (r[7]) t.to = r[7];
    d.txns.push(t);
  }

  const PREV = [
    ['in', 184000, 'icici', null, 'Salary', 1, 'Salary — last month'],
    ['out', 42000, 'hdfc', 'rent', null, 2, 'Rent'],
    ['out', 12800, 'axis', 'food', null, 8, 'Groceries and eating out'],
    ['out', 44000, 'infinia', 'shop', null, 10, 'Laptop'],
    ['out', 20220, 'infinia', 'shop', null, 14, 'Monitor and desk'],
    ['out', 5400, 'axis', 'txp', null, 12, 'Fuel and cabs'],
    ['out', 3120, 'infinia', 'subs', null, 6, 'Subscriptions'],
    ['out', 5400, 'infinia', 'hlth', null, 18, 'Pharmacy'],
    ['transfer', 25000, 'hdfc', null, null, 2, null, 'groww']
  ];
  for (const r of PREV) {
    const t = { id: uid('t'), ts: prev(r[5]), dir: r[0], amount: r[1], src: r[2], catId: r[3], tag: r[4] };
    if (r[6]) t.note = r[6];
    if (r[7]) t.to = r[7];
    d.txns.push(t);
  }

  const T = [
    ['in', 184000, 'icici', null, 'Salary', 1, 'Salary — this month'],
    ['out', 42000, 'hdfc', 'rent', null, 2, 'Rent'],
    ['out', 2600, 'hdfc', 'rent', null, 3, 'Electricity'],
    ['out', 2100, 'axis', 'food', null, 2, 'Blue Tokai'],
    ['out', 1240, 'axis', 'food', null, 3, 'Dinner — Toit'],
    ['out', 890, 'axis', 'food', null, 4, 'Swiggy'],
    ['out', 3200, 'axis', 'food', null, 5, 'Groceries'],
    ['out', 640, 'cash', 'food', null, 6, 'Filter coffee'],
    ['out', 4100, 'infinia', 'food', null, 7, 'Birthday dinner'],
    ['out', 1150, 'axis', 'food', null, 8, 'Swiggy'],
    ['out', 1700, 'axis', 'food', null, 8, 'Bakery run'],
    ['out', 7400, 'axis', 'shop', null, 4, 'Running shoes'],
    ['out', 2960, 'infinia', 'shop', null, 6, 'Bookshop'],
    ['out', 1600, 'axis', 'shop', null, 8, 'Kitchen odds'],
    ['out', 2400, 'axis', 'txp', null, 2, 'Fuel'],
    ['out', 1180, 'cash', 'txp', null, 3, 'Autos'],
    ['out', 760, 'cash', 'txp', null, 5, 'Namma Metro'],
    ['out', 1840, 'axis', 'txp', null, 7, 'Airport cab'],
    ['out', 4260, 'infinia', 'hlth', null, 5, 'Dentist'],
    ['out', 1850, 'infinia', 'subs', null, 3, 'Notion'],
    ['out', 199, 'infinia', 'subs', null, 4, 'Spotify Family'],
    ['out', 749, 'infinia', 'subs', null, 6, 'iCloud 2TB'],
    ['out', 442, 'amex', 'subs', null, 7, 'Newsletter'],
    ['transfer', 25000, 'hdfc', null, null, 2, null, 'groww'],
    ['transfer', 20000, 'icici', null, null, 2, null, 'hdfc']
  ];
  for (const r of T) {
    const t = { id: uid('t'), ts: day(r[5]), dir: r[0], amount: r[1], src: r[2], catId: r[3], tag: r[4] };
    if (r[6]) t.note = r[6];
    if (r[7]) t.to = r[7];
    d.txns.push(t);
  }
  d.txns.sort((a, b) => a.ts - b.ts);

  /* Settle every closed cycle but the most recent one, so the sample shows a
     real history: paid statements behind, one bill due, one cycle still open. */
  (function () {
    const keep = DB;
    DB = d;
    try {
      for (const c of d.cards) {
        const closed = cardCycles(c).cycles.filter(x => !x.open);
        closed.slice(0, -1).forEach(cy => {
          if (cy.charged <= 0) return;
          d.txns.push({
            id: uid('t'),
            ts: Math.min(cy.due.getTime() - 86400000 * 2, now.getTime() - 86400000),
            dir: 'transfer', amount: cy.charged, src: 'hdfc', to: c.id, note: 'Card payment'
          });
        });
      }
    } finally { DB = keep; }
  })();
  d.txns.sort((a, b) => a.ts - b.ts);

  const bill = (id, title, total, grp, payer, shares, ago, settled) => ({
    id, title, total, groupId: grp, payerId: payer,
    ts: now.getTime() - 86400000 * ago,
    shares: shares, settled: !!settled, settledAt: settled ? now.getTime() - 86400000 * (ago - 2) : null
  });
  d.bills = [
    bill('e1', 'Electricity — last month', 3540, 'flat', 'you', [{ pid: 'you', pct: 30 }, { pid: 'riya', pct: 40 }, { pid: 'dev', pct: 30 }], 3),
    bill('e2', 'Maid + gas cylinder', 2300, 'flat', 'riya', [{ pid: 'you', pct: 34 }, { pid: 'riya', pct: 33 }, { pid: 'dev', pct: 33 }], 5),
    bill('e3', 'Airport cab', 1770, 'goa', 'dev', [{ pid: 'you', pct: 34 }, { pid: 'riya', pct: 33 }, { pid: 'dev', pct: 33 }], 8),
    bill('e4', 'Sunday brunch', 2860, 'flat', 'you', [{ pid: 'you', pct: 50 }, { pid: 'riya', pct: 50 }], 9),
    bill('e5', 'Broadband — last month', 1180, 'flat', 'you', [{ pid: 'you', pct: 34 }, { pid: 'riya', pct: 33 }, { pid: 'dev', pct: 33 }], 12, true)
  ];
  return d;
}

/* ══════════════════════════════════════════════════════════════════════════
   Render loop & wiring
   ══════════════════════════════════════════════════════════════════════════ */
function render() {
  const scroller = document.getElementById('scroll');
  const keep = scroller.scrollTop;
  document.getElementById('screen').innerHTML = (SCREENS[S.screen] || screenHome)();
  document.getElementById('tabwrap').innerHTML = renderTabs();
  document.getElementById('sheets').innerHTML = renderSheets();
  scroller.scrollTop = keep;
  S._anim = false;
}

/* live validity for sheets with text inputs — no re-render, so focus survives */
function syncSheet() {
  const sheet = document.querySelector('.sheet');
  if (!sheet) return;
  const btn = sheet.querySelector('.btn-primary:last-of-type') || sheet.querySelector('.sheet-body > .btn-primary');
  const f = S.form;
  let ok = true;
  if (S.sheet === 'bill') {
    const total = parseFloat(f.total || '0') || 0;
    ok = total > 0 && !!(f.title || '').trim() && (f.with || []).length > 0;
    const prev = document.getElementById('billPreview');
    if (prev) {
      const members = ['you'].concat(f.with || []);
      const shares = billPreviewShares(members);
      prev.textContent = shares.length ? shares.map(s => personName(s.pid).toLowerCase() + ' ' + fmt(Math.round(total * s.pct / 100))).join(' · ') : 'pick who it splits with';
    }
  } else if (S.sheet === 'account') ok = !!(f.name || '').trim();
  else if (S.sheet === 'card') ok = !!(f.name || '').trim() && (parseFloat(f.limit || '0') || 0) > 0;
  else if (S.sheet === 'category') ok = !!(f.name || '').trim();
  else return;
  const all = sheet.querySelectorAll('.btn-primary');
  const target = all[all.length - 1];
  if (target) target.disabled = !ok;
}

document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-a]');
  if (!el) return;
  const fn = ACTIONS[el.getAttribute('data-a')];
  if (!fn) return;
  ev.preventDefault();
  fn(el.getAttribute('data-p'));
});
document.addEventListener('input', ev => {
  const el = ev.target.closest('[data-f]');
  if (!el) return;
  S.form[el.getAttribute('data-f')] = el.value;
  syncSheet();
});
document.addEventListener('change', ev => {
  if (ev.target.id !== 'restoreFile') return;
  const file = ev.target.files && ev.target.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = () => { S.form.paste = String(r.result); ACTIONS.doRestore(); };
  r.readAsText(file);
});
document.addEventListener('keydown', ev => {
  if (ev.key === 'Escape' && S.sheet) { closeSheet(); return; }
  if (!S.sheet || (S.sheet !== 'log' && S.sheet !== 'move')) return;
  if (ev.target && /INPUT|TEXTAREA/.test(ev.target.tagName)) return;
  if (/^[0-9]$/.test(ev.key)) { ACTIONS.key(ev.key); ev.preventDefault(); }
  else if (ev.key === '.') { ACTIONS.key('.'); ev.preventDefault(); }
  else if (ev.key === 'Backspace') { ACTIONS.key('del'); ev.preventDefault(); }
  else if (ev.key === 'Enter') { (S.sheet === 'log' ? ACTIONS.saveLog : ACTIONS.saveMove)(); ev.preventDefault(); }
});

function tickClock() {
  const c = document.getElementById('clock');
  if (c) c.textContent = new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: false });
}
setInterval(() => {
  tickClock();
  const live = document.getElementById('liveAccrued');
  if (live) live.textContent = '₹' + liveAccrued().toFixed(2);
}, 1000);

load();
applyTheme();
S.editCat = DB.cats.length ? DB.cats[0].id : null;
tickClock();
render();

/* ── PWA: cache the shell so the ledger opens with no network ─────────── */
if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () { /* offline-first is a bonus, not a requirement */ });
  });
}
