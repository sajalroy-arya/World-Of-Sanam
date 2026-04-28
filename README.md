# 💕 Sanam — For You, Always

A personal anniversary gift website made with love.

---

## 🎨 How to Customize

### 1. Add Your Photos

Drop your photos into the `assets/photos/` folder. Then update the `src` attributes in `index.html`:

**Timeline photos** (the story section):
```html
<img src="assets/photos/your-photo-name.jpg" alt="Our moment">
```

**Gallery photos** (the grid):
```html
<img src="assets/photos/your-gallery-photo.jpg" alt="">
```

### 2. Add Your Songs

Drop your `.mp3` files into the `assets/music/` folder. Then edit the playlist in `script.js`:

```javascript
playlist: [
  {
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    src: "assets/music/tum-hi-ho.mp3",
    colors: ["#c97d94", "#a898c0"]  // gradient colors for the art
  },
  // ... add more songs
],
```

### 3. Edit the Love Letters

Open `index.html` and find the `<!-- ── LOVE LETTERS ── -->` section. Edit the text inside `.letter-paper` to write your own words.

### 4. Edit the Timeline

Update the timeline cards in `index.html` — change the dates, captions, and photos to match your actual story.

### 5. Change the Anniversary Date

In `script.js`, update the start date for the love counter:

```javascript
// Month is 0-indexed! January = 0, October = 9, etc.
anniversaryStart: new Date(2025, 9, 28),
```

---

## 🚀 Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g., `sanam`)
2. Push this code:
   ```bash
   git init
   git add .
   git commit -m "our gift 💕"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sanam.git
   git push -u origin main
   ```
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your site will be live at `https://YOUR_USERNAME.github.io/sanam/`

---

## ⚠️ Notes for GitHub Pages

- **File size limit**: Keep individual files under 100MB. Total repo should be under 1GB.
- **Music files**: MP3s work great. Keep them reasonable in size (5-10MB each).
- **Videos**: For video content, consider embedding YouTube links instead of uploading large video files.
- **Photo optimization**: Resize photos to ~1200px width for best performance.

---

Made with ♥ by Sajal, for Maneef
