function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { TextInput, Text } from 'react-native';
import { isEmpty, isUndefined } from 'lodash';
import { connect } from 'react-redux';
import { slug, findArrayName } from 'tcomponent';

class InputNumber extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleInputChange", value => {
      let data = value ? value : '';

      if (this.props.numberOnly) {
        data = data.replace(/[^0-9]/g, '');
      }

      let min = this.props.minValue ? Number(this.props.minValue) : null;
      let max = this.props.maxValue ? Number(this.props.maxValue) : null;

      if (max && min) {
        data = this.validate_min_max(data, min, max);
      } else if (!max && min) {
        data = this.validate_min_max(data, min, 999999999999);
      } else if (max && !min) {
        data = this.validate_min_max(data, 0, max);
      }

      this.props.setInput(this.state.props_name, data);
      console.log(new Intl.NumberFormat().format(data).toString());
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
    this.state = {
      height: 0,
      placeholder: default_placeholder,
      value: '',
      props_name: this.props.name ? slug(String(this.props.name), '_') : ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      if (findArrayName(this.state.props_name, this.props.input) != findArrayName(this.state.props_name, prevProps.input) && findArrayName(this.state.props_name, this.props.input) != this.state.value) {
        let value = this.props.input[this.state.props_name] || '';
        this.setState({
          value
        });
      }
    } catch (e) {}

    if (this.props.value && prevProps.value != this.props.value) {
      alert("ch");
      let value = this.props.input[this.state.props_name] || 0;
      this.setState({
        value
      });
    }
  }

  validate_min_max(val, min = 0, max = 100) {
    if (this.props.enableNegative && val < 0) {
      min = -max;
    }

    if (isNaN(val)) {
      val = min;
    }

    val = parseFloat(val);

    if (val >= max) {
      val = max;
    } else if (val <= min) {
      val = min;
    }

    return val ? Number(val) : null;
  }

  render() {
    // console.log(this.props,this.state.value)
    if (this.props.disabled || this.props.isReadonly) {
      return /*#__PURE__*/React.createElement(Text, null, !isEmpty(this.state.value) && this.state.value);
    }

    let style = this.props.style; // let multiline = false;

    if (this.props.isResizable) {
      style = [{ ...this.props.style
      }, {
        height: Math.min(80, Math.max(35, this.state.height))
      }]; // multiline = true;
    } // console.log(this.state.props_name, this.state.height);


    return /*#__PURE__*/React.createElement(TextInput, _extends({}, this.props, {
      editable: true,
      onContentSizeChange: this.onContentSizeChange,
      style: style,
      id: this.props.id,
      placeholder: this.state.placeholder,
      value: this.state.value.toString(),
      onChangeText: this.handleInputChange,
      name: this.state.props_name,
      keyboardType: "numeric"
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
      key: slug(String(key), '_'),
      value: val
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(InputNumber);
//# sourceMappingURL=InputNumber.js.map