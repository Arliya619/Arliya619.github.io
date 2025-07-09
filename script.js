// Enhanced Loading screen with progress
let loadProgress = 0
const progressFill = document.getElementById("progressFill")
const loaderText = document.querySelector(".loader-text")

const loadingMessages = ["กำลังโหลดพอร์ตโฟลิโอ...", "กำลังเตรียมผลงาน...", "เกือบเสร็จแล้ว...", "พร้อมแล้ว!"]

function updateProgress() {
  loadProgress += Math.random() * 30
  if (loadProgress > 100) loadProgress = 100

  if (progressFill) {
    progressFill.style.width = loadProgress + "%"
  }

  const messageIndex = Math.floor((loadProgress / 100) * (loadingMessages.length - 1))
  if (loaderText) {
    loaderText.textContent = loadingMessages[messageIndex]
  }

  if (loadProgress < 100) {
    setTimeout(updateProgress, 200 + Math.random() * 30)
  }
}

// Start progress simulation
updateProgress()

// Hide loader after page loads
window.addEventListener("load", () => {
  setTimeout(() => {
    loadProgress = 100
    if (progressFill) {
      progressFill.style.width = "100%"
    }
    if (loaderText) {
      loaderText.textContent = loadingMessages[3]
    }

    setTimeout(() => {
      const loader = document.getElementById("loader")
      if (loader) {
        loader.classList.add("hidden")
      }
      // Track page load event
      const trackEvent = window.trackEvent || (() => {})
      trackEvent("page_load", "Performance", "Load Complete", Math.round(performance.now()))
    }, 500)
  }, 800)
})

// Initialize AOS Animation Library
const AOS = window.AOS || {}
if (typeof AOS.init === "function") {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    offset: 100,
  })
}

// Mobile menu toggle
const mobileMenu = document.getElementById("mobileMenu")
const navLinks = document.getElementById("navLinks")

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active")

    // Animate hamburger menu
    const spans = mobileMenu.querySelectorAll("span")
    if (navLinks.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      // Track mobile menu open event
      const trackEvent = window.trackEvent || (() => {})
      trackEvent("click", "Navigation", "Mobile Menu Open", 1)
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
      // Track mobile menu close event
      const trackEvent = window.trackEvent || (() => {})
      trackEvent("click", "Navigation", "Mobile Menu Close", 1)
    }
  })
}

// Close mobile menu when clicking on a link
if (navLinks) {
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("active")
      const spans = mobileMenu.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"

      // Track link click event
      const trackEvent = window.trackEvent || (() => {})
      trackEvent("click", "Navigation", e.target.textContent, 1)
    }
  })
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Header background on scroll
let ticking = false

function updateOnScroll() {
  const header = document.querySelector("header")
  const scrollTop = document.getElementById("scrollTop")
  const scrollY = window.scrollY

  if (scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.98)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    if (scrollTop) scrollTop.classList.add("visible")
  } else {
    header.style.background = "rgba(0, 0, 0, 0.95)"
    header.style.boxShadow = "none"
    if (scrollTop) scrollTop.classList.remove("visible")
  }

  // Parallax effect for hero section
  const hero = document.querySelector(".hero")
  if (hero && scrollY < window.innerHeight) {
    const rate = scrollY * -0.3
    hero.style.transform = `translateY(${rate}px)`
  }

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll)
    ticking = true
  }
})

// Scroll to top functionality
const scrollTopBtn = document.getElementById("scrollTop")
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    // Track scroll to top event
    const trackEvent = window.trackEvent || (() => {})
    trackEvent("click", "Navigation", "Scroll to Top", 1)
  })
}

