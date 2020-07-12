import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {showModalNavigation} from '../../navigation/function';
import {MOTORBIKE, CAR} from '../../constants/vehicles';
import {DONE} from '../../constants/orderStatus';
import {format} from 'date-fns';

export default class ItemOrder extends Component {
  totalPrice = order => {
    let totalPrice = 0;

    if (order.services) {
      order.services.forEach(element => {
        totalPrice += parseInt(element.price);
      });
    }

    return totalPrice;
  };
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          showModalNavigation('orderDetail', item, 'Chi tiết', true)
        }>
        <View style={([styles.bottom], {margin: 10})}>
          <View style={styles.bottom}>
            <View style={styles.row}>
              <View style={styles.item}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  Khách hàng: {item.customerName}
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>
                  {format(new Date(item.createdOn), 'dd-MM-yyyy H:mma')}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.item, styles.idOrder, styles.button]}>
                <Text style={[styles.text, {color: 'white'}]}>
                  #
                  {item.id.length > 15
                    ? item.id.substring(0, 15) + '...'
                    : item.id}
                </Text>
              </View>
              <View style={[styles.item, styles.button, styles.status]}>
                <Text style={[styles.text, {color: 'white'}]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <View
              style={[
                {marginLeft: 20, justifyContent: 'space-between'},
                styles.row,
              ]}>
              {item.station.vehicle === MOTORBIKE ? (
                <Image
                  source={require('../../assets/image/icon-motor.png')}
                  style={styles.imageIcon}
                  resizeMode="stretch"
                />
              ) : (
                <Image
                  source={require('../../assets/image/icon-car.png')}
                  style={styles.imageIcon}
                  resizeMode="stretch"
                />
              )}

              <View style={styles.row}>
                <Text style={{marginLeft: 20}}>Tổng tiền:</Text>
                <Text style={styles.price}>{this.totalPrice(item)} vnd</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
  textButton: {
    color: 'white',
    fontSize: 18,
  },
  bottom: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 3,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 10,
  },
  buttonRed: {
    backgroundColor: 'red',
  },
});
