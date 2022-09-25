const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "my_secret_key";
const jwtExpirySeconds = 7 * 24 * 60 * 60;
const domainFacade = require("../domain/service/facade");

class Login {
  storage;
  constructor(app, storage) {
    this.storage = storage;
    this.defineRoutes(app);
  }

  existingParticipant = async (email) => {
    return this.storage.getParticipant({ email });
  };

  static hPass = async (password) => {
    return await bcrypt.hash(password, 10);
  };

  createToken = (email) => {
    return jwt.sign({ email }, jwtKey, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });
  };

  defineRoutes = (app) => {
    app.post(`/sign-up`, async (req, res) => {
      const existingParticipant = await this.existingParticipant(
        req.body.email
      );
      if (existingParticipant) {
        res.json({
          success: false,
          message: `Email ${req.body.email} already exist`,
        });
        return;
      }
      const newParticipant = domainFacade.createParticipant({
        ...req.body,
        password: await Login.hPass(req.body.password),
        token: this.createToken(req.body.email),
      });
      const p = await this.storage.createParticipant(newParticipant);
      res.json({ success: true, p });
    });

    app.post(`/sign-in`, async (req, res) => {
      const existingParticipant = await this.existingParticipant(
        req.body.email
      );
      if (!existingParticipant) {
        res.json({
          success: false,
          message: `Email ${req.body.email} does not exist`,
        });
        return;
      }
      if (
        await bcrypt.compare(req.body.password, existingParticipant.password)
      ) {
        const token = this.createToken(existingParticipant.email);

        console.log({ ...existingParticipant, token });
        res.json({ ...existingParticipant, token });
        return;
      }
      res.json({ success: false, message: "wrong credentials" });
    });

    app.post(`/sign-out`, async (req, res) => {
      console.log(req.body);
      res.json();
    });
  };
}

module.exports = { Login };
