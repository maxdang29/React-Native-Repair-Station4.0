import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

export default class NewOrder extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
            source={require('../../assets/image/user.png')}
            style={styles.image}
            resizeMode="center"
          />
          <Text>Dang Phuong Nam</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.title}>Địa điểm: </Text>
            <Text>101b lê hữu trác, Đà nẵng </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Thời gian: </Text>
            <Text>10:00 25/03/2020 </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  image: {
    width: 40,
    height: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    marginLeft: 40,
  },
});
