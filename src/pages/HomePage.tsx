import { useMemo, useState } from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import TodoFilters from '@/components/TodoFilters';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateId } from '@/lib/utils';
import type { Todo, Filter } from '@/types';

export default function HomePage() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand text-white mb-3 shadow-lg shadow-indigo-200">
            <ListTodo className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
          <p className="text-gray-500 mt-1 text-sm">Stay focused. Get things done.</p>
        </header>

        <div className="bg-white/60 backdrop-blur rounded-2xl shadow-xl shadow-indigo-100/50 border border-white p-5 space-y-4">
          <TodoInput onAdd={addTodo} />

          {todos.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No todos yet</p>
              <p className="text-gray-400 text-sm mt-1">Add your first task above to get started</p>
            </div>
          ) : (
            <>
              <ul className="space-y-2">
                {filteredTodos.length === 0 ? (
                  <li className="py-8 text-center text-gray-400 text-sm">
                    No {filter} todos
                  </li>
                ) : (
                  filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))
                )}
              </ul>

              <TodoFilters
                filter={filter}
                onChange={setFilter}
                activeCount={activeCount}
                completedCount={completedCount}
                onClearCompleted={clearCompleted}
              />
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Double-click a todo to edit · Saved in your browser
        </p>
      </div>
    </div>
  );
}
