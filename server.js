import express from 'express';

const app = express();
app.use(express.json());

app.post('/log', (req, res) => {
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket.remoteAddress;

  const data = {
    ip,
    ...req.body,
    receivedAt: new Date().toISOString(),
  };

  console.log('New hit:', data);

  res.json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});
