const path = require(`path`);

const HTTPError = require(`./helpers/HTTPError`);

module.exports = (express, app) => {
  const publicDir = path.join(__dirname, `..`, `public`);

  app.get(`/`, (req, res) => res.sendFile(path.join(publicDir, `index.html`)));

  // For testing error handling
  const errorDir = path.join(publicDir, `error`);
  app.get(`/error`, (req, res) => res.sendFile(path.join(errorDir, `error.html`)));
  app.get(`/error/intended`, () => {
    throw new HTTPError(200, // OK
      `Intended error for testing HTTPError error-handling`,
      `If this message shows, it means that HTTPError handling is working correctly.`);
  });
  app.get(`/error/unintended`, () => {
    throw new Error(`Intended error for testing handling of unintended errors`);
  });
};
