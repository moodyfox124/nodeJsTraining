const { reverseString } = require('./utils/strings');
process.stdin.setEncoding('utf-8');

process.stdout.write('> ');

process.stdin.on('data', function (data) {
  const noNewLineData = data.replace(/\r?\n|\r/, "");
  const reversedString = reverseString(noNewLineData);
  console.log(`  ${reversedString}`);
  process.stdout.write('> ');
});
