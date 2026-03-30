import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyAOWxhHPTH1gK_ZCVn8ZpuK1fNryn981Rs",
  authDomain: "ladder-climber-c5a08.firebaseapp.com",
  projectId: "ladder-climber-c5a08",
  storageBucket: "ladder-climber-c5a08.firebasestorage.app",
  messagingSenderId: "154048587151",
  appId: "1:154048587151:web:3925d1d21722d4e715d7fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const resultsDiv = document.querySelector(".results");
const marksRadios = document.querySelectorAll('input[name="marks"]');
const interestRadios = document.querySelectorAll('input[name="interest"]');
const regionSelect = document.getElementById("region");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

async function fetchColleges() {
  const marks = document.querySelector('input[name="marks"]:checked').id.replace("marks-", "");
  const interest = document.querySelector('input[name="interest"]:checked').id.replace("int-", "");
  const region = regionSelect.value;
  const state = stateSelect.value;
  const city = citySelect.value;

  // Convert marks to Firestore-compatible label
  let marksRange = "";
  switch (marks) {
    case "m1": marksRange = "below50"; break;
    case "m2": marksRange = "50-59"; break;
    case "m3": marksRange = "60-69"; break;
    case "m4": marksRange = "70-79"; break;
    case "m5": marksRange = "80-89"; break;
    case "m6": marksRange = "90+"; break;
  }

  // Build query dynamically
  let q = query(collection(db, "colleges"),
    where("marksRange", "==", marksRange),
    where("interest", "==", interest)
  );

  // Optional filters
  if (region !== "all") q = query(q, where("region", "==", region));
  if (state !== "all") q = query(q, where("state", "==", state));
  if (city !== "all") q = query(q, where("city", "==", city));

  // Fetch
  const snapshot = await getDocs(q);

  // Display
  const collegeList = document.createElement("div");
  collegeList.classList.add("card");
  collegeList.innerHTML = `<h2>Matching Colleges</h2>`;

  if (snapshot.empty) {
    collegeList.innerHTML += `<p class="small">No colleges found for selected filters.</p>`;
  } else {
    snapshot.forEach(doc => {
      const c = doc.data();
      collegeList.innerHTML += `
        <div class="college-item" style="margin-top:10px; padding:8px; background:rgba(255,255,255,0.05); border-radius:8px;">
          <strong>${c.name}</strong><br>
          <span class="small">${c.city}, ${c.state} (${c.region})</span><br>
          <span class="small">${c.description}</span>
        </div>`;
    });
  }

  // Replace existing results
  const old = document.querySelector(".card.dynamic");
  if (old) old.remove();
  collegeList.classList.add("dynamic");
  resultsDiv.appendChild(collegeList);
}

// Update whenever any input changes
[...marksRadios, ...interestRadios].forEach(r => r.addEventListener("change", fetchColleges));
[regionSelect, stateSelect, citySelect].forEach(sel => sel.addEventListener("change", fetchColleges));

// Initial load
fetchColleges();

export { app, db };
