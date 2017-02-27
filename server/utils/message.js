var generateMessage = (from, text) => {
    return {
        from, 
        text, 
        createdAt: new Date().getTime(),
        createdAtTime: `${new Date().getHours()}:${new Date().getMinutes()}`
    }
}

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from, 
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime(),
        createdAtTime: `${new Date().getHours()}:${new Date().getMinutes()}`
    }
}

module.exports = {generateMessage, generateLocationMessage};
