function sendDataToGTM(eventName: string, eventData: Record<string | number, any>) {
  try {
    // @ts-expect-error Not a part of default window object
    if (!window?.dataLayer) {
      return;
    }

    eventData = eventData || {};
    const dataLayerPushData = {
      event: eventName,
      data: eventData,
    };

    // @ts-expect-error Not a part of default window object
    window.dataLayer.push(dataLayerPushData);
  } catch (error) {
    console.log(error);
  }
}

export default sendDataToGTM;
