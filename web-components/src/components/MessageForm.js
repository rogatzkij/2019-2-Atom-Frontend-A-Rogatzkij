const template = document.createElement('template');
template.innerHTML = `
    <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap&subset=cyrillic');

    body{
        margin: 0px;
        font-family: 'Roboto', sans-serif;
    }
    
    .page{
        display: flex;
        flex-direction: column;
        background-color: darkgreen;
    
        width: 100vw;
        height: 100vh;
    }
    
    .header{
        display: flex;
        flex-grow: 0;
        height: 80px;
        background-color: #8d24aa;
    }
    
    .content{
        display: flex;
        flex-grow: 1;
        overflow-y: scroll;
        flex-direction: column-reverse;
        height: 100vh;  
        background-color: #f8f8f8;
    }
    
    .content::-webkit-scrollbar{
        display: none;
    }
    
    .message-box{
        display: flex;
        flex-direction: column;
    
        padding-bottom: 5px;
        justify-content: flex-end;
        align-items: flex-start;
        width: 100%;
    }
    
    /* Сообщение */
    .message{
        display: flex;
        flex-direction: column;
        
        max-width: 60%;
        
        margin: 5px 10px 5px 10px;
        padding: 10px;
        background-color: #f3e6f5;
    
        border-radius: 4px;
        border: 1px solid #e7dce9;
        box-shadow: 0 0 5px #c2bcc37e;
    }
    
    .message > p{
        font-size: 20px;
    }
    
    .author{
        align-self: flex-end;
        background-color: #fff;
    }
    
    /* Текст сообщения */
    .message-content{
        /* Пренос слов */
        overflow-wrap: break-word;
    
        display: block;
    }
    
    /* Блок с временем и галочкой */
    .message-meta{
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
    }
    
    /* Время сообщения */
    .meta-time{
        display: inline;
        font-size: 14px;
    
        color: #918791;
    }
    
    /* Галочка у сообщения */
    .meta-status{
        display: none;
    
        margin-left: 5px;
        width: 10px;
        height: 10px;   
    }
    
    .author > .message-meta > .meta-status{
        display: inline-block;
    
        background: url(img/check.png) 100% 100% no-repeat; /* Добавляем фон */
        background-size: cover; /* Масштабируем фон */  
    }
    
    .readen > .message-meta > .meta-status{
        background: url(img/double_check.png) 100% 100% no-repeat; /* Добавляем фон */
        background-size: cover; /* Масштабируем фон */
    }
    
    
    .footer{
        display: flex;
        flex-grow: 0;
        height: 50px;
    
        background-color: coral;
    }
    </style>
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
