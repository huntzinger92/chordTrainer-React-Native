import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {styles} from './styles.js';

export function IncorrectButton(props) {
  if (props.clicked) {
    return (
      <View style={styles.chordButtonContainer}>
        <TouchableOpacity
          style={styles.chordIncorrect}
          color='red'
          value={props.value}
          key={props.value}
        >
          <Text style={styles.chordButtonLabel}>{props.chordName}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
      return (
        <View style={styles.chordButtonContainer}>
          <TouchableOpacity
            style={styles.chordUnanswered}
            value={props.value}
            key={props.value}
            onPress={() => props.makeClicked(props.value)}
          >
            <Text style={styles.chordButtonLabel}>{props.chordName}</Text>
          </TouchableOpacity>
        </View>
      );
  };
};
