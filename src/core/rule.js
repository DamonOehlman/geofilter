function Rule(type, args) {
    // check if we have been supplied a complete object in tht type object
    if (typeof type == 'object' && (! (type instanceof String))) {
        // map the parameters of the type to this
        for (var key in type) {
            if (type.hasOwnProperty(key)) {
                this[key] = type[key];
            }
        }
    }
    else if (typeof type == 'object') {
        this.type = type;
        this.args = args || {};
    }
}