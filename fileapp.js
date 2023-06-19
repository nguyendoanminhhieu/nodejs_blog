const fileobj = require('fs');

const filecontent = fileobj.readFileSync('./alice.txt', (err, data) => {
    if (err) {
        throw err;
        console.log(`The application contains error: ${err.errno}, ${err.message}`);
        return;
    }
});
console.log(`The application successfully read file. The content is ${filecontent.toString()}`)

