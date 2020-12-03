import express, { Request, Response, NextFunction } from 'express';
import submitRoutes from './routes/submit';
import notifyRoutes from './routes/notify';

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});


const app = express();
const PORT = process.env.PORT || 3000;

app.use('/submit', submitRoutes);
app.use('/notify', notifyRoutes);

//error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
