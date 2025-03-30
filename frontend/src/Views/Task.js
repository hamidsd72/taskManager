import React, { useEffect, useState } from "react";
import axios from "axios";
import { DatePickerProps, Modal, Card, Button, Input, Table, Select } from "antd";
import deleteImage from './delete-forever.png';
import editImage from './edit.png';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [inputTextError, setInputTextError] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTask, setEditTask] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const dateFormat = 'YYYY/MM/DD';
    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(dateString, date);
        setEditTask({ ...editTask, due_date: dateString });
    };
    const { Option } = Select;


    useEffect(() => {
        fetchTasks();
    }, [search, filter]);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpdateCancel = () => {
        setIsModalUpdateOpen(false);
    };

    const handleEditTask = (item) => {
        setIsModalUpdateOpen(true)
        setEditTask({ id: item.id, title: item.title, status: item.status, due_date: item.due_date } )
    };

    const fetchTasks = async () => {
        let url = `${process.env.REACT_APP_API_URL}/tasks`;

        if (filter) {
            url += `?status=${filter}`;
            if (search) {
                url += `&`;
            }
        }

        if (search) {
            url += `search=${search}`;
        }
        const response = await axios.get(url);
        setTasks(response.data);
    };

    const addTask = async () => {
        if (!newTask) {
            setIsModalOpen(true);
            setInputTextError("Title is required");
            return;
        }

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {title: newTask, status: "pending" });
        setTasks([...tasks, response.data]);
        setNewTask("");
    };

    const deleteTask = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
        fetchTasks();
    };

    const updateTaskStatus = async (id, status, title) => {
        await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { status: status, title: title });
        fetchTasks();
    };

    const handleUpdateTask = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${editTask.id}`, {
                title: editTask.title,
                status: editTask.status,
                due_date: editTask.due_date,
            });
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
        setIsModalUpdateOpen(false);
    };

    return (
        <div style={{paddingTop: "40px"}}>
            <Modal title="Form validation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p style={{ color: "#f5222d" }}>Title is required</p>
            </Modal>

            <Modal title="Task update" open={isModalUpdateOpen} onOk={handleUpdateTask}  onCancel={handleUpdateCancel}>
                <div>
                    <span>Change title</span>
                    <Input
                        type="text"
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    />
                </div>

                <div style={{paddingTop: "10px"}}>
                    <span>Change due date </span>
                    <br/>
                    <DatePicker onChange={onChangeDate} defaultValue={editTask.due_date ? dayjs(editTask.due_date, dateFormat) : null} format={dateFormat} />
                </div>
            </Modal>

            <Card title="Task Management" variant="borderless" style={{ width: 600, margin: "auto" }}>

                <div style={{ paddingBottom: "10px" }}>
                    <span>Add new task</span>
                    <div className="flex gap-2 mb-4" style={{ display: "flex" }}>
                        <Input value={newTask} data-testid="input_new_task"
                            onChange={(e) => { setNewTask(e.target.value); setInputTextError(""); }}
                            status={inputTextError.length ? 'error' : ''}
                            placeholder={inputTextError} style={{ borderRadius: "6px 0 0 6px" }}/>
                        <Button type="primary" onClick={addTask} style={{ borderRadius: "0 6px 6px 0" }} data-testid="add_task">Add task</Button>
                    </div>
                </div>
                
                <div style={{ paddingBottom: "10px" }}>
                    <span>Search in tasks</span>
                    <div className="flex gap-2 mb-4" style={{ display: "flex" }}>
                        <Input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <Select value={filter} onChange={(value) => setFilter(value)} >
                            <Option value="">Show all status</Option>
                            <Option value="pending">Pending</Option>
                            <Option value="in-progress">In Progress</Option>
                            <Option value="completed">Completed</Option>
                        </Select>
                    </div>
                </div>
                
                <Table dataSource={tasks} rowKey="id" pagination={false}>
                    <Table.Column title="Title" dataIndex="title" key="title"/>
                    <Table.Column title="Due date" dataIndex="due_date" key="due_date"/>
                    <Table.Column title="Status" key="status" render={(task) => (
                        <Select value={task.status} onChange={(value) => updateTaskStatus(task.id, value, task.title)}>
                            <Option value="pending">Pending</Option>
                            <Option value="in-progress">In Progress</Option>
                            <Option value="completed">Completed</Option>
                        </Select>
                    )} />
                    <Table.Column title="Edit title" key="actions" render={(task) => (
                        <Button color="cyan" variant="outlined" onClick={() => handleEditTask(task)}>
                            <img width="16" src={editImage} alt="edit-task" />
                        </Button>
                    )} />

                    <Table.Column title="Delete" key="actions" render={(task) => (
                        <Button onClick={() => deleteTask(task.id)} danger>
                            <img width="16" src={deleteImage} alt="delete-forever" />
                        </Button>
                    )} />
                    
                </Table>

            </Card>

        </div>
    );
};

export default TodoApp;
