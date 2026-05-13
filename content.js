// content.js

let currentPassword = null;

// Load password on startup
chrome.storage.local.get(['p2p_password'], (result) => {
    if (result.p2p_password) {
        currentPassword = result.p2p_password;
    }
});

// Listen for password changes in popup
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.p2p_password) {
        currentPassword = changes.p2p_password.newValue;
    }
});

// Helper function to simulate input event in React
function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
    
    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
    
    element.dispatchEvent(new Event('input', { bubbles: true }));
}

// Function to inject the Encrypt button into the chat input area
function injectEncryptButton() {
    // Instagram's message input is usually a contenteditable div, but it might be a textarea in some versions.
    // We look for the common wrapper elements.
    const inputWrapper = document.querySelector('div[role="textbox"][contenteditable="true"]');
    
    if (!inputWrapper) return;
    
    // Prevent multiple injections
    if (inputWrapper.dataset.p2pInjected) return;
    inputWrapper.dataset.p2pInjected = "true";
    
    // Remove any orphaned buttons from previous chats
    document.querySelectorAll('.p2p-encrypt-btn').forEach(b => b.remove());

    const container = inputWrapper.closest('div');
    if (container) {
        const btn = document.createElement('button');
        btn.className = 'p2p-encrypt-btn';
        btn.title = 'Encrypt Message';
        btn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
            </svg>
        `;
        
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!currentPassword) {
                alert("Please set your P2P encryption password in the extension popup first.");
                return;
            }

            const text = inputWrapper.textContent;
            if (!text || text.trim() === '') return;

            try {
                const encrypted = await encryptText(text, currentPassword);
                const finalMessage = ENC_PREFIX + encrypted;
                
                inputWrapper.focus();
                // Use selectAll and insertText to ensure the editor properly replaces the text
                document.execCommand('selectAll', false, null);
                document.execCommand('insertText', false, finalMessage);
                
                // If React blocks insertText, fallback to clipboard
                if (!inputWrapper.textContent.includes(ENC_PREFIX)) {
                    await navigator.clipboard.writeText(finalMessage);
                    alert("Encrypted! Copied to clipboard. Please clear the chat box and paste (Ctrl+V) it to send.");
                }
            } catch (err) {
                console.error("Encryption failed:", err);
                alert("Encryption failed. See console.");
            }
        });

        // Insert exactly before the input wrapper to prevent Lexical Editor from crashing
        inputWrapper.parentElement.insertBefore(btn, inputWrapper);
    }
}

// Function to process messages and inject decryption links
function processMessages() {
    const messageElements = document.querySelectorAll('div[dir="auto"], span[dir="auto"]');
    
    messageElements.forEach(el => {
        // SMART FILTER: Exclude elements that are clearly not chat bubbles.
        // This skips sidebars, links, clickable usernames, and navigation items, 
        // while safely allowing all actual chat messages (which are plain text divs).
        if (el.closest('a, button, [role="button"], [role="link"], [role="tab"], [role="navigation"], header, nav, h1, h2, h3, h4, h5, h6')) return;

        // Skip if already processed
        if (el.dataset.p2pProcessed) return;

        // Skip if this element contains another dir="auto" inside it (we only want the deepest text nodes)
        if (el.querySelector('div[dir="auto"], span[dir="auto"]')) return;

        const text = el.textContent.trim();
        if (!text) return; // Skip empty
        
        // Skip extension UI elements
        if (el.classList.contains('p2p-decrypted-text') || el.closest('.p2p-encrypt-btn')) return;

        el.dataset.p2pProcessed = "true";
        
        // Create a small decrypt icon button
        const decryptBtn = document.createElement('button');
        decryptBtn.className = 'p2p-decrypt-icon-btn';
        decryptBtn.title = 'Attempt to Decrypt';
        decryptBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM16 16.1l-4-4-4 4-1.4-1.4 5.4-5.4 5.4 5.4z" /></svg>`;
        
        decryptBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!currentPassword) {
                alert("Please set your P2P encryption password in the extension popup first.");
                return;
            }
            
            // Temporarily remove button to get pure text content
            decryptBtn.remove();
            const rawText = el.textContent;
            el.appendChild(decryptBtn); // put it back for visual consistency during decryption

            let cleanBase64 = "";
            // Instagram adds hidden timestamps for screen readers which corrupts textContent.
            // We use Regex to strictly extract ONLY the base64 string after the ENC: prefix.
            const match = rawText.match(/ENC:\s*([A-Za-z0-9+/=]+)/);
            
            if (match && match[1].length > 10) {
                cleanBase64 = match[1];
            } else {
                // Fallback: If no prefix, just aggressively strip non-base64 characters
                cleanBase64 = rawText.replace(/[^A-Za-z0-9+/=]/g, "");
            }
            
            try {
                decryptBtn.style.opacity = '0.2';
                
                const decrypted = await decryptText(cleanBase64, currentPassword);
                if (decrypted) {
                    // Display the message in a guaranteed-visible overlay popup
                    const overlay = document.createElement('div');
                    overlay.style.position = 'fixed';
                    overlay.style.top = '50%';
                    overlay.style.left = '50%';
                    overlay.style.transform = 'translate(-50%, -50%)';
                    overlay.style.backgroundColor = '#ffffff';
                    overlay.style.padding = '24px';
                    overlay.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                    overlay.style.borderRadius = '16px';
                    overlay.style.zIndex = '9999999';
                    overlay.style.maxWidth = '400px';
                    overlay.style.minWidth = '250px';
                    overlay.style.color = '#000';
                    
                    overlay.innerHTML = `
                        <h3 style="margin-top:0; color: #166534; font-family: sans-serif; display: flex; align-items: center; gap: 8px;">
                            <span>🔓</span> Decrypted Message
                        </h3>
                        <p style="font-size: 16px; line-height: 1.5; font-family: sans-serif; word-wrap: break-word; margin: 16px 0;">
                            ${decrypted}
                        </p>
                        <button id="close-overlay-btn" style="width: 100%; padding: 10px; background: #0095f6; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px;">Close</button>
                    `;
                    
                    // Dim background
                    const backdrop = document.createElement('div');
                    backdrop.style.position = 'fixed';
                    backdrop.style.top = '0'; backdrop.style.left = '0'; backdrop.style.right = '0'; backdrop.style.bottom = '0';
                    backdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
                    backdrop.style.zIndex = '9999998';
                    
                    document.body.appendChild(backdrop);
                    document.body.appendChild(overlay);
                    
                    overlay.querySelector('#close-overlay-btn').addEventListener('click', () => {
                        overlay.remove();
                        backdrop.remove();
                    });
                    
                    // Update original button to green checkmark
                    decryptBtn.style.opacity = '1';
                    decryptBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="#166534"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
                    
                } else {
                    // Failed to decrypt
                    alert("❌ Decryption Failed!\n\nCheck if your Extension Password exactly matches the sender's password.");
                    decryptBtn.style.opacity = '1';
                    decryptBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="red"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
                    setTimeout(() => {
                        if (decryptBtn.parentNode) decryptBtn.remove();
                    }, 4000);
                }
            } catch (err) {
                console.error("Decryption error:", err);
                decryptBtn.style.opacity = '1';
            }
        });
        
        // Append inside the message element at the end of the text
        el.appendChild(decryptBtn);
    });
}

// Debounce function to prevent performance issues from MutationObserver
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const handleMutations = debounce(() => {
    // Temporarily disconnect to avoid infinite loops when we modify the DOM
    observer.disconnect();
    try {
        injectEncryptButton();
        processMessages();
    } finally {
        observer.observe(document.body, { childList: true, subtree: true });
    }
}, 250);

// Set up MutationObserver to watch for DOM changes
const observer = new MutationObserver(handleMutations);

// Start observing the body
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
setTimeout(() => {
    injectEncryptButton();
    processMessages();
}, 2000);
