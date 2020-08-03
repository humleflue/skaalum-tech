/* eslint no-console: 0 */

/* External modules */
const express    = require(`express`);       // For running the server
const app        = express();                // For running the server
const port       = 3000;                     // Server port number
const bodyParser = require(`body-parser`);   // For parsing the request. Makes all request data available in req.body
const fs         = require(`fs`);            // For reading/writing files
const path       = require(`path`);          // Used to avoid errors when reffering to a path in the file system
const cors       = require(`cors`);          // Used to enable CORS
const morgan     = require(`morgan`);        // Used to log all info about client from the request
const favicon    = require(`serve-favicon`); // Used to serve the favicon more effectively (no need to put it in the html)

/* Internal modules */
const handleRoutes     = require(`./server/routing`);
const handleErrors     = require(`./server/error_handler`);
const mw               = require(`./server/middleware`);
const consoleLogToFile = require(`./server/helpers/consol_log_file`);

/* Setup */
consoleLogToFile(); // Modifies the console, such that it writes logs into the server/logs dir
// Load settings into grobal variable (available across all scripts)
global.conf = JSON.parse(fs.readFileSync(path.join(__dirname, `server_settings.json`)));

/* Middleware */
app.use(mw.requestValidator);
// Serves the favicon and does so that it doesn't get logged (no need to serve favicon through the html)
app.use(favicon(path.join(__dirname, `public`, `favicon.ico`)));
if (global.conf.log) {
  app.use(mw.logger); // Logs requests to console
}
app.use(morgan(`combined`, { stream: mw.getLogWriteStream() })); // Logs all info about client from the request
app.use(cors({ credentials: true, origin: true }));              // Enables CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routing */
app.use(express.static(path.join(__dirname, `public`), { index: false })); // Serves all static files (js, css etc.)
handleRoutes(express, app);
handleErrors(express, app);
app.use((req, res) => res.sendStatus(404)); // Handles non-existing URL-requests. Has to be the last line before app.listen.

app.listen(port, () => console.log(`skaalum-tech listening at http://localhost:${port}`));
