import React from 'react';
import { ChefHat, Settings as SettingsIcon, Search } from 'lucide-react';
import ShareButton from './ShareButton';

const Header = ({ currentView, onNavigate, childMode, userAllergens, onRandomDish }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => onNavigate('random')}>
          <ChefHat size={32} />
          <span>Помощник повара</span>
        </div>
        
        <div className="header-actions">
          {childMode && (
            <div className="child-mode-indicator">
              👶 Детский режим
            </div>
          )}
          
          {userAllergens.length > 0 && (
            <div className="allergens-indicator">
              ⚠️ Аллергены: {userAllergens.join(', ')}
            </div>
          )}
          
          <button 
            className="btn btn-secondary"
            onClick={() => onNavigate('ingredients')}
          >
            <Search size={20} />
            Поиск по ингредиентам
          </button>
          
          <ShareButton iconOnly />
          
          <button 
            className="btn btn-secondary icon-btn"
            onClick={() => onNavigate('settings')}
            aria-label="Настройки"
            title="Настройки"
          >
            <SettingsIcon size={20} />
          </button>
        </div>
      </div>
      
      <style>{`
        .header {
          background: rgba(51, 51, 51, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 0;
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #667eea;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        
        .logo:hover {
          color: #FFFFFF;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: nowrap;
        }
        
        /* Иконки без текста в шапке */
        .header-actions .icon-btn,
        .header-actions .share-btn {
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          padding: 0;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          gap: 0;
        }
        .header-actions .share-btn {
          gap: 0;
          font-size: 0; /* скрываем текст, иконка по размеру svg */
        }

        .child-mode-indicator,
        .allergens-indicator {
          background: #667eea;
          color: #FFFFFF;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .allergens-indicator {
          background: #e53e3e;
          color: #FFFFFF;
        }
        
        @media (max-width: 768px) {
          .header-content {
            padding: 0 12px;
          }
          .header-actions {
            gap: 8px;
          }
          .logo {
            font-size: 20px;
          }
          .logo span {
            display: none;
          }
        }
        
        @media (max-width: 428px) {
          .header {
            padding: 12px 0;
          }
          .header-content {
            padding: 0 8px;
          }
          .header-actions {
            gap: 8px;
          }
          .header-actions .icon-btn,
          .header-actions .share-btn {
            width: 40px;
            height: 40px;
            min-width: 40px;
            min-height: 40px;
            padding: 0;
          }
          .child-mode-indicator,
          .allergens-indicator {
            max-width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
