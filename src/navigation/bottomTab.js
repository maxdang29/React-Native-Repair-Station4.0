import {Navigation} from 'react-native-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {APP_COLOR} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

async function prepareIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('home', 25),
    Ionicons.getImageSource('layers', 25),
    Ionicons.getImageSource('ios-construct', 25),
    Ionicons.getImageSource('notifications', 25),
  ]);

  const [homeIcon, orderIcon, serviceIcon, notifyIcon] = icons;
  return {homeIcon, orderIcon, serviceIcon, notifyIcon};
}

export default async function startApp() {
  const icons = await prepareIcons();
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
                      icon: icons.homeIcon,
                      selectedIconColor: '#FFFFFF',
                      selectedTextColor: '#FFFFFF',
                      iconColor: '#FFFFFF',
                      textColor: '#FFFFFF',
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
                        id: 'order',
                      },
                    },
                  ],
                  options: {
                    topBar: {
                      visible: false,
                    },
                    bottomTab: {
                      text: 'Hoạt động',
                      icon: icons.orderIcon,
                      selectedIconColor: '#FFFFFF',
                      selectedTextColor: '#FFFFFF',
                      iconColor: '#FFFFFF',
                      textColor: '#FFFFFF',
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
                      icon: icons.serviceIcon,
                      selectedIconColor: '#FFFFFF',
                      selectedTextColor: '#FFFFFF',
                      iconColor: '#FFFFFF',
                      textColor: '#FFFFFF',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'notification',
                      },
                    },
                  ],
                  options: {
                    topBar: {
                      visible: false,
                    },
                    bottomTab: {
                      text: 'Thông báo',
                      icon: icons.notifyIcon,
                      selectedIconColor: '#FFFFFF',
                      selectedTextColor: '#FFFFFF',
                      iconColor: '#FFFFFF',
                      textColor: '#FFFFFF',
                    },
                  },
                },
              },
            ],
            options: {
              bottomTabs: {
                backgroundColor: APP_COLOR,
                titleDisplayMode: 'alwaysShow',
              },
            },
          },
        },
      },
    },
  });
}
