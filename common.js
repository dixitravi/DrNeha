async function loadContent(isAdmin = false) {
  try {
    const res = await fetch("/api/content");
    const data = await res.json();

    /* Theme */
    if (data.site && data.site.primaryColor) {
      document.documentElement.style.setProperty(
        "--primary-color",
        data.site.primaryColor
      );
    }
    if (data.site && data.site.fontFamily) {
      document.body.style.fontFamily = data.site.fontFamily;
    }

    /* Header */
    const siteTitleEl = document.getElementById("siteTitle");
    if (siteTitleEl && data.site) {
      siteTitleEl.textContent = data.site.title || "";
    }

    /* Navigation */
    const nav = document.getElementById("nav");
    if (nav && Array.isArray(data.navigation)) {
      nav.innerHTML = "";
      data.navigation.forEach(item => {
        const a = document.createElement("a");
        a.href = item.anchor;
        a.textContent = item.label;
        nav.appendChild(a);
      });
    }

    /* Hero */
    const heroSection = document.getElementById("hero");
    if (heroSection && data.hero && data.hero.image) {
      heroSection.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(" +
        data.hero.image +
        ")";
    }

    const heroHeadingEl = document.getElementById("heroHeading");
    if (heroHeadingEl && data.hero) {
      heroHeadingEl.textContent = data.hero.heading || "";
    }

    const heroSubtextEl = document.getElementById("heroSubtext");
    if (heroSubtextEl && data.hero) {
      heroSubtextEl.textContent = data.hero.subtext || "";
    }

    /* About */
    const aboutImg = document.getElementById("aboutImg");
    if (aboutImg && data.about && data.about.image) {
      aboutImg.src = data.about.image;
    }

    const aboutText = document.getElementById("aboutText");
    if (aboutText && data.about) {
      aboutText.textContent = data.about.content || "";
    }

    /* Professional Experience ✅ */
    const timeline = document.getElementById("experienceTimeline");
    if (timeline && Array.isArray(data.experience)) {
      timeline.innerHTML = "";
      data.experience.forEach(item => {
        const div = document.createElement("div");
        div.className = "timeline-item";
        div.innerHTML = `
          <h3>${item.role}</h3>
          <strong>${item.org}</strong>
          <div class="duration">${item.duration}</div>
          <p>${item.desc}</p>
        `;
        timeline.appendChild(div);
      });
    }

    /* Admin form */
    if (isAdmin && typeof window.fillForm === "function") {
      fillForm(data);
    }

  } catch (err) {
    console.error("Error loading site content:", err);
  }
}

/* Reveal Admin link ✅ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search.includes("admin=true")) {
    const adminLink = document.getElementById("adminLink");
    if (adminLink) {
      adminLink.style.display = "inline-block";
    }
  }
});
