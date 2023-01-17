import React, { useState, useEffect } from 'react';
import { getRepo, createFile, deleteFile, renameFile } from '../api/github';
import FileList from '../components/file-list';
import FileEditor from '../components/file-editor';

const Repo = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const repo = await getRepo();
            setFiles(repo.files);
        }
        fetchData();
    }, []);

    const handleFileClick = async (file) => {
        setSelectedFile(file);
    };

    const handleCreateFile = async (file) => {
        try {
            await createFile(file);
            const repo = await getRepo();
            setFiles(repo.files);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteFile = async (file) => {
        try {
            await deleteFile(file);
            const repo = await getRepo();
            setFiles(repo.files);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRenameFile = async (file, newName) => {
        try {
            await renameFile(file, newName);
            const repo = await getRepo();
            setFiles(repo.files);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Your GitHub Repo</h1>
            <FileList files={files} onClick={handleFileClick} onCreate={handleCreateFile} onDelete={handleDeleteFile} onRename={handleRenameFile} />
            {selectedFile && <FileEditor file={selectedFile} onSave={handleSaveFile} onCancel={handleCancelFile} />}
        </div>
    );
}

export default Repo;