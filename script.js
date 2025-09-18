// Fields for live preview
const fields = ["name", "email", "phone", "linkedin", "github", "about", "education", "skills", "projects", "experience"];

fields.forEach(field => {
  document.getElementById(field).addEventListener("input", (e) => {
    const value = e.target.value || getDefault(field);

    // Update only active template
    const activeTemplate = document.querySelector(".resume-preview.active");
    if (!activeTemplate) return;
    const previewEl = activeTemplate.querySelector(".preview-" + field);

    if (!previewEl) return;
    if (field === "linkedin" || field === "github") {
      previewEl.innerHTML = `<a href="${value}" target="_blank">${value}</a>`;
    } else {
      previewEl.textContent = value;
    }
  });
});

// Default placeholder values
function getDefault(field) {
  const defaults = {
    name: "Your Name",
    email: "you@example.com",
    phone: "+91 12345 67890",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
    about: "A short summary about yourself will appear here...",
    education: "Education details will appear here...",
    skills: "Skills will appear here...",
    projects: "Projects will appear here...",
    experience: "Work experience will appear here..."
  };
  return defaults[field];
}

// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Template Switcher
const templateSelect = document.getElementById("template-select");
templateSelect.addEventListener("change", () => {
  const selected = templateSelect.value;
  document.querySelectorAll(".resume-preview").forEach(tpl => {
    if (tpl.dataset.template === selected) {
      tpl.style.display = "block";
      tpl.classList.add("active");
    } else {
      tpl.style.display = "none";
      tpl.classList.remove("active");
    }
  });
});

// PDF Export
document.getElementById("download-btn").addEventListener("click", () => {
  import("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js")
    .then(() => {
      const activeTemplate = document.querySelector(".resume-preview.active");
      const opt = {
        margin: 0.5,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      };
      html2pdf().from(activeTemplate).set(opt).save();
    });
});
