import {Navigation} from 'react-native-navigation';

export const showModalNavigation = (
  modal_name,
  value,
  pageTitle,
  visible = false,
) => {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: modal_name,
            passProps: {
              value,
            },
            options: {
              topBar: {
                title: {
                  text: pageTitle,
                },
                leftButtons: [
                  {
                    id: 'back',
                    icon: require('../assets/image/icons-arrow-left.png'),
                  },
                ],
                visible: visible,
              },
            },
          },
        },
      ],
    },
  });
};

showOverlay = (componentName, title, type, data, event) => {
  Navigation.showOverlay({
    component: {
      name: componentName,
      passProps: {
        type,
        title,
        data,
        event,
      },
      options: {
        overlay: {
          interceptTouchOutside: true,
        },
      },
    },
  });
};

export const showNotification = (componentName, title, type, data) => {
  showOverlay(componentName, title, type, data);
};
export const alertConfirm = (componentName, title, type, data, event) => {
  showOverlay(componentName, title, type, data, event);
};
export const setRoot = componentName => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: componentName,
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};
