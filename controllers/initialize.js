const vscode = require("vscode");
const fs = require("fs");
const { CustomWebviewViewProvider } = require("../utils/custom-webview-view-provider");
const { showLoveMessage } = require("./showLoveMessage");

/**
 * @param {vscode.ExtensionContext} context
 */
function initializeMainView(context) {
  const viewId = "siteflex.mainView"
  const viewProvider = new CustomWebviewViewProvider({
    viewId,
    htmlUri: "views/mainview/mainview.html",
    extensionUri: context.extensionUri,
    messageListener: msg => {
      switch (msg.type) {
        case "LOG": {
          console.info("Log from webview", msg);
          break;
        }
        case "GET_DIRS": {
          handleUpdateFileSystemToWebview();
          break;
        }
        case "UPDATE_STATE": {
          handleWebviewStateUpdate(msg.payload);
          break;
        }
        case "EXECUTE": {
          handleWebviewExecuteCmd(msg.payload);
          break;
        }
        default: {
          console.error("Unhandled message:", msg)
          break;
        }
      }
    }
  });

  function handleWebviewExecuteCmd(payload) {
    vscode.commands.executeCommand("SiteFlex.executeCmdInEachDir");
  }

  function handleWebviewStateUpdate(payload) {
    context.workspaceState.update("siteflex_mainView", payload.state);
  }
 
  function handleUpdateFileSystemToWebview() {
    const folder = (vscode.workspace.workspaceFolders || [])[0];
    
    if (folder) {
      fs.readdir(folder.uri.fsPath, { withFileTypes: true }, (err, dirents) => {
        const dirs = dirents
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);

        viewProvider.postMessage({
          type: "UPDATE_DIRS",
          payload: { dirs },
        });
      });
    }
    else {
      viewProvider.postMessage({
        type: "NO_WORKSPACE_FOLDERS",
      });
    }
  }

  const folders = vscode.workspace.workspaceFolders;
  if (folders && folders.length) {
    let watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(folders[0], "**"));
    context.subscriptions.push(
      watcher.onDidCreate(handleUpdateFileSystemToWebview),
      watcher.onDidDelete(handleUpdateFileSystemToWebview),
    )
  }

	context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(viewId, viewProvider),
  );
}



/**
 * @param {vscode.ExtensionContext} context
 */
function initialize(context) {
  console.info("Initializing SiteFlex...");

  setInterval(() => {
    showLoveMessage();
  }, 1000 * 60 * 60)

  initializeMainView(context);
}

module.exports = {
  initialize
}