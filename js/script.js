/**
 * Secondhand Fashion Website - Main JavaScript File
 * 
 * This file contains all the main functionality for the website including:
 * - Product management
 * - Cart functionality
 * - Utility functions
 */

// Sample product data
const products = [
    {
        id: 1,
        name: 'Áo khoác denim nam',
        price: 250000,
        category: 'men',
        image: 'images/ao-khoac-denim-nam.jpg',
        description: 'Áo khoác denim nam cũ, chất liệu bền đẹp, form rộng thoải mái.',
        details: 'Áo khoác denim nam secondhand, chất liệu cotton denim dày dặn, form rộng thoải mái. Áo còn mới 80%, không bị rách hay bong chỉ. Màu xanh đậm dễ phối đồ. Size L phù hợp với người cao 1m70 - 1m75, nặng 65-75kg.'
    },
    {
        id: 2,
        name: 'Váy hoa nữ',
        price: 180000,
        category: 'women',
        image: 'images/vay-hoa-nu.jpg',
        description: 'Váy hoa nữ dáng dài, chất liệu voan mềm mại, form dáng đẹp.',
        details: 'Váy hoa nữ secondhand dáng dài qua gối, chất liệu voan mềm mại thoáng mát. Váy có họa tiết hoa nhỏ màu hồng pastel trên nền trắng. Form dáng ôm nhẹ phần eo, xòe nhẹ phần chân váy. Size M phù hợp với người cao 1m55 - 1m65, số đo 80-60-90.'
    },
    {
        id: 3,
        name: 'Quần jeans nam',
        price: 200000,
        category: 'men',
        image: 'images/quan-jeans-nam.jpg',
        description: 'Quần jeans nam cũ, chất liệu denim co giãn, kiểu dáng slim fit.',
        details: 'Quần jeans nam secondhand kiểu dáng slim fit, chất liệu denim co giãn 2 chiều. Quần còn mới 85%, không bị bạc màu nhiều. Màu xanh đậm dễ phối đồ. Size 30 phù hợp với vòng eo 75-80cm, dài ống 95cm.'
    },
    {
        id: 4,
        name: 'Áo thun nữ',
        price: 120000,
        category: 'women',
        image: 'images/ao-thun-nu.jpg',
        description: 'Áo thun nữ cổ tròn, chất liệu cotton mềm, in hình độc đáo.',
        details: 'Áo thun nữ secondhand cổ tròn, chất liệu cotton 100% mềm mại, thấm hút mồ hôi tốt. Áo có in hình nghệ thuật độc đáo ở mặt trước. Size M phù hợp với người có số đo ngực 85-90cm.'
    },
    {
        id: 5,
        name: 'Túi xách da',
        price: 350000,
        category: 'accessories',
        image: 'images/tui-xach-da.jpg',
        description: 'Túi xách da bò cũ, chất liệu bền đẹp, nhiều ngăn tiện lợi.',
        details: 'Túi xách da bò secondhand, chất liệu da thật 80%, các chi tiết còn nguyên vẹn. Túi có nhiều ngăn tiện lợi, khóa kéo hoạt động tốt. Kích thước 25x18x10cm, đủ để đựng ví, điện thoại, đồ trang điểm.'
    },
    {
        id: 6,
        name: 'Giày sneaker nam',
        price: 400000,
        category: 'men',
        image: 'images/giay-sneaker-nam.jpg',
        description: 'Giày sneaker nam cũ, đế cao su bền, kiểu dáng thể thao.',
        details: 'Giày sneaker nam secondhand của thương hiệu XYZ, đế cao su bền chắc, lót giày êm ái. Giày còn mới 70%, đế chưa mòn nhiều. Size 40 phù hợp với chân dài 25cm.'
    }
];

