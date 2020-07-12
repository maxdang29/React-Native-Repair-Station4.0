import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Vibration,
} from 'react-native';
import NewOrder from '../../components/order/newOrder';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as orderAction from '../../redux/order/actions/actions';
import {alertConfirm} from '../../navigation/function';
import {Navigation} from 'react-native-navigation';
import {format} from 'date-fns';
import {ACCEPTED, REJECTED} from '../../constants/orderStatus';
import {APP_COLOR, ERROR_COLOR} from '../../utils/colors';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class NotificationNewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentId: null,
    };
  }
  componentWillMount = () => {
    Vibration.vibrate(2000);
  };
  confirmOrder = orderId => {
    const {componentId} = this.props;
    alertConfirm(
      'alertConfirm',
      'Bạn chắc chắn muốn nhận cuốc?',
      null,
      'Xác nhận',
      {
        onPress: () =>
          this.props.updateStatusOrder(ACCEPTED, orderId, componentId),
      },
    );
  };

  cancelOrder = orderId => {
    const {componentId} = this.props;
    alertConfirm(
      'alertConfirm',
      'Bạn chắc chắn muốn hủy cuốc?',
      null,
      'Xác nhận hủy',
      {
        onPress: () =>
          this.props.updateStatusOrder(REJECTED, orderId, componentId),
      },
    );
  };
  render() {
    const {value} = this.props;

    //01cbfd
    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Bạn có cuốc mới</Text>
          </View>
          <View style={styles.content}>
            <View
              style={{
                top: -55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/image/max.jpg')}
                style={styles.imageUser}
              />
              <Text style={{marginTop: 5, fontSize: 20}}>
                {value[0].customerName}
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  styles.border,
                ]}>
                <View>
                  <View style={styles.row}>
                    <Icon
                      style={styles.icon}
                      name="ios-bicycle"
                      color={APP_COLOR}
                      size={23}
                    />
                    <Text style={styles.highlight}>Thông tin dịch vụ </Text>
                  </View>
                  <Text style={{paddingLeft: 30}}>
                    {value[0].station.vehicle}
                  </Text>
                </View>
                <View style={{marginBottom: 12}}>
                  <View style={styles.row}>
                    <Icon
                      style={styles.icon}
                      name="ios-car"
                      color={APP_COLOR}
                      size={23}
                    />
                    <Text style={styles.highlight}>
                      {value[0].distance / 1000} km
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[{paddingVertical: 12}, styles.border]}>
                <View style={styles.row}>
                  <Icon
                    style={styles.icon}
                    name="ios-navigate"
                    color={APP_COLOR}
                    size={23}
                  />
                  <Text style={styles.highlight}>Địa chỉ </Text>
                </View>
                <Text style={{paddingLeft: 30}}>{value[0].address}</Text>
              </View>

              <View style={[{paddingVertical: 12}, styles.border]}>
                <View style={styles.row}>
                  <Icon
                    style={styles.icon}
                    name="ios-time"
                    color={APP_COLOR}
                    size={23}
                  />
                  <Text style={styles.highlight}>Thời gian</Text>
                </View>
                <Text style={{paddingLeft: 30}}>
                  {' '}
                  {format(new Date(value[0].createdOn), 'dd-MM-yyyy H:mma')}
                </Text>
              </View>

              <View style={[{paddingVertical: 12}, styles.border]}>
                <View style={styles.row}>
                  <Icon
                    style={styles.icon}
                    name="ios-build"
                    color={APP_COLOR}
                    size={23}
                  />
                  <Text style={styles.highlight}>Dịch vụ </Text>
                </View>
                {value[0].services
                  ? value[0].services.map(element => {
                      return (
                        <View
                          style={[
                            styles.row,
                            {justifyContent: 'space-between'},
                          ]}>
                          <Text style={{paddingLeft: 30}}>{element.name}</Text>
                          <Text>{element.price} vnd</Text>
                        </View>
                      );
                    })
                  : null}
                <Text
                  style={{
                    textAlign: 'right',
                    marginVertical: 10,
                    color: ERROR_COLOR,
                  }}>
                  {value[0].totalPrice} vnd
                </Text>
              </View>

              <View style={[{paddingVertical: 12}, styles.border]}>
                <View style={styles.row}>
                  <Icon
                    style={styles.icon}
                    name="ios-create"
                    color={APP_COLOR}
                    size={23}
                  />
                  <Text style={styles.highlight}>Lưu ý </Text>
                </View>
                <Text style={{paddingLeft: 30}}>{value[0].note}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              {
                width: 80,
                backgroundColor: '#F5F5F5',
              },
              styles.button,
            ]}
            onPress={componentId => {
              this.cancelOrder(value[0].id);
            }}>
            <Icon style={styles.icon} name="ios-close" color="red" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                width: deviceWidth - 105,
                marginHorizontal: 5,
                backgroundColor: APP_COLOR,
              },
              styles.button,
            ]}
            onPress={componentId => {
              this.confirmOrder(value[0].id);
            }}>
            <Text style={{color: 'white'}}>Nhận sửa xe</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  childContainer: {
    backgroundColor: 'white',
    width: deviceWidth - 100,
    borderRadius: 2,
  },
  header: {
    width: '100%',
    backgroundColor: APP_COLOR,
    height: 200,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  content: {
    backgroundColor: 'white',
    height: deviceHeight - 210,
    width: deviceWidth - 20,
    marginHorizontal: 20,
    borderRadius: 7,
    position: 'absolute',
    top: 140,
    elevation: 3,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  imageUser: {
    width: 110,
    height: 110,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'white',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  icon: {
    marginRight: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: APP_COLOR,
  },
  border: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#e0e0e0',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    elevation: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
});

const mapStateToProps = store => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    updateStatusOrder: (status, orderId, componentId) => {
      dispatch(orderAction.updateStatus(status, orderId, componentId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationNewOrder);
