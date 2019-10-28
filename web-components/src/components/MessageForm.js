import shadowStyles from './style/shadow.css';

const template = document.createElement('template');
template.innerHTML = `
    <style>${shadowStyles.toString()}</style>
    
    <form>
        <div class="page">
            <div class="header">head</div>
            
            <div class="content">
                <div class="message-box"></div>
            </div>

            <div class="footer">
                <div class="message-input">
                    <form-input name="message-text" placeholder="Сообщение"></form-input>
                    <div class="btn-send"></div>
                </div>
            </div>
        </div>
    </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$form = this._shadowRoot.querySelector('form');
    this.$input = this._shadowRoot.querySelector('form-input');
    this.$message = this._shadowRoot.querySelector('.message-box');

    this.$buttonSend = this.shadowRoot.querySelector('.btn-send');

    this.$buttonSend.addEventListener('click', this.onSubmit.bind(this));
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));

    this.KEY = 'me';

    // Чтение сообщение из local storage
    this.messageArchive = {}; // string --> array of object
    this.messageArchive[this.KEY] = [];

    const jsonData = localStorage.getItem('archive');
    if (jsonData !== null) {
      try {
        this.messageArchive = JSON.parse(jsonData);
      } catch {
        console.log('somthing was wrong');
      }
    }

    const curMsgArchive = this.messageArchive[this.KEY];

    for (let i = 0; i < curMsgArchive.length; i += 1) {
      const curMessage = curMsgArchive[i];

      const msg = document.createElement('msg-field');
      msg.setAttribute('text', curMessage.text);
      msg.setAttribute('time', curMessage.time);

      msg.setAttribute('author', 'true');
      msg.setAttribute('readen', 'true');

      this.$message.appendChild(msg);
    }
  }

  onSubmit(event) {
    event.preventDefault();

    // Не отправляем пустые сообщения
    if (this.$input.value === '') {
      return;
    }

    const msgData = {};
    msgData.text = this.$input.value;
    msgData.isAuthor = true;

    const now = new Date();
    msgData.time = `${now.getHours().toString()}:${now.getMinutes().toString().padStart(2, '0')}`;

    const curMsgArchive = this.messageArchive[this.KEY];
    curMsgArchive.push(msgData);
    this.messageArchive[this.KEY] = curMsgArchive;

    console.log(JSON.stringify(curMsgArchive));

    console.log(JSON.stringify(this.messageArchive));
    localStorage.setItem('archive', JSON.stringify(this.messageArchive));

    const msg = document.createElement('msg-field');
    msg.setAttribute('text', msgData.text);
    msg.setAttribute('time', msgData.time);

    msg.setAttribute('author', 'true');
    msg.setAttribute('readen', 'false');
    this.$message.appendChild(msg);

    // Очищаем поле ввода
    this.$input.value = '';
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
