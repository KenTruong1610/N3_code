// Dữ liệu người dùng mẫu với role
const users = [
    { name: "Admin", username: "admin", password: "admin123", role: "admin" },
    { name: "Nguyễn Văn An", username: "an", password: "123456", role: "user", active: true },
    { name: "Trần Thị Bình", username: "binh", password: "123456", role: "user", active: true }
];

/**
 * Đăng ký người dùng mới
 * @param {string} name - Họ tên
 * @param {string} username - Tên đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {boolean} - True nếu đăng ký thành công
 */
function registerUser(name, username, password) {
    // Kiểm tra username đã tồn tại chưa
    if (users.some(user => user.username === username)) {
        return false;
    }
    
    // Thêm người dùng mới với role mặc định là user
    users.push({ 
        name, 
        username, 
        password, 
        role: "user",
        active: true 
    });
    return true;
}

/**
 * Đăng nhập người dùng
 * @param {string} username - Tên đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {boolean} - True nếu đăng nhập thành công
 */
function loginUser(username, password) {
    const user = users.find(user => 
        user.username === username && 
        user.password === password &&
        (user.active !== false) // Chỉ cho phép đăng nhập nếu tài khoản active
    );
    
    if (user) {
        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

/**
 * Lấy danh sách người dùng (chỉ admin)
 * @returns {array} - Danh sách người dùng
 */
function getUsers() {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
        return users.filter(user => user.username !== 'admin'); // Không trả về admin
    }
    return [];
}

/**
 * Cập nhật trạng thái người dùng (chỉ admin)
 * @param {string} username - Tên đăng nhập
 * @param {boolean} active - Trạng thái
 * @returns {boolean} - True nếu thành công
 */
function updateUserStatus(username, active) {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
        const user = users.find(u => u.username === username);
        if (user && user.role !== 'admin') {
            user.active = active;
            return true;
        }
    }
    return false;
}

/**
 * Xóa người dùng (chỉ admin)
 * @param {string} username - Tên đăng nhập
 * @returns {boolean} - True nếu thành công
 */
function deleteUser(username) {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
        const index = users.findIndex(u => u.username === username);
        if (index !== -1 && users[index].role !== 'admin') {
            users.splice(index, 1);
            return true;
        }
    }
    return false;
}

/**
 * Đăng xuất
 */
function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

/**
 * Kiểm tra trạng thái đăng nhập
 * @returns {object|null} - Thông tin người dùng nếu đã đăng nhập
 */
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

/**
 * Cập nhật giao diện theo trạng thái đăng nhập
 */
function updateAuthStatus() {
    const authNav = document.getElementById('auth-nav');
    const currentUser = getCurrentUser();
    
    if (authNav) {
        if (currentUser) {
            // Hiển thị tên người dùng và nút đăng xuất
            authNav.innerHTML = `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user me-1"></i> ${currentUser.name}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="profile.html">Hồ sơ của tôi</a></li>
                        ${currentUser.role === 'admin' ? '<li><a class="dropdown-item" href="admin.html">Trang Quản Trị</a></li>' : ''}
                        <li><a class="dropdown-item" href="cart.html">Giỏ hàng</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="logoutUser()">Đăng xuất</a></li>
                    </ul>
                </li>
            `;
        } else {
            // Hiển thị nút đăng nhập
            authNav.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="login.html">
                        <i class="fas fa-user"></i> Đăng nhập
                    </a>
                </li>
            `;
        }
    }
}

// Cập nhật trạng thái đăng nhập khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();
    
    // Kiểm tra quyền truy cập trang admin
    if (window.location.pathname.includes('admin.html')) {
        if (!currentUser || currentUser.role !== 'admin') {
            alert('Bạn không có quyền truy cập trang này!');
            window.location.href = 'index.html';
        }
    }
    
    // Cập nhật trạng thái đăng nhập
    updateAuthStatus();
    updateCartCount();
});