```markdown
# VS-AI-chatbot-deep-seek-

A Visual Studio Code extension that provides an integrated chat interface powered by DeepSeek. This extension allows you to interact with a DeepSeek model (via Ollama) directly from VS Code. Chat with the bot, send messages, and get real-time responses streamed back to your editor.

## Features

- **Integrated Chat UI:** A webview-based interface featuring a text area and a send button.
- **DeepSeek Integration:** Sends user prompts to a DeepSeek model (configured via Ollama) and displays streaming responses.
- **Error Handling:** Notifies users when errors occur during the API call.
- **Simple Command Activation:** Activate the extension with a command defined in `package.json`.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/VS-AI-chatbot-deep-seek-.git
   cd VS-AI-chatbot-deep-seek-
   ```

2. **Install Dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Compile the TypeScript Code:**

   Ensure your TypeScript is compiled into JavaScript:

   ```bash
   npm run build
   ```

4. **Run the Extension in VS Code:**

   - Open the folder in Visual Studio Code.
   - Press `F5` to launch an Extension Development Host window.

## Configuration

Before using the extension, ensure you have the following in place:

- **Ollama CLI and DeepSeek Model:**  
  Install the Ollama CLI and pull your desired DeepSeek model (e.g., `deepseek-r1:1.5b`).  
  To remove a model, use:
  ```bash
  ollama rm deepseek-r1:1.5b
  ```
  To list installed models:
  ```bash
  ollama list
  ```

- **Command-Line Tool Setup:**  
  If the `ollama` command isn’t found, create a symlink:
  ```bash
  sudo ln -s /Applications/Ollama.app/Contents/Resources/ollama /usr/local/bin/ollama
  ```

## Usage

1. **Activate the Extension:**  
   Use the command palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux) and run:
   ```
   Deepseek-ext: Hello World
   ```
   This command will open a webview titled *Deep Seek Chat bot*.

2. **Chat with the Bot:**  
   - Type your message in the provided text area.
   - Click the "Send Message" button.
   - The extension will stream the response from the DeepSeek model and display it in the chat area.

3. **Error Notifications:**  
   If any issues occur while processing your message, an error message will be displayed in VS Code.

## Code Overview

- **`src/extension.ts`**  
  Contains the activation function that registers the command and creates the webview. It also listens for messages from the webview, sends the prompt to the DeepSeek model using Ollama's API, and streams the response back.

- **`getWebviewContent()` Function:**  
  Provides the HTML for the chat UI, including a text area, a send button, and the necessary script to handle message passing between the webview and the extension host.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```