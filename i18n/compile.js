const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { parse } = require('csv');

const stream = fs.createReadStream(path.resolve(__dirname, './data.csv')).pipe(
  parse({
    columns: true,
  }),
);

const result = {};

stream.on('data', (data) => {
  const { id } = data;
  // eslint-disable-next-line no-param-reassign
  delete data.id;
  result[id] = data;
});

stream.on('end', () => {
  fs.writeFileSync(
    path.resolve(__dirname, 'data.json'),
    JSON.stringify(result),
  );
  console.log('compiled i18n csv into json');
});
