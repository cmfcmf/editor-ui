import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import Foo from './components/Foo/Foo.js';

class WebComponent extends HTMLElement {
  root;
  mountPoint;
  componentAttributes = {};
  componentProperties = {};

  connectedCallback() {
    console.log('connected')
    this.mountReactApp();
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }

  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, _oldVal, newVal) {
    console.log('attr changed')
    console.log(name, newVal)
    this.componentAttributes[name] = newVal;

    this.mountReactApp();
  }

  get menuItems() {
    // console.log('get menuitems')
    return this.componentProperties.menuItems;
  }

  set menuItems(newValue) {
    // update properties in the web componet via js calls from host app
    // see public/web-component/index.html
    console.log('menu items set')
    this.componentProperties.menuItems = newValue;

    this.mountReactApp();
  }

  reactProps() {
    return { ...this.componentAttributes, ...this.componentProperties };
  }

  mountReactApp() {
    // console.log('mount')
    if (!this.mountPoint) {
      console.log('no mountpoint')
      this.mountPoint = document.createElement('div');
      this.mountPoint.setAttribute("id", "root");
      this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
      this.root = ReactDOMClient.createRoot(this.mountPoint);
    }

    this.root.render(<Foo { ...this.reactProps() }/>);
  }
}

window.customElements.define('editor-wc', WebComponent);
