class FancyButton extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({ mode: 'open' });
    var style = document.createElement('style');
    var button = document.createElement('button');
    style.innerText = `
      button {
        -webkit-appearance: none;
        display: inline-block;
        padding: 0 15px;
        line-height: 42px;
        text-align: center;
        text-transform: uppercase;
        border: 1px solid #ccc;
        border-radius: 3px;
        cursor: pointer;
        border-radius: 3px;
        box-shadow: 2px 2px 1px #eee;
        position: relative;
        overflow: hidden;
        color: #f33;
        transition: background 100ms ease-in;
      }
      button:hover {
        background: #a9a9a9;
      }`;

    if ( this.getAttribute('icon') !== null ) {
      style.innerText = `${style.innerText}
        button {
          position: relative;
          padding-right: 45px;
        }
        button-icon {
          width: 20px;
          position: absolute;
          top: 0;
          right: 15px;
          bottom: 0;
          overflow: hidden;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: center;
        }`;
      var filter = this.getAttribute('icon-filter');
      if ( filter !== null ) {
        style.innerText = `${style.innerText} button-icon { filter: ${filter} }`;
      }
      var clip = this.getAttribute('icon-clip');
      if ( clip !== null ) {
        style.innerText = `${style.innerText} button-icon { clip-path: ${clip} }`;
      }
      button.innerHTML = `<slot></slot><button-icon icon="${this.getAttribute('icon')}"></button-icon>`;
    } else {
      button.innerHTML = '<slot></slot>';
    }

    shadow.append(style, button);
  }
}
customElements.define('fancy-button', FancyButton);

class ButtonIcon extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({ mode: 'open' });
    var style = document.createElement('style');
    var img = document.createElement('img');
    style.innerText = `
    img {
      display: block;
      max-width: 100%;
      height: auto;
    }`;
    img.alt = 'Icon';
    img.src = this.getAttribute('icon');
    shadow.append(style,img);
  }
}
customElements.define('button-icon', ButtonIcon);
