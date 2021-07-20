import countly from 'countly-sdk-web'
import debug from './debug'

export const events = {
  FEEDBACK_HELPFUL: 'feedbackHelpful',
  FEEDBACK_IMPORTANT: 'feedbackImportant',
  FEEDBACK_GENERAL: 'feedbackGeneral',
  LINK_CLICK_HOME_LOGO: 'linkClickHomeLogo',
  LINK_CLICK_SIDEBAR: 'linkClickSidebar',
  LINK_CLICK_NAVBAR: 'linkClickNavbar',
  LINK_CLICK_FOOTER: 'linkClickFooter',
  NOT_FOUND: 'notFound',
}

export function init ({ key, url }) {
  countly.init({
    app_key: key,
    app_version: "1.0",
    url,
    debug: false
  });
  
  countly.track_sessions();
  countly.track_pageview();
  countly.track_clicks();
  countly.track_links();
  countly.track_scrolls();

  // Track other built-in vuepress links
  document.addEventListener('click', ({ target }) => {
    if (target.tagName && target.tagName.toLowerCase() === 'a') {
      // navbar and sidebar navigation links
      if (target.classList.contains('sidebar-link') || target.classList.contains('nav-link')) {
        const event = target.classList.contains('sidebar-link') ?
          events.LINK_CLICK_SIDEBAR :
          events.LINK_CLICK_NAVBAR
        
        trackEvent(event, {
          path: location.pathname,
          href: target.href,
          link: target.pathname + (target.pathname.endsWith('/') ? '' : '/') + target.hash,
          text: target.innerText,
        })
      }
    }
  })
}


/*
  Track an event to countly with the provided data
*/
export function trackEvent (event, data = {}) {
  debug && console.info('[countly]', 'trackEvent()', event, data)

  if (typeof window === 'undefined') {
    return
  }

  countly.add_event({
    key: event,
    segmentation: data
  })
}

/*
  Track page view to countly. Default to window.location.pathname
*/
export function trackPageView (path) {
  countly.track_pageview(path)
}

export default {
  init,
  events,
  trackEvent,
  trackPageView,
}
