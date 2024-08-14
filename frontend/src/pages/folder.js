import React, { useState, useEffect } from 'react';
import { db, auth } from '@/firebase';
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';
import styles from '../styles/folder.module.css';
import { useRouter } from 'next/router';

const Folder = () => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [savedFolders, setSavedFolders] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userFoldersRef = collection(db, 'users', currentUser.uid, 'folders');
                const q = query(userFoldersRef);

                onSnapshot(q, (snapshot) => {
                    const folders = snapshot.docs.map(doc => ({
                        id: doc.id,
                        name: doc.data().name
                    }));
                    setSavedFolders(folders);
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const handleButtonClick = () => {
        setIsInputVisible(true);
    };

    const handleInputChange = (event) => {
        setFolderName(event.target.value);
    };

    const handleSaveClick = async () => {
        if (folderName && user) {
            try {
                const userFoldersRef = collection(db, 'users', user.uid, 'folders');
                await addDoc(userFoldersRef, {
                    name: folderName
                });
                setFolderName('');
                setIsInputVisible(false);
            } catch (error) {
                console.error("Error adding folder: ", error);
            }
        }
    };

    const handleCancelClick = () => {
        setFolderName('');
        setIsInputVisible(false);
    };

    const handleFolderClick = (folderName) => {
        router.push(`/inventoryList?folder=${encodeURIComponent(folderName)}`);
    };

    return (
        <div className={styles.folderContainer}>
            <div className={styles.folderTitle}>フォルダ一覧</div>

            <div className={styles.inputContainer}>
                <div className={styles.createFolder} onClick={handleButtonClick}>
                    フォルダを作成
                </div>

                {isInputVisible && (
                    <>
                        <input
                            type="text"
                            placeholder="フォルダ名を入力"
                            value={folderName}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                        <div className={styles.buttonGroup}>
                            <button
                                onClick={handleSaveClick}
                                className={styles.saveButton}
                                disabled={!folderName || savedFolders.some(folder => folder.name === folderName)}
                            >
                                フォルダを保存
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className={styles.cancelButton}
                            >
                                キャンセル
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className={styles.savedFolders}>
                {savedFolders.map((folder) => (
                    <div
                        key={folder.id}
                        className={styles.savedFolder}
                        onClick={() => handleFolderClick(folder.name)}
                    >
                        {folder.name}
                        <span className={styles.arrow}>&gt;</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Folder;