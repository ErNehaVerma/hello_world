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

$(document).ready(function () {
    var target_product = {};
    products.forEach(element => {
        if(element.id == id ){
            target_product = element;
        }
    });
    // get reference to the container
    var container = document.querySelector('#related');

    // loop through the products array and generate HTML for each product
    for (var i = 0; i < products.length; i++) {
        if (products[i].category == target_product.category && products[i].id != target_product.id) {
            var product = products[i];

            var ratingHtml = '';
            for (var j = 0; j < product.rating; j++) {
                ratingHtml += '<i class="fa fa-star"> </i> ';
            }

            // create the HTML for the product card
            var card = `
                <div class="product__item">
                    <div class="product__item__pic">
                    <a style="text-decoration:none" href="product-details.html?id=${product.id}"><img class="product__item__pic" src="${product.images[1]}" alt="${product.name}"></a>
                    <div class="label ${product.label}">${product.labelText}</div>
                        <ul class="product__hover">
                            <li>
                                <a href="${product.images[1]}" class="image-popup">
                                    <span class="arrow_expand"></span>
                                </a>
                            </li>
                            <li>
                                <a onclick="addToWishList('${encodeURI(JSON.stringify(product))}','wishlist')">
                                    <span class="icon_heart_alt"></span>
                                </a>
                            </li>
                            <li>
                                <a onclick="addToWishList('${encodeURI(JSON.stringify(product))}','cart')">
                                    <span class="icon_bag_alt"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="product__item__text">
                        <h6>
                            <a href="product-details.html?id=${product.id}">${product.name}</a>
                        </h6>
                        <div class="rating">${ratingHtml}</div>
                        <div class="product__price">$ ${product.price}</div>
                    </div>
                </div>`;

            // create a new element to hold the product card HTML
            var cardWrapper = document.createElement('div');
            cardWrapper.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mix', product.category);
            cardWrapper.innerHTML = card;

            // append the product card to the container
            container.appendChild(cardWrapper);
        }
    }

    $('.image-popup').on('click', function (e) {
        // Get the image source
        e.preventDefault();
        var imgSrc = $(this).attr('href');

        // Create the popup HTML with the image
        var popupHtml = '<div class="popup"><img width="500px" src="' + imgSrc + '"></div>';

        // Add the popup HTML to the body
        $('body').append(popupHtml);

        // Fade in the background overlay
        $('body').append('<div class="popup-overlay"></div>');
        $('.popup-overlay').fadeIn();

        // Fade in the popup
        $('.popup').fadeIn();
    });

    // Hide the popup and overlay when clicked
    $('body').on('click', '.popup, .popup-overlay', function () {
        $('.popup, .popup-overlay').fadeOut(function () {
            $(this).remove();
        });
    });
});
