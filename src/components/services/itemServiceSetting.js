import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as serviceAction from '../../redux/service/actions/actions';
import {showModalNavigation, alertConfirm} from '../../navigation/function';

class ItemServiceSetting extends Component {
  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.image}>
              {item.image === '' ? (
                <Image
                  source={require('../../assets/image/icons8-gas-pump-96.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
            <View>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.price}>Giá: {item.price}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.row]}
              onPress={() => {
                showModalNavigation(
                  'FormService',
                  {item, handle: 'update'},
                  'Sữa dịch vụ',
                  true,
                );
              }}>
              <Icon name="ios-create" color="gray" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.row]}
              onPress={() => {
                alertConfirm(
                  'alertConfirm',
                  'Bạn chắc chắn muốn tiếp tục xóa',
                  null,
                  null,
                  // this.props.deleteService(item),
                  {onPress: () => this.props.deleteService(item)},
                );
                //this.props.deleteService(item);
              }}>
              <Icon name="ios-trash" color="gray" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: 90,
    height: 50,
    marginRight: 10,
  },
  shadow: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 3,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    elevation: 2,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 50,
    backgroundColor: 'white',
    marginHorizontal: 2,
    borderRadius: 10,
  },

  text: {
    fontSize: 17,
    fontWeight: '900',
  },
  price: {
    color: 'red',
  },
});
const mapStateToProps = store => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    deleteService: service => {
      dispatch(serviceAction.deleteService(service));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemServiceSetting);
