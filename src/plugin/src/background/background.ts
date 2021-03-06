// background.js
var connections = {};

chrome.runtime.onConnect.addListener(function (port) {
    var extensionListener = function (message, sender, sendResponse) {
      // The original connection event doesn't include the tab ID of the
      // DevTools page, so we need to send it explicitly.
      switch (message.type) {
        case "RX_DEVTOOLS_PAGE_INIT":
          connections[message.tabId] = port;
          break;
        case 'RESET_TIMER':
          chrome.tabs.get(message.tabId, function (tab) {
            chrome.tabs.sendMessage(tab.id, {type: message.type});
          });
          break;
        case 'SET_RECORDING_TIMER':
          chrome.tabs.get(message.tabId, function (tab) {
            chrome.tabs.sendMessage(tab.id, {type: message.type, value: message.value});
          });
          break;
      }

      // Listen to messages sent from the DevTools page
      port.onMessage.addListener(extensionListener as any);

      port.onDisconnect.addListener(function (port) {
        port.onMessage.removeListener(extensionListener as any);

        var tabs = Object.keys(connections);
        for (var i = 0, len = tabs.length; i < len; i++) {
          if (connections[tabs[i]] == port) {
            delete connections[tabs[i]];
            break;
          }
        }
      });
    }
  }
);


// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id;
    sendMessage(sender.tab.id, request.message);
  } else {
    console.log("sender.tab not defined.");
  }
  return true;
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  sendMessage(tabId, {name: 'RESET_DATA'});
});

const sendMessage = (tabId, request) => {
  if (tabId in connections) {
    connections[tabId].postMessage(request);
  } else {
    console.log("Tab not found in connection list.");
  }
}

