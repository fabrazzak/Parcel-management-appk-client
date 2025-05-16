import { useState, useEffect } from "react";

const useTheme = () => {
    // Get the saved theme from localStorage or default to light
    const storedTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(storedTheme);

      // Dark mode state
      const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

      // Toggle theme
      const toggleDarkMode = () => {
          const newTheme = darkMode ? "light" : "dark";
          setDarkMode(!darkMode);
          localStorage.setItem("theme", newTheme);
          document.documentElement.classList.toggle("dark", !darkMode);
      };
  
      // Apply theme on first load
      useEffect(() => {
          if (darkMode) {
              document.documentElement.classList.add("dark");
          } else {
              document.documentElement.classList.remove("dark");
          }
      }, [darkMode]);
    return { theme, toggleDarkMode,setTheme,darkMode,setDarkMode };
};

export default useTheme;
