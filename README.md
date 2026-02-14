mineralsBroker💎 is my first 'full-stack' application built with raw Node.js modules (fs, http, path) and no frameworks. It's a simple site composed of pure HTML, CSS and JS, which lets a user 'buy' shares of precious minerals. It uses the Metalprice API to pull current prices of these minerals every 24 hours. The user can then view all purchased minerals on the holdings page. (This was made as a Node.js capstone project for the Scrimba Fullstack course).

MetalpriceAPI: https://metalpriceapi.com/

Some main features of the application include:
- Responsive site CSS design which works for all display types (phone, tablet, desktop) by using rem/em units and % widths.
- A node:http server which handles page serving and calls from the front-end.
- Multi-page structure with a nav.
- Utilising API calls.
- A local data base that is updated when minerals are purchases, and when mineral prices change (JSON files)

Future improvements:
- More experimental and professional CSS design.
- Refactoring all code with frameworks (Express, React, Next.js).
- Having a sign-in system + authentication, hence making it catered to a private-single-user experience.
