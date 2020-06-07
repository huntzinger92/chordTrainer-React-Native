import React, {useState} from 'react';
//toggle sliders (replacing checkboxes from web app - checkboxes are difficult to style)
import ToggleSwitch from 'toggle-switch-react-native';

import {styles} from './styles.js';

import {
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Picker,
  Linking
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export class Explanation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1
    };
    this.pageIncrease = this.pageIncrease.bind(this);
    this.pageDecrease = this.pageDecrease.bind(this);

    this.subheaderList = [];
  };

  pageIncrease() {
    if (this.state.pageNumber < 6) {
      this.setState({
        pageNumber: this.state.pageNumber + 1
      });
    };
  };

  pageDecrease() {
    if (this.state.pageNumber > 1) {
      this.setState({
      pageNumber: this.state.pageNumber - 1
      });
    };
  };

  render() {
    return (
    <View style={styles.explanationWrapper}>
      <View style={styles.explanationHeaderWrapper}>
        <Text style={styles.explanationHeader}>Review the Theory</Text>
      </View>
      {this.state.pageNumber === 1 &&
        <View>
          <Text style={styles.explanationSubheader}>What are scale degrees?</Text>
          <Text style={styles.explanationText}>In any given key or mode (such as C major or D minor), there are seven chords you can make, each one based off of one note from the scale.
          </Text>
          <Text style={styles.explanationText}>
          The names of these chords come from which note of the scale they are based on, known as "scale degrees". These chords are written as the roman numeral of whatever
          scale degree they are based on.
          </Text>
          <Text style={styles.explanationText}>
          For example, a chord built from the first note of the scale would be written as "I", and a chord from the fourth note of the scale as "IV".
          </Text>
          <Text style={styles.explanationText}>
          Sometimes, we use lowercase roman numerals ("IV" becomes "iv") or add symbols to the roman numeral, depending on what type of chord it is.
          </Text>
        </View>
      }
      {this.state.pageNumber === 2 &&
        <View>
          <Text style={styles.explanationSubheader}>Intervals and Chord Qualities</Text>
          <Text style={styles.explanationText}>A chord's type (also known as its "quality") is determined by what musical intervals they are made up of.
          A musical interval is simply a measure of musical distance between two notes.
          </Text>
          <Text style={styles.explanationText}>Chords are made up of three or more
          notes, typically a root, third and a fifth (added notes beyond the 1, 3, and 5 are called "extensions", which we'll get to later). These
          thirds and fifths can be closer or farther away from the root, changing their interval. For example, if the third is four half steps away from the root,
          it is a "major third". If the third is only three half steps away, it becomes a "minor third".
          </Text>
          <Text style={styles.explanationText}>A full breakdown of intervals is beyond the scope of this app, but you can find a full breakdown of them <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.musictheory.net/lessons/30')}>here</Text>.
            It is recommended to have a solid
            understanding of intervals before continuing.
          </Text>
          <Text style={styles.explanationText}>What type of third and fifth the chord has determines its quality. For example, if the third of a chord is a major third
          and its fifth is a perfect fifth, the chord is major in quality. If we have a perfect fifth and a minor third, instead, the chord becomes minor. Finally, if
          we have a minor third and a diminished fifth, the chord's type is called diminished.</Text>
          <Text style={styles.explanationText}>Each type of chord has a certain kind of roman numeral associated with it. Let's get into those rules next.</Text>
        </View>
      }
      {this.state.pageNumber === 3 &&
        <View>
          <Text style={styles.explanationSubheader}>Chord Types and Notation</Text>
          <Text style={styles.explanationText}>Roman numerals can be uppercase, lowercase, and have a variety of symbols added to them, depending on the chord's
          type/quality.
          </Text>
          <Text style={styles.explanationText}>Below is a chart of common chord types, what intervals they are made up of (M3 means major third, m3 minor third, etc.), and their associated roman numeral style.
          </Text>
          <View style={[styles.exampleGrid, {marginBottom: 15}]}>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText, {fontWeight: 'bold'}]}>Type</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={[styles.typeGridText, {fontWeight: 'bold'}]}>Intervals</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={[styles.typeGridText, {fontWeight: 'bold'}]}>Roman Num.</Text>
              </View>
            </View>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText]}>Major</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>M3, P5</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>I</Text>
              </View>
            </View>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText]}>Minor</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>m3, P5</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>i</Text>
              </View>
            </View>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText]}>Diminished</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>m3, d5</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>i°</Text>
              </View>
            </View>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText]}>Augmented</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>M3, A5</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>I+</Text>
              </View>
            </View>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText]}>Major Seventh</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>M3, P5, M7</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>IM7</Text>
              </View>
            </View>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText]}>Dominant 7th</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>M3, P5, m7</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>I7</Text>
              </View>
            </View>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText]}>Minor 7th</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>m3, P5, m7</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>im7</Text>
              </View>
            </View>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText]}>Half Diminished 7th</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>m3, d5, m7</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>iø7</Text>
              </View>
            </View>

            <View style={[styles.exampleRowGrid, styles.typeRowGrid]}>
              <View style={styles.typeRowTitle}>
                <Text style={[styles.exampleRowTitleText, styles.typeGridText]}>Fully Diminished 7th</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>m3, d5, d7</Text>
              </View>
              <View style={styles.typeViewGrid}>
                <Text style={styles.typeGridText}>i°7</Text>
              </View>
            </View>
          </View>
        </View>
      }
      {this.state.pageNumber === 4 &&
        <View>
        <Text style={styles.explanationSubheader}>Chord Types in Major Keys</Text>
        <Text style={styles.explanationText}>Remember how chords are generated from notes of the scale? Every type of scale makes different types of chords on each
        scale degree. In a major key, for example, the chord generated from the second scale degree (which we can just call the "two chord") is typically minor, the
        four chord typically major, and so on. These types change if the scale changes (for example, if you are in a minor key instead of a major one).
        </Text>
        <Text style={styles.explanationText}>Here is a simple chord
        chart that shows you the notes of the C major scale, each chord produced from them, and how that chord would be written as a roman numeral:</Text>
        <View style={styles.exampleGrid}>
          <View style={styles.exampleRowGrid}>
            <View style={styles.exampleRowTitle}>
              <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Scale:</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>C</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>D</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>E</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>F</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>G</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>A</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>B</Text>
            </View>
          </View>
          <View style={styles.exampleRowGrid}>
            <View style={styles.exampleRowTitle}>
              <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Chord:</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>C</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>Dm</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>Em</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>F</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>G</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>Am</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>Bdim</Text>
            </View>
          </View>
          <View style={styles.exampleRowGrid}>
            <View style={styles.exampleRowTitle}>
              <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Roman Numeral:</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>I</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>ii</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>iii</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>IV</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>V</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>vi</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>vii°</Text>
            </View>
          </View>
        </View>
        <Text style={styles.explanationText}>Note that every chord is major or minor except for the seven chord, which is diminished.</Text>
        </View>
      }
      {this.state.pageNumber === 5 &&
        <View>
        <Text style={styles.explanationSubheader}>7th Chord Types in Major Keys</Text>
        <Text style={styles.explanationText}>The notation gets a little more complex for seventh chords. They use four notes instead of three, and thus
        have more types. Let's make a chart of the all the seventh chords of the C major scale:
        </Text>
        <View style={styles.exampleGrid}>
          <View style={styles.exampleRowGrid}>
            <View style={styles.exampleRowTitle}>
              <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Scale: </Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>C</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>D</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>E</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>F</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>G</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>A</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>B</Text>
            </View>
          </View>
          <View style={styles.exampleRowGrid}>
            <View style={styles.exampleRowTitle}>
              <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Chord: </Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>CΔ7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>Dm7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>Em7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>FΔ7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>G7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>Am7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>Bø7</Text>
            </View>
          </View>
          <View style={styles.exampleRowGrid}>
            <View style={styles.exampleRowTitle}>
              <Text style={[styles.exampleRowTitleText, styles.exampleGridText]}>Roman Numeral: </Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>IM7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>iim7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>iiim7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>IVM7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>V7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>vim7</Text>
            </View>
            <View style={styles.exampleViewGrid}>
              <Text style={styles.exampleGridText}>viiø7</Text>
            </View>
          </View>
        </View>
        <Text style={styles.explanationText}>There are four types of seventh chords present - major seventh chords ("IM7"), minor seventh chords ("iim7"), dominant seventh chords ("V7"), and half
        diminished seventh chords (viiø7). Like triads, each chord type has a distinctive sound quality from the others.</Text>
        </View>
      }
      {this.state.pageNumber === 6 &&
        <View>
          <Text style={styles.explanationSubheader}>What next?</Text>
          <Text style={styles.explanationText}>Now that you have a basic understanding of what chords are and how they are created within a key, the next step is
          getting used to how they sound when played in a progression!
          </Text>
          <Text style={styles.explanationText}>All you need to do to get started is hit the "Practice!" button below, which will take you a
          test that helps you practice identifying chord progressions by ear, in both major and minor keys, with and without sevenths, and more.
          </Text>
          <Text style={styles.explanationText}>Not all chord progressions are created equal - some are much more common than others! If you want to practice hearing chord
          progressions that are frequent in actual music, head over to the "Practical Examples" section, which tests you on recognizing common chord progressions, using
          practical examples from multiple genres.
          </Text>
          <Text style={styles.explanationText}>There are more rules for roman numeral notation not covered here. You can find a comprehensive list of them on <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Roman_numeral_analysis')}>Wikipedia</Text>.
            </Text>
        </View>
      }
      <View style={styles.explanationFooterWrapper}>
        <TouchableOpacity style={[styles.pageNavigationButtons, {marginLeft: 0}]} onPress={() => this.pageDecrease()} disabled={this.state.pageNumber <= 1}>
          <AntDesign name="arrowleft" size={33} color={this.state.pageNumber <= 1 ? 'white' : 'black'}/>
        </TouchableOpacity>
        <Text style={styles.explanationHeader}>{this.state.pageNumber + '/6'}</Text>
        <TouchableOpacity style={[styles.pageNavigationButtons, {marginRight: 0}]} onPress={() => this.pageIncrease()} disabled={this.state.pageNumber >= 6}>
          <AntDesign name="arrowright" size={33} color={this.state.pageNumber >= 6 ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
    );
  };
};
