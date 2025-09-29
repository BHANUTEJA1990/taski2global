"use client";
import { Note } from "@/types";


interface NoteListProps {
    notes: Note[];
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
    if (notes.length === 0) return <p className="text-gray-500">No notes yet.</p>;

    return (
        <div className="grid gap-3 mt-4">
            {notes.map((note) => (
                <div
                    key={note.id}
                    className="p-4 border rounded-lg shadow bg-yellow-50"
                >
                    <h2 className="font-bold text-lg">{note.title}</h2>
                    <p className="text-gray-700">{note.content}</p>
                    <div className="flex space-x-2 mt-2">
                        <button
                            onClick={() => onEdit(note)}
                            className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(note.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
