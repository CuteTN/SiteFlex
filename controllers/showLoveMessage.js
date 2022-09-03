const vscode = require('vscode')
const { randomInt } = require("../utils/math")
const { I_I_LOVE_MESSAGES } = require("../common/consts");

function showLoveMessage() {
  vscode.window.showInformationMessage(I_I_LOVE_MESSAGES[randomInt(0, I_I_LOVE_MESSAGES.length-1)]);
}

module.exports = {
  showLoveMessage
}