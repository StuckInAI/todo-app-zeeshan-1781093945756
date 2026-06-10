import { useState } from 'react';
import { Check, Trash2, Pencil, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else {
      setDraft(todo.text);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-brand border-brand text-white'
            : 'border-gray-300 hover:border-brand'
        )}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as complete'}
      >
        {todo.completed && <Check className="w-4 h-4" strokeWidth={3} />}
      </button>

      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          onBlur={saveEdit}
          className="flex-1 px-2 py-1 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand text-gray-800"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={clsx(
            'flex-1 text-gray-800 select-none cursor-pointer truncate',
            todo.completed && 'line-through text-gray-400'
          )}
        >
          {todo.text}
        </span>
      )}

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <button
            onClick={cancelEdit}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Cancel edit"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 rounded-md text-gray-400 hover:text-brand hover:bg-indigo-50"
            aria-label="Edit todo"
          >
            <Pencil className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50"
          aria-label="Delete todo"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}