// Video Modal Functions
function openVideoModal(element) {
  const videoId = element.getAttribute("data-video-id")
  const modal = document.getElementById("videoModal")
  const iframe = document.getElementById("videoFrame")

  if (videoId && modal && iframe) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`
    modal.classList.add("active")
    document.body.style.overflow = "hidden"

    // Track video open event
    const trackEvent = window.trackEvent || (() => {})
    trackEvent("video_open", "Video", `Video ID: ${videoId}`, 1)
  }
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal")
  const iframe = document.getElementById("videoFrame")

  if (modal && iframe) {
    modal.classList.remove("active")
    iframe.src = ""
    document.body.style.overflow = "auto"

    // Track video close event
    const trackEvent = window.trackEvent || (() => {})
    trackEvent("video_close", "Video", "Modal Closed", 1)
  }
}

// Video Modal Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closeVideoModal")
  const modal = document.getElementById("videoModal")

  if (closeBtn) {
    closeBtn.addEventListener("click", closeVideoModal)
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeVideoModal()
      }
    })
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeVideoModal()
    }
  })
})

// Enhanced Contact form handling with AJAX
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const formStatus = document.getElementById("formStatus")
    const submitBtn = e.target.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    // Show loading state
    submitBtn.textContent = "กำลังส่ง..."
    submitBtn.disabled = true
    if (formStatus) formStatus.style.display = "none"

    // Get form data
    const formData = new FormData(this)
    const data = Object.fromEntries(formData)

    // Client-side validation
    if (!data.name || !data.email || !data.message) {
      if (formStatus) {
        formStatus.className = "form-status error"
        formStatus.textContent = "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน"
        formStatus.style.display = "block"
      }
      submitBtn.textContent = originalText
      submitBtn.disabled = false
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      if (formStatus) {
        formStatus.className = "form-status error"
        formStatus.textContent = "กรุณากรอกอีเมลให้ถูกต้อง"
        formStatus.style.display = "block"
      }
      submitBtn.textContent = originalText
      submitBtn.disabled = false
      return
    }

    try {
      // Track form submission attempt
      const trackEvent = window.trackEvent || (() => {})
      trackEvent("form_submit", "Contact", "Form Submission Attempt", 1)

      // Send to Formspree using AJAX
      const response = await fetch("https://formspree.io/f/mblyvgkp", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })

      if (response.ok) {
        // Send to WhatsApp
        const whatsappMessage = encodeURIComponent(`🎬 *New Project Inquiry*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
🎯 *Project:* ${data.project}
💰 *Budget:* ${data.budget}

📝 *Message:*
${data.message}

---
Sent from Arliya Portfolio Website`)

        // Open WhatsApp
        setTimeout(() => {
          window.open(`https://wa.me/85602058665104?text=${whatsappMessage}`, "_blank")
        }, 1000)

        // Open Telegram
        setTimeout(() => {
          window.open(`https://t.me/Ayaya390`, "_blank")
        }, 2000)

        // Show success message
        if (formStatus) {
          formStatus.className = "form-status success"
          formStatus.innerHTML = `
                    <strong>✅ ส่งข้อความสำเร็จ!</strong><br>
                    📧 อีเมลถูกส่งไปยัง angyeeephounsavath@gmail.com แล้ว<br>
                    📱 WhatsApp และ Telegram ถูกเปิดในแท็บใหม่<br>
                    เราจะติดต่อกลับภายใน 24 ชั่วโมง
                `
          formStatus.style.display = "block"
        }

        // Reset form
        this.reset()

        // Track successful submission
        trackEvent("form_submit", "Contact", "Form Submission Success", 1)
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      // Show error message
      if (formStatus) {
        formStatus.className = "form-status error"
        formStatus.textContent = "ขออภัย เกิดข้อผิดพลาดในการส่งอีเมล กรุณาลองใหม่อีกครั้งหรือติดต่อเราโดยตรงทาง WhatsApp หรือ Telegram"
        formStatus.style.display = "block"
      }
      console.error("Form submission error:", error)

      // Track error
      const trackEvent = window.trackEvent || (() => {})
      trackEvent("form_submit", "Contact", "Form Submission Error", 1)
    } finally {
      // Reset button
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
  })
}

// Floating Contact Menu
const contactToggle = document.getElementById("contactToggle")
const contactMenu = document.getElementById("contactMenu")

if (contactToggle && contactMenu) {
  contactToggle.addEventListener("click", () => {
    contactMenu.classList.toggle("active")

    // Track floating contact menu toggle event
    const trackEvent = window.trackEvent || (() => {})
    const isActive = contactMenu.classList.contains("active")
    trackEvent("click", "Floating Contact", isActive ? "Menu Open" : "Menu Close", 1)
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!contactToggle.contains(e.target) && !contactMenu.contains(e.target)) {
      contactMenu.classList.remove("active")
    }
  })
}

// Video Slider Functionality
let currentSlideIndex = 0
const slides = document.querySelectorAll(".video-slide")
const dots = document.querySelectorAll(".dot")

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  // Show current slide
  if (slides[index]) {
    slides[index].classList.add("active")
  }
  if (dots[index]) {
    dots[index].classList.add("active")
  }

  currentSlideIndex = index
}

function changeSlide(direction) {
  let newIndex = currentSlideIndex + direction

  if (newIndex >= slides.length) {
    newIndex = 0
  } else if (newIndex < 0) {
    newIndex = slides.length - 1
  }

  showSlide(newIndex)

  // Track slider navigation event
  const trackEvent = window.trackEvent || (() => {})
  trackEvent("slider_navigation", "Video Slider", `Slide ${newIndex + 1}`, 1)
}

