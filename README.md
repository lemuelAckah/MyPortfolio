# Lemuel Ackah Blay-Miezah — Creative Portfolio

A sleek, modern portfolio website showcasing my work as a full-stack software engineer. Built with vanilla HTML, CSS, and JavaScript with glassmorphic design, smooth animations, and responsive layouts.

## 🌟 Features

- **Custom Cursor** — Glowing, lagging pointer with hover interactions
- **Floating Social Bar** — Quick links to LinkedIn, GitHub, and email (desktop)
- **Responsive Design** — Optimized for mobile (320px), tablet (768px), and desktop (1024px+)
- **Project Showcase** — Interactive modal case studies with tech stack details
- **Contact Form** — Integrated with serverless backend (SendGrid) + mailto fallback
- **CV & Resume Pages** — Professional documents with secure back navigation
- **Dark Theme** — Modern glassmorphism with gradient accents and smooth animations
- **Performance Optimized** — Fast load times, lazy-loaded assets, smooth 60fps animations

## 📁 Project Structure

```
MyPortfolio/
├── public/
│   ├── index.html          # Main portfolio page
│   ├── cv.html             # CV document
│   ├── resume.html         # Resume document
│   ├── styles.css          # All styling (responsive breakpoints included)
│   ├── main.js             # Interactions, modals, form handling
│   └── .htaccess           # Server security & rewrite rules
├── api/
│   └── contact.js          # Vercel serverless function (SendGrid integration)
├── vercel.json             # Deployment config
├── .gitignore              # Git ignore patterns
└── README.md               # This file
```

## 🎨 Tech Stack

- **Frontend:** HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
- **Design:** Mobile-first responsive, modern dark theme
- **Forms:** Client-side validation + serverless backend
- **Email:** SendGrid API (with mailto fallback)
- **Deployment:** Vercel serverless
- **Security:** X-Content-Type-Options, X-Frame-Options headers

## 🚀 Getting Started

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/MyPortfolio.git
   cd MyPortfolio
   ```

2. Open in a local server (required for full functionality):

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (with http-server)
   npx http-server ./public
   ```

3. Open `http://localhost:8000` in your browser

### Environment Variables (for Vercel deployment)

Create a `.env.local` file in the root with:

```
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_TO_EMAIL=your_email@example.com
SENDGRID_FROM_EMAIL=noreply@example.com
```

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 480px
- **Tablet:** 481px - 1024px
- **Desktop:** 1025px+
- **Landscape:** Optimized for horizontal viewing

## 🔒 Security Features

- Directory listing disabled (`.htaccess` & `vercel.json`)
- Back button redirects prevent file path exposure
- CSRF protection on forms
- Content Security Policy headers
- XSS prevention headers

## 📧 Contact Form

The contact form integrates with SendGrid for reliable email delivery:

- **Primary:** Serverless backend sends via SendGrid API
- **Fallback:** Opens user's mail client if API fails (graceful degradation)

## 🎯 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Blog section
- [ ] Project filtering by technology
- [ ] Analytics integration
- [ ] Testimonials carousel

## 📄 License

This portfolio is my personal project. Feel free to draw inspiration but please don't copy the entire design or content.

## 👤 Author

**Lemuel Ackah Blay-Miezah**

- Email: [hello@lemuelackahblay.com](mailto:hello@lemuelackahblay.com)
- GitHub: [@lemuelackahblay](https://github.com/lemuelackahblay)
- LinkedIn: [@lemuelackahblay](https://linkedin.com/in/lemuelackahblay)

---

Built with creativity, precision, and attention to detail. ✨
