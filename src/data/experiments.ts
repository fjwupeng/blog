export const experiments = [
  {
    slug: 'ai-business-growth',
    title: 'AI 企业增长：让内容形成长期积累',
    status: '研究中',
    description: '从自己的个人网站出发，探索原稿管理、平台适配与反馈记录，再判断哪些环节适合用 AI 提高效率。',
    updatedAt: '2026-10-09',
    focus: '已完成官网与 GitHub 同步，下一步选择一篇文章做平台适配并记录反馈。',
    question: '一份持续维护的原稿，能否降低多平台内容的维护成本，并让读者更容易理解一个品牌正在做什么？',
    context: '先用自己的文章验证流程，再考虑是否能复用到企业品牌的信息整理与内容分发中。目前仍处于研究阶段。',
    milestones: [
      {
        state: 'done',
        label: '已完成',
        title: '建立内容基础',
        description: '个人官网已上线；文章保存在 GitHub，提交后自动更新网站，并提供分类与固定的文章地址。',
      },
      {
        state: 'current',
        label: '下一步',
        title: '完成一次真实的平台发布',
        description: '选一篇原稿，整理适合目标平台的版本，人工核对后发布，记录原稿版本、实际链接与日期。',
      },
      {
        state: 'planned',
        label: '待验证',
        title: '用反馈决定如何继续',
        description: '回看改写与维护耗时、读者的问题和修订次数，再判断需要优化的环节及 AI 的适用范围。',
      },
    ],
    hypotheses: [
      '统一原稿与发布记录后，更新内容时能否减少版本遗漏？',
      '按阅读场景改写，是否能让读者更快理解文章要解决的问题？',
      'AI 辅助整理和改写，能节省多少工作，又增加了哪些核对成本？',
    ],
    nextSteps: [
      '选定文章与一个目标平台，完成改写、核对和发布。',
      '记录实际投入与读者反馈，把需要补充的内容带回官网原稿。',
      '整理一次复盘，再决定是否扩展平台或尝试自动化。',
    ],
    relatedPostSlugs: ['a-place-for-my-work', 'one-article-many-channels'],
  },
];
