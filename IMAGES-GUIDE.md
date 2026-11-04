# Where to put your photos

All pictures live in the folder **`assets/img/`**.
Right now every picture is a coloured placeholder that **prints its own file name and where it shows on the site**.

## How to replace a photo (3 steps)
1. Find the placeholder file in `assets/img/` (names below).
2. Save your photo with **exactly the same name** (for example `g1.jpg`) and paste it into the same folder, choosing **Replace**.
3. Refresh the website. Done. You do not need to touch any code.

> Your photo must end in `.jpg`. If it is a `.png`, either rename it to `.jpg` or change the name in `index.html`.
> Tip: keep each photo under 300 KB so the site opens fast on phones.

**The top of the home page (the first screen) needs no photos at all** – it is drawn with colours, a blossom branch and hills.

## Which file = which place

| File (in `assets/img/`) | Where it shows | Best shape |
|---|---|---|
| `logo.svg` | Logo, centre of the top bar and in the footer (a `logo.png` also works – change the name in the HTML) | square |
| `about.jpg` | Home page, **About** section – big arch photo | portrait 800×1000 |
| `gallery/g1.jpg` … `g8.jpg` | Home page, **Gallery** section (tap to enlarge) | any shape, 800px+ wide |
| `avatar.jpg` | **Instagram** section – round profile photo | square 400×400 |
| `reel1.jpg`, `reel2.jpg`, `reel3.jpg` | **Instagram** section – the three reel covers | tall 540×960 |

**Services have no pictures** – the Services cards and price list are text only, so there is no "services" or "nails" photo to replace. (The gallery can include nail photos if you like – just save one as `g5.jpg`.)

## Other things you can edit
- Instagram name, email, phone, addresses, hours, service names and prices → `js/data.js`
- Your reel links → in `index.html`, find `reel` and paste the Instagram link into each `href`
- Testimonials and the Instagram numbers → `index.html`
