// Workshop cohort facts — single source of truth (ISS-007 follow-up).
//
// 換梯 SOP：改這個檔（新增 cohort、把舊的 status 改掉、更新 PRICING_DEFAULTS），
// 然後 grep 檢查散文段（行銷文案不吃這個檔，要手動改寫）：
//   grep -rn "第四班\|10/24" src/pages src/content/blog
//
// Runtime pricing/名額的 SoT 是後端 /api/workshop/availability；
// 這裡的 PRICING_DEFAULTS 只是頁面載入前的顯示預設值（避免閃爍）。

export interface Cohort {
  seq: number;
  /** 班次名，如「第四班」 */
  name: string;
  city: string;
  /** 顯示用短日期，如「10/24」 */
  dateShort: string;
  /** 完整日期（含星期），只有需要顯示的梯次才填 */
  dateFull?: string;
  /** 星期字，如「六」 */
  weekday?: string;
  status: 'open' | 'full' | 'past';
  capacity: number;
  /** Bookings API 的 session id — 只有走過 Stripe 金流的梯次才有 */
  sessionId?: string;
  /** 開課紀錄 blog 連結（有發布才填） */
  recordUrl?: string;
}

export const COHORTS: Cohort[] = [
  {
    seq: 1,
    name: '第一班',
    city: '台北',
    dateShort: '5/16',
    status: 'past',
    capacity: 12,
    recordUrl: '/zh-TW/blog/flux-direction-system-leverage/',
  },
  {
    seq: 2,
    name: '第二班',
    city: '台中',
    dateShort: '6/7',
    status: 'past',
    capacity: 12,
  },
  {
    seq: 3,
    name: '第三班',
    city: '台北',
    dateShort: '8/22',
    status: 'full',
    capacity: 12,
    sessionId: 'workshop-2026-08-22',
  },
  {
    seq: 4,
    name: '第四班',
    city: '台北',
    dateShort: '10/24',
    dateFull: '2026/10/24（六）',
    weekday: '六',
    status: 'open',
    capacity: 12,
    sessionId: 'workshop-2026-10-24',
  },
];

/** 當前招生梯次（沒有 open 時退回最後一梯，避免頁面炸掉） */
export const CURRENT_COHORT: Cohort =
  COHORTS.find((c) => c.status === 'open') ?? COHORTS[COHORTS.length - 1];

/** 顯示預設值；載入後由 /availability 覆蓋 */
export const PRICING_DEFAULTS = {
  isEarlyBird: true,
  priceRegular: 9800,
  priceSingle: 8800,
  priceDuo: 8000,
  earlyBirdEnd: '2026-09-24',
  /** 顯示用，如「9/24」 */
  earlyBirdEndLabel: '9/24',
};

export function formatTWD(n: number): string {
  return 'NT$' + n.toLocaleString('en-US');
}

const STATUS_LABEL: Record<Cohort['status'], string> = {
  open: '招生中',
  full: '已滿',
  past: '已結束',
};

/** Admin bookings 下拉選單 — 只列有金流資料的梯次，新的在前 */
export function adminSessions(): { id: string; label: string }[] {
  return COHORTS.filter((c) => c.sessionId)
    .sort((a, b) => b.seq - a.seq)
    .map((c) => ({
      id: c.sessionId!,
      label: `${c.dateShort} ${c.city} · ${c.name}（${STATUS_LABEL[c.status]}）`,
    }));
}
