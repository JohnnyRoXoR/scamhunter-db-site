// JavaScript logic for loading data, applying filters and rendering the table
document.addEventListener('DOMContentLoaded', () => {
    let data = [];
    let filteredData = [];
    let currentPage = 1;
    const rowsPerPage = 10;

    const searchInput = document.getElementById('search-input');
    const chainFilter = document.getElementById('chain-filter');
    const statusFilter = document.getElementById('status-filter');

    // Quick filter button for Solana chain
    const solFilterBtn = document.getElementById('filter-sol');
    if (solFilterBtn) {
        solFilterBtn.addEventListener('click', () => {
            chainFilter.value = 'Solana';
            currentPage = 1;
            applyFilters();
        });
    }

    function loadData() {
        fetch('data.json')
            .then((response) => response.json())
            .then((json) => {
                data = json;
                applyFilters();
            })
            .catch((error) => console.error('Error loading data:', error));
    }

    function applyFilters() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const chainTerm = chainFilter ? chainFilter.value.toLowerCase() : '';
        const statusTerm = statusFilter ? statusFilter.value.toLowerCase() : '';

        filteredData = data.filter((item) => {
            const matchSearch =
                searchTerm === '' ||
                item.scammer_handle.toLowerCase().includes(searchTerm) ||
                item.name.toLowerCase().includes(searchTerm) ||
                item.wallets.some((wallet) =>
                    wallet.address.toLowerCase().includes(searchTerm)
                );
            const matchChain =
                chainTerm === '' ||
                item.wallets.some(
                    (wallet) => wallet.chain.toLowerCase() === chainTerm
                );
            const matchStatus =
                statusTerm === '' || item.status.toLowerCase() === statusTerm;
            return matchSearch && matchChain && matchStatus;
        });
        renderTable();
    }

    function renderTable() {
        const tbody = document.querySelector('#data-table tbody');
        if (!tbody) return;
        tbody.innerHTML = '';

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = filteredData.slice(start, end);

        pageData.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.date}</td>
                <td><a href="${
                    item.scammer_handle.startsWith('http')
                        ? item.scammer_handle
                        : '#'
                }" target="_blank" rel="noopener">${
                item.scammer_handle
            }</a></td>
                <td>${item.name}</td>
                <td>${item.platforms.join(', ')}</td>
                <td>${item.wallets
                    .map(
                        (wallet) =>
                            `${wallet.chain}: ${wallet.address}`
                    )
                    .join('<br>')}</td>
                <td>${item.description}</td>
                <td>${item.status}</td>
            `;
            tbody.appendChild(row);
        });
        renderPagination();
    }

    function renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;
        pagination.innerHTML = '';
        const totalPages =
            Math.ceil(filteredData.length / rowsPerPage) || 1;

        const createButton = (text, disabled, page) => {
            const button = document.createElement('button');
            button.textContent = text;
            button.disabled = disabled;
            button.addEventListener('click', () => {
                currentPage = page;
                renderTable();
            });
            return button;
        };

        const prevButton = createButton(
            'Previous',
            currentPage === 1,
            currentPage - 1
        );
        const nextButton = createButton(
            'Next',
            currentPage === totalPages,
            currentPage + 1
        );
        pagination.appendChild(prevButton);
        const pageInfo = document.createElement('span');
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        pagination.appendChild(pageInfo);
        pagination.appendChild(nextButton);
    }

    // Event listeners for search and filters
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentPage = 1;
            applyFilters();
        });
    }
    if (chainFilter) {
        chainFilter.addEventListener('change', () => {
            currentPage = 1;
            applyFilters();
        });
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', () => {
            currentPage = 1;
            applyFilters();
        });
    }

    // Set current year in footer
    const yearElem = document.getElementById('year');
    if (yearElem) yearElem.textContent = new Date().getFullYear();

    loadData();
});
