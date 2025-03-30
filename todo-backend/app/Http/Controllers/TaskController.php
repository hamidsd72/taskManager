<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $task = Task::create($request->validate([
            'title'     => 'required|string|max:255',
            'status'    => 'in:pending,in-progress,completed',
        ]));

        return response()->json($task, 201);
    }

    public function update(Request $request, $task)
    {
        Task::findOrFail($task)->update($request->validate([
            'status'    => 'in:pending,in-progress,completed',
            'title'     => 'required|string|max:255',
            'due_date'  => 'nullable|date',
        ]));

        return response()->json(true);
    }

    public function destroy($task)
    {
        Task::findOrFail($task)->delete();
        return response()->json(null, 204);
    }

}
