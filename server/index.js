const express = require("express");
const bodyParser = require("body-parser");
const {FormData} = require("formdata-node");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { client_id, redirect_uri, client_secret } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/authenticate", (req, res) => {
  const { code } = req.body;

  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", redirect_uri);

  access_token = '';
  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      access_token = params.get("access_token");
      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
      return res.status(200).json({ access_token, user: response });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

const PORT = process.env.SERVER_PORT || 5321;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
