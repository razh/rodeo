
function setupMenu() {
  var RodeoMenu = {
    name: "Rodeo",
    items: [
      { text: "About", href: "about" },
      { text: "Preferences", shortcut: "⌘ + ,", onclick: "showPreferences();" },
      { text: "Default Variables", onclick: "showRodeoProfile();" },
    ]
  };

  $("#psuedo-file-menu").append(
    menu_item_template(RodeoMenu)
  );

  var FileMenu = {
    name: "File",
    items: [
      { text: "File", shortcut: "⌘ + ⌥ + ⇧ + n", onclick: "$('#add-tab').click();" },
      { text: "Open", shortcut: "⌘ + ⇧ + o", onclick: "$('#file-upload-trigger').click();" },
      { isDivider: true },
      { text: "Save", shortcut: "⌘ + s", onclick: "saveActiveEditor();" },
      { text: "Save As", shortcut: "", onclick: "saveActiveEditor(true);" },
      { isDivider: true },
      { text: "Close", shortcut: "⌘ + ⌥ + ⇧ + w / ⌘ + b", onclick: "closeActiveFile();" },
      { text: "Find File", shortcut: "⌘ + ⌥ + t / ⌘ + k", onclick: "findFile();" }
    ]
  };

  $("#psuedo-file-menu").append(
    menu_item_template(FileMenu)
  );

  var ViewMenu = {
    name: "View",
    items: [
      { text: "Change Editor" },
      { text: "└ Move One Left", shortcut: "ctrl + ⌥ + left", onclick: "⇧EditorLeft();"},
      { text: "└ Move One Right", shortcut: "ctrl + ⌥ + right", onclick: "⇧EditorRight();"},
      { isDivider: true },
      { text: "Focus" },
      { text: "└ Editor", shortcut: "⌘ + ⇧ + 1", onclick: "focusOnEditor();"},
      { text: "└ Console", shortcut: "⌘ + ⇧ + 2", onclick: "focusOnConsole();"},
      { text: "└ Variables & History", shortcut: "⌘ + ⇧ + 3", onclick: "focusOnTopRight();"},
      { text: "└ Files, Plots, Packages, ...", shortcut: "⌘ + ⇧ + 4", onclick: "focusOnBottomRight();"}
    ]
  };

  $("#psuedo-file-menu").append(
    menu_item_template(ViewMenu)
  );

  var WindowMenu = {
    name: "Window",
    items: [
      { text: "Reset Windows to Default Sizes", onclick: "resetWindowCalibration();"}
    ]
  };

  $("#psuedo-file-menu").append(
    menu_item_template(WindowMenu)
  );

  var SessionMenu = {
    name: "Session",
    items: [
      { text: "Restart Session", onclick: "restartSession();" },
      { text: "Set Working Directory", onclick: "setWorkingDirectory();" },
      { text: "Last Command", shortcut: "⌘ + ⇧ + 1", onclick: "runLastCommand();" },
      { text: "2nd to Last Command", shortcut: "⌘ + ⇧ + 2", onclick: "run2ndToLastCommand();" }
    ]
  };

  $("#psuedo-file-menu").append(
    menu_item_template(SessionMenu)
  );

  var HelpMenu = {
    name: "Help",
    items: [
      { text: "View Shortcuts", onclick: "$('#shortcut-display-modal').modal('show');" },
      { text: "Docs", href: "http://yhat.github.io/rodeo-docs/" },
      { text: "Tour", onclick: "$('#tour-modal').modal('show');" }
    ]
  };

  $("#psuedo-file-menu").append(
    menu_item_template(HelpMenu)
  );
}
