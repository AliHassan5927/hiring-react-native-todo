## 🚀 Description

- Implemented a fully functional TODO list app in React Native (TypeScript, React Native CLI).
- Features:
  - Add, edit, delete, and toggle completion of tasks.
  - Floating action button (FAB) for adding tasks, with animated transitions.
  - Edit tasks inline with a pencil icon and save with a checkmark.
  - Confirmation alert before deleting a task.
  - Responsive design for all screen sizes.
  - Local data persistence using AsyncStorage.
  - Clean, modular code with shared components and styles.
- All UI and interactions closely match the provided Figma design.

---

## 💡 Solution Rationale & User Value

- **Structure:** Used a professional folder structure (`src/components`, `src/screens`, `src/hooks`, `src/styles`, `src/types`) for maintainability and scalability.
- **No Navigation:** Did not include any navigation libraries, as the app is a single-screen experience. This keeps the project lightweight and focused.
- **State Management:** Used local state and a custom hook (`useTodos`) for all task logic, as global state was unnecessary for this scope.
- **Persistence:** Chose AsyncStorage for its simplicity and reliability in persisting small amounts of data locally.
- **Responsiveness:** All layouts use Flexbox and relative sizing for a consistent experience across devices.
- **User Experience:**
  - Floating action button for intuitive task creation.
  - Inline editing for quick task updates.
  - Confirmation dialogs to prevent accidental deletions.
  - Subtle animations for a polished, modern feel.
- **Readability:** All code is written in TypeScript with clear types and modular, reusable components.

**End User Benefits:**

- Fast, intuitive, and visually appealing task management.
- No learning curve—everything works as expected.
- Data is always saved, even after closing the app.

---

## 💾 Local Persistence Rationale

- **Method:** Used `@react-native-async-storage/async-storage`.
- **Why:**
  - Simple API, well-supported, and perfect for key-value storage.
  - No need for complex databases or third-party solutions for a TODO list.
- **Trade-offs:**
  - Not suitable for very large datasets, but ideal for this use case.
  - Chose not to use MMKV/SQLite to keep dependencies minimal and setup simple.

---

## 🧠 Global State (if used)

- **Not used.**
- All state is managed locally within the main screen using a custom hook.
- This keeps the app simple and avoids unnecessary complexity.

---

## 💫 Animations (Bonus, if implemented)

- Used React Native’s built-in `LayoutAnimation` for smooth transitions when adding, editing, toggling, or deleting tasks.
- No extra animation libraries were added to keep the project lightweight.

---

## 🎥 Demo Video

Include a link to a short screen recording (e.g. Loom or MP4) showing the app in use.

> Example:  
> https://drive.google.com/file/d/1itZeQtdKWdawvZnybmRxtvtarQP9GEYo/view?usp=sharing

---

## 🛠️ Setup Instructions (if different from README)

- Clone the repo and run `yarn install` in the `tasked` directory.
- Run on iOS: `npx react-native run-ios`
- Run on Android: `npx react-native run-android`
- No additional setup or navigation configuration required.

---

## 📌 Known Limitations / Assumptions

- No navigation or multi-screen support (intentionally omitted for simplicity).
- No cloud sync—data is local to the device.
- No authentication (not required for this assessment).
- All icons are SVG-based and can be swapped for Figma exports if needed.

---

## ✅ Checklist

- [x] Tasks can be added
- [x] Tasks can be viewed
- [x] Tasks can be edited
- [x] Tasks can be marked complete/incomplete
- [x] Tasks can be deleted
- [x] Data is persisted locally on the device
- [x] Local storage method explained
- [x] (Optional) Global state usage explained
- [x] (Optional) Animations added using `LayoutAnimation`
- [x] Demo video included
- [x] Solution rationale & user value explained

---

**Thank you for reviewing my submission! I focused on clean code, a great user experience, and a structure that’s easy to extend. Please let me know if you have any questions or feedback.**
