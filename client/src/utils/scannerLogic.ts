/**
 * TrustNet scanner — pure front-end heuristic detection (DEMO only).
 *
 * This is intentionally client-side and illustrative. A production system would
 * call a backend that checks threat-intel feeds, WHOIS age, certificate data,
 * and ML models. The signals here are heuristics that approximate real checks.
 */

export type ScannerMode = 'url' | 'sms' | 'news';
export type RiskLevel = 'safe' | 'caution' | 'danger';

export interface ScannerSignal {
  /** Translation key resolved by the component (e.g. "signal.recentDomain"). */
  key: string;
  weight: number; // contribution to the risk score
}

export interface ScanResult {
  score: number; // 0 (safest) .. 100 (riskiest)
  level: RiskLevel;
  signals: ScannerSignal[];
}

interface RawRule {
  key: string;
  weight: number;
  test: (input: string, lower: string) => boolean;
}

/* ---------- URL / website rules ---------- */

const URL_RULES: RawRule[] = [
  // Raw IP used as host — common in phishing.
  {
    key: 'url.rawIp',
    weight: 30,
    test: (_s, lower) =>
      /https?:\/\/(\d{1,3}\.){3}\d{1,3}/.test(lower) || /^(\d{1,3}\.){3}\d{1,3}/.test(lower),
  },
  // Brand name padded with suspicious separators ("sbi-secure-portal", "paytm-reward").
  {
    key: 'url.lookalike',
    weight: 26,
    test: (_s, lower) =>
      /\b(sbi|paytm|phonepe|gpay|googlepay|hdfc|icici|axis|kotak|amazon|flipkart|airtel|jio|irctc| GST|income-?tax|incometax|uidai|aadhaar|pancard)[\w.-]*[\-_.][\w.-]+/.test(lower),
  },
  // Many hyphens in the domain ("verify-account-login-secure").
  {
    key: 'url.manyHyphens',
    weight: 18,
    test: (s) => {
      const host = s.split('/')[0];
      return (host.match(/-/g)?.length ?? 0) >= 2;
    },
  },
  // High-abuse TLDs frequently used in fraud.
  {
    key: 'url.riskyTld',
    weight: 20,
    test: (_s, lower) => /\.(tk|ml|ga|cf|gq|top|xyz|click|zip|mov|country|support)\b/i.test(lower),
  },
  // URL shortener — obscures the real destination.
  {
    key: 'url.shortener',
    weight: 14,
    test: (_s, lower) =>
      /\b(bit\.ly|tinyurl\.com|t\.co|cutt\.ly|goo\.gl|is\.gd|shorte\.st|rb\.gy)\//.test(lower),
  },
  // Login/credential bait in the path.
  {
    key: 'url.credBait',
    weight: 16,
    test: (_s, lower) => /(login|signin|verify|update|secure|account|wallet|kyc|reset)[\w/.-]*$/.test(lower)
      && /(password|otp|pin|login|account|verify|kyc)/.test(lower),
  },
];

/* ---------- SMS / message rules ---------- */

