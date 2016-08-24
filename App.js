import React from 'react';
import { View } from 'react-native';
import ColorView from './ColorView';
import { TouchableOpacity } from 'react-native';
import MoviesView from './MoviesView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "purple",
    };

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.setState({ color: "blue" });
  }

  render() {
    return(
      <TouchableOpacity
        onPress={this.onPress}
        style={{ flex: 1 }}
      >
        <ColorView color={this.state.color} />
      </TouchableOpacity>
    )
  }
}

export default App;
