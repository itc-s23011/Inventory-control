"use client";

import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import s from '../styles/SignUp.module.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Firestoreにユーザー情報を保存
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name,
                email,
            });

            alert('User created successfully');

            setEmail('');
            setPassword('');
            setName('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={s.container}>
            <h1 className={s.header}>Sign Up</h1>
            <form onSubmit={handleSignUp} className={s.form}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className={s.input}
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={s.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={s.input}
                />
                <button type="submit" className={s.button}>Sign Up</button>
            </form>
            {error && <p className={s.error}>{error}</p>}
        </div>
    );
};

export default SignUp;