const SMS_RULES: RawRule[] = [
  { key: 'sms.kycBlock', weight: 32, test: (_s, lower) => /kyc.{0,12}(block|suspend|expire|disconn|deactivate)/.test(lower) || /(sim|number).{0,12}(block|disconn)/.test(lower) },
  { key: 'sms.lottery', weight: 28, test: (_s, lower) => /(lottery|winner|won|congratulations|prize|lucky draw|crore|lakh.{0,8}prize)/.test(lower) },
  { key: 'sms.delivery', weight: 22, test: (_s, lower) => /(parcel|package|delivery).{0,20}(fee|charges|customs|hold)/.test(lower) || /(cod|courier).{0,12}(pay|rs\.?|rupees)/.test(lower) },
  { key: 'sms.upiAsk', weight: 24, test: (_s, lower) => /upi[a-z0-9 .@-]{0,40}(scan|send|enter|update|pin)/.test(lower) || /\b\bhaskarupi|okhdfcbank|okaxis|oksbi\b/i.test(lower) && /send|pay|scan/.test(lower) },
  { key: 'sms.linkClick', weight: 20, test: (_s, lower) => /(click|visit|tap).{0,20}(link|below|http)/.test(lower) || /https?:\/\//.test(lower) },
  { key: 'sms.urgency', weight: 16, test: (_s, lower) => /(immediately|urgent|24 hours|last chance|final|expires today|act now|गंभीर|तुरंत|अंतिम)/.test(lower) },
  { key: 'sms.otpAsk', weight: 30, test: (_s, lower) => /(otp|one time password|pin|cvv|password).{0,24}(share|send|forward|reply)/.test(lower) || /never share/i.test(lower) === false && /\b\d{4,8}\b/.test(lower) && /otp|pin/.test(lower) },
];

/* ---------- News / claim rules ---------- */

// Illustrative list of patterns resembling viral fakes (NOT real claims about any real entity).
const KNOWN_FAKE_PATTERNS = [
  'government free',
  'free recharge',
  'pm modi free',
  'gold coin free',
  '11 days challenge',
  'forwarded as received',
  'do not delete',
  'whatsapp banned',
  'this message must',
];

const NEWS_RULES: RawRule[] = [
  { key: 'news.knownFake', weight: 30, test: (_s, lower) => KNOWN_FAKE_PATTERNS.some((p) => lower.includes(p)) },
  { key: 'news.sensational', weight: 20, test: (_s, lower) => /(shocking|you wont believe|breaking.{0,6}!|exposed|viral|must watch|जरूर देखें|चौंकाने वाला)/.test(lower) },
  { key: 'news.allCaps', weight: 12, test: (s) => { const letters = s.replace(/[^A-Za-z]/g, ''); return letters.length > 12 && s.replace(/[^A-Z]/g, '').length / letters.length > 0.5; } },
  { key: 'news.noSource', weight: 14, test: (_s, lower) => /(according to.{0,30}(sources|whatsapp|forward)|please share)/.test(lower) },
  { key: 'news.urgentShare', weight: 16, test: (_s, lower) => /(share.{0,20}(everyone|all groups|maximum)|forward.{0,15}(all|maximum)|share before)/.test(lower) },
];

const RULES: Record<ScannerMode, RawRule[]> = {
  url: URL_RULES,
  sms: SMS_RULES,
  news: NEWS_RULES,
};

function classify(score: number): RiskLevel {
  if (score >= 45) return 'danger';
  if (score >= 20) return 'caution';
  return 'safe';
}

/**
 * Analyse an input string against the rules for the given mode.
 */
export function analyze(input: string, mode: ScannerMode): ScanResult {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  if (!trimmed) {
    return { score: 0, level: 'safe', signals: [] };
  }

  const rules = RULES[mode];
  const matched = rules.filter((r) => r.test(trimmed, lower));
  const raw = matched.reduce((sum, r) => sum + r.weight, 0);

  // Compress so a couple of weak signals don't overstate risk,
  // but a single strong signal can still reach 'danger'.
  const score = Math.min(100, Math.round(raw * 1.15));

  return {
    score,
    level: classify(score),
    signals: matched.map((r) => ({ key: r.key, weight: r.weight })),
  };
}

/* ---------- Sample inputs shown as quick-try chips ---------- */
export const SAMPLE_INPUTS: Record<ScannerMode, { label: string; value: string }[]> = {
  url: [
    { label: 'Fake banking portal', value: 'https://sbi-secure-portal-update.in/login' },
    { label: 'Raw IP host', value: 'http://192.168.0.5/verify-account' },
    { label: 'Shortened link', value: 'https://bit.ly/3xY-winn3r' },
    { label: 'Looks legit', value: 'https://www.onlinesbi.com' },
  ],
  sms: [
    { label: 'KYC threat', value: 'Dear customer, your SIM/KYC will be blocked in 24 hours. Click http://bit.ly/kyc-update to continue.' },
    { label: 'Lottery scam', value: 'Congratulations! You have won Rs 25 lakh in the KBC lucky draw. Reply with your OTP to claim your prize.' },
    { label: 'Delivery fee', value: 'Your parcel is held at customs. Pay Rs 25 COD charges now: http://courier-pay.top' },
    { label: 'Bank alert', value: 'Rs 5000 debited from your account on 08-Jul. Not you? Call 1800XXXXXXX.' },
  ],
  news: [
    { label: 'Forwarded as received', value: 'FORWARDED AS RECEIVED: Government giving free recharge to all citizens. Share to maximum groups before 12 midnight!' },
    { label: 'Sensational', value: 'SHOCKING! You wont believe what happened. Must watch and share with everyone immediately.' },
    { label: 'Verified tone', value: 'RBI releases quarterly monetary policy statement; repo rate held steady.' },
  ],
};
