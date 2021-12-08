const fs = require('fs');
const { Readable, Transform, Writable } = require('stream');
const moment = require('moment');


const rs = new Readable();
const ts = new Transform();
const ws = new Writable();
const out = fs.createWriteStream(__dirname + "/output.txt");

rs._read = () => {};
ts._transform = (chunk, enc, cb) => {
    ts.push(moment(parseInt(chunk)).format("dddd, MMMM Do YYYY, hh:mm:ss"));
    cb();
};
ws._write = (chunk, enc, next) => {
    console.log(chunk.toString());
    out.write(chunk + '\n');
    next();
};


setInterval(() => {
    rs.push(Date.now().toString());
}, 1000);

rs.pipe(ts).pipe(ws);