const Todo = require("../models/Todo");
const {Op } = require("sequelize");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const { getUserWithToken } = require("../helpers/authorization/tokenHelpers");

const addNewTodo = asyncErrorWrapper(async (req, res, next) => {
  const { title, description, status } = req.body;
  const user = getUserWithToken(req);

  const todo = await Todo.create({
    title: title,
    userId: user.id,
    status: status,
    description: description,
  });

  res.status(200).json({
    success: true,
    data: todo,
  });
});

const getAllTodo = asyncErrorWrapper(async (req, res, next) => {

  request = req;

  const user = getUserWithToken(request);

    const title = req.query.title;

    var condition = {}

    if (title) {
      condition.title = {[Op.like] :  `%${title}%`}
    }

    condition.userId = {[Op.like]:`%${user.id}%` }


    Todo.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todo.",
      });
    });
});

const findOne = asyncErrorWrapper(async (req, res, next) => {
  const id = req.params.id;
  
    Todo.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Todo with id=" + id
        });
      });

})

const update = asyncErrorWrapper(async (req, res, next)=>  {
  const id = req.params.id;
  
  Todo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id
      });
    });
})


const remove = asyncErrorWrapper(async (req, res, next)=>  {
  const id = req.params.id;
  
  Todo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id
      });
    });
})

const removeAll = asyncErrorWrapper(async (req, res, next)=>  {
  Todo.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Todo were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all todo."
      });
    });
})

module.exports = {
  addNewTodo,
  getAllTodo,
  findOne,
  update,
  remove,
  removeAll
};
