export default function trackEvent(eventCategory, eventAction, eventLabel) {
  if (process.env.NODE_ENV === 'production') {
    ga('send', 'event', eventCategory, eventAction, eventLabel);
  } else {
    console.log(`DEVELOPMENT MODE: Custom Tracking Event - ${eventCategory}, ${eventAction}, ${eventLabel}`);
  }
}
