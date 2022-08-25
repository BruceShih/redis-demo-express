import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { createClient } from 'redis';

const app: Express = express();
app.use(bodyParser.json());

app.get('/get/:key', async (req: Request, res: Response) => {
  const { key } = req.params;
  const client = createClient();
  await client.connect();
  const value = await client.get(key);
  res.send(value);
});

app.post('/set', async (req: Request, res: Response) => {
  const key = req.body.key;
  const value = req.body.value;
  const client = createClient();
  await client.connect();
  await client.set(key, value);
  res.send();
});

app.listen(8080, () => {
  console.log('listening 8080');
});
