// =============== LOGOUT FUNCTION ===============
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// =============== DASHBOARD DUMMY DATA ===============
// (Nanti boleh connect ke Firestore FlutterFlow API)
document.getElementById("totalComplaints").innerText = 14;
document.getElementById("resolvedComplaints").innerText = 9;
document.getElementById("pendingComplaints").innerText = 5;



// ----- Firebase config -----
const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ----- Function untuk update dashboard -----
async function updateSlipDashboard() {
    try {
        const snapshot = await db.collection("slipGaji").get();
        const slips = snapshot.docs.map(doc => doc.data());
        const totalSlips = slips.length;

        document.getElementById("totalSlips").innerText = totalSlips;

        const userCounts = {};
        slips.forEach(slip => {
            const userId = slip.userId || "Guest";
            userCounts[userId] = (userCounts[userId] || 0) + 1;
        });

        const labels = Object.keys(userCounts);
        const data = Object.values(userCounts);

        const ctx = document.getElementById('printChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets:[{ label: 'Slip Dicetak', data, backgroundColor:'rgba(54, 162, 235, 0.5)', borderColor:'rgba(54, 162, 235, 1)', borderWidth:1 }]},
            options:{ responsive:true, plugins:{ legend:{display:false}, title:{display:true,text:'Graf Slip Gaji Dicetak'}}, scales:{ y:{ beginAtZero:true, precision:0 }} }
        });

    } catch(err){
        console.error("Gagal ambil data slip:", err);
    }
}

updateSlipDashboard();
