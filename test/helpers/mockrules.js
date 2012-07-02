var mockrules = {};

mockrules.likeSand = {
    type: 'like',
    args: {
        property: 'SEDCLASS',
        value: 'sand*'
    }
};

mockrules.heavierThan20 = {
    type: 'gt',
    args: {
        property: 'WEIGHT',
        value: 20
    }
};

module.exports = mockrules;