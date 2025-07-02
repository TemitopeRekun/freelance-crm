# 📓 Changelog – Freelance CRM

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [0.4.0] – 2025-07-02

### Added

-  Delete client feature with `ConfirmModal`
-  Toast notifications for deletion feedback

### Fixed

-  ClientCard destructuring bug with `onDelete`
-  Modal structure + className cleanup

## [0.3.0] – 2025-06-28

### Added

-  Edit Client modal with Headless UI
-  Real-time `onSnapshot` updates on Firestore

### Changed

-  Replaced `alert()` with `react-hot-toast` for better user feedback

## [0.3.0] – 2025-06-25

### Added

-  Connected ClientForm to Firestore and handled submission
-  Implemented client data fetch using `getDocs()` and listed in UI
-  Styled form and client list using TailwindCSS
-  Fixed input reset issue after submission

## [0.2.0] – 2025-06-23

### Added

-  Built `ClientForm.tsx` with `useState` and TypeScript interface
-  Styled form with TailwindCSS for responsiveness
-  Linked form to `/clients` page for testing
-  Debugged and resolved global CSS conflicts

## [0.1.0] – 2025-06-23

### Added

-  Initialized Next.js project with TypeScript and TailwindCSS
-  Enabled App Router and configured base layout
-  Created project README with roadmap and MVP features
-  Published initial commit to GitHub

---

## Future Releases

-  [0.3.0] – Invoices system with PDF export
-  [0.4.0] – Dashboard with Chart.js visual analytics
-  [0.5.0] – Firebase Auth with route protection
-  [1.0.0] – Full MVP feature set + Vercel deployment
   """
