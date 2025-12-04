/**
 * BlueWave Bookstore Information System
 * Main JavaScript Application
 * 
 * A fully functional bookstore management system simulation
 * using localStorage for data persistence.
 */

// ================= GLOBAL VARIABLES =================
let demoData = {
    books: [],
    sales: [],
    suppliers: [],
    settings: {
        currency: 'USD',
        lowStockThreshold: 10,
        criticalStockThreshold: 5
    }
};

let currentUser = {
    username: '',
    role: 'admin',
    fullName: ''
};

// ================= DATA MANAGEMENT =================

/**
 * Initialize demo data from localStorage or create default data
 */
function initializeData() {
    console.log('📚 Initializing BlueWave Bookstore DEMO...');
    
    const savedData = localStorage.getItem('bluewave_demo_data');
    if (savedData) {
        try {
            demoData = JSON.parse(savedData);
            console.log('✅ Loaded data from localStorage');
        } catch (error) {
            console.error('❌ Error loading data:', error);
            createDemoData();
        }
    } else {
        createDemoData();
    }
    
    // Set current user from localStorage or default
    const savedUser = localStorage.getItem('bluewave_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    updateUserDisplay();
}

/**
 * Create initial demo data
 */
function createDemoData() {
    console.log('🔄 Creating initial demo data...');
    
    demoData = {
        books: [
            {
                id: 1,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                isbn: "9780743273565",
                price: 12.99,
                quantity: 25,
                category: "Fiction",
                supplierId: 1,
                createdAt: "2024-01-15",
                salesCount: 5
            },
            {
                id: 2,
                title: "Introduction to Algorithms",
                author: "Thomas H. Cormen",
                isbn: "9780262033848",
                price: 89.99,
                quantity: 15,
                category: "Technology",
                supplierId: 2,
                createdAt: "2024-01-10",
                salesCount: 3
            },
            {
                id: 3,
                title: "The Lean Startup",
                author: "Eric Ries",
                isbn: "9780307887894",
                price: 24.99,
                quantity: 8,
                category: "Business",
                supplierId: 1,
                createdAt: "2024-01-05",
                salesCount: 7
            },
            {
                id: 4,
                title: "Clean Code",
                author: "Robert C. Martin",
                isbn: "9780132350884",
                price: 45.99,
                quantity: 12,
                category: "Technology",
                supplierId: 2,
                createdAt: "2024-01-20",
                salesCount: 4
            },
            {
                id: 5,
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                isbn: "9780061120084",
                price: 14.99,
                quantity: 2,
                category: "Fiction",
                supplierId: 1,
                createdAt: "2024-01-25",
                salesCount: 6
            },
              {
                id: 6,
                title: "The Geico Handbook",
                author: "Ashburn Giddick",
                isbn: "9780061120090",
                price: 25.99,
                quantity: 10,
                category: "Fiction",
                supplierId: 1,
                createdAt: "2024-01-25",
                salesCount: 6
            },  
            {
                id: 7,
                title: "Parenting Troubles",
                author: "Roy Harper",
                isbn: "9780061190084",
                price: 34.99,
                quantity: 20,
                category: "Fiction",
                supplierId: 1,
                createdAt: "2024-01-25",
                salesCount: 6
            },
            {
                id: 8,
                title: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                isbn: "9780062316097",
                price: 19.99,
                quantity: 18,
                category: "Science",
                supplierId: 2,
                createdAt: "2024-01-30",
                salesCount: 2
            }
        ],
        sales: [
            {
                id: 1,
                bookId: 1,
                title: "The Great Gatsby",
                quantity: 1,
                unitPrice: 12.99,
                totalPrice: 12.99,
                saleDate: getTodayDate(),
                saleTime: "10:30 AM",
                soldBy: "admin"
            },
            {
                id: 2,
                bookId: 3,
                title: "The Lean Startup",
                quantity: 2,
                unitPrice: 24.99,
                totalPrice: 49.98,
                saleDate: getTodayDate(),
                saleTime: "11:45 AM",
                soldBy: "cashier"
            },
            {
                id: 3,
                bookId: 4,
                title: "Clean Code",
                quantity: 1,
                unitPrice: 45.99,
                totalPrice: 45.99,
                saleDate: getTodayDate(),
                saleTime: "02:15 PM",
                soldBy: "admin"
            },
            {
                id: 4,
                bookId: 2,
                title: "Introduction to Algorithms",
                quantity: 1,
                unitPrice: 89.99,
                totalPrice: 89.99,
                saleDate: getYesterdayDate(),
                saleTime: "03:30 PM",
                soldBy: "admin"
            }
        ],
        suppliers: [
            {
                id: 1,
                name: "Book Distributors Inc",
                contactPerson: "Sarah Johnson",
                email: "sarah@bookdist.com",
                phone: "+1-555-1234",
                categories: "Fiction, Business, Technology",
                address: "123 Publishing Ave, New York, NY"
            },
            {
                id: 2,
                name: "Global Publishers Ltd",
                contactPerson: "Michael Chen",
                email: "michael@globalpub.com",
                phone: "+1-555-5678",
                categories: "Science, Education, Reference",
                address: "456 Book St, San Francisco, CA"
            }
        ],
        settings: {
            currency: 'USD',
            lowStockThreshold: 10,
            criticalStockThreshold: 5
        }
    };
    
    saveData();
}

/**
 * Save data to localStorage
 */
function saveData() {
    localStorage.setItem('bluewave_demo_data', JSON.stringify(demoData));
    localStorage.setItem('bluewave_current_user', JSON.stringify(currentUser));
}

/**
 * Reset all demo data to initial state
 */
function resetDemo() {
    if (confirm('Are you sure you want to reset all demo data? This cannot be undone.')) {
        localStorage.removeItem('bluewave_demo_data');
        localStorage.removeItem('bluewave_current_user');
        initializeData();
        updateDashboard();
        showNotification('Demo data has been reset successfully!', 'success');
    }
}

// ================= AUTHENTICATION =================

/**
 * Handle user login
 */
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || password !== 'password123') {
        showNotification('Invalid credentials. Use password123', 'danger');
        return;
    }
    
    currentUser = {
        username: username,
        role: username === 'admin' ? 'admin' : 'cashier',
        fullName: username === 'admin' ? 'System Administrator' : 'John Cashier'
    };
    
    // Switch to app view
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    
    saveData();
    updateUserDisplay();
    showPage('dashboard');
    
    showNotification(`Welcome back, ${currentUser.fullName}!`, 'success');
    
    // Log for debugging
    console.log(`👤 User logged in: ${currentUser.username} (${currentUser.role})`);
}

