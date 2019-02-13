function compress2() {
  // Require fs module.
  var file_system = require("fs");
  // Require zlib module.
  var zlib = require("zlib");

  // Open read stream from source file.
  var read_stream = file_system.createReadStream("./files/big.file");

  // Create a write stream to output zip file.
  var write_stream = file_system.createWriteStream("./files/target.txt.gz");

  //1. Create a zip write stream.
  var zip_write_stream = zlib.createGzip();

  //2. Create pipe stream between source file read stream and the zip write stream.
  // This pipe stream will compress the source data to zip format.
  var zip_pipe_stream = read_stream.pipe(zip_write_stream);

  // Create a pipe stream between the zip_pipe_stream and write_stream
  // to write compressed data to target zip file.
  zip_pipe_stream.pipe(write_stream);

  console.log("Compress zip file success.");
}

compress2();
