const https = require('https');
const fs = require('fs');
const path = require('path');

const MODELS_URL = 'https://raw.githubusercontent.com/vladmandic/face-api/master/model';
const models = [
  'tiny_face_detector_model.bin',
  'tiny_face_detector_model-weights_manifest.json',
  'age_gender_model.bin',
  'age_gender_model-weights_manifest.json'
];

const modelsDir = path.join(__dirname, '../public/models');

// Create models directory if it doesn't exist
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const downloadFile = (url, filePath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${path.basename(filePath)}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => reject(err));
      });

      response.on('error', (err) => {
        fs.unlink(filePath, () => reject(err));
      });
    });
  });
};

const downloadModels = async () => {
  console.log('Starting model downloads...');
  
  try {
    await Promise.all(
      models.map(model => {
        const url = `${MODELS_URL}/${model}`;
        const filePath = path.join(modelsDir, model);
        return downloadFile(url, filePath);
      })
    );
    console.log('All models downloaded successfully!');
  } catch (error) {
    console.error('Error downloading models:', error);
    process.exit(1);
  }
};

downloadModels(); 