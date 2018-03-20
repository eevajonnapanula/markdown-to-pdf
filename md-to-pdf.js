const markdownpdf = require("markdown-pdf");
const fs = require("fs");


const convertToPdf = (dirFrom, dirTo, cssPath) => {
  const { filesFrom, filesTo } = getDirs(dirFrom, dirTo);
  handleConvert(filesFrom, filesTo, cssPath);
}

const getDirs = (dirFrom, dirTo) => {
  const filesFrom = [];
  fs.readdirSync(dirFrom).forEach(file => {
      filesFrom.push(dirFrom + '/' + file);
  });

  const filesTo = filesFrom.map(file => {
    let newFile = file
                .replace('.md', '.pdf')
                .replace(dirFrom, dirTo);
    return newFile;
  });

  return {
    filesFrom,
    filesTo
  };
}

const handleConvert = (filesFrom, filesTo, cssPath) => {
  const options = {
    cssPath: cssPath ? cssPath : './pdf.css',
    remarkable: {
        html: true,
        breaks: true,
        syntax: [ 'footnote', 'sup', 'sub' ]
    }
  }

  markdownpdf(options)
    .from(filesFrom)
    .to(filesTo, () => {
      console.log('Done');
    });
}


module.exports.convertToPdf = convertToPdf;
