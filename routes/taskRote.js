const express = require('express')
const router = express.Router()

const {createTask, getTasks, getSpecificTasks, updateSpecificTask, deleteSpecificTask} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')
//require for all routes
router.use(requireAuth)

router.post('/', createTask)
router.get('/', getTasks)
router.get('/:id', getSpecificTasks)
router.put('/:id', updateSpecificTask)
router.delete('/:id', deleteSpecificTask)


module.exports = router