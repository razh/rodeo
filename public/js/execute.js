function sendCommand(input, hideResult) {
  if (input) {
    var html = history_row_template({ n: 1 + $("#history-trail").children().length, command: input });
    $("#history-trail").append(html);
  }

  if (input=="push it to the limit") {
    $("#time-traveler").click();
    return;
  }

  if (/^\?/.test(input)) {
    input = "help(" + input.slice(1) + ")"
  } else if (input=="reset" || input=="%%reset" || input=="%reset" || input=="quit" || input=="quit()" || input=="exit" || input=="exit()") {
    // do quit stuff...
    if (isDesktop()) {
      require('electron').ipcRenderer.send('quit');
    } else {
      bootbox.alert("To quit Rodeo, just exit this tab.");
      return;
    }
  }

  // auto scroll down
  $cont = $("#history-trail").parent();
  if ($cont[0]) {
    $cont[0].scrollTop = $cont[0].scrollHeight;
  }

  // actually run the command
  var data = {
    command: input,
    autocomplete: false,
    stream: true
  };

  $("#btn-interrupt").removeClass("hide");
  if (isDesktop()) {
    require('electron').ipcRenderer.send('command', data);
  } else {
    data.msg = 'command';
    ws.sendJSON(data);
  }
}

function handleCommandResults(result) {
  if (/^help[(]/.test(result.command)) {
    if (result.output) {
      $('#help-content').text(result.output);
      $('a[href="#help"]').tab("show");
      return;
    }
  }

  if (result.status!="complete" && result.stream) {
    jqconsole.Write(result.stream || "");
  }

  if (result.image || result.html) {
    addPlot(result);
    $("#btn-interrupt").addClass("hide");
  }

  if (result.error) {
    track('command', 'error');
    $("#btn-interrupt").addClass("hide");
    jqconsole.Write(result.error + '\n', 'jqconsole-error');
  }

  if (result.status=="complete") {
    $("#btn-interrupt").addClass("hide");
    jqconsole.Write('\n');
    refreshVariables();
  }
}

if (isDesktop()) {
  require('electron').ipcRenderer.on('command', function(evt, data) {
    handleCommandResults(data);
  });
}

// execute script button
$("#run-button").click(function(e) {
  e.preventDefault();
  var editor = getActiveEditor();
  var code = editor.getSelectedText();
  // if nothing was selected, then we'll run the entire file
  if (! code) {
    code = editor.session.getValue();
  }
  jqconsole.Write(">>> " + code + '\n', 'jqconsole-old-input');
  sendCommand(code);
  return false;
});

$("#run-markdown").click(function(e) {
  track('command', 'markdown');
  var editor = getActiveEditor();
  var code = editor.getSelectedText();

  if (! code) {
    code = editor.session.getValue();
  }

  if (isDesktop()) {
    var html = require('electron').ipcRenderer.sendSync('md', { doc: code });
    var html = markdown_template({ renderedMarkdown: html, desktop: true });
    renderMarkdown(html);
  } else {
    $("#markdown-form textarea").val(code);
    $("#markdown-form").submit();
  }
});

function executeCommand(command, autocomplete, fn) {
  var data = {
    "command": command,
    "autocomplete": autocomplete,
    stream: false
  };

  if (isDesktop()) {
    var results = require('electron').ipcRenderer.sendSync('command', data);
    fn(results);
  } else {
    $.get("command", data, fn);
  }
}
