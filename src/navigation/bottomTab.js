import {Navigation} from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import {APP_COLOR} from '../utils/colors';
export default function startApp() {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'sideBar',
            id: 'sideBar',
          },
        },
        center: {
          bottomTabs: {
            backgroundColor: 'red',
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
                      text: 'Trang chủ',
                      icon: require('../assets/image/icon-home.png'),
                      selectedIconColor: '#FFFFFF',
                      selectedTextColor: '#FFFFFF',
                      iconColor: '#FFFFFF',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'orderMain',
                        id: 'order'
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
                      selectedIconColor: '#FFFFFF',
                      selectedTextColor: '#FFFFFF',
                      iconColor: '#FFFFFF',
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
                      selectedIconColor: '#FFFFFF',
                      selectedTextColor: '#FFFFFF',
                      iconColor: '#FFFFFF',
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
                      selectedIconColor: '#FFFFFF',
                      selectedTextColor: '#FFFFFF',
                      iconColor: '#FFFFFF',
                    },
                  },
                },
              },
            ],
            options: {
              bottomTabs: {
                backgroundColor: APP_COLOR,
              },
            },
          },
        },
      },
    },
  });
}
