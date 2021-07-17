"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _lodash = require("lodash");

var _reactRedux = require("react-redux");

var _tcomponent = require("tcomponent");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InputYear extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleInputChange", value => {
      let data = value ? String(value) : '';

      if (this.state.type == 'nik' || this.state.type == 'kip' || this.state.type == 'npwp' || this.state.type == 'postcode') {
        data = data.replace(/\D/g, '');
      }

      if (this.props.maxlength) {
        data = data.substring(0, this.props.maxlength);
      }

      this.props.setInput(this.state.props_name, data);
      this.setState({
        value: data
      });
    });

    _defineProperty(this, "onContentSizeChange", event => {
      this.setState({
        height: event.nativeEvent.contentSize.height
      });
    });

    let default_placeholder = this.props.placeholder;
    let option_summer = {};
    let options_cleave = {};
    let type = this.props.type ? String(this.props.type) : '';

    if (type.toLowerCase() == 'nik') {
      options_cleave = {
        delimiter: ' ',
        blocks: [2, 2, 2, 6, 4],
        numericOnly: true
      };
      default_placeholder = this.props.placeholder || 'Nomor Induk Kependudukan';
    } else if (type.toLowerCase() == 'kip') {
      options_cleave = {
        delimiter: ' ',
        blocks: [4, 4, 4, 4]
      };
      default_placeholder = this.props.placeholder || 'Kartu Indonesia Pintar';
    } else if (type.toLowerCase() == 'npwp') {
      options_cleave = {
        delimiters: ['.', '.', '.', '-', '.'],
        blocks: [2, 3, 3, 1, 3, 3],
        numericOnly: true
      };
      default_placeholder = this.props.placeholder || 'Nomor Pokok Wajib Pajak';
    } else if (type.toLowerCase() == 'postcode') {
      options_cleave = {
        blocks: [5],
        delimiter: ' ',
        numericOnly: true
      };
      default_placeholder = this.props.placeholder || 'Kode Pos';
    } else if (type.toLowerCase() == 'phone') {
      /*
      options_cleave = {
        delimiter: ' ',
        blocks: [4, 4, 4, 1],
        numericOnly: true
      }
      */
      default_placeholder = this.props.placeholder || 'Telepon';
    }

    type = type === 'text' || (0, _lodash.isUndefined)(type) ? 'search' : type;
    this.state = {
      height: 0,
      type,
      placeholder: default_placeholder,
      options_cleave,
      value: this.props.value,
      props_name: this.props.name ? (0, _tcomponent.slug)(String(this.props.name), '_') : ''
    };
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
    // console.log(this.props,this.state.value)
    if (this.props.disabled || this.props.isReadonly) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, !(0, _lodash.isEmpty)(this.state.value) && this.state.value);
    }

    let style = this.props.style;
    let multiline = false;

    if (this.props.isResizable) {
      style = [{ ...this.props.style
      }, {
        height: Math.min(80, Math.max(35, this.state.height))
      }];
      multiline = true;
    } // console.log(this.state.props_name, this.state.height);


    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "Under Development");
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

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(InputYear);

exports.default = _default;
//# sourceMappingURL=InputYear.js.map