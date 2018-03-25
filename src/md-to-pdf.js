const markdownpdf = require('markdown-pdf');
const fs = require('fs');
const path = require('path');

const convertToPdf = (dirFrom, dirTo, cssPath) => {
  const { filesFrom, filesTo } = getDirs(dirFrom, dirTo);
  handleConvert(filesFrom, filesTo, cssPath);
}

const getDirs = (dirFrom, dirTo) => {
  try {
    const filesFrom = fs.readdirSync(dirFrom)
      .map(file => dirFrom + '/' + file);

    const filesTo = filesFrom.map(file => {
      let newFile = file.replace('.md', '.pdf').replace(dirFrom, dirTo);
      return newFile;
    });

    return {
      filesFrom,
      filesTo
    };
  } catch (e) {
    console.error('Error in getDirs ', e);
    process.exit(1);
  }
}

const handleConvert = (filesFrom, filesTo, cssPath) => {
  const options = {
    cssPath: cssPath ? cssPath : path.resolve(__dirname, './pdf.css'),
    remarkable: {
      html: true,
      breaks: true,
    }
  }

  markdownpdf(options)
    .from(filesFrom)
    .to(filesTo, () => {
      console.log('Convert done');
    });
}


module.exports.convertToPdf = convertToPdf;
