// ============================================================================
// 1️⃣ BUTTON COMPONENT
// ============================================================================
/**
 * Creates and returns a fully functional, reusable button element.
 * @param {Object} params
 * @param {string} params.text - The button text.
 * @param {string} [params.variant='primary'] - Button variant ('primary', 'secondary', 'success', 'danger', 'outline').
 * @param {Function} [params.onClick] - Click event handler.
 * @returns {HTMLButtonElement} The generated button element.
 */
function createButton({ text, variant = 'primary', onClick }) {
  const button = document.createElement('button');
  button.classList.add('btn', `btn-${variant}`);
  button.textContent = text;
  
  // Set accessibility values
  button.setAttribute('type', 'button');

  if (typeof onClick === 'function') {
    button.addEventListener('click', onClick);
  }

  return button;
}

// ============================================================================
// 2️⃣ CARD COMPONENT
// ============================================================================
/**
 * Creates and returns a reusable content card.
 * @param {Object} params
 * @param {string} params.title - Card title.
 * @param {string} params.description - Card description.
 * @param {string} [params.image] - Optional icon emoji or image source path.
 * @param {string|HTMLElement} [params.footer] - Optional text string or DOM element for card footer.
 * @param {string} [params.variant='default'] - Card layout variant ('default', 'featured', 'compact').
 * @returns {HTMLDivElement} The generated card element.
 */
function createCard({ title, description, image, footer, variant = 'default' }) {
  const card = document.createElement('div');
  card.classList.add('card-component', `card-${variant}`);

  // Optional top image/icon visual box
  if (image) {
    const imgBox = document.createElement('div');
    imgBox.classList.add('card-image-box');
    imgBox.textContent = image;
    imgBox.setAttribute('aria-hidden', 'true');
    card.appendChild(imgBox);
  }

  // Content body
  const content = document.createElement('div');
  content.classList.add('card-content');

  const cardTitle = document.createElement('h3');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = title;
  content.appendChild(cardTitle);

  const cardDesc = document.createElement('p');
  cardDesc.classList.add('card-description');
  cardDesc.textContent = description;
  content.appendChild(cardDesc);

  card.appendChild(content);

  // Optional card footer
  if (footer) {
    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');

    if (footer instanceof HTMLElement) {
      cardFooter.appendChild(footer);
    } else {
      cardFooter.textContent = footer;
    }
    
    card.appendChild(cardFooter);
  }

  return card;
}

// ============================================================================
// 3️⃣ MODAL COMPONENT
// ============================================================================
/**
 * Creates, shows, and manages a fully functional overlay dialog modal.
 * Self-destructs upon closure to prevent memory leaks and DOM bloating.
 * @param {Object} params
 * @param {string} params.title - Modal title header.
 * @param {string|HTMLElement} params.content - Text message or DOM element for the modal body.
 * @param {string} [params.confirmText='Confirm'] - Confirm action button text.
 * @param {string} [params.cancelText='Cancel'] - Cancel action button text.
 * @param {Function} [params.onConfirm] - Confirm button callback.
 * @param {Function} [params.onCancel] - Cancel button/dismiss callback.
 */
