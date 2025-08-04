// src/components/RichTextEditor.jsx
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

const RichTextEditor = ({ input, setInput }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: input.description || '<p>Write course description here...</p>',
    onUpdate: ({ editor }) => {
      setInput((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });

  // Sync external changes to editor
  useEffect(() => {
    if (editor && input.description !== editor.getHTML()) {
      editor.commands.setContent(input.description || '');
    }
  }, [input.description, editor]);

  if (!editor) return <p>Loading editor...</p>;

  return (
    <div className="border p-4 rounded space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
        >
          • Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 border rounded ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
        >
          1. Numbered List
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[150px] border p-2 rounded bg-white" />
    </div>
  );
};

export default RichTextEditor;
