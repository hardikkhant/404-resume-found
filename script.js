// ============================================
// RESUME BUILDER - COMPLETE APPLICATION
// ============================================

// Utility Functions
const UUID = () => "_" + Math.random().toString(36).substr(2, 9)

const debounce = (fn, ms) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), ms)
  }
}

// Resume Data Model
let resumeData = {
  personal: {
    fullName: "",
    jobTitle: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    photoDataURL: "",
  },
  summary: "",
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  hobbies: "",
}

let currentTemplate = localStorage.getItem("resume-template") || "modern"
const templates = ["modern", "classic", "creative", "minimal"]
const themes = ["light", "dark", "minimal"]
let currentTheme = localStorage.getItem("resume-theme") || "light"

function setTheme(theme) {
  document.body.className = `theme-${theme}`
  currentTheme = theme
  localStorage.setItem("resume-theme", theme)
}

function setTemplate(template) {
  currentTemplate = template
  localStorage.setItem("resume-template", template)
  renderPreview()
}

document.getElementById("themBtn").addEventListener("click", () => {
  const currentIndex = themes.indexOf(currentTheme)
  const nextTheme = themes[(currentIndex + 1) % themes.length]
  setTheme(nextTheme)
})

document.getElementById("templateSelector").addEventListener("change", (e) => {
  setTemplate(e.target.value)
})

setTheme(currentTheme)

// Local Storage Management
function saveResume() {
  localStorage.setItem("resume-data", JSON.stringify(resumeData))
}

function loadResume() {
  const saved = localStorage.getItem("resume-data")
  if (saved) {
    resumeData = JSON.parse(saved)
    renderForm()
    renderPreview()
  } else {
    loadSampleData()
  }
}

function loadSampleData() {
  resumeData = {
    personal: {
      fullName: "Sarah Anderson",
      jobTitle: "Senior Product Designer",
      location: "San Francisco, CA",
      email: "sarah@example.com",
      phone: "+1 (555) 123-4567",
      website: "https://sarahdesigns.com",
      linkedin: "https://linkedin.com/in/sarahdesigns",
      github: "https://github.com/sarah",
      photoDataURL: "",
    },
    summary:
      "Experienced product designer with 6+ years creating intuitive user experiences. Passionate about solving complex problems through thoughtful design and data-driven decisions.",
    experiences: [
      {
        id: UUID(),
        company: "Tech Corp",
        role: "Senior Product Designer",
        startDate: "2022-01",
        endDate: "",
        location: "San Francisco, CA",
        bullets:
          "Led design system initiative improving consistency across 5 products\nConducted 20+ user research sessions leading to 40% increase in engagement\nMentored 2 junior designers and established design best practices",
      },
      {
        id: UUID(),
        company: "Design Studio",
        role: "UX/UI Designer",
        startDate: "2019-06",
        endDate: "2021-12",
        location: "Los Angeles, CA",
        bullets:
          "Designed 15+ client projects from concept to launch\nIncreased client project profitability by 30% through efficient workflows\nPresented designs to stakeholders and incorporated feedback iteratively",
      },
    ],
    education: [
      {
        id: UUID(),
        school: "State University",
        degree: "Bachelor of Fine Arts",
        field: "Graphic Design",
        year: 2019,
        details: "GPA: 3.8/4.0 • President of Design Club",
      },
    ],
    skills: [
      "UI Design",
      "UX Research",
      "Figma",
      "Prototyping",
      "Design Systems",
      "User Testing",
      "Interaction Design",
      "Adobe XD",
    ],
    projects: [
      {
        id: UUID(),
        title: "Portfolio Website",
        description: "Designed and developed a responsive portfolio showcasing design projects and case studies",
        link: "https://sarahdesigns.com",
      },
      {
        id: UUID(),
        title: "Mobile App UI",
        description: "Complete UI design for a fitness tracking mobile application with onboarding flow",
        link: "https://github.com/sarah/fitness-app",
      },
    ],
    certifications: [
      {
        id: UUID(),
        title: "Google UX Design Certificate",
        issuer: "Google",
        issueDate: "2021-06",
      },
      {
        id: UUID(),
        title: "Figma Advanced Course",
        issuer: "Interaction Design Foundation",
        issueDate: "2022-03",
      },
    ],
    hobbies: "Photography, Painting, Traveling, Open Source Design Contributions",
  }
  saveResume()
  renderForm()
  renderPreview()
}

