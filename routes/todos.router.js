const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.js')

router.get('/', (req, res) => {
  res.send('HI!')
})

router.post('/todos', async(req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort('-order').exec();

  const order = maxOrderByUserId ?
    maxOrderByUserId.order + 1 :
    1;
  
  const todo = new Todo({value: value, order: order});
  await todo.save();

  res.send({todo});
});

router.get('/todos', async(req, res) => {
  const todos = await Todo.find().sort("-order").exec()

  res.send({todos:todos})
})

router.patch('/todos/:todoId', async(req, res) => {
  const { todoId } = req.params;
  const { order } = req.body;

  const currentTodo = await Todo.findById(todoId);
  if (!currentTodo) {
    res.status(400).json({"errorMessage": "할 일이 존재하지 않습니다."})
  }

  res.send()
})

module.exports = router;