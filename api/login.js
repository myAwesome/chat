class Login {
  storage;
  constructor(app, storage) {
    this.storage = storage;
    this.defineRoutes(app);
  }

  defineRoutes = (app) => {
    const storage = this.storage;
    app.post(`/sign-up`, async (req, res) => {
      console.log(req.body);
      res.json({ id: 1 });
    });

    app.post(`/sign-in`, async (req, res) => {
      console.log(req.body);
      res.json({
        id: 1,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      });
    });

    app.post(`/sign-out`, async (req, res) => {
      console.log(req.body);
      res.json();
    });
  };
}

module.exports = { Login };
