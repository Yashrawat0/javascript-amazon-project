import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateCartQuantity();
let productsHTML = '';
products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
})

document.querySelector('.js-products-grid').innerHTML = productsHTML

const addedMessageTimeouts = {};

function updateCartQuantity() {
    let cartQuantity = 0
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity
};


document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();

        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)

        addedMessage.classList.add("added-to-cart-visible");

        // check it there's a pervious timeout for this product.
        // if there is, we should it.
        const previousTimeoutId = addedMessageTimeouts[productId];

        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }
        // removing the added animation from the window after 2 seconds
        const timeoutId = setTimeout(() => {
            addedMessage.classList.remove("added-to-cart-visible");
        }, 2000);

        // SAVE THE timeoutId for this product 
        // so we can stop it later if we need to.

        addedMessageTimeouts[productId] = timeoutId;
    });
});
