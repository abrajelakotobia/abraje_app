import { useEffect, useRef } from 'react';

interface ModalProps {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
}

export default function Modal({ children, show = false, onClose }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [show]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0 bg-black/50 backdrop-blur-sm">
            <div
                className="fixed inset-0"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className="relative z-10 w-full max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all overflow-hidden"
            >
                {children}
            </div>
        </div>
    );
}
