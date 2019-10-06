const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            width: 100%;
        }

        .result {
            color: red;
        }

        input[type=submit] {
            visibility: collapse;
        }
    </style>
    <form>
        <div class="result"></div>
        <form-input name="message-text" placeholder="Введите сообщеине"></form-input>
    </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this.shadowRoot.querySelector('form');
    this.$input = this.shadowRoot.querySelector('form-input');
    this.$message = this.shadowRoot.querySelector('.result');

    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));

    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      try {
        const obj = JSON.parse(localStorage.getItem(key));
        const time = Date(key);

        const msgField = document.createElement('div');
        msgField.className = 'message-field';
        this.$message.appendChild(msgField);

        const msgText = document.createElement('div');
        msgText.className = 'message-field-text';
        msgText.innerText = obj.text;
        msgField.appendChild(msgText);

        const msgTime = document.createElement('div');
        msgTime.className = 'message-field-time';
        msgTime.innerText = time.toString();
        msgField.appendChild(msgTime);

        // alert(`${key}: ${obj.text}`);
      } catch {
        console.log('=(');
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const now = Date.now();

    const msgField = document.createElement('div');
    msgField.className = 'message-field';
    this.$message.appendChild(msgField);

    const msgText = document.createElement('div');
    msgText.className = 'message-field-text';
    msgText.innerText = this.$input.value;
    msgField.appendChild(msgText);

    const msgTime = document.createElement('div');
    msgTime.className = 'message-field-time';
    msgTime.innerText = now.toString();
    msgField.appendChild(msgTime);

    const msgData = {};
    msgData.text = this.$input.value;
    msgData.author = 'me';

    localStorage.setItem(now.toString(), JSON.stringify(msgData));
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
