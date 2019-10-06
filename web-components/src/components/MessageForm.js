const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            width: 100%;
        }

        input[type=submit] {
            visibility: collapse;
        }

        .result{
          display: flex;
          flex-direction: column;
        }

        .left{
          display: flex;
          justify-content: flex-end;
        }

        .right{
          display: flex;
          justify-content: flex-start;
        }

        .message-field{
          min-width: 20%;
          border-style: 1px solid rgb(223, 190, 255);
          border-radius: 8px;

          background-color: rgb(223, 190, 255);
        }

        .message-input {
          display: flex;
          flex-direction: column;
        }

    </style>
    <form>
        <div class="result"></div>
        <div class="message-input">
          <form-input name="message-text" placeholder="Сообщение"></form-input>
        </div>
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

    // Чение сообщение из local storage
    this.msgCount = 0; // кол-во сообщений

    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      try {
        // unmarshal'им в обьект (время, текст, автор)
        const obj = JSON.parse(localStorage.getItem(key));
        this.createMessage(obj.text, obj.time, true);
        this.msgCount += 1;
      } catch {
        console.log('Can not unmarshal from JSON');
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const msgData = {};
    msgData.text = this.$input.value;
    msgData.author = 'me';

    const now = new Date();
    msgData.time = `${now.getHours()}:${now.getMinutes()}`;

    this.msgCount += 1;
    this.createMessage(msgData.text, msgData.time, true);
    localStorage.setItem(this.msgCount, JSON.stringify(msgData));
  }

  // отрисовка сообщения на странице
  createMessage(text, time, left) {
    const msgPosition = document.createElement('div');
    if (left === true) {
      msgPosition.className = 'left';
    } else {
      msgPosition.className = 'right';
    }
    this.$message.appendChild(msgPosition);

    const msgField = document.createElement('div');
    msgField.className = 'message-field';
    msgPosition.appendChild(msgField);

    const msgText = document.createElement('div');
    msgText.className = 'message-field-text';
    msgText.innerText = text;
    msgField.appendChild(msgText);

    const msgTime = document.createElement('div');
    msgTime.className = 'message-field-time';
    msgTime.innerText = time;
    msgField.appendChild(msgTime);
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
