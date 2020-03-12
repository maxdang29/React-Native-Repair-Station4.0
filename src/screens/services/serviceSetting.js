import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ItemServiceSetting from '../../components/services/itemServiceSetting';
import * as serviceAction from '../../redux/service/actions/actions';
import {Navigation} from 'react-native-navigation';

class ServiceSetting extends Component {
  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({buttonId}) {
    const {componentId} = this.props;
    if (buttonId === 'back') {
      Navigation.dismissModal(componentId);
    }
  }
  componentDidMount() {
    this.props.getAllService();
  }

  render() {
    const {listService, loading} = this.props;
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={listService}
          renderItem={({item}) => <ItemServiceSetting item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = store => {
  return {
    listService: store.ServiceReducers.services,
    loading: store.ServiceReducers.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllService: () => {
      dispatch(serviceAction.getAllService());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ServiceSetting);
