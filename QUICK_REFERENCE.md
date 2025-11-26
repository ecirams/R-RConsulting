# Quick Reference Guide - R&R Consulting Website

## 🚀 Fast Track Setup (5 Minutes)

### 1. Add Your Logo

```
1. Prepare your logo (PNG or JPEG, recommended: 200x200px)
2. Save as "rr-logo.jpeg"
3. Place in: assets/ folder
4. Done! ✅
```

### 2. Update Contact Email

Find and replace in `index.html`:

```html
<!-- Old -->
<a href="mailto:rrconsulting2025@gmail.com">rrconsulting2025@gmail.com</a>

<!-- New -->
<a href="mailto:your-email@example.com">your-email@example.com</a>
```

### 3. Update Phone Number

Find and replace in `index.html`:

```html
<!-- Old -->
<a href="tel:+919876543210">Call Us</a>

<!-- New -->
<a href="tel:+1234567890">Call Us</a>
```

### 4. Add to Your Server

1. Upload all files via FTP/SFTP
2. Open in browser
3. Test forms and links
4. Done! ✅

---

## 🎨 Common Customizations

### Change Primary Color (Blue)

In `css/styles.css`, find and replace:

```css
--primary-blue: #1e3a8a; /* Change this */
```

### Change Accent Color (Green)

In `css/styles.css`, find and replace:

```css
--accent-green: #10b981; /* Change this */
```

### Update Founder Names

In `index.html`, find:

```html
<h4>Raju</h4>
<p>Strategic Leadership & Advisory Expertise</p>
```

Replace with your founder info.

### Modify Service Descriptions

Each service has a list. Update like:

```html
<li>Your new service point</li>
```

### Change Hero Headline

In `index.html`, find:

```html
<h1 class="hero-headline">Remodel to Realize</h1>
```

Change to your preferred headline.

---

## 🔗 Quick Links to Edit

| Section         | File       | Location      |
| --------------- | ---------- | ------------- |
| Hero Content    | index.html | Lines 70-82   |
| About Section   | index.html | Lines 92-140  |
| Services        | index.html | Lines 157-225 |
| Execution Model | index.html | Lines 240-275 |
| Our Belief      | index.html | Lines 285-295 |
| Contact Form    | index.html | Lines 318-340 |
| Colors          | styles.css | Lines 1-15    |
| Fonts           | styles.css | Lines 50-70   |
| Hero Section    | styles.css | Lines 200-280 |

---

## 📝 Content Snippets

### Update "About Us" Section

```html
<div class="about-card">
  <h3>Your Heading</h3>
  <p>Your description goes here. Keep it concise and compelling.</p>
</div>
```

### Add New Service Card

```html
<div class="service-card">
  <div class="service-image">
    <img src="https://images.unsplash.com/..." alt="Your Service" />
  </div>
  <div class="service-content">
    <h3>Service Name</h3>
    <p class="service-highlight">Key benefit here</p>
    <ul class="service-list">
      <li>Feature 1</li>
      <li>Feature 2</li>
      <li>Feature 3</li>
    </ul>
  </div>
</div>
```

### Update Execution Model Step

```html
<div class="execution-step">
  <div class="step-number">01</div>
  <h3>Your Step Title</h3>
  <p>Your step description here.</p>
</div>
```

---

## 🖼️ Image Replacement Guide

### High-Quality Stock Photo Sites

- **Unsplash**: https://unsplash.com (free, high quality)
- **Pexels**: https://www.pexels.com (free)
- **Pixabay**: https://pixabay.com (free)
- **Shutterstock**: https://www.shutterstock.com (paid)

### Recommended Images

| Section         | Image Type             | Recommended Size |
| --------------- | ---------------------- | ---------------- |
| Hero            | Sunrise/City Skyline   | 1920x1080px      |
| About           | Team Collaboration     | 500x500px        |
| Strategic Drive | Compass/Roadmap        | 400x300px        |
| Growth Drive    | Upward Graph           | 400x300px        |
| Quality Drive   | Gears/Quality Seal     | 400x300px        |
| Founders        | Professional Headshots | 300x300px        |

### How to Replace Images

Find in `index.html`:

```html
<img src="https://images.unsplash.com/photo-12345..." alt="Description" />
```

Replace URL with your image URL.

---

## 🎯 SEO Quick Tips

### Update Meta Description

```html
<meta name="description" content="Your custom description here" />
```

### Update Page Title

```html
<title>Your Company Name - Your Tagline</title>
```

### Add Keywords

```html
<meta name="keywords" content="consulting, advisory, business excellence" />
```

### Add Open Graph Tags (Optional)

```html
<meta property="og:title" content="R&R Consulting" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://yoursite.com/logo.jpg" />
<meta property="og:type" content="website" />
```

---

## 📧 Email Configuration

### Using Formspree (Easiest)

1. Go to https://formspree.io
2. Create account and form
3. Copy form URL
4. Update form `action` in HTML:

