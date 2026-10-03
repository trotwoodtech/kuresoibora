/* ------------------------------------------------------------------
   GALLERY + ACTIVITIES — edit this file to add photos and events.

   To add a photo:
   1. Copy the image into  assets/gallery/   (JPG/WebP, about 1600px wide, under 400 KB)
   2. Add a line to KBI_GALLERY below with src: "assets/gallery/your-file.jpg"
   Categories: "Agriculture", "Education", "Health", "Community"
   Entries with  placeholder: true  show a "photo coming soon" tile.
   Delete the sample entries once you have real photos.
------------------------------------------------------------------- */
window.KBI_GALLERY = [
  { src: "", category: "Community",   caption: "Community meeting (replace with a real photo)",             date: "", placeholder: true },
  { src: "", category: "Agriculture", caption: "Farm visit (replace with a real photo)",                    date: "", placeholder: true },
  { src: "", category: "Education",   caption: "School engagement (replace with a real photo)",             date: "", placeholder: true },
  { src: "", category: "Health",      caption: "Health and nutrition activity (replace with a real photo)", date: "", placeholder: true },
  { src: "", category: "Community",   caption: "Ward listening forum (replace with a real photo)",          date: "", placeholder: true },
  { src: "", category: "Agriculture", caption: "Potato field day (replace with a real photo)",              date: "", placeholder: true }
];

/* Upcoming and recent activities. status: "In planning" | "Confirmed" | "Completed" */
window.KBI_EVENTS = [
  { date: "Date to be announced", title: "Community health and nutrition screening day", place: "Kuresoi South wards", status: "In planning", note: "Being organised with health partners." },
  { date: "Date to be announced", title: "Ward listening forums", place: "Amalo, Keringet, Kiptagich, Tinet", status: "In planning", note: "Residents tell us their priorities in person." },
  { date: "Date to be announced", title: "Farmer field day on better potato practices", place: "Kuresoi South", status: "In planning", note: "With agricultural extension partners." }
];
