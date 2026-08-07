const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwipwPq973aGiqPvU5oORc-Ro1Sy-5XCb10FABEGq_gZGSTWu5IEkAcpgKIiD7rpYPE/exec";

document.getElementById("leadForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");
  
  // Basic Spam Honeypot check
  if (document.getElementById("website").value !== "") {
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";
  formStatus.innerText = "";
  formStatus.style.color = "#334155";

  const payload = {
    name: document.getElementById("name").value.trim(),
    company: document.getElementById("company").value.trim(),
    jobTitle: document.getElementById("jobTitle").value.trim(),
    email: document.getElementById("email").value.trim(),
    projectType: document.getElementById("projectType").value.trim(),
    challenge: document.getElementById("challenge").value.trim(),
    landingPage: window.location.href,
    source: new URLSearchParams(window.location.search).get("utm_source") || "direct",
    campaign: new URLSearchParams(window.location.search).get("utm_campaign") || "none"
  };

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script Web App standard CORS behavior
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // no-cors returns an opaque response; success is assumed if no network error occurred
    formStatus.style.color = "green";
    formStatus.innerText = "Assessment request submitted successfully. We will be in touch soon!";
    document.getElementById("leadForm").reset();

  } catch (error) {
    formStatus.style.color = "red";
    formStatus.innerText = "Submission failed. Please check your network or try again later.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "Request Free Optimization Assessment";
  }
});
