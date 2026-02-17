# Petaluma Photography

A modern, fast, and responsive static photography portfolio website.

## Features

- **Modern Design**: Clean, minimal interface that puts photography first
- **Fast Performance**: Optimized images with lazy loading
- **Responsive**: Beautiful on all devices (desktop, tablet, mobile)
- **Interactive Lightbox**: Full-screen image viewing with keyboard navigation
- **Smooth Animations**: Professional transitions and effects
- **SEO Ready**: Proper metadata and semantic HTML

## Structure

```
petalumaphotography.com/
├── index.html              # Main gallery page
├── about.html              # About page
├── css/
│   ├── style.css          # Main styles
│   └── about.css          # About page styles
├── js/
│   └── main.js            # Gallery and lightbox functionality
└── Processed Pictures/     # Image galleries
    ├── Singapore/
    ├── Supertrees/
    ├── Temples/
    ├── Changi Airport/
    ├── Koh Samet/
    ├── ICONS Processed/
    ├── Marriot Roof/
    └── TeamLab/
```

## How to Use

### Local Development

Simply open `index.html` in a web browser. For best results, use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have npx)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Adding New Photos

1. Create a new folder in `Processed Pictures/` with your gallery name
2. Name your images with a consistent pattern (e.g., `photo-1.jpg`, `photo-2.jpg`)
3. Update `js/main.js` to add your new gallery:

```javascript
newgallery: {
    folder: 'Processed Pictures/Your Gallery Name',
    count: 10,  // number of images
    prefix: 'photo-'  // prefix before the number
}
```

4. Add a new section in `index.html`:

```html
<section class="gallery-section">
    <h3 class="gallery-title">Your Gallery Name</h3>
    <div class="gallery-grid" data-gallery="newgallery"></div>
</section>
```

### Customization

- **Colors**: Edit CSS variables in `css/style.css` (`:root` section)
- **Fonts**: Change Google Fonts link in HTML files
- **Email**: Update contact email in `index.html` and `about.html`
- **About Content**: Edit `about.html` to personalize your story

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Lazy loading for images
- Optimized CSS with minimal dependencies
- Vanilla JavaScript (no frameworks = faster load)
- Intersection Observer API for efficient loading
- Modern CSS Grid for responsive layouts

## License

© 2026 Petaluma Photography. All rights reserved.
