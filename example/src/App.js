import React from 'react';

import { StyleSheet, View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

import {
  InputText,
  InputColor,
  InputChoose,
  InputDateTime,
  InputDate,
  InputTime,
  InputTag,
  InputNumber
} from 'react-native-tcomponent';

import { connect } from 'react-redux';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    // this.open = debounce(this.open, 500);
  }
  render() {
    console.log('RENDER');
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text>React Native Tcomponent</Text>
        <View>
          <Text>InputText</Text>
          <InputText name="aldo" />
          <InputText name="aldo" isReadonly />
          <InputText style={{ borderWidth: 4 }} name="aldoresize" isResizable />
        </View>
        <View style={{ height: 120 }}>
          <Text>Input Color</Text>
          <InputColor name="color" />
          <InputColor name="color" isReadonly />
        </View>
        <View>
          <Text>InputChoose</Text>
          <InputChoose
            name="choose[satu]"
            options={[
              { id: '1', nama: 'Disetujui' },
              { id: '2', nama: 'Ditolak' },
              { id: '3', nama: 'Menunggu Persetujuan' },
            ]}
            separator="-"
            optionLabel={['nama']}
            optionValue="nama"
          />
        </View>
        <View>
          <Text>InputChoose Multiple</Text>
          <InputChoose
            isMultiple
            name="choose_multi[satu]"
            options={[
              { id: '1', nama: 'Disetujui' },
              { id: '2', nama: 'Ditolak' },
              { id: '3', nama: 'Menunggu Persetujuan' },
            ]}
            separator="-"
            optionLabel={['nama']}
            optionValue="nama"
          />
        </View>
        <View>
          <Text>InputDateTime</Text>
          <InputDateTime name="inputdatetime" />
        </View>
        <View>
          <Text>InputDate</Text>
          <InputDate name="inputdate" customButton={(onClick)=>
            <TouchableOpacity onPress={onClick}><Text>Button nya</Text></TouchableOpacity>
          }/>
        </View>
        <View>
          <Text>InputTime</Text>
          <InputTime name="inputtime" />
        </View>
        <View>
          <Text>InputTag</Text>
          <InputTag
          name="tag"
          keysForTag={","}
          placeholder="Type here.."
          inputContainerStyle={{ width: '100%' }}
          />
        </View>
        <View>
          <Text>InputTag Readonly</Text>
          <InputTag
          name="tag"
          placeholder="Type here.."
          inputContainerStyle={{ width: '100%', borderWidth: 1 }}
          keysForTag={","}
          isReadonly
          />
        </View>
        <View>
          <Text>InputTag Custom Style</Text>
          <InputTag
          name="tag"
          keysForTag={","}
          placeholder="Type here.."
          label="press comma to add tag"
          labelStyle={styles.label}
          containerStyle={styles.tagContainer}

          inputContainerStyle={styles.tagInputContainer}
          inputStyle={styles.tagInput}

          leftElement={<Text style={styles.tagInput}>#</Text>}
          leftElementContainerStyle={styles.leftElement}

          rightElement={<Text style={styles.tagInput}>Clear</Text>}
          rightElementContainerStyle={styles.rightElement}

          // tagsViewStyle={this.props.tagsViewStyle}
          tagStyle={styles.tagChipsContainer}
          tagTextStyle={styles.tagInput}
          // onFocus={this.props.onFocus}
          // onBlur={this.props.onBlur}
          // autoCorrect={this.props.autoCorrect}
          // deleteElement={<Text style={styles.tagInput}>X</Text>}
          // deleteIconStyles={styles.rightElement}
          // customElement={this.props.customElement}
          // disabled={true}
          />
        </View>
        <View>
          <Text>InputNumber basic</Text>
          <InputNumber name="num" />

          <Text>InputNumber limit</Text>
          <InputNumber name="numRange" maxValue={100} minValue={0} />

          <Text>InputNumber Number only</Text>
          <InputNumber name="numOnly" numberOnly />

        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  //Tag custom style
  label:{
    fontSize: 16,
    color: '#fff',
    marginBottom: 5
  },
  tagContainer:{
    backgroundColor: '#252241',
  },
  tagInputContainer:{
    width: '100%',
    backgroundColor: '#1a162a',
    borderRadius: 50
  },
  tagInput: {
    fontSize: 14,
    color: '#fff',
  },
  leftElement:{
    marginTop: 3,
    backgroundColor: '#831dfe',
    padding: 10,
    borderRadius: 50,
    width: 40,
    height: 40
  },
  rightElement:{
    borderWidth: 1,
    borderColor: '#831dfe',
    padding: 10,
    borderRadius: 50,
    marginTop: 3
  },
  tagChipsContainer:{
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    backgroundColor: '#252241'
  },
  deleteIcon: {
    backgroundColor: '#831dfe',
  }
});

const mapStateToProps = (state) => ({
  input: state.core.input || {},
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
