// --- Google Sheets Configuration ---
const SHEET_ONE_PAGER_ID = "1B7tHuYl3_yOVSzUgSAU2UyNrR68fpMDL5a8kwNtaayA";
const SHEET_MESSAGES_ID = "1YWpUbhL9Z2lH53ZO_MOqwj_n6l-K12DzgEZriLEkfq8";
const RANGE = "A:E";

let tokenClient;
let accessToken = null;

// Initialize Token Client
function initTokenClient() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: "994866910276-0elmm44uvmo1k2svf3dk1174eqtq4pqu.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
        callback: (tokenResponse) => {
            if (tokenResponse.access_token) {
                accessToken = tokenResponse.access_token;
                // Fetch Data
                fetchRealSheetData(SHEET_ONE_PAGER_ID, "onePagerTable", ["Timestamp", "Email", "Status"]);
                fetchRealSheetData(SHEET_MESSAGES_ID, "messagesTable", ["Timestamp", "Name", "Email", "Message"]);
            }
        },
    });
}

function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    const userEmail = responsePayload.email;
    const authorizedEmail = "rrconsulting2025@gmail.com";

    if (userEmail === authorizedEmail) {
        // Session Persistence: Save login state
        localStorage.setItem("analyticsSession", "true");

        // Update UI
        showDashboard();

        // Authorization
        if (tokenClient) {
            tokenClient.requestAccessToken({ prompt: '' });
        }
    } else {
        // Failure
        showError(userEmail);
    }
}

function showDashboard() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("analyticsContent").style.display = "block";

    // Toggle Buttons in Navbar
    document.getElementById("g_id_onload").style.display = "none"; // Hide Google Login
    document.querySelector(".g_id_signin").style.display = "none"; // Hide Signin Button

    // Show Logout Button (Create if doesn't exist or toggle)
    let logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) {
        createLogoutButton();
    } else {
        logoutBtn.style.display = "block";
    }
}

function createLogoutButton() {
    const container = document.getElementById("navLoginContainer");
    const btn = document.createElement("button");
    btn.id = "logoutBtn";
    btn.textContent = "Logout";
    btn.className = "sticky-cta-button"; // Reuse existing style or create new
    btn.style.padding = "0.5rem 1rem";
    btn.style.fontSize = "0.9rem";
    btn.onclick = logout;
    container.appendChild(btn);
}

function logout() {
    localStorage.removeItem("analyticsSession");
    accessToken = null;
    location.reload();
}

function showError(email) {
    const errorMsg = document.getElementById("authError");
    errorMsg.style.display = "block";
    errorMsg.innerHTML = `Access Denied: <b>${email}</b> is not authorized.`;
}

// Check session on load
function checkSession() {
    const isSessionActive = localStorage.getItem("analyticsSession") === "true";
    if (isSessionActive) {
        showDashboard();
        // We need to re-acquire the Access Token silently
        // Wait for client to init, then request
        setTimeout(() => {
            if (tokenClient) {
                tokenClient.requestAccessToken({ prompt: 'none' });
            }
        }, 1000);
    } else {
        // Ensure Login Button is visible if NOT logged in
        document.getElementById("g_id_onload").style.display = "block";
        const signinBtn = document.querySelector(".g_id_signin");
        if (signinBtn) signinBtn.style.display = "block";
    }
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// --- Real Data Fetching ---

async function fetchRealSheetData(spreadsheetId, tableId, expectedHeaders) {
    if (!accessToken) return;

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${RANGE}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // Token likely expired or invalid, try to refresh or prompt
                console.warn("Token issue, prompting re-auth");
                // Optionally: tokenClient.requestAccessToken({ prompt: '' });
            }
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const result = await response.json();
        const values = result.values;

        if (!values || values.length === 0) {
            document.querySelector(`#${tableId} tbody`).innerHTML = "<tr><td>No data found.</td></tr>";
            return;
        }

        const sheetHeaders = values[0];
        const sheetData = values.slice(1);

        populateTable(tableId, sheetHeaders, sheetData);

    } catch (error) {
        console.error("API Error:", error);
        document.querySelector(`#${tableId} tbody`).innerHTML = `<tr><td style="color:red">Error loading data. Check console.</td></tr>`;
    }
}

function populateTable(tableId, headers, data) {
    const table = document.getElementById(tableId);
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");

    thead.innerHTML = "";
    tbody.innerHTML = "";

    const headerRow = document.createElement("tr");
    headers.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    data.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(cellText => {
            const td = document.createElement("td");
            td.textContent = cellText;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// Initialize on load
window.onload = function () {
    initTokenClient();
    checkSession(); // Restore session if exists
};
