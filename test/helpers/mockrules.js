exports.likeSand = {
  type: 'like',
  args: {
    property: 'SEDCLASS',
    value: 'sand*'
  }
};

exports.likeSandNoCase = {
  type: 'like',
  args: {
    property: 'SEDCLASS',
    value: 'sand*',
    matchCase: false
  }
};

exports.heavierThan20 = {
  type: 'gt',
  args: {
    property: 'WEIGHT',
    value: 20
  }
};

exports.inQLD = {
  type: 'bbox',
  args: {
    property: 'the_geom',
    min: '-28.94 138.01',
    max: '-9.54 154.42'
  }
};