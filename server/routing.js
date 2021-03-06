const path = require(`path`);

const HTTPError = require(`./helpers/HTTPError`);
const publicDir = path.join(__dirname, `..`, `public`);

module.exports = (express, app) => {
  // CV
  app.get(`/cv.pdf`, (req, res) => res.sendFile(path.join(publicDir, `cv`, `cvdanish.pdf`)));

  // Redirects
  app.get(`/latex/lstdefinelanguage`, (req, res) => res.redirect(`/latex/listing`));
  app.get(`/dw`, (req, res) => res.redirect(`/damsgaard-writing`));
  app.get(`/cv`, (req, res) => res.redirect(`/cv.pdf`));

  /* For testing error handling */
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
