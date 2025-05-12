import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import Chat from './Chat'; // Ton composant de chat utilisateur

export default function UserChatIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <Chat onClose={() => setIsOpen(false)} />}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
        aria-label="Ouvrir le chat"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
}
