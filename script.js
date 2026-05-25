document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const deityCards = document.querySelectorAll(".deity-card");
  const searchForm = document.querySelector(".search-panel");
  const searchInput = document.querySelector("#archive-query");

  timelineItems.forEach((item) => {
    const button = item.querySelector(".timeline-toggle");

    button.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");

      timelineItems.forEach((entry) => {
        entry.classList.remove("is-open");
      });

      if (!wasOpen) {
        item.classList.add("is-open");
      }
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((entry) => {
        entry.classList.remove("is-active");
      });
      button.classList.add("is-active");

      deityCards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.era !== filter;
      });
    });
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();
    const cards = [...deityCards];
    const match = cards.find((card) => card.textContent.toLowerCase().includes(query));

    if (!query || !match) {
      document.querySelector("#deities").scrollIntoView({ behavior: "smooth" });
      return;
    }

    filterButtons.forEach((entry) => {
      entry.classList.toggle("is-active", entry.dataset.filter === "all");
    });

    deityCards.forEach((card) => {
      card.hidden = false;
    });

    match.scrollIntoView({ behavior: "smooth", block: "center" });
    match.animate(
      [
        { boxShadow: "rgb(113, 113, 122) 0 0 0 2px" },
        { boxShadow: "transparent 0 0 0 2px" }
      ],
      { duration: 1200, easing: "ease-out" }
    );
  });
});
