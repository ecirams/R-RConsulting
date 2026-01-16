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

  // Contact Form Handling - Handled via iframe onload
  // const contactForm = document.getElementById("contactForm");
  // if (contactForm) {
  //   contactForm.addEventListener("submit", handleContactForm);
  // }

  // Newsletter Form Handling
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterForm);
  }

  // Scroll animations
  observeElements();
});

// Preloader Logic
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Add a small delay to ensure branding is seen
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 800); // 0.8s minimum display time
  }
});

// Contact Form Handler
// Contact Form Handler - Removed to allow Google Forms submission via iframe
// The form submission is now handled by the 'onload' event of the hidden iframe in index.html,
// which triggers the success modal.
var submitted = false; // Flag to track submission status


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
    // Note: We do NOT call e.preventDefault() here so the form actually submits to the target iframe (Google Form)

    const email = document.getElementById("downloadEmail").value;
    if (!isValidEmail(email)) {
      e.preventDefault(); // Stop submission if invalid
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    // Form is valid and will submit to hidden iframe.
    // Proceed with download flow and UI feedback.

    showNotification(
      "Thanks! Your capability statement is downloading now.",
      "success"
    );

    // Trigger file download
    const link = document.createElement("a");
    const fileName = "R&R_Consulting_About_Us_V2.pdf";
    link.href = `assets/doc/${encodeURIComponent(fileName)}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal
    const modal = document.getElementById("downloadModal");
    if (modal) modal.setAttribute("aria-hidden", "true");

    // Reset form after a delay to ensure submission is sent
    setTimeout(() => {
      downloadForm.reset();
    }, 1000);
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
  const circle = document.querySelector(".progress-ring-circle");
  const scrollThreshold = 300;

  if (!scrollBtn || !circle) return;

  // Calculate circumference
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  // Set initial state
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  // Show/hide button and update progress based on scroll position
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    setProgress(scrollPercent);

    if (scrollTop > scrollThreshold) {
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

// Function to initialize the Sticky CTA Bar
function initStickyCTABar() {
  const stickyCTABar = document.getElementById("stickyCTABar");
  const servicesSection = document.getElementById("services");

  if (!stickyCTABar || !servicesSection) return;

  // Show/hide Sticky CTA Bar based on scroll position relative to Services section
  window.addEventListener("scroll", function () {
    const servicesRect = servicesSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Show ONLY when the Services section is within the viewport
    // It appears when trying to enter from bottom (top < windowHeight)
    // It disappears when fully scrolled past (bottom <= 0)
    // It disappears when scrolled back up above it (top >= windowHeight)
    if (servicesRect.top < windowHeight && servicesRect.bottom > 0) {
      stickyCTABar.classList.add("show");
    } else {
      stickyCTABar.classList.remove("show");
    }
  });

  // Bind Sticky CTA Button to open the same modal as the Hero button
  const stickyCTABtn = document.getElementById("stickyCTABtn");
  const downloadModal = document.getElementById("downloadModal");

  if (stickyCTABtn && downloadModal) {
    stickyCTABtn.addEventListener("click", function () {
      // Prefill request type for analytics/backend
      const requestInput = document.getElementById("requestType");
      if (requestInput) requestInput.value = "one_page_about_us_sticky";

      downloadModal.setAttribute("aria-hidden", "false");

      // Focus on the email input for accessibility/usability
      const emailEl = document.getElementById("downloadEmail");
      if (emailEl) emailEl.focus();

      trackEvent("engagement", "cta_sticky_click", "sticky_bar");
    });
  }
}

// Initialize the Sticky CTA Bar when DOM is ready
document.addEventListener("DOMContentLoaded", initStickyCTABar);

// Initialize scroll-to-top when DOM is ready
document.addEventListener("DOMContentLoaded", initScrollToTopButton);

// Hero Background Zoom Logic
document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const triggerText = document.querySelector(".hero-line1"); // "Advisory & Consulting Services"

  if (heroSection && triggerText) {
    triggerText.addEventListener("mouseenter", function () {
      heroSection.classList.add("zoomed-bg");
    });

    triggerText.addEventListener("mouseleave", function () {
      heroSection.classList.remove("zoomed-bg");
    });
  }
});

// Dark Mode Toggle Logic
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("darkModeToggle");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  const body = document.body;

  // Check Local Storage
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";
  if (isDarkMode) {
    enableDarkMode();
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      if (body.classList.contains("dark-mode")) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  }

  function enableDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }

  function disableDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
});


// Active Navigation Highlighting (ScrollSpy)
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-menu a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current) && current !== "") {
        link.classList.add("active");
      }
    });
  });
});
