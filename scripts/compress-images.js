// scripts/compress-images.js
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
  await imagemin(['src/assets/images/*.{jpg,png}'], {
    destination: 'public/images/optimized',
    plugins: [
      imageminMozjpeg({ quality: 80 }), // JPEG质量压缩到80%
      imageminPngquant({ quality: [0.6, 0.8] }) // PNG质量压缩
    ]
  });
  console.log('图片优化完成!');
})();