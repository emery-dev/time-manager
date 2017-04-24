var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'todos',
    user: 'emeryandrew',
    password: 'password'
});

//Queries
module.exports = {
  getAllTodos: getAllTodos,
  getSingleTodo: getSingleTodo,
  createTodo: createTodo,
  updateTodo: updateTodo,
  removeTodo: removeTodo
};

//GET ALL
function getAllTodos(req, res, next) {
  db.any('select * from todo order by id asc')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL todos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//GET single
function getSingleTodo(req, res, next) {
  var todoID = parseInt(req.params.id);
  db.one('select * from todo where id = $1', todoID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE todo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//POST
function createTodo(req, res, next) {
  //handle timing
  db.none('insert into todo(times, position, todo)' +
      'values(${times}, ${position}, ${todo})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one todo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//UPDATE
function updateTodo(req, res, next) {
  db.none('update todo set times=$1, position=$2, todo=$3 where id=$4',
    [req.body.times, req.body.position, req.body.todo, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated todo'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

//DELETE
function removeTodo(req, res, next) {
  var todoID = parseInt(req.params.id);
  db.result('delete from todo where id = $1', todoID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} todo`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
