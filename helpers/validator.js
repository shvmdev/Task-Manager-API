class validator { 
    static validateTasksInfo(tasksInfo, taskData) { 
        if (tasksInfo.hasOwnProperty('taskId') && tasksInfo.hasOwnProperty("taskName") && tasksInfo.hasOwnProperty("taskDescription") && tasksInfo.hasOwnProperty("taskDuration") && tasksInfo.hasOwnProperty("taskStatus")) {

            if (this.validateTaskId(tasksInfo, taskData)) {
                return {
                    "status": true,
                    "message": "task has been added."
                };
            }
            else { 
                return {
                    "status": false,
                    "message": "Plzz make tasks with unique id"
                }
            }
            
        }
        else { 
            return {
                "status": false,
                "message": "task is not in a proper format. Some field are missing."
            }
        }

    }
    static validateTaskId(tasksInfo, taskData) { 
        let taskFound = taskData.tasksInfo.some(data => data.taskId == tasksInfo.taskId)
        if (taskFound) return false
        return true
    }
}

module.exports = validator
