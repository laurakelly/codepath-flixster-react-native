import React from 'react';
import {
  Navigator,
  TouchableOpacity,
  BackAndroid,
  Platform,
  Text,
} from 'react-native';
import ColorView from './ColorView';

const routes = [
  { title: 'Purple', color: 'purple', id: 0 },
  { title: 'Orange', color: 'orange', id: 1 },
];

const routeMapper = {
  LeftButton: (route, navigator) => {
    if (navigator.getCurrentRoutes().length > 1) {
      return (
        <TouchableOpacity onPress={() => navigator.pop()}>
          <Text>Back</Text>
        </TouchableOpacity>
      );
    }
    return null;
  },
  RightButton: () => null,
  Title: (route) => <Text>{route.title}</Text>,
};

function onPress(route, navigator) {
  if (route.id === 0) {
    navigator.push(routes[1]);
  } else {
    navigator.pop();
  }
}

class NavApp extends React.Component {
  constructor(props) {
    super(props);

    this.onBackAndroid = this.onBackAndroid.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  renderScene(route, navigator) {
    console.log("renderscene")
    this.navBackAndroid = navigator;
    return (
      <TouchableOpacity
        onPress={() => onPress(route, navigator)}
        style={{ flex: 1 }}
      >
        <ColorView color={route.color} />
      </TouchableOpacity>
    );
  }

  navBackAndroid = null

  onBackAndroid() {
    if (this.navBackAndroid && this.navBackAndroid.getCurrentRoutes().length > 1) {
      this.navBackAndroid.pop();
      return true;
    }

    // exit app
    return false;
  }

  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={routeMapper}
            style={{ backgroundColor: 'gray' }}
          />
        }
      />
    );
  }
}

export default NavApp;
