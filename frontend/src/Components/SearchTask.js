import { Input, Select } from "antd";
const { Option } = Select;

const SearchTask = ({ search, setSearch, filter, setFilter }) => {
    return (
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
    );
};

export default SearchTask;
