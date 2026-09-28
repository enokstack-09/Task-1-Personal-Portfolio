# Personal Portfolio Website

A modern, responsive personal portfolio for **V Enok Bilshan — Full Stack Software Developer**. Built with plain HTML, CSS, and JavaScript, with no frameworks or build step.

## Internship Information

- **Organization:** Auspify Technologies
- **Program:** Full Stack Development Internship
- **Assignment:** Task 1 – Personal Portfolio Website (Easy)

## Task

Design and build Home, About, Projects, and Contact pages that showcase personal information, technical skills, projects, and contact details. Implement responsive design, a project showcase, a contact form, and a professional interface; prepare the site for deployment.

## Project Overview

The portfolio uses a dark navy palette, electric cyan accents, layered surfaces, and locally rendered developer and project interface concepts. The content reflects the supplied personal profile and projects. It does not claim employment history, experience durations, skill percentages, or a live deployment.

## Features

- Four connected pages with consistent header and footer
- Sticky glass navigation, active page indicator, mobile menu, and Escape-to-close behavior
- Semantic markup, skip link, visible focus states, labelled form controls, accessible errors, and reduced-motion support
- Six skill categories with technology chips
- Three project showcases with technologies, features, repository and demo placeholders
- Functional All, Full Stack, Frontend, and AI project filters
- Local contact validation and a generated email draft
- Subtle scroll reveals, hover interactions, back-to-top control, and automatic footer year
- Unique titles, descriptions, Open Graph basics, and a local SVG favicon
- Relative asset and page links suitable for a GitHub Pages repository subdirectory
- No remote images, fonts, runtime libraries, tracking, or server dependencies

## Technologies Used

- HTML5: semantic structure and four standalone pages
- CSS3: custom properties, Grid, Flexbox, `clamp()`, responsive breakpoints, and animation
- Vanilla JavaScript: progressive interaction enhancements

The technologies listed in the skills and project sections describe the developer's toolkit. The portfolio itself uses **only HTML, CSS, and JavaScript**.

## Project Structure

```text
Task-1-Personal-Portfolio/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   └── .gitkeep
│   └── icons/
│       └── favicon.svg
├── screenshots/
├── README.md
├── .editorconfig
├── .prettierrc.json
├── .gitignore
└── LICENSE
```

The images folder is reserved for future real project screenshots. Current interface concepts are created with HTML/CSS and are labelled as concepts, rather than presented as screenshots of the real applications.

## Pages

| Page | Contents |
| --- | --- |
| Home | Introduction, developer visual, about and skills previews, featured projects, development process, and contact invitation |
| About | Biography, development interests, complete toolkit, project-led technical journey, learning, and professional strengths |
| Projects | Three detailed showcases, category filters, feature lists, and project links |
| Contact | Contact cards, accessible form validation, success/error states, and email draft link |

## How to Run Locally

Open **index.html** in any modern browser. No package installation or build command is required. All pages also work through the optional **VS Code Live Server** extension: open the folder in VS Code and choose **Open with Live Server** on index.html.

## Responsive Design

Grid and Flexbox layouts reflow into stacked sections on smaller screens. Typography scales with `clamp()`. The hamburger menu appears at 680px and below. The layout targets 320, 375, 425, 768, 1024, and 1440px widths. Main content and navigation remain available without JavaScript; filters and validation require JavaScript.

## Contact Form Behaviour

This is a static website. The form **does not send messages**, call an API, or store submitted details. It checks:

- Required name, email, subject, and message fields, including whitespace-only values
- Email format
- Message length of at least 20 characters after trimming

Invalid fields receive individual error messages linked with `aria-describedby`, `aria-invalid` states, a summary, and focus on the first invalid control. After successful validation the form displays:

> Message validated successfully. Please use the email link to send your message.

The **Open email draft** link uses `mailto:` with an encoded subject and body. It opens the visitor's configured email application, where the visitor must send the message. Editing a field hides the old draft until the form is revalidated. No automatic sending occurs. Browser or mail-client limits may affect very long drafts.

