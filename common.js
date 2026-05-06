async function loadContent(isAdmin = false) {
  try {
    const res = await fetch("/content.json");
    if (!res.ok) throw new Error("content.json not found");

    const data = await res.json();

    const siteTitle = document.getElementById("siteTitle");
    const siteTagline = document.getElementById("siteTagline");
    if (siteTitle) siteTitle.textContent = data.site?.title || "";
    if (siteTagline) siteTagline.textContent = data.site?.tagline || "";

    const heroHeading = document.getElementById("heroHeading");
    const heroSubtext = document.getElementById("heroSubtext");
    if (heroHeading) heroHeading.textContent = data.hero?.heading || "";
    if (heroSubtext) heroSubtext.textContent = data.hero?.subtext || "";

    const aboutText = document.getElementById("aboutText");
    if (aboutText) aboutText.textContent = data.about?.content || "";

    const timeline = document.getElementById("experienceTimeline");
    if (timeline && Array.isArray(data.experience)) {
      timeline.innerHTML = "";
      data.experience.forEach(item => {
        const div = document.createElement("div");
        div.className = "timeline-item";

div.innerHTML = `
  <h3>${item.role}</h3>
  <strong>${item.org}</strong>
  <div>${item.duration}</div>
  <p>${item.desc}</p>
`;

        timeline.appendChild(div);
      });
    }

  } catch (e) {
    console.error("Content load failed:", e);
  }
}

document.addEventListener("DOMContentLoaded", loadContent);