/**
 * Load featured products on home page
 */
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    
    if (featuredContainer) {
        // Get first 4 products
        const featuredProducts = products.slice(0, 4);
        
        let html = '';
        featuredProducts.forEach(product => {
            html += `
                <div class="col-md-3 mb-4">
                    <div class="card product-card h-100">
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="fw-bold text-primary">${formatPrice(product.price)} đ</p>
                        </div>
                        <div class="card-footer bg-white">
                            <a href="product-detail.html?id=${product.id}" class="btn btn-sm btn-outline-primary me-2">Xem chi tiết</a>
                            <button class="btn btn-sm btn-primary add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        featuredContainer.innerHTML = html;
        
        // Add event listeners to "Add to cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

/**
 * Load all products on products page
 */
function loadProducts() {
    const productsContainer = document.getElementById('products-container');
    
    if (productsContainer) {
        let html = '';
        products.forEach(product => {
            html += `
                <div class="col-md-4 mb-4 product-item" data-category="${product.category}">
                    <div class="card product-card h-100">
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="fw-bold text-primary">${formatPrice(product.price)} đ</p>
                        </div>
                        <div class="card-footer bg-white">
                            <a href="product-detail.html?id=${product.id}" class="btn btn-sm btn-outline-primary me-2">Xem chi tiết</a>
                            <button class="btn btn-sm btn-primary add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        productsContainer.innerHTML = html;
        
        // Add event listeners to "Add to cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

/**
 * Filter products by category
 * @param {string} category - The category to filter by ('all', 'men', 'women', 'accessories')
 */
function filterProducts(category) {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Search products by name
 * @param {string} searchTerm - The term to search for
 */
function searchProducts(searchTerm) {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const productName = item.querySelector('.card-title').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Thêm vào cuối file script.js

/**
 * Thêm sản phẩm mới (chỉ admin)
 * @param {object} productData - Dữ liệu sản phẩm mới
 * @returns {boolean} - True nếu thành công
 */
function addProduct(productData) {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
        // Tạo ID mới
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        
        // Thêm sản phẩm mới
        products.push({
            id: newId,
            name: productData.name,
            price: parseInt(productData.price),
            category: productData.category,
            image: productData.image || 'images/default-product.jpg',
            description: productData.description,
            details: productData.details
        });
        
        return true;
    }
    return false;
}

/**
 * Cập nhật sản phẩm (chỉ admin)
 * @param {number} productId - ID sản phẩm
 * @param {object} productData - Dữ liệu sản phẩm cập nhật
 * @returns {boolean} - True nếu thành công
 */
function updateProduct(productId, productData) {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
        const product = products.find(p => p.id === productId);
        if (product) {
            product.name = productData.name || product.name;
            product.price = parseInt(productData.price) || product.price;
            product.category = productData.category || product.category;
            product.image = productData.image || product.image;
            product.description = productData.description || product.description;
            product.details = productData.details || product.details;
            return true;
        }
    }
    return false;
}

/**
 * Xóa sản phẩm (chỉ admin)
 * @param {number} productId - ID sản phẩm
 * @returns {boolean} - True nếu thành công
 */
function deleteProduct(productId) {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            return true;
        }
    }
    return false;
}

/**
 * Load product details on product detail page
 * @param {number} productId - The ID of the product to display
 */
function loadProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const productDetailContainer = document.getElementById('product-detail');
    
    if (product && productDetailContainer) {
        productDetailContainer.innerHTML = `
            <div class="col-md-5 mb-4">
                <div class="product-image-container bg-light p-3 rounded">
                    <img src="${product.image}" class="img-fluid" alt="${product.name}">
                </div>
            </div>
            <div class="col-md-7">
                <h2 class="mb-2">${product.name}</h2>
                <div class="d-flex align-items-center mb-3">
                    <span class="badge bg-secondary me-2">${getCategoryName(product.category)}</span>
                </div>
                
                <div class="price-section mb-3">
                    <h3 class="text-primary">${formatPrice(product.price)} đ</h3>
                </div>
                
                <div class="product-description mb-4">
                    <h5>Mô tả sản phẩm</h5>
                    <p>${product.description}</p>
                </div>
                
                <div class="product-details mb-4">
                    <h5>Chi tiết sản phẩm</h5>
                    <p>${product.details}</p>
                </div>
                
                <div class="d-flex align-items-center mb-4">
                    <div class="me-3" style="width: 120px;">
                        <div class="input-group">
                            <button class="btn btn-outline-secondary minus-btn" type="button">-</button>
                            <input type="number" class="form-control text-center quantity-input" value="1" min="1">
                            <button class="btn btn-outline-secondary plus-btn" type="button">+</button>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-lg flex-grow-1 add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart me-2"></i> Thêm vào giỏ hàng
                    </button>
                </div>
                
                <div class="product-meta bg-light p-3 rounded">
                    <p class="mb-2"><i class="fas fa-check-circle text-success me-2"></i> Còn hàng</p>
                    <p class="mb-0"><i class="fas fa-exchange-alt me-2"></i> Đổi trả trong 7 ngày</p>
                </div>
            </div>
        `;
        
        // Xử lý nút thêm vào giỏ hàng
        document.querySelector('.add-to-cart').addEventListener('click', function() {
            const quantity = parseInt(document.querySelector('.quantity-input').value);
            addToCart(product.id, quantity);
            
            this.innerHTML = '<i class="fas fa-check me-2"></i> Đã thêm vào giỏ';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart me-2"></i> Thêm vào giỏ';
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
            }, 2000);
        });
        
        // Xử lý nút tăng/giảm số lượng
        document.querySelector('.minus-btn').addEventListener('click', function() {
            const input = document.querySelector('.quantity-input');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
        
        document.querySelector('.plus-btn').addEventListener('click', function() {
            const input = document.querySelector('.quantity-input');
            input.value = parseInt(input.value) + 1;
        });
    }
}

