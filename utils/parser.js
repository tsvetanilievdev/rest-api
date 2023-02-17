function parseError(error) {
    if (Array.isArray(error)) {
        return error.map(x => x.msg).join('\n')
    } else if (error.name == 'ValidationError') { // mongoose error

    } else {
        return error.message
    }
}

module.exports = parseError;