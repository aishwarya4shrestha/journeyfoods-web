import * as React from 'react';
import { createPortal } from 'react-dom';

const appRoot = document.getElementById('modal') as HTMLElement;

export default class Portal<P> extends React.Component<P> {
  el: HTMLDivElement = document.createElement('div');

  // el: HTMLDivElement = null;
  constructor(props: any) {
    super(props);
    const newProps: any = {
      id: 'Modal',
      role: 'dialog'
    };
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    appRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    appRoot.removeChild(this.el);
  }
  render() {
    return createPortal(this.props.children, this.el);
  }
}
