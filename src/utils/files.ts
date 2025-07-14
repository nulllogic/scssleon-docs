import fs from 'node:fs'
import readline from 'node:readline'

export const read_lines_in_range = async function (file_path, start_line, end_line) {

  let results = [];
  const fileStream = fs.createReadStream(file_path, {encoding: 'utf8'});
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity // Handle all common line endings
  });

  let currentLineNumber = 0;

  for await (const line of rl) {
    currentLineNumber++;

    if (currentLineNumber >= start_line && currentLineNumber <= end_line) {
      results.push(line);
    }

    // Optimization: If we've passed the endLine, we can close the interface
    if (currentLineNumber > end_line) {
      rl.close();
      break; // Exit the loop
    }
  }

  // Handle potential errors during file reading
  rl.on('error', (err) => {
    console.error('Error reading file:', err);
  });

  return results.join('\n');
}