### Contact and Project Links

GitHub social links use [enokstack-09](https://github.com/enokstack-09) and open in a new tab with `noopener noreferrer`. The existing LinkedIn profile and `venokbilshan@gmail.com` address were supplied in the local project and are retained. Real profile links do not carry `data-placeholder`, so JavaScript does not intercept them.

Unavailable project repositories and demos remain clearly marked placeholders. Replace their `href="#"` values only with actual project URLs, then remove `data-placeholder` from that link. The Event & Parking project's current GitHub button points to the owner's profile; a project-specific repository URL can be added when supplied. There are no invented repository or demo URLs. The AI assistant is explicitly labelled as a concept in development.

## Deployment

### GitHub Pages

1. Create a GitHub repository and upload the **contents** of Task-1-Personal-Portfolio to the repository root. Ensure index.html is at that root alongside about.html, projects.html, and contact.html.
2. Commit and push to your default branch (usually main).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select your branch and **/(root)**, then save.
5. Wait for GitHub's deployment to finish and use the URL displayed in Settings → Pages.
6. Check all four pages, asset loading, filters, mobile navigation, and email links on the published site.

There is no build step, environment variable, domain requirement, or backend. Relative paths support GitHub Pages repository subdirectories. No actual public deployment URL is claimed by this project.

## Screenshots

Five automated Edge browser captures are included in screenshots/: desktop captures at 1440px and a mobile Home capture at 375px.

- [home-desktop.png](screenshots/home-desktop.png)
- [about-desktop.png](screenshots/about-desktop.png)
- [projects-desktop.png](screenshots/projects-desktop.png)
- [contact-desktop.png](screenshots/contact-desktop.png)
- [home-mobile.png](screenshots/home-mobile.png)

To update manually, serve or open the site, use a 1440px desktop viewport and 375px mobile viewport, and save browser captures under these names. Scroll through each page before a full-page capture so reveal animations have completed.

## Verification

Automated browser checks were run using Microsoft Edge and Playwright. All four pages passed at **320, 375, 425, 768, 1024, and 1440px** widths. Checks covered:

- No horizontal overflow, correct active navigation and footer year
- Working relative page links and local CSS, JavaScript, and favicon paths
- Mobile menu opening, Escape closing, and navigation to another page
- All four project filters and clear placeholder-link feedback
- Empty form fields, invalid email, short message, valid details, focus on the first error, URL encoding, and hiding outdated drafts
- Navbar scroll styling and back-to-top behavior
- Normal-motion reveals, reduced-motion rendering, and no-JavaScript navigation/content
- Direct file opening and serving from a repository subdirectory
- No browser console, page, or HTTP asset errors
- No horizontal overflow at **200% text size** on all pages at 320, 375, and 1440px

The captures were visually reviewed and logo alignment and enlarged-text overflow were corrected. See [the verification record](screenshots/verification.txt) for individual results. GitHub Pages publishing itself has not been performed.

## Code Style

Source files use consistent four-space indentation and UTF-8 with LF line endings. HTML elements and attributes are arranged on readable lines; CSS uses one declaration per line with spaces between rules; JavaScript uses explicit blocks and clearly separated functions. Whitespace-sensitive code samples use semantic `pre` / `code` elements.

The repository includes `.editorconfig` and `.prettierrc.json` to keep future edits consistent. Formatting is optional development tooling and does not add a runtime dependency. To format from this project folder, use:

```sh
npx --yes --package prettier@3.6.2 prettier --write "*.html" "css/*.css" "js/*.js" ".prettierrc.json"
npx --yes --package prettier@3.6.2 prettier --parser html --write "assets/icons/favicon.svg"
```

## Future Improvements

- Replace placeholders with real social profiles, contact email, repositories, and demos
- Add real project screenshots and results once available
- Connect a real form service with explicit submission handling and spam protection
- Add further completed projects and verified education details

## Author

**V Enok Bilshan**  
Full Stack Software Developer

Created for Auspify Technologies Full Stack Development Internship — Task 1.

## License

MIT — see LICENSE.
