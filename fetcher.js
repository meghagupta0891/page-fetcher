const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const getResource = (serverAddress, localPath) => {
  request(serverAddress, (error, response, body) => {
    if (error) {
      console.log(error); //handle error when its requesting data
      process.exit();
    }
    fs.writeFile(localPath, body, (error) => {//writing the file
      fs.access(localPath, (error) => {
        if (error) 
           console.log(error);
        process.exit();
      });
      if (error) 
         console.log(error);
      console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
      rl.close();
    });
  });
};

const pageFetcher = () => {
  const input = process.argv.slice(2);
  const [server, path] = [input[0], input[1]];
  if (fs.existsSync(path)) {
    rl.question(`${path} already exists, do you still want to confinue? (press y for yes, any other key to exit)`, (answer) => {
      if (answer.toLowerCase() === 'y') {
        getResource(server, path);
      } else process.exit();
    });
  } else getResource(server, path);
};

pageFetcher();