// Form Rendering
function renderForm() {
  document.getElementById("fullName").value = resumeData.personal.fullName
  document.getElementById("jobTitle").value = resumeData.personal.jobTitle
  document.getElementById("location").value = resumeData.personal.location
  document.getElementById("email").value = resumeData.personal.email
  document.getElementById("phone").value = resumeData.personal.phone
  document.getElementById("website").value = resumeData.personal.website
  document.getElementById("linkedin").value = resumeData.personal.linkedin
  document.getElementById("github").value = resumeData.personal.github
  document.getElementById("summary").value = resumeData.summary
  document.getElementById("hobbies").value = resumeData.hobbies

  if (resumeData.personal.photoDataURL) {
    const preview = document.getElementById("photoPreview")
    preview.innerHTML = `<img src="${resumeData.personal.photoDataURL}" alt="Profile">`
  }

  renderExperienceBlocks()
  renderEducationBlocks()
  renderSkillsChips()
  renderProjectBlocks()
  renderCertificationBlocks()
}

function renderExperienceBlocks() {
  const container = document.getElementById("experiencesContainer")
  container.innerHTML = ""
  resumeData.experiences.forEach((exp) => {
    const block = document.getElementById("experienceTemplate").content.cloneNode(true)
    const formBlock = block.querySelector(".repeating-block")
    formBlock.dataset.id = exp.id

    block.querySelector(".experience-company").value = exp.company
    block.querySelector(".experience-role").value = exp.role
    block.querySelector(".experience-start").value = exp.startDate
    block.querySelector(".experience-end").value = exp.endDate
    block.querySelector(".experience-location").value = exp.location
    block.querySelector(".experience-bullets").value = exp.bullets

    block.querySelector(".btn-delete").addEventListener("click", (e) => {
      e.preventDefault()
      resumeData.experiences = resumeData.experiences.filter((x) => x.id !== exp.id)
      saveResume()
      renderForm()
      renderPreview()
    })

    container.appendChild(block)
  })
}

function renderEducationBlocks() {
  const container = document.getElementById("educationContainer")
  container.innerHTML = ""
  resumeData.education.forEach((edu) => {
    const block = document.getElementById("educationTemplate").content.cloneNode(true)
    const formBlock = block.querySelector(".repeating-block")
    formBlock.dataset.id = edu.id

    block.querySelector(".education-school").value = edu.school
    block.querySelector(".education-degree").value = edu.degree
    block.querySelector(".education-field").value = edu.field
    block.querySelector(".education-year").value = edu.year
    block.querySelector(".education-details").value = edu.details

    block.querySelector(".btn-delete").addEventListener("click", (e) => {
      e.preventDefault()
      resumeData.education = resumeData.education.filter((x) => x.id !== edu.id)
      saveResume()
      renderForm()
      renderPreview()
    })

    container.appendChild(block)
  })
}

function renderSkillsChips() {
  const container = document.getElementById("skillsContainer")
  container.innerHTML = ""
  resumeData.skills.forEach((skill, index) => {
    const chip = document.createElement("div")
    chip.className = "skill-chip"
    chip.innerHTML = `
      ${skill}
      <button type="button" aria-label="Remove skill">&times;</button>
    `
    chip.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault()
      resumeData.skills.splice(index, 1)
      saveResume()
      renderSkillsChips()
      renderPreview()
    })
    container.appendChild(chip)
  })
}

function renderProjectBlocks() {
  const container = document.getElementById("projectsContainer")
  container.innerHTML = ""
  resumeData.projects.forEach((proj) => {
    const block = document.getElementById("projectTemplate").content.cloneNode(true)
    const formBlock = block.querySelector(".repeating-block")
    formBlock.dataset.id = proj.id

    block.querySelector(".project-title").value = proj.title
    block.querySelector(".project-description").value = proj.description
    block.querySelector(".project-link").value = proj.link

    block.querySelector(".btn-delete").addEventListener("click", (e) => {
      e.preventDefault()
      resumeData.projects = resumeData.projects.filter((x) => x.id !== proj.id)
      saveResume()
      renderForm()
      renderPreview()
    })

    container.appendChild(block)
  })
}

