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

module.exports = mockrules;