/**
 * Load related products (3 sản phẩm ngẫu nhiên khác)
 * @param {number} productId - ID sản phẩm hiện tại (để loại trừ)
 */
function loadRelatedProducts(productId) {
    const relatedProductsContainer = document.getElementById('related-products');
    
    if (relatedProductsContainer) {
        // Lấy 3 sản phẩm ngẫu nhiên khác (trừ sản phẩm đang xem)
        const relatedProducts = products
            .filter(p => p.id !== productId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        
        if (relatedProducts.length > 0) {
            let html = '';
            relatedProducts.forEach(product => {
                html += `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="fw-bold text-primary">${formatPrice(product.price)} đ</p>
                            </div>
                            <div class="card-footer bg-white">
                                <a href="product-detail.html?id=${product.id}" class="btn btn-sm btn-outline-primary me-2">Xem chi tiết</a>
                                <button class="btn btn-sm btn-primary add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            relatedProductsContainer.innerHTML = html;
            
            // Thêm sự kiện cho nút "Thêm vào giỏ" ở sản phẩm liên quan
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }
    }
}

/**
 * Get category name from category code
 * @param {string} category - The category code
 * @returns {string} The category name
 */
function getCategoryName(category) {
    const categories = {
        'men': 'Thời trang nam',
        'women': 'Thời trang nữ',
        'accessories': 'Phụ kiện'
    };
    return categories[category] || 'Khác';
}

/**
 * Format price with thousand separators
 * @param {number} price - The price to format
 * @returns {string} The formatted price
 */
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Cart functionality
 */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/**
 * Add a product to the cart
 * @param {number} productId - The ID of the product to add
 * @param {number} [quantity=1] - The quantity to add (default: 1)
 */
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        saveCart();
        updateCartCount();
        
        // Show success message
        alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    }
}

/**
 * Remove a product from the cart
 * @param {number} productId - The ID of the product to remove
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    loadCartItems();
    updateCartCount();
}

/**
 * Update the quantity of a product in the cart
 * @param {number} productId - The ID of the product to update
 * @param {number} quantity - The new quantity
 */
function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (quantity > 0) {
            item.quantity = quantity;
        } else {
            removeFromCart(productId);
            return;
        }
        
        saveCart();
        loadCartItems();
    }
}

/**
 * Save the cart to localStorage
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Clear the cart
 */
function clearCart() {
    cart = [];
    saveCart();
    loadCartItems();
    updateCartCount();
}

/**
 * Update the cart count in the navbar
 */
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    
    if (countElements.length > 0) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        countElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
}

/**
 * Load cart items on cart page
 */
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout-btn');
    
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-4" id="empty-cart-message">
                    <i class="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
                    <h5>Giỏ hàng của bạn đang trống</h5>
                    <p>Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm</p>
                    <a href="products.html" class="btn btn-primary">Tiếp tục mua sắm</a>
                </div>
            `;
            
            subtotalElement.textContent = '0 đ';
            shippingElement.textContent = '0 đ';
            totalElement.textContent = '0 đ';
            checkoutButton.disabled = true;
        } else {
            let html = '';
            let subtotal = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                html += `
                    <div class="row align-items-center cart-item">
                        <div class="col-md-2">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid">
                        </div>
                        <div class="col-md-4">
                            <h6 class="mb-1">${item.name}</h6>
                            <p class="mb-0 text-muted">${formatPrice(item.price)} đ</p>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group">
                                <button class="btn btn-outline-secondary minus-btn" type="button" data-id="${item.id}">-</button>
                                <input type="number" class="form-control text-center quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="btn btn-outline-secondary plus-btn" type="button" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <p class="mb-0 fw-bold">${formatPrice(itemTotal)} đ</p>
                        </div>
                        <div class="col-md-1">
                            <button class="btn btn-sm btn-outline-danger remove-btn" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
            
            cartItemsContainer.innerHTML = html;
            
            // Calculate shipping (fixed at 20,000 đ for demo)
            const shipping = 20000;
            const total = subtotal + shipping;
            
            subtotalElement.textContent = `${formatPrice(subtotal)} đ`;
            shippingElement.textContent = `${formatPrice(shipping)} đ`;
            totalElement.textContent = `${formatPrice(total)} đ`;
            checkoutButton.disabled = false;
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.minus-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    const item = cart.find(item => item.id === productId);
                    if (item) {
                        updateCartItemQuantity(productId, item.quantity - 1);
                    }
                });
            });
            
            document.querySelectorAll('.plus-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    const item = cart.find(item => item.id === productId);
                    if (item) {
                        updateCartItemQuantity(productId, item.quantity + 1);
                    }
                });
            });
            
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    const quantity = parseInt(this.value);
                    updateCartItemQuantity(productId, quantity);
                });
            });
            
            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
        }
    }
}
function loadProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const productDetailContainer = document.getElementById('product-detail');
    
    if (product && productDetailContainer) {
        productDetailContainer.innerHTML = `
            <div class="col-md-6 mb-4">
                <div class="product-image-container">
                    <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                </div>
            </div>
            <div class="col-md-6">
                <h2>${product.name}</h2>
                <p class="text-muted">Danh mục: ${getCategoryName(product.category)}</p>
                <h3 class="text-primary mb-4">${formatPrice(product.price)} đ</h3>
                
                <div class="product-description mb-4">
                    <h5>Mô tả sản phẩm</h5>
                    <p>${product.description}</p>
                </div>
                
                <div class="product-details mb-4">
                    <h5>Chi tiết sản phẩm</h5>
                    <p>${product.details}</p>
                </div>
                
                <div class="d-flex align-items-center mb-4">
                    <div class="me-3">
                        <label for="quantity" class="form-label">Số lượng:</label>
                        <input type="number" class="form-control quantity-input" id="quantity" value="1" min="1">
                    </div>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart me-2"></i> Thêm vào giỏ hàng
                    </button>
                </div>
                
                <div class="product-meta bg-light p-3 rounded">
                    <p><i class="fas fa-check-circle text-success me-2"></i> Còn hàng</p>
                    <p><i class="fas fa-exchange-alt me-2"></i> Đổi trả trong 7 ngày</p>
                </div>
            </div>
        `;
        
        // Xử lý nút thêm vào giỏ hàng
        document.querySelector('.add-to-cart').addEventListener('click', function() {
            const quantity = parseInt(document.getElementById('quantity').value);
            addToCart(productId, quantity);
            
            // Hiệu ứng khi thêm thành công
            this.innerHTML = '<i class="fas fa-check me-2"></i> Đã thêm vào giỏ';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart me-2"></i> Thêm vào giỏ';
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
            }, 2000);
        });
    } else {
        // Nếu không tìm thấy sản phẩm, chuyển hướng về trang sản phẩm
        window.location.href = 'products.html';
    }
}
// Thêm vào phần đầu script.js (cùng với các biến khác)
const coupons = [
    { code: 'FREESHIP', discount: 20000, type: 'fixed' },
    { code: 'SALE10', discount: 10, type: 'percent' },
    { code: 'SALE20', discount: 20, type: 'percent' }
];

let appliedCoupon = null;

// Thêm hàm này vào phần cart functionality
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.trim();
    const discountElement = document.getElementById('discount-amount');
    
    if (!couponCode) {
        alert('Vui lòng nhập mã giảm giá');
        return;
    }
    
    const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
    
    if (!coupon) {
        alert('Mã giảm giá không hợp lệ');
        return;
    }
    
    appliedCoupon = coupon;
    calculateTotals();
    alert(`Áp dụng mã giảm giá thành công: ${coupon.code}`);
}

// Cập nhật hàm calculateTotals (nếu chưa có thì thêm mới)
function calculateTotals() {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const discountElement = document.getElementById('discount-amount');
    const totalElement = document.getElementById('total');
    
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 20000; // Phí vận chuyển cố định
    
    // Tính giảm giá
    let discount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.type === 'fixed') {
            discount = appliedCoupon.discount;
        } else if (appliedCoupon.type === 'percent') {
            discount = subtotal * appliedCoupon.discount / 100;
        }
    }
    
    const total = subtotal + shipping - discount;
    
    subtotalElement.textContent = `${formatPrice(subtotal)} đ`;
    shippingElement.textContent = `${formatPrice(shipping)} đ`;
    discountElement.textContent = `-${formatPrice(discount)} đ`;
    totalElement.textContent = `${formatPrice(total)} đ`;
}

// Cập nhật hàm loadCartItems, thay thế phần tính toán bằng cách gọi calculateTotals()
// Thay thế đoạn này:
/*
const shipping = 20000;
const total = subtotal + shipping;

subtotalElement.textContent = `${formatPrice(subtotal)} đ`;
shippingElement.textContent = `${formatPrice(shipping)} đ`;
totalElement.textContent = `${formatPrice(total)} đ`;
*/
// Bằng:
calculateTotals();

// Thêm sự kiện cho nút áp dụng mã giảm giá (trong phần DOMContentLoaded)
document.getElementById('apply-coupon')?.addEventListener('click', applyCoupon);

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username') || 'An';
    const loginItems = document.querySelectorAll('.login-item');
    const userDropdowns = document.querySelectorAll('.user-dropdown');

    if (isLoggedIn) {
// Ẩn nút đăng nhập, hiển thị dropdown người dùng
        loginItems.forEach(item => item.style.display = 'none');
        userDropdowns.forEach(dropdown => {
        dropdown.style.display = 'block';
        dropdown.querySelector('.username').textContent = username;
    });
    } else {
    // Ẩn dropdown người dùng, hiển thị nút đăng nhập
        loginItems.forEach(item => item.style.display = 'block');
        userDropdowns.forEach(dropdown => dropdown.style.display = 'none');
    }
    }

/**

Logout function
*/
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    checkLoginStatus(); // Cập nhật giao diện
    window.location.href = 'index.html'; // Chuyển về trang chủ
}

// Gọi hàm kiểm tra khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
checkLoginStatus();
updateCartCount();
});


// Initialize cart count on page load
updateCartCount();

