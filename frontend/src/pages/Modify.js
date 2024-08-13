"use client";

import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import styles from '../styles/Modify.module.css';

const Modify = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null);
    const [squareContent, setSquareContent] = useState('');
    const [user, setUser] = useState(null);
    const [inventoryId, setInventoryId] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // ユーザーの認証状態を監視
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // URLから在庫IDを取得し、データをロードする
        const id = searchParams.get('id');
        if (id) {
            setInventoryId(id);
            loadInventoryData(id);
        }
    }, [searchParams]);

    const loadInventoryData = async (id) => {
        try {
            const inventoryRef = doc(db, 'users', user.uid, 'inventory', id);
            const docSnap = await getDoc(inventoryRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setName(data.name);
                setQuantity(data.quantity);
                setDescription(data.description);
                setSquareContent(data.squareContent);
            } else {
                setError('在庫が見つかりません');
            }
        } catch (error) {
            console.error('Error loading document: ', error);
            setError('データの読み込みに失敗しました');
        }
    };

    const handleImageSelect = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const selectedImageURL = URL.createObjectURL(files[0]);
            setSelectedImage(selectedImageURL);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            setError('ログインしてください');
            return;
        }

        try {
            const inventoryRef = doc(db, 'users', user.uid, 'inventory', inventoryId);
            await updateDoc(inventoryRef, {
                name,
                quantity,
                description,
                squareContent,
            });
            alert('更新完了');
            router.push('/Test');
        } catch (error) {
            console.error('Error updating document: ', error);
            setError('更新に失敗しました');
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
                        <option value="雑貨">雑貨</option>
                        <option value="食品">食品</option>
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
                    <button type="submit">変更</button>
                </div>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Modify;
