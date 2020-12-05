import express, { Request, Response, NextFunction } from 'express';
import submitRoutes from './routes/submit';
import notifyRoutes from './routes/notify';
import redisClient from './configs/redis';

process.on('uncaughtException', e => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(1);
});


const app = express();
const PORT = process.env.PORT || 3000;

app.use('/submit', submitRoutes);
app.use('/notify', notifyRoutes);

//error handler middleware TODO: proper error handling :D
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  redisClient.on('connect', function() {
    console.log('Connected to redis');
  });

  redisClient.on('error', function (err: Error) {
    console.log('Something went wrong ' + err);
    });
});
