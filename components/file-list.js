import React from 'react';

const FileList = ({ files, onClick, onCreate, onDelete, onRename }) => {
    return (
        <div>
            <h2>Files</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.name} onClick={() => onClick(file)}>
                        {file.name}
                        <button onClick={(e) => {
                            e.stopPropagation();
                            onRename(file, prompt("Enter new name"))
                        }}>Rename</button>
                        <button onClick={(e) => {
                            e.stopPropagation();
                            onDelete(file)
                        }}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => onCreate(prompt("Enter file name"))}>Create File</button>
        </div>
    );
}

export default FileList;