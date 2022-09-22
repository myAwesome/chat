class Login {
  storage;
  constructor(app, storage) {
    this.storage = storage;
    this.defineRoutes(app);
  }

  existingParticipant = async (email) => {
    return this.storage.getParticipant({ email });
  };

  hPass = (password) => `hashed_${password}`;

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

      res.json({ success: true });
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
      if (this.hPass(req.body.password) === existingParticipant.password) {
        res.json(existingParticipant);
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
