export const ROUTER_UTILS = {
  DASHBOARD: {
    root: 'dashboard',
    home: 'home',
    materialToVideo: 'material-to-video',
    aiVideo: 'ai-video',
    productAnyShot: 'product-any-shot',
    productAvatar: 'product-avatar',

    getMaterialToVideo: () => {
      return `/${ROUTER_UTILS.DASHBOARD.root}/${ROUTER_UTILS.DASHBOARD.materialToVideo}`;
    },
    getHome: () => {
      return `/${ROUTER_UTILS.DASHBOARD.root}/${ROUTER_UTILS.DASHBOARD.home}`;
    },
    getAiVideo: () => {
      return `/${ROUTER_UTILS.DASHBOARD.root}/${ROUTER_UTILS.DASHBOARD.aiVideo}`;
    },
    getProductAnyShot: () => {
      return `/${ROUTER_UTILS.DASHBOARD.root}/${ROUTER_UTILS.DASHBOARD.productAnyShot}`;
    },
    getProductAvatar: () => {
      return `/${ROUTER_UTILS.DASHBOARD.root}/${ROUTER_UTILS.DASHBOARD.productAvatar}`;
    },
  },
};
