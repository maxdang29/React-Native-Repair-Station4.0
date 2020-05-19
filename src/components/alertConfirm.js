import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';

const deviceWidth = Dimensions.get('window').width;
export default class AlertConfirm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={{fontSize: 16, color: 'white'}}>Thông báo</Text>
            <TouchableOpacity
              onPress={() => Navigation.dismissOverlay(this.props.componentId)}>
              <Icon name="ios-close" color="white" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Icon
              name="ios-notifications"
              color="#01cbfd"
              size={40}
              style={styles.icon}
            />
            <Text>{this.props.title}</Text>
          </View>
          <View
            style={[styles.row, {justifyContent: 'flex-end', marginRight: 10}]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Navigation.dismissOverlay(this.props.componentId)}>
              <Text>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.event.onPress();
                Navigation.dismissOverlay(this.props.componentId);
              }}>
              <Text>{this.props.data}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a4c49',
    opacity: 0.9,
  },
  modalContainer: {
    backgroundColor: 'white',
    width: deviceWidth - 100,
  },
  icon: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 10,
  },
  header: {
    backgroundColor: '#01cbfd',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
