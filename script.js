const calorieForm = document.querySelector("#calorie-form");
const results = document.querySelector("#results");
const muscleSelect = document.querySelector("#muscle-select");
const exerciseList = document.querySelector("#exercise-list");
const menuToggle = document.querySelector("#menu-toggle");
const menuOverlay = document.querySelector("#menu-overlay");
const mobileMenu = document.querySelector("#mobile-menu");
const menuClose = document.querySelector("#menu-close");

const exerciseLibrary = {
  Chest: [
    "Push-ups",
    "Bench press",
    "Incline dumbbell press",
    "Cable flyes",
  ],
  Back: [
    "Pull-ups",
    "Bent-over rows",
    "Lat pulldowns",
    "Single-arm dumbbell rows",
  ],
  Legs: [
    "Squats",
    "Romanian deadlifts",
    "Lunges",
    "Leg press",
  ],
  Shoulders: [
    "Overhead press",
    "Lateral raises",
    "Face pulls",
    "Arnold press",
  ],
  Arms: [
    "Bicep curls",
    "Tricep dips",
    "Hammer curls",
    "Tricep rope pushdowns",
  ],
  Core: ["Planks", "Dead bugs", "Russian twists", "Hanging leg raises"],
  Glutes: [
    "Hip thrusts",
    "Glute bridges",
    "Cable kickbacks",
    "Step-ups",
  ],
};

const activityDescriptions = {
  1.2: "Sedentary",
  1.375: "Lightly active",
  1.55: "Moderately active",
  1.725: "Very active",
  1.9: "Athlete",
};

let previousBodyOverflow = "";

const setMenuState = (isOpen) => {
  if (!menuToggle || !menuOverlay || !mobileMenu) {
    return;
  }

  menuOverlay.classList.toggle("hidden", !isOpen);
  mobileMenu.classList.toggle("hidden", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = previousBodyOverflow;
  }
};

const buildExerciseOptions = () => {
  Object.keys(exerciseLibrary).forEach((muscle) => {
    const option = document.createElement("option");
    option.value = muscle;
    option.textContent = muscle;
    muscleSelect.append(option);
  });
};

const renderExercises = (muscle) => {
  if (!muscle || !exerciseLibrary[muscle]) {
    exerciseList.innerHTML = "<p>Select a muscle group to see exercises.</p>";
    return;
  }

  const exercises = exerciseLibrary[muscle]
    .map((exercise) => `<li>${exercise}</li>`)
    .join("");

  exerciseList.innerHTML = `
    <h3>${muscle} Exercises</h3>
    <ul>${exercises}</ul>
  `;
};

const calculateCalories = ({ age, sex, height, weight, activity }) => {
  const base = 10 * weight + 6.25 * height - 5 * age;
  const sexOffset = sex === "male" ? 5 : -161;
  const bmr = base + sexOffset;
  const tdee = bmr * activity;

  return { bmr, tdee };
};

const formatNumber = (value) => Math.round(value).toLocaleString();

const renderResults = ({ bmr, tdee, activity }) => {
  results.innerHTML = `
    <h3>Your Results</h3>
    <p><strong>Basal Metabolic Rate (BMR):</strong> ${formatNumber(
      bmr
    )} calories/day</p>
    <p><strong>Estimated maintenance calories:</strong> ${formatNumber(
      tdee
    )} calories/day (${activityDescriptions[activity]})</p>
    <p class="hint">
      Adjust your intake by ±250-500 calories to gain or lose weight
      responsibly.
    </p>
  `;
};

calorieForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const age = Number(document.querySelector("#age").value);
  const sex = document.querySelector("#sex").value;
  const height = Number(document.querySelector("#height").value);
  const weight = Number(document.querySelector("#weight").value);
  const activity = Number(document.querySelector("#activity").value);

  if (!age || !sex || !height || !weight || !activity) {
    results.textContent = "Please complete every field to see results.";
    return;
  }

  const calculation = calculateCalories({
    age,
    sex,
    height,
    weight,
    activity,
  });

  renderResults({ ...calculation, activity });
});

calorieForm.addEventListener("reset", () => {
  results.textContent = "";
});

muscleSelect.addEventListener("change", (event) => {
  renderExercises(event.target.value);
});

if (menuToggle && menuOverlay && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("hidden");
    setMenuState(isOpen);
  });

  menuOverlay.addEventListener("click", () => {
    setMenuState(false);
  });

  if (menuClose) {
    menuClose.addEventListener("click", () => {
      setMenuState(false);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      setMenuState(false);
    }
  });
}

buildExerciseOptions();
renderExercises("");
