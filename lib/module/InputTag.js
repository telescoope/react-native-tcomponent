function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { isEmpty, isUndefined } from 'lodash';
import { connect } from 'react-redux';
import { slug, findArrayName } from 'tcomponent';
import TagInput from 'react-native-tags-input';

class InputTag extends Component {
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
      const listTags = values.map(val => /*#__PURE__*/React.createElement(View, {
        style: this.props.tagsStyle ? this.props.tagsStyle : styles.defaultTag
      }, /*#__PURE__*/React.createElement(Text, {
        style: this.props.tagTextStyle
      }, val)));
      return /*#__PURE__*/React.createElement(View, {
        style: this.props.column ? styles.column : styles.row
      }, listTags);
    }

    return /*#__PURE__*/React.createElement(TagInput, {
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

const styles = StyleSheet.create({
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
      key: slug(String(key), '_'),
      value: val
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(InputTag);
//# sourceMappingURL=InputTag.js.map