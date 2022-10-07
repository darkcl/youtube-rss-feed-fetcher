function injectFetchFeedUrl() {
  window.fetchFeedUrl = () => {
    try {
      const { serviceTrackingParams = [] } =
        window.ytInitialData?.responseContext ?? {};
      const channelId = serviceTrackingParams
        .map(({ params }) => params)
        .flat()
        .filter(({ key }) => key === "browse_id")[0].value;
      console.log(
        `Feed URL: https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
      );
    } catch (error) {
      console.error(error);
    }
  };
}

try {
  const script = document.createElement("script");
  script.text = `(${injectFetchFeedUrl.toString()})()`;
  document.documentElement.appendChild(script);
} catch (error) {
  console.error(error);
}
