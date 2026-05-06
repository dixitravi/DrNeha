async function loadContent(isAdmin = false) {
  try {
    
	const res = await fetch("/content.json");
	const data = await res.json();


    /* Theme */
    if (data.site?.primaryColor) {
      document.documentElement.style.setProperty(
        "--primary-color",
        data.site.primaryColor
      );
    }
    if (data.site?.fontFamily) {
      document.body.style.fontFamily = data.site.fontFamily;
    }

    /* Header */
    const siteTitle = document.getElementById("siteTitle");
    const siteTagline = document.getElementById("siteTagline");

    if (siteTitle) siteTitle.textContent = data.site?.title || "";
    if (siteTagline) siteTagline.textContent = data.site?.tagline || "";

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
    const hero = document.getElementById("hero");
    if (data.images?.hero?.enabled && hero) {
      hero.style.backgroundImage =
        `linear-gradient(
          rgba(0,0,0,${data.images.hero.opacity}),
          rgba(0,0,0,${data.images.hero.opacity})
        ), url(${data.images.hero.src})`;
      hero.style.height = data.images.hero.height;
    }

    document.getElementById("heroHeading").textContent = data.hero?.heading || "";
    document.getElementById("heroSubtext").textContent = data.hero?.subtext || "";

    /* About */
    const img = document.getElementById("aboutImg");
    if (data.images?.profile?.enabled && img) {
      img.src = data.images.profile.src;
      img.style.width = data.images.profile.size + "px";
      img.style.borderRadius =
        data.images.profile.shape === "round" ? "50%" : "12px";
    }

    document.getElementById("aboutText").textContent =
      data.about?.content || "";

    /* Experience */
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

  } catch (e) {
    console.error("Content load failed:", e);
  }
}

/* Reveal Admin link */
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search.includes("admin=true")) {
    const admin = document.getElementById("adminLink");
    if (admin) admin.style.display = "inline-block";
  }
});

