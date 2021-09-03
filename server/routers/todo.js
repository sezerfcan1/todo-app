const express = require('express')

const {addNewTodo,getAllTodo,findOne,update,remove,removeAll} = require('../controllers/todo.js')

const router = express.Router();

const {getAccessToRoute} = require('../middlewares/authorization/auth')

router.post('/add-Todo',getAccessToRoute,addNewTodo);
router.get('/',getAccessToRoute,getAllTodo);
router.get("/:id",getAccessToRoute,findOne);
router.put('/:id',getAccessToRoute,update)
router.delete("/:id",getAccessToRoute,remove);
router.delete("/",getAccessToRoute,removeAll);



module.exports = router;