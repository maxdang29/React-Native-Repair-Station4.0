import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  focus() {
    this.inputRef.focus();
  }
  getText() {
    return this.inputRef._lastNativeText;
  }
  componentDidMount() {
    this.setState({
      value: this.props.value,
    });
  }
  onChangeText = text => {
    this.setState({
      value: text,
    });
    this.props.onchangeText(text);
  };
  render() {
    const {title, icon, type, error, isSecureTextEntry} = this.props;
    return (
      <>
        <View style={styles.container}>
          <Image source={{uri: icon}} style={styles.image} />
          <TextInput
            style={styles.InputText}
            placeholder={title}
            ref={ref => (this.inputRef = ref)}
            onSubmitEditing={this.props.onSubmitEditing}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.value}
            keyboardType={type ? type : 'default'}
            secureTextEntry={isSecureTextEntry}
          />
        </View>
        {error ? (
          <View style={styles.containerError}>
            <Icon name="ios-alert" style={styles.error} />
            <Text style={[styles.error, styles.textError]}>{error}</Text>
          </View>
        ) : null}
      </>
    );
  }
} 
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  InputText: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 0.4,
    width: '100%',
    paddingBottom: 0,
  },
  image: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  containerError: {
    flexDirection: 'row',
    marginLeft: 50,
    marginTop: -5,
    alignContent: 'center',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  textError: {
    marginLeft: 10,
  },
});
