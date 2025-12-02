// R&R Consulting Website - JavaScript

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  // Newsletter Form Handling
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterForm);
  }

  // Scroll animations
  observeElements();
});

// Contact Form Handler
function handleContactForm(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const name = this.querySelector("#contactName")
    ? this.querySelector("#contactName").value.trim()
    : "";
  const email = this.querySelector("#contactEmail")
    ? this.querySelector("#contactEmail").value.trim()
    : "";
  const message = this.querySelector("#contactMessage")
    ? this.querySelector("#contactMessage").value.trim()
    : "";
  const attachments = this.querySelector("#attachments").files[0];

  // Verify reCAPTCHA is checked (optional - validation depends on backend)
  const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA verification.");
    return;
  }

  // Here you would typically send this data to your server or a 3rd-party service.
  // We support EmailJS (https://www.emailjs.com/) for client-side sending.
  const EMAILJS_ENABLED = false; // Set to true after adding your EmailJS credentials below.
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // e.g., 'service_xxx'
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g., 'template_xxx'
  const EMAILJS_USER_ID = "YOUR_USER_ID"; // initialize EmailJS if using it

  const payload = {
    name: name,
    email: email,
    message: message,
    request_type: document.getElementById("requestType")
      ? document.getElementById("requestType").value
      : "general",
  };

  // If EmailJS is configured and available, use it.
  if (
    EMAILJS_ENABLED &&
    typeof emailjs !== "undefined" &&
    EMAILJS_SERVICE_ID &&
    EMAILJS_TEMPLATE_ID
  ) {
    try {
      if (EMAILJS_USER_ID && typeof emailjs.init === "function") {
        emailjs.init(EMAILJS_USER_ID);
      }
      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload)
        .then(() => {
          showNotification(
            "Thank you! Your message has been sent successfully.",
            "success"
          );
          contactForm.reset();
          grecaptcha.reset();
        })
        .catch((err) => {
          console.error("EmailJS send error:", err);
          showNotification(
            "There was an error sending your message. Please try again later.",
            "error"
          );
        });
      return;
    } catch (err) {
      console.warn("EmailJS error", err);
    }
  }

  // Fallback: open the user's mail client using mailto:. This requires the user to confirm sending.
  const to = "rrconsulting2025@gmail.com";
  const subject = encodeURIComponent(
    `Contact Request from ${name || "Website Visitor"}`
  );
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Request Type: ${payload.request_type}`,
    "",
    "Message:",
    message || "(no message provided)",
  ];
  const mailtoUrl = `mailto:${encodeURIComponent(
    to
  )}?subject=${subject}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  window.location.href = mailtoUrl;

  // If we reached here, the fallback mailto has been opened and the user will need to send it.
  // Optionally, clear the form and reset reCAPTCHA.
  this.reset();
  grecaptcha.reset();
}

// Newsletter Form Handler
function handleNewsletterForm(e) {
  e.preventDefault();

  const email = this.querySelector('input[type="email"]').value;

  // Validate email
  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address.", "error");
    return;
  }

  // Here you would typically send this data to your server
  console.log("Newsletter Signup:", { email });

  // Show success message
  showNotification(
    "Successfully subscribed! Check your email for confirmation.",
    "success"
  );

  // Reset form
  this.reset();
}

// Email Validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles dynamically if not in CSS
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

  if (type === "success") {
    notification.style.backgroundColor = "#10b981";
    notification.style.color = "white";
  } else if (type === "error") {
    notification.style.backgroundColor = "#ef4444";
    notification.style.color = "white";
  } else {
    notification.style.backgroundColor = "#3b82f6";
    notification.style.color = "white";
  }

  document.body.appendChild(notification);

  // Remove notification after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Scroll Animation Observer
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const elementsToObserve = document.querySelectorAll(
    ".service-card, .about-card, .founder-card, .execution-step, .contact-card"
  );

  elementsToObserve.forEach((element) => {
    element.style.opacity = "0";
    observer.observe(element);
  });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add slideOutRight animation to CSS dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(50px);
        }
    }
`;
document.head.appendChild(style);

// Keyboard Navigation
document.addEventListener("keydown", function (e) {
  // Close mobile menu on Escape
  if (e.key === "Escape") {
    const navMenu = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  }
});

// Form Validation Helper
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#ef4444";
      isValid = false;
    } else {
      input.style.borderColor = "#e2e8f0";
    }
  });

  return isValid;
}

// File Upload Handler
const fileInput = document.getElementById("attachments");
if (fileInput) {
  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        showNotification(
          "File size exceeds 10MB. Please choose a smaller file.",
          "error"
        );
        this.value = "";
      } else {
        console.log("File selected:", file.name);
      }
    }
  });
}

// Analytics Helper (optional)
function trackEvent(category, action, label = "") {
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}

// Track CTA button clicks
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("click", function () {
    trackEvent("engagement", "cta_click", "hero_section");
  });
}

// (Removed 'Request Sample Plan' UI) - no handler needed

// Download Capability Statement - open modal
const downloadCapBtn = document.getElementById("downloadCapBtn");
const downloadModal = document.getElementById("downloadModal");
if (downloadCapBtn && downloadModal) {
  downloadCapBtn.addEventListener("click", function () {
    // Prefill request type for analytics/backend as 'one_page_about_us'
    const requestInput = document.getElementById("requestType");
    if (requestInput) requestInput.value = "one_page_about_us";
    downloadModal.setAttribute("aria-hidden", "false");
    const emailEl = document.getElementById("downloadEmail");
    if (emailEl) emailEl.focus();
    trackEvent("engagement", "cta_download_one_page_about_us", "hero_section");
  });
}

// Modal close handling
const modalCloses = document.querySelectorAll(".modal-close");
modalCloses.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    const modal = e.target.closest(".modal");
    if (modal) modal.setAttribute("aria-hidden", "true");
  })
);

// Download form handling
const downloadForm = document.getElementById("downloadForm");
if (downloadForm) {
  downloadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("downloadEmail").value;
    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }
    // Simulate sending data, then start download
    showNotification(
      "Thanks! Your capability statement is downloading now.",
      "success"
    );
    const link = document.createElement("a");
    // Update to the official file name for the One Page About Us
    const fileName = "R&R_Consulting_About_Us_V1.pdf";
    link.href = `assets/doc/${encodeURIComponent(fileName)}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    const modal = document.getElementById("downloadModal");
    if (modal) modal.setAttribute("aria-hidden", "true");
    downloadForm.reset();
  });
}

// Social Share Helper
function shareOnSocial(
  platform,
  url = window.location.href,
  title = document.title
) {
  let shareUrl = "";

  switch (platform) {
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
      break;
    case "email":
      shareUrl = `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(url)}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=400");
  }
}

// Performance: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// ========== SCROLL-TO-TOP BUTTON ==========
function initScrollToTopButton() {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  const scrollThreshold = 300; // Show button after scrolling 300px

  if (!scrollBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > scrollThreshold) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  // Smooth scroll to top on button click
  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Keyboard support (Enter or Space key)
  scrollBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}

// Initialize scroll-to-top when DOM is ready
document.addEventListener("DOMContentLoaded", initScrollToTopButton);

console.log("R&R Consulting Website - JS Loaded Successfully");
