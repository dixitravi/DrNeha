let currentData = null;

function fillForm(data) {
  siteTitleInput.value = data.site?.title || "";  currentData = data;
  siteTaglineInput.value = data.site?.tagline || "";
  heroHeadingInput.value = data.hero?.heading || "";
  heroSubtextInput.value = data.hero?.subtext || "";
  aboutContentInput.value = data.about?.content || "";

  heroImageSrc.value = data.images.hero.src;
  heroImageOpacity.value = data.images.hero.opacity;
  heroEnabled.checked = data.images.hero.enabled;

  profileSize.value = data.images.profile.size;
  profileEnabled.checked = data.images.profile.enabled;

  const editor = document.getElementById("experienceEditor");
  editor.innerHTML = "";

  data.experience.forEach((exp, i) => {
    const block = document.createElement("div");
    block.innerHTML = `
      <input data-i="${i}" data-k="role" value="${exp.role}" />
      <input data-i="${i}" data-k="org" value="${exp.org}" />
      <input data-i="${i}" data-k="duration" value="${exp.duration}" />
      <textarea data-i="${i}" data-k="desc">${exp.desc}</textarea>
      <hr />
    `;
    editor.appendChild(block);
  });
}

function addExperience() {
  currentData.experience.push({
    role: "", org: "", duration: "", desc: ""
  });
  fillForm(currentData);
}

async function saveContent() {
  document.querySelectorAll("[data-k]").forEach(el => {
    currentData.experience[el.dataset.i][el.dataset.k] = el.value;
  });

  currentData.site.title = siteTitleInput.value;
  currentData.site.tagline = siteTaglineInput.value;
  currentData.hero.heading = heroHeadingInput.value;
  currentData.hero.subtext = heroSubtextInput.value;
  currentData.about.content = aboutContentInput.value;

  currentData.images.hero.src = heroImageSrc.value;
  currentData.images.hero.opacity = parseFloat(heroImageOpacity.value);
  currentData.images.hero.enabled = heroEnabled.checked;
  currentData.images.profile.size = parseInt(profileSize.value, 10);
  currentData.images.profile.enabled = profileEnabled.checked;

  await fetch("/api/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(currentData)
  });

  alert("✅ Saved successfully");
}

