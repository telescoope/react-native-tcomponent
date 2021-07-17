import React from 'react';

import { View, Text } from 'react-native';

import { ColorPicker, fromHsv } from 'react-native-color-picker';

import { isEmpty } from 'lodash';

import { connect } from 'react-redux';

import { slug, findArrayName } from 'tcomponent';

class InputColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      props_name: this.props.name ? slug(String(this.props.name), '_') : '',
    };

    this.onColorChange = this.onColorChange.bind(this);
  }

  onColorChange(data) {
    const value = fromHsv(data).toUpperCase();

    this.props.setInput(this.state.props_name, value);

    this.setState({ value });
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
      let value = this.props.value || '';

      this.setState({ value });
    }
  }

  render() {
    if (this.props.disabled || this.props.isReadonly) {
      return (
        <Text style={{ color: this.state.value }}>
          {!isEmpty(this.state.value) && this.state.value}
        </Text>
      );
    }

    return (
      <ColorPicker
        {...this.props}
        color={this.state.value}
        onColorChange={this.onColorChange}
        // onColorSelected={color => alert(`Color selected: ${color}`)}
        //   onOldColorSelected={color => alert(`Old color selected: ${color}`)}
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

export default connect(mapStateToProps, mapDispatchToProps)(InputColor);
