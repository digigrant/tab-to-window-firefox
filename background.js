const WINDOW_OFFSET = 24;

async function moveTabToNewWindow() {
  const [activeTab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!activeTab) {
    return;
  }

  const sourceWindow = await browser.windows.get(activeTab.windowId);
  const tabsInWindow = await browser.tabs.query({ windowId: activeTab.windowId });

  if (tabsInWindow.length === 1) {
    // Single-tab-window edge case: moving the only tab to a new window is a
    // no-op, since Firefox would just close the emptied original window and
    // leave an equivalent window behind. Do nothing rather than replace the
    // window for no visible effect.
    return;
  }

  await browser.windows.create({
    tabId: activeTab.id,
    left: (sourceWindow.left ?? 0) + WINDOW_OFFSET,
    top: (sourceWindow.top ?? 0) + WINDOW_OFFSET,
    width: sourceWindow.width,
    height: sourceWindow.height,
    focused: true,
    type: "normal",
  });
}

browser.commands.onCommand.addListener((command) => {
  if (command === "move-tab-to-window") {
    moveTabToNewWindow();
  }
});
