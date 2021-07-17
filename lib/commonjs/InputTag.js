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

var _reactNativeTagsInput = _interopRequireDefault(require("react-native-tags-input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InputTag extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "updateTagState", state => {
      this.setState({
        tags: state
      });
      console.log(this.state.tags);
      let new_val = [...this.state.tags.tagsArray];
      new_val.push(this.state.tags.tag);
      this.props.setInput(this.props.name, new_val);
    });

    this.state = {
      tags: {
        tag: '',
        tagsArray: []
      }
    };
  }

  render() {
    // console.log(this.props,this.state.value)
    if (this.props.isReadonly) {
      const values = this.props.input[this.props.name] || [];
      const listTags = values.map(val => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: this.props.tagsStyle ? this.props.tagsStyle : styles.defaultTag
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: this.props.tagTextStyle
      }, val)));
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: this.props.column ? styles.column : styles.row
      }, listTags);
    }

    return /*#__PURE__*/_react.default.createElement(_reactNativeTagsInput.default, {
      updateState: this.updateTagState,
      tags: this.state.tags,
      keysForTag: this.props.keysForTag,
      placeholder: this.props.placeholder,
      label: this.props.label,
      labelStyle: this.props.labelStyle,
      containerStyle: this.props.containerStyle,
      inputContainerStyle: this.props.inputContainerStyle,
      inputStyle: this.props.inputStyle,
      leftElement: this.props.leftElement,
      leftElementContainerStyle: this.props.leftElementContainerStyle,
      rightElement: this.props.rightElement,
      rightElementContainerStyle: this.props.rightElementContainerStyle,
      tagsViewStyle: this.props.tagsViewStyle,
      tagStyle: this.props.tagStyle ? this.props.tagStyle : styles.defaultTagInput,
      tagTextStyle: this.props.tagTextStyle,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
      autoCorrect: this.props.autoCorrect,
      disabled: this.props.disabled,
      disabledInputStyle: this.props.disabledInputStyle,
      deleteElement: this.props.deleteElement,
      deleteIconStyles: this.props.deleteIconStyles,
      customElement: this.props.customElement
    });
  }

}

const styles = _reactNative.StyleSheet.create({
  defaultTag: {
    backgroundColor: 'grey',
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    flexWrap: "wrap"
  },
  defaultTagInput: {
    backgroundColor: 'grey',
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    flexWrap: "wrap",
    height: '100%',
    paddingBottom: 0
  },
  row: {
    flexDirection: 'row',
    flexWrap: "wrap" // width: '100%'

  },
  column: {
    flexDirection: 'column'
  }
});

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

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(InputTag);

exports.default = _default;
//# sourceMappingURL=InputTag.js.map