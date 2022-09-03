const vscode = require('vscode');
const { initialize } = require('./controllers/initialize');
const { executeCmdInEachDir } = require('./controllers/executeCmdInEachDir');
const { showLoveMessage } = require('./controllers/showLoveMessage');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  initialize(context);
	let executeCmdInEachDirDisposable = vscode.commands.registerCommand('SiteFlex.executeCmdInEachDir', executeCmdInEachDir(context));
  let showLoveMessageDisposable = vscode.commands.registerCommand('SiteFlex.showLoveMessage', showLoveMessage);
	context.subscriptions.push(
    executeCmdInEachDirDisposable, 
    showLoveMessageDisposable
  );
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
