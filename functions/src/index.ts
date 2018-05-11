import * as functions from 'firebase-functions';
import * as vision from '@google-cloud/vision';
import * as Busboy from 'busboy';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const receiptdetector = functions.https.onRequest((req, res) => {

  console.log('req.method: ' + req.method);
  console.log('req.headers: ' + JSON.stringify(req.headers));

  if (req.method === 'POST') {
    const busboy = new Busboy({ headers: req.headers });
    const uploads = {};

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log(
        'File(main) [' +
          fieldname +
          ']: filename: ' +
          filename +
          ', encoding: ' +
          encoding +
          ', mimetype: ' +
          mimetype
      );
      let buffer = '';

      file.setEncoding('base64');
      file.on('data', function(data) {
        console.log(
          'File(data) [' + fieldname + '] got ' + data.length + ' bytes'
        );
        buffer += data;
      });

      file.on('end', function() {
        console.log(
          'File(end) [' + fieldname + '] Finished ==== ' + JSON.stringify(file)
        );
        uploads[fieldname] = buffer;
      });
    });

    busboy.on('field', function(
      fieldname,
      val,
      fieldnameTruncated,
      valTruncated,
      encoding,
      mimetype
    ) {
      console.log(
        'Field(field) [' + fieldname + ']: value: ' + util.inspect(val)
      );
      uploads[fieldname] = val;
    });

    busboy.on('finish', function() {
      let count = 0;
      let len = 0;
      let fileBuffer = '';
      for (const name in uploads) {
        len = uploads[name].length;
        fileBuffer = uploads[name];
        count++;
      }

      console.log('Done parsing form! ' + count + ' files found, len:' + len);
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
    req.pipe(busboy);
  } else {
    // Return a "method not allowed" error
    res.status(405).end();
  }
});

function sendResponse(res, obj){
  res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send(obj);
}

function detectFile(buffer) {
  console.log('start detection: ' + buffer.length);
  const image = {
    content: buffer
  };

  const client = new vision.ImageAnnotatorClient();

  return client
    .textDetection({ image: image })
    .then(results => {
      const detections = results[0].textAnnotations;
      console.log('Text:');
      detections.forEach(text => console.log(text));

      return detections;
    })
    .catch(err => {
      console.error('ERROR:', err);
      return err;
    });
}
