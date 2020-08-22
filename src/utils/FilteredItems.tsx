
//return all pending items
export const pendingItems = (cartItems : any) => {
    return cartItems.filter((obj : any) => {
        return obj.status.itemStatus === "pending";
    });
}

export const filterItems = (items : any, gender : string) => {
    return items.filter((obj : any) => {
        return obj.gender.toLowerCase() === gender.toLowerCase();
    });
}