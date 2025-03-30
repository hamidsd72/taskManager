
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoApp from '../Views/Task';
import axios from 'axios';
jest.mock('axios');
    
describe('TodoApp', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                { id: 1, title: 'Test Task 1', status: 'pending' },
                { id: 2, title: 'Test Task 2', status: 'completed' },
            ],
        });

        axios.post.mockResolvedValue({
            data: { id: 3, title: 'buy some milk', status: 'pending' }
        });
    });

    it('renders task list', async () => {
        render(<TodoApp />);

        await waitFor(() => {
            expect(screen.getByText('Test Task 1')).toBeInTheDocument();
            expect(screen.getByText('Test Task 2')).toBeInTheDocument();
        });
    });

    it('adds a new task', async () => {
        render(<TodoApp />);

        const input = screen.getByTestId("input_new_task");
        const addButton = screen.getByTestId("add_task");

        fireEvent.change(input, { target: { value: "buy some milk" } });
        expect(input.value).toBe("buy some milk");
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByText("buy some milk")).toBeInTheDocument();
        });
    });
});