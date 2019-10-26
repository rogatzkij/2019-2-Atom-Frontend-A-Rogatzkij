// import shadowStyles from '../shadow.css';

// console.log(shadowStyles.toString());

const template = document.createElement('template');
template.innerHTML = `
    
    <form>
        <div class="page">
            <div class="header">head</div>
            <div class="content">
                <div class="message-box">

                    <div class="message">
                        <span class="message-content">Бла бла</span>
                        <div class="message-meta">
                            <span class="meta-time">12:31</span>
                            <div class="meta-status"></div>
                        </div>
                    </div>

                </div>
            </div>
            
            <div class="footer">
                <div class="message-input">
                    <form-input name="message-text" placeholder="Сообщение"></form-input>
                </div>
            </div>
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
    this.$message = this.shadowRoot.querySelector('.message-box');

    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));

    // Чение сообщение из local storage
    this.msgCount = 0; // кол-во сообщений

    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      try {
        // unmarshal'им в обьект (время, текст, автор)
        const obj = JSON.parse(localStorage.getItem(key));
        this.createMessage(obj.text, obj.time, obj.isAuthor);
        this.msgCount += 1;
      } catch {
        // console.log('Can not unmarshal from JSON');
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const msgData = {};
    msgData.text = this.$input.value;
    msgData.isAuthor = true;

    const now = new Date();
    msgData.time = `${now.getHours()}:${now.getMinutes()}`;

    this.msgCount += 1;
    this.createMessage(msgData.text, msgData.time, true);
    localStorage.setItem(this.msgCount, JSON.stringify(msgData));

    this.$input.value = '';
  }

  // отрисовка сообщения на странице
  createMessage(text, time, isAuthor) {
    const msg = document.createElement('div');
    msg.classList.add('message');
    if (isAuthor) {
      msg.classList.add('author');
    }
    this.$message.appendChild(msg);

    const msgText = document.createElement('span');
    msgText.classList.add('message-content');
    msgText.innerText = text;
    msg.appendChild(msgText);

    const msgMeta = document.createElement('div');
    msgMeta.classList.add('message-meta');

    const metaTime = document.createElement('span');
    metaTime.classList.add('meta-time');
    metaTime.innerText = time;
    msgMeta.appendChild(metaTime);

    const metaStatus = document.createElement('div');
    metaStatus.classList.add('meta-status');
    msgMeta.appendChild(metaStatus);

    msg.appendChild(msgMeta);
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
