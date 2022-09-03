const path = require("path");
const vscode = require("vscode");

function resolveExtensionPath(context, paths) {
  if (!paths)
    paths = [];

  return vscode.Uri.file(path.join(context.extensionPath, ...paths)).fsPath;
}

module.exports = {
  resolveExtensionPath
}