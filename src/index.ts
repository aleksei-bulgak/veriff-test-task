import express, {Request, Response} from 'express';
import './externalService';

import configs from './config';
import SessionService from './services/sessionService';
import SessionsRouter from './routes/sessions';
import SessionClient from './clients/internalClient';
import errorHandler from './middlewares/errorHandlerMiddleware';

configs.env();
const internalServerUrl = configs.internalConfig();
const sessionClient = new SessionClient(internalServerUrl);
const sessionService = new SessionService(sessionClient);

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/sessions', SessionsRouter(sessionService));

app.use('*', (req: Request, res: Response): void => {
  res.status(404).json({ message: `Page not found for url ${req.originalUrl}` });
});
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Service is listening at http://localhost:${port}`);
});
