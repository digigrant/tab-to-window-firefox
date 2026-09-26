# Tab to Window

A minimal Firefox extension that moves the current tab into its own new
window with a keyboard shortcut. No toolbar button, no options page — just
the shortcut.

- Default shortcut: `Ctrl+Shift+Y` (`Command+Shift+Y` on macOS).
- Moves only the active tab, even if other tabs are also selected/highlighted.
- The new window is a normal browser window (full toolbar/tab strip), sized
  to match the source window, offset slightly so it isn't stacked exactly on
  top, and focused.
- If the source window has only one tab, the shortcut does nothing: moving
  the tab would just recreate an equivalent window, so there's no point.
  (An alternative behavior — move the tab anyway and leave a fresh blank tab
  behind in the old window — was considered but not shipped.)

## Loading it for manual testing

With [`web-ext`](https://github.com/mozilla/web-ext) (installed on demand via
`npx`, no need to install it globally):

```sh
npx web-ext run
```

This launches a temporary Firefox profile with the extension already
installed. Reloads on file changes.

Alternatively, load it without `web-ext`:

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click "Load Temporary Add-on…".
3. Select this directory's `manifest.json`.

Temporary add-ons are removed when Firefox restarts, so re-load as needed.

To sanity-check the manifest and API usage:

```sh
npx web-ext lint
```

## Changing the shortcut

The shortcut is wired up entirely through Firefox's built-in commands UI —
there's no custom options page. To change it:

1. Open `about:addons`.
2. Click the gear icon → "Manage Extension Shortcuts".
3. Find "Tab to Window" and set a new key combination.

## Private windows

This extension can run in private windows, but Firefox requires you to
opt in manually per-extension: go to `about:addons`, open this extension's
details, and enable "Run in Private Windows".
