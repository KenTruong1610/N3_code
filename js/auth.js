const users = [
    { name: "Admin", username: "admin", password: "admin123", role: "admin" },
    { name: "Nguyễn Văn An", username: "an", password: "123456", role: "user", active: true },
    { name: "Trần Thị Bình", username: "binh", password: "123456", role: "user", active: true }
];

function registerUser(name, username, password) {
    if (users.some(user => user.username === username)) {
        return false;
    }
    
    users.push({ 
        name, 
        username, 
        password, 
        role: "user",
        active: true 
    });
    return true;
}


function loginUser(username, password) {
    const user = users.find(user => 
        user.username === username && 
        user.password === password &&
        (user.active !== false) 
    );
    
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
    updateAdminStatus();
    return true;
}

function getUsers() {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
        return users.filter(user => user.username !== 'admin'); 
    }
    return [];
}

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
function updateAdminStatus() {
    const currentUser = getCurrentUser();
    const adminNavItem = document.getElementById('admin-nav-item');
    
    if (currentUser && currentUser.role === 'admin') {
        adminNavItem.style.display = 'block';
    } else {
        adminNavItem.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateAuthStatus();
    updateAdminStatus(); 
    updateCartCount();
});

function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
    updateAdminStatus();
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function updateAuthStatus() {
    const authNav = document.getElementById('auth-nav');
    const currentUser = getCurrentUser();
    
    if (authNav) {
        if (currentUser) {
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