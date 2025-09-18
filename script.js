// Fields for live preview
const fields = ["name", "email", "phone", "linkedin", "github", "about", "education", "skills", "projects", "experience"];

fields.forEach(field => {
  document.getElementById(field).addEventListener("input", (e) => {
    const value = e.target.value || getDefault(field);

    // Update only active template
    const activeTemplate = document.querySelector(".resume-preview.active");
    if (!activeTemplate) return;

    // ✅ Special case for contact fields
    if (["email", "phone", "linkedin", "github"].includes(field)) {
      const emailVal = document.getElementById("email").value || getDefault("email");
      const phoneVal = document.getElementById("phone").value || getDefault("phone");
      const linkedinVal = document.getElementById("linkedin").value || getDefault("linkedin");
      const githubVal = document.getElementById("github").value || getDefault("github");

      const contactEl = activeTemplate.querySelector(".preview-contact");
      if (contactEl) {
        contactEl.innerHTML = `
          ${emailVal} | ${phoneVal} | 
          <a href="${linkedinVal}" target="_blank">${linkedinVal}</a> | 
          <a href="${githubVal}" target="_blank">${githubVal}</a>
        `;
      }

      // For two-column template with individual spans
      const emailEl = activeTemplate.querySelector(".preview-email");
      const phoneEl = activeTemplate.querySelector(".preview-phone");
      const linkedinEl = activeTemplate.querySelector(".preview-linkedin a");
      const githubEl = activeTemplate.querySelector(".preview-github a");

      if (emailEl) emailEl.textContent = emailVal;
      if (phoneEl) phoneEl.textContent = phoneVal;
      if (linkedinEl) { linkedinEl.href = linkedinVal; linkedinEl.textContent = linkedinVal; }
      if (githubEl) { githubEl.href = githubVal; githubEl.textContent = githubVal; }

      return; // ✅ Skip rest since we already handled contact
    }

    // ✅ Default: update normal fields
    const previewEl = activeTemplate.querySelector(".preview-" + field);
    if (!previewEl) return;
    previewEl.textContent = value;
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
