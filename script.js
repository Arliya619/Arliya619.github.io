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
    header.style.background = "rgba(15, 23, 42, 0.98)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    if (scrollTop) scrollTop.classList.add("visible")
  } else {
    header.style.background = "rgba(15, 23, 42, 0.95)"
    header.style.boxShadow = "none"
    if (scrollTop) scrollTop.classList.remove("visible")
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
      if (typeof window.closePhotoModal === "function") {
        window.closePhotoModal()
      }
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
        if (formStatus) {
          formStatus.className = "form-status success"
          formStatus.textContent = "ข้อความของคุณถูกส่งเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด"
          formStatus.style.display = "block"
        }
        this.reset()

        // Track successful form submission
        trackEvent("form_success", "Contact", "Form Submitted Successfully", 1)

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          if (formStatus) formStatus.style.display = "none"
        }, 5000)
      } else {
        throw new Error("Network response was not ok")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      if (formStatus) {
        formStatus.className = "form-status error"
        formStatus.textContent = "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง หรือติดต่อผ่านช่องทางอื่น"
        formStatus.style.display = "block"
      }

      // Track form submission error
      const trackEvent = window.trackEvent || (() => {})
      trackEvent("form_error", "Contact", "Form Submission Error", 1)
    } finally {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
  })
}

// Floating contact menu
const contactToggle = document.getElementById("contactToggle")
const contactMenu = document.getElementById("contactMenu")

if (contactToggle && contactMenu) {
  contactToggle.addEventListener("click", () => {
    contactMenu.classList.toggle("active")
    const isActive = contactMenu.classList.contains("active")

    // Animate toggle button
    contactToggle.style.transform = isActive ? "rotate(45deg)" : "rotate(0deg)"

    // Track floating contact menu event
    const trackEvent = window.trackEvent || (() => {})
    trackEvent("click", "Floating Contact", isActive ? "Menu Opened" : "Menu Closed", 1)
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!contactToggle.contains(e.target) && !contactMenu.contains(e.target)) {
      contactMenu.classList.remove("active")
      contactToggle.style.transform = "rotate(0deg)"
    }
  })
}

// Language switcher functionality
let currentLang = "th"
const langBtn = document.getElementById("langBtn")
const currentLangSpan = document.getElementById("currentLang")

if (langBtn && currentLangSpan) {
  const updateLanguage = (newLang) => {
    currentLang = newLang
    currentLangSpan.textContent = currentLang.toUpperCase()

    // Update all elements with language attributes
    document.querySelectorAll("[data-en][data-th]").forEach((element) => {
      const text = currentLang === "en" ? element.getAttribute("data-en") : element.getAttribute("data-th")
      if (text) {
        // Use innerHTML to support <br> tags in some elements
        if (element.tagName === "P" || element.tagName === "H1" || element.tagName === "H2") {
          element.innerHTML = text
        } else {
          element.textContent = text
        }
      }
    })

    // Save language preference
    localStorage.setItem("preferred-language", currentLang)
  }

  langBtn.addEventListener("click", () => {
    if (langBtn.classList.contains("flipping")) return // Prevent multiple clicks during animation

    langBtn.classList.add("flipping")
    const newLang = currentLang === "th" ? "en" : "th"

    // Track language switch event
    const trackEvent = window.trackEvent || (() => {})
    trackEvent("language_switch", "UI", `Switched to ${newLang.toUpperCase()}`, 1)

    setTimeout(() => {
      updateLanguage(newLang)
    }, 300) // Half of the animation duration (0.6s)

    langBtn.addEventListener("animationend", () => {
      langBtn.classList.remove("flipping")
    }, { once: true })
  })

  // Load saved language preference
  const savedLang = localStorage.getItem("preferred-language")
  if (savedLang && savedLang !== currentLang) {
    updateLanguage(savedLang)
  }
}

// Enhanced performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      const loadTime = perfData.loadEventEnd - perfData.loadEventStart

      // Track performance metrics
      const trackEvent = window.trackEvent || (() => {})
      trackEvent("performance", "Load Time", "Page Load", Math.round(loadTime))

      // Log performance data for debugging
      console.log("Performance Metrics:", {
        loadTime: Math.round(loadTime),
        domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
        firstPaint: Math.round(performance.getEntriesByType("paint")[0]?.startTime || 0),
      })
    }, 0)
  })
}

