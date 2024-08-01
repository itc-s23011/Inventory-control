// src/pages/folder.js
import React, { useState } from 'react'; // React と useState フックのインポート
import styles from '../styles/folder.module.css'; // CSSモジュールのインポート

const Folder = () => {
    // 状態変数の宣言
    const [isInputVisible, setIsInputVisible] = useState(false); // 入力フィールドの表示・非表示を制御
    const [folderName, setFolderName] = useState(''); // フォルダ名の状態
    const [savedFolders, setSavedFolders] = useState([]); // 保存されたフォルダ名のリスト

    // フォルダ作成ボタンがクリックされたときに入力フィールドを表示する関数
    const handleButtonClick = () => {
        setIsInputVisible(true); // ボタンがクリックされたら表示する
    };

    // 入力フィールドの値が変更されたときにフォルダ名の状態を更新する関数
    const handleInputChange = (event) => {
        setFolderName(event.target.value); // 入力フィールドの値を更新
    };

    // フォルダ保存ボタンがクリックされたときにフォルダ名を保存し、入力フィールドをクリアする関数
    const handleSaveClick = () => {
        // フォルダ名が空でなく、既に保存されていない場合
            setSavedFolders([...savedFolders, folderName]); // フォルダ名を保存
            setFolderName(''); // 入力フィールドをクリア
            setIsInputVisible(false); // 入力フィールドを非表示
        };

    // キャンセルボタンがクリックされたときに呼ばれる関数
    const handleCancelClick = () => {
        setFolderName(''); // 入力フィールドをクリア
        setIsInputVisible(false); // 入力フィールドを非表示
    };

    // 削除ボタンがクリックされたときに指定されたフォルダを削除する関数
    const handleDeleteClick = (index) => {
        setSavedFolders(savedFolders.filter((_, i) => i !== index)); // 指定されたインデックスのフォルダを削除
    };          

    return ( 
        <div className={styles.folderContainer}>
            {/* フォルダ一覧のタイトル */}
            <div className={styles.folderTitle}>フォルダ一覧</div>

            {/* フォルダ作成ボタンと入力フィールドのコンテナ */}
            <div className={styles.inputContainer}>    
                {/* フォルダ作成ボタン */}
                <div className={styles.createFolder} onClick={handleButtonClick}>
                    フォルダを作成
                </div>
            
                {/* フォルダ名入力フィールドと保存ボタン */}
                {isInputVisible && (
                    <> {/* React のフラグメントを使用 */}
                        <input 
                            type="text" 
                            placeholder="フォルダ名を入力" 
                            value={folderName}
                            onChange={handleInputChange}
                            className={styles.inputField}
                        />
                        <div className={styles.buttonGroup}> {/*変更 追加*/}
                        <button 
                            onClick={handleSaveClick} 
                            className={styles.saveButton}
                            disabled={!folderName || savedFolders.includes(folderName)} // フォルダ名が空または既に存在する場合、ボタンを無効化
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
            
            {/* 保存されたフォルダのリスト */}
            <div className={styles.savedFolders}>
                {savedFolders.map((folder, index) => (
                    <div key={index} className={styles.savedFolder}>
                        {folder}
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
