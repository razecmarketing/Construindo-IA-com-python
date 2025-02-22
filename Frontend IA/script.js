class ChatBot {
  constructor() {
    this.chatMessages = document.getElementById('chat-messages');
    this.messageInput = document.getElementById('message-input');
    this.sendButton = document.getElementById('send-button');
    this.setupEventListeners();
    this.questions = [
      "Qual é o seu nome? 😊",
      "Quantos anos você tem? 🎂",
      "Quanto você pesa? 🏋️‍♂️",
      "Se você pudesse viajar para qualquer lugar agora, para onde iria? 🌎✈️",
      "Qual foi a coisa mais engraçada que aconteceu com você recentemente? 😂",
      "Se tivesse que escolher um superpoder, qual seria? 🦸‍♂️"
    ];
    this.currentQuestion = 0;
    this.userData = {};
    
    // Enviar primeira mensagem após 1 segundo
    setTimeout(() => this.sendBotMessage("Olá! Vamos bater um papo? 🤪"), 1000);
    setTimeout(() => this.sendBotMessage(this.questions[0]), 2000);
  }

  setupEventListeners() {
    this.sendButton.addEventListener('click', () => this.handleUserMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserMessage();
    });
  }

  async handleUserMessage() {
    const message = this.messageInput.value.trim();
    if (!message) return;

    this.messageInput.value = '';
    this.addMessage(message, 'user');

    await this.processUserResponse(message);
  }

  async processUserResponse(message) {
    if (message.toLowerCase() === 'tchau') {
      this.sendBotMessage("Ah, já vai? Foi bom conversar com você! Até mais! 👋🤖💫");
      return;
    }

    switch(this.currentQuestion) {
      case 0:
        this.userData.name = message;
        await this.delay(1000);
        this.sendBotMessage(`Haha, ${message} é um nome muito bonito! 🌟\nJá pensei em chamar meu próximo robozinho assim. 🤖✨`);
        break;
      case 1:
        this.userData.age = message;
        await this.delay(1000);
        this.sendBotMessage(`${message} anos? Tá na flor da idade, hein?! 😂🎉\nAproveita, porque o tempo voa mais rápido que uma nave espacial! 🚀💫`);
        break;
      case 2:
        this.userData.weight = message;
        await this.delay(1000);
        this.sendBotMessage(`Hmm... ${message} kg? O que? Já pensou em emagrecer? 🤔\nTá doido viu! O importante é ter saúde mesmo! 😆💪`);
        break;
      case 3:
        await this.delay(1000);
        this.sendBotMessage("Haha, boa escolha! Já tô imaginando a cena! 😆🌴✈️");
        break;
      case 4:
        await this.delay(1000);
        this.sendBotMessage("Caramba, essa foi inesperada! Adorei! 🤣👏");
        break;
      case 5:
        await this.delay(1000);
        this.sendBotMessage("Muito criativo! Você tem uma mente brilhante! 🧠✨");
        await this.delay(1000);
        this.sendBotMessage("Adorei nosso papo! Vamos continuar outro dia.\nAté mais! 🚀🤖💫");
        return;
    }

    this.currentQuestion++;
    if (this.currentQuestion < this.questions.length) {
      await this.delay(1000);
      this.sendBotMessage(this.questions[this.currentQuestion]);
    }
  }

  addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = 'Agora';
    
    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(messageTime);
    
    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  sendBotMessage(message) {
    this.addMessage(message, 'bot');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Iniciar o chat bot quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
  new ChatBot();
});