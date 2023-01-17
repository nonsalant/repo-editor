import React, { useState } from 'react';
import { updateFile } from '../api/github';

const FileEditor = ({ file, onSave, onCancel }) => {
    const [content, setContent] = useState(file.content);

    const handleSave = async () => {
        try {
            await updateFile(file, content);
            onSave();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Editing {file.name}</h2>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default FileEditor;