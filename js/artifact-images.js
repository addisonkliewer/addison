/*
 * Shared artifact hero + gallery image system.
 *
 * This is the ONE place that knows how to render an artifact page's hero
 * composition image and supporting gallery. Individual artifact pages do
 * NOT contain this markup — they just carry:
 *   1. data-artifact-slug="<slug>" on <body>
 *   2. an empty <div id="artifact-hero-slot"></div> between the Artifact
 *      Brief section and the Artifact Story section
 *   3. an empty <div id="artifact-gallery-slot"></div> near the bottom,
 *      before any related/closing content
 *   4. <script src="../js/artifact-images.js"></script> before </body>
 *
 * To add real images to an artifact later, edit ONLY artifactImageRegistry
 * below — never the page's HTML layout.
 */
(function () {
  "use strict";

  // Applied to any artifact record that doesn't specify a field, and to any
  // slug with no registry entry at all. This is what makes bulk migration
  // safe: every artifact page renders correctly (with placeholders) the
  // moment it's wired up, even before its registry entry exists.
  var defaultArtifactImages = {
    heroImage: null,
    galleryImages: [],
    galleryPlaceholderCount: 3
  };

  // Single content registry for artifact hero/gallery images, keyed by slug
  // (the value of each page's data-artifact-slug attribute).
  var artifactImageRegistry = {
    // Add real per-artifact images here as they're ready. Any slug not
    // listed falls back to defaultArtifactImages above.
    "releasehub": {
      heroImage: {
        src: "../images/artifacts/releasehub/hero.webp",
        alt: "The Release Hub page showing the release announcement for the 4.8 Trail Mix Sundae update",
        caption: ""
      },
      galleryImages: [
        {
          src: "../images/artifacts/releasehub/gallery-01.webp",
          alt: "The article update list within the Release Hub",
          caption: ""
        },
        {
          src: "../images/artifacts/releasehub/gallery-02.webp",
          alt: "The footer section of the Release Hub page",
          caption: ""
        }
      ],
      galleryPlaceholderCount: 0
    }
  };

  function getArtifactRecord(slug) {
    var record = artifactImageRegistry[slug] || {};
    return {
      heroImage: record.heroImage || defaultArtifactImages.heroImage,
      galleryImages: record.galleryImages || defaultArtifactImages.galleryImages,
      galleryPlaceholderCount:
        typeof record.galleryPlaceholderCount === "number"
          ? record.galleryPlaceholderCount
          : defaultArtifactImages.galleryPlaceholderCount
    };
  }

  // Reusable image-protection component (vanilla-JS equivalent of the
  // React <ProtectedArtifactImage> pattern). Applied to every real hero
  // and gallery <img> — nowhere else on the site.
  function protectImage(img) {
    img.setAttribute("draggable", "false");
    img.classList.add("protectedArtifactImage");
    img.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });
    img.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  }

  function buildFigure(image, extraClass) {
    var figure = document.createElement("figure");
    figure.className = extraClass;

    var img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt || "";
    protectImage(img);
    figure.appendChild(img);

    if (image.caption) {
      var figcaption = document.createElement("figcaption");
      figcaption.className = "artifact-image-caption";
      figcaption.textContent = image.caption;
      figure.appendChild(figcaption);
    }
    return figure;
  }

  function buildHeroPlaceholder(title) {
    var wrap = document.createElement("div");
    wrap.className = "artifact-hero-placeholder";

    var label = document.createElement("span");
    label.className = "artifact-placeholder-label";
    label.textContent = "Hero Composition Placeholder";

    var titleEl = document.createElement("span");
    titleEl.className = "artifact-placeholder-title";
    titleEl.textContent = title;

    var meta = document.createElement("span");
    meta.className = "artifact-placeholder-meta";
    meta.textContent = "Recommended ratio: 16:10";

    var note = document.createElement("span");
    note.className = "artifact-placeholder-note";
    note.textContent = "Final recreated artifact preview will appear here.";

    wrap.appendChild(label);
    wrap.appendChild(titleEl);
    wrap.appendChild(meta);
    wrap.appendChild(note);
    return wrap;
  }

  function buildGalleryPlaceholder(index) {
    var wrap = document.createElement("div");
    wrap.className = "artifact-gallery-placeholder";

    var label = document.createElement("span");
    label.textContent = "Supporting Image " + index;
    wrap.appendChild(label);
    return wrap;
  }

  function renderHero(slot, record, title) {
    if (!slot) return;

    var container = document.createElement("div");
    container.className = "artifact-hero";

    if (record.heroImage && record.heroImage.src) {
      container.appendChild(buildFigure(record.heroImage, "artifact-hero-media"));
    } else {
      container.appendChild(buildHeroPlaceholder(title));
    }

    slot.appendChild(container);
  }

  function renderGallery(slot, record) {
    if (!slot) return;

    var images = record.galleryImages || [];
    var placeholderCount = Math.min(Math.max(record.galleryPlaceholderCount || 0, 0), 5);
    var count = images.length > 0 ? Math.min(images.length, 5) : placeholderCount;

    if (count === 0) return;

    var eyebrow = document.createElement("span");
    eyebrow.className = "eyebrow artifact-gallery-eyebrow";
    eyebrow.textContent = "Supporting Images";
    slot.appendChild(eyebrow);

    var container = document.createElement("div");
    container.className = "artifact-gallery";
    container.setAttribute("data-count", String(count));

    if (images.length > 0) {
      images.slice(0, 5).forEach(function (image) {
        container.appendChild(buildFigure(image, "artifact-gallery-item"));
      });
    } else {
      for (var i = 1; i <= count; i++) {
        var item = document.createElement("div");
        item.className = "artifact-gallery-item artifact-gallery-item--placeholder";
        item.appendChild(buildGalleryPlaceholder(i));
        container.appendChild(item);
      }
    }

    slot.appendChild(container);
  }

  function init() {
    var slug = document.body.getAttribute("data-artifact-slug");
    if (!slug) return;

    var record = getArtifactRecord(slug);
    var titleEl = document.querySelector("h1");
    var title = titleEl ? titleEl.textContent.trim() : slug;

    renderHero(document.getElementById("artifact-hero-slot"), record, title);
    renderGallery(document.getElementById("artifact-gallery-slot"), record);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
