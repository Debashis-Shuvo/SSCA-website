// landing-popup.js
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("popup-overlay");
  const closeBtn = document.querySelector(".close-btn");
  const goBtn    = document.getElementById("go-btn");

  // If this page doesn't have these elements, do nothing
  if (!overlay || !closeBtn) return;

  // Show popup after 1s
  setTimeout(() => overlay.classList.add("active"), 1000);

  // Close popup
  closeBtn.addEventListener("click", () => overlay.classList.remove("active"));

  // Optional redirect (only if the button exists on that page)
  if (goBtn) {
    goBtn.addEventListener("click", () => {
      window.location.href = "upcoming.html";
    });
  }
});
