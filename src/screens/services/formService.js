import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import InputText from '../../components/textInput';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import * as serviceAction from '../../redux/service/actions/actions';
import {APP_COLOR, ERROR_COLOR} from '../../utils/colors';
class FormService extends Component {
  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.state = {
      name: '',
      price: null,
      note: '',
      nameError: null,
      priceError: null,
    };
  }
  componentDidUpdate() {
    const {value} = this.props;
    if (value.handle === 'update') {
      this.updateRightButton();
    }
  }
  updateRightButton() {
    const options = {
      topBar: {
        rightButtons: [
          {
            id: 'deleteBtn',
            icon: require('../../assets/image/icons-trash.png'),
            color: ERROR_COLOR,
          },
        ],
      },
    };
    Navigation.mergeOptions(this.props.componentId, options);
  }

  navigationButtonPressed({buttonId}) {
    const {componentId} = this.props;
    if (buttonId === 'back') {
      Navigation.dismissModal(componentId);
    }
    if (buttonId === 'deleteBtn') {
      const {value, componentId} = this.props;
      this.props.deleteService(value.item.id, componentId);
    }
  }
  onchangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleButton = () => {
    const {name, price, note} = this.state;
    const {value, componentId, currentStation} = this.props;
    let service = {
      name: name,
      price: price,
      description: note,
      stationId: currentStation.id,
    };
    if (name && price) {
      if (value.handle === 'update') {
        delete service.stationId;
        this.props.updateService(service, value.item.id, componentId);
      } else {
        this.props.addService(service, componentId);
      }
    } else {
      if (!name) this.onchangeText('nameError', 'Nhập tên dịch vụ');
      if (!price) this.onchangeText('priceError', 'Nhập giá');
    }
  };
  focusNextField(nextField) {
    this[nextField].focus();
  }
  componentDidMount() {
    const {value} = this.props;
    if (value.item) {
      this.setState({
        name: value.item.name,
        price: value.item.price,
        note: value.item.note,
      });
    }
  }

  render() {
    const {value} = this.props;
    const {nameError, priceError} = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <InputText
            ref={ref => (this.name = ref)}
            onSubmitEditing={() => {
              this.focusNextField('price');
            }}
            onchangeText={value => this.onchangeText('name', value)}
            title="Tên dịch vụ *"
            value={value.item ? value.item.name : null}
            error={nameError}
            icon="https://img.icons8.com/windows/344/multiline-text.png"
          />

          <InputText
            ref={ref => (this.price = ref)}
            onSubmitEditing={() => {
              this.focusNextField('note');
            }}
            onchangeText={value => this.onchangeText('price', value)}
            title="Giá *"
            error={priceError}
            value={value.item ? value.item.price.toString() : null}
            type="numeric"
            icon="https://img.icons8.com/wired/2x/price-tag-euro.png"
          />
          <InputText
            ref={ref => (this.note = ref)}
            onchangeText={value => this.onchangeText('note', value)}
            title="Thêm ghi chú"
            value={value.item ? value.item.note : null}
            icon="https://img.icons8.com/ios/2x/note.png"
          />

          <View style={styles.containerButton}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: ERROR_COLOR}]}
              onPress={() => Navigation.dismissModal(this.props.componentId)}>
              <Text style={styles.textButton}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: APP_COLOR}]}
              onPress={this.handleButton}>
              <Text style={styles.textButton}>
                {value.item ? 'Cập nhật' : 'Thêm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginVertical: 40,
  },
  iconImage: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 5,
  },
  button: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
});

const mapStateToProps = store => {
  return {
    currentStation: store.StationReducers.station,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addService: (service, componentId) => {
      dispatch(serviceAction.addService(service, componentId));
    },
    updateService: (service, serviceId, componentId) => {
      dispatch(serviceAction.updateService(service, serviceId, componentId));
    },
    deleteService: (serviceId, componentId) => {
      dispatch(serviceAction.deleteService(serviceId, componentId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormService);
