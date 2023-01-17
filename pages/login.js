import React, { useState } from 'react';
// import Router from 'next/router';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import { authenticate } from '../api/auth';

const Login = () => {

    ///
    // return 'exited.'

    const router = useRouter();
    const { register, handleSubmit, errors } = useForm();
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            await authenticate(data);
            // Router.push('/repo');
            router.push('/repo')
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login to your GitHub account</h1>
            {error && <p className="error">{error}</p>}
            <label>
                GitHub Access Token:
                <input
                    type="text"
                    name="accessToken"
                    ref={register({ required: true })}
                />
            </label>
            {errors.accessToken && <p className="error">Access token is required</p>}

            <label>
                GitHub Username:
                <input
                    type="text"
                    name="username"
                    ref={register({ required: true })}
                />
            </label>
            {errors.username && <p className="error">Username is required</p>}

            <label>
                Repo name:
                <input
                    type="text"
                    name="repo"
                    ref={register({ required: true })}
                />
            </label>
            {errors.repo && <p className="error">Repo is required</p>}

            <button type="submit">Connect to GitHub</button>
        </form>
    );
}

export default Login;