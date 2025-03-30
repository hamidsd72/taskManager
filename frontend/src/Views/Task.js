import React, { useEffect, useState } from "react";
import axios from "axios";
import { DatePickerProps, Card } from "antd";
import TaskTable from "../Components/TaskTable";
import AlertModal from "../Components/AlertModal";
import EditModal from "../Components/EditModal";
import AddNewTask from "../Components/AddNewTask";
import SearchTask from "../Components/SearchTask";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [inputTextError, setInputTextError] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTask, setEditTask] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(dateString, date);
        setEditTask({ ...editTask, due_date: dateString });
    };

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

        if ( ! filter && search) {
            url += `?search=${search}`;
        }
        console.log(url)
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

            <AlertModal
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />

            <EditModal
                isModalOpen={isModalUpdateOpen}
                handleOk={handleUpdateTask}
                handleCancel={handleUpdateCancel}
                editTask={editTask}
                setEditTask={setEditTask}
                onChangeDate={onChangeDate}
            />

            <Card title="Task Management" variant="borderless" style={{ width: 600, margin: "auto" }}>

                <AddNewTask
                    newTask={newTask}
                    setNewTask={setNewTask}
                    setInputTextError={setInputTextError}
                    inputTextError={inputTextError}
                    addTask={addTask}
                />

                <SearchTask
                    search={search}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                />
                
                <TaskTable
                    tasks={tasks}
                    updateTaskStatus={updateTaskStatus}
                    handleEditTask={handleEditTask}
                    deleteTask={deleteTask}
                />

            </Card>

        </div>
    );
};

export default TodoApp;
