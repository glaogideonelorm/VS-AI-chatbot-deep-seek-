declare const ollama: any;

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { get } from "http";
import * as vscode from "vscode";



// This method is called when your extension is activated

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "deepseek-ext" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "deepseek-ext.helloWorld",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "deepseek-ext",
        "Deep Seek Chat bot",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );
      panel.webview.html = getWebviewContent();

      panel.webview.onDidReceiveMessage(async (message: any) => {
        if (message.command === "send-message") {
          const userPrompt = message.text;
          let responseText = "";

          try {
            const streamResponse = await ollama.chat({
              model: "deepseek-r1:1.5b",
              messages: [{ role: "user", content: userPrompt }],
              stream: "true",
            });
            for await (const part of streamResponse) {
              responseText += part.messages.content;
              panel.webview.postMessage({
                command: "show-message",
                text: responseText,
              });
            }
          } catch (error) {
            responseText = "An error occurred while processing your request";
            panel.webview.postMessage({
              command: "show-message",
              text: responseText,
            });
          }
        }
      });

      
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent() {
  return /*html*/ `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Deep Seek Chat Bot</title>
		<style>
			body {
				font-family: sans-serif;
				padding: 20px;
			}
			textarea {
				width: 100%;
				height: 150px;
				margin-bottom: 10px;
				resize: vertical;
			}
			button {
				padding: 10px 20px;
				font-size: 16px;
				cursor: pointer;
			}
		</style>
	</head>
	<body>
		<h1>Deep Seek Chat Bot</h1>
		<textarea id="chatInput" placeholder="Type your message here..."></textarea>
		<br>
		<button id="sendButton">Send Message</button>
		<script>
			 const vscode = acquireVsCodeApi();

			 document.getElementById('sendButton').addEventListener('click', () => {
				const text = document.getElementById('chatInput').value;
				vscode.postMessage({
					command: 'send-message',
					text});
				});

			window.addEventListener('message', event => {
				const { command, text } = event.data;
				if (command === 'show-message') {
					document.getElementById('chatInput').innerText = 'text';
				}
			});
		</script>
	</body>
	</html>
	`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
