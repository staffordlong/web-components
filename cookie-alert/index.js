class CookieAlert extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({ mode: 'open' });
    var style = document.createElement('style');
    var container = document.createElement('div');
    shadow.append(style, container);

    this.initStyle();
    this.initContent()
  }

  initStyle() {
    var style = this.shadowRoot.querySelector('style');
    var positionCSS = {};
    switch (this.getAttribute('position')) {
      case 'fixed':
        positionCSS = Object.assign({ position: 'fixed' }, this.coords);
        break;

      case 'absolute':
        positionCSS = Object.assign({ position: 'absolute' }, this.coords);
        break;
    }
    style.innerText = `p { margin: 0; } div { ${Object.keys(positionCSS).map((key, index) => {
      return `${key}: ${positionCSS[key]}`;
    }).join(';')}; width: ${this.width}; height: ${this.height}; background: white; font-size: 14px; border: 1px solid #e0e0e0; border-bottom: 3px solid #9999ff; padding: 5px 10px; }`;
  }

  initContent() {
    var container = this.shadowRoot.querySelector('div');
    container.innerHTML = `<slot></slot>`;
  }

  get coords() {
    var $el = this;

    var coords = {
      top: 'initial',
      right: 'initial',
      bottom: 'initial',
      left: 'initial',
    };

    Object.keys(coords).map((key, index) => {
      let value = $el.getAttribute(key);
      if ( value !== null ) {
        coords[key] = value;
      }
    });

    return coords;
  }

  get width() {
    return this.getAttribute('width') || 'initial';
  }

  get height() {
    return this.getAttribute('width') || 'initial';
  }
}

customElements.define('cookie-alert', CookieAlert);
