//- It is called on the command line like `node urls.js FILENAME`, and it reads the contents of  
//  ***FILENAME***(each line of that file will be a URL).
//- For each URL, it will get that page (a GET request to the URL) and save the HTML in a new file.
//- For each URL, the output filename should be the hostname of the URL. For example, 
//  for the input URL *http://yahoo.com/blah/blah*, your script should write the contents to a plain text file called ***yahoo.com***

const fs = require('fs');
//const process = require('process');
const axios = require('axios');
//const path = "urls.txt"
//const urlModule = require('url')

function getBaseFileName(url) {
    try {
    const parsedUrl = new URL(url);
    let baseName = parsedUrl.hostname;
    baseName = baseName.replace(/[\:\?\/]/g, '_');  //.....k
    
    return baseName;

} catch (error) {
    console.error(`Error parsing URL '${url}':`, error);
    return null;
}
}

function processUrls(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const urls = data.split('\n'); //...k

        urls.forEach(url => {
            axios.get(url).then(response => {
                const htmlContent = response.data;
                const baseFileName = getBaseFileName(url); 
                writeToOutputFile(`${baseFileName}.html`, htmlContent);
            }).catch(error => {
                console.error(`Error fetching ${url}:`, error);
            });
        });
    });
}

  function writeToOutputFile(outputFilePath, data) {
    fs.writeFile(outputFilePath, data, 'utf8', err => {
        if (err) {
            console.error(`Couldn't write to ${outputFilePath}:`, err);
            return;
        }
        console.log(`Data written to ${outputFilePath}`);
    });
}


processUrls('urls.txt');