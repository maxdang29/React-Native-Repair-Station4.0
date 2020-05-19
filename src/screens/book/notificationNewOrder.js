import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NewOrder from '../../components/book/newOrder';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as orderAction from '../../redux/book/actions/actions';
import {alertConfirm} from '../../navigation/function';
import {Navigation} from 'react-native-navigation';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class NotificationNewOrder extends Component {
  confirmOrder = orderId => {
    alertConfirm(
      'alertConfirm',
      'Bạn chắc chắn muốn nhận cuốc?',
      null,
      'Xác nhận',
      {onPress: () => this.props.confirmOrder(orderId, this.props.componentId)},
    );
  };
  cancelOrder = orderId => {
    alertConfirm(
      'alertConfirm',
      'Bạn chắc chắn muốn hủy cuốc?',
      null,
      'Xác nhận hủy',
      {
        onPress: () =>
          this.props.cancelConfirm(orderId, this.props.componentId),
      },
    );
  };
  render() {
    const {data} = this.props;

    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{this.props.title}</Text>
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
              <Text style={{marginTop: 5}}>{data[0].user.fullName}</Text>
            </View>

            <ScrollView>
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
                      color="#01cbfd"
                      size={23}
                    />
                    <Text style={styles.highlight}>Thông tin dịch vụ </Text>
                  </View>
                  <Text style={{paddingLeft: 30}}>{data[0].vehicle}</Text>
                </View>
                <View style={{marginBottom: 12}}>
                  <View style={styles.row}>
                    <Icon
                      style={styles.icon}
                      name="ios-bicycle"
                      color="#01cbfd"
                      size={23}
                    />
                    <Text style={styles.highlight}>Loại xe </Text>
                  </View>
                  <Text style={{paddingLeft: 30}}>{data[0].vehicleName}</Text>
                </View>
              </View>

              <View style={[{paddingVertical: 12}, styles.border]}>
                <View style={styles.row}>
                  <Icon
                    style={styles.icon}
                    name="ios-navigate"
                    color="#01cbfd"
                    size={23}
                  />
                  <Text style={styles.highlight}>Điểm đón </Text>
                </View>
                <Text style={{paddingLeft: 30}}>101b lê hữu trác, sơn trà</Text>
              </View>

              <View style={[{paddingVertical: 12}, styles.border]}>
                <View style={styles.row}>
                  <Icon
                    style={styles.icon}
                    name="ios-time"
                    color="#01cbfd"
                    size={23}
                  />
                  <Text style={styles.highlight}>
                    Thời gian tìm tiệm sửa xe
                  </Text>
                </View>
                <Text style={{paddingLeft: 30}}>{data[0].time}</Text>
              </View>

              <View style={[{paddingVertical: 12}, styles.border]}>
                <View style={styles.row}>
                  <Icon
                    style={styles.icon}
                    name="ios-build"
                    color="#01cbfd"
                    size={23}
                  />
                  <Text style={styles.highlight}>Dịch vụ </Text>
                </View>
                {this.props.data[0].services
                  ? this.props.data[0].services.map(element => {
                      return (
                        <Text style={{paddingLeft: 30}}>{element.name}</Text>
                      );
                    })
                  : null}
              </View>

              <View style={[{paddingVertical: 12}, styles.border]}>
                <View style={styles.row}>
                  <Icon
                    style={styles.icon}
                    name="ios-create"
                    color="#01cbfd"
                    size={23}
                  />
                  <Text style={styles.highlight}>Lưu ý </Text>
                </View>
                <Text style={{paddingLeft: 30}}>{data[0].note}</Text>
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
            onPress={() => {
              this.cancelOrder(data[0].id);
            }}>
            <Icon style={styles.icon} name="ios-close" color="red" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                width: deviceWidth - 105,
                marginHorizontal: 5,
                backgroundColor: '#01cbfd',
              },
              styles.button,
            ]}
            onPress={() => {
              this.confirmOrder(data[0].id);
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
    backgroundColor: '#01cbfd',
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
    height: deviceHeight - 240,
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
    color: '#01cbfd',
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
    confirmOrder: (idOrder, componentId) => {
      dispatch(orderAction.confirmOrder(idOrder, componentId));
    },
    cancelConfirm: (idOrder, componentId) => {
      dispatch(orderAction.cancelConfirm(idOrder, componentId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationNewOrder);
