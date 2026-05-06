let currentData = null;

/**
 * Called automatically by commonContent(true) is used * Called automatically by common.js
 */
function fillForm(data) {
  currentData = data;

  document.getElementById("siteTitleInput").value =
    data.site?.title || "";

  document.getElementById("siteTaglineInput").value =
    data.site?.tagline || "";

  document.getElementById("heroHeadingInput").value =
    data.hero?.heading || "";

  document.getElementById("heroSubtextInput").value =
    data.hero?.subtext || "";

  document.getElementById("aboutContentInput").value =
    data.about?.content || "";
}

/**
 * Save updated data back to KV
 */
async function saveContent() {
  if (!currentData) {
    alert("Data not loaded yet");
    return;
  }

  currentData.site.title =
    document.getElementById("siteTitleInput").value;

  currentData.site.tagline =
    document.getElementById("siteTaglineInput").value;

  currentData.hero.heading =
    document.getElementById("heroHeadingInput").value;

  currentData.hero.subtext =
    document.getElementById("heroSubtextInput").value;

  currentData.about.content =
    document.getElementById("aboutContentInput").value;

  await fetch("/api/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentData)
  });

  alert("✅ Website updated successfully");
}

const res = await fetch("/api/content", {...});

if (!res.ok) {
  const err = await res.text();
  alert("Save failed: " + err);
  return;
}
