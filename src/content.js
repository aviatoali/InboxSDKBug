import * as InboxSDK from '@inboxsdk/core';

InboxSDK.load(2, "your_id").then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "My Nifty Button!",
      iconUrl:
        "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
      onClick(event) {
        event.composeView.insertTextIntoBodyAtCursor("Hello World!");
      },
    });

    composeView.on('presending', () => {
        console.log('@@@@@@@@@@ presend');
    });
    composeView.on('sent', async (event) => {
        const threadId = await event.getThreadID();
        console.log('@@@@@@@@@@ sent threadId: ', threadId);
    });
  });

  sdk.Router.handleListRoute(sdk.Router.NativeListRouteIDs.SENT, (listRouteView) => {
    sdk.Lists.registerThreadRowViewHandler(async (threadRowView) => {
      const threadId = await threadRowView.getThreadIDAsync();
      console.log('@@@@@@@@@@ threadRow threadId: ', threadId);
    });
  });
});