function renderCertificationBlocks() {
  const container = document.getElementById("certificationsContainer")
  container.innerHTML = ""
  resumeData.certifications.forEach((cert) => {
    const block = document.getElementById("certificationTemplate").content.cloneNode(true)
    const formBlock = block.querySelector(".repeating-block")
    formBlock.dataset.id = cert.id

    block.querySelector(".cert-title").value = cert.title
    block.querySelector(".cert-issuer").value = cert.issuer
    block.querySelector(".cert-year").value = cert.issueDate

    block.querySelector(".btn-delete").addEventListener("click", (e) => {
      e.preventDefault()
      resumeData.certifications = resumeData.certifications.filter((x) => x.id !== cert.id)
      saveResume()
      renderForm()
      renderPreview()
    })

    container.appendChild(block)
  })
}



// Preview Rendering with Template Support
function renderPreview() {
  const preview = document.getElementById("resumePreview")
  preview.className = `resume-preview ${currentTemplate}`

  let html = '<div class="resume-header">'

  if (resumeData.personal.photoDataURL) {
    html += `<img src="${resumeData.personal.photoDataURL}" alt="Profile" class="resume-photo">`
  }

  html += `
    <div class="resume-name">${resumeData.personal.fullName || "Your Name"}</div>
    ${resumeData.personal.jobTitle ? `<div class="resume-title">${resumeData.personal.jobTitle}</div>` : ""}
  `

  const contacts = []
  if (resumeData.personal.email) contacts.push(resumeData.personal.email)
  if (resumeData.personal.phone) contacts.push(resumeData.personal.phone)
  if (resumeData.personal.location) contacts.push(resumeData.personal.location)

  if (contacts.length > 0) {
    html += `<div class="resume-contact">${contacts.join(" • ")}</div>`
  }

  if (resumeData.personal.website || resumeData.personal.linkedin || resumeData.personal.github) {
    html += '<div class="resume-contact">'
    if (resumeData.personal.website) {
      html += `<a href="${resumeData.personal.website}" target="_blank">Portfolio</a>`
    }
    if (resumeData.personal.linkedin) {
      html += `<a href="${resumeData.personal.linkedin}" target="_blank">LinkedIn</a>`
    }
    if (resumeData.personal.github) {
      html += `<a href="${resumeData.personal.github}" target="_blank">GitHub</a>`
    }
    html += "</div>"
  }

  html += "</div>"

  // Summary
  if (resumeData.summary) {
    html += `
      <section class="resume-section">
        <h2 class="resume-section-title">Professional Summary</h2>
        <p>${resumeData.summary}</p>
      </section>
    `
  }

  // Experience
  if (resumeData.experiences.length > 0) {
    html += '<section class="resume-section"><h2 class="resume-section-title">Work Experience</h2>'
    resumeData.experiences.forEach((exp) => {
      html += `
        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <div class="resume-item-title">${exp.role}</div>
              <div class="resume-item-subtitle">${exp.company}</div>
            </div>
            ${exp.startDate || exp.endDate ? `<div class="resume-item-date">${formatDate(exp.startDate)} ${exp.endDate ? "– " + formatDate(exp.endDate) : "– Present"}</div>` : ""}
          </div>
          ${exp.location ? `<div class="resume-item-location">${exp.location}</div>` : ""}
          ${
            exp.bullets
              ? `<ul class="resume-bullets">${exp.bullets
                  .split("\n")
                  .filter((b) => b.trim())
                  .map((b) => `<li>${b.replace(/^•\s*/, "").trim()}</li>`)
                  .join("")}</ul>`
              : ""
          }
        </div>
      `
    })
    html += "</section>"
  }

  // Education
  if (resumeData.education.length > 0) {
    html += '<section class="resume-section"><h2 class="resume-section-title">Education</h2>'
    resumeData.education.forEach((edu) => {
      html += `
        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <div class="resume-item-title">${edu.degree}${edu.field ? " in " + edu.field : ""}</div>
              <div class="resume-item-subtitle">${edu.school}</div>
            </div>
            ${edu.year ? `<div class="resume-item-date">${edu.year}</div>` : ""}
          </div>
          ${edu.details ? `<p style="font-size: 14px; color: var(--text-secondary);">${edu.details}</p>` : ""}
        </div>
      `
    })
    html += "</section>"
  }

  // Skills
  if (resumeData.skills.length > 0) {
    html += '<section class="resume-section"><h2 class="resume-section-title">Skills</h2>'
    html += '<div class="resume-skills">'
    resumeData.skills.forEach((skill) => {
      html += `<span class="resume-skill-tag">${skill}</span>`
    })
    html += "</div></section>"
  }

  // Projects
  if (resumeData.projects.length > 0) {
    html += '<section class="resume-section"><h2 class="resume-section-title">Projects</h2>'
    resumeData.projects.forEach((proj) => {
      html += `
        <div class="resume-item">
          <div class="resume-item-title">${proj.title}</div>
          ${proj.description ? `<p>${proj.description}</p>` : ""}
          ${proj.link ? `<p><a href="${proj.link}" target="_blank" style="color: var(--accent-primary); text-decoration: none;">${proj.link}</a></p>` : ""}
        </div>
      `
    })
    html += "</section>"
  }

  // Certifications
  if (resumeData.certifications.length > 0) {
    html += '<section class="resume-section"><h2 class="resume-section-title">Certifications & Awards</h2>'
    resumeData.certifications.forEach((cert) => {
      html += `
        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <div class="resume-item-title">${cert.title}</div>
              <div class="resume-item-subtitle">${cert.issuer}</div>
            </div>
            ${cert.issueDate ? `<div class="resume-item-date">${cert.issueDate}</div>` : ""}
          </div>
        </div>
      `
    })
    html += "</section>"
  }

  // Hobbies
  if (resumeData.hobbies) {
    html += `
      <section class="resume-section">
        <h2 class="resume-section-title">Interests</h2>
        <p>${resumeData.hobbies}</p>
      </section>
    `
  }

  preview.innerHTML = html
}

