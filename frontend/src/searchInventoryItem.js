// 在庫検索関数
const searchInventoryItem = (itemName) => {
    db.collection("inventory").where("name", "==", itemName).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

export default searchInventoryItem
