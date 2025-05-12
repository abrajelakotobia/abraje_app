import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

type Message = {
  id: number;
  content: string;
  created_at: string;
  is_admin: boolean;
  user?: {
    name: string;
    is_admin: boolean;
    avatar?: string;
  };
};

type User = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  avatar?: string;
  phone: string;
  role?: string;
};

type PageProps = {
  auth: {
    user?: User;
  };
  messages?: Message[];
  flash?: {
    success?: string;
    error?: string;
  };
  chat_settings?: {
    require_prechat?: boolean;
    terms_url?: string;
  };
};

type ChatProps = {
  onClose: () => void;
};

export default function Chat({ onClose }: ChatProps) {
  const { props } = usePage<PageProps>();
  const { auth, messages = [], flash, chat_settings } = props;
  const user = auth.user;

  const bottomRef = useRef<HTMLDivElement>(null);
  const [hasJoinedChat, setHasJoinedChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser] = useState<string | null>(null);

  const { data, setData, post, reset, processing, errors } = useForm({
    content: '',
    name: user?.name || '',
    email: user?.email || '',
    accepted: false as boolean,
  });

  const handlePreChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!data.name.trim() || !data.email.trim() || !data.accepted) && chat_settings?.require_prechat) return;
    setHasJoinedChat(true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.content.trim() || processing) return;

    post('/messages', {
      onSuccess: () => reset('content'),
      preserveScroll: true,
    });
  };

  // Auto-scroll et gestion du typing indicator
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Simuler un indicateur de typing pour la démo
    if (data.content.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [messages, data.content]);

  if (!user && chat_settings?.require_prechat) {
    return (
      <div className="fixed bottom-16 right-4 w-full max-w-md bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Chat indisponible</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Fermer le chat"
          >
            ×
          </button>
        </div>
        <p className="text-red-500">Vous devez être connecté pour utiliser le chat.</p>
      </div>
    );
  }

  if (!hasJoinedChat && chat_settings?.require_prechat) {
    return (
      <div className="fixed bottom-16 right-4 w-full max-w-md bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Bienvenue sur notre Assistance</h3>
          <p className="text-sm text-gray-600">Veuillez remplir le formulaire ci-dessous avant de commencer le tchat.</p>
        </div>
        <form onSubmit={handlePreChatSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Nom :</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-mail :</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="accept-terms"
              checked={data.accepted}
              onChange={(e) => setData('accepted', e.target.checked)}
              className="mt-1"
              required
            />
            <label htmlFor="accept-terms" className="text-sm">
              J'accepte les{' '}
              <a href={chat_settings?.terms_url || '#'} className="text-blue-600 hover:underline">
                conditions d'utilisation
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Commencer le chat
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed bottom-16 right-4 w-full max-w-md bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {user?.is_admin ? 'Chat de support' : 'Support client'}
          </h3>
          {isTyping && (
            <p className="text-xs text-gray-500">
              {typingUser || 'Le support'} est en train d'écrire...
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Fermer le chat"
        >
          ×
        </button>
      </div>

      {flash?.success && (
        <div className="mb-2 p-2 bg-green-100 text-green-800 text-sm rounded">
          {flash.success}
        </div>
      )}
      {flash?.error && (
        <div className="mb-2 p-2 bg-red-100 text-red-800 text-sm rounded">
          {flash.error}
        </div>
      )}

      <div className="mb-3 max-h-60 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg ${
              msg.is_admin
                ? 'bg-gray-100 text-gray-800 ml-auto max-w-xs'
                : 'bg-blue-100 text-blue-800 mr-auto max-w-xs'
            }`}
          >
            <div className="flex items-center gap-2">
              {msg.user?.avatar && (
                <img
                  src={msg.user.avatar}
                  alt={msg.user.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <div className="text-xs font-medium">
                {msg.is_admin ? 'Support' : msg.user?.name || 'Vous'}
              </div>
            </div>
            <p className="mt-1">{msg.content}</p>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(msg.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="space-y-2">
        <textarea
          value={data.content}
          onChange={(e) => {
            setData('content', e.target.value);
            // Envoyer un événement "typing" au serveur
          }}
          placeholder="Écrivez votre message..."
          className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
          rows={3}
          disabled={processing}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
        />
        {errors.content && (
          <p className="text-red-500 text-xs">{errors.content}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {data.content.length}/500 caractères
          </span>
          <button
            type="submit"
            disabled={processing || !data.content.trim()}
            className={`px-4 py-2 rounded-md text-sm ${
              processing
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {processing ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </div>
      </form>
    </div>
  );
}
