import React from 'react';

import moment from 'moment';

import { View, Text, Button } from 'react-native';

import { debounce } from 'lodash';

import { connect } from 'react-redux';

import { slug, findArrayName } from 'tcomponent';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

class InputDateTime extends React.Component {
  constructor(props) {
    super(props);

    const props_name = this.props.name
      ? slug(String(this.props.name), '_')
      : '';

    this.state = {
      prefix: 'modal_datetime_picker_' + props_name,
      value: this.props.value || new Date(),
      props_name,
    };

    this.cancel = debounce(this.cancel, 500);
  }

  open = () => {
    this.props.setModal(
      this.state.prefix,
      !this.props.modal[this.state.prefix]
    );
  };

  cancel = () => {
    this.props.setModal(this.state.prefix, false);
  };

  onChange = (date) => {
    const value = moment(date).isValid()
      ? moment(date).format('YYYY-MM-DD HH:mm:ss')
      : null;

    this.props.setInput(this.state.props_name, value);

    this.setState({ value });

    this.props.setModal(this.state.prefix, false);
  };

  componentDidUpdate(prevProps, prevState) {
    try {
      if (
        findArrayName(this.state.props_name, this.props.input) !=
          findArrayName(this.state.props_name, prevProps.input) &&
        findArrayName(this.state.props_name, this.props.input) !=
          this.state.value
      ) {
        const value = moment(this.props.input[this.state.props_name]).isValid()
          ? moment(this.props.input[this.state.props_name]).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          : null;

        this.setState({ value });

        this.props.setModal(this.state.prefix, false);
      }
    } catch (e) {}

    if (this.props.value && prevProps.value != this.props.value) {
      const value = moment(this.props.value).isValid()
        ? moment(this.props.value).format('YYYY-MM-DD HH:mm:ss')
        : null;

      this.setState({ value });
    }
  }

  render() {
    const isi = moment(this.state.value).isValid()
      ? moment(this.state.value).format('DD-MM-YYYY HH:mm:ss')
      : '';

    if (this.props.disabled || this.props.isReadonly) {
      return <Text>{isi}</Text>;
    }

    return (
      <View>
        <View>
          <Button onPress={this.open} title="Open" />
        </View>
        <DateTimePickerModal
          isVisible={this.props.modal[this.state.prefix]}
          date={moment(this.state.value).toDate()}
          mode="datetime"
          onConfirm={this.onChange}
          onCancel={this.cancel}
        />
        <Text>{isi}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  input: state.core.input || {},
  modal: state.core.modal || {},
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
  setModal: (key, val) =>
    dispatch({
      type: 'SET_MODAL',
      payload: {
        key: slug(String(key), '_'),
        value: val,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputDateTime);
