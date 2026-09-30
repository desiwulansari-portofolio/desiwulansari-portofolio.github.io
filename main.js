// Main App Interactions
document.addEventListener("DOMContentLoaded", () => {
    // Loading Screen Simulation
    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");
    const loadingScreen = document.getElementById("loading-screen");

    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressText.innerText = progress + "%";
        progressBar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = "0";
                setTimeout(() => loadingScreen.style.display = "none", 500);
            }, 300);
        }
    }, 40);

    // Tab Switching
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        });
    });

    // Modal Interaction
    const modal = document.getElementById("detail-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalSub = document.getElementById("modal-subtitle");
    const modalDesc = document.getElementById("modal-desc");

    document.querySelectorAll(".modal-trigger").forEach(item => {
        item.addEventListener("click", () => {
            modalTitle.innerText = item.dataset.title || "Detail";
            modalSub.innerText = item.dataset.sub || "";
            modalDesc.innerText = item.dataset.desc || "";
            modal.style.display = "flex";
        });
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});
