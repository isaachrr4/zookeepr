const router = require('express').Router();
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper
} = require('../../lib/zookeeper');
const { zookeeper } = require('../../data/zookeepers.json');

router.get('/zookeeper', (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/zookeeper/:id', (req, res) => {
  const result = findById(req.params.id, zookeeper);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/zookeeper', (req, res) => {
  req.body.id = zookeeper.length.toString();

  if (!validateZookeeper(req.body)) {
    res.status(400).send('The zookeeper is not properly formatted.');
  } else {
    const zookeeper = createNewZookeeper(req.body, zookeeper);
    res.json(zookeeper);
  }
});

module.exports = router;
