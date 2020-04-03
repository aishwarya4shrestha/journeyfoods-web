import * as React from 'react';
import Portal from './Portal';
// import classnames from 'classnames';
import Spinner from './SVG/Spinner';

export interface ILoaderProps {
  colorclassname?: string;
  isFixed?: boolean;
  isInline?: boolean;
}

/**
 * Relative to current area or fix to whole screen
 * Relative to current area will not have Portal Feature. Need to work on it
 *
 * @param {string} colorclassname
 * @param {boolean} isFixed - is relative to current area or fixed to screen
 * @param {boolean} isInline - is relative to parent or inline. Only use this when isFixed is false
 */
export default class Loader extends React.Component<ILoaderProps> {
  static defaultProps = {
    isFixed: false,
    isInline: true,
    colorclassname: 'teal'
  };
  render() {
    if (!this.props.isFixed) {
      if (this.props.isInline) {
        return (
          <div className="loader">
            <Spinner className={this.props.colorclassname} />
          </div>
        );
      } else {
        return (
          <div className="page-loader" style={{ height: '100%', width: '100%', background: 'rgba(0,0,0,0.1)' }}>
            <Spinner className={this.props.colorclassname} />
          </div>
        );
      }
    }
    return (
      <Portal>
        <div className="page-loader">
          <Spinner className={this.props.colorclassname} />
        </div>
        {/* <Backdrop isOpen={true} /> */}
      </Portal>
    );
  }
}

/**
 *
 * Backdrop for the spinner
 * Relative when backdrop is relative to specific area only
 * Fix when backdrop cover all the area of the screen
 * @param {boolean} isOpen - Open Backdrop. Part of props
 * @param {boolean} isAbsolute -  Relative to area or fix to the screen
 *
 */

//  // @todo: work on relative backdrop feature
// const Backdrop: React.SFC<{isOpen?:boolean, isAbsolute?: boolean}> = (props) => {
//     return (
//         <div className={classnames("modal-backdrop fade", {show: props.isOpen})}></div>
//     );
// }
