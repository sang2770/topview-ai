export const ROUTER_UTILS = {
  DASHBOARD: {
    root: 'dashboard',
    home: 'home',
    projects: 'projects',
    assets: 'assets',
    brandKit: 'brand-kit',
    getHome: () => {
      return `/${ROUTER_UTILS.DASHBOARD.root}/${ROUTER_UTILS.DASHBOARD.home}`;
    },
  },
};
