# ✨ Modern Developer Portfolio

> A sleek, high-performance developer portfolio crafted with Next.js, Framer Motion, and TailwindCSS. Designed to showcase projects and experience through cinematic 3D effects and smooth scroll-based animations.

## 🚀 Live Demo

[View Live Portfolio](https://your-deployment-link.vercel.app/) <!-- Replace with actual deployment link -->

---

## ✨ Features

- **Interactive Hero Section**: Engaging first impression with smooth entry animations.
- **Tech Icon Parallax Animation**: Dynamic background elements that react to scroll and mouse movement.
- **Featured Projects Folder Stack UI**: A unique 3D folder stack interface for browsing case studies.
- **Scroll-based Experience Timeline**: Cinematic vertical storytelling with floating timeline cards.
- **Animated Skill Sections**: Beautifully choreographed entrance animations for technical proficiencies.
- **Contact Form with Email Sending**: Fully functional contact form integrated with Resend API.
- **Smooth Animations**: Powered by Framer Motion for buttery-smooth layout transitions and micro-interactions.
- **Modern Responsive UI**: Flawless experience across all devices, from mobile to ultra-wide displays.
- **Tailwind-based Styling System**: Utility-first CSS architecture for rapid, consistent styling.
- **Next.js API Routes**: Serverless functions handling backend logic directly within the framework.

---

## 🛠 Tech Stack

- **Frontend Framework**: Next.js (App Router)
- **Styling**: TailwindCSS
- **Animation**: Framer Motion
- **Backend/API**: Next.js Route Handlers
- **Email Service**: Resend API
- **Language**: TypeScript

---

## 📂 Project Structure

```text
src/                # Root source directory
├── app/            # Next.js App Router (pages, layouts, and routing)
│   └── api/contact # Serverless API route for the Resend contact form
├── components/     # Reusable UI components (Buttons, Cards, Inputs)
├── sections/       # Major page sections (Hero, About, Experience, Projects)
├── layouts/        # Layout wrappers determining page structure
├── hooks/          # Custom React hooks encapsulating reusable logic
├── data/           # Static data dictionaries (projects, tech stack, experience)
├── lib/            # Utility functions, helpers, and configurations
└── assets/         # Static visual assets like images, fonts, and icons
```

---

## 💻 Installation Guide

To get this project running locally on your machine, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/jooeyme/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will start on the default port at `http://localhost:3000`.

---

## 🔑 Environment Variables

To make the contact form fully functional, you will need to set up environment variables. Create a `.env.local` file in the root of your project:

```env
# .env.local
RESEND_API_KEY=your_api_key_here
```

**Variables Explained:**
- `RESEND_API_KEY`: The API key provided by your [Resend](https://resend.com/) account, allowing the Next.js API route to securely dispatch formatted emails upon form submission.

---

## ✉️ Contact Form Workflow

The contact form operates seamlessly using Next.js Serverless Routes and the Resend API:

1. **User submits form** on the frontend UI.
2. **Request sent to `/api/contact`** via an asynchronous fetch call.
3. **API route validates input** ensuring all fields (name, email, message) are present and correctly formatted.
4. **Resend sends email** acting as the SMTP transporter to reliably deliver the message.
5. **Response returned to frontend** notifying the user of success or gracefully handling any errors.

---

## 🎨 Customization

This portfolio is heavily data-driven, making it incredibly easy to customize and make your own:

- **Add New Projects**: Open `src/data/portfolioData.ts` and add a new object to the array following the existing schema.
- **Update Skills & Experience**: Modify the exports within `src/data/aboutData.ts` and the experience arrays. Changes automatically populate via mapping.
- **Change Contact Email**: Update the receiving email address configured within your `src/app/api/contact/route.ts` handler logic.
- **Modify Animations**: Adjust configuration objects passed to Framer Motion components (typically found within the `components/` and `sections/` directories). You can tweak parameters like `duration`, `delay`, and `staggerChildren`.

---

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a GitHub repository.
2. Import your project into Vercel.
3. Add your `RESEND_API_KEY` in the Vercel Environment Variables settings.
4. Click **Deploy**. Vercel will automatically configure the build settings and deploy your site.

---

## ⚡ Performance Notes

This application was built with a strong focus on rendering speed and user experience:

- **Next.js App Router**: Leverages React Server Components to ship less JavaScript to the client.
- **Tailwind Utility CSS**: Minimal CSS bundle sizes achieved through dead-code elimination.
- **Optimized Assets**: Next.js `next/image` handles automatic image compression and lazy loading.
- **Serverless Email API**: Avoids the overhead of a dedicated backend server just for contact routing.
- **Dynamic Rendering**: Smart component architecture ensures complex interactive components are hydrated dynamically where needed.

---

## 🌱 Future Improvements

- [ ] Integrations with a headless CMS (Sanity / Contentful) for easier content management without code changes.
- [ ] MDX Blog integration for writing technical articles.
- [ ] Vercel Analytics integration for tracking visitor metrics and engagement.
- [ ] Persistent Dark / Light theme toggle switch.
- [ ] Tag-based project filtering in the portfolio section.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

---

## 👨‍💻 Author

Created by **jooeyme**
- GitHub: [@jooeyme](https://github.com/jooeyme)
