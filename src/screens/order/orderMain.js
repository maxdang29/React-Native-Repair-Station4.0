import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import OrderItem from '../../components/order/orderItem';
import {connect} from 'react-redux';
import * as orderAction from '../../redux/order/actions/actions';
import {showNotification, showModalNavigation} from '../../navigation/function';
import {AsyncStorage} from 'react-native';
import {Icon, Header, ListItem, Card} from 'react-native-elements';
import {WAITING} from '../../constants/orderStatus';
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
      accepted: false,
      cancel: false,
    };
  }
  componentDidMount = async () => {
    const stationId = await AsyncStorage.getItem('stationId');
    this.props.getAllOrder(stationId);
  };
  changeTab = (key, value) => {
    const {waiting, accepted, cancel} = this.state;
    const keys = Object.keys(this.state);
    if (this.state[key] === false) {
      this.setState({
        [key]: !value,
      });
      keys.forEach(element => {
        if (element !== key) {
          this.setState({
            [element]: false,
          });
        }
      });
    }
  };

  render() {
    const {dataOrders, loading} = this.props;
    const {waiting, accepted, cancel} = this.state;
    // if (loading) {
    //   return (
    //     <View style={styles.loading}>
    //       <ActivityIndicator size="large" />
    //     </View>
    //   );
    // } else
    return (
      <>
        <Text style={styles.title}>Danh sách đơn hàng</Text>
        <ScrollView>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.buttonTab, waiting ? styles.buttonActive : null]}
              onPress={() => {
                this.changeTab('waiting', waiting);
              }}>
              <Text
                style={[styles.textButton, waiting ? styles.textActive : null]}>
                Đang chờ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonTab, accepted ? styles.buttonActive : null]}
              onPress={() => {
                this.changeTab('accepted', accepted);
              }}>
              <Text
                style={[
                  styles.textButton,
                  accepted ? styles.textActive : null,
                ]}>
                Đã chấp nhận
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonTab, cancel ? styles.buttonActive : null]}
              onPress={() => {
                this.changeTab('cancel', cancel);
              }}>
              <Text
                style={[styles.textButton, cancel ? styles.textActive : null]}>
                Đã hủy
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <FlatList
              data={dataOrders}
              renderItem={({item}) => <OrderItem item={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 15,
    marginVertical: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 8,
    borderBottomWidth: 3,
  },
  buttonTab: {
    padding: 10,
    width: '30%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonActive: {
    backgroundColor: 'red',
  },
  textActive: {
    color: 'white',
  },
  textButton: {
    fontSize: 15,
  },
});
const mapStateToProps = store => {
  return {
    dataOrders: store.OrderReducers.dataOrder,
    loading: store.OrderReducers.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllOrder: stationId => {
      dispatch(orderAction.getAllOrder(stationId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
