import './components/say-something.js';
import './components/fancy-button.js';
import './components/web-toast.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
  </style>

  <div>
    <h1>Web Components with Webpack Starter Kit</h1>

    Text: <input type="text" />

    <say-something color="red"></say-something>
    <fancy-button>222</fancy-button>

    <button id='toastbtn'>toast</button>
    <web-toast text='haha'></web-toast>
  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this._shadowRoot.querySelector('input');
    this.$btn = this._shadowRoot.querySelector('fancy-button');
    this.$input.addEventListener('input', this._handleChange.bind(this));
    this.$btn.addEventListener('click', this._handleChange2.bind(this));

    this.$allSaySomething = this._shadowRoot.querySelectorAll('say-something');

    this.$toastbtn = this._shadowRoot.querySelector('#toastbtn');
    this.$toast = this._shadowRoot.querySelector('web-toast');
    console.log( this.$toast)
    this.$toastbtn.addEventListener('click',(e) => {
      this.$toast.setAttribute('open',true)
    })
  }

  _handleChange() {
    this.$allSaySomething.forEach(element => {
      element.setAttribute('text', this.$input.value)
      element.setAttribute('title', this.$input.value)
    });
  }
  _handleChange2() {
    console.log(this)
  }
}

window.customElements.define('my-app', App);
