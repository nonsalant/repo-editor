import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const getRepo = async (accessToken, username, repo) => {
    const res = await axios.get(`${GITHUB_API_URL}/repos/${username}/${repo}`, {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    });
    return res.data;
}

const getRepoContent = async (accessToken, username, repo, path) => {
    const res = await axios.get(`${GITHUB_API_URL}/repos/${username}/${repo}/contents/${path}`, {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    });
    return res.data;
}

const createFile = async (accessToken, username, repo, path, content, message) => {
    const res = await axios.put(`${GITHUB_API_URL}/repos/${username}/${repo}/contents/${path}`, {
        message,
        content: btoa(content)
    }, {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    });
    return res.data;
}

const updateFile = async (accessToken, username, repo, path, content, message, sha) => {
    const res = await axios.put(`${GITHUB_API_URL}/repos/${username}/${repo}/contents/${path}`, {
        message,
        content: btoa(content),
        sha
    }, {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    });
    return res.data;
}

const deleteFile = async (accessToken, username, repo, path, sha, message) => {
    const res = await axios.delete(`${GITHUB_API_URL}/repos/${username}/${repo}/contents/${path}`, {
        data: {
            message,
            sha
        },
        headers: {
            Authorization: `Token ${accessToken}`
        }
    });
    return res.data;
}

//
const renameFile = async (accessToken, repo, path, newName) => {
    try {
        await axios.patch(`${GITHUB_API_URL}/repos/${username}/${repo}/contents/${path}`, {
            name: newName
        }, {
            headers: {
                Authorization: `Token ${accessToken}`
            }
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};


export {
    getRepo,
    getRepoContent,
    createFile,
    updateFile,
    deleteFile,
    renameFile
}