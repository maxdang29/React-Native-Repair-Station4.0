import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

export default class showNotification extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    this.toggleNotificationAnim();
  }
  toggleNotificationAnim = () => {
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.poly(0.8),
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Navigation.dismissOverlay(this.props.componentId);
      }, 1000);
    });
  };

  render() {
    const {title, type} = this.props;
    let color = '#ffa00a';
    if (type === 'success') color = '#0bd534';
    else color = '#ffa00a';
    return (
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: this.animation.interpolate({
                  inputRange: [0, 0.3, 1],
                  outputRange: [-70, 0, 0],
                }),
              },
            ],
            backgroundColor: color,
          },
          styles.animatedView,
        ]}>
        <View style={styles.container}>
          <Image
            source={
              type === 'success'
                ? require('../../assets/image/icons-success.png')
                : require('../../assets/image/icons8-error-96.png')
            }
            style={{width: 40, height: 40}}
          />

          <Text style={styles.title}>{title}</Text>
        </View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 13,
  },
  title: {
    marginLeft: 13,
    marginRight: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
