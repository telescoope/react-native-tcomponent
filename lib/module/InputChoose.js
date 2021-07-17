function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { debounce, isEmpty, find, isUndefined, isNull, isArray, isEqual, includes } from 'lodash';
import { View, Text, Switch } from 'react-native';
import { findArrayName, slug } from 'tcomponent';
import InputFile from './InputFile';
import { connect } from 'react-redux'; // import parse from 'html-react-parser';

class InputChoose extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "labelGenerate", option => {
      let label = [];

      if (isArray(this.props.optionLabel)) {
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
              val = findArrayName(this.props.name, this.props.input) || null;
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
      val = findArrayName(this.props.name, this.props.input) || null;
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
        defaultValue = find(this.props.options, function (o) {
          return String(o[this.props.optionValue]) == String(val);
        }.bind(this));
      }
    }

    defaultValue = !isUndefined(defaultValue) && !isNull(defaultValue) ? defaultValue : null;
    this.setState({
      defaultValue
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(findArrayName(this.props.name, prevProps.input), findArrayName(this.props.name, this.props.input)) && !isEqual(this.state.defaultValue, findArrayName(this.props.name, this.props.input))) {
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
    return /*#__PURE__*/React.createElement(View, {
      style: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10
      }
    }, options.map(value => {
      let isChecked = false;

      try {
        if (this.props.isMultiple) {
          isChecked = includes(this.state.defaultValue, value[this.props.optionValue]);
        } else {
          isChecked = isEqual(value[this.props.optionValue], this.state.defaultValue[this.props.optionValue]);
        }
      } catch (e) {}

      return /*#__PURE__*/React.createElement(View, {
        style: {
          paddingLeft: 8,
          paddingRight: 8
        },
        key: value[this.props.optionValue]
      }, /*#__PURE__*/React.createElement(Switch, {
        disabled: isReadonly,
        trackColor: {
          false: '#767577',
          true: '#81b0ff'
        },
        thumbColor: isReadonly ? '#767577' : '#f4f3f4',
        ios_backgroundColor: "#3e3e3e",
        onValueChange: this.onChange.bind(this, value),
        value: isChecked
      }), /*#__PURE__*/React.createElement(View, null, this.labelGenerate(value).map((val, i) => {
        if (isEqual(String(val).substring(0, 3), 'AT-')) {
          return /*#__PURE__*/React.createElement(InputFile, {
            value: val,
            isReadonly: true,
            preview: true
          });
        } else {
          return /*#__PURE__*/React.createElement(Text, null, val);
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
      key: slug(String(key)),
      value: val
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(InputChoose);
//# sourceMappingURL=InputChoose.js.map