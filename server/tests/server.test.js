const supertest = require("supertest");
const expect = require("expect");

const {app} = require("./../server");
var {generateMessage} = require("./../utils/message");

describe("generateMessage", () => {
    it("should generate the correct message object", () => {
        var from = "cesar";
        var text = "Hey yo";
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from, text});
    }) 
});