function currentSlide(index) {
  showSlide(index - 1)

  // Track slider dot click event
  const trackEvent = window.trackEvent || (() => {})
  trackEvent("slider_dot", "Video Slider", `Dot ${index}`, 1)
}

// Auto-advance slider
function autoAdvanceSlider() {
  changeSlide(1)
}

// Start auto-advance (every 5 seconds)
let sliderInterval = setInterval(autoAdvanceSlider, 5000)

// Pause auto-advance on hover
const sliderContainer = document.querySelector(".video-slider-container")
if (sliderContainer) {
  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(sliderInterval)
  })

  sliderContainer.addEventListener("mouseleave", () => {
    sliderInterval = setInterval(autoAdvanceSlider, 5000)
  })
}

// Add interactive effects
document.querySelectorAll(".service-card, .video-card, .thumbnail-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.style.transform = "translateY(-10px) scale(1.02)"
    }
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Stats animation
const stats = document.querySelectorAll(".stat-number")
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const text = target.textContent
        const number = Number.parseInt(text)

        if (!isNaN(number)) {
          animateNumber(target, 0, number, 2000)
          // Track stats animation event
          const trackEvent = window.trackEvent || (() => {})
          trackEvent("view", "Stats", "Stats Animation Triggered", number)
        }

        statsObserver.unobserve(target)
      }
    })
  },
  { threshold: 0.5 },
)

stats.forEach((stat) => statsObserver.observe(stat))

function animateNumber(element, start, end, duration) {
  const startTime = performance.now()
  const suffix = element.textContent.replace(/\d+/g, "")

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(start + (end - start) * easeOutQuart)

    element.textContent = current + suffix

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// Language Switcher (if needed)
const langBtn = document.getElementById("langBtn")
const currentLang = document.getElementById("currentLang")
let isEnglish = false

if (langBtn && currentLang) {
  langBtn.addEventListener("click", () => {
    isEnglish = !isEnglish
    currentLang.textContent = isEnglish ? "EN" : "TH"

    // Switch language for all elements with data attributes
    document.querySelectorAll("[data-en][data-th]").forEach((element) => {
      const englishText = element.getAttribute("data-en")
      const thaiText = element.getAttribute("data-th")

      if (englishText && thaiText) {
        element.textContent = isEnglish ? englishText : thaiText
      }
    })

    // Track language switch event
    const trackEvent = window.trackEvent || (() => {})
    trackEvent("language_switch", "UI", isEnglish ? "English" : "Thai", 1)
  })
}

// Smooth reveal animations for elements
function revealOnScroll() {
  const reveals = document.querySelectorAll(".fade-in:not(.visible)")

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)

// Initialize reveal on load
document.addEventListener("DOMContentLoaded", revealOnScroll)

// Keyboard navigation for accessibility
document.addEventListener("keydown", (e) => {
  // Video slider keyboard navigation
  if (e.target.closest(".video-slider-container")) {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      changeSlide(-1)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      changeSlide(1)
    }
  }
})

// Performance optimization: Lazy load videos
const videos = document.querySelectorAll("video[data-src]")
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const video = entry.target
      const src = video.getAttribute("data-src")
      if (src) {
        video.src = src
        video.removeAttribute("data-src")
        videoObserver.unobserve(video)
      }
    }
  })
})

videos.forEach((video) => videoObserver.observe(video))

// Error handling for videos
document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("error", function () {
    console.warn("Video failed to load:", this.src)
    // You could show a fallback image here
  })
})

// Touch/swipe support for mobile slider
let touchStartX = 0
let touchEndX = 0

if (sliderContainer) {
  sliderContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
  })

  sliderContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })
}

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      changeSlide(1)
    } else {
      // Swipe right - previous slide
      changeSlide(-1)
    }

    // Track swipe event
    const trackEvent = window.trackEvent || (() => {})
    trackEvent("swipe", "Video Slider", diff > 0 ? "Next" : "Previous", 1)
  }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Arliya Portfolio loaded successfully!")

  // Track page view event
  const trackEvent = window.trackEvent || (() => {})
  trackEvent("page_view", "Portfolio", "Homepage", 1)
})

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}

// Print styles optimization
window.addEventListener("beforeprint", () => {
  document.body.classList.add("printing")
})

window.addEventListener("afterprint", () => {
  document.body.classList.remove("printing")
})
