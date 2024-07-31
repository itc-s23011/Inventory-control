// src/pages/folder.js
import React, { useState } from 'react';
import styles from '../styles/folder.module.css'; // CSSモジュールのインポート

const Folder = () => {
    const [isInputVisible, setIsInputVisible] = useState(false); // 初期状態は非表示
    const [folderName, setFolderName] = useState(''); // フォルダ名の状態
    const [savedFolders, setSavedFolders] = useState([]); // 保存されたフォルダ名のリスト

    // フォルダ作成ボタンがクリックされたときに呼ばれる関数
    const handleButtonClick = () => {
        setIsInputVisible(true); // ボタンがクリックされたら表示する
    };

    // 入力フィールドの値が変更されたときに呼ばれる関数
    const handleInputChange = (event) => {
        setFolderName(event.target.value); // 入力フィールドの値を更新
    };

    // フォルダを保存ボタンがクリックされたときに呼ばれる関数
    const handleSaveClick = () => {
        setSavedFolders([...savedFolders, folderName]); // フォルダ名を保存
        setFolderName(''); // 入力フィールドをクリア
        setIsInputVisible(false); // 入力フィールドを非表示
    };

    return ( 
        <div className={styles.folderContainer}>
            {/* フォルダ一覧のタイトル */}
            <div className={styles.folderTitle}>フォルダ一覧</div>
            
            {/* フォルダを作成ボタン */}
            <div className={styles.createFolder} onClick={handleButtonClick}>
                フォルダを作成
            </div>
            
            {/* フォルダ名入力フィールドと保存ボタン */}
            {isInputVisible && (
                <div className={styles.inputContainer}>
                    <input 
                        type="text" 
                        placeholder="フォルダ名を入力" 
                        value={folderName}
                        onChange={handleInputChange}
                        className={styles.inputField}
                    />
                    <button onClick={handleSaveClick} className={styles.saveButton}>
                        フォルダを保存
                    </button>
                </div>
            )}
            
            {/* 保存されたフォルダのリスト */}
            <div className={styles.savedFolders}>
                {savedFolders.map((folder, index) => (
                        <div key={index} className={styles.savedFolder}>
                            {folder}
                            <span className={styles.arrow}>&gt;</span>
                        </div>
                ))}
            </div>
        </div>
    );
};  

export default Folder;
