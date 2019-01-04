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
    switch (this.getAttribute('position') || 'fixed-top') {
      case 'fixed-top':
        positionCSS = {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0
        };
        break;

      case 'fixed-bottom':
        positionCSS = {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        };
        break;

      case 'fixed-coords':
        positionCSS = Object.assign({ position: 'fixed' }, this.coords);
    }
    style.innerText = `div { ${Object.keys(positionCSS).map((key, index) => {
      return `${key}: ${positionCSS[key]}`;
    }).join(';')}; width: ${this.width}; height: ${this.height}; background: white; font-size: 14px; font-weight: 500; }`;
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
