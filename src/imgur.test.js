const ImgurClient = require('./imgur');
const { clientId, clientSecret } = require('./config');


let client = new ImgurClient(clientId, clientSecret);

test('client successfully stores the clientId and clientSecret', () => {
    expect(client.clientId).toBe(clientId);
    expect(client.clientSecret).toBe(clientSecret);
});

test('client can get galleries from the API endpoint', () => {
    return client.getGalleries()
        .then((val) => expect(val).toBe("Got a response"))
})