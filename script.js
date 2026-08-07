const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwipwPq973aGiqPvU5oORc-Ro1Sy-5XCb10FABEGq_gZGSTWu5IEkAcpgKIiD7rpYPE/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn ? submitBtn.innerText : "Submit";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      // Using text/plain avoids Google Apps Script CORS preflight failures
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === "success") {
        form.reset();
        alert("Thank you! Your assessment request has been recorded.");
      } else {
        alert("Submission failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  });
});
