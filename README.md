# SCAMHUNTER Public Site

This repository hosts the static site for **SCAMHUNTER**, a project to track and expose crypto scams. The site provides a searchable, sortable database of scammer profiles and includes dedicated pages for public donations, reporting scams, and learning about the project.

## Pages

- **index.html** – Database page with a search bar, chain and status filters, a **Solana quick filter** button, and paginated table. The table lists each scam entry with date, handle, name, platforms, wallet addresses, description, proof links and status.
- **support.html** – Donation page with wallet addresses (Solana, Ethereum, Bitcoin). Includes copy buttons and direct payment links (Solana Pay, EIP‑861/EIP‑681, Bitcoin URI). Update the wallet addresses in this file to your own if you wish to receive support.
- **report.html** – Report page with a link to a scam report form (replace the placeholder link with your own Google Form or other reporting tool).
- **about.html** – About page describing SCAMHUNTER’s mission and providing contact information and dispute resolution process.

## Assets

- **styles.css** – Styling for all pages including header navigation, layout, controls, table styles, donation cards, and footer.
- **script.js** – Client‑side script that loads `data.json`, handles search and filter interactions, implements the Solana quick filter, renders the table and pagination, and updates the footer year.
- **data.json** – JSON file containing the scam entries. Each entry includes date, scammer handle, name, platforms, wallets (chain and address), proof links, description, and status.

## Hosting

This is a static site. It can be hosted on GitHub Pages or any static hosting platform. For GitHub Pages, open the repository settings, navigate to **Pages**, set the source to the `main` branch and root directory, and save. Your site will be served from `https://<username>.github.io/scamhunter-db-site/` or a custom domain if configured.

To use a custom domain (e.g., via GoDaddy), add a CNAME record pointing your domain to `<username>.github.io` and create a `CNAME` file in the repository root containing your domain.

## Updating Data

To add or update scam entries, edit `data.json`. Each entry is an object with the fields described above. Once committed, changes are reflected on the site automatically.

To update donation addresses, edit `support.html` and replace the placeholder addresses with your own.

To change the report form link, edit `report.html` and replace the `href` value in the anchor tag.

Feel free to modify the content, styles, or functionality by editing the corresponding files and committing your changes.
