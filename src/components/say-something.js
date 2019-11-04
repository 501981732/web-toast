const template = document.createElement('template');

template.innerHTML = `
  <style>
    p {
      color: #fff;
      font-size: 14px;
      border-radius: 20px;
      padding: 5px;
    }
  </style>

  <h2>Hello: <span>World</span></h2>
`;

class SaySomething extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$headline = this._shadowRoot.querySelector('h2');
    this.$span = this._shadowRoot.querySelector('span');
  }

  connectedCallback() {
    if(!this.hasAttribute('color')) {
      this.setAttribute('color', 'orange');
    }

    if(!this.hasAttribute('text')) {
      this.setAttribute('text', '');
    }
    if(!this.hasAttribute('title')) {
      this.setAttribute('title', '');
    }
    console.log('init')
    this._render();
  }

  static get observedAttributes() {
    return ['color', 'text','title'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(name)
    switch(name) {
      case 'color':
        this._color = newVal;
        break;
      case 'text':
        this._text = newVal;
        break;
      case 'title':
        this._title = newVal;
        break;
    };

    this._render();
  }

  _render() {
    console.log('333')
    this.$headline.style.color = this._color;
    this.$span.innerHTML = this._text;
    this.$span.title = this._title;
    // this.$span.setAttribute('title',this._title)
  }
}

window.customElements.define('say-something', SaySomething);
