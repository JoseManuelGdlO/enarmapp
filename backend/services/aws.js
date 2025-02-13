const AWS = require('aws-sdk');
const s3 = new AWS.S3({ accessKeyId: 'AKIA6HPBFGT5Q54KAMI7', secretAccessKey: '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' });

async function uploadImage(image) {
    const imageBuffer = Buffer.from(image.data.split(',')[1], 'base64');
    const params = {
        Bucket: 'enrm-dev-images',
        Key: image.name.split(' ').join('-').trim() + '_' + new Date().getTime().toString() + '.' + image.mimetype.split('/')[1],
        Body: imageBuffer,
        ACL: 'public-read',
        ContentType: image.mimetype,
        ContentLength: image.size
    };
    const response = await s3.upload(params).promise();
    return response.Location
}

module.exports = {
    uploadImage
}