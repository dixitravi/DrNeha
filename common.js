async function loadContent(isAdmin = false) {
  const res = await fetch("/api/content");
  const data = await res.json();

  // Theme basics
  document.documentElement.style.setProperty("--primary-color", data.site.primaryColor);
  document.body.style.fontFamily = data.site.fontFamily;

  // Optional background pattern
  if (data.background?.pattern) {
    document.body.style.backgroundImage = `url(${data.background.pattern})`;
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundSize = "800px auto";
  }

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
  const heroSection = document.getElementById("hero");
  heroSection.style.backgroundImage = `linear-gradient(
      rgba(0,0,0,0.45),
      rgba(0,0,0,0.45)
    ), url(${data.hero.image})`;

  document.getElementById("heroHeading").innerText = data.hero.heading;
  document.getElementById("heroSubtext").innerText = data.hero.subtext;

  // About
  document.getElementById("aboutImg").src = data.about.image;
  document.getElementById("aboutText").innerText = data.about.content;

  if (isAdmin && window.fillForm) {
    fillForm(data);
  }
}
