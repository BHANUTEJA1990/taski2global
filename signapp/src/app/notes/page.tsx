"use client";
import { useEffect, useState } from "react";
import { Note } from "@/types";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("notes");
        if (stored) setNotes(JSON.parse(stored));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const handleSave = (note: Note) => {
        if (editingNote) {
            setNotes(notes.map((n) => (n.id === note.id ? note : n)));
            setEditingNote(null);
        } else {
            setNotes([...notes, note]);
        }
    };

    const handleDelete = (id: string) => {
        setNotes(notes.filter((n) => n.id !== id));
    };

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">📝 Notes App</h1>
            <NoteForm
                onSave={handleSave}
                editingNote={editingNote}
                onCancel={() => setEditingNote(null)}
            />
            <NoteList notes={notes} onEdit={setEditingNote} onDelete={handleDelete} />
        </main>
    );
}