function createModal({ title, content, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) {
  // Prevent background interaction by adding a scroll lock
  document.body.style.overflow = 'hidden';

  // Backdrop overlay
  const backdrop = document.createElement('div');
  backdrop.classList.add('modal-backdrop');
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');

  // Modal Panel Card
  const panel = document.createElement('div');
  panel.classList.add('modal-panel');

  // Header Block
  const header = document.createElement('div');
  header.classList.add('modal-header');

  const titleEl = document.createElement('h3');
  titleEl.classList.add('modal-title');
  titleEl.textContent = title;
  header.appendChild(titleEl);

  const closeIconBtn = document.createElement('button');
  closeIconBtn.classList.add('modal-close-icon-btn');
  closeIconBtn.innerHTML = '&times;';
  closeIconBtn.setAttribute('aria-label', 'Close modal');
  closeIconBtn.addEventListener('click', handleClose);
  header.appendChild(closeIconBtn);
  panel.appendChild(header);

  // Body Block
  const body = document.createElement('div');
  body.classList.add('modal-body');
  if (content instanceof HTMLElement) {
    body.appendChild(content);
  } else {
    body.textContent = content;
  }
  panel.appendChild(body);

  // Footer Actions Block
  const footer = document.createElement('div');
  footer.classList.add('modal-footer');

  // Reusable Buttons
  const cancelBtn = createButton({
    text: cancelText,
    variant: 'secondary',
    onClick: handleClose
  });

  const confirmBtn = createButton({
    text: confirmText,
    variant: onConfirm && confirmText.toLowerCase().includes('delete') ? 'danger' : 'primary',
    onClick: handleConfirm
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(confirmBtn);
  panel.appendChild(footer);

  backdrop.appendChild(panel);
  document.body.appendChild(backdrop);

  // Focus trap accessibility focus initial shift
  setTimeout(() => confirmBtn.focus(), 50);

  // Animate Open
  // RequestAnimationFrame allows the DOM injection to resolve before transitioning classes
  requestAnimationFrame(() => {
    backdrop.classList.add('active');
  });

  // Modal Closures and Events
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) handleClose();
  });

  // Key Event handlers (e.g. Escape close)
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };
  window.addEventListener('keydown', escapeHandler);

  function cleanUp() {
    window.removeEventListener('keydown', escapeHandler);
    document.body.style.overflow = '';
    backdrop.remove();
  }

  function handleClose() {
    if (typeof onCancel === 'function') onCancel();
    
    backdrop.classList.remove('active');
    
    // Self-destruct modal after transition animation ends
    backdrop.addEventListener('transitionend', cleanUp, { once: true });
    // Safety fallback
    setTimeout(() => {
      if (document.body.contains(backdrop)) cleanUp();
    }, 300);
  }

  function handleConfirm() {
    if (typeof onConfirm === 'function') onConfirm();
    
    backdrop.classList.remove('active');
    backdrop.addEventListener('transitionend', cleanUp, { once: true });
    setTimeout(() => {
      if (document.body.contains(backdrop)) cleanUp();
    }, 300);
  }
}

// ============================================================================
// 4️⃣ TOAST NOTIFICATION COMPONENT
// ============================================================================
/**
 * Renders and displays a dynamic stacking notification alert.
 * Supports automated timing controls and manual button click deletions.
 * @param {Object} params
 * @param {string} params.message - Content text for the notification.
 * @param {string} [params.type='success'] - Toast type ('success', 'error', 'info', 'warning').
 * @param {number} [params.duration=3000] - Duration in milliseconds before automatic exit dismissal.
 */
function showToast({ message, type = 'success', duration = 3000 }) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.classList.add('toast-block', `toast-${type}`);
  toast.setAttribute('role', 'alert');

  // Icon mapping
  const icons = {
    success: '🟢',
    error: '🔴',
    info: '🔵',
    warning: '🟡'
  };

  const iconEl = document.createElement('span');
  iconEl.classList.add('toast-icon');
  iconEl.textContent = icons[type] || '🔔';
  iconEl.setAttribute('aria-hidden', 'true');
  toast.appendChild(iconEl);

  const messageEl = document.createElement('div');
  messageEl.classList.add('toast-message');
  messageEl.textContent = message;
  toast.appendChild(messageEl);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('toast-close-btn');
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label', 'Dismiss alert');
  closeBtn.addEventListener('click', () => dismissToast(toast));
  toast.appendChild(closeBtn);

  // Append new toast to the top or bottom depending on screen view
  container.appendChild(toast);

  // Setup auto-dismiss timeout
  const timeoutId = setTimeout(() => {
    dismissToast(toast);
  }, duration);

  // Store timeout identifier on element for clear-out references
  toast.dataset.timeoutId = timeoutId;
}

/**
 * Handles animate-out and dynamic removal of toast elements.
 * @param {HTMLElement} toast - The target toast element block.
 */
function dismissToast(toast) {
  // Clear any existing active auto-dismisses
  if (toast.dataset.timeoutId) {
    clearTimeout(Number(toast.dataset.timeoutId));
  }

  if (toast.classList.contains('dismissed')) return;
  toast.classList.add('dismissed');

  // Remove toast node from DOM when transition finishes
  toast.addEventListener('animationend', () => {
    toast.remove();
  }, { once: true });
  
  // Safety timeout fallback
  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 400);
}

