// script.js

// document.addEventListener("DOMContentLoaded", () => {
//   const marksRadios = document.querySelectorAll('input[name="marks"]');
//   const interestRadios = document.querySelectorAll('input[name="interest"]');
//   const marksPanels = document.querySelectorAll(".marks-panels .panel");
//   const interestPanels = document.querySelectorAll(".interest-panels .panel");

//   function updatePanels() {
//     // Find selected marks
//     const selectedMarks = document.querySelector('input[name="marks"]:checked');
//     // Find selected interest
//     const selectedInterest = document.querySelector('input[name="interest"]:checked');

//     // Hide all panels
//     marksPanels.forEach(p => p.style.display = "none");
//     interestPanels.forEach(p => p.style.display = "none");

//     // Show the selected marks panel
//     if (selectedMarks) {
//       const marksClass = selectedMarks.id.replace("marks-", "");
//       const marksPanel = document.querySelector(`.marks-panels .${marksClass}`);
//       if (marksPanel) marksPanel.style.display = "block";
//     }

//     // Show the selected interest panel
//     if (selectedInterest) {
//       const interestClass = selectedInterest.id.replace("int-", "");
//       const interestPanel = document.querySelector(`.interest-panels .${interestClass}`);
//       if (interestPanel) interestPanel.style.display = "block";
//     }
//   }

//   // Attach listeners
//   marksRadios.forEach(r => r.addEventListener("change", updatePanels));
//   interestRadios.forEach(r => r.addEventListener("change", updatePanels));

//   // Initial load
//   updatePanels();
// });
document.addEventListener("DOMContentLoaded", () => {
  const marksRadios = document.querySelectorAll('input[name="marks"]');
  const interestRadios = document.querySelectorAll('input[name="interest"]');
  const regionSelect = document.getElementById("region");
  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");

  const marksPanels = document.querySelectorAll(".marks-panels .panel");
  const interestPanels = document.querySelectorAll(".interest-panels .panel");

  // Example data mapping
  const locationData = {
    north: {
      Delhi: ["New Delhi", "Noida", "Gurgaon"],
      Punjab: ["Amritsar", "Ludhiana", "Chandigarh"]
    },
    south: {
      Karnataka: ["Bangalore", "Mysore"],
      TamilNadu: ["Chennai", "Coimbatore"]
    },
    east: {
      WestBengal: ["Kolkata", "Durgapur"],
      Odisha: ["Bhubaneswar", "Cuttack"]
    },
    west: {
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Gujarat: ["Ahmedabad", "Surat"]
    },
    central: {
      MadhyaPradesh: ["Bhopal", "Indore", "Gwalior"],
      Chhattisgarh: ["Raipur", "Bilaspur"]
    }
  };

  function populateStates(region) {
    stateSelect.innerHTML = '<option value="all">Select State</option>';
    citySelect.innerHTML = '<option value="all">Select City</option>';
    citySelect.disabled = true;

    if (region !== "all") {
      const states = Object.keys(locationData[region]);
      states.forEach(state => {
        const opt = document.createElement("option");
        opt.value = state;
        opt.textContent = state;
        stateSelect.appendChild(opt);
      });
      stateSelect.disabled = false;
    } else {
      stateSelect.disabled = true;
      citySelect.disabled = true;
    }
  }

  function populateCities(region, state) {
    citySelect.innerHTML = '<option value="all">Select City</option>';
    if (region !== "all" && state !== "all") {
      const cities = locationData[region][state];
      cities.forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
      citySelect.disabled = false;
    } else {
      citySelect.disabled = true;
    }
  }

  function updatePanels() {
    const selectedMarks = document.querySelector('input[name="marks"]:checked');
    const selectedInterest = document.querySelector('input[name="interest"]:checked');
    const region = regionSelect.value;
    const state = stateSelect.value;
    const city = citySelect.value;

    // Hide all
    marksPanels.forEach(p => p.style.display = "none");
    interestPanels.forEach(p => p.style.display = "none");

    if (selectedMarks) {
      const marksClass = selectedMarks.id.replace("marks-", "");
      const marksPanel = document.querySelector(`.marks-panels .${marksClass}`);
      if (marksPanel) marksPanel.style.display = "block";
    }

    if (selectedInterest) {
      const interestClass = selectedInterest.id.replace("int-", "");
      const interestPanel = document.querySelector(`.interest-panels .${interestClass}`);
      if (interestPanel) {
        interestPanel.style.display = "block";

        // Dynamic text update
        let locationText = "";
        if (region !== "all") locationText += region + " region";
        if (state !== "all") locationText += `, ${state}`;
        if (city !== "all") locationText += `, ${city}`;

        if (locationText) {
          interestPanel.querySelector("p").innerText =
            `Example colleges in ${locationText}. (branch dependent)`;
        }
      }
    }
  }

  // Listeners
  marksRadios.forEach(r => r.addEventListener("change", updatePanels));
  interestRadios.forEach(r => r.addEventListener("change", updatePanels));
  regionSelect.addEventListener("change", () => {
    populateStates(regionSelect.value);
    updatePanels();
  });
  stateSelect.addEventListener("change", () => {
    populateCities(regionSelect.value, stateSelect.value);
    updatePanels();
  });
  citySelect.addEventListener("change", updatePanels);

  updatePanels();
});

