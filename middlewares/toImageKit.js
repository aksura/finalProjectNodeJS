
function toImageKit(req, res, next) {
    console.log("test");
    const formData = require('form-data');
    
    let instance = require('../helpers/axios');
    
    // console.log(req.file);
    
    let notPrivate = process.env.private;
    let api_key = Buffer.from(notPrivate, "utf8").toString("base64");
    
    // console.log(`Basic ${api_key}`);
    const data = new formData();

    data.append('file', req.file.buffer.toString("base64"));
    data.append('fileName', req.file.originalname);


    // console.log(data.getHeaders());
    instance({
        url: '/api/v1/files/upload',
        method: "post",
        headers: {
            Authorization: `Basic ${api_key}`,
            ...data.getHeaders()
        },
        data: data
    })
        .then(result => {
            // console.log(result.data);
            req.picture = result.data;
            
            next();
        })
        .catch(err => {
            console.log(err);
        })

}

module.exports = toImageKit;