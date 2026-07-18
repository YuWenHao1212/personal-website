// Testimonial wall data — services page (and future pages) render this list.
// To add a testimonial: append an entry; the masonry wall auto-flows, no layout work needed.
// Array order = display order (top-down per column). Spread `variant: 'profile'` cards apart
// so photo-heavy cards don't stack in one column.
//
// Consent ledger (who approved what, when) lives in FLUX Vault:
// efforts/areas/personal-brand/services-page-rewrite-2026-07.md

export interface Testimonial {
  /** Quote text WITHOUT 「」 brackets — the template adds them. */
  quote: string;
  name: string;
  /** Short role shown after name in compact cards, e.g. 零售業主管 */
  title: string;
  /** 'profile' = photo header card (org + subtitle on top); 'compact' = quote-first card */
  variant: 'profile' | 'compact';
  /** profile cards: top line, e.g. 卡佶特品牌策略有限公司 */
  org?: string;
  /** profile cards: appended after org, outside the link, e.g. 執行長 */
  orgSuffix?: string;
  orgUrl?: string;
  /** profile cards: second line, e.g. 品牌總監 林鼎倫 */
  subtitle?: string;
  /** avatar image path under /public; optional for compact cards */
  avatar?: string;
  /** crop from top instead of center (portrait photos with face near top) */
  avatarTop?: boolean;
  /** optional 延伸閱讀 links (profile cards) */
  links?: { label: string; href: string }[];
}

export const testimonials: Testimonial[] = [
  {
    variant: 'profile',
    name: '劉子維',
    title: '臨床心理師',
    org: '暖流人心規劃顧問',
    orgSuffix: '執行長',
    orgUrl: 'https://warmflowpsy.tw/',
    subtitle: '暖陽身心診所 心理科主任 劉子維 臨床心理師',
    avatar: '/images/workshop/jack-liu.jpg',
    avatarTop: true,
    quote:
      '我是臨床心理師，聽到『你也可以用 Claude Code 建自己的工作流系統』的時候，心裡想你在開我玩笑吧？結果在余老師手把手的引導下，我從覺得『這種東西我不可能學得會』，到現在用一成的時間完成拖了大半年的雜事，剩下九成拿來思考品牌和產品。用 AI 打造自己的工作流，才是真正的改變。',
    links: [
      {
        label: '子維的視角：〈臨床心理師學會用 Claude Code 的那一天〉',
        href: 'https://warmflowpsy.tw/psychologist-learns-vscode/',
      },
      {
        label: '我的視角：〈我教一個 48 歲的心理師用 Claude Code〉',
        href: '/zh-TW/blog/teaching-48yo-psychologist-claude-code/',
      },
    ],
  },
  {
    variant: 'compact',
    name: '陳芊名',
    title: '新娘造型師',
    quote:
      '這套系統提升了我的工作效率，也幫我把 IG 流量做起來，多了好多新客戶 — 太實用了，每天都好快樂！',
  },
  {
    // Composite quote (written testimonial + 2026-07-18 LINE chat 秘書/工讀生 line) —
    // final text pending Yiling's confirmation; her personal site must NEVER be linked.
    variant: 'compact',
    name: '蔡懿玲',
    title: '大學助理教授',
    quote:
      '以前我也用行事曆、也列待辦清單，還是總在趕死線、焦慮事情做不完。現在我是有私人秘書的總裁級人物 — 行程、資料、報告、郵件草稿都交給它，我只專注眼前這一件。差別就在課堂上教的 FLUX 架構：有了架構，Claude Code 才會是你的秘書；少了架構，它只是個會做比較多步驟的工讀生。常被死線追著跑、被資訊轟炸的人 — 直接報名吧。',
  },
  {
    variant: 'compact',
    name: '劉得群',
    title: '零售業主管',
    avatar: '/images/workshop/liu-dequn.jpg',
    quote:
      '上課之前，我對專案管理幾乎是一片空白，不知道該從哪裡開始。課程結束後，我學會運用工具梳理專案架構，讓原本混亂的資訊變得清楚有條理，資料整合也有了非常明顯的進步。',
  },
  {
    // Employer (聯發科技) intentionally NOT shown — signature uses industry-level title only.
    variant: 'compact',
    name: '林虹君',
    title: 'IC 設計業 PM 主管',
    quote:
      '這堂課幫我快速建立一套透過 AI 達成目標的導航系統 — 完整的架構加上老師細心的教學，讓 AI 從聊天變成生活與任務的助理。很適合不知道怎麼開始善用 AI 的人。',
  },
  {
    variant: 'profile',
    name: '林鼎倫',
    title: '品牌總監',
    org: '卡佶特品牌策略有限公司',
    subtitle: '品牌總監 林鼎倫',
    avatar: '/images/workshop/lin-dinglun.png',
    quote:
      '做品牌策略，手上永遠同時跑好幾個專案，以前進度散在不同工具裡，靠自己搬來搬去，常常漏掉東西。我用過 ChatGPT，但它就是另一個聊天視窗，問完還是要自己動手。Claude Code 完全不同 — 它直接讀我電腦裡的檔案，跟我討論策略、規劃排程，然後直接幫我執行。它不只是我的策略夥伴，也是我的執行秘書，我終於不用一個人扛所有事。這才是 AI 該有的樣子。',
  },
];
