import countly from 'countly-sdk-web'
import debug from './debug'

export const events = {
  FEEDBACK_HELPFUL: 'feedbackHelpful',
  FEEDBACK_IMPORTANT: 'feedbackImportant',
  FEEDBACK_GENERAL: 'feedbackGeneral',
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
  countly.track_errors();
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
