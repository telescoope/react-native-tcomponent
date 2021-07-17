"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _reactNative = require("react-native");

var _tcomponent = require("tcomponent");

var _InputFile = _interopRequireDefault(require("./InputFile"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import parse from 'html-react-parser';
class InputChoose extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "labelGenerate", option => {
      let label = [];

      if ((0, _lodash.isArray)(this.props.optionLabel)) {
        let separator = this.props.separator ? this.props.separator : ' | ';

        for (let i = 0; i <= this.props.optionLabel.length - 1; i++) {
          let isi = option[this.props.optionLabel[i]];
          label.push(isi);
        }
      } else {
        label.push(option[this.props.optionLabel]);
      }

      return label;
    });

    _defineProperty(this, "onChange", selectedOption => {
      if (!this.props.isReadonly && this.props.name) {
        try {
          if (this.props.isMultiple) {
            let current_val = this.state.defaultValue || [];
            let removed = false;
            let new_val = [];

            for (let i = 0; i < current_val.length; i++) {
              let isi = current_val[i];

              if (isi == selectedOption[this.props.optionValue]) {
                removed = true;
              } else {
                new_val.push(isi);
              }
            }

            if (!removed) {
              new_val.push(selectedOption[this.props.optionValue]);
            }

            this.props.setInput(this.props.name, new_val);
          } else {
            if (this.props.value) {
              val = this.props.value;
            } else {
              val = (0, _tcomponent.findArrayName)(this.props.name, this.props.input) || null;
            }

            if (val == selectedOption[this.props.optionValue]) {
              this.props.setInput(this.props.name, null);
            } else {
              this.props.setInput(this.props.name, selectedOption[this.props.optionValue]);
            }
          }
        } catch (e) {
          this.props.setInput(this.props.name, null);
        }
      }

      this.onRefresh();
    });

    this.state = {
      defaultValue: null
    }; // this.onRefresh = debounce(this.onRefresh.bind(this), 200);
  }

  onRefresh() {
    let val = null;
    let defaultValue = null;

    if (this.props.value) {
      val = this.props.value;
    } else {
      val = (0, _tcomponent.findArrayName)(this.props.name, this.props.input) || null;
    }

    if (val) {
      if (this.props.isMultiple) {
        defaultValue = [];

        for (let i = 0; i < this.props.options.length; i++) {
          for (let y = 0; y < val.length; y++) {
            let opt = this.props.options[i];
            let cur = val[y];

            if (String(opt[this.props.optionValue]) == String(cur)) {
              defaultValue.push(opt[this.props.optionValue]);
            }
          }
        }
      } else {
        defaultValue = (0, _lodash.find)(this.props.options, function (o) {
          return String(o[this.props.optionValue]) == String(val);
        }.bind(this));
      }
    }

    defaultValue = !(0, _lodash.isUndefined)(defaultValue) && !(0, _lodash.isNull)(defaultValue) ? defaultValue : null;
    this.setState({
      defaultValue
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!(0, _lodash.isEqual)((0, _tcomponent.findArrayName)(this.props.name, prevProps.input), (0, _tcomponent.findArrayName)(this.props.name, this.props.input)) && !(0, _lodash.isEqual)(this.state.defaultValue, (0, _tcomponent.findArrayName)(this.props.name, this.props.input))) {
      this.onRefresh();
    }
  }

  componentDidMount() {
    this.onRefresh();
  }

  render() {
    let options = [];

    try {
      options = this.props.options.length > 0 ? this.props.options : [];
    } catch (e) {}

    const isReadonly = this.props.disabled || this.props.isReadonly;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10
      }
    }, options.map(value => {
      let isChecked = false;

      try {
        if (this.props.isMultiple) {
          isChecked = (0, _lodash.includes)(this.state.defaultValue, value[this.props.optionValue]);
        } else {
          isChecked = (0, _lodash.isEqual)(value[this.props.optionValue], this.state.defaultValue[this.props.optionValue]);
        }
      } catch (e) {}

      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          paddingLeft: 8,
          paddingRight: 8
        },
        key: value[this.props.optionValue]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
        disabled: isReadonly,
        trackColor: {
          false: '#767577',
          true: '#81b0ff'
        },
        thumbColor: isReadonly ? '#767577' : '#f4f3f4',
        ios_backgroundColor: "#3e3e3e",
        onValueChange: this.onChange.bind(this, value),
        value: isChecked
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, this.labelGenerate(value).map((val, i) => {
        if ((0, _lodash.isEqual)(String(val).substring(0, 3), 'AT-')) {
          return /*#__PURE__*/_react.default.createElement(_InputFile.default, {
            value: val,
            isReadonly: true,
            preview: true
          });
        } else {
          return /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, val);
        }
      })));
    }));
  }

}

let mapStateToProps = state => ({
  input: state.core.input || {}
});

let mapDispatchToProps = dispatch => ({
  setInput: (key, val) => dispatch({
    type: 'SET_INPUT',
    payload: {
      key: (0, _tcomponent.slug)(String(key)),
      value: val
    }
  })
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(InputChoose);

exports.default = _default;
//# sourceMappingURL=InputChoose.js.map