/* ==========================================================
   Making changes to this file will update your website.  Edit the details below to match your business. 
  data.js  –  EDIT YOUR BUSINESS DETAILS HERE (one place only)
   Everything on the site (links, services, hours) reads from this file.
   by (Kaif)
   ========================================================== */

const SITE = {
  name: "Makeover by Reet",
  whatsapp: "919219163232",                 // 91 + 10 digit number, no + or spaces
  phone: "+91 9219163232",                     // <-- Your phone number
  email: "makeoverbyreet26@gmail.com",        // <-- Your email
  instagram: "makeoverby_reet",              // <-- Your Instagram username (without @)
  branches: [
    { name: "Kannauj",    address: "Munni Palace, near HDFC bank, Makrand Nagar, Kannauj, Uttar Pradesh 209725",    map: "https://maps.app.goo.gl/Bccq1or7VMxU4czK7" },
    { name: "Fatehgarh",  address: "1st Floor, Jio Office, Railway Station Road, near Fatehgarh Railway Station, Sainik Colony, Fatehgarh, Uttar Pradesh 209601",  map: "https://maps.app.goo.gl/fCURiX3eJuSHnwwo9" }
  ],
  /* Working hours. day 0 = Sunday ... 6 = Saturday. Use open:null for a closed day. */
  hours: [
    { day: 1, label: "Monday",    open: "09:00", close: "06:00" },
    { day: 2, label: "Tuesday",   open: "09:00", close: "06:00" },
    { day: 3, label: "Wednesday", open: "09:00", close: "06:00" },
    { day: 4, label: "Thursday",  open: "09:00", close: "06:00" },
    { day: 5, label: "Friday",    open: "09:00", close: "06:00" },
    { day: 6, label: "Saturday",  open: "09:00", close: "06:00" },
    { day: 0, label: "Sunday",    open: "09:00", close: "06:00" }
  ]
};

/* Services – used by the Home page cards, the Services page and the Booking page.
   featured:true  -> shows on the home page (keep it to the 6 main ones)  */
const SERVICES = [
  { id: "makeup", name: "Makeup", featured: true,
    blurb: "Soft, glowing looks for every celebration.",
    items: [["Party makeup", "from ₹1,500"], ["Engagement makeup", "from ₹5,000"], ["Haldi makeup", "from ₹4,500"], ["Bridal makeup", "from ₹8,000"], ["Reception makeup", "Ask us"]] },
  { id: "bridal", name: "Bridal packages", featured: true,
    blurb: "Complete bridal care, from skin to hair to makeup.",
    items: [["Package 1", "₹7,999"], ["Package 2", "₹9,999"], ["Package 3", "₹11,999"], ["Package 4", "₹13,999"], ["Package 5 (MBR Special)", "₹14,999"]] },
  { id: "facial", name: "Facial", featured: true,
    blurb: "Glow-boosting facials for calm, fresh skin.",
    items: [["Hydra Facial", "₹3,500"], ["Milk shake facial", "from ₹2,000"], ["Premium facial", "from ₹2,000"], ["Medi Facial", "₹4,500"]] },
  { id: "hair", name: "Hair", featured: true,
    blurb: "Spa, smoothening and colour for silky hair.",
    items: [["Hair spa", "from ₹750"], ["Smoothening", "₹5,000"], ["Keratin (GK)", "₹10,000"], ["Hair colour", "from ₹2,500"]] },
  { id: "nails", name: "Nails", featured: true,
    blurb: "Pretty hands and feet, finished with tiny art.",
    items: [["Manicure", "from ₹400"], ["Pedicure", "from ₹400"], ["Nail extension", "₹500"], ["Nail art", "₹1,000"]] },
  { id: "semi", name: "Semi-permanent", featured: true,
    blurb: "Tints and glow treatments that last.",
    items: [["Brow tint", "₹1,999"], ["Lash tint", "₹1,999"], ["BB Glow", "₹4,999"], ["Lip tint", "₹3,500"]] },
  { id: "cleanup", name: "Cleanup",
    blurb: "Quick refresh for tired skin.",
    items: [["Hand cleanup", "from ₹450"], ["Steam cleanup", "from ₹500"], ["HF cleanup", "from ₹600"]] },
  { id: "waxing", name: "Waxing",
    blurb: "Gentle, smooth and comfortable.",
    items: [["Normal wax", "from ₹50"], ["Chocolate wax", "from ₹100"], ["Rica wax", "from ₹150"], ["Full body wax", "from ₹1,500"]] },
  { id: "beauty", name: "Beauty basics",
    blurb: "Everyday little treats.",
    items: [["Threading", "from ₹20"], ["Bleach", "from ₹100"], ["D-Tan", "from ₹150"], ["Polishing", "from ₹200"]] }
];
