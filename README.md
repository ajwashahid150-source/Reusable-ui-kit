<div align="center">

# 🧩 UI Forge

### Reusable UI Components • Built with Vanilla JavaScript

A modern and interactive **Reusable UI Component Kit** built to demonstrate the power of **Component Thinking** using pure HTML, CSS, and JavaScript.

<br>

![HTML5](https://img.shields.io/badge/HTML5-Structure-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Design-Responsive-success?style=for-the-badge)

<br>

### ✨ Build Once. Reuse Everywhere.

</div>

---

## 🌟 Overview

**UI Forge** is a modern and fully interactive **Reusable UI Component Kit** built with **HTML5, CSS3, and Vanilla JavaScript**.

The main purpose of this project is to demonstrate **Component Thinking** by breaking an interface into smaller, reusable, and self-contained components instead of repeatedly writing the same code.

The project includes reusable **Buttons, Cards, Modals, and Toast Notifications**. Each component accepts different parameters and variants, allowing the same function to create multiple UI elements with different styles, content, and behaviors.

This project provides a strong foundation for understanding modern component-based development before moving to frameworks such as React.

---

# 🎯 Project Purpose

The main goal of UI Forge is to understand:

> **How to build reusable UI components instead of repeating the same code.**

Instead of creating separate code for every button, card, modal, or notification, this project uses reusable JavaScript functions.

### ❌ Traditional Approach

Creating separate code for:

- Primary Button
- Secondary Button
- Danger Button
- Different Cards
- Different Modals

### ✅ Component-Based Approach

Using one reusable function with different parameters.

Example:

`createButton({ text: "Delete", variant: "danger" })`

One reusable component can create many different variations simply by changing its parameters.

---

# ✨ Features

## 🔘 Reusable Button Component

UI Forge includes a reusable Button component that accepts different parameters such as button text, variant, and click action.

### Supported Variants

- 🔵 Primary
- ⚪ Secondary
- 🟢 Success
- 🔴 Danger
- 🟣 Outline

The same reusable function can create multiple buttons without duplicating the same HTML structure.

---

## 🃏 Dynamic Card Component

Cards are generated dynamically using a reusable JavaScript function.

Each card can contain different:

- 🎨 Icons or images
- 📝 Titles
- 📄 Descriptions
- 🔗 Footer content
- ✨ Visual variants

This makes the component flexible and easy to reuse throughout the interface.

---

## 🪟 Fully Functional Modal Component

UI Forge includes a reusable and interactive Modal component.

### Modal Features

- ✅ Opens dynamically
- ❌ Close button
- 🚫 Cancel button
- ✔️ Confirm action
- 🖱️ Closes when clicking outside
- 🌑 Dark overlay background
- 🔒 Prevents background interaction
- ✨ Smooth animations

The same Modal component can be reused for different purposes, such as:

- 🗑️ Delete confirmation
- ⚠️ Warning messages
- 📩 Submit confirmation
- 🔐 Logout confirmation
- ℹ️ Important information

---

## 🔔 Toast Notification System

The project also includes a reusable Toast Notification component.

### Supported Toast Types

- 🟢 Success
- 🔴 Error
- 🔵 Info
- 🟡 Warning

### Toast Features

- ⚡ Instant notifications
- ⏱️ Automatic dismissal
- ❌ Manual close button
- 📚 Multiple toast stacking
- ✨ Smooth animations

This component can display different notifications by simply changing the message and type.

---

# 🧠 Component Thinking

Thinking in components changed the way this project is structured by breaking the interface into smaller, reusable pieces instead of repeatedly building similar elements. Each component accepts different parameters, allowing the same function to generate multiple variations without duplicating code. Keeping components self-contained makes the application easier to understand, maintain, and expand in the future. This approach also provides a strong foundation for working with modern component-based frameworks such as React.

---

# ⚙️ How It Works

The application follows a reusable component architecture:

**User Interaction → Event Handler → Reusable Component → Parameters & Variants → Dynamic UI**

Each component receives different data and dynamically creates the required user interface element.

---

# 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| 🌐 HTML5 | Application structure |
| 🎨 CSS3 | Styling and animations |
| ⚡ Vanilla JavaScript | Component functionality |
| 🧩 DOM API | Dynamic UI creation |

---

# 💻 JavaScript Concepts Demonstrated

This project demonstrates several important JavaScript concepts:

### 🧩 Reusable Functions

Reusable functions are used to create each UI component.

### 📦 Objects and Parameters

Component options are passed through JavaScript objects.

### 🎯 Event Handling

User interactions are handled using event listeners.

### 🌐 DOM Manipulation

The application dynamically creates and manages elements using JavaScript DOM methods.

---

# 🔄 Component Reusability

The main strength of UI Forge is code reusability.

One `createButton()` function can create:

- Primary Button
- Success Button
- Danger Button
- Outline Button

One `createModal()` function can create:

- Delete Modal
- Warning Modal
- Confirmation Modal

The same component function can be used repeatedly with different parameters, content, and behaviors.

---

# 📱 Responsive Design

UI Forge is designed to provide a smooth experience across different screen sizes.

| Device | Experience |
|---|---|
| 💻 Desktop | Full component showcase |
| 💼 Laptop | Optimized layout |
| 📟 Tablet | Flexible component arrangement |
| 📱 Mobile | Clean responsive layout |

### Mobile Optimizations

- Components adjust automatically
- Buttons wrap correctly
- Cards stack vertically
- Modals fit inside the viewport
- Toast notifications remain visible
- No unnecessary horizontal scrolling

---

# 📂 Project Structure

reusable-ui-kit/

├── index.html  
├── style.css  
├── script.js  
└── README.md  

### 📄 index.html

Contains the main structure and containers where reusable components are displayed.

### 🎨 style.css

Handles:

- Modern UI styling
- Button variants
- Card layouts
- Modal styling
- Toast styling
- Animations
- Responsive design

### ⚡ script.js

Contains the complete reusable component logic.

Main functions include:

- `createButton()`
- `createCard()`
- `createModal()`
- `showToast()`

---

# 🚀 Getting Started

Follow these simple steps to run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/reusable-ui-kit.git