```html
<form action="https://formspree.io/f/YOUR_ID" method="POST"></form>
```

### Using Gmail

1. Enable 2-step verification
2. Create app password
3. Use in backend configuration

### Using SendGrid

1. Create account at https://sendgrid.com
2. Get API key
3. Update backend configuration

---

## 🔐 reCAPTCHA Setup

### Get Your Site Key

1. Visit: https://www.google.com/recaptcha/admin
2. Sign in with Google account
3. Click Create
4. Fill in domain details
5. Choose reCAPTCHA v2 (I'm not a robot)
6. Copy Site Key

### Add to HTML

```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY_HERE"></div>
```

---

## ⚙️ JavaScript Customizations

### Add Google Analytics

```html
<!-- Add before closing </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_ID");
</script>
```

### Modify Form Validation

Edit function in `js/script.js`:

```javascript
function handleContactForm(e) {
  e.preventDefault();
  // Your custom validation here
}
```

### Add Console Logging

```javascript
console.log("Message here"); // Visible in browser console
```

---

## 🚀 Deployment Steps

### Step 1: Local Testing

```bash
# On Windows PowerShell
# Open index.html in browser to test
```

### Step 2: Prepare Files

```
Ensure all files are present:
- index.html
- css/styles.css
- js/script.js
- assets/rr-logo.jpeg
```

### Step 3: Upload via FTP

Use software like:

- FileZilla (free)
- WinSCP (free)
- Your hosting control panel

### Step 4: Test Production

1. Visit your domain
2. Test all links
3. Test forms
4. Check mobile view
5. Monitor for errors

### Step 5: Set Up SSL/HTTPS

1. Use Let's Encrypt (free)
2. Or buy SSL certificate
3. Configure on your host
4. Update all links to HTTPS

---

## 🐛 Troubleshooting

### Images Not Showing

- Check image URL is correct
- Verify image exists on server
- Check image permissions
- Try different image format

### Forms Not Working

- Check backend is configured
- Verify reCAPTCHA key is correct
- Check browser console for errors
- Ensure HTTPS is enabled

### Mobile Menu Not Working

- Clear browser cache
- Check JavaScript is enabled
- Open DevTools console for errors
- Test on different mobile browser

### Styling Looks Different

- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+F5)
- Check CSS file is loaded
- Verify no browser extensions interfering

### Slow Load Time

- Optimize image sizes
- Compress CSS and JavaScript
- Use CDN for images
- Enable browser caching
- Minimize external requests

---

## 📱 Mobile Testing Checklist

- [ ] Navigation menu works
- [ ] Hero section displays correctly
- [ ] Images load properly
- [ ] Text is readable
- [ ] Forms are usable
- [ ] Buttons are clickable
- [ ] No horizontal scrolling
- [ ] Footer displays correctly
- [ ] All links work

---

## 🎓 Learning Resources

### HTML & CSS

- MDN Web Docs: https://developer.mozilla.org
- CSS Tricks: https://css-tricks.com
- W3Schools: https://www.w3schools.com

### Web Development

- Frontend Masters: https://frontendmasters.com
- Codecademy: https://codecademy.com
- FreeCodeCamp: https://freecodecamp.org

### Hosting

- Netlify: https://netlify.com (free tier)
- Vercel: https://vercel.com (free tier)
- GitHub Pages: https://pages.github.com (free)

---

## 💡 Pro Tips

1. **Use Ctrl+F to Find**: Quickly find text to edit
2. **Save Backups**: Keep original files backed up
3. **Test Responsively**: Use Chrome DevTools (F12)
4. **Monitor Analytics**: Track user behavior
5. **Update Regularly**: Keep content fresh
6. **Use HTTPS**: Secure your website
7. **Mobile First**: Design for mobile devices
8. **Fast Loading**: Optimize images
9. **Clear Communication**: Use concise language
10. **Call-to-Action**: Make CTAs clear and compelling

---

## ⏱️ Time Estimates

| Task                | Time         |
| ------------------- | ------------ |
| Add logo            | 2 min        |
| Update contact info | 5 min        |
| Replace images      | 15 min       |
| Customize content   | 30 min       |
| Set up backend      | 15 min       |
| Configure reCAPTCHA | 10 min       |
| Deploy to server    | 10 min       |
| Test thoroughly     | 20 min       |
| **Total**           | **~107 min** |

---

## 🆘 Still Need Help?

### Check These Files First

1. `README.md` - Setup guide
2. `BACKEND_INTEGRATION.md` - Email/form help
3. `PROJECT_SUMMARY.md` - Features overview
4. Browser DevTools (F12) - Error messages

### Common Issues

- **Logo not showing**: Check assets/ folder and filename
- **Forms not working**: See BACKEND_INTEGRATION.md
- **Styles look wrong**: Clear browser cache (Ctrl+Shift+Del)
- **Mobile menu broken**: Check JavaScript in DevTools

---

**Version**: 1.0
**Last Updated**: November 26, 2025
**Status**: Production Ready

Good luck! 🎉
