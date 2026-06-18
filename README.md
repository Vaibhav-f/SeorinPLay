# 🎬 SeorinPlay

### Discover, Explore & Watch Movies — Anytime, Anywhere

<p align="center">
  <img src="./src/assets/logosite.png" alt="SeorinPlay Logo" width="110"/>
</p>

<p align="center">
A sleek, fully responsive Netflix-inspired movie streaming platform built from scratch with React 19, Tailwind CSS v4, and the TMDB API — built as a frontend portfolio showcase, not a clone.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/Vite-Powered-646CFF?logo=vite&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/React_Router-v7-CA4245?logo=reactrouter&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/TMDB-API-01D277?logo=themoviedatabase&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/github/last-commit/Vaibhav-f/SeorinPLay?style=flat-square&color=8b5cf6" />
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 🔗 Live Demo

**[👉 View Live Site](#)** https://playseorin-three.vercel.app/

Want to test the sign-in flow without creating an account? Jump to [Demo Login](#-demo-login).

## 📖 About The Project

SeorinPlay recreates the *experience* of a platform like Netflix or Prime Video — entirely on the frontend, with zero backend. It pulls real, live movie data from **The Movie Database (TMDB)** and wraps it in a hand-built UI: a custom hero carousel, a live search dropdown, genre-based browsing, detailed movie pages, and a fully custom HTML5 video player with its own controls — no slider library, no player library, no shortcuts.

It exists to demonstrate practical, real-world frontend skills — component architecture, REST API integration, client-side routing, state management, and responsive design — packaged into something polished enough to put in front of a recruiter.

## ✨ Features

#### 🏠 Home Experience
- Auto-fetched **Hero banner** of now-playing movies, rendered as a custom carousel (no third-party slider)
- **Recommended** rail with quick genre filter tabs (All, Comedy, Action, Horror, Drama, Animation)
- **Trending This Week** and **Genres** rails, each backed by their own live TMDB request
- Promotional **Subscribe** call-to-action section

#### 🔍 Real-Time Search
- Live search built directly into the navbar
- Dropdown shows poster thumbnail, title, and release year as you type, with a loading state while results come in

#### 🎞️ Movie Details & Discovery
- Dedicated details page per movie (`/movie/:id`) combining **details + cast/credits + videos** via three parallel TMDB requests
- Genre-based recommendation browsing (`/genre/:genreId/:movieId`)
- Standalone **Trending Movies** page (`/trending`)

#### ▶️ Custom Video Player
- Built on a raw HTML5 `<video>` element — **zero player libraries**
- Hand-built play/pause, mute, click-to-seek progress bar, and fullscreen controls
- Live TMDB metadata (rating, runtime, genres, overview) displayed alongside playback
- Streams royalty-free, public-domain footage (*Big Buck Bunny*, *Elephants Dream*, *Sintel*) so the player is fully demoable with zero licensing concerns

#### 🔐 Authentication Flow
- Polished **Sign In** screen with email/password validation, show/hide password toggle, a captcha gate, and a simulated 3-attempt lockout
- Works today on a demo account (see [Demo Login](#-demo-login)) — wired so real auth (Firebase/Supabase/etc.) can be dropped in later without touching the UI

#### 📄 Full Page Suite
- About, Contact, Subscription/Pricing, Help Center, Terms of Service, and Privacy Policy — the kind of completeness that signals a finished product, not a one-page demo
- Dedicated responsive **Mobile Menu** alongside the desktop navbar

#### 📱 Fully Responsive
- Mobile-first layout that scales cleanly across phone, tablet, and desktop using Tailwind CSS v4

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Library** | React 19 |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Routing** | React Router DOM v7 |
| **HTTP Client** | Axios + native `fetch` |
| **Icons** | Lucide React |
| **Data Source** | [TMDB API](https://www.themoviedb.org/documentation/api) |
| **Linting** | ESLint 10 |
| **Deployment** | Vercel |


## 📂 Project Structure

```
SeorinPlay/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                   # logos, hero art, images
│   ├── Components/
│   │   ├── Layouts/
│   │   │   ├── Navbar.jsx        # nav bar + live search dropdown
│   │   │   ├── MobileMenu.jsx    # responsive mobile nav
│   │   │   └── Footer.jsx
│   │   ├── Section/               # homepage rails
│   │   │   ├── HeroSection.jsx
│   │   │   ├── RecomededSection.jsx
│   │   │   ├── TendingSection.jsx
│   │   │   ├── GenresSection.jsx
│   │   │   └── SubscribeSection.jsx
│   │   └── Pages/                 # routed pages
│   │       ├── SignIn.jsx
│   │       ├── Moviedetailpage.jsx
│   │       ├── GenrePage.jsx
│   │       ├── TrendingMovies.jsx
│   │       ├── Player.jsx
│   │       ├── Subscription.jsx
│   │       ├── About.jsx
│   │       ├── ContactPage.jsx
│   │       ├── HeplCenterPage.jsx
│   │       ├── TermsPage.jsx
│   │       └── PrivacyPolicyPage.jsx
│   ├── App.jsx                    # route definitions
│   ├── main.jsx                   # app entry point
│   └── index.css                  # Tailwind import + global styles
├── .env                           # TMDB key — see Environment Variables
├── vite.config.js
└── package.json
```

## 🧭 Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Hero, Recommended, Trending, Genres, Subscribe |
| `/signin` | Sign In | Demo authentication flow |
| `/movie/:id` | Movie Details | Full details, cast, recommendations |
| `/genre/:genreId/:movieId` | Genre Page | Genre-based recommendations |
| `/trending` | Trending Movies | This week's trending titles |
| `/play/:id` | Player | Custom video player |
| `/subscription` | Subscription | Pricing plans |
| `/about` | About | Project info |
| `/contact` | Contact | Contact form |
| `/help` | Help Center | FAQs & support |
| `/terms` | Terms | Terms of service |
| `/privacy-policy` | Privacy Policy | Privacy policy |

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Vaibhav-f/SeorinPLay.git
cd SeorinPLay
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the project root:
```env
VITE_TMDB_TOKEN=your_tmdb_api_key_here
```

**4. Run the development server**
```bash
npm run dev
```

The app will be live at `http://localhost:5173` 🎉

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_TMDB_TOKEN` | ✅ | TMDB API key used by every data-fetching component |



## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build an optimized production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |

## 🧩 How It Works

A step-by-step walk through a typical visit:

1. **Land on the homepage** — the Hero section fetches now-playing movies from TMDB and renders a custom auto-rotating banner.
2. **Scroll through the rails** — Recommended, Trending This Week, and Genres each fire their own TMDB request and render a horizontally scrollable row of movie cards.
3. **Search anything** — typing in the navbar hits TMDB's search endpoint and renders a live dropdown with poster, title, and year.
4. **Click a movie** — you land on `/movie/:id`, where three TMDB calls run in parallel (details, credits, videos) to build a full details page with cast and related titles.
5. **Hit Play** — `/play/:id` loads the custom-built `<video>` player with its own play/pause, mute, seek, and fullscreen controls, streaming a public-domain demo clip while showing real TMDB metadata alongside it.
6. **Sign in** — `/signin` runs client-side validation, a captcha gate, and a simulated lockout after failed attempts. Use the [demo credentials](#-demo-login) to see the success state.
7. **Explore the rest** — Subscription plans, About, Contact, Help Center, Terms, and Privacy Policy round out a complete site rather than a single demo page.

## 🔓 Demo Login

The Sign In page runs simulated authentication (no backend yet) — use these to test the success flow:

```
Email:    demo@seorinplay.com
Password: Demo@1234
```

## 🗺️ Roadmap

- [ ] Real authentication (Firebase / Supabase) in place of the simulated sign-in
- [ ] User watchlists & favorites, persisted per account
- [ ] Infinite scroll / pagination on browse pages
- [ ] Light theme toggle
- [ ] Unit & integration tests

## ⚠️ Disclaimer

This is a **portfolio/educational project**, not a commercial streaming service. Movie metadata is provided by TMDB; playback uses royalty-free, public-domain sample footage only — no copyrighted film content is streamed.

This product uses the TMDB API but is not endorsed or certified by TMDB.

## 👤 Author

**Vaibhav**
GitHub: [@Vaibhav-f](https://github.com/Vaibhav-f)

## 📄 License

Shared for learning and inspiration — feel free to fork it, study the code, and build on top of it.

---

<p align="center">⭐ If you found this project interesting, consider giving it a star!</p>
