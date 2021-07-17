"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _reactNative = require("react-native");

var _lodash = require("lodash");

var _reactRedux = require("react-redux");

var _tcomponent = require("tcomponent");

var _reactNativeModalDatetimePicker = _interopRequireDefault(require("react-native-modal-datetime-picker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InputTime extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "open", () => {
      this.props.setModal(this.state.prefix, !this.props.modal[this.state.prefix]);
    });

    _defineProperty(this, "cancel", () => {
      this.props.setModal(this.state.prefix, false);
    });

    _defineProperty(this, "onChange", date => {
      const value = (0, _moment.default)(date).isValid() ? (0, _moment.default)(date).format('HH:mm:ss') : null;
      this.props.setInput(this.state.props_name, value);
      this.setState({
        value: (0, _moment.default)().format('YYYY-MM-DD') + ' ' + value
      });
      this.props.setModal(this.state.prefix, false);
    });

    const props_name = this.props.name ? (0, _tcomponent.slug)(String(this.props.name), '_') : '';
    this.state = {
      prefix: 'modal_time_picker_' + props_name,
      value: this.props.value || new Date(),
      props_name
    };
    this.cancel = (0, _lodash.debounce)(this.cancel, 500);
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      if ((0, _tcomponent.findArrayName)(this.state.props_name, this.props.input) != (0, _tcomponent.findArrayName)(this.state.props_name, prevProps.input) && (0, _tcomponent.findArrayName)(this.state.props_name, this.props.input) != this.state.value) {
        const value = (0, _moment.default)(this.props.input[this.state.props_name]).isValid() ? (0, _moment.default)(this.props.input[this.state.props_name]).format('HH:mm:ss') : null;
        this.setState({
          value: (0, _moment.default)().format('YYYY-MM-DD') + ' ' + value
        });
        this.props.setModal(this.state.prefix, false);
      }
    } catch (e) {}

    if (this.props.value && prevProps.value != this.props.value) {
      const value = (0, _moment.default)(this.props.value).isValid() ? (0, _moment.default)(this.props.value).format('HH:mm:ss') : null;
      this.setState({
        value: (0, _moment.default)().format('YYYY-MM-DD') + ' ' + value
      });
    }
  }

  render() {
    const isi = (0, _moment.default)(this.state.value).isValid() ? (0, _moment.default)(this.state.value).format('HH:mm:ss') : '';

    if (this.props.disabled || this.props.isReadonly) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, isi);
    }

    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Button, {
      onPress: this.open,
      title: "Open"
    })), /*#__PURE__*/_react.default.createElement(_reactNativeModalDatetimePicker.default, {
      isVisible: this.props.modal[this.state.prefix],
      date: (0, _moment.default)(this.state.value).toDate(),
      mode: "time",
      onConfirm: this.onChange,
      onCancel: this.cancel
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, isi));
  }

}

const mapStateToProps = state => ({
  input: state.core.input || {},
  modal: state.core.modal || {}
});

const mapDispatchToProps = dispatch => ({
  setInput: (key, val) => dispatch({
    type: 'SET_INPUT',
    payload: {
      key: (0, _tcomponent.slug)(String(key), '_'),
      value: val
    }
  }),
  setModal: (key, val) => dispatch({
    type: 'SET_MODAL',
    payload: {
      key: (0, _tcomponent.slug)(String(key), '_'),
      value: val
    }
  })
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(InputTime);

exports.default = _default;
//# sourceMappingURL=InputTime.js.map