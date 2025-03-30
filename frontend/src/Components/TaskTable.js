import React from "react";
import deleteImage from './delete-forever.png';
import editImage from './edit.png';
import { Table, Button, Select } from "antd";
const { Option } = Select;

const TaskTable = ({ tasks, updateTaskStatus, handleEditTask, deleteTask }) => {
    return (
        <Table dataSource={tasks} rowKey="id" pagination={false}>
            <Table.Column title="Title" dataIndex="title" key="title" />
            <Table.Column title="Due date" dataIndex="due_date" key="due_date" />
            <Table.Column
                title="Status"
                key="status"
                render={(task) => (
                    <Select value={task.status} onChange={(value) => updateTaskStatus(task.id, value, task.title)}>
                        <Option value="pending">Pending</Option>
                        <Option value="in-progress">In Progress</Option>
                        <Option value="completed">Completed</Option>
                    </Select>
                )}
            />
            <Table.Column
                title="Edit title"
                key="actions"
                render={(task) => (
                    <Button color="cyan" variant="outlined" onClick={() => handleEditTask(task)}>
                        <img width="16" src={editImage} alt="edit-task" />
                    </Button>
                )}
            />
            <Table.Column
                title="Delete"
                key="actions"
                render={(task) => (
                    <Button onClick={() => deleteTask(task.id)} danger>
                        <img width="16" src={deleteImage} alt="delete-forever" />
                    </Button>
                )}
            />
        </Table>
    );
};

export default TaskTable;