// ============================================================================
// INITIALIZATION AND DEMO DRIVER LOGIC
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  // Hook up Theme Switch
  const toggleBtn = document.getElementById('theme-toggle');
  toggleBtn.addEventListener('click', toggleTheme);

  // RENDER DEMO CASES
  renderButtonsDemo();
  renderCardsDemo();
  renderModalsDemo();
  renderToastsDemo();
});

/**
 * Loads default theme values from storage or preferences.
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const toggleBtn = document.getElementById('theme-toggle');
  
  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    document.body.classList.add('light-mode');
    toggleBtn.querySelector('.theme-toggle-icon').textContent = '☀️';
  } else {
    document.body.classList.remove('light-mode');
    toggleBtn.querySelector('.theme-toggle-icon').textContent = '🌙';
  }
}

/**
 * Switches between dark and light colors.
 */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  const toggleIcon = document.getElementById('theme-toggle').querySelector('.theme-toggle-icon');
  toggleIcon.textContent = isLight ? '☀️' : '🌙';
}

/**
 * Generates and appends buttons showcase.
 */
function renderButtonsDemo() {
  const container = document.getElementById('buttons-container');
  if (!container) return;

  const btnDefs = [
    { 
      text: 'Get Started', 
      variant: 'primary', 
      onClick: () => showToast({ message: 'Primary button: Get Started clicked!', type: 'success' }) 
    },
    { 
      text: 'Learn More', 
      variant: 'secondary', 
      onClick: () => createModal({
        title: 'Learn More',
        content: 'This UI Component Kit showcases modular thinking using Vanilla JavaScript. Buttons, Cards, Modals, and Toasts are generated dynamically through parameterized functions.',
        confirmText: 'Got It',
        cancelText: 'Close',
        onConfirm: () => showToast({ message: 'Read showcase details!', type: 'success' })
      }) 
    },
    { 
      text: 'Save Changes', 
      variant: 'success', 
      onClick: () => showToast({ message: 'Success button: Save Changes clicked!', type: 'success' }) 
    },
    { 
      text: 'Delete Item', 
      variant: 'danger', 
      onClick: () => createModal({
        title: 'Delete Item',
        content: 'Are you sure you want to delete this specific dashboard entry? This action cannot be undone.',
        confirmText: 'Yes, Delete',
        cancelText: 'Cancel',
        onConfirm: () => showToast({ message: 'Item deleted.', type: 'error' })
      }) 
    },
    { 
      text: 'Cancel', 
      variant: 'outline', 
      onClick: () => showToast({ message: 'Outline button: Cancel clicked!', type: 'info' }) 
    },
    { 
      text: 'Submit', 
      variant: 'success', 
      onClick: () => showToast({ message: 'Success button: Submit clicked!', type: 'success' }) 
    },
    { 
      text: 'Show Modal', 
      variant: 'outline', 
      onClick: () => createModal({
        title: 'Interactive Showcase Modal',
        content: 'This modal is dynamically created using the reusable createModal() component. It locks screen interaction behind a blurred dark backdrop.',
        confirmText: 'Proceed',
        cancelText: 'Cancel',
        onConfirm: () => showToast({ message: 'Modal confirm action executed!', type: 'success' }),
        onCancel: () => showToast({ message: 'Modal dismissed.', type: 'info' })
      }) 
    },
    { 
      text: 'Show Toast', 
      variant: 'primary', 
      onClick: () => showToast({ message: 'Primary button: Show Toast clicked!', type: 'info' }) 
    }
  ];

  btnDefs.forEach(def => {
    const btn = createButton({
      text: def.text,
      variant: def.variant,
      onClick: def.onClick
    });
    container.appendChild(btn);
  });
}

/**
 * Generates and appends cards showcase.
 */
