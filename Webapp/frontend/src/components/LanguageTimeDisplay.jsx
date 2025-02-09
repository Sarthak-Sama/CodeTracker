import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/Context";

const LanguageTimeDisplay = ({ langDataArray, formatTime }) => {
  const { formatLanguage, allowedLanguages } = useContext(UserContext);

  // Only display languages whose name is in the allowedLanguages list and daily_time > 0.
  const filteredLanguages = langDataArray.filter(
    (langData) =>
      allowedLanguages.includes(langData.language.trim().toLowerCase()) &&
      langData.daily_time > 5 * 60 * 1000 // 5 minutes
  );

  const [selectedLang, setSelectedLang] = useState(
    filteredLanguages[0] || null
  );

  useEffect(() => {
    if (filteredLanguages && filteredLanguages.length > 0) {
      setSelectedLang(filteredLanguages[0]);
    } else {
      setSelectedLang(null);
    }
  }, [langDataArray]);

  return (
    <div>
      <h2 className="font-[900] text-[5vw] sm:text-[3vw] md:text-[1.5vw] mb-5">
        Language Stats:
      </h2>
      <div className="flex flex-wrap mb-5 gap-4">
        {filteredLanguages.map((langData) => {
          const isSelected = selectedLang && selectedLang._id === langData._id;
          return (
            <div
              key={langData._id}
              onClick={() => setSelectedLang(langData)}
              className={`px-5 py-1 border-2 border-[#212529] rounded-full text-[3.5vw] sm:text-[2vw] md:text-[1vw] ${
                isSelected ? "bg-[#E94545] text-[#f5f5f5]" : " text-[#212529]"
              } transition-all duration-100 ease-in-out`}
            >
              {formatLanguage(langData.language)}
            </div>
          );
        })}
      </div>
      {selectedLang && (
        <div>
          <div>
            <strong>Daily Time:</strong>
            {formatTime(Math.floor(selectedLang.daily_time / 60000))}
          </div>
          <div>
            <strong>Weekly Time:</strong>
            {formatTime(Math.floor(selectedLang.weekly_time / 60000))}
          </div>
          <div>
            <strong>Total Time:</strong>
            {formatTime(Math.floor(selectedLang.total_time / 60000))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageTimeDisplay;
