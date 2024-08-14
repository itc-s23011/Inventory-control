import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "@/styles/inventoryList.module.css";
import { Inter } from "next/font/google";
import { db } from '../firebase'; // Firebase をインポート
import { collection, getDocs } from 'firebase/firestore'; // Firestore 関数をインポート
import { auth } from '../firebase';

const inter = Inter({ subsets: ["latin"] });

const InventoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const user = auth.currentUser; // 現在のユーザーを取得
        if (user) {
          const inventoryRef = collection(db, 'users', user.uid, 'inventory');
          const querySnapshot = await getDocs(inventoryRef);
          const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setItems(itemsList);
          if (category) {
            const filtered = itemsList.filter(item => item.category === category);
            setFilteredItems(filtered);
          } else {
            setFilteredItems(itemsList);
          }
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchItems();
  }, [category]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = items.filter((item) =>
        item.name.includes(query)
    );
    setFilteredItems(filtered);
  };

  const handleAddItem = () => {
    router.push("/Register");
  };

  const handleback =() => {
    router.push("/Folder");
  }

  return (
      <>
        <Head>
          <title>在庫一覧</title>
          <meta name="description" content="在庫一覧" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div
                  style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', cursor: 'pointer' }}
                  onClick={handleback}
              >
                ←
              </div>
              <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400' }}>{category}</div>
              <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', cursor: 'pointer' }} onClick={handleAddItem}>＋</div>
            </div>
            <div className={styles.searchContainer} style={{ left: '148px', top: '132px' }}>
              <input
                  className={styles.searchInput}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="search"
              />
            </div>
            <div className={styles.consumablesList}>
              {filteredItems.map((item, index) => (
                  <div key={index} className={styles.consumableItem}>
                    <div className={styles.imageContainer}>
                      {item.imageUrl && <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />}
                    </div>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.name}>{item.name}</div>  {/* ここに .name クラスを適用 */}
                  </div>
              ))}
            </div>
          </div>
        </main>
      </>
  );
};

export default InventoryList;
