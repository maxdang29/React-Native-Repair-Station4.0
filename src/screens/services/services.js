import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as serviceAction from '../../redux/service/actions/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemService from '../../components/services/itemService';
import {showModalNavigation} from '../../navigation/function';
import {Navigation} from 'react-native-navigation';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  componentDidMount() {
    this.props.getAllService();
  }
  onChangeText = text => {
    this.setState({
      searchText: text,
    });
  };
  convertVietnameseToEnglishText(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  serviceSuggestion = (data, text) => {
    return data.filter(item => {
      return (
        this.convertVietnameseToEnglishText(item.name)
          .toLowerCase()
          .indexOf(this.convertVietnameseToEnglishText(text).toLowerCase()) !==
        -1
      );
    });
  };
  render() {
    const {listService, loading} = this.props;
    let suggestion = this.serviceSuggestion(listService, this.state.searchText);
    let data = suggestion ? suggestion : listService;

    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else
      return (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.getRepair}>
              <TouchableOpacity
                onPress={() => {
                  showModalNavigation(
                    'serviceSetting',
                    null,
                    'Sữa dịch vụ',
                    true,
                  );
                }}>
                <Icon name="ios-settings" color="#00a7e7" size={30} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.inputSearch}
                  placeholder="Tìm kiếm"
                  onChangeText={text => this.onChangeText(text)}
                />
              </View>
            </View>
            <View style={styles.content}>
              <FlatList
                data={data}
                renderItem={({item}) => <ItemService item={item} />}
                numColumns={3}
                keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() =>
                showModalNavigation(
                  'FormService',
                  {dismissModal: false},
                  'Thêm dịch vụ',
                  true,
                )
              }>
              <Text style={{color: 'white', fontSize: 20}}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  getRepair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  inputSearch: {
    width: 200,
    height: 40,
    // borderTopLeftRadius: 50,
    // borderBottomLeftRadius: 50,
    borderRadius: 50,

    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
  },
  buttonSearch: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    padding: 3,
  },
  content: {
    marginTop: 20,
  },
  containerButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 40,
  },
  buttonAdd: {
    backgroundColor: '#00a7e7',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
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
export default connect(mapStateToProps, mapDispatchToProps)(Service);
