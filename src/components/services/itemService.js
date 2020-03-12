import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {showModalNavigation} from '../../navigation/function';
export default class ItemService extends Component {
  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <TouchableOpacity
            style={styles.image}
            onPress={() => {
              showModalNavigation(
                'FormService',
                {item, handle: 'update'},
                'Sữa dịch vụ',
                true,
              );
            }}>
            {item.image === '' ? (
              <Image
                source={require('../../assets/image/icons8-gas-pump-96.png')}
                style={styles.image}
                resizeMode="center"
              />
            ) : (
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="center"
              />
            )}
          </TouchableOpacity>
          <Text>{item.name}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },
  shadow: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 15,
    padding: 10,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
  },
});
