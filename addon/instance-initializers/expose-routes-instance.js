export function initialize(appInstance) {
  if (window.provideRouterInstanceToStaticBoot) {
    window.provideRouterInstanceToStaticBoot(appInstance.lookup('router:main'));
  }
}

export default {
  name: 'expose-routes-instance',
  initialize
};