// Enhanced error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  // Track JavaScript errors
  const trackEvent = window.trackEvent || (() => {})
  trackEvent("javascript_error", "Error", e.message, 1)
})

// Enhanced form validation with real-time feedback
const formInputs = document.querySelectorAll("#contactForm input, #contactForm textarea, #contactForm select")
formInputs.forEach((input) => {
  input.addEventListener("blur", validateField)
  input.addEventListener("input", clearFieldError)
})

function validateField(e) {
  const field = e.target
  const value = field.value.trim()
  let isValid = true
  let errorMessage = ""

  // Remove existing error styling
  field.classList.remove("error")
  const existingError = field.parentNode.querySelector(".field-error")
  if (existingError) {
    existingError.remove()
  }

  // Validation rules
  switch (field.type) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value && !emailRegex.test(value)) {
        isValid = false
        errorMessage = "กรุณากรอกอีเมลให้ถูกต้อง"
      }
      break
    case "text":
      if (field.required && !value) {
        isValid = false
        errorMessage = "กรุณากรอกข้อมูลนี้"
      }
      break
    case "textarea":
      if (field.required && !value) {
        isValid = false
        errorMessage = "กรุณากรอกข้อความ"
      }
      break
  }

  if (!isValid) {
    field.classList.add("error")
    const errorDiv = document.createElement("div")
    errorDiv.className = "field-error"
    errorDiv.textContent = errorMessage
    errorDiv.style.color = "#ef4444"
    errorDiv.style.fontSize = "0.8rem"
    errorDiv.style.marginTop = "0.5rem"
    field.parentNode.appendChild(errorDiv)
  }

  return isValid
}

function clearFieldError(e) {
  const field = e.target
  field.classList.remove("error")
  const existingError = field.parentNode.querySelector(".field-error")
  if (existingError) {
    existingError.remove()
  }
}

// Add error styling to CSS
const errorStyle = document.createElement("style")
errorStyle.textContent = `
  .form-group input.error,
  .form-group textarea.error,
  .form-group select.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
`
document.head.appendChild(errorStyle)

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      observer.unobserve(img)
    }
  })
})

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img)
})

// Enhanced keyboard navigation
document.addEventListener("keydown", (e) => {
  // Close modals with Escape key
  if (e.key === "Escape") {
    closeVideoModal()
    if (typeof window.closePhotoModal === "function") {
      window.closePhotoModal()
    }
  }

  // Navigate through video cards with arrow keys
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const videoCards = document.querySelectorAll(".video-card")
    const currentFocus = document.activeElement
    const currentIndex = Array.from(videoCards).indexOf(currentFocus)

    if (currentIndex !== -1) {
      e.preventDefault()
      let nextIndex
      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % videoCards.length
      } else {
        nextIndex = (currentIndex - 1 + videoCards.length) % videoCards.length
      }
      videoCards[nextIndex].focus()
    }
  }
})

// Make video cards focusable for keyboard navigation
document.querySelectorAll(".video-card").forEach((card, index) => {
  card.setAttribute("tabindex", "0")
  card.setAttribute("role", "button")
  card.setAttribute("aria-label", `Video ${index + 1}`)

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const thumbnail = card.querySelector(".video-thumbnail")
      if (thumbnail) {
        openVideoModal(thumbnail)
      }
    }
  })
})

// Enhanced accessibility features
document.addEventListener("DOMContentLoaded", () => {
  // Enhance form labels
  document.querySelectorAll("label").forEach((label) => {
    const input = document.getElementById(label.getAttribute("for"))
    if (input && input.hasAttribute("required")) {
      label.innerHTML += ' <span aria-label="required" style="color: #ef4444;">*</span>'
    }
  })
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll handler
const debouncedScrollHandler = debounce(updateOnScroll, 10)
window.removeEventListener("scroll", updateOnScroll)
window.addEventListener("scroll", debouncedScrollHandler)

// Enhanced error boundary for better error handling
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason)
  // Track unhandled promise rejections
  const trackEvent = window.trackEvent || (() => {})
  trackEvent("promise_rejection", "Error", event.reason?.message || "Unknown error", 1)
})

// Initialize all functionality when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Arliya Portfolio - Enhanced version loaded successfully!")

  // Track page view
  const trackEvent = window.trackEvent || (() => {})
  trackEvent("page_view", "Navigation", window.location.pathname, 1)
})

window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader")
    if (loader) loader.classList.add("hidden")
  }, 3000)  // บังคับซ่อน loader ใน 3 วิ
})
