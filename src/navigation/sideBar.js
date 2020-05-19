import React, {component, Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Side bar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});
