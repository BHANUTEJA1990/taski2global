"use client";
import { useState, useEffect } from "react";

import { Note } from "@/types";


interface NoteFormProps {
  onSave: (note: Note) => void;
  editingNote?: Note | null;
  onCancel?: () => void;
}

export default function NoteForm({ onSave, editingNote, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const note: Note = {
      id: editingNote ? editingNote.id : Date.now().toString(),
      title,
      content,
    };

    onSave(note);
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg shadow-md bg-white space-y-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex justify-end space-x-2">
        {editingNote && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
          {editingNote ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
