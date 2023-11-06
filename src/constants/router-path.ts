export const ROUTER_PATH = {
  HOME: '/',
  LOGIN: '/login',
  REPORTS: '/reports',
  PASSWORD_RESET: '/password-reset',
  PASSWORD_RESET_SENT: '/password-reset/sent',
  PASSWORD_CHANGE: '/password-reset/change',
  PRIVACY_POLICY: 'https://www.medi-l.com/privacy',
  TERM: '/terms',
  ACCOUNT: '/account',
  CALENDER: '/calender',
  Latest_Technology_Trends: '/latest-technology-trends',
  CONTACT: 'https://www.icride.net/user-contact',
  ABOUT_ICRIDE: 'https://www.icride.net/',
  COMPANY: 'https://www.icride.net/aboutus',
  ANSWER: 'https://www.icride.net/user-contact',
};

export const PARAM_PATH = {
  REPORT_DETAIL: (id: string) => `/reports/${id}`,
  REPORT_QUESTION_DETAIL: (reportId: string, questionNumber: string) =>
    `/reports/${reportId}/${questionNumber}`,
  REPORT_ATTRIBUTES: (reportId: string) => `/reports/${reportId}/attributes`,
};
