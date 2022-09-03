// original source:
// https://github.com/microsoft/vscode-extension-samples/blob/main/webview-view-sample/src/extension.ts

const vscode = require('vscode');
const fs = require('fs');
const { chainReplaceAll } = require('./string-helpers');

/**
 * @typedef {Object} WebviewProviderParams
 * @property {string} viewId
 * @property {string} htmlUri
 * @property {vscode.Uri} extensionUri 
 * @property {(message: any) => void} messageListener
 */

/**
 * @implements {vscode.WebviewViewProvider}
 */
class CustomWebviewViewProvider {
  /**
   * @param {WebviewProviderParams} param0 
   */
	constructor({
    viewId,
    htmlUri,
		extensionUri,
    messageListener,
  }) { 
    /** @type {string} */
    this.viewId = viewId;

    /** @type {string} */
    this.htmlUri = htmlUri

    /** @type {vscode.Uri} */
    this.extensionUri = extensionUri;

    this.htmlUri

    /** @type {vscode.WebviewView} */
    this.view = null

    /** @type {(message: any) => void} */
    this.messageListener = messageListener;
  }

  /**
   * @param {vscode.WebviewView} webviewView 
   * @param {vscode.WebviewViewResolveContext} context 
   * @param {vscode.CancellationToken} token 
   */
	resolveWebviewView (
		webviewView,
		context,
		token,
	) {
		this.view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,

			localResourceRoots: [
				this.extensionUri
			],
		};

		webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
    
    if (this.messageListener)
      webviewView.webview.onDidReceiveMessage(this.messageListener);
	}

  /**
  * @param {vscode.Webview} webview 
  * @returns 
  */
	getHtmlForWebview(webview) {
		const rawHtml = fs.readFileSync(vscode.Uri.joinPath(this.extensionUri, this.htmlUri).fsPath).toString();
    const webviewUri = webview.asWebviewUri(this.extensionUri);
    
    const nonce = getNonce();

    const html = chainReplaceAll(rawHtml, 
      "{{extension-uri}}", webviewUri,
      "{{nonce}}", nonce,
      "{{csp-source}}", webview.cspSource,
    );

    return html;
	}

  postMessage(message) {
    if (this.view) {
      this.view.webview.postMessage(message);
    }
  }
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

module.exports = {
  CustomWebviewViewProvider
}