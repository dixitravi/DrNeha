let currentData = null;let currentData = data;
  document.getElementById("siteTitleInput").value = data.site.title;
  document.getElementById("colorInput").value = data.site.primaryColor;
  document.getElementById("heroHeadingInput").value = data.hero.heading;
}

async function save() {
  currentData.site.title = document.getElementById("siteTitleInput").value;
  currentData.site.primaryColor = document.getElementById("colorInput").value;
  currentData.hero.heading = document.getElementById("heroHeadingInput").value;

  await fetch("/api/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentData)
  });

  alert("Content updated successfully ✅");
}

function fillForm(data) {
