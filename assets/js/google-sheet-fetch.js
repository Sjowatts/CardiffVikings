
async function fetchCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.trim().split('\n').map(row => row.split(','));
    return rows;
}

function generateTable(rows, containerId) {
    const container = document.getElementById(containerId);
    if (!container || rows.length === 0) return;

    const table = document.createElement('table');
    table.classList.add('table-auto', 'w-full', 'text-left', 'border-collapse', 'border', 'border-yellow-500', 'mt-4');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    rows[0].forEach(header => {
        const th = document.createElement('th');
        th.classList.add('border', 'border-yellow-500', 'px-4', 'py-2', 'bg-yellow-500', 'text-black');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let i = 1; i < rows.length; i++) {
        const tr = document.createElement('tr');
        rows[i].forEach(cell => {
            const td = document.createElement('td');
            td.classList.add('border', 'border-yellow-500', 'px-4', 'py-2');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    container.appendChild(table);
}

document.addEventListener('DOMContentLoaded', async () => {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTe0jfYrTl_cfqVt812QFYvCu2ZeZ9XXepyX-K3wchDf-GILqODcBHATiA0P5ROzKb3lPM4p3Maf4VX/pub?output=csv";

    try {
        const data = await fetchCSV(sheetURL);
        generateTable(data, "matchDataContainer");
    } catch (error) {
        console.error("Error loading match data:", error);
        const container = document.getElementById("matchDataContainer");
        if (container) {
            container.textContent = "Unable to load match data at this time.";
        }
    }
});
