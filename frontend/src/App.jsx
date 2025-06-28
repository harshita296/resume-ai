import React, { useState, useEffect } from "react";
import ResumeEditor from "./components/ResumeEditor";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ✨ Resume Editor
          </h2>
        </div>
        <ResumeEditor />
      </div>
    </div>
  );
};

export default App;
