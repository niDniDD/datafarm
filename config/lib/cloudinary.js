'use strict';
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dlwyi2urj',
    api_key: '139831195616464',
    api_secret: 'LriOf0UCkdde4kV4Xq92IOJehos'
});

module.exports.cloudinary = cloudinary;