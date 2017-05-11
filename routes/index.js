var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Daily Manager' });
});

router.get('/today', function(req, res) {
    res.sendfile('./build/index.html');
});

var db = require('./queries');

router.get('/api/todos', db.getAllTodos);
router.get('/api/todos/:id', db.getSingleTodo);
router.post('/api/todos', db.createTodo);
router.put('/api/todos/:id', db.updateTodo);
router.delete('/api/todos/:id', db.removeTodo);
router.delete('/api/todos', db.removeAllTodos);

module.exports = router;
