# Saibharadwaja.org - React Application

This is a React conversion of the original ASP.NET Web Forms application for Saibharadwaja.org.

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Main layout with navigation
│   ├── pages/
│   │   ├── Home.jsx              # Home page
│   │   ├── About/
│   │   │   ├── Acharya.jsx       # About Acharya page
│   │   │   └── Divyajanani.jsx   # About Divyajanani page
│   │   ├── Books/
│   │   │   ├── Books.jsx         # Books listing page
│   │   │   ├── Purchase.jsx      # Purchase books page
│   │   │   ├── Read.jsx          # Read books listing
│   │   │   └── BookDetail.jsx    # Individual book page
│   │   ├── Magazine/
│   │   │   └── Magazine.jsx      # Magazine issues page
│   │   ├── Media/
│   │   │   ├── Photos.jsx        # Photo gallery
│   │   │   └── SpeechesVideos.jsx # Speeches & Videos page
│   │   ├── Calendar.jsx           # Calendar of events
│   │   └── Contact.jsx           # Contact information
│   ├── styles/
│   │   └── main.css             # Main stylesheet
│   ├── App.jsx                   # Main app component with routing
│   └── main.jsx                  # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Features

- **React Router** for client-side routing
- **Bootstrap 5** for styling (maintains original design)
- **Responsive design** with mobile and desktop navigation
- All original pages converted to React components:
  - Home page with carousel
  - About pages (Acharya, Divyajanani)
  - Books section (Read, Purchase)
  - Magazine with dynamic year/issue navigation
  - Photo gallery
  - Calendar of events
  - Contact information

## Notes

- The original CSS files are preserved and imported
- Static assets (images, fonts, PDFs) should be placed in the `public` directory
- The application uses React Router for navigation
- Bootstrap JavaScript functionality (like carousel, accordion) will work with Bootstrap 5

## Original .NET Structure

The original application had:
- ASP.NET Web Forms (.aspx pages)
- Master page (sbjsm.master) for layout
- Server-side code-behind files (.aspx.cs)
- Static HTML pages for some sections

All of these have been converted to React components while maintaining the same visual appearance and functionality.

