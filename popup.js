document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const saveBtn = document.getElementById('save-btn');
    const statusDiv = document.getElementById('status');

    // Load existing password if any
    chrome.storage.local.get(['p2p_password'], (result) => {
        if (result.p2p_password) {
            passwordInput.value = result.p2p_password;
        }
    });

    saveBtn.addEventListener('click', () => {
        const password = passwordInput.value;
        if (password.length < 4) {
            statusDiv.textContent = 'Password too short.';
            statusDiv.style.color = 'red';
            return;
        }

        chrome.storage.local.set({ 'p2p_password': password }, () => {
            statusDiv.textContent = 'Key saved successfully!';
            statusDiv.style.color = '#0095f6';
            setTimeout(() => {
                statusDiv.textContent = '';
            }, 2000);
        });
    });
});
