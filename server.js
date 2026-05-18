require('dotenv').config();
const express    = require('express');
const jwt        = require('jsonwebtoken');
const cors       = require('cors');


const app        = express();
const PORT       = 8080;
const CLIENT_ID  = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.use(cors());
app.use(express.json());

app.post('/api/users/sts', (req, res) => {
  const identity    = req.body.identity || 'anonymous@user.com';
  const isAnonymous = req.body.isAnonymous || false;

  const payload = {
    iat:         new Date().getTime(),
    exp:         new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
    aud:         'https://idproxy.kore.com/authorize',
    iss:         CLIENT_ID,
    sub:         identity,
    isAnonymous: isAnonymous,
  };

  const token = jwt.sign(payload, CLIENT_SECRET);
  console.log(token);
  res.json({ jwt: token });
});

app.listen(PORT, () => {
  console.log(`✅ Kore JWT server running at http://localhost:${PORT}`);
});