import { Modal } from "antd";

const AlertModal = ({ isModalOpen, handleOk, handleCancel }) => {
    return (
        <Modal title="Form validation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p style={{ color: "#f5222d" }}>Title is required</p>
        </Modal>
    );
};

export default AlertModal;
