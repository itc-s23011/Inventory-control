import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from '../styles/Register.module.css';

const Register = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null);
    const [squareContent, setSquareContent] = useState('');
    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleImageSelect = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            setSelectedImage(files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            setError('ログインしてください');
            return;
        }

        try {
            let imageUrl = '';

            if (selectedImage) {
                const imageRef = ref(storage, `images/${Date.now()}_${selectedImage.name}`);
                const snapshot = await uploadBytes(imageRef, selectedImage);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const inventoryRef = collection(db, 'users', user.uid, 'inventory');
            await addDoc(inventoryRef, {
                name,
                quantity,
                description,
                squareContent,
                imageUrl // 画像のURLも保存
            });
            alert('登録完了');
            router.push('/inventoryList'); // 在庫一覧に戻る
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
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" className={styles.previewImage} />
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
                    <button type="submit">登録完了</button>
                </div>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Register;
