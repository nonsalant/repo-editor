import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getFiles, createFile, updateFile, deleteFile, renameFile } from '../api/github';
import FileList from '../components/file-list';
import FileEditor from '../components/file-editor';

const Repo = () => {
    const router = useRouter();
    const { username, repo } = router.query;
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [editingFile, setEditingFile] = useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            const files = await getFiles(username, repo);
            setFiles(files);
        };
        fetchData();
    }, [username, repo]);

    const handleSelectFile = (file) => {
        setSelectedFile(file);
        setEditingFile(false);
    };

    const handleEditFile = () => {
        setEditingFile(true);
    };

    const handleSaveFile = async (content) => {
        const updatedFile = await updateFile(username, repo, selectedFile.path, content);
        const newFiles = files.map((file) =>
            file.path === selectedFile.path ? updatedFile : file
        );
        setFiles(newFiles);
        setSelectedFile(updatedFile);
        setEditingFile(false);
    };

    const handleCancelFile = () => {
        setEditingFile(false);
    };

    const handleCreateFile = async (path, type) => {
        const newFile = await createFile(username, repo, path, type);
        setFiles([...files, newFile]);
    };

    const handleDeleteFile = async (path) => {
        await deleteFile(username, repo, path);
        setFiles(files.filter((file) => file.path !== path));
        setSelectedFile(null);
    };

    const handleRenameFile = async (path, newPath) => {
        const updatedFile = await renameFile(username, repo, path, newPath);
        const newFiles = files.map((file) =>
            file.path === path ? { ...file, path: newPath } : file
        );
        setFiles(newFiles);
        setSelectedFile(updatedFile);
    };

    return (
        <div className="container">
            <FileList
                files={files}
                selectedFile={selectedFile}
                onSelectFile={handleSelectFile}
                onEditFile={handleEditFile}
                onCreateFile={handleCreateFile}
                onDeleteFile={handleDeleteFile}
                onRenameFile={handleRenameFile}
            />
            {selectedFile && (
                <FileEditor
                    file={selectedFile}
                    editing={editingFile}
                    onSave={handleSaveFile}
                    onCancel={handleCancelFile}
                />
            )}
        </div>
    );
};

export default Repo;
