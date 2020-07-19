import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import {showModalNavigation} from '../../navigation/function';
export default class CheckBoxItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  onValueChange = item => {
    this.setState({checked: !this.state.checked});
    this.props.onValueChange(item);
  };
  async componentDidMount() {
    const {serviceSelected, item} = this.props;
    if (serviceSelected) {
      let found = await serviceSelected.find(element => {
        return element.id === item.id;
      });
      if (found) {
        this.props.setDefaultValueServices(item);

        this.setState({checked: true});
      }
    }
  }

  render() {
    const {item} = this.props;
    return (
      <View>
        <TouchableOpacity onPress={() => this.onValueChange(item)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              borderBottomWidth: 0.5,
              borderBottomColor: 'gray',
              marginVertical: 10,
            }}>
            <Text style={{marginTop: 5, width: '50%'}}>
              {item.name}
            </Text>
            <Text style={{marginTop: 5, width: '30%'}}> {item.price} vnd</Text>

            <CheckBox
              value={this.state.checked}
              onValueChange={() => this.onValueChange(item)}
              style={{ width: '10%'}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    // justifyContent: 'center',
    //alignItems: 'center',
  },
});
