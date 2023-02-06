import { html, render } from './node_modules/lit-html/lit-html.js';
import { classMap } from './node_modules/lit-html/directives/class-map.js';

const btnTemplate = ({text, type}) => html`
<link rel="stylesheet" href="./style.css">
<button class=${classMap({
  btn: true, 
  primary: type == 'primary',
  accent: type == 'accent',
  warn: type == 'warn'
})}>${text}</button>`;

class FancyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.state = {
      text: this.textContent,
      type: this.getAttribute('type')
    };
  }

  connectedCallback() {
    render(btnTemplate(this.state), this.shadowRoot);
  }
}

customElements.define('fancy-button', FancyButton);