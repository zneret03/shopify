
//**return all pending items
export const pendingItems = (cartItems : any) => {
    return cartItems.filter((obj : any) => {
        return obj.status.itemStatus === "pending";
    });
}

//**return filtered items according to gender in shop */
export const filterItems = (items : any, gender : string) => {
    return items.filter((obj : any) => {
        return obj.gender.toLowerCase() === gender.toLowerCase();
    });
}

//**filtered items according to user authentication */
export const filteredProduct = (productItems : any, currentUseriId : any) => {
    return productItems.filter((obj : any) => {
        return obj.uid === currentUseriId.uid
    })
}

//**Returning match search value from server */
export const onSearch = (value : any, items : any) => {
    return items.filter((customerInfo : any) => {
        return Object.keys(customerInfo).some((key : any) => {
            return String(customerInfo[key]).toLowerCase().includes(value.toLowerCase())
        })
    })
}