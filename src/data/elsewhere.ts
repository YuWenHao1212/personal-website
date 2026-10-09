// Articles the author wrote on OTHER sites that the personal homepage lists under "最新文章".
// Manual list on purpose: a stale entry is harmless, a build that depends on another site is not.
//
// Rules (author, 2026-10-06):
// - List title + link only. The article itself stays on the other site — never copy the body here.
// - At most 2 of these appear on the homepage at a time; the personal site's own posts stay the majority.
// - Only list pages that are public AND indexable on the other site (skip anything still noindex).
// - When a Confluence insight is published, add it here by hand.

export interface ElsewhereArticle {
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  url: string;
  /** shown as the small label on the homepage row */
  where: string;
}

export const elsewhere: ElsewhereArticle[] = [
  {
    title: '企業 AI 導入的投資報酬怎麼評估：買到什麼、變成利潤的四條途徑、這筆投資怎麼看',
    description:
      '投資 AI，買到的是生產力，不是利潤。生產力要變成利潤，有四條途徑。利潤來自三個地方：節流、開源、守住。評估這筆投資，要看四件事：花多少、跟什麼比、怎麼知道有沒有效、等多久。',
    date: '2026-10-05',
    url: 'https://confluence-partners.ai/insights/ai-investment-return/',
    where: '寫在匯流顧問',
  },
];
