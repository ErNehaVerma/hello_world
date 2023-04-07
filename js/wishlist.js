function addToWishList(productToAdd, type) {
  if(!window.currentUser){
    console.log("Kindly login to add item into "+type);
    window.location.href="./login.html";
    return;
  }
  console.log("here in add to list ", productToAdd, " type ", type);
  // Item to add
  const item = JSON.parse(decodeURI(productToAdd));
  // Getting currentUser from local Storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userData = JSON.parse(localStorage.getItem('userData'));


  // Getting item index
  if (type == 'wishlist') {
    const itemIndex = currentUser.wishList.findIndex(product => product.id === item.id);
    // if item exists then delete the indexs
    if (itemIndex > -1) {
      currentUser.wishList.splice(itemIndex, 1);
      alert("Successfully removed from wishlist");
    }
    else {
      currentUser.wishList = [...currentUser.wishList, item];
    }
    alert("Successfully added to Wishlist");
  }
  else {
    const itemIndex = currentUser.cart.findIndex(product => product.id === item.id);
    // if item exists then delete the indexs
    if (itemIndex > -1) {
      currentUser.cart.splice(itemIndex, 1);
      alert("Successfully removed from cart");
    }
    else {
      itm = { product_id: item.id, quantity: 1 }
      currentUser.cart = [...currentUser.cart,itm];
    }
    alert("Successfully added to cart");

    // if (itemIndex < 0) {
    //   currentUser.cart.push({ product_id: item.id, quantity: 1 });
    //   const indexToDelete = currentUser.wishList.findIndex(pItem => pItem.id === item.id);
    //   currentUser.wishList.splice(indexToDelete, 1);
    // }
  }
  // updating currentUser in local storage 
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  const newUserData = userData.map(user => {
    if (user.user_id === currentUser.user_id) {
      return currentUser;
    }
    return user;
  });
  // updating user db
  localStorage.setItem("userData", JSON.stringify(newUserData));
  location.reload();
}

// function to remove an item from the cart
function removeItem(data) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const wishList = currentUser.wishList;
  const item = JSON.parse(decodeURI(data));
  const newList = wishList.filter(function (product) {
    return product.id != item.id;
  });

  const newUser = { ...currentUser, wishList: newList }
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  window.location.href = 'wishlist.html';
}