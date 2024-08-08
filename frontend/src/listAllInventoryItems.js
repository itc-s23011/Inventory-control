// 在庫一覧表示関数
const listAllInventoryItems = () => {
    db.collection("inventory").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

export default listAllInventoryItems