/**
 * Handle user logout
 */
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        document.getElementById('app').style.display = 'none';
        document.getElementById('loginPage').style.display = 'flex';
        showNotification('You have been logged out successfully.', 'info');
    }
}

/**
 * Update user display in sidebar
 */
function updateUserDisplay() {
    const userElement = document.getElementById('currentUser');
    if (userElement) {
        userElement.textContent = currentUser.username;
    }
}

// ================= PAGE MANAGEMENT =================

/**
 * Show a specific page and hide others
 * @param {string} pageName - Name of the page to show
 */
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    const pageElement = document.getElementById(`${pageName}Page`);
    if (pageElement) {
        pageElement.style.display = 'block';
        
        // Update page content based on page
        switch(pageName) {
            case 'dashboard':
                updateDashboard();
                break;
            case 'books':
                renderBooksTable();
                break;
            case 'sales':
                updateSalesPage();
                break;
            case 'inventory':
                renderInventoryTable();
                break;
            case 'reports':
                renderReports();
                break;
        }
        
        console.log(`📄 Navigated to: ${pageName}`);
    }
}

// ================= DASHBOARD FUNCTIONS =================

/**
 * Update dashboard statistics and content
 */
function updateDashboard() {
    // Calculate statistics
    const totalBooks = demoData.books.length;
    const lowStockBooks = demoData.books.filter(book => 
        book.quantity < demoData.settings.lowStockThreshold
    ).length;
    
    const today = getTodayDate();
    const todaySales = demoData.sales
        .filter(sale => sale.saleDate === today)
        .reduce((total, sale) => total + sale.totalPrice, 0);
    
    const totalSuppliers = demoData.suppliers.length;
    
    // Update statistics cards
    document.getElementById('totalBooks').textContent = totalBooks;
    document.getElementById('lowStockCount').textContent = lowStockBooks;
    document.getElementById('todaySales').textContent = formatCurrency(todaySales);
    document.getElementById('totalSuppliers').textContent = totalSuppliers;
    
    // Update recent sales table
    updateRecentSales();
    
    // Update low stock list
    updateLowStockList();
}

/**
 * Update recent sales table
 */
function updateRecentSales() {
    const recentSales = [...demoData.sales]
        .sort((a, b) => new Date(b.saleDate + ' ' + b.saleTime) - new Date(a.saleDate + ' ' + a.saleTime))
        .slice(0, 5);
    
    const salesTable = document.getElementById('recentSales');
    if (salesTable) {
        salesTable.innerHTML = `
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Book</th>
                        <th>Qty</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${recentSales.map(sale => `
                        <tr>
                            <td>${sale.saleTime}</td>
                            <td>${sale.title}</td>
                            <td>${sale.quantity}</td>
                            <td>${formatCurrency(sale.totalPrice)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

/**
 * Update low stock books list
 */
function updateLowStockList() {
    const lowStockBooks = demoData.books
        .filter(book => book.quantity < demoData.settings.lowStockThreshold)
        .sort((a, b) => a.quantity - b.quantity)
        .slice(0, 5);
    
    const lowStockList = document.getElementById('lowStockList');
    if (lowStockList) {
        lowStockList.innerHTML = `
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Stock</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${lowStockBooks.map(book => {
                        const isCritical = book.quantity < demoData.settings.criticalStockThreshold;
                        return `
                            <tr class="${isCritical ? 'out-of-stock' : 'low-stock'}">
                                <td>${book.title}</td>
                                <td class="fw-bold">${book.quantity}</td>
                                <td>
                                    <span class="badge ${isCritical ? 'bg-danger' : 'bg-warning'}">
                                        ${isCritical ? 'Critical' : 'Low'}
                                    </span>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }
}

// ================= BOOKS MANAGEMENT =================

/**
 * Render books table
 */
function renderBooksTable() {
    const booksTable = document.getElementById('booksTable');
    if (!booksTable) return;
    
    booksTable.innerHTML = demoData.books.map(book => {
        const isLowStock = book.quantity < demoData.settings.lowStockThreshold;
        const isCritical = book.quantity < demoData.settings.criticalStockThreshold;
        
        return `
            <tr class="${isCritical ? 'out-of-stock' : isLowStock ? 'low-stock' : ''}">
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${formatCurrency(book.price)}</td>
                <td>
                    <span class="${isLowStock ? 'fw-bold' : ''}">
                        ${book.quantity}
                        ${isCritical ? '<i class="bi bi-exclamation-triangle text-danger ms-1"></i>' : ''}
                    </span>
                </td>
                <td>
                    <span class="badge bg-secondary">${book.category}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-warning me-2" onclick="editBook(${book.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Filter books based on search input
 */
function filterBooks() {
    const searchTerm = document.getElementById('bookSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#booksTable tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

/**
 * Show book modal for adding or editing
 * @param {number} bookId - ID of book to edit (optional)
 */
function showBookModal(bookId = null) {
    const modal = new bootstrap.Modal(document.getElementById('bookModal'));
    const title = document.getElementById('modalTitle');
    const idField = document.getElementById('editBookId');
    
    if (bookId) {
        // Edit mode
        const book = demoData.books.find(b => b.id === bookId);
        if (!book) return;
        
        title.textContent = 'Edit Book';
        idField.value = bookId;
        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookPrice').value = book.price;
        document.getElementById('bookQuantity').value = book.quantity;
        document.getElementById('bookCategory').value = book.category;
    } else {
        // Add mode
        title.textContent = 'Add New Book';
        idField.value = '';
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookPrice').value = '';
        document.getElementById('bookQuantity').value = '';
        document.getElementById('bookCategory').value = 'Fiction';
    }
    
    modal.show();
}

/**
 * Save book (add or update)
 */
function saveBook() {
    const id = document.getElementById('editBookId').value;
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const price = parseFloat(document.getElementById('bookPrice').value);
    const quantity = parseInt(document.getElementById('bookQuantity').value);
    const category = document.getElementById('bookCategory').value;
    
    // Validation
    if (!title || !author || isNaN(price) || isNaN(quantity)) {
        showNotification('Please fill all required fields correctly.', 'warning');
        return;
    }
    
    if (price <= 0 || quantity < 0) {
        showNotification('Price must be positive and quantity cannot be negative.', 'warning');
        return;
    }
    
    if (id) {
        // Update existing book
        const bookIndex = demoData.books.findIndex(b => b.id === parseInt(id));
        if (bookIndex !== -1) {
            demoData.books[bookIndex] = {
                ...demoData.books[bookIndex],
                title,
                author,
                price,
                quantity,
                category
            };
            showNotification('Book updated successfully!', 'success');
        }
    } else {
        // Add new book
        const newId = demoData.books.length > 0 ? 
            Math.max(...demoData.books.map(b => b.id)) + 1 : 1;
        
        demoData.books.push({
            id: newId,
            title,
            author,
            isbn: `ISBN${String(newId).padStart(10, '0')}`,
            price,
            quantity,
            category,
            supplierId: 1,
            createdAt: getTodayDate(),
            salesCount: 0
        });
        
        showNotification('Book added successfully!', 'success');
    }
    
    saveData();
    renderBooksTable();
    updateDashboard();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookModal'));
    modal.hide();
}

/**
 * Edit book
 * @param {number} bookId - ID of book to edit
 */
function editBook(bookId) {
    showBookModal(bookId);
}

/**
 * Delete book
 * @param {number} bookId - ID of book to delete
 */
function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        demoData.books = demoData.books.filter(b => b.id !== bookId);
        saveData();
        renderBooksTable();
        updateDashboard();
        showNotification('Book deleted successfully!', 'success');
    }
}

// ================= SALES MANAGEMENT =================

/**
 * Update sales page content
 */
function updateSalesPage() {
    updateBookDropdown();
    updateSalePrice();
    renderTodaySales();
}

/**
 * Update book dropdown for sales
 */
function updateBookDropdown() {
    const select = document.getElementById('saleBookSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Select a book...</option>' +
        demoData.books.map(book => `
            <option value="${book.id}" 
                    data-price="${book.price}" 
                    data-stock="${book.quantity}"
                    ${book.quantity === 0 ? 'disabled' : ''}>
                ${book.title} - ${formatCurrency(book.price)} (Stock: ${book.quantity})
            </option>
        `).join('');
}

/**
 * Update sale price when book is selected
 */
function updateSalePrice() {
    const select = document.getElementById('saleBookSelect');
    const selected = select.options[select.selectedIndex];
    
    if (selected && selected.value) {
        const price = parseFloat(selected.getAttribute('data-price'));
        const stock = parseInt(selected.getAttribute('data-stock'));
        
        document.getElementById('saleUnitPrice').value = formatCurrency(price);
        document.getElementById('saleStock').value = stock;
        document.getElementById('saleQuantity').max = stock;
        document.getElementById('saleQuantity').value = Math.min(1, stock);
    } else {
        document.getElementById('saleUnitPrice').value = '';
        document.getElementById('saleStock').value = '';
        document.getElementById('saleQuantity').value = 1;
    }
    
    updateSaleTotal();
}

/**
 * Update total sale amount
 */
function updateSaleTotal() {
    const priceStr = document.getElementById('saleUnitPrice').value;
    const price = parseFloat(priceStr.replace(/[^0-9.-]+/g, '')) || 0;
    const quantity = parseInt(document.getElementById('saleQuantity').value) || 0;
    const total = price * quantity;
    
    document.getElementById('saleTotal').value = total > 0 ? formatCurrency(total) : '';
}

/**
 * Process a new sale
 */
function processSale() {
    const bookId = parseInt(document.getElementById('saleBookSelect').value);
    const quantity = parseInt(document.getElementById('saleQuantity').value);
    
    if (!bookId || !quantity || quantity <= 0) {
        showNotification('Please select a book and enter a valid quantity.', 'warning');
        return;
    }
    
    const book = demoData.books.find(b => b.id === bookId);
    if (!book) {
        showNotification('Book not found!', 'danger');
        return;
    }
    
    if (book.quantity < quantity) {
        showNotification(`Only ${book.quantity} units available!`, 'danger');
        return;
    }
    
    // Update book quantity and sales count
    book.quantity -= quantity;
    book.salesCount = (book.salesCount || 0) + quantity;
    
    // Create sale record
    const now = new Date();
    const saleId = demoData.sales.length > 0 ? 
        Math.max(...demoData.sales.map(s => s.id)) + 1 : 1;
    
    const sale = {
        id: saleId,
        bookId: book.id,
        title: book.title,
        quantity: quantity,
        unitPrice: book.price,
        totalPrice: book.price * quantity,
        saleDate: getTodayDate(),
        saleTime: formatTime(now),
        soldBy: currentUser.username
    };
    
    demoData.sales.push(sale);
    
    // Save changes
    saveData();
    
    // Update displays
    updateDashboard();
    updateSalesPage();
    
    // Show receipt
    showReceipt(sale);
    
    showNotification('Sale processed successfully!', 'success');
}
function printReceipt(sale) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt #${sale.id}</title>
            <style>
                body { font-family: monospace; padding: 20px; max-width: 300px; }
                .center { text-align: center; }
                .line { border-bottom: 1px dashed #000; margin: 10px 0; }
                .total { font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="center">
                <h3>📚 BlueWave Bookstore</h3>
                <p>Receipt #${String(sale.id).padStart(6, '0')}</p>
                <p>${new Date().toLocaleDateString()} ${sale.saleTime}</p>
            </div>
            
            <div class="line"></div>
            
            <table width="100%">
                <tr>
                    <td>${sale.title}</td>
                    <td align="right">${sale.quantity} x $${sale.unitPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td align="right">$${sale.totalPrice.toFixed(2)}</td>
                </tr>
            </table>
            
            <div class="line"></div>
            
            <table width="100%" class="total">
                <tr>
                    <td>TOTAL</td>
                    <td align="right">$${sale.totalPrice.toFixed(2)}</td>
                </tr>
            </table>
            
            <div class="line"></div>
            
            <p class="center">
                Thank you!<br>
                Sold by: ${currentUser.fullName}
            </p>
            
            <script>
                window.onload = () => window.print();
                setTimeout(() => window.close(), 5000);
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Call this after successful sale
// Modify processSale() function to call: printReceipt(sale);
/**
 * Show receipt for a sale
 * @param {object} sale - Sale object
 */
function showReceipt(sale) {
    const receiptContent = `
        <div class="receipt text-center">
            <h4>📚 BlueWave Bookstore</h4>
            <p class="text-muted mb-2">RECEIPT #${String(sale.id).padStart(6, '0')}</p>
            <p class="text-muted mb-4">${sale.saleDate} ${sale.saleTime}</p>
            
            <div class="text-start">
                <p><strong>Book:</strong> ${sale.title}</p>
                <p><strong>Quantity:</strong> ${sale.quantity}</p>
                <p><strong>Unit Price:</strong> ${formatCurrency(sale.unitPrice)}</p>
                <hr>
                <h5 class="text-end">Total: ${formatCurrency(sale.totalPrice)}</h5>
            </div>
            
            <p class="text-muted mt-4">Sold by: ${currentUser.fullName}</p>
            <button class="btn btn-outline-primary mt-2" onclick="printReceipt(${sale.id})">
                <i class="bi bi-printer"></i> Print Receipt
            </button>
        </div>
    `;
    
    // You could show this in a modal or alert
    alert(`✅ Sale Processed!\n\nBook: ${sale.title}\nQuantity: ${sale.quantity}\nTotal: ${formatCurrency(sale.totalPrice)}`);
}

/**
 * Print receipt (simulated)
 * @param {number} saleId - Sale ID
 */
function printReceipt(saleId) {
    alert('Print functionality would be implemented here. For demo, receipt information is displayed above.');
    // In a real implementation, this would open print dialog
}

/**
 * Render today's sales
 */
function renderTodaySales() {
    const today = getTodayDate();
    const todaySales = demoData.sales.filter(sale => sale.saleDate === today);
    const total = todaySales.reduce((sum, sale) => sum + sale.totalPrice, 0);
    
    const todaySalesList = document.getElementById('todaySalesList');
    if (todaySalesList) {
        todaySalesList.innerHTML = `
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Book</th>
                        <th>Qty</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${todaySales.map(sale => `
                        <tr>
                            <td>${sale.saleTime}</td>
                            <td>${sale.title}</td>
                            <td>${sale.quantity}</td>
                            <td>${formatCurrency(sale.totalPrice)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    document.getElementById('todayTotal').textContent = formatCurrency(total);
}

// ================= INVENTORY MANAGEMENT =================

/**
 * Render inventory table
 */
function renderInventoryTable() {
    const inventoryTable = document.getElementById('inventoryTable');
    if (!inventoryTable) return;
    
    inventoryTable.innerHTML = demoData.books.map(book => {
        // Find last sale for this book
        const lastSale = [...demoData.sales]
            .filter(s => s.bookId === book.id)
            .sort((a, b) => new Date(b.saleDate + ' ' + b.saleTime) - new Date(a.saleDate + ' ' + a.saleTime))[0];
        
        // Determine status
        let statusClass, statusText;
        if (book.quantity === 0) {
            statusClass = 'bg-danger';
            statusText = 'Out of Stock';
        } else if (book.quantity < demoData.settings.criticalStockThreshold) {
            statusClass = 'bg-danger';
            statusText = 'Critical';
        } else if (book.quantity < demoData.settings.lowStockThreshold) {
            statusClass = 'bg-warning';
            statusText = 'Low';
        } else {
            statusClass = 'bg-success';
            statusText = 'Good';
        }
        
        return `
            <tr class="${book.quantity < demoData.settings.lowStockThreshold ? 'low-stock' : ''}">
                <td>${book.title}</td>
                <td class="fw-bold">${book.quantity}</td>
                <td>
                    <span class="badge ${statusClass}">${statusText}</span>
                </td>
                <td>
                    ${lastSale ? `${lastSale.saleTime} ${lastSale.saleDate}` : 'Never sold'}
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="showRestockModal(${book.id})">
                        <i class="bi bi-box-arrow-in-down"></i> Restock
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Show restock modal
 * @param {number} bookId - ID of book to restock
 */
function showRestockModal(bookId) {
    const book = demoData.books.find(b => b.id === bookId);
    if (!book) return;
    
    document.getElementById('restockBookId').value = bookId;
    document.getElementById('restockBookTitle').textContent = book.title;
    
    const modal = new bootstrap.Modal(document.getElementById('restockModal'));
    modal.show();
}

/**
 * Restock book
 */
function restockBook() {
    const bookId = parseInt(document.getElementById('restockBookId').value);
    const quantity = parseInt(document.getElementById('restockQuantity').value);
    
    if (!bookId || !quantity || quantity <= 0) {
        showNotification('Please enter a valid quantity.', 'warning');
        return;
    }
    
    const book = demoData.books.find(b => b.id === bookId);
    if (!book) {
        showNotification('Book not found!', 'danger');
        return;
    }
    
    book.quantity += quantity;
    saveData();
    
    renderInventoryTable();
    renderBooksTable();
    updateDashboard();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('restockModal'));
    modal.hide();
    
    showNotification(`Added ${quantity} units to "${book.title}"`, 'success');
}

// ================= REPORTS =================

/**
 * Render reports page
 */
function renderReports() {
    renderSalesReport();
}

/**
 * Render sales report
 */
function renderSalesReport() {
    const salesReport = document.getElementById('salesReport');
    if (!salesReport) return;
    
    // Group sales by date
    const salesByDate = {};
    demoData.sales.forEach(sale => {
        if (!salesByDate[sale.saleDate]) {
            salesByDate[sale.saleDate] = [];
        }
        salesByDate[sale.saleDate].push(sale);
    });
    
    // Create report rows
    let rows = [];
    Object.keys(salesByDate)
        .sort()
        .reverse()
        .forEach(date => {
            const dateSales = salesByDate[date];
            dateSales.forEach(sale => {
                rows.push(`
                    <tr>
                        <td>${date}</td>
                        <td>${sale.title}</td>
                        <td>${sale.quantity}</td>
                        <td>${formatCurrency(sale.totalPrice)}</td>
                    </tr>
                `);
            });
        });
    
    salesReport.innerHTML = rows.join('');
}

/**
 * Export data as CSV
 */
function exportData() {
    // Prepare CSV content
    let csv = 'Date,Book,Quantity,Unit Price,Total Price,Sold By\n';
    
    demoData.sales.forEach(sale => {
        csv += `${sale.saleDate},"${sale.title}",${sale.quantity},${sale.unitPrice},${sale.totalPrice},${sale.soldBy}\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bluewave_sales_report_${getTodayDate()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('CSV file downloaded successfully!', 'success');
}

// ================= UTILITY FUNCTIONS =================

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: demoData.settings.currency
    }).format(amount);
}

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

/**
 * Get yesterday's date in YYYY-MM-DD format
 * @returns {string} Yesterday's date
 */
function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

/**
 * Format time as HH:MM AM/PM
 * @param {Date} date - Date object
 * @returns {string} Formatted time
 */
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, info, warning, danger)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 350px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add to app.js
function exportAllData() {
    const data = {
        books: demoData.books,
        sales: demoData.sales,
        suppliers: demoData.suppliers,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `bluewave_backup_${new Date().toISOString().split('T')[0]}.json`);
    link.click();
}

function importData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (confirm('Replace all current data?')) {
                demoData = importedData;
                saveData();
                location.reload();
            }
        } catch (error) {
            alert('Invalid file format!');
        }
    };
    
    reader.readAsText(file);
}

// Add to app.js
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('bluewave_theme', newTheme);
    
    // Update icon
    const icon = document.querySelector('.dark-mode-toggle i');
    if (icon) {
        icon.className = newTheme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
    }
}

// Initialize on load
const savedTheme = localStorage.getItem('bluewave_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Add button to sidebar
<div class="nav-link text-white" onclick="toggleDarkMode()">
    <i class="bi bi-moon"></i> Dark Mode
</div>

// Add to app.js
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S = Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (document.querySelector('#bookModal.show')) saveBook();
    }
    
    // Escape = Close modal
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        if (modals.length > 0) {
            const modal = bootstrap.Modal.getInstance(modals[0]);
            modal.hide();
        }
    }
    
    // F1 = Show help
    if (e.key === 'F1') {
        e.preventDefault();
        showKeyboardShortcuts();
    }
});

function showKeyboardShortcuts() {
    alert(`Keyboard Shortcuts:
    
    Ctrl/Cmd + S  - Save form
    Esc           - Close modal
    F1            - This help
    
    Navigation:
    Alt + D       - Dashboard
    Alt + B       - Books
    Alt + S       - Sales
    Alt + I       - Inventory
    Alt + R       - Reports`);
}

// Add loading function
function showLoading(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add('loading');
    }
}

function hideLoading(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.remove('loading');
    }
}

// Use in functions
function saveBook() {
    showLoading('#bookModal .modal-footer');
    // ... rest of saveBook
    setTimeout(() => hideLoading('#bookModal .modal-footer'), 1000);
}

// Professional toast system
class Toast {
    static show(message, type = 'info', duration = 3000) {
        // Create toast container if it doesn't exist
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }
        
        // Create toast
        const toastId = 'toast-' + Date.now();
        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center border-0 bg-${type}" role="alert">
                <div class="d-flex">
                    <div class="toast-body text-white">
                        <i class="bi bi-${this.getIcon(type)} me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', toastHTML);
        
        // Show toast
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: duration
        });
        
        toast.show();
        
        // Clean up after hide
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
    
    static getIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'x-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Replace all alerts with:
// Toast.show('Book added successfully!', 'success');
// Toast.show('Error!', 'error');

function exportSalesCSV() {
    let csv = 'Date,Book,Quantity,Unit Price,Total Price,Sold By\n';
    
    demoData.sales.forEach(sale => {
        csv += `${sale.saleDate},"${sale.title}",${sale.quantity},${sale.unitPrice},${sale.totalPrice},${sale.soldBy}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_report_${getTodayDate()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    Toast.show('CSV exported successfully!', 'success');
}

// Add button to reports page
<button class="btn btn-success" onclick="exportSalesCSV()">
    <i class="bi bi-file-earmark-excel"></i> Export CSV
</button>

// Enhanced validation functions
function validateBookData(book) {
    const errors = [];
    
    if (!book.title || book.title.trim().length < 2) {
        errors.push('Title must be at least 2 characters');
    }
    
    if (!book.author || book.author.trim().length < 2) {
        errors.push('Author name is required');
    }
    
    if (isNaN(book.price) || book.price <= 0) {
        errors.push('Price must be a positive number');
    }
    
    if (isNaN(book.quantity) || book.quantity < 0) {
        errors.push('Quantity cannot be negative');
    }
    
    // ISBN validation (optional)
    if (book.isbn && !isValidISBN(book.isbn)) {
        errors.push('Invalid ISBN format');
    }
    
    return errors;
}

function isValidISBN(isbn) {
    // Simple ISBN validation
    const cleanISBN = isbn.replace(/[-\s]/g, '');
    return cleanISBN.length === 10 || cleanISBN.length === 13;
}

// Enhanced saveBook function
function saveBook() {
    const book = {
        title: document.getElementById('bookTitle').value.trim(),
        author: document.getElementById('bookAuthor').value.trim(),
        price: parseFloat(document.getElementById('bookPrice').value),
        quantity: parseInt(document.getElementById('bookQuantity').value),
        category: document.getElementById('bookCategory').value
    };
    
    const errors = validateBookData(book);
    if (errors.length > 0) {
        Toast.show(errors.join(', '), 'error');
        return;
    }
    
    // ... rest of saveBook
}

// Enhance search with suggestions
function initSearchSuggestions() {
    const searchInput = document.getElementById('bookSearch');
    if (!searchInput) return;
    
    const suggestionsBox = document.createElement('div');
    suggestionsBox.id = 'searchSuggestions';
    suggestionsBox.className = 'dropdown-menu show position-absolute';
    suggestionsBox.style.display = 'none';
    
    searchInput.parentNode.appendChild(suggestionsBox);
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            suggestionsBox.style.display = 'none';
            return;
        }
        
        const suggestions = demoData.books
            .filter(book => 
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.isbn?.includes(query)
            )
            .slice(0, 5);
        
        if (suggestions.length > 0) {
            suggestionsBox.innerHTML = suggestions.map(book => `
                <a class="dropdown-item" href="#" onclick="selectSuggestion('${book.title}')">
                    <strong>${book.title}</strong><br>
                    <small class="text-muted">${book.author} - $${book.price.toFixed(2)}</small>
                </a>
            `).join('');
            
            suggestionsBox.style.display = 'block';
            suggestionsBox.style.width = searchInput.offsetWidth + 'px';
        } else {
            suggestionsBox.style.display = 'none';
        }
    });
    
    // Hide suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = 'none';
        }
    });
}

function selectSuggestion(title) {
    document.getElementById('bookSearch').value = title;
    filterBooks();
    document.getElementById('searchSuggestions').style.display = 'none';
}

function addVoiceCommand() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            
            if (command.includes('add book')) {
                showBookModal();
            } else if (command.includes('dashboard')) {
                showPage('dashboard');
            } else if (command.includes('new sale')) {
                showPage('sales');
            }
            
            Toast.show(`Heard: "${command}"`, 'info');
        };
        
        recognition.start();
        Toast.show('Voice command active - say "add book" or "dashboard"', 'info');
    } else {
        Toast.show('Voice commands not supported in this browser', 'warning');
    }
}

// Add voice button
<button class="btn btn-info" onclick="addVoiceCommand()">
    <i class="bi bi-mic"></i> Voice Command
</button>


// ================= INITIALIZATION =================

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 BlueWave Bookstore DEMO Initializing...');
    
    // Initialize data
    initializeData();
    
    // Set up event listeners
    document.getElementById('saleQuantity')?.addEventListener('input', updateSaleTotal);
    
    // Show welcome message
    console.log('✅ Application initialized successfully!');
    console.log('📖 Demo features:');
    console.log('- Dashboard with real-time stats');
    console.log('- Books CRUD operations');
    console.log('- Sales processing with inventory updates');
    console.log('- Inventory management with restocking');
    console.log('- Reports with CSV export');
    console.log('- Responsive design for all devices');
});