function renderCardsDemo() {
  const container = document.getElementById('cards-container');
  if (!container) return;

  const cardDefs = [
    {
      title: 'Design System',
      description: 'Craft premium design libraries with consistent typography, colors, and layout ratios.',
      image: '🎨',
      variant: 'featured',
      footerText: 'Design tokens defined'
    },
    {
      title: 'Performance Optimization',
      description: 'Maintained 60fps animations with GPU paint acceleration layers and minimal reflows.',
      image: '⚡',
      variant: 'default',
      footerText: 'Optimized score: 100%'
    },
    {
      title: 'Component Architectures',
      description: 'Strict modular elements built completely without React or external script assets.',
      image: '🧩',
      variant: 'compact',
      footerText: 'Independent scope'
    },
    {
      title: 'Data Security Protocols',
      description: 'Shielded against user input XSS threats using text node bindings instead of innerHTML.',
      image: '🔒',
      variant: 'default',
      footerText: 'Secured fields'
    },
    {
      title: 'Adaptive Layouts',
      description: 'Fully responsive designs adapting to desktop grids and singular mobile stack layouts.',
      image: '📱',
      variant: 'featured',
      footerText: 'Mobile first tested'
    },
    {
      title: 'Cloud Pipelines',
      description: 'Static hosting distribution networks ensuring blazing execution deployment limits.',
      image: '🚀',
      variant: 'compact',
      footerText: 'Vercel / Netlify ready'
    }
  ];

  cardDefs.forEach(def => {
    // Generate an action button to serve as the card footer child element (demonstrates nested components!)
    const cardFooterBtn = createButton({
      text: 'View Metric',
      variant: 'outline',
      onClick: () => {
        showToast({
          message: `Inspecting dashboard statistics: ${def.title}`,
          type: 'info'
        });
      }
    });

    const card = createCard({
      title: def.title,
      description: def.description,
      image: def.image,
      footer: cardFooterBtn,
      variant: def.variant
    });

    container.appendChild(card);
  });
}

/**
 * Generates trigger controls for the modal components.
 */
function renderModalsDemo() {
  const container = document.getElementById('modals-container');
  if (!container) return;

  // 1. Delete project modal trigger
  const deleteTrigger = createButton({
    text: 'Delete Project Modal',
    variant: 'danger',
    onClick: () => {
      createModal({
        title: 'Delete Project',
        content: 'Are you sure you want to permanently delete this developer workspace? This action is irreversible.',
        confirmText: 'Delete Workspace',
        cancelText: 'Cancel',
        onConfirm: () => {
          showToast({
            message: 'Project workspace was deleted successfully.',
            type: 'error'
          });
        },
        onCancel: () => {
          showToast({
            message: 'Deletion canceled.',
            type: 'info'
          });
        }
      });
    }
  });

  // 2. Newsletter subscribe trigger
  const subscribeTrigger = createButton({
    text: 'Subscribe Newsletter Modal',
    variant: 'primary',
    onClick: () => {
      createModal({
        title: 'Join Our Newsletter',
        content: 'Get weekly updates containing premium vanilla UI component definitions, optimization design scripts, and layout assets.',
        confirmText: 'Subscribe Now',
        cancelText: 'Maybe Later',
        onConfirm: () => {
          showToast({
            message: 'Thank you for subscribing to UI Forge!',
            type: 'success'
          });
        },
        onCancel: () => {
          showToast({
            message: 'Subscription prompt dismissed.',
            type: 'warning'
          });
        }
      });
    }
  });

  container.appendChild(deleteTrigger);
  container.appendChild(subscribeTrigger);
}

/**
 * Generates trigger controls for toast notices.
 */
function renderToastsDemo() {
  const container = document.getElementById('toasts-container');
  if (!container) return;

  const toastTypes = [
    { text: 'Show Success Toast', variant: 'success', type: 'success', msg: 'Form submitted successfully!' },
    { text: 'Show Error Toast', variant: 'danger', type: 'error', msg: 'System check failed: Connection refused.' },
    { text: 'Show Info Toast', variant: 'outline', type: 'info', msg: 'A new stylesheet patch is ready for review.' },
    { text: 'Show Warning Toast', variant: 'outline', type: 'warning', msg: 'High memory usage: review card nodes layout.' }
  ];

  toastTypes.forEach(def => {
    const btn = createButton({
      text: def.text,
      variant: def.variant,
      onClick: () => {
        showToast({
          message: def.msg,
          type: def.type,
          duration: 3500
        });
      }
    });
    container.appendChild(btn);
  });
}
