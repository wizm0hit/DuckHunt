# Duck Hunt 🦆🎮

A modern, browser-based recreation of the classic NES *Duck Hunt* game, built using vanilla HTML5, CSS3, and JavaScript. 

Inspired by Kenny Yip Coding's tutorial, this version features several custom improvements, refactored logic, and enhanced gameplay mechanics.

## 🚀 Features & Enhancements

While the core mechanics are inspired by the classic game, this repository features significant custom upgrades over basic tutorial implementations:

* **Dynamic Round System:** Randomly spawns either 1 or 2 ducks per round, dynamically altering the difficulty.
* **Intelligent Audio Controller:** Fully managed ambient sound logic. Duck flapping sounds loop smoothly, and quacking triggers at randomized intervals *only* while ducks are active on screen.
* **Context-Aware Dog Animations:** After a round clears, the hunting dog pops up from the bottom of the screen holding either one or two ducks, matching your exact round score.
* **Fully Responsive Canvas:** The game dynamic updates boundaries (`gameWidth` and `gameHeight`) on window resize events to keep the ducks bouncing perfectly within view.
* **Polished Retro Aesthetics:** Features custom retro typography via `@font-face` and a customized crosshair cursor tracking.

## 🛠️ Tech Stack

* **HTML5:** Semantic markup for game rendering structure.
* **CSS3:** Custom cursors, fixed responsive backgrounds, and `@font-face` typography rendering.
* **JavaScript (ES6):** Custom state tracking, collision boundaries, and HTML5 Audio API orchestration.

## 📂 Project Structure

```text
├── assets/
│   ├── audio/          # Game sound effects (shot, quack, flap, score)
│   ├── fonts/          # Retro game typography
│   └── images/         # Game sprites (ducks, dog, background, crosshair)
├── index.html          # Main game page
├── style.css           # Layout, background, and cursor styles
└── script.js          # Core game loop and logic
```

## 🎮 How to Play

### 🌐 Play Instantly Online
Simply visit the live website to start playing right away: 
👉 **[Launch Duck Hunt Live](https://github.com/wizm0hit/DuckHunt/deployments/github-pages)**

---

### 💻 Run Locally (Alternative)
If you prefer to run the project on your machine:
1. Clone or download this repository.
2. Open `index.html` in any modern web browser.

> ⚠️ **Note:** Due to modern browser security policies, you will need to click anywhere on the screen first to allow the game's retro audio track to initialize.

## 📜 Acknowledgments

* This project was built using **Kenny Yip Coding's Duck Hunt Tutorial** as a primary structural reference.
* Code refactoring, optimization for audio states, dynamic resizing, and specific gameplay loop extensions were independently developed.