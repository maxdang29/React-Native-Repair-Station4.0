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
      <View style={([styles.bottom], {margin: 10, backgroundColor: '#eef4fc'})}>
        <View style={styles.bottom}>
          <View style={styles.row}>
            <View style={[styles.item, styles.row]}>
              <Text style={[styles.text, {color: '#5a5e68'}]}>
                Khách hàng:{' '}
              </Text>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>
                {item.customerName}
              </Text>
            </View>
            <View>
              <Text style={[styles.text, {color: '#5a5e68'}]}>
                {format(new Date(item.createdOn), 'dd-MM-yyyy H:mma')}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.text, {color: '#5a5e68'}]}>Mã cuốc xe: </Text>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>{item.id}</Text>
          </View>
          <View style={styles.row}>
            <View style={[styles.item, styles.row]}>
              <Text style={[styles.text, {color: '#5a5e68'}]}>
                Khoảng cách:{' '}
              </Text>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>
                {item.distance / 1000} km
              </Text>
            </View>
            <View style={[styles.row]}>
              <Text style={[styles.text, {color: '#5a5e68'}]}>Tổng tiền:</Text>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>
                {item.totalPrice} vnd
              </Text>
            </View>
          </View>

          <View
            style={[
              {marginLeft: 20, justifyContent: 'space-between'},
              styles.row,
            ]}>
            <TouchableOpacity
              style={styles.buttonDetail}
              onPress={() =>
                showModalNavigation('orderDetail', item, 'Chi tiết', true)
              }>
              <Text>Chi tiết</Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.status}>{item.status}</Text>
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
    marginVertical: 5,
  },
  text: {
    textAlign: 'center',
  },
  item: {
    flex: 1,
  },
  buttonDetail: {
    padding: 7,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  status: {
    color: '#5d9d67',
    marginHorizontal: 15,
    fontWeight: 'bold',
  },
  textButton: {
    color: 'white',
    fontSize: 18,
  },
  bottom: {
    backgroundColor: '#eef4fc',
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
