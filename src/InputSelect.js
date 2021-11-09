import React, { Component } from 'react';

import { 
  TextInput, 
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { isEmpty, isUndefined } from 'lodash';

import { connect } from 'react-redux';

import { slug, findArrayName } from 'tcomponent';

class InputSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: this.props.placeholder ? this.props.placeholder : 'Pilih',
      value: this.props.value,
      props_name: this.props.name ? slug(String(this.props.name), '_') : 'select',
      modalVisible: false
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   try {
  //     if (
  //       findArrayName(this.state.props_name, this.props.input) !=
  //         findArrayName(this.state.props_name, prevProps.input) &&
  //       findArrayName(this.state.props_name, this.props.input) !=
  //         this.state.value
  //     ) {
  //       let value = this.props.input[this.state.props_name] || '';

  //       this.setState({ value });
  //     }
  //   } catch (e) {}

  //   if (this.props.value && prevProps.value != this.props.value) {
  //     let value = this.props.value || '';

  //     this.setState({ value });
  //   }
  // }

  handleInputChange = (value) => {
    let data = value.id ? String(value.id) : '';
    let label = value.name ? String(value.name) : '';

    this.props.setInput(this.state.props_name, data);

    this.setState({ value: label });
    this.setModalVisible(!this.state.modalVisible)
  };

  render() {
    // console.log(this.state.value)

    if (this.props.isReadonly) {
      return (
      <View style={[styles.row, this.props.inputStyle]}>
        <Text>{!isEmpty(this.state.value) && this.state.value}</Text>
      </View>);
    }

    let style = this.props.style;

    return (
      <View>
        <Modal
          animationType="fade"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <TouchableOpacity  
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          style={styles.outer}>
            <View style={[styles.card, this.props.cardStyle]}>
              {this.props.options.map((value) => (
                <TouchableOpacity key={value.id} onPress={() => this.handleInputChange(value)}>
                  <Text style={this.props.itemStyle}>{value.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          style={[styles.row, this.props.inputStyle]}
          disabled={this.props.disabled}
        >
          {!isEmpty(this.state.value) ?
          <Text style={this.props.labelStyle} >
             {this.state.value}
          </Text>
          :
          <Text style={this.props.placeholderStyle}>
              {this.state.placeholder}
          </Text>
          }
          {this.props.rightElement &&
          <TouchableOpacity>
            {this.props.rightElement}
          </TouchableOpacity>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    zIndex: 1,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
})

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

export default connect(mapStateToProps, mapDispatchToProps)(InputSelect);
