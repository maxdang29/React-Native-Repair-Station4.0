import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import firebase from 'react-native-firebase';

import {Navigation} from 'react-native-navigation';
import InputText from '../../components/textInput';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import * as serviceAction from '../../redux/service/actions/actions';
class FormService extends Component {
  constructor(props) {
    super(props);
    this.navigationEventListener = Navigation.events().bindComponent(this);
    this.state = {
      image: '',
      name: '',
      vehicle: '',
      price: null,
      note: '',
      nameError: null,
      vehicleError: null,
      priceError: null,
    };
  }
  navigationButtonPressed({buttonId}) {
    const {componentId} = this.props;
    if (buttonId === 'back') {
      Navigation.dismissModal(componentId);
    }
  }
  onchangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleButton = () => {
    const {image, name, price, note, vehicle} = this.state;
    const {value, componentId, currentStation} = this.props;

    let service = {
      image: image,
      name: name,
      price: price,
      vehicle: vehicle,
      note: note,
      stationId: currentStation.id,
    };
    if (name && vehicle && price) {
      if (value.item) {
        service.id = value.item.id;
        this.props.updateService(service, componentId);
      } else {
        this.props.addService(service, componentId);
      }
    } else {
      if (!name) this.onchangeText('nameError', 'Nhập tên dịch vụ');
      if (!price) this.onchangeText('priceError', 'Nhập giá');
      if (!vehicle) this.onchangeText('vehicleError', 'Nhập loại phương tiện');
    }
  };
  focusNextField(nextField) {
    this[nextField].focus();
  }
  getImage = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {uri: response.uri};
      this.setState({
        image: source,
      });
    }
  };
  selectImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      this.getImage(response);
    });
  };
  launchCamera = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchCamera(options, response => {
      this.getImage(response);
    });
  };
  componentDidMount() {
    const {value} = this.props;
    if (value.item) {
      this.setState({
        image: value.item.image,
        name: value.item.name,
        price: value.item.price,
        vehicle: value.item.vehicle,
        note: value.item.note,
      });
    }
  }

  render() {
    const {value} = this.props;
    const {image, nameError, vehicleError, priceError} = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          {image ? (
            <Image
              source={image}
              style={{width: '100%', height: 300}}
              resizeMode="center"
            />
          ) : null}
          <InputText
            ref={ref => (this.name = ref)}
            onSubmitEditing={() => {
              this.focusNextField('vehicle');
            }}
            onchangeText={value => this.onchangeText('name', value)}
            title="Tên dịch vụ *"
            value={value.item ? value.item.name : null}
            error={nameError}
            icon="https://img.icons8.com/windows/344/multiline-text.png"
          />
          <InputText
            ref={ref => (this.vehicle = ref)}
            onSubmitEditing={() => {
              this.focusNextField('price');
            }}
            error={vehicleError}
            onchangeText={value => this.onchangeText('vehicle', value)}
            title="Loại phương tiện *"
            value={value.item ? value.item.vehicle : null}
            icon="https://img.icons8.com/ios/2x/category.png"
          />
          <InputText
            ref={ref => (this.price = ref)}
            onSubmitEditing={() => {
              this.focusNextField('note');
            }}
            onchangeText={value => this.onchangeText('price', value)}
            title="Giá *"
            error={priceError}
            value={value.item ? value.item.price : null}
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
          <View style={styles.containerChooseImage}>
            <TouchableOpacity
              style={[styles.iconImage]}
              onPress={this.selectImage}>
              <Icon name="ios-image" color="gray" size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconImage]}
              onPress={this.launchCamera}>
              <Icon name="ios-camera" color="gray" size={40} />
            </TouchableOpacity>
          </View>

          <View style={styles.containerChooseImage}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'red'}]}
              onPress={() => Navigation.dismissModal(this.props.componentId)}>
              <Text style={styles.textButton}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#44db5e'}]}
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
  containerChooseImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
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
    currentStation: store.AuthenticationReducers.stationInformation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addService: (service, componentId) => {
      dispatch(serviceAction.addService(service, componentId));
    },
    updateService: (service, componentId) => {
      dispatch(serviceAction.updateService(service, componentId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormService);
