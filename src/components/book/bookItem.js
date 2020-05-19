import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {showModalNavigation} from '../../navigation/function';
export default class ItemBook extends Component {
  totalPrice = book => {
    let totalPrice = 0;

    if (book.services) {
      book.services.forEach(element => {
        totalPrice += parseInt(element.price);
      });
    }

    return totalPrice;
  };
  render() {
    const {item} = this.props;
    return (
      <View style={([styles.bottom], {margin: 15})}>
        <View style={styles.bottom}>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.text}>Mã đặt chuyến </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>Tình trạng </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.item, styles.idOrder, styles.button]}>
              <Text
                style={[
                  styles.text,
                  {color: 'white', fontSize: 12, margin: 2},
                ]}>
                #{item.id}
              </Text>
            </View>
            <View style={[styles.item, styles.button, styles.status]}>
              <Text style={[styles.text, {color: 'white'}]}>{item.status}</Text>
            </View>
          </View>
          <View
            style={[
              {marginLeft: 20, justifyContent: 'space-between'},
              styles.row,
            ]}>
            <Text>{item.time}</Text>

            <View style={styles.row}>
              <Text style={{marginLeft: 20}}>Tiền thu được:</Text>
              <Text style={styles.price}>{this.totalPrice(item)} vnd</Text>
            </View>
          </View>

          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={styles.row}>
              <Image
                source={require('../../assets/image/icon-motor.png')}
                style={styles.imageIcon}
                resizeMode="stretch"
              />
              <Text>{item.vehicle}</Text>
            </View>

            <View style={styles.container}>
              <TouchableOpacity
                style={[
                  styles.container,
                  styles.buttonDetail,
                  item.status === 'Hoàn thành'
                    ? styles.buttonDetail
                    : styles.buttonRed,
                ]}
                onPress={() =>
                  showModalNavigation('bookDetail', item, 'Chi tiết', true)
                }>
                <Text style={styles.textButton}>Chi tiết</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  item: {
    flex: 1,
  },
  idOrder: {
    backgroundColor: '#4dc2ff',
  },
  status: {
    backgroundColor: '#ff7fe5',
  },
  button: {
    padding: 10,
    marginVertical: 10,
  },
  imageIcon: {
    width: 40,
    height: 40,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  price: {
    color: 'red',
    marginHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 220,
    marginVertical: 10,
  },
  buttonDetail: {
    backgroundColor: '#00a7e7',
    width: 150,
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 18,
  },
  bottom: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 15,
    padding: 10,
  },
  buttonRed: {
    backgroundColor: 'red',
  },
});
