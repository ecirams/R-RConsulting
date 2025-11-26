# Backend Integration Guide - R&R Consulting Website

## Overview

This guide explains how to set up backend services to handle contact form submissions and newsletter signups for the R&R Consulting website.

## Option 1: Formspree (Recommended - No Backend Required)

### Setup Steps

1. **Go to Formspree** (https://formspree.io/)
2. **Sign up for a free account**
3. **Create a new form**
4. **Copy your form endpoint URL** (looks like: `https://formspree.io/f/xyzabc123`)
5. **Update your HTML**

In `index.html`, modify the contact form:

```html
<form
  class="contact-form"
  id="contactForm"
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
  enctype="multipart/form-data"
>
  <div class="form-group">
    <input type="text" name="name" placeholder="Your Name" required />
  </div>
  <div class="form-group">
    <input type="email" name="email" placeholder="Your Email" required />
  </div>
  <div class="form-group">
    <textarea
      name="message"
      placeholder="Your Message"
      rows="5"
      required
    ></textarea>
  </div>
  <div class="form-group">
    <label for="attachments">Attach File (Optional):</label>
    <input
      type="file"
      id="attachments"
      name="attachments"
      accept=".pdf,.doc,.docx,.txt,.xlsx"
    />
  </div>
  <button type="submit" class="submit-btn">Send Message</button>
</form>
```

6. **Remove reCAPTCHA requirement** (Formspree handles spam protection):
   - Remove the `<script src="https://www.google.com/recaptcha/api.js"></script>` line if not needed
   - Remove the `<div class="g-recaptcha" data-sitekey="..."></div>` element

### Features

- ✅ File attachments support
- ✅ Automatic spam filtering
- ✅ Email notifications
- ✅ Redirect after submission
- ✅ Free tier available

---

## Option 2: EmailJS (Client-side Email)

### Setup Steps

1. **Go to EmailJS** (https://www.emailjs.com/)
2. **Create a free account**
3. **Add an email service** (Gmail, Outlook, custom email)
4. **Create an email template**
5. **Get your Service ID, Template ID, and Public Key**

### Update HTML

Add the EmailJS script in `index.html` (before closing `</body>`):

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"
></script>
<script type="text/javascript">
  (function () {
    emailjs.init("YOUR_PUBLIC_KEY");
  })();
</script>
```

### Update JavaScript (`js/script.js`)

Replace the `handleContactForm` function:

```javascript
function handleContactForm(e) {
  e.preventDefault();

  const form = this;
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector("textarea").value;

  // Verify reCAPTCHA
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    showNotification("Please complete the reCAPTCHA verification.", "error");
    return;
  }

  // Send email using EmailJS
  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      to_email: "rrconsulting2025@gmail.com",
      from_name: name,
      from_email: email,
      message: message,
      reply_to: email,
    })
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        showNotification(
          "Thank you! Your message has been sent successfully.",
          "success"
        );
        form.reset();
        grecaptcha.reset();
      },
      function (error) {
        console.log("FAILED...", error);
        showNotification("Error sending message. Please try again.", "error");
      }
    );
}
```

### Features

- ✅ No backend server required
- ✅ Direct email sending
- ✅ Easy setup
- ✅ Free tier available
- ⚠️ Public key exposed in frontend (consider risks)

---

## Option 3: Firebase (Full Backend Solution)

### Setup Steps

1. **Create a Firebase project** (https://console.firebase.google.com/)
2. **Enable Firestore Database and Cloud Functions**
3. **Set up authentication rules**

### Cloud Function Example

Create a Cloud Function to handle form submissions:

```javascript
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

exports.submitContactForm = functions.https.onCall(async (data, context) => {
  const { name, email, message } = data;

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "rrconsulting2025@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
      replyTo: email,
    });

    // Store in Firestore
    await admin.firestore().collection("contacts").add({
      name,
      email,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      processed: false,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});
```

### Update JavaScript

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFunctions,
  httpsCallable,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-functions.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const submitForm = httpsCallable(functions, "submitContactForm");

function handleContactForm(e) {
  e.preventDefault();
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector("textarea").value;

  submitForm({ name, email, message })
    .then((result) => {
      showNotification("Thank you! Your message has been sent.", "success");
      this.reset();
    })
    .catch((error) => {
      showNotification("Error: " + error.message, "error");
    });
}
```

### Features

- ✅ Full backend control
- ✅ Database storage
- ✅ Advanced security
- ✅ Scalable
- ⚠️ Requires more setup

---

## Option 4: Custom Node.js/Express Backend

### Basic Express Server Setup

```javascript
const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const app = express();

const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post("/api/contact", upload.single("attachments"), async (req, res) => {
  const { name, email, message } = req.body;
  const file = req.file;

  try {
    let mailOptions = {
      from: process.env.FROM_EMAIL,
      to: "rrconsulting2025@gmail.com",
      subject: `Contact Form Submission from ${name}`,
      html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
      replyTo: email,
    };

    if (file) {
      mailOptions.attachments = [
        {
          path: file.path,
        },
      ];
    }

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/newsletter", async (req, res) => {
  const { email } = req.body;

  try {
    // Store in database or add to newsletter list
    // Send confirmation email
    res.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### Update Frontend

```javascript
function handleContactForm(e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch("/api/contact", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showNotification("Thank you! Your message has been sent.", "success");
        this.reset();
      }
    })
    .catch((error) => {
      showNotification("Error: " + error.message, "error");
    });
}
```

---

## Newsletter Integration

### MailChimp Setup

1. **Create a MailChimp account** (https://mailchimp.com/)
2. **Create an audience**
3. **Get your Form Action URL**

Update the newsletter form:

```html
<form
  action="https://your-domain.us1.list-manage.com/subscribe/post?u=abc123&id=def456"
  method="POST"
  target="_blank"
>
  <input type="email" name="EMAIL" placeholder="Your email address" required />
  <button type="submit">Subscribe</button>
</form>
```

---

## reCAPTCHA Setup

1. **Go to Google reCAPTCHA** (https://www.google.com/recaptcha/admin)
2. **Create a new site**
3. **Choose reCAPTCHA v2 (I'm not a robot Checkbox)**
4. **Get your Site Key and Secret Key**
5. **Update the form with your Site Key**

---

## Security Recommendations

1. **Use HTTPS only**
2. **Validate all inputs server-side**
3. **Rate limit form submissions**
4. **Use environment variables for secrets**
5. **Implement CSRF protection**
6. **Sanitize all user input**
7. **Add logging and monitoring**

---

## Environment Variables Example

```
# .env file
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
FROM_EMAIL=noreply@rrconsulting.com
RECAPTCHA_SECRET_KEY=your-secret-key
```

---

## Recommended Solution

**For beginners**: Use **Formspree** or **MailerLite** - simple, free, no backend needed.

**For advanced users**: Use **Firebase** or **Custom Express Server** - more control and features.

---

## Testing

Test your form submission:

1. Fill out all required fields
2. Upload a test file (if applicable)
3. Submit the form
4. Check if email is received
5. Verify no sensitive data is exposed

---

**Last Updated**: November 26, 2025
