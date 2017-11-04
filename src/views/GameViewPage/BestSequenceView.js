import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

class BestSequenceView extends Component {
  renderSequenceItem = value => (
    <View style={styles.sequenceItem}>
      <Text style={styles.sequenceItemText}>{value}</Text>
    </View>
  )

  render() {
    return (
      <View style={styles.bestSequenceContainer}>
        <Text style={styles.bestSequenceLabel}>Best Sequence</Text>
        <ScrollView horizontal={true}>
          {this.props.sequence.map(this.renderSequenceItem)}
        </ScrollView>
      </View>
    );
  }
}

BestSequenceView.propTypes = {
  sequence: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BestSequenceView;
