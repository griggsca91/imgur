const { request } = require('https');

module.exports = class ImgurClient {
    constructor(clientId, clientSecret) {
        this.clientId = clientId
        this.clientSecret = clientSecret
    }

    //curl --location --request GET "https://api.imgur.com/3/gallery/{{section}}/{{sort}}/{{window}}/{{page}}?showViral={{showViral}}&mature={{showMature}}&album_previews={{albumPreviews}}" \
    //--header "Authorization: Client-ID {{clientId}}"

    getGalleries({ section = 'hot',
        sort = 'viral',
        window = 'day',
        page = -1 } = {}) {

        const options = {
            headers: {
                'Authorization': `Client-ID ${this.clientId}`
            }
        }

        return new Promise((resolve, reject) => {
            const url = `https://api.imgur.com/3/gallery/${section}/` +
            `${sort}/` +
            `${window}/` +
            `${page}`;

            console.log(url);
            const req = request(url
                // `?showViral={{showViral}}` +
                // `&mature={{showMature}}` +
                // `&album_previews={{albumPreviews}}`
                , options);


            req.on('response', function (res) {
                let buffer = "";
                res.on("data", (data) => {
                    buffer += data;
                })

                res.on("end", () => {
                    const data = JSON.parse(buffer);

                    console.log(data);
                    resolve("Got a response")
                });
                
                res.on("error", (error) => {
                    console.log("There was an error");
                    reject(error);
                })
            });

            req.end()
        });


    }
}