// --- Application Initialization & State Management ---

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    calculateInvoice();
});

function setupEventListeners() {
    // Top bar print interface trigger
    document.getElementById('print-btn').addEventListener('click', () => {
        window.print();
    });

    // Main control dynamic row generation setup
    document.getElementById('add-row-btn').addEventListener('click', addRow);

    // Global listener for live inputs inside the main calculation block
    document.getElementById('invoice-items').addEventListener('input', (e) => {
        if (e.target.classList.contains('qty-input') || e.target.classList.contains('rate-input')) {
            calculateInvoice();
        }
    });

    // Global listener for dynamic row deletion
    document.getElementById('invoice-items').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            e.target.closest('tr').remove();
            calculateInvoice();
        }
    });

    // Global tax percentage controller watcher
    document.getElementById('tax-rate').addEventListener('input', calculateInvoice);
}

// --- Live Currency and Accounting Mathematical Formula Processing Engine ---

function formatCurrency(val) {
    return '₦' + val.toLocaleString('en-NG', { minimumFractionDigits: 2 });
}

function calculateInvoice() {
    let subtotal = 0;
    
    // Scan all live elements inside the processing dashboard table view
    document.querySelectorAll('#invoice-items tr').forEach(row => {
        const qty = parseFloat(row.querySelector('.qty-input').value) || 0;
        const rate = parseFloat(row.querySelector('.rate-input').value) || 0;
        const total = qty * rate;
        
        subtotal += total;
        row.querySelector('.col-total').innerText = formatCurrency(total);
    });
    
    const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
    const tax = subtotal * (taxRate / 100);
    const grandTotal = subtotal + tax;
    
    // Update live interface dashboard components
    document.getElementById('subtotal-val').innerText = formatCurrency(subtotal);
    document.getElementById('tax-val').innerText = formatCurrency(tax);
    document.getElementById('grand-total-val').innerText = formatCurrency(grandTotal);
}

// --- Dynamic Interface Component Injector System ---

function addRow() {
    const tbody = document.getElementById('invoice-items');
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td><input type="text" class="input-cell" placeholder="New item or service item..."></td>
        <td><input type="number" class="input-cell qty-input" value="1"></td>
        <td><input type="number" class="input-cell rate-input" value="0"></td>
        <td class="col-total">₦0.00</td>
        <td class="col-action"><button class="btn-delete">×</button></td>
    `;
    
    tbody.appendChild(tr);
    calculateInvoice();
}