function formatDate(dateStr) {
  if (!dateStr) return ""
  const [year, month] = dateStr.split("-")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[Number.parseInt(month) - 1]} ${year}`
}

// Form Event Listeners
const form = document.getElementById("resumeForm")

form.querySelectorAll("input[id], textarea[id]").forEach((input) => {
  input.addEventListener(
    "input",
    debounce(() => {
      const id = input.id
      if (id === "fullName") resumeData.personal.fullName = input.value
      else if (id === "jobTitle") resumeData.personal.jobTitle = input.value
      else if (id === "location") resumeData.personal.location = input.value
      else if (id === "email") resumeData.personal.email = input.value
      else if (id === "phone") resumeData.personal.phone = input.value
      else if (id === "website") resumeData.personal.website = input.value
      else if (id === "linkedin") resumeData.personal.linkedin = input.value
      else if (id === "github") resumeData.personal.github = input.value
      else if (id === "summary") resumeData.summary = input.value
      else if (id === "hobbies") resumeData.hobbies = input.value
      saveResume()
      renderPreview()
    }, 200),
  )
})

document.getElementById("charCount").textContent = `${resumeData.summary.length}/300`
document.getElementById("summary").addEventListener("input", () => {
  document.getElementById("charCount").textContent = `${document.getElementById("summary").value.length}/300`
})

// Photo Upload
document.getElementById("photoUpload").addEventListener("change", (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      resumeData.personal.photoDataURL = event.target.result
      saveResume()
      renderPreview()
      const preview = document.getElementById("photoPreview")
      preview.innerHTML = `<img src="${event.target.result}" alt="Profile">`
    }
    reader.readAsDataURL(file)
  }
})

// Skills Input
document.getElementById("skillInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault()
    const skill = e.target.value.trim()
    if (skill && !resumeData.skills.includes(skill)) {
      resumeData.skills.push(skill)
      e.target.value = ""
      saveResume()
      renderSkillsChips()
      renderPreview()
    }
  }
})

document.getElementById("addExperienceBtn").addEventListener("click", (e) => {
  e.preventDefault()
  resumeData.experiences.push({
    id: UUID(),
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    location: "",
    bullets: "",
  })
  saveResume()
  renderExperienceBlocks()
  attachExperienceListeners()
})

document.getElementById("addEducationBtn").addEventListener("click", (e) => {
  e.preventDefault()
  resumeData.education.push({
    id: UUID(),
    school: "",
    degree: "",
    field: "",
    year: "",
    details: "",
  })
  saveResume()
  renderEducationBlocks()
  attachEducationListeners()
})

document.getElementById("addProjectBtn").addEventListener("click", (e) => {
  e.preventDefault()
  resumeData.projects.push({
    id: UUID(),
    title: "",
    description: "",
    link: "",
  })
  saveResume()
  renderProjectBlocks()
  attachProjectListeners()
})

document.getElementById("addCertBtn").addEventListener("click", (e) => {
  e.preventDefault()
  resumeData.certifications.push({
    id: UUID(),
    title: "",
    issuer: "",
    issueDate: "",
  })
  saveResume()
  renderCertificationBlocks()
  attachCertificationListeners()
})

// Attach Input Listeners
function attachExperienceListeners() {
  document.querySelectorAll("#experiencesContainer .repeating-block").forEach((block) => {
    const id = block.dataset.id
    const exp = resumeData.experiences.find((x) => x.id === id)
    if (!exp) return

    block.querySelector(".experience-company").addEventListener(
      "input",
      debounce((e) => {
        exp.company = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".experience-role").addEventListener(
      "input",
      debounce((e) => {
        exp.role = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".experience-start").addEventListener("change", (e) => {
      exp.startDate = e.target.value
      saveResume()
      renderPreview()
    })

    block.querySelector(".experience-end").addEventListener("change", (e) => {
      exp.endDate = e.target.value
      saveResume()
      renderPreview()
    })

    block.querySelector(".experience-location").addEventListener(
      "input",
      debounce((e) => {
        exp.location = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".experience-bullets").addEventListener(
      "input",
      debounce((e) => {
        exp.bullets = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )
  })
}

function attachEducationListeners() {
  document.querySelectorAll("#educationContainer .repeating-block").forEach((block) => {
    const id = block.dataset.id
    const edu = resumeData.education.find((x) => x.id === id)
    if (!edu) return

    block.querySelector(".education-school").addEventListener(
      "input",
      debounce((e) => {
        edu.school = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".education-degree").addEventListener(
      "input",
      debounce((e) => {
        edu.degree = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".education-field").addEventListener(
      "input",
      debounce((e) => {
        edu.field = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".education-year").addEventListener(
      "input",
      debounce((e) => {
        edu.year = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".education-details").addEventListener(
      "input",
      debounce((e) => {
        edu.details = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )
  })
}

function attachProjectListeners() {
  document.querySelectorAll("#projectsContainer .repeating-block").forEach((block) => {
    const id = block.dataset.id
    const proj = resumeData.projects.find((x) => x.id === id)
    if (!proj) return

    block.querySelector(".project-title").addEventListener(
      "input",
      debounce((e) => {
        proj.title = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".project-description").addEventListener(
      "input",
      debounce((e) => {
        proj.description = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".project-link").addEventListener(
      "input",
      debounce((e) => {
        proj.link = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )
  })
}

function attachCertificationListeners() {
  document.querySelectorAll("#certificationsContainer .repeating-block").forEach((block) => {
    const id = block.dataset.id
    const cert = resumeData.certifications.find((x) => x.id === id)
    if (!cert) return

    block.querySelector(".cert-title").addEventListener(
      "input",
      debounce((e) => {
        cert.title = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".cert-issuer").addEventListener(
      "input",
      debounce((e) => {
        cert.issuer = e.target.value
        saveResume()
        renderPreview()
      }, 200),
    )

    block.querySelector(".cert-year").addEventListener("change", (e) => {
      cert.issueDate = e.target.value
      saveResume()
      renderPreview()
    })
  })
}

document.getElementById("downloadPngBtn").addEventListener("click", async () => {
  try {
    const element = document.getElementById("resumePreview");
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error("Canvas creation failed - invalid dimensions");
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error("Blob creation failed");
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${(resumeData.personal.fullName || "resume").replace(/\s+/g, "_")}-A4.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png", 1.0);
  } catch (error) {
    console.error("[v0] PNG export error:", error);
    alert("Error downloading PNG: " + (error && error.message ? error.message : error));
  }
});

// ---------- Improved PDF Export (slices long canvas into A4 pages) ----------
document.getElementById("downloadPdfBtn").addEventListener("click", async () => {
  try {
    const element = document.getElementById("resumePreview");

    // make canvas (increase scale for quality)
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      // width/height omitted (let html2canvas compute element size)
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error("Canvas creation failed - invalid dimensions");
    }

    // jsPDF constructor
    const jsPDFConstructor = window.jspdf && window.jspdf.jsPDF;
    if (!jsPDFConstructor) {
      throw new Error("jsPDF library not found");
    }

    const pdf = new jsPDFConstructor({ orientation: "portrait", unit: "mm", format: "a4", compress: false });

    // A4 sizes in mm
    const pageWidthMM = 210;
    const pageHeightMM = 297;
    const marginMM = 10; // margin in mm
    const printableWidthMM = pageWidthMM - marginMM * 2;
    const printableHeightMM = pageHeightMM - marginMM * 2;

    // Convert pixel canvas to an Image object so we can crop with an offscreen canvas
    const fullImg = new Image();
    fullImg.src = canvas.toDataURL("image/png");

    await new Promise((res, rej) => {
      fullImg.onload = res;
      fullImg.onerror = rej;
    });

    // determine scale from canvas px -> mm (we will map fullImg width to printableWidthMM)
    const pxPerMM = fullImg.width / printableWidthMM; // px per mm

    // height of one PDF page in pixels for the scaled printable area
    const pageHeightPx = Math.floor(printableHeightMM * pxPerMM);

    // number of pages
    let yOffsetPx = 0;
    let pageIndex = 0;

    while (yOffsetPx < fullImg.height) {
      // create an offscreen canvas for this page slice
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = fullImg.width;
      sliceCanvas.height = Math.min(pageHeightPx, fullImg.height - yOffsetPx);
      const ctx = sliceCanvas.getContext("2d");

      // draw the relevant slice
      ctx.drawImage(fullImg, 0, yOffsetPx, fullImg.width, sliceCanvas.height, 0, 0, sliceCanvas.width, sliceCanvas.height);

      // convert to JPEG (dataURL)
      const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.95);

      // compute image height in mm for this slice
      const imgHeightMM = (sliceCanvas.height / pxPerMM);

      // add to PDF (if not first page, addPage)
      if (pageIndex > 0) pdf.addPage();

      pdf.addImage(sliceData, "JPEG", marginMM, marginMM, printableWidthMM, imgHeightMM);

      yOffsetPx += sliceCanvas.height;
      pageIndex += 1;
    }

    // Save PDF
    pdf.save(`${(resumeData.personal.fullName || "resume").replace(/\s+/g, "_")}.pdf`);
  } catch (error) {
    console.error("[v0] PDF export error:", error);
    alert("Error downloading PDF: " + (error && error.message ? error.message : error));
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
    localStorage.removeItem("resume-data")
    resumeData = {
      personal: {
        fullName: "",
        jobTitle: "",
        location: "",
        email: "",
        phone: "",
        website: "",
        linkedin: "",
        github: "",
        photoDataURL: "",
      },
      summary: "",
      experiences: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      hobbies: "",
    }
    location.reload()
  }
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("templateSelector").value = currentTemplate
  loadResume()
  attachExperienceListeners()
  attachEducationListeners()
  attachProjectListeners()
  attachCertificationListeners()
})

// Re-attach listeners when form updates
const observer = new MutationObserver(() => {
  attachExperienceListeners()
  attachEducationListeners()
  attachProjectListeners()
  attachCertificationListeners()
})

observer.observe(document.getElementById("experiencesContainer"), { childList: true })
observer.observe(document.getElementById("educationContainer"), { childList: true })
observer.observe(document.getElementById("projectsContainer"), { childList: true })
observer.observe(document.getElementById("certificationsContainer"), { childList: true })
