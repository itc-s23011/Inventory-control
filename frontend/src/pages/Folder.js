import React, { useState, useEffect } from 'react';
import styles from '../styles/folder.module.css';
import { useRouter } from 'next/navigation';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, query, where, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Folder = () => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [savedFolders, setSavedFolders] = useState([]);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            const fetchFolders = async () => {
                const folderCollection = collection(db, `users/${user.uid}/folders`);
                const snapshot = await getDocs(folderCollection);
                const folders = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
                setSavedFolders(folders);
            };
            fetchFolders();
        }
    }, [user]);

    const saveFolderToFirestore = async (folder) => {
        if (user) {
            const folderCollection = collection(db, `users/${user.uid}/folders`);
            await addDoc(folderCollection, { name: folder });
        }
    };

    const handleButtonClick = () => {
        setIsInputVisible(true);
    };

    const handleInputChange = (event) => {
        setFolderName(event.target.value);
    };

    const handleSaveClick = async () => {
        if (folderName && !savedFolders.some(folder => folder.name === folderName)) {
            await saveFolderToFirestore(folderName);
            setSavedFolders([...savedFolders, { name: folderName }]);
            setFolderName('');
            setIsInputVisible(false);
        }
    };

    const handleCancelClick = () => {
        setFolderName('');
        setIsInputVisible(false);
    };

    const handleDeleteClick = async (index) => {
        if (user) {
            const folderToDelete = savedFolders[index];
            if (folderToDelete && folderToDelete.id) {
                const folderCollection = collection(db, `users/${user.uid}/folders`);
                const folderDoc = doc(folderCollection, folderToDelete.id);

                // フォルダのアイテムも削除
                const folderItemsCollection = collection(db, `users/${user.uid}/folders/${folderToDelete.id}/items`);
                const snapshot = await getDocs(folderItemsCollection);
                snapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                });

                // フォルダ自体を削除
                await deleteDoc(folderDoc);

                setSavedFolders(savedFolders.filter((_, i) => i !== index));
            } else {
                console.error('削除対象のフォルダにIDがありません。');
            }
        }
    };

    const handleFolderClick = (folderId) => {
        router.push(`/inventoryList?folderId=${folderId}`);
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
                {savedFolders.map((folder, index) => (
                    <div
                        key={index}
                        className={styles.savedFolder}
                        onClick={() => handleFolderClick(folder.id)}
                    >
                        {folder.name}
                        <span className={styles.arrow}>&gt;</span>
                        <button onClick={() => handleDeleteClick(index)} className={styles.deleteButton}>
                            削除
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Folder;
