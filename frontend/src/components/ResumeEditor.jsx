// File: ResumeEditor.jsx
import React, { useState } from "react";
import axios from "axios";

const defaultResume = {
  name: "John Doe",
  summary: "Experienced developer with a passion for web technologies.",
  experience: "3 years of frontend development experience at XYZ Corp.",
  education: "B.Tech in Computer Science from ABC University",
  skills: "React, JavaScript, HTML, CSS",
};

const ResumeEditor = () => {
  const [resume, setResume] = useState(defaultResume);
  const [loadingSection, setLoadingSection] = useState(null);

  const handleChange = (section, value) => {
    setResume({ ...resume, [section]: value });
  };

  const enhanceSection = async (section) => {
    try {
      setLoadingSection(section);
      const res = await axios.post("http://localhost:8000/ai-enhance", {
        section,
        content: resume[section],
      });
      setResume({ ...resume, [section]: res.data.enhanced_content });
    } catch (error) {
      alert("Error enhancing content.");
    } finally {
      setLoadingSection(null);
    }
  };

  const saveResume = async () => {
    try {
      await axios.post("http://localhost:8000/save-resume", resume);
      alert("Resume saved successfully.");
    } catch (err) {
      alert("Error saving resume.");
    }
  };

  const downloadResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.json";
    link.click();
  };

  return (
    <form className="space-y-6">
      {Object.keys(resume).map((section) => (
        <div key={section}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize mb-1">
            {section}
          </label>
          <textarea
            rows="3"
            value={resume[section]}
            onChange={(e) => handleChange(section, e.target.value)}
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y transition"
            placeholder={`Enter ${section}`}
          ></textarea>
          <button
            type="button"
            onClick={() => enhanceSection(section)}
            disabled={loadingSection === section}
            className={`mt-2 text-sm px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition w-full sm:w-auto ${
              loadingSection === section ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loadingSection === section ? "Enhancing..." : "Enhance with AI"}
          </button>
        </div>
      ))}

      <div className="pt-4 space-y-3 sm:space-y-0 sm:flex sm:space-x-4">
        <button
          type="button"
          onClick={saveResume}
          className="w-full sm:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded transition"
        >
          Save Resume
        </button>
        <button
          type="button"
          onClick={downloadResume}
          className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded transition"
        >
          Download Resume (.json)
        </button>
      </div>
    </form>
  );
};

export default ResumeEditor;
