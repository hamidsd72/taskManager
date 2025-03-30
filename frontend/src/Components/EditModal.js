import { DatePicker, Modal, Input } from "antd";
import dayjs from 'dayjs';
const dateFormat = 'YYYY/MM/DD';

const EditModal = ({ isModalOpen, handleOk, handleCancel, editTask, setEditTask, onChangeDate }) => {
    return (
        <Modal title="Task update" open={isModalOpen} onOk={handleOk}  onCancel={handleCancel}>
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
    );
};

export default EditModal;
