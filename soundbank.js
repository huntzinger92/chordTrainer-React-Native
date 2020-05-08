export const soundbank = [
  {
    name: 1,
    triad: {
      quality: 'major',
      root: {
          value: 7,
          src: require('./assets/chords/cmaj_root.mp3')
        },
      inverted: {
        value: 12,
        src: require('./assets/chords/cmaj_inv.mp3')
        }
    },
    seventh: {
      quality: 'major 7th',
      root: {
        value: 11,
        src: require('./assets/chords/cmaj7_root.mp3')
      },
      inverted: {
        value: 7,
        src: require('./assets/chords/cmaj7_inv.mp3')
      }
    }
  },
  {
    name: 2,
    triad: {
      quality: 'minor',
      root: {
        value: 9,
        src: require('./assets/chords/dmin_root.mp3')
      },
      inverted: {
        value: 14,
        src: require('./assets/chords/dmin_inv.mp3')
        }
    },
    seventh: {
      quality: 'minor 7th',
      root: {
        value: 12,
        src:require('./assets/chords/dm7_root.mp3')
      },
      inverted: {
        value: 5,
        src:require('./assets/chords/dm7_inv.mp3')
      }
    }
  },
  {
    name: 3,
    triad: {
      quality: 'minor',
      qualityMinor: 'major',
      root: {
          value: 11,
          src: require('./assets/chords/emin_root.mp3'),
          srcMinor: require('./assets/chords/emaj_root.mp3')
        },
      inverted: {
        value: 7,
        src: require('./assets/chords/emin_inv.mp3'),
        srcMinor: require('./assets/chords/emaj_inv.mp3')
        }
    },
    seventh: {
      quality: 'minor 7th',
      qualityMinor: 'dominant 7th',
      root: {
        value: 2,
        src:require('./assets/chords/em7_root.mp3'),
        srcMinor: require('./assets/chords/e7_root.mp3')
      },
      inverted: {
        value: 7,
        src:require('./assets/chords/em7_inv.mp3'),
        srcMinor: require('./assets/chords/e7_inv.mp3')
      }
    }
  },
  {
    name: 4,
    triad: {
      quality: 'major',
      root: {
          value: 12,
          src: require('./assets/chords/fmaj_root.mp3')
        },
      inverted: {
        value: 9,
        src: require('./assets/chords/fmaj_inv.mp3')
        }
    },
    seventh: {
      quality: 'major 7th',
      root: {
        value: 4,
        src: require('./assets/chords/fmaj7_root.mp3')
      },
      inverted: {
        value: 9,
        src: require('./assets/chords/fmaj7_inv.mp3')
      }
    }
  },
  {
    name: 5,
    triad: {
      quality: 'major',
      qualityMinor: 'diminished',
      root: {
          value: 2,
          src: require('./assets/chords/gmaj_root.mp3'),
          srcMinor: require('./assets/chords/gsharpdim_root.mp3')
        },
      inverted: {
        value: 11,
        src: require('./assets/chords/gmaj_inv.mp3'),
        srcMinor: require('./assets/chords/gsharpdim_inv.mp3')
        },
    },
    seventh: {
      quality: 'dominant 7th',
      qualityMinor: 'fully diminished 7th',
      root: {
        value: 5,
        src: require('./assets/chords/g7_root.mp3'),
        srcMinor: require('./assets/chords/gsharpfulldim_root.mp3')
      },
      inverted: {
        value: 11,
        src: require('./assets/chords/g7_inv.mp3'),
        srcMinor: require('./assets/chords/gsharpfulldim_inv.mp3')
      }
    }
  },
  {
    name: 6,
    triad: {
      quality: 'minor',
      root: {
          value: 4,
          src: require('./assets/chords/amin_root.mp3')
        },
      inverted: {
        value: 12,
        src: require('./assets/chords/amin_inv.mp3')
        }
    },
    seventh: {
      quality: 'minor 7th',
      root: {
        value: 7,
        src: require('./assets/chords/am7_root.mp3')
      },
      inverted: {
        value: 12,
        src: require('./assets/chords/am7_inv.mp3')
      }
    }
  },
  {
    name: 7,
    triad: {
      quality: 'diminished',
      root: {
          value: 5,
          src: require('./assets/chords/bdim_root.mp3')
        },
      inverted: {
        value: 11,
        src: require('./assets/chords/bdim_inv.mp3')
        }
    },
    seventh: {
      quality: 'half diminished 7th',
      root: {
        value: 9,
        src: require('./assets/chords/bhalfdim7_root.mp3')
      },
      inverted: {
        value: 2,
        src: require('./assets/chords/bhalfdim7_inv.mp3')
      }
    }
  }
];
