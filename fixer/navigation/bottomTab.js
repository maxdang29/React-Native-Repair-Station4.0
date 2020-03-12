import {Navigation} from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

export default function startApp() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'homeFixer',
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Home',
                  icon: require('../assets/image/icon-home.png'),
                  selectedIconColor: '#00a7e7',
                  selectedTextColor: '#00a7e7',
                  iconColor: 'black',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'bookMain',
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Hoạt động',
                  icon: require('../assets/image/icons-purchase-order.png'),
                  selectedIconColor: '#00a7e7',
                  selectedTextColor: '#00a7e7',
                  iconColor: 'black',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'serviceFixer',
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Dịch vụ',
                  icon: require('../assets/image/icons-car-service.png'),
                  selectedIconColor: '#00a7e7',
                  selectedTextColor: '#00a7e7',
                  iconColor: 'black',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'homeFixer',
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Thông báo',
                  icon: require('../assets/image/icons8-notification-24.png'),
                  selectedIconColor: '#00a7e7',
                  selectedTextColor: '#00a7e7',
                  iconColor: 'black',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'profileUser',
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Tài khoản',
                  icon: require('../assets/image/icons-account.png'),
                  selectedIconColor: '#00a7e7',
                  selectedTextColor: '#00a7e7',
                  iconColor: 'black',
                },
              },
            },
          },
        ],
      },
    },
  });
}
