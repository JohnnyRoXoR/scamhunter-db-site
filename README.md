SCAMHUNTER Public Site

This repository contains the static site for SCAMHUNTER, a project to track and expose crypto scams. The site features a searchable, sortable table of scam entries and includes filters, search, and pagination.

Files:
- index.html: The main page of the site with markup for the header, controls, table, and pagination.
- styles.css: The CSS styling for the site.
- script.js: The JavaScript logic to fetch data from data.json, filter, search, sort, and render the table and pagination.
- data.json: The JSON file containing the scam entries. Each entry includes a date, scammer name/handle, platforms, wallet addresses, proof links, description, and status.

Hosting:
This site is a static site and can be hosted using GitHub Pages or any static hosting platform. To enable GitHub Pages, go to the repository settings on GitHub, scroll to the "Pages" section, select the "main" branch as the source and set the root directory. Once enabled, the site will be available at the provided GitHub Pages URL.

Updating the data:
To add new scam entries, edit data.json and add an object for each new scam with the required fields. The changes will be reflected on the site once the file is committed and the site is redeployed.
