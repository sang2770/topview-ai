export const ROUTER_UTILS = {
  DASHBOARD: {
    root: 'dashboard',
    home: 'home',
    projects: 'projects',
    assets: 'assets',
    brandKit: 'brand-kit',
    materialToVideo: 'material-to-video',
    getMaterialToVideo: () => {
      return `/${ROUTER_UTILS.DASHBOARD.root}/${ROUTER_UTILS.DASHBOARD.materialToVideo}`;
    },
    getHome: () => {
      return `/${ROUTER_UTILS.DASHBOARD.root}/${ROUTER_UTILS.DASHBOARD.home}`;
    },
  },
};
