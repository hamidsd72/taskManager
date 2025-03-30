import { Input, Button } from "antd";

const AddNewTask = ({ newTask, setNewTask, setInputTextError, inputTextError, addTask }) => {
    return (
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
    );
};

export default AddNewTask;
