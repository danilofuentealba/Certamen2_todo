import { Router } from "express";

import { authMiddleware } from "../middlewares/middleware.js"
import { createTodoSchema } from "../schemas/index.js"
import { todos, insert } from "../repositories/todos.js"

const router = Router();



//LISTAR TODOS LOS TODOs
router.get('/todos', authMiddleware, (req, res) => {
	res.send(todos)
})
//BUSCAR TODO
router.get('/todos/:id', authMiddleware, (req, res) => {
	const todo = todos.find(todo => todo.id === req.params.id)

	if (!todo) {
		return res.status(404).send({
			error: 'Item no encontrado'
		})
	}

	res.status(201).send(todo)
})
//INSERTA TODO
router.post('/todos', authMiddleware, (req, res) => {

	

	let title = createTodoSchema.validateSync(req.body, {stripUnknown: true});

	const todo = insert(title.title)

	res.status(201).send(todo)
})
//MODIFICA TODO
router.put('/todos/:id', authMiddleware, (req, res) => {
	const todo = todos.find(todo => todo.id === req.params.id)

	if (!todo) {
		return res.status(404).send({
			error: 'Item no encontrado'
		})
	}

	const { title, completed } = req.body

	if ((title !== undefined && typeof title !== 'string') || (completed !== undefined && typeof completed !== 'boolean')) {
		return res.status(400).send({
			error: 'Datos incorrectos'
		})
	}

	if (typeof title === 'string') {
		todo.title = title
	}

	if (typeof completed === 'boolean') {
		todo.completed = completed
	}

	res.status(200).send(todo)
})
//ELIMINA UN TODO
router.delete('/todos/:id', authMiddleware, (req, res) => {
	const index = todos.findIndex(todo => todo.id === req.params.id)

	if (index === -1) {
		return res.status(404).send({
			error: 'Item no encontrado'
		})
	}

	todos.splice(index, 1)
	res.status(204).send()
})

export default router