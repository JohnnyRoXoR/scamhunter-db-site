// Load and display data from data.json
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const chainFilter = document.getElementById('chain-filter');
    const statusFilter = document.getElementById('status-filter');
    const tableBody = document.querySelector('#data-table tbody');
    const paginationEl = document.getElementById('pagination');
    const currentYearEl = document.getElementById('year');

    let rawData = [];
    let filteredData = [];
    let currentPage = 1;
    const pageSize = 10;

    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Fetch data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            rawData = data;
            applyFilters();
        })
        .catch(err => {
            console.error('Error loading data:', err);
        });

    // Apply filters whenever user changes search or select fields
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        applyFilters();
    });
    chainFilter.addEventListener('change', () => {
        currentPage = 1;
        applyFilters();
    });
    statusFilter.addEventListener('change', () => {
        currentPage = 1;
        applyFilters();
    });

    // Filter data based on search and dropdowns
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const chainValue = chainFilter.value;
        const statusValue = statusFilter.value;
        filteredData = rawData.filter(item => {
            // Filter by search term across handle, name, description, wallet addresses
            const matchesSearch = [
                item.scammer_handle,
                item.name,
                item.description,
                ...(item.wallets ? item.wallets.map(w => w.address) : [])
            ].some(field => field && field.toLowerCase().includes(searchTerm));
            // Filter by chain
            const matchesChain = !chainValue || (item.wallets && item.wallets.some(w => w.chain === chainValue));
            // Filter by status
            const matchesStatus = !statusValue || item.status === statusValue;
            return matchesSearch && matchesChain && matchesStatus;
        });
        renderTable();
        renderPagination();
    }

    // Render table rows
    function renderTable() {
        tableBody.innerHTML = '';
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const pageItems = filteredData.slice(start, end);
        pageItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.date || ''}</td>
                <td>${item.scammer_handle || ''}</td>
                <td>${item.name || ''}</td>
                <td>${(item.platforms || []).join(', ')}</td>
                <td>${(item.wallets || []).map(w => `${w.chain}: ${w.address}`).join('<br>')}</td>
                <td>${item.description || ''}</td>
                <td>${item.status || ''}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Render pagination controls
    function renderPagination() {
        paginationEl.innerHTML = '';
        const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.disabled = currentPage <= 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
                renderPagination();
            }
        });
        paginationEl.appendChild(prevBtn);
        const pageInfo = document.createElement('span');
        pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
        paginationEl.appendChild(pageInfo);
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.disabled = currentPage >= totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
                renderPagination();
            }
        });
        paginationEl.appendChild(nextBtn);
    }
});
