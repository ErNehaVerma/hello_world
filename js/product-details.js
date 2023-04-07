var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var id = urlParams.get('id');


$(document).ready(function() {
    var target_product = {};
    products.forEach(element => {
        if(element.id == id){
            target_product = element;
        }
    });
    // console.log(target_product)

    $('.breadcrumb__links a.brdcrm_2')
    .text(target_product.category).attr('href', 'products.html?category='+target_product.category);
    $('.breadcrumb__links span').text(target_product.name);

    var ratingHtml = '';
    for (var j = 0; j < target_product.rating; j++) {
        ratingHtml += '<i class="fa fa-star"> </i> ';
    }
    $('.rating').append(ratingHtml);




    // $('.category-banner').css('background-image', 'url(' + target_product.image + ')');
    $('.product__details__text h3').text(target_product.name);
    $('.product__details__price ').text('$'+target_product.price);
    $('.product__details__text p.desc').text(target_product.description);

    for (var key in target_product.images) {
        if (target_product.images.hasOwnProperty(key)) {
            $('#thum_'+key).attr('src',target_product.images[key]);
            $('#p_pic_'+key).attr('src',target_product.images[key]);

        }
    }


    $('.cart-btn').on('click', function(event) {
        event.preventDefault(); // Stop the default behavior of the button

        // Get the product ID and quantity from the form
        var product_id = target_product.id;
        var quantity = $('.pro-qty input').val();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userData = JSON.parse(localStorage.getItem('userData'));
        var i = userData.findIndex((user) => user.user_id === currentUser.user_id);
        var filteredUserData = userData[i];

        console.log(filteredUserData)


        //  an object to store the cart data
        if(currentUser){
            var cart_data = {
                'product_id': product_id,
                'quantity': quantity
            };


            const itemIndex = filteredUserData.cart.findIndex(product => product.id === product_id);

            // if item exists then delete the indexs
           if (itemIndex > -1) {
                cart_data.quantity = parseInt(cart_data.quantity) + parseInt(filteredUserData[itemIndex].quantity);
           }
           else {
                filteredUserData.cart = [...filteredUserData.cart, cart_data];
           }

           localStorage.setItem("userData", JSON.stringify(userData));

            alert('Item added successfully into the cart!!')
            window.location.href = 'shop-cart.html';
        }else{
            alert('Kindly Login or Sign-up first to add item in cart!!')
            window.location.href = 'login.html';
        }
    });

});
