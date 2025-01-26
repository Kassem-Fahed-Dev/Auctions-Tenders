const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: `./config.env` });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('done'))
  .catch((err) => console.log(err));
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log('the server is running');
});
