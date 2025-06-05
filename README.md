# 🌌 NASA Image Calendar

This project is a calendar-based web application that integrates with two NASA APIs to display astronomical images for each date. It offers a visually engaging experience that updates daily with high-resolution content from space.

## 🚀 Project Description

The application connects to the following **public NASA APIs**:

- **[APOD (Astronomy Picture of the Day)](https://api.nasa.gov/)**: Retrieves the most popular image for each selected calendar date.
- **[EPIC (Earth Polychromatic Imaging Camera)](https://epic.gsfc.nasa.gov/)**: Fetches a daily-updated image of the Earth from NASA's DSCOVR satellite.

## 🗓️ Features

- 📅 **Calendar Integration**: Users can navigate through dates to view the Astronomy Picture of the Day (APOD) corresponding to that date.
- 🌍 **Daily Earth Image**: A second API fetch loads the most recent EPIC image of the Earth.
- 🧠 **Date Management**: The JavaScript `Date` object is used to manage and format dates for API requests.
- 🔍 **Image Details**: When enlarging an image for detail, the application manages resolution and size using the `onload` event to ensure optimal scaling.

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript
- NASA APOD & EPIC APIs
- DOM Manipulation
- Fetch API

## 🎓 Educational Context

This project was developed as part of my training program in web development.  
It served as a practical exercise in working with external APIs, date management, and dynamic content rendering using JavaScript.

**Developed by:** Lucas Ide
