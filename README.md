# 👽 Culture Companion – Evolving To-Do Alien

Culture Companion is a minimalistic, single-page to-do app that playfully evolves an alien mascot based on the user's cultural consumption. Whether you're completing books, movies, series, or music-related tasks, your alien will grow and change depending on what you're most engaging with.

---

## 🌟 Features

- ✅ **Track your personal media goals**: Add to-dos related to books, movies, music, or series.
- 👾 **Dynamic alien evolution**: The alien mascot updates based on your progress and dominant category.
- 🧠 **Cultural profile builder**: See which cultural domain you’ve focused on most.
- ⚡ **Fully client-side**: Everything runs in your browser – no sign-ups, no servers.
- 📦 **Zero-friction onboarding**: Start adding tasks and generating recommendations instantly.
- 🎖️ **Progress feedback**: Track how many tasks you’ve completed with visual hints and feedback.
- 🥚 **Easter egg**: Watch out for a fun surprise if you complete everything...

---

## 🖼️ Mascot Image System

There are **9 total alien images** used in the app:

- `alien_base`
- `alien_serie1`, `alien_serie2`
- `alien_movie1`, `alien_movie2`
- `alien_book1`, `alien_book2`
- `alien_music1`, `alien_music2`

🧩 The image that appears is dynamically chosen depending on the **dominant media category** completed and whether the user has made **light** or **heavy** progress in that category.


## 🎖 Diversifiers Applied

✅ **Edge-Only** – Fully client-side with all data stored in localStorage.

✅ **Zero-Friction Onboarding** – Add a task, check it off, and get a recommendation in <30s.

✅ **XP Tracker** – The alien mascot evolves based on your completed content.

✅ **Data Steward** – All your data is kept private in your browser only.

✅ **Accessibility First** – Fully navigable via keyboard and screen readers.


---

## 🛠️ Built With

- [Vercel's v0.dev AI builder](https://v0.dev/chat/5JymOdoj9vi)
- [Deploy Link](https://v0-single-page-to-do-app.vercel.app/)
- React (via Vercel's auto-generated setup)
- No backend – uses `localStorage` for persistence

---

## ✨ AI Collaborators

### 🤖 Image Generation
All alien mascots were generated using **Gemini**, with the following shared design chats:
- https://g.co/gemini/share/8ee42c59d30b
- https://g.co/gemini/share/ff17e7e26fe9

### 🤖 Logic, UX, and Prompt Engineering
Prompt iteration, evolution logic, and app enhancements were refined through the following ChatGPT conversation:
- https://chatgpt.com/c/6838b840-19a0-8009-aae4-730c188853aa

---

## 🎖 Diversifiers Applied (Buildspace Build Challenge)

This app was created with Buildspace's **build-a-week** structure in mind and includes the following Diversifiers:

| Category         | Diversifier              | Description |
|------------------|--------------------------|-------------|
| 💾 Edge-Only     | Client-side Only         | Fully offline after load using `localStorage`. |
| ⚡ Zero-Friction  | 30s Onboarding           | User can interact meaningfully in under 30 seconds. |
| 🎮 XP Tracker     | Progress Visuals         | Mascot evolves based on completed tasks. |
| 🔒 Data Steward   | Transparent Data Usage   | Modal clearly explains that no data is uploaded. |
| 🎉 Delight Detail | Culture Easter Egg       | Special message appears after full completion. |
| ♿ Accessibility  | Keyboard/Screenreader    | Basic navigation and ARIA labels included. |

---

## 🚀 Getting Started (Local Development)

Clone the repo:

```bash
git clone https://github.com/your-username/culture-companion.git
cd culture-companion
npm install
npm run dev
