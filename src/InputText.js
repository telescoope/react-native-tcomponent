import React, { Component } from 'react';

import { TextInput, Text } from 'react-native';

import { isEmpty, isUndefined } from 'lodash';

import { connect } from 'react-redux';

import { slug, findArrayName } from 'tcomponent';

class InputText extends Component {
  constructor(props) {
    super(props);

    let default_placeholder = this.props.placeholder;

    let option_summer = {};

    let options_cleave = {};

    let type = this.props.type ? String(this.props.type) : '';

    if (type.toLowerCase() == 'nik') {
      options_cleave = {
        delimiter: ' ',
        blocks: [2, 2, 2, 6, 4],
        numericOnly: true,
      };

      default_placeholder =
        this.props.placeholder || 'Nomor Induk Kependudukan';
    } else if (type.toLowerCase() == 'kip') {
      options_cleave = {
        delimiter: ' ',
        blocks: [4, 4, 4, 4],
      };

      default_placeholder = this.props.placeholder || 'Kartu Indonesia Pintar';
    } else if (type.toLowerCase() == 'npwp') {
      options_cleave = {
        delimiters: ['.', '.', '.', '-', '.'],
        blocks: [2, 3, 3, 1, 3, 3],
        numericOnly: true,
      };

      default_placeholder = this.props.placeholder || 'Nomor Pokok Wajib Pajak';
    } else if (type.toLowerCase() == 'postcode') {
      options_cleave = {
        blocks: [5],
        delimiter: ' ',
        numericOnly: true,
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

    type = type === 'text' || isUndefined(type) ? 'search' : type;

    this.state = {
      height: 0,
      type,
      placeholder: default_placeholder,
      options_cleave,
      value: this.props.value,
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
      let value = this.props.value || '';

      this.setState({ value });
    }
  }

  handleInputChange = (value) => {
    let data = value ? String(value) : '';

    if (
      this.state.type == 'nik' ||
      this.state.type == 'kip' ||
      this.state.type == 'npwp' ||
      this.state.type == 'postcode'
    ) {
      data = data.replace(/\D/g, '');
    }

    if (this.props.maxlength) {
      data = data.substring(0, this.props.maxlength);
    }

    this.props.setInput(this.state.props_name, data);

    this.setState({ value: data });
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

    let multiline = false;

    if (this.props.isResizable) {
      style = [
        { ...this.props.style },
        // {
        //   height: Math.min(80, Math.max(35, this.state.height)),
        // },
      ];
      multiline = true;
    }

    // console.log(this.state.props_name, this.state.height);

    return (
      <TextInput
        {...this.props}
        editable={true}
        multiline={multiline}
        onContentSizeChange={this.onContentSizeChange}
        style={style}
        id={this.props.id}
        type={this.state.type}
        placeholder={this.state.placeholder}
        value={this.state.value}
        onChangeText={this.handleInputChange}
        numberOfLines={this.props.numberOfLines}
        name={this.state.props_name}
        secureTextEntry={this.props.secureTextEntry}
        autoCapitalize={this.props.autoCapitalize}
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

export default connect(mapStateToProps, mapDispatchToProps)(InputText);
