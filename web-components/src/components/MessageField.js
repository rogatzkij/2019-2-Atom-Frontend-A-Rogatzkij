import messageFieldStyle from './style/message_field.css';

const template = document.createElement('template');
template.innerHTML = `
    <style>${messageFieldStyle.toString()}</style>
  
    <div class="message">
        <span class="message-content"></span>
        <div class="message-meta">
            <span class="meta-time"></span>
            <div class="meta-status"></div>
        </div>
    </div>
`;

class MessageField extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$message = this._shadowRoot.querySelector('.message');
    this.$messageText = this._shadowRoot.querySelector('.message-content');
    this.$messageTime = this._shadowRoot.querySelector('.meta-time');
    this.$readStatus = this._shadowRoot.querySelector('.meta-status');
  }

  static get observedAttributes() {
    return ['text', 'time', 'author', 'readen'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'text':
        this.$messageText.innerText = newValue;
        break;
      case 'time':
        this.$messageTime.innerText = newValue;
        break;
      case 'author':
        if (newValue === 'true') {
          this.$message.classList.add('author');
        }
        break;
      case 'readen':
        if (newValue === 'true') {
          this.$message.classList.add('readen');
        }
        break;
      default:
        console.log(`unknown attribute ${name}`);
    }
  }
}

customElements.define('msg-field', MessageField);
