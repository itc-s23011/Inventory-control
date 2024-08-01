import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from "@/styles/consumables.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] }); 

const Consumables = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [consumables, setConsumables] = useState([]);
  const [filteredConsumables, setFilteredConsumables] = useState([]);
  const [selectedConsumable, setSelectedConsumable] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedConsumables = JSON.parse(localStorage.getItem("consumables")) || [];
      setConsumables(storedConsumables);
      setFilteredConsumables(storedConsumables);
    }
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = consumables.filter((item) =>
      item.name.includes(query)
    );
    setFilteredConsumables(filtered);
  };

  const handleAddConsumable = () => {
    router.push(""); // +ボタンを押したら、とぶurl
  };

  return (
    <>
      <Head>
        <title>消耗品管理</title>
        <meta name="description" content="消耗品管理システム" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href="/">
              <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', cursor: 'pointer' }}>←</div>
            </Link>
            <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400' }}>消耗品</div>
            <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', cursor: 'pointer' }} onClick={handleAddConsumable}>＋</div>
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
          {filteredConsumables.map((item, index) => (
            <div key={index} className={styles.item} style={{ left: `${144 + (index % 3) * 216}px`, top: `${253 + Math.floor(index / 3) * 298}px` }}>
              <div className={styles.itemBox} style={{ top: '62px' }} />
              <div className={styles.itemName} style={{ left: '32px', top: '7px' }}>{item.name}</div>
              <div className={styles.itemStock} style={{ left: '34px', top: '213px' }}>在庫数: {item.stock}</div>
              <div className={styles.itemBorder} style={{ left: '7px', top: '0px' }} />
              <div className={styles.horizontalLine} style={{ left: '4px', top: '248px' }}></div>
            </div>
          ))}
          {selectedConsumable && (
            <div className={styles.modal}>
              <h2>{selectedConsumable.name}</h2>
              <p>在庫数: {selectedConsumable.stock}</p>
              <button onClick={() => setSelectedConsumable(null)}>閉じる</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Consumables