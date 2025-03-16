// components/Platform/Notes/NotesContent.tsx
"use client";

import { useState } from 'react';
import { Notebook, Edit, Trash2, Plus } from 'lucide-react';
import Modal from '@/components/Common/Modal';
import DeleteModal from '@/components/Common/Modals/DeleteModal';
import NoteForm from './NoteForm';
import toast from "react-hot-toast";

interface Note {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  status: string;
  createdAt: Date;
  camera?: { id: string; name: string; };
  zone?: { id: string; name: string; };
  user: { name: string; };
}

export default function NotesContent({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/platform/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to create note');
      const newNote = await response.json();
      setNotes(prev => [newNote, ...prev]);
      setShowCreateModal(false);
      toast.success("Note created successfully!");
    } catch (error) {
      toast.error('Failed to create note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!selectedNote) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/platform/notes/${selectedNote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to update note');
      const updatedNote = await response.json();
      setNotes(prev => prev.map(n => n.id === selectedNote.id ? updatedNote : n));
      setShowEditModal(false);
      toast.success("Note updated successfully!");
    } catch (error) {
      toast.error('Failed to update note');
    } finally {
      setIsLoading(false);
      setSelectedNote(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedNote) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/platform/notes/${selectedNote.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete note');
      setNotes(prev => prev.filter(n => n.id !== selectedNote.id));
      setShowDeleteModal(false);
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error('Failed to delete note');
    } finally {
      setIsLoading(false);
      setSelectedNote(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Notes & Issues</h2>
          <p className="text-gray-700 mt-1">Manage security notes and track issues</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Created By</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notes.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{note.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {note.content.length > 100 
                            ? `${note.content.substring(0, 100)}...` 
                            : note.content}
                        </div>
                        {(note.camera || note.zone) && (
                        <div className="text-sm text-gray-500 mt-1">
                            {note.camera ? `Camera: ${note.camera.name}` : `Zone: ${note.zone.name}`}
                        </div>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{note.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      note.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                      note.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {note.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      note.status === 'OPEN' ? 'bg-red-100 text-red-800' :
                      note.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {note.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{note.user.name}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedNote(note);
                          setShowEditModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedNote(note);
                          setShowDeleteModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600"
                        disabled={isLoading}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {notes.length === 0 && (
          <div className="text-center py-12">
            <Notebook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first note</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
              Add Note
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => !isLoading && setShowCreateModal(false)}
        title="Add New Note"
      >
        <NoteForm
          onSubmit={handleCreate}
          onClose={() => setShowCreateModal(false)}
          isSubmitting={isLoading}
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => !isLoading && setShowEditModal(false)}
        title="Edit Note"
      >
        <NoteForm
          initialData={selectedNote}
          onSubmit={handleUpdate}
          onClose={() => setShowEditModal(false)}
          isSubmitting={isLoading}
        />
      </Modal>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Delete Note"
        handleDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}