var mockrules = {};

mockrules.likeFred = {
    type: 'like',
    args: {
        property: 'name',
        value: 'Fred'
    }
};

mockrules.olderThan50 = {
    type: 'gt',
    args: {
        property: 'age',
        value: 50
    }
};

module.exports = mockrules;