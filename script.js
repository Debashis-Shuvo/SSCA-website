/** ====== CONFIG — replace with your details ====== **/
const DONATION_EMAIL = "donate@yourdomain.ca";
const DONATION_NAME = "Durga Puja 2025 Committee";
const DEFAULT_MSG = "Registration/Donation for Durga Puja 2025";
/** =============================================== **/

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    initLandingPopup();   // safely no-ops on pages without that popup
    initInteracModal();   // runs on upcoming.html
});

/** -------- Old popup (from other page) -------- */
function initLandingPopup() {
    const overlay = document.getElementById("popup-overlay");
    const closeBtn = document.querySelector(".close-btn");
    const goBtn = document.getElementById("go-btn");

    // If this page doesn't have these elements, do nothing
    if (!overlay || !closeBtn || !goBtn) return;

    // Show popup after 1s
    setTimeout(() => {
        overlay.classList.add("active");
    }, 1000);

    // Close popup
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("active");
    });

    // Redirect to upcoming.html
    goBtn.addEventListener("click", () => {
        window.location.href = "upcoming.html";
    });
}

/** -------- Interac e-Transfer modal -------- */
function showToast(text) {
    const t = document.getElementById("etf-toast");
    if (!t) return;
    t.textContent = text;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
}

function initInteracModal() {
    const trigger = document.getElementById("etf-donate-btn");
    const modal = document.getElementById("etf-modal");
    if (!trigger || !modal) return; // safety

    const closeBtn = modal.querySelector(".etf-close");
    const emailEl = document.getElementById("etf-email");
    const msgEl = document.getElementById("etf-message");
    const copyBtn = document.getElementById("etf-copy");
    const openEmail = document.getElementById("etf-open-email");
    const shareBtn = document.getElementById("etf-share");

    if (emailEl) emailEl.textContent = DONATION_EMAIL;
    if (msgEl) msgEl.textContent = DEFAULT_MSG;

    const openModal = () => { modal.classList.add("active"); modal.setAttribute("aria-hidden", "false"); };
    const closeModal = () => { modal.classList.remove("active"); modal.setAttribute("aria-hidden", "true"); };

    trigger.addEventListener("click", (e) => { e.preventDefault(); openModal(); });
    closeBtn?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

    copyBtn?.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(DONATION_EMAIL); showToast("Recipient email copied"); }
        catch { showToast("Copy failed — long-press to copy"); }
    });

    openEmail?.addEventListener("click", () => {
        const subject = encodeURIComponent(`Interac e-Transfer — ${DONATION_NAME}`);
        const body = encodeURIComponent(
            `Hi,

I am sending an Interac e-Transfer to ${DONATION_NAME}.
Message: ${DEFAULT_MSG}

Thanks!`
        );
        window.open(`mailto:${DONATION_EMAIL}?subject=${subject}&body=${body}`, "_blank");
    });

    shareBtn?.addEventListener("click", async () => {
        const text = `Interac e-Transfer details:\nRecipient: ${DONATION_EMAIL}\nMessage: ${DEFAULT_MSG}`;
        try {
            if (navigator.share) { await navigator.share({ title: "Donation details", text }); }
            else { await navigator.clipboard.writeText(text); showToast("Details copied"); }
        } catch { }
    });
}
