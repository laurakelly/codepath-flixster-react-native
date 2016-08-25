import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import NavApp from './NavApp';
import MoviesView from './MoviesView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgb(94, 94, 94)',
  },
  tabBarText: {
    fontSize: 20,
  },
  selectedStyle: {
    color: 'white',
  },
  deselectedStyle: {
    color: 'rgba(255, 255, 255, 0.35)',
  },
});

function tabSelectionStyle(tab, currentTab) {
  const isSelected = tab === currentTab;
  return isSelected ? styles.selectedStyle : styles.deselectedStyle;
}

function Bar({ tabs, currentTab }) {
  return (
    <View style={styles.tabBar}>
      {
        tabs.map(tab => (
          <TouchableOpacity key={tab.name} >
            <Text
              style={[
                styles.tabBarText,
                tabSelectionStyle(tab, currentTab),
              ]}
              onPress={tab.onPress}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}

Bar.propTypes = {
  tabs: PropTypes.array.isRequired,
  currentTab: PropTypes.string.isRequired,
};

function Scene({ currentTab }) {
  return (
    <View style={styles.scene}>
      {currentTab === 'Now Playing' &&
        <MoviesView />
      }
      {currentTab === 'Top Rated' &&
        <NavApp />
      }
    </View>
  );
}

Scene.propTypes = { currentTab: PropTypes.string.isRequired };

class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: 'Now Playing' };
  }

  onClickMovie() {
    this.setState({ currentTab: 'movieDetail' });
  }

  render() {
    const { currentTab } = this.state;
    return (
      <View style={styles.container}>
        <Bar
          tabs={[
            { name: 'Now Playing', onPress: () => this.setState({ currentTab: 'Now Playing' }) },
            { name: 'Top Rated', onPress: () => this.setState({ currentTab: 'Top Rated' }) },
          ]}
          currentTab={currentTab}
        />
        <Scene currentTab={currentTab} />
      </View>
    );
  }
}

export default TabBar;
