function addToWishList(productToAdd) {
  // Item to add
  const item = JSON.parse(decodeURI(productToAdd));
  // Getting currentUser from local Storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Getting item index
  const itemIndex = currentUser.wishList.findIndex(product => product.id === item.id);
  // if item exists then delete the indexs
  if (itemIndex > -1) {
    currentUser.wishList.splice(itemIndex, 1);
  }
  else {
    currentUser.wishList = [...currentUser.wishList, item];
  }

  // updating currentUser in local storage 
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  document.getElementById('wishListTip').innerHTML = `${currentUser.wishList.length}`;
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