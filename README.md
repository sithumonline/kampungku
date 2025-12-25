# KampungKu Platform Case Study

**WOC7018 Requirements Engineering - Interface Design Assessment**

This project is a React-based mobile application prototype for **KampungKu**, a community-driven service booking platform. It demonstrates key requirements for the Service Booking and Real-Time Worker Tracking modules.

## Modules

### Part A: Service Booking Flow
- **Service List:** Browse available services (Cleaning, Food, Shopping, etc.).
- **Booking:** Schedule services and select dates.
- **Payment:** Mock payment processing with failure handling.
- **Confirmation:** Success screens with booking details.
- **Error Handling:** Alternatives flows like "Payment Failed".

### Part B: Worker & Tracking Module
- **Worker Dashboard:** View assigned jobs and start services.
- **Real-Time Tracking:** GPS tracking interface for monitoring workers.
- **Completion:** Rate and review services.
- **Error Handling:** GPS tracking error states.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd kampungku
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```
   Open `http://localhost:3000` to view the app.

## 📄 Generating the Report

This project includes a script to automatically capture screenshots of all required screens and compile them into Word and PDF reports for submission.

1. Ensure the dev server is running (`pnpm dev`) at port `3000`.
2. Run the generation script:
   ```bash
   node scripts/generate-report.js
   ```
3. Check the output:
   - `report_output/KampungKu_Report.docx`
   - `report_output/KampungKu_Report.pdf`
   - `report_output/screenshots/` (Raw images)

## 🌐 Deployment

This project is configured for **GitHub Pages**.

- **Push to Main:** Any push to the `main` branch triggers a GitHub Action.
- **Live URL:** The app will be deployed to your GitHub Pages URL (e.g., `https://<username>.github.io/kampungku/`).
