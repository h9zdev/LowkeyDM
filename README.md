<p align="center">
  <img src="icon.svg" width="128" height="128" alt="LowkeyDM Icon">
</p>

<h1 align="center">LowkeyDM</h1>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/platform-Instagram-pink.svg" alt="Platform">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
</p>

End-to-end encrypt your Instagram Direct Messages. LowkeyDM allows you to set a shared secret password with your chat partner to keep your conversations private and secure from prying eyes.

---

## 🚀 Features

- **P2P Encryption**: Messages are encrypted locally before being sent.
- **Shared Secrets**: Only those with the password can decrypt the messages.
- **Seamless Integration**: Injects encryption and decryption buttons directly into the Instagram web interface.

---

## 🛠 How to Use

1. **Set your Password**: Click the LowkeyDM extension icon in your browser toolbar and enter a **Secret Password**. Make sure your chat partner uses the **exact same password**.
2. **Encrypt & Send**:
   - Open a chat on Instagram.
   - You will see a **lock icon** next to the message input.
   - Type your message and click the lock icon. Your message will be replaced with an encrypted string (e.g., `🔒ENC:abc123...`).
   - Press Enter to send.
3. **Decrypt**:
   - When you receive an encrypted message (starting with `🔒ENC:`), a **decrypt icon** will appear inside the message bubble.
   - Click the icon to view the decrypted message in a secure overlay.

---

## 📥 Installation

### Desktop (Chrome / Brave / Edge)
1. Download this repository as a ZIP file and extract it.
2. Go to `chrome://extensions/` in your browser.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the folder where you extracted the extension.

### Desktop (Mozilla Firefox)
1. Download this repository and extract it.
2. Go to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...**.
4. Select the `manifest.json` file from the project folder.

### 📱 Android (Mozilla Firefox)
You can install LowkeyDM on Firefox for Android by following these steps:
1. Download the extension files to your Android device.
2. Open Firefox and go to **Settings** > **About Firefox**.
3. Tap the **Firefox logo 5 times** in quick succession. This unlocks the hidden "Install Extension from File" menu.
4. Go back to **Settings** and you will now see **Install Extension from File**.
5. Select the extension file to install it.

---

## 🏪 Official Store

LowkeyDM will soon be available on the official Mozilla Add-on Store!

[![Get the Add-on](https://img.shields.io/badge/Get_the_Add--on-Firefox-orange?style=for-the-badge&logo=firefox-browser)](https://addons.mozilla.org/en-GB/firefox/addon/lowkeydm/)

---

## 💖 Sponsors

If you find LowkeyDM useful, please consider sponsoring the project to help us keep it maintained and secure!

---

## ⚖️ Disclaimer

**LowkeyDM is NOT affiliated with, authorized, maintained, sponsored, or endorsed by Instagram, Meta, or any of its affiliates or subsidiaries.**

This extension is an independent, open-source tool. Use it at your own risk. We are not responsible for any issues arising from the use of this extension, including but not limited to account suspension or data loss.

---

## 🤝 Community & Compliance

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [License](LICENSE)

---

## 📄 License
This project is licensed under the MIT License.
