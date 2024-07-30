"use client";

import React, { useState } from 'react';
import { db } from '../firebase'; // Firestoreのインポート
import { collection, addDoc } from 'firebase/firestore'; // Firestoreの関数インポート
import { useRouter } from 'next/navigation'; // React Router を使ったページ遷移
import styles from '../styles/Register.module.css';

const Register = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null);
    const [squareContent, setSquareContent] = useState('');

    const router = useRouter(); // ページ遷移用

    const handleImageSelect = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const selectedImageURL = URL.createObjectURL(files[0]);
            setSelectedImage(selectedImageURL);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const inventoryRef = collection(db, 'inventory');
            await addDoc(inventoryRef, {
                name,
                quantity,
                description,
                squareContent,
                // 画像URLも保存する場合は適切なストレージへのアップロードとそのURLを設定する必要があります
            });
            alert('登録完了');
            router.push('/Test'); // 登録完了後に Test.js へ遷移
        } catch (error) {
            console.error('Error adding document: ', error);
            setError('登録に失敗しました');
        }
    };

    const handleCancel = () => {
        alert('キャンセル');
    };

    const handleSquareContentChange = (event) => {
        const newText = event.currentTarget.textContent;
        if (newText.length <= 100) {
            setSquareContent(newText);
        } else {
            event.currentTarget.textContent = squareContent;
            alert('100文字以内で入力してください。');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageUpload} onClick={() => document.getElementById('fileInput').click()}>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className={styles.fileInput}
                />
                {selectedImage ? (
                    <img src={selectedImage} alt="Selected" className={styles.previewImage} />
                ) : (
                    <span>画像追加</span>
                )}
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={`${styles.formGroup} ${styles.row}`}>
                    <div className={styles.formGroupItem}>
                        <label>在庫名</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="name"
                        />
                    </div>
                    <div className={styles.formGroupItem}>
                        <label>在庫数</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="99"
                        />
                    </div>
                </div>
                <div className={`${styles.formGroup} ${styles.row}`}>
                    <label className={styles.description}>在庫説明</label>
                    <select
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                        <option value="消耗品">消耗品</option>
                        <option value="備品">備品</option>
                        <option value="その他">その他</option>
                    </select>
                </div>
                <div
                    className={styles.squareFrame}
                    contentEditable
                    onInput={handleSquareContentChange}
                    dangerouslySetInnerHTML={{ __html: squareContent }}
                >
                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={handleCancel}>キャンセル</button>
                    <button type="submit">登録完了</button>
                </div>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Register;
