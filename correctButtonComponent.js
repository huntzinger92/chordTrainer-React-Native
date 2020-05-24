import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {styles} from './styles.js';

export function CorrectButton(props) {
  if (Number(props.value) === 0) {
    return (
      <View style={styles.chordButtonContainer}>
        <TouchableOpacity
          style={styles.chordCorrect}
          value={props.value}
          key={props.value}
          onPress={() => props.makeClicked(props.value)}
          disabled
        >
          <Text style={styles.chordButtonLabel}>{props.chordName}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    if (props.clicked) {
      return (
        <View style={styles.chordButtonContainer} onPress={() => props.makeClicked(props.value)}>
          <TouchableOpacity
            style={styles.chordCorrect}
            color='green'
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
            onPress={() => {props.makeClicked(props.value); props.correctCounter();}}
          >
            <Text style={styles.chordButtonLabel}>{props.chordName}</Text>
          </TouchableOpacity>
        </View>
      );
    };
  };
};
