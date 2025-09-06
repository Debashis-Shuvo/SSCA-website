// interac-modal.js

/** ====== CONFIG — replace with your details ====== **/
const DONATION_EMAIL = "donate@yourdomain.ca";
const DONATION_NAME = "Durga Puja 2025 Committee";
const DEFAULT_MSG = "Registration/Donation for Durga Puja 2025";
/** =============================================== **/

function showToast(text) {
    const t = document.getElementById("etf-toast");
    if (!t) return;
    t.textContent = text;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("etf-donate-btn");
    const modal = document.getElementById("etf-modal");
    if (!trigger || !modal) return;

    const closeBtn = modal.querySelector(".etf-close");
    const emailEl = document.getElementById("etf-email");
    const copyBtn = document.getElementById("etf-copy");
    const sendBtn = document.getElementById("etf-send");
    const banks = document.getElementById("etf-banks");

    // Fill the recipient email
    emailEl.textContent = DONATION_EMAIL;

    const openModal = () => { modal.classList.add("active"); modal.setAttribute("aria-hidden", "false"); };
    const closeModal = () => { modal.classList.remove("active"); modal.setAttribute("aria-hidden", "true"); };

    // Open from "Donate Here"
    trigger.addEventListener("click", (e) => { e.preventDefault(); openModal(); });

    // Close handlers
    closeBtn?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

    // Copy recipient email
    copyBtn?.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(DONATION_EMAIL); showToast("Recipient email copied"); }
        catch { showToast("Copy failed — long-press to copy"); }
    });

    // Send e-Transfer button
    sendBtn?.addEventListener("click", async () => {
        // On mobile, show a share sheet so users can switch to their banking app with details handy.
        const text = `Donation for Durga Puja\nRecipient: ${DONATION_EMAIL}\nMessage: ${DEFAULT_MSG}`;
        try {
            if (navigator.share) { await navigator.share({ title: "Send e-Transfer", text }); }
        } catch { /* user cancelled share */ }

        // Reveal online banking options as a fallback
        banks?.classList.remove("hidden");
        banks?.scrollIntoView({ behavior: "smooth", block: "center" });
        showToast("Choose your bank to continue");
    });
});
