window.onload = function () {
    setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("curren user ", currentUser);
        if (currentUser) {
            const loginUser = document.getElementById("LoginUser");
            loginUser.style.display = 'none';
        }
        else {
            const ddProfile = document.getElementById("ddProfile");
            ddProfile.style.display = 'none';
        }
        // For Hot trends
        // loop through the products array and generate HTML for each product
        createTrends("Hot Trend", "trend-container", products.slice(0, 3));
        createTrends("Best Seller", "best-seller-container", products.slice(3, 6));
        createTrends("Feature", "feature-container", products.slice(6, 9));
    }, 1000);

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
    const hotTrendsContainer = document.querySelector(`#${containerId}`);
    hotTrendsContainer.innerHTML = trendsCard;
}


