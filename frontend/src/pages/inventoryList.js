import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from "@/styles/inventoryList.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const InventoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();
  const { folder } = router.query;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems = JSON.parse(localStorage.getItem("items")) || [];
      setItems(storedItems);
      if (folder) {
        const filtered = storedItems.filter(item => item.folder === folder);
        setFilteredItems(filtered);
      } else {
        setFilteredItems(storedItems);
      }
    }
  }, [folder]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = items.filter((item) =>
        item.name.includes(query)
    );
    setFilteredItems(filtered);
  };

  const handleAddItem = () => {
    router.push(`/Register?folder=${folder}`); // folderをクエリパラメータとして登録画面に渡す
  };

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
              <Link href="/">
                <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', cursor: 'pointer' }}>←</div>
              </Link>
              <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400' }}>{folder}</div>
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
            {filteredItems.map((item, index) => (
                <div key={index} className={styles.item} style={{ left: `${144 + (index % 3) * 216}px`, top: `${253 + Math.floor(index / 3) * 298}px` }}>
                  <div className={styles.itemBox} style={{ top: '62px' }} />
                  <div className={styles.itemName} style={{ left: '32px', top: '7px' }}>{item.name}</div>
                  <div className={styles.itemStock} style={{ left: '34px', top: '213px' }}>在庫数: {item.stock}</div>
                  <div className={styles.itemBorder} style={{ left: '7px', top: '0px' }} />
                  <div className={styles.horizontalLine} style={{ left: '4px', top: '248px' }}></div>
                </div>
            ))}
          </div>
        </main>
      </>
  );
}

export default InventoryList;
