$(document).ready(function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    var i = userData.findIndex((user) => user.user_id === currentUser.user_id);
    var filteredUserData = userData[i];
    var cartData = filteredUserData['cart'];

    var cartTableBody = $('.cart-table tbody');

    $.each(cartData, function (index, item) {
        var product = products.filter((product) => parseInt(product.id) == parseInt(item.product_id))[0];
            if (product) {
                var tr = `<tr>
                                <td class="cart__product__item">
                                    <img width="90px" src="${product.images[1]}" alt="">
                                    <div class="cart__product__item__title">
                                        <h6>
                                            <a style=" color: black;text-decoration: none; " href="product-details.html?id=${product.id}"> ${product.name} </a>
                                        </h6>
                                    <div class="rating">`;
                // add stars based on product rating
                for (var i = 0; i < product.rating; i++) {
                    tr += '<i class="fa fa-star"> </i> ';
                }
                var final_price = (parseFloat(product.price) * parseInt(item.quantity)).toFixed(2);
                tr += `</div></div></td>
                    <td class="cart__price">$${product.price}</td>
                        <td class="cart__quantity">
                            <div class="pro-qty">
                                <span class="dec qtybtn">-</span><input id="${ product.id}" type="text" value="${ item.quantity}"><span class="inc qtybtn">+</span>
                            </div>
                        </td>
                        <td class="cart__total">$ ${ final_price}</td>
                        <td class="cart__close"><span onclick="removeItem('${index}')" class="icon_close"></span>
                    </td>
                </tr>`;

                var trElement = document.createElement('tr');
                trElement.innerHTML = tr;
                cartTableBody.append(trElement);
            }
    });
    updateTotal();

    $('.pro-qty').on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            var newVal = parseFloat(oldValue) - 1;
            newVal = Math.max(newVal, 0);
        }
        $button.parent().find('input').val(newVal);
        // get the product ID and update the quantity in the cartData array
        var productId = $button.parent().find('input').attr('id');
        var cartItem = cartData.find(function (item) {
            return item.product_id == productId;
        });
        if (cartItem) {
            cartItem.quantity = newVal;
        }
        var price = products.filter((product) => parseInt(product.id) == parseInt(productId))[0].price;

        // // update the cartData in the localStorage
        // localStorage.setItem('cart', JSON.stringify(cartData));

       

        var newFinalPrice = (price * newVal).toFixed(2);

        // // update the final price in the cart
        $button.parents('.cart__quantity').siblings('.cart__total').text('$ ' + newFinalPrice);

        // Call the updateTotal function
        updateTotal();
    });

    $('.coupn button').click(function (e) {
        e.preventDefault();
        var couponCode = $('.discount__content input').val().toUpperCase();
        if (couponCode == "BS_DISCOUNT10" || couponCode == "BS_SAVE10" || couponCode == "SUMMER_SALE_50") {
            alert('Congratulations, your coupon is valid!')
        } else {
            alert("Sorry, that coupon code is not valid.");
        }
        updateTotal();
    });
});

// function to remove an item from the cart
function removeItem(i) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    var filteredUserData = userData[i]['cart'];
    filteredUserData.splice(i, 1);
    localStorage.setItem('userData', JSON.stringify(userData));
    currentUser.cart.splice(i,1);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    // Call the updateTotal function
    location.reload();
}

function updateTotal() {
    var subtotal = 0;
    $('.cart__total').each(function () {
        var price = parseFloat($(this).text().replace('$ ', ''));
        subtotal += price;
    });
    var couponCode = $('.discount__content input').val().toUpperCase();

    var tax = subtotal * 0.13;
    var delivery_fee = 0;
    var discount = 0;

    if (couponCode == "BS_DISCOUNT10" || couponCode == "BS_SAVE10") {
        // Apply 10% discount 
        discount = subtotal * 0.1;
    } 
    else if(couponCode == "SUMMER_SALE_50"){
          // Apply 50% discount 
          discount = subtotal * 0.5;
    }
    else {
        // No discount, add $5 delivery fees
        discount = 0;
    }

    var total = subtotal + tax - discount + delivery_fee;
    if(subtotal < 100){
        delivery_fee = 5;
    }

    // Update the subtotal, tax, delivery fee, discount, and total values in the HTML
    $('#subtotal').text('$ ' + subtotal.toFixed(2));
    $('#tax').text('$ ' + tax.toFixed(2));
    $('#delivery-fee').text('$ ' + delivery_fee.toFixed(2));
    $('#discount').text('$ ' + discount.toFixed(2));
    $('#total').text('$ ' + total.toFixed(2));
}
