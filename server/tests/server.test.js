const supertest = require("supertest");
const expect = require("expect");

const {app} = require("./../server");
var {generateMessage, generateLocationMessage} = require("./../utils/message");

describe("generateMessage", () => {
    it("should generate the correct message object", () => {
        var from = "cesar";
        var text = "Hey yo";
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from, text});
    }) 
});

describe("generateLocationMessage", () => {
    it("should generate the correct location object", () => {
        var from = "cesar";
        var latitude = 15;
        var longitude = 19;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from, url});
    }) 
});
