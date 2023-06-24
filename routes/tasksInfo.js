const express = require("express");
const tasksRoutes = express.Router();
const tasksData = require("../tasks.json");
const validator = require("../helpers/validator");
const path = require("path");
const fs = require("fs");

tasksRoutes.use(express.json());
tasksRoutes.use(express.urlencoded({ extended: false }));

tasksRoutes.get("/", (req, res) => {
	res.status(200).json(tasksData);
});

tasksRoutes.get("/:taskId", (req, res) => {
	const id = req.params.taskId;
	const tasks = tasksData.tasksInfo;
	let result = tasks.filter((data) => data.taskId == id);
	res.status(200).json(result);
});

tasksRoutes.post("/", (req, res) => {
	const tasksDetails = req.body;
	let writePath = path.join(__dirname, "..", "tasks.json");
	let validationStatus = validator.validateTasksInfo(
		tasksDetails,
		tasksData
	).status;
	if (validationStatus) {
		let taskDataModified = tasksData;
		taskDataModified.tasksInfo.push(tasksDetails);
		fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {
			encoding: "utf-8",
			flag: "w",
		});
		res.status(200).send("tasks added successfully");
	} else {
		res
			.status(400)
			.send(validator.validateTasksInfo(tasksDetails, tasksData).message);
	}
});

tasksRoutes.put("/:taskId", (req, res) => {
	const tasksDetails = req.body;
	let taskIdPassed = req.params.taskId;
	let taskFound = tasksData.tasksInfo.some(
		(task) => task.taskId == taskIdPassed
	);
	if (!taskFound) res.status(400).send("Task with given id not found");
	else {
		let writePath = path.join(__dirname, "..", "tasks.json");
		let validationMessage = validator.validateTasksInfo(
			tasksDetails,
			tasksData
		).message;
		if (validationMessage === "Plzz make tasks with unique id") {
			let tasksUpdated = tasksData.tasksInfo.filter(
				(task) => task.taskId == taskIdPassed
			);
			const index = tasksData.tasksInfo.indexOf(tasksUpdated[0]);
			tasksData.tasksInfo.splice(index, 1, tasksDetails);
			fs.writeFileSync(writePath, JSON.stringify(tasksData), {
				encoding: "utf-8",
				flag: "w",
			});
			res.status(200).send("Task updated successfully");
		} else {
			res.status(400).send("Tasks can't be updated");
		}
	}
});

tasksRoutes.delete("/:taskId", (req, res) => {
	let taskIdPassed = req.params.taskId;
	let taskFound = tasksData.tasksInfo.some(
		(task) => task.taskId == taskIdPassed
	);
	if (!taskFound) {
		res.status(400).send("Task with given taskId is not found");
	} else {
		let tasksUpdated = tasksData.tasksInfo.filter(
			(task) => task.taskId == taskIdPassed
		);
		const index = tasksData.tasksInfo.indexOf(tasksUpdated[0]);
		tasksData.tasksInfo.splice(index, 1);
		let writePath = path.join(__dirname, "..", "tasks.json");
		fs.writeFileSync(writePath, JSON.stringify(tasksData), {
			encoding: "utf-8",
			flag: "w",
		});
		res.status(200).send("task deleted successfully");
	}
});

module.exports = tasksRoutes;
