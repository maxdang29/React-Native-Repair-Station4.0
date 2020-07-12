import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  SectionList,
} from 'react-native';
import OrderItem from '../../components/order/orderItem';
import {connect} from 'react-redux';
import * as orderAction from '../../redux/order/actions/actions';
import {showNotification, showModalNavigation} from '../../navigation/function';
import {AsyncStorage} from 'react-native';
import {Icon, Header, ListItem, Card} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import {
  WAITING,
  ACCEPTED,
  CANCELED,
  REJECTED,
  DONE,
} from '../../constants/orderStatus';
import {format} from 'date-fns';


const initialLayout = {width: Dimensions.get('window').width};
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'accepted', title: 'Đã chấp nhận'},
        {key: 'done', title: 'Hoàn thành'},
        {key: 'cancel', title: 'Đã hủy'},
      ],
    };
  }
  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const {index} = this.state;
    return (
      <View style={styles.tabContainer}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={[
                styles.buttonTab,
                index === i ? styles.buttonActive : null,
              ]}
              onPress={() => this.setState({index: i})}>
              <Text
                style={[
                  styles.textButton,
                  index === i ? styles.textActive : null,
                ]}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  convertDataToSection = orders => {
    let dates = [];
    let objOrder = {};
    orders.map(order => {
      let date = format(new Date(order.createdOn), 'dd-MM-yyyy');
      if (!dates.includes(date)) {
        dates.push(date);
        objOrder[date] = {title: date, key: date, data: [order]};
      } else {
        objOrder[date].data.push(order);
      }
    });
    let result = Object.keys(objOrder).map(key => objOrder[key]);
    // console.log('ressult 2222', JSON.stringify(result, null, 4));
    result.sort(function(a, b) {
      return new Date(a.title) > new Date(b.title);
    });
    return result;
  };
  renderOrder = status => {
    const {dataOrders} = this.props;
    let resultData = dataOrders.filter(order => {
      return order.status === status;
    });
    const DATA = this.convertDataToSection(resultData);

    return (
      <View style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <OrderItem item={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginHorizontal: 5,
                marginTop: 10,
              }}>
              Ngày: {title}
            </Text>
          )}
        />
      </View>
    );
  };
  _renderScene = SceneMap({
    accepted: () => {
      return this.renderOrder(ACCEPTED);
    },
    done: () => {
      return this.renderOrder(DONE);
    },
    cancel: () => {
      return this.renderOrder(CANCELED);
    },
  });

  componentDidMount = async () => {
    const stationId = await AsyncStorage.getItem('stationId');
    this.props.getAllOrder(stationId);
  };

  render() {
    const {dataOrders, loading} = this.props;
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
        <TabView
          style={{flex: 3}}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          swipeEnabled={true}
        />
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
    fontWeight: 'bold',
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
