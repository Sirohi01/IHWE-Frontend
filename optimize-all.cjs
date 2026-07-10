const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const publicDir = path.join(baseDir, 'public');
const assetsDir = path.join(baseDir, 'src', 'assets');

const filesToOptimize = [
  { dir: publicDir, name: 'applog.jpeg', width: 200 },
  { dir: publicDir, name: 'aa3.png', width: 200 },
  { dir: assetsDir, name: '12345.png', width: 400 },
  { dir: assetsDir, name: 'logo2.png', width: 200 },
  { dir: assetsDir, name: 'logo3.png', width: 200 },
  { dir: assetsDir, name: 'logo4.png', width: 200 },
  { dir: assetsDir, name: 'arogya.png', width: 200 },
];

async function run() {
  for (const file of filesToOptimize) {
    try {
      const inputPath = path.join(file.dir, file.name);
      if (fs.existsSync(inputPath)) {
        const isJpeg = file.name.endsWith('.jpeg') || file.name.endsWith('.jpg');
        const tempPath = inputPath + '.temp';
        
        const sharpInstance = sharp(inputPath).resize(file.width);
        
        if (isJpeg) {
          await sharpInstance.jpeg({ quality: 80 }).toFile(tempPath);
        } else {
          await sharpInstance.png({ quality: 80, compressionLevel: 9 }).toFile(tempPath);
        }
        
        try { fs.unlinkSync(inputPath); } catch (e) {}
        try { fs.renameSync(tempPath, inputPath); } catch (e) {}
        console.log(`Optimized in place: ${file.name}`);
      }
    } catch (e) {
      console.log(`Failed to optimize: ${file.name}`, e.message);
    }
  }
}

run().catch(console.error);
