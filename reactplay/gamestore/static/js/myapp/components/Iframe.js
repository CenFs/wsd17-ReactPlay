const React = require('react');
const ReactDOM = require('react-dom');

module.exports = React.createClass({
  displayName: 'IFrame',

  propTypes: {
    src: React.PropTypes.string.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    onCloseFrame: React.PropTypes.func
  },

  componentDidMount() {
    // React does not work with onLoad events in iFrames yet
    // Because of the event delegation setters
    // https://github.com/facebook/react/issues/1718
    const iframe = ReactDOM.findDOMNode(this.refs.iframe);
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', () => {
        this._iFrameCloseRegister();
      });
    } else {
      iframe.onload = () => {
        this._iFrameCloseRegister();
      };
    }
  },

  _iFrameCloseRegister() {
    const element = ReactDOM.findDOMNode(this.refs.iframe);
    if (element &&
      element.contentWindow &&
      element.contentWindow.registerClose) {
      element.contentWindow.registerClose((options) => {
        this.props.onCloseFrame(options);
      });
    }
  },

  render: function() {
    const src = this.props.src;
    const width = this.props.width || null;
    const height = this.props.height || null;

    return (
      <iframe ref='iframe'
        src={src}
        width={width}
        height={height}
        seamless
        onLoad={this._iFrameCloseRegister} />
    );
  }
});