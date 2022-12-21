const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readFile, writeFile } = require('./utils/fs');

const {
  checkEmail,
  checkPass,
} = require('./middlewares/loginValidations');

const {
  checkName,
  checkAge,
  checkTalk,
  checkWatched,
  checkRate,
} = require('./middlewares/talkersValidations');

const { checkToken } = require('./middlewares/tokenValidations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3002';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/search', checkToken, async (req, res) => {
  const { q } = req.query;

  const talkers = await readFile();

  const result = talkers.filter((item) => item.name.includes(q));

  return res.status(200).json(result);
 });

app.get('/talker', async (_req, res) => {
 const talkers = await readFile();
 res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const result = talkers.find((item) => item.id === Number(id));
  if (result) { 
    res.status(200).send(result);
  } else { 
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
 });

 app.post('/login', checkEmail, checkPass, (_req, res) => {
  const randomToken = crypto.randomBytes(8).toString('hex');
  res.status(200).send({ token: randomToken });
 });

 app.post('/talker',
 checkToken, checkName, checkAge, checkTalk, checkWatched, checkRate, async (req, res) => {
  const newTalker = req.body;
  const talkers = await readFile();
  newTalker.id = talkers.length + 1;

  const updateTalkers = [...talkers, newTalker];

  await writeFile(updateTalkers);

  return res.status(201).json(newTalker);
 });

 app.put('/talker/:id', 
 checkToken, checkName, checkAge, checkTalk, checkWatched, checkRate, async (req, res) => {
  const { id } = req.params;
  const editTalker = req.body;
  
  const talkers = await readFile();

  const filterTalkers = talkers.filter((item) => Number(item.id) !== Number(id));
  editTalker.id = Number(id);

  const updateTalkers = [...filterTalkers, editTalker];

  await writeFile(updateTalkers);

  return res.status(200).json(editTalker);
 });

 app.delete('/talker/:id', 
 checkToken, async (req, res) => {
  const { id } = req.params;
  
  const talkers = await readFile();

  const filterTalkers = talkers.filter((item) => Number(item.id) !== Number(id));
 
  await writeFile(filterTalkers);

  return res.status(204).send();
 });
