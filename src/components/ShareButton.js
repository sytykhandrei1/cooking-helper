import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

const ShareButton = ({ iconOnly = false }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      // Используем Web Share API если доступен (мобильные устройства)
      try {
        await navigator.share({
          title: 'Помощник повара',
          text: 'Попробуй это приложение для выбора блюд по ингредиентам!',
          url: url
        });
      } catch (err) {
        // Пользователь отменил или произошла ошибка
        console.log('Share cancelled or error:', err);
      }
    } else {
      // Fallback для десктопа - копируем ссылку в буфер обмена
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <button 
      className={`btn btn-secondary share-btn ${iconOnly ? 'icon-only' : ''}`}
      onClick={handleShare}
      aria-label={copied ? 'Скопировано' : 'Поделиться'}
      title={copied ? 'Скопировано' : 'Поделиться'}
    >
      {iconOnly ? (
        copied ? <Check size={20} /> : <Share2 size={20} />
      ) : (
        copied ? (
          <>
            <Check size={20} />
            Скопировано!
          </>
        ) : (
          <>
            <Share2 size={20} />
            Поделиться
          </>
        )
      )}
      
      <style>{`
        .share-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .share-btn:hover {
          background: #444444;
          transform: translateY(-1px);
        }

        .share-btn.icon-only {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          padding: 10px;
          justify-content: center;
        }
        
        @media (max-width: 428px) {
          .share-btn {
            font-size: 13px;
            padding: 10px 14px;
          }
          .share-btn.icon-only {
            width: 40px;
            height: 40px;
            padding: 8px;
          }
        }
      `}</style>
    </button>
  );
};

export default ShareButton;


