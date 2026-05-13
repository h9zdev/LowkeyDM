<div align="center">

<!-- HERO BANNER -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="icon.svg">
  <img src="icon.svg" width="100" height="100" alt="LowkeyDM" style="filter: drop-shadow(0 0 20px #a855f7);">
</picture>

<br/>

```
██╗      ██████╗ ██╗    ██╗██╗  ██╗███████╗██╗   ██╗██████╗ ███╗   ███╗
██║     ██╔═══██╗██║    ██║██║ ██╔╝██╔════╝╚██╗ ██╔╝██╔══██╗████╗ ████║
██║     ██║   ██║██║ █╗ ██║█████╔╝ █████╗   ╚████╔╝ ██║  ██║██╔████╔██║
██║     ██║   ██║██║███╗██║██╔═██╗ ██╔══╝    ╚██╔╝  ██║  ██║██║╚██╔╝██║
███████╗╚██████╔╝╚███╔███╔╝██║  ██╗███████╗   ██║   ██████╔╝██║ ╚═╝ ██║
╚══════╝ ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═════╝ ╚═╝     ╚═╝
```

### *Your conversations. Your keys. No one else's business.*

<br/>

[![Version](https://img.shields.io/badge/version-1.0-blueviolet?style=flat-square&logo=github)](https://github.com)
[![Platform](https://img.shields.io/badge/platform-Instagram-E1306C?style=flat-square&logo=instagram)](https://instagram.com)
[![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)](LICENSE)
[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-FF7139?style=flat-square&logo=firefox-browser)](https://addons.mozilla.org/en-GB/firefox/addon/lowkeydm/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=google-chrome)](https://chrome.google.com)

</div>

---

<br/>

<table>
<tr>
<td width="50%">

## 🔐 What is LowkeyDM?

**LowkeyDM** is a browser extension that wraps your Instagram Direct Messages in **end-to-end encryption** — right in your browser, before anything touches Instagram's servers.

Set a shared secret password with your chat partner. Anyone else who intercepts your message? They see gibberish. Only you two hold the key.

> *No servers. No accounts. No data collection. Just math.*

</td>
<td width="50%">

```
┌─────────────────────────────────┐
│         MESSAGE FLOW            │
│                                 │
│  You type:  "meet at 9pm"       │
│                 ↓               │
│  🔒 Encrypt with shared key     │
│                 ↓               │
│  Sent:  "🔒ENC:x9Kp2mL..."     │
│                 ↓               │
│  Partner decrypts with key      │
│                 ↓               │
│  They read:  "meet at 9pm"      │
└─────────────────────────────────┘
```

</td>
</tr>
</table>

<br/>

---

## ✦ Features

<table>
<tr>

<td align="center" width="33%">

### 🛡️ P2P Encryption
Messages are encrypted **locally in your browser** before being sent. Instagram never sees the plaintext.

</td>

<td align="center" width="33%">

### 🗝️ Shared Secrets
Only people with the **exact same password** can decrypt and read your messages. Zero trust required.

</td>

<td align="center" width="33%">

### 🧩 Seamless Integration
Lock and unlock icons are **injected directly** into Instagram's web UI — no tab switching, no friction.

</td>

</tr>
</table>

---

<br/>

## 🛠️ How to Use

<details open>
<summary><strong>Step 1 — Set Your Password</strong></summary>

<br/>

Click the **LowkeyDM icon** in your browser toolbar and enter a **Secret Password**.

> ⚠️ Your chat partner must use the **exact same password**. Share it out-of-band (in person, via a phone call, etc.) for best security.

</details>

<details open>
<summary><strong>Step 2 — Encrypt & Send</strong></summary>

<br/>

1. Open a conversation on [instagram.com](https://instagram.com)
2. A **🔒 lock icon** will appear next to the message input box
3. Type your message and click the lock icon
4. Your message transforms into an encrypted string → `🔒ENC:abc123...`
5. Hit **Enter** to send as usual

</details>

<details open>
<summary><strong>Step 3 — Decrypt Received Messages</strong></summary>

<br/>

1. When you receive a message starting with `🔒ENC:` — it's encrypted
2. A **decrypt icon** appears inside the message bubble
3. Click it to reveal the decrypted message in a secure overlay
4. Only visible to you, only for that session

</details>

<br/>

---

## 📥 Installation

<br/>

### 🖥️ Desktop Browsers

<table>
<tr>
<th>Chrome · Brave · Edge</th>
<th>Mozilla Firefox</th>
</tr>
<tr>
<td>

1. Download this repo as a **ZIP** and extract it
2. Navigate to `chrome://extensions/`
3. Toggle on **Developer Mode** *(top right)*
4. Click **Load unpacked**
5. Select the extracted folder

</td>
<td>

1. Download this repo and extract it
2. Navigate to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on...**
4. Select the `manifest.json` from the project folder

</td>
</tr>
</table>

<br/>

### 📱 Android — Mozilla Firefox

> Firefox for Android supports extensions. Here's how to sideload LowkeyDM:

```
1. Download the extension files to your Android device
2. Open Firefox → Settings → About Firefox
3. Tap the Firefox logo 5× rapidly  ← unlocks hidden dev menu
4. Return to Settings → "Install Extension from File"
5. Select the extension file → Done ✓
```

<br/>

---

## 🏪 Get It from the Store

<div align="center">

<br/>

[![Get the Firefox Add-on](https://img.shields.io/badge/Firefox_Add--on_Store-Get_LowkeyDM-FF7139?style=for-the-badge&logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/en-GB/firefox/addon/lowkeydm/)

<br/>

*Chrome Web Store listing — coming soon*

</div>

<br/>

---

## 🔬 Security Model

```
Encryption Algorithm:  AES-GCM (256-bit)
Key Derivation:        PBKDF2 with SHA-256
Salt:                  Randomly generated per session
Ciphertext Format:     🔒ENC:<base64-encoded-payload>
Data Sent to Servers:  None (all crypto happens client-side)
```

> **Your password never leaves your device.** LowkeyDM uses the browser's native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) — no third-party crypto libraries, no hidden dependencies.

<br/>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a **Pull Request**

<br/>

---

<div align="center">

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<br/>

---

*LowkeyDM — because some conversations should stay between you and them.*

<br/>

[![GitHub stars](https://img.shields.io/github/stars/h9zdev/lowkeydm?style=social)](https://github.com)

</div>
