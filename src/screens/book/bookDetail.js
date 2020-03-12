import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import CheckBoxItem from '../../components/book/checkBoxService';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as bookAction from '../../redux/book/actions/actions';
const deviceWidth = Dimensions.get('window').width;

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      serviceSelected: [],
      totalPrice: null,
    };
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({buttonId}) {
    const {componentId} = this.props;
    if (buttonId === 'back') {
      Navigation.dismissModal(componentId);
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onValueChange = valueCheckBox => {
    let {serviceSelected} = this.state;

    try {
      let found = serviceSelected.find(
        element => element.id === valueCheckBox.id,
      );
      if (found) {
        serviceSelected = serviceSelected.filter(item => {
          return item.id !== valueCheckBox.id;
        });
      } else {
        serviceSelected = [...serviceSelected, valueCheckBox];
      }
    } catch (error) {
      console.log('error', error);
    }

    this.setState({serviceSelected: serviceSelected});
  };

  setDefaultValueServices = async value => {
    await this.setState({serviceSelected: []});
    let {serviceSelected} = this.state;
    serviceSelected = [...serviceSelected, value];
    this.setState({serviceSelected: serviceSelected});
  };

  handleService = () => {
    const {serviceSelected} = this.state;
    this.props.addServiceToBook(serviceSelected, this.props.value.id);
    this.setModalVisible(!this.state.modalVisible);
  };

  filterData = () => {
    const {dataBooks, value} = this.props;
    const book = dataBooks.filter(item => {
      return item.id === value.id;
    });
    return book[0];
  };

  countStars = (starsRating, styleChecked, styleUnChecked) => {
    let star = [];
    for (var i = 0; i < 5; i++) {
      if (i < starsRating) {
        star[i] = <Icon name="ios-star" style={styleChecked} size={40} />;
      } else {
        star[i] = <Icon name="ios-star" style={styleUnChecked} size={40} />;
      }
    }
    return star;
  };

  totalPrice = book => {
    let totalPrice = 0;

    if (book.services) {
      book.services.forEach(element => {
        totalPrice += parseInt(element.price);
      });
    }

    return totalPrice;
  };

  render() {
    const {listService} = this.props;
    const book = this.filterData();

    return (
      <ScrollView>
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: deviceWidth - 70,
                  paddingTop: 10,
                }}>
                <View>
                  <Text style={styles.textModal}>DỊCH VỤ</Text>
                  <View style={{maxHeight: 400}}>
                    <ScrollView>
                      <FlatList
                        data={listService}
                        renderItem={({item}) => (
                          <CheckBoxItem
                            onValueChange={valueCheckBox =>
                              this.onValueChange(valueCheckBox)
                            }
                            setDefaultValueServices={value => {
                              this.setDefaultValueServices(value);
                            }}
                            item={item}
                            serviceSelected={book.services}
                          />
                        )}
                        keyExtractor={item => item.id}
                      />
                    </ScrollView>
                  </View>
                </View>
                <View
                  style={[
                    styles.row,
                    {justifyContent: 'flex-end', marginRight: 10},
                  ]}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)
                    }>
                    <Text>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#00a7e7'}]}
                    onPress={() => this.handleService()}>
                    <Text style={{color: 'white'}}>Hoàn tất</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.row}>
            <Text style={styles.title}>Mã đặt chuyến: </Text>
            <Text style={styles.idOrder}> {book.id}</Text>
          </View>
          <View style={styles.between}>
            <Text>Tên khách hàng: {book.user.fullName}</Text>
            <Text>SDT: {book.user.phone}</Text>
          </View>
          <Text style={{marginHorizontal: 15}}>Thời gian: {book.time}</Text>

          <View style={styles.line} />
          <View>
            <Text style={[styles.title, {textAlign: 'center'}]}>
              Cước sửa xe
            </Text>

            <FlatList
              data={book.services}
              renderItem={({item}) => (
                <View style={styles.between}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>{item.price} Vnd</Text>
                </View>
              )}
              keyExtractor={item => item.id}
            />

            <View style={styles.between}>
              <Text style={styles.text}>khuyến mại</Text>
              <Text style={styles.text}>- 0 Vnd</Text>
            </View>
            <View style={styles.center}>
              {book.status === 'Đang sửa' ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  style={[
                    {
                      backgroundColor: 'red',
                    },
                    styles.bigButton,
                  ]}>
                  <Text style={[styles.textModal, {color: 'white'}]}>
                    Thêm dịch vụ
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.between}>
            <View style={styles.row}>
              <Icon
                name="ios-cash"
                color="black"
                size={30}
                style={styles.icon}
              />
              <Text style={styles.title}>Thanh toán tiền mặt</Text>
            </View>
            <Text style={[styles.title, {marginVertical: 8}]}>
              {this.totalPrice(book)} Vnd
            </Text>
          </View>

          <View style={styles.review}>
            {book.status === 'Hoàn thành' ? (
              <Text style={{textAlign: 'center', margin: 10}}>
                Đánh giá của khách hàng
              </Text>
            ) : null}

            <View style={[styles.row, {justifyContent: 'center'}]}>
              {book.status === 'Hoàn thành' ? (
                this.countStars(
                  book.star,
                  styles.iconRankChecked,
                  styles.iconRankUnchecked,
                )
              ) : (
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: '#00a7e7',
                    },
                    styles.bigButton,
                  ]}
                  onPress={() => this.handlePay()}>
                  <Text style={[styles.textModal, {color: 'white'}]}>
                    Thanh toán
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  idOrder: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  line: {
    backgroundColor: 'gray',
    height: 0.5,
    marginVertical: 15,
  },
  between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 8,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  review: {
    marginTop: 30,
  },
  text: {
    fontSize: 16,
  },
  textModal: {
    fontSize: 20,
    textAlign: 'center',
  },
  iconRankChecked: {
    color: '#fda942',
    marginRight: 3,
    top: -1,
  },
  iconRankUnchecked: {
    color: '#bcbcbc',
    marginRight: 3,
    top: -1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 10,
  },
  bigButton: {
    width: 150,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4a4c49',
    opacity: 0.9,
  },
});
const mapStateToProps = store => {
  return {
    listService: store.ServiceReducers.services,
    dataBooks: store.BookReducers.dataBook,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addServiceToBook: (data, bookId) => {
      dispatch(bookAction.addServiceToBook(data, bookId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
