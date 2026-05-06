const pass = prompt("Enter admin password");const pass = prompt("Enter admin !== "test@33") {
  alert("Access denied");
  document.body.innerHTML = "";
}




let currentData = null;let currentData = nulllineInput").value = data.site.tagline;
  document.getElementById("heroHeadingInput").value = data.hero.heading;
  document.getElementById("heroSubtextInput").value = data.hero.subtext;
  document.getElementById("aboutContentInput").value = data.about.content;
}

async function saveContent() {
  currentData.site.title = document.getElementById("siteTitleInput").value;
  currentData.site.tagline = document.getElementById("siteTaglineInput").value;
  currentData.hero.heading = document.getElementById("heroHeadingInput").value;
  currentData.hero.subtext = document.getElementById("heroSubtextInput").value;
  currentData.about.content = document.getElementById("aboutContentInput").value;

  await fetch("/api/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentData)
  });

  alert("✅ Website updated successfully");
}

function fillForm(data) {
  currentData = data;

  document.getElementById("siteTitleInput").value = data.site.title;
