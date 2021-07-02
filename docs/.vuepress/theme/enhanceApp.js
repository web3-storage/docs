import countly from './utils/countly'

export default ({ Vue, router, isServer, siteData }) => {
  if (!isServer) {
    countly.init(siteData.themeConfig.countly)

    router.afterEach((to) => {
      countly.trackPageView(to.path)
    })
  }
}
