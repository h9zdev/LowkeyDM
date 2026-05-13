// crypto_utils.js

// Derive a cryptographic key from a password
async function deriveKey(password) {
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );
    
    // We use a fixed salt for simplicity in this P2P scenario, 
    // although a random salt per session/user is better for security.
    const salt = encoder.encode("Instagram_P2P_Encryption_Salt_2026");

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
}

// Convert ArrayBuffer to Base64
function bufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Convert Base64 to ArrayBuffer
function base64ToBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

// Encrypt a string using a password
async function encryptText(text, password) {
    const key = await deriveKey(password);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();

    const encryptedContent = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encoder.encode(text)
    );

    // Combine IV and Encrypted Content
    const encryptedArray = new Uint8Array(encryptedContent);
    const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
    combinedArray.set(iv);
    combinedArray.set(encryptedArray, iv.length);

    return bufferToBase64(combinedArray.buffer);
}

// Decrypt a base64 string using a password
async function decryptText(base64Text, password) {
    try {
        const key = await deriveKey(password);
        const combinedBuffer = base64ToBuffer(base64Text);
        
        // Extract IV and Encrypted Content
        const iv = combinedBuffer.slice(0, 12);
        const encryptedContent = combinedBuffer.slice(12);

        const decryptedContent = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: new Uint8Array(iv)
            },
            key,
            encryptedContent
        );

        const decoder = new TextDecoder();
        return decoder.decode(decryptedContent);
    } catch (e) {
        console.error("Decryption failed:", e);
        return null;
    }
}

// Prefix for encrypted messages
const ENC_PREFIX = "🔒ENC:";
