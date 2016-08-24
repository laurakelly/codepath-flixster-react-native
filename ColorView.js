import React, { PropTypes } from 'react';
import { View, AppRegistry } from 'react-native';

const propTypes = {
  color: PropTypes.string.isRequired,
}

class ColorView extends React.Component {
  render() {
    return(
      <View style={{
        backgroundColor: this.props.color,
        flex: 1 }}
      />
    )
  }
}

ColorView.propTypes = propTypes;
export default ColorView;
