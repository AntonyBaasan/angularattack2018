"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const vision = require("@google-cloud/vision");
const Busboy = require("busboy");
// import * as util from 'util';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.receiptdetector = functions.https.onRequest((req, res) => {
    if (req.method === 'OPTIONS') {
        sendResponse(res, 'Hello from firebase');
    }
    if (req.method === 'POST') {
        const busboy = new Busboy({ headers: req.headers });
        const uploads = {};
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let buffer = '';
            file.setEncoding('base64');
            file.on('data', function (data) {
                // console.log('File(data) [' + fieldname + '] got ' + data.length + ' bytes');
                buffer += data;
            });
            file.on('end', function () {
                // console.log('File(end) [' + fieldname + '] Finished ==== ' + JSON.stringify(file));
                uploads[fieldname] = buffer;
            });
        });
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            // console.log('Field(field) [' + fieldname + ']: value: ' + util.inspect(val));
            uploads[fieldname] = val;
        });
        busboy.on('finish', function () {
            let count = 0;
            // let len = 0;
            let fileBuffer = '';
            for (const name in uploads) {
                // len = uploads[name].length;
                fileBuffer = uploads[name];
                count++;
            }
            // console.log('Done parsing form! ' + count + ' files found, len:' + len);
            detectFile(fileBuffer)
                .then(result => {
                sendResponse(res, {
                    message: count + ' files found',
                    result: result
                });
            })
                .catch(err => {
                sendResponse(res, {
                    message: count + ' files found',
                    error: err
                });
            });
        });
        if ('rawBody' in req) {
            busboy.end(req['rawBody']);
        }
        else {
            req.pipe(busboy);
        }
    }
    else {
        // Return a "method not allowed" error
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.status(405).end();
    }
});
function sendResponse(res, obj) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.send(obj);
}
function detectFile(buffer) {
    // console.log('start detection: ' + buffer.length);
    const image = {
        content: buffer
    };
    const client = new vision.ImageAnnotatorClient();
    return client
        .documentTextDetection({ image: image })
        .then(results => {
        return results[0].fullTextAnnotation;
    })
        .catch(err => {
        console.error('ERROR:', err);
        return err;
    });
}
//# sourceMappingURL=index.js.map