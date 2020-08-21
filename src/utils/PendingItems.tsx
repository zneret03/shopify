
//return all pending items
export const pendingItems = (cartItems : any) => {
    return cartItems.filter((obj : any) => {
        return obj.status.itemStatus === "pending";
    });
}