import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import helmet from 'helmet';
import session from 'express-session';
import mediaRouter from './routes/media-router.mjs';
import userRouter from './routes/user-router.mjs';
import authRouter from './routes/auth-router.mjs';
import {
  errorHandler,
  logger,
  notFoundHandler,
} from './middlewares/middlewares.mjs';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'localhost:3000',
      path: '/',
      expires: expiryDate,
    },
  })
);
app.set('view engine', 'pug');
app.set('views', 'src/views');
// Reduce Fingerprinting (security)
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(
  session({
    secret: 'dummy secret',
    name: 'sessionId',
  })
);
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/docs', express.static(path.join(__dirname, '../docs')));
// Serve uploaded mediafiles url: /media/{file}
app.use('/media', express.static(path.join(__dirname, '../uploads')));

// Serve uploaded mediafiles url: /media/{file}
app.use('/forms', express.static(path.join(__dirname, '../test-forms')));

// simple custom middleware for logging/debugging all requests
if (process.env.NODE_ENV !== 'production') {
  app.use(logger);
}

// render pug a file (home.pug) example
app.get('/', (req, res) => {
  const values = {title: 'Dummy REST API docs', message: 'TODO: docs'};
  res.render('home', values);
});

// auth endpoints
app.use('/api/auth', authRouter);
// media endpoints
app.use('/api/media', mediaRouter);
// user endpoints
app.use('/api/users', userRouter);

// All others routes => 404
app.use(notFoundHandler);
// default error handler
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
