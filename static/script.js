function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    if (userInput.trim() === "") return;

    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        botMessage.textContent = data.response;
        chatBox.appendChild(botMessage);
        document.getElementById('user-input').value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// ✅ Add this block to trigger sendMessage() when Enter key is pressed
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();  // Prevent default Enter behavior
        sendMessage();       // Call the function to send the message
    }
});
