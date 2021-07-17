import React, { Component } from 'react';

import { TextInput, Text } from 'react-native';

import { isEmpty, isUndefined } from 'lodash';

import { connect } from 'react-redux';

import { slug, findArrayName } from 'tcomponent';

class InputNumber extends Component {
  constructor(props) {
    super(props);

    let default_placeholder = this.props.placeholder;

    this.state = {
      height: 0,
      placeholder: default_placeholder,
      value: '',
      props_name: this.props.name ? slug(String(this.props.name), '_') : '',
    };
  }

  
  componentDidUpdate(prevProps, prevState) {
    try {
      if (
        findArrayName(this.state.props_name, this.props.input) !=
          findArrayName(this.state.props_name, prevProps.input) &&
        findArrayName(this.state.props_name, this.props.input) !=
          this.state.value
      ) {
        let value = this.props.input[this.state.props_name] || '';

        this.setState({ value });
      }
    } catch (e) {}

    if (this.props.value && prevProps.value != this.props.value) {
      alert("ch")
      let value = this.props.input[this.state.props_name] || 0;

      this.setState({ value });
     
    }
  }


  validate_min_max(val, min = 0, max = 100) {
    if (this.props.enableNegative && val < 0) {
      min = -max
    }

    if (isNaN(val)) {
      val = min
    }

    val = parseFloat(val)

    if (val >= max) {
      val = max
    } else if (val <= min) {
      val = min
    }
    return val ? Number(val) : null
  }

  handleInputChange = (value) => {
    let data = value ? value : '';

    if(this.props.numberOnly){
      data = data.replace(/[^0-9]/g, '')
    }

    let min = this.props.minValue ? Number(this.props.minValue) : null

    let max = this.props.maxValue ? Number(this.props.maxValue) : null

    if (max && min) {
      data = this.validate_min_max(data, min, max)
    } else if (!max && min) {
      data = this.validate_min_max(data, min, 999999999999)
    } else if (max && !min) {
      data = this.validate_min_max(data, 0, max)
    }

    this.props.setInput(this.state.props_name, data);

    console.log(new Intl.NumberFormat().format(data).toString())

    this.setState({ value: data});
    
  };

  onContentSizeChange = (event) => {
    this.setState({ height: event.nativeEvent.contentSize.height });
  };

  render() {
    // console.log(this.props,this.state.value)

    if (this.props.disabled || this.props.isReadonly) {
      return <Text>{!isEmpty(this.state.value) && this.state.value}</Text>;
    }

    let style = this.props.style;

    // let multiline = false;

    if (this.props.isResizable) {
      style = [
        { ...this.props.style },
        {
          height: Math.min(80, Math.max(35, this.state.height)),
        },
      ];
      // multiline = true;
    }

    // console.log(this.state.props_name, this.state.height);

    return (
      <TextInput
        {...this.props}
        editable={true}
        onContentSizeChange={this.onContentSizeChange}
        style={style}
        id={this.props.id}
        placeholder={this.state.placeholder}
        value={this.state.value.toString()}
        onChangeText={this.handleInputChange}
        name={this.state.props_name}
        keyboardType="numeric"
        
      />
    );
  }
}

const mapStateToProps = (state) => ({
  input: state.core.input || {},
});

const mapDispatchToProps = (dispatch) => ({
  setInput: (key, val) =>
    dispatch({
      type: 'SET_INPUT',
      payload: {
        key: slug(String(key), '_'),
        value: val,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputNumber);
