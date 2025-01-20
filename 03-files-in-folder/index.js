const fs = require('fs');
const path = require('path');
const { stdout } = process;

const folderPath = path.join(__dirname, 'secret-folder');
fs.readdir(folderPath, { withFileTypes: true },  (err, files) => {
    if (!err) {
      files.forEach(file => {
        if (file.isFile()) {
          const pathFile = path.join(folderPath, file.name);
          fs.stat(pathFile, (err, stats) => {
            if (!err) {
              stdout.write(`File: ${path.basename(file.name, path.extname(file.name))} - ${path.extname(file.name).slice(1)} - ${stats.size / 1000}kb\n`);
            } else {
              stdout.write(`\n${err}`);
              return;
            }
          });
        }  
      });
    } else {
        stdout.write(`\n${err}`);
        return;
    }
});