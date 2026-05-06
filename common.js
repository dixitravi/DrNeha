async function loadContent(isAdmin = false) {
  const res = await fetch("/api/content");
  const data = await res.json();

  // Apply theme
  document.documentElement.style.setProperty("--primary-color", data.site.primaryColor);
  document.body.style.fontFamily = data.site.fontFamily;

  // Header
  document.getElementById("siteTitle").innerText = data.site.title;

  // Navigation
  const nav = document.getElementById("nav");
  nav.innerHTML = "";
  data.navigation.forEach(item => {
    const a = document.createElement("a");
    a.href = item.anchor;
    a.textContent = item.label;
    nav.appendChild(a);
  });

  // Hero
  document.getElementById("heroHeading").innerText = data.hero.heading;
  document.getElementById("heroSubtext").innerText = data.hero.subtext;

  // About
  document.getElementById("aboutImg").src = data.about.image;
  document.getElementById("aboutText").innerText = data.about.content;

  if (isAdmin && window.fillForm) {
    fillForm(data);
  }
}
