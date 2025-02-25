// تعریف یک کلاس برای مدیریت سبد خرید
class Cart {
    constructor() {
        this.products = [];
        this.loadCart();
    }

    // بارگیری سبد خرید از localStorage
    loadCart() {
        const cart = localStorage.getItem('cart');
        if (cart) {
            this.products = JSON.parse(cart);
        }
    }

    // ذخیره سبد خرید در localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.products));
    }

    // افزودن محصول به سبد خرید
    addProduct(productId, productName, productPrice) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.quantity++;
        } else {
            this.products.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }
        this.saveCart();
        this.updateCartList();
    }

    // حذف محصول از سبد خرید
    removeProduct(productId) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveCart();
            this.updateCartList();
        }
    }

    //更新 لیست سبد خرید
    updateCartList() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';
        this.products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} x ${product.quantity} = ${product.price * product.quantity} تومان`;
            cartList.appendChild(li);
        });
        const cartTotal = document.getElementById('cart-total');
        cartTotal.textContent = `مجموع: ${this.products.reduce((total, product) => total + product.price * product.quantity, 0)} تومان`;
    }
}

// ایجاد یک نمونه از کلاس Cart
const cart = new Cart();

// اضافه کردن رویداد کلیک به دکمه افزودن به سبد خرید
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const productName = button.dataset.productName;
        const productPrice = parseInt(button.dataset.productPrice);
        cart.addProduct(productId, productName, productPrice);
    });
});