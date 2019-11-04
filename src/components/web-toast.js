const template = document.createElement('template');

template.innerHTML = `
  <style>
  :host {

  }
  span.open {
    opacity:1;
    visibility: visible;    
  }
  span {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity:0;
    background: rgba(0,0,0,.5);
    text-align: center;
    border-radius: 5px;
    display: inline-block;
    margin:0;
    color: #fff;
    font-size: 14px;
    padding: 2px 3px; 
    visibility: hidden;
    transition: all .8s;
  }
  </style>
  <span ><span>
`;

class WebToast extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$span = this._shadowRoot.querySelector('span');
        // Setup a click listener on itself
        this.addEventListener('click',this.close.bind(this))

        this.timer = null
    }
    close() {
        this._open = false
        this.$span.classList.remove('open');

        this.dispatchEvent(
            new CustomEvent('onClick', { state: this._open })
        );
    }
    // get open() {
    //     return this.hasAttribute('open')
    // }

    // set open(val) {
    //     if (val) {
    //         this.setAttribute('open',true)
    //     } else {
    //         // this.setAttribute('open',false)
    //         this.removeAttribute('open')
    //     }
    // }

    connectedCallback() {
        if(!this.hasAttribute('text')) {
            this.setAttribute('text', '');
        }
        this._render()
    }
    // 性能优化 检测某些特点属性
    static get observedAttributes() {
        return ['open', 'text'];
    }
    disconnectedCallback() {
       clearTimeout(this.timer)
    }

    attributeChangedCallback(name, oldVal, newVal) {
        switch(name) {
          case 'open':
            this._open = newVal;
            break;
          case 'text':
            this._text = newVal;
            break;
        };
        this._render();
      }

    _render() {
        clearTimeout(this.timer)
        if (this._open) {
            this.$span.classList.add('open')
            this.timer = setTimeout(() => {
                this.close()              
            }, 3000);
        } else {
            this.$span.className = ' ';
        }
        this.$span.innerHTML = this._text
    }
}
window.customElements.define('web-toast',WebToast)