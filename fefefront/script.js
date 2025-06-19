async function fetchSubnets() {
    try {
        const response = await fetch('http://127.0.0.1:8520/subnets/');
        const data = await response.json();
        const subnets = data.subnets || [];

        const table = document.getElementById("subnetTable");
        const tbody = document.getElementById("subnetBody");
        tbody.innerHTML = "";

        subnets.forEach(ip => {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.textContent = ip;
            row.appendChild(cell);
            tbody.appendChild(row);
        });

        table.style.display = subnets.length ? "table" : "none";

    } catch (error) {
        alert("Failed to fetch subnets: " + error.message);
    }
}
