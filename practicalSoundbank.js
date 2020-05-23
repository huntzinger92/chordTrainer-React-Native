export const practicalSoundbank = {
  givenOneChord: require('./assets/chords/cmaj7_inv.mp3'),
  'electronica': [
    {
      src: require('./assets/chords/cmaj_root.mp3'),
      correctChords: ['I', 'iii', 'I', 'iii'],
    },
    {
      src: require('./assets/chords/dmin_root.mp3'),
      correctChords: ['I', 'iii', 'IV', 'IV'],
    },
    {
      src: require('./assets/chords/emin_root.mp3'),
      correctChords: ['I', 'iii', 'vi', 'IV'],
    },
  ],
  'funk': [
    {
      src: require('./assets/chords/drumLoopTest.mp3'),
      correctChords: ['im7', 'bIIM7', 'IIIM7', 'bIIM7'],
    },
  ],
  'jazz': [
    {
      src: '',
      correctChords: ['iim7', 'V7alt', 'IM7', 'IM7'],
    },
  ],
};
