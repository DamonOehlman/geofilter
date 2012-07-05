var mockrules = {};

mockrules.likeSand = {
    type: 'like',
    args: {
        property: 'SEDCLASS',
        value: 'sand*'
    }
};

mockrules.likeSandNoCase = {
    type: 'like',
    args: {
        property: 'SEDCLASS',
        value: 'sand*',
        matchCase: false
    }
};

mockrules.heavierThan20 = {
    type: 'gt',
    args: {
        property: 'WEIGHT',
        value: 20
    }
};

mockrules.inQLD = {
    type: 'bbox',
    args: {
        property: 'the_geom',
        min: '-28.94 138.01',
        max: '-9.54 154.42'
    }
};

module.exports = mockrules;