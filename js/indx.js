window.onload = function () {
    setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(!currentUser){
            $("div#wishListTip").hide();
            $("div#cartTip").hide();
            $("#ddProfile").hide();
            $("#logout_icon").hide();
            return
        }
        const userData = JSON.parse(localStorage.getItem('userData'));
        var i = userData.findIndex((user) => user.user_id === currentUser.user_id);
        var cartData = userData[i];

        if (currentUser) {
            // $("#LoginUser").hide();
            const loginUser = document.getElementById("LoginUser");
            loginUser.style.display = 'none';

            const loginUser_can = document.getElementById("LoginUser_can");
            loginUser_can.style.display = 'none';
            
            $("#logout_icon").show();

            const wishListTip = document.querySelectorAll("div#wishListTip");
            for (let i = 0; i < wishListTip.length; i++) {
                if (!currentUser.wishList.length)
                    wishListTip[i].style.display = 'none';
                else
                    wishListTip[i].innerHTML = currentUser.wishList.length
            }
            const cartTip = document.querySelectorAll("div#cartTip");
            for (let i = 0; i < cartTip.length; i++) {
                if (!cartData.cart.length)
                    cartTip[i].style.display = 'none';
                else
                    cartTip[i].innerHTML = cartData.cart.length
            }
          }
        else {
            const ddProfile = document.getElementById("ddProfile");
            ddProfile.style.display = 'none';

            $("#logout_icon").hide();

            const cartTip = document.querySelectorAll("div#cartTip");
            for (let i = 0; i < cartTip.length; i++) {
                cartTip[i].style.display = 'none';
            }

            const wishListTip = document.querySelectorAll("div#wishListTip");
            for (let i = 0; i < wishListTip.length; i++) {
                wishListTip[i].style.display = 'none';
            }
        }
        // For Hot trends
        // loop through the products array and generate HTML for each product
        if (products) {
            createTrends("Hot Trend", "trend-container", products.slice(0, 3));
            createTrends("Best Seller", "best-seller-container", products.slice(3, 6));
            createTrends("Feature", "feature-container", products.slice(6, 9));
        }
    }, 100);

    // }, 5000);
};


function createTrends(head, containerId, products) {
    let trendsCard = `<div class="section-title"><h4>${head}</h4></div>`;
    for (var i = 0; i < 3; i++) {
        var product = products[i];
        var ratingHtml = '';
        for (var j = 0; j < product.rating; j++) {
            ratingHtml += '<i class="fa fa-star"> </i> ';
        }
        trendsCard += `<div class="trend__item">
        <a href="product-details.html?id=${product.id}">
            <div class="trend__item__pic">
                <img width="90" height="90" src="${product.images[1]}" alt="">
                </div>
                <div class="trend__item__text">
                        <h6>${product.name}</h6>
                        <div class="rating">${ratingHtml}</div>
                        <div class="product__price">$ ${product.price}</div>
                        </div>
                        </div> </a>`;
    }
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const page = './' + parts.pop();
    if(page == './index.html' || page == './index.html?'){
        const hotTrendsContainer = document.querySelector(`#${containerId}`);
        hotTrendsContainer.innerHTML = trendsCard;
    }
    
}


