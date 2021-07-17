"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeColorPicker = require("react-native-color-picker");

var _lodash = require("lodash");

var _reactRedux = require("react-redux");

var _tcomponent = require("tcomponent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class InputColor extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      props_name: this.props.name ? (0, _tcomponent.slug)(String(this.props.name), '_') : ''
    };
    this.onColorChange = this.onColorChange.bind(this);
  }

  onColorChange(data) {
    const value = (0, _reactNativeColorPicker.fromHsv)(data).toUpperCase();
    this.props.setInput(this.state.props_name, value);
    this.setState({
      value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      if ((0, _tcomponent.findArrayName)(this.state.props_name, this.props.input) != (0, _tcomponent.findArrayName)(this.state.props_name, prevProps.input) && (0, _tcomponent.findArrayName)(this.state.props_name, this.props.input) != this.state.value) {
        let value = this.props.input[this.state.props_name] || '';
        this.setState({
          value
        });
      }
    } catch (e) {}

    if (this.props.value && prevProps.value != this.props.value) {
      let value = this.props.value || '';
      this.setState({
        value
      });
    }
  }

  render() {
    if (this.props.disabled || this.props.isReadonly) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: {
          color: this.state.value
        }
      }, !(0, _lodash.isEmpty)(this.state.value) && this.state.value);
    }

    return /*#__PURE__*/_react.default.createElement(_reactNativeColorPicker.ColorPicker, _extends({}, this.props, {
      color: this.state.value,
      onColorChange: this.onColorChange // onColorSelected={color => alert(`Color selected: ${color}`)}
      //   onOldColorSelected={color => alert(`Old color selected: ${color}`)}

    }));
  }

}

const mapStateToProps = state => ({
  input: state.core.input || {}
});

const mapDispatchToProps = dispatch => ({
  setInput: (key, val) => dispatch({
    type: 'SET_INPUT',
    payload: {
      key: (0, _tcomponent.slug)(String(key), '_'),
      value: val
    }
  })
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(InputColor);

exports.default = _default;
//# sourceMappingURL=InputColor.js.map