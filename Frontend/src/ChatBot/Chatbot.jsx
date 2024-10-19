import { useState } from "react";
import ChatbotIcon from "../assets/chatbot.png";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 p-3 bg-white rounded-full shadow-lg text-white hover:bg-slate-400 focus:outline-none"
      >
        <img src={ChatbotIcon} alt="Chatbot" className="w-8 h-8" />
      </button>

      {/* Chatbot Iframe */}
      {isOpen && (
        <div className="fixed bottom-16 z-50 right-4 w-[90vw] h-[70vh] md:w-[30vw] md:h-[70vh] bg-white shadow-lg rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/ea0b68db-8adf-40b5-a25f-03595aa270ad"
            title="Chatbot"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
