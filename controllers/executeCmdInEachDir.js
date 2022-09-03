const vscode = require('vscode');

/**
 * @typedef {object} DirSelection
 * @property {string} name
 * @property {string} trimmedName
 * @property {boolean} isSelected
 */

/**
 * @typedef {object} MainViewState
 * @property {DirSelection[]} dirs
 * @property {string} terminalCommand
*/

/**
 * @param {vscode.ExtensionContext} context
 */
function executeCmdInEachDir(context) {
  return function() {
    /** @type {MainViewState} */
    const state = context.workspaceState.get('siteflex_mainView');

    const workspaceFolder = (vscode.workspace.workspaceFolders || [])[0];
    if (!workspaceFolder) {
      vscode.window.showErrorMessage("Please love chị í i and open a folder to run this command.");
      return;
    }

    if (!state.dirs.find(dir => dir.isSelected)) {
      vscode.window.showErrorMessage("Please love chị í i and select at least 1 directory.");
      vscode.commands.executeCommand("siteflex.mainView.focus")
      return
    }
    
    const terminals = vscode.window.terminals;
    
    state.dirs.forEach(dir => {
      if (!dir.isSelected) return;
      const terminalName = dir.trimmedName || dir.name;
      
      let terminal =
        terminals.find(t => t.name === terminalName) 
        ||
        vscode.window.createTerminal({
          name: terminalName,
          message: "Chị í í đáng iu quá đi á 😽",
        })
        
      const dirPath = vscode.Uri.joinPath(workspaceFolder.uri, dir.name).fsPath;
      terminal.sendText(`cd "${dirPath}"`);
      
      terminal.show();
      if (state.terminalCommand)
        terminal.sendText(state.terminalCommand);
    })
  }
}

module.exports = {
  executeCmdInEachDir
}