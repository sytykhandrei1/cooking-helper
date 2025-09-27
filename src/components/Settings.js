import React, { useState } from 'react';
import { ArrowLeft, Save, AlertTriangle, Baby } from 'lucide-react';
import { allergens } from '../data/dishes';

const Settings = ({ userAllergens, setUserAllergens, childMode, setChildMode, onBack }) => {
  const [tempAllergens, setTempAllergens] = useState([...userAllergens]);
  const [tempChildMode, setTempChildMode] = useState(childMode);

  const toggleAllergen = (allergen) => {
    setTempAllergens(prev => 
      prev.includes(allergen) 
        ? prev.filter(item => item !== allergen)
        : [...prev, allergen]
    );
  };

  const saveSettings = () => {
    setUserAllergens(tempAllergens);
    setChildMode(tempChildMode);
    onBack();
  };

  return (
    <div className="settings fade-in">
      <div className="settings-header">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={20} />
          Назад
        </button>
        <h1>Настройки</h1>
        <p>Настройте приложение под свои потребности</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <div className="section-header">
            <div className="section-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="section-info">
              <h2>Аллергены</h2>
              <p>Укажите продукты, на которые у вас аллергия. Блюда с этими ингредиентами будут исключены из поиска.</p>
            </div>
          </div>

          <div className="allergens-list">
            {allergens.map((allergen, index) => (
              <div 
                key={index}
                className={`allergen-item ${tempAllergens.includes(allergen) ? 'selected' : ''}`}
                onClick={() => toggleAllergen(allergen)}
              >
                <input
                  type="checkbox"
                  checked={tempAllergens.includes(allergen)}
                  onChange={() => {}}
                />
                <span className="allergen-name">{allergen}</span>
                <span className="allergen-icon">⚠️</span>
              </div>
            ))}
          </div>

          {tempAllergens.length > 0 && (
            <div className="selected-allergens">
              <h3>Выбранные аллергены:</h3>
              <div className="allergen-tags">
                {tempAllergens.map((allergen, index) => (
                  <span key={index} className="tag allergen-tag">
                    {allergen}
                    <button 
                      className="remove-btn"
                      onClick={() => toggleAllergen(allergen)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="settings-section">
          <div className="section-header">
            <div className="section-icon">
              <Baby size={24} />
            </div>
            <div className="section-info">
              <h2>Детский режим</h2>
              <p>Включите этот режим, если готовите для детей. Будут показаны только подходящие для детей блюда.</p>
            </div>
          </div>

          <div className="toggle-section">
            <div className="toggle-item">
              <div className="toggle-info">
                <h3>Включить детский режим</h3>
                <p>Показывать только блюда, подходящие для детей</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={tempChildMode}
                  onChange={(e) => setTempChildMode(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {tempChildMode && (
            <div className="child-mode-info">
              <div className="info-icon">👶</div>
              <div className="info-text">
                <h4>Детский режим активен</h4>
                <p>Будут показаны только блюда, адаптированные для детей</p>
              </div>
            </div>
          )}
        </div>

        <div className="settings-actions">
          <button 
            className="btn btn-large"
            onClick={saveSettings}
          >
            <Save size={20} />
            Сохранить настройки
          </button>
        </div>
      </div>

      <style>{`
        .settings {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .settings-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .settings-header h1 {
          margin: 16px 0 8px 0;
        }
        
        .settings-content {
          background: #333333;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .settings-section {
          margin-bottom: 40px;
        }
        
        .section-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .section-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        
        .section-info h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #FFFFFF;
        }
        
        .section-info p {
          color: #CCCCCC;
          line-height: 1.5;
        }
        
        .allergens-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }
        
        .allergen-item {
          display: flex;
          align-items: center;
          padding: 16px;
          background: #444444;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          color: #FFFFFF;
        }
        
        .allergen-item:hover {
          background: #555555;
          transform: translateY(-2px);
        }
        
        .allergen-item.selected {
          background: #e53e3e;
          border: 2px solid #e53e3e;
        }
        
        .allergen-item input[type="checkbox"] {
          margin-right: 12px;
          transform: scale(1.2);
        }
        
        .allergen-name {
          flex: 1;
          font-weight: 500;
        }
        
        .allergen-icon {
          font-size: 16px;
        }
        
        .selected-allergens {
          background: #2d1b1b;
          border: 1px solid #e53e3e;
          border-radius: 12px;
          padding: 16px;
        }
        
        .selected-allergens h3 {
          margin-bottom: 12px;
          color: #e53e3e;
          font-size: 16px;
        }
        
        .allergen-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .allergen-tag {
          background: #e53e3e;
          color: white;
          padding: 6px 12px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        
        .remove-btn {
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          padding: 0;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .remove-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .toggle-section {
          margin-bottom: 24px;
        }
        
        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: #444444;
          border-radius: 12px;
        }
        
        .toggle-info h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #FFFFFF;
        }
        
        .toggle-info p {
          color: #CCCCCC;
          font-size: 14px;
        }
        
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .slider {
          background-color: #667eea;
        }
        
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        
        .child-mode-info {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #1a2332;
          border: 1px solid #667eea;
          border-radius: 12px;
          padding: 16px;
        }
        
        .info-icon {
          font-size: 24px;
        }
        
        .info-text h4 {
          margin-bottom: 4px;
          color: #667eea;
          font-size: 16px;
        }
        
        .info-text p {
          color: #667eea;
          font-size: 14px;
          margin: 0;
        }
        
        .settings-actions {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid #555555;
        }
        
        @media (max-width: 768px) {
          .settings-content {
            padding: 20px;
          }
          
          .allergens-list {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          
          .allergen-item {
            padding: 12px;
            min-height: 44px;
          }
          
          .toggle-item {
            flex-direction: column;
            gap: 16px;
            text-align: center;
            padding: 16px;
          }
          
          .child-mode-info {
            flex-direction: column;
            text-align: center;
            padding: 12px;
          }
          
          .section-header {
            gap: 12px;
          }
          
          .section-icon {
            width: 40px;
            height: 40px;
          }
        }
        
        @media (max-width: 428px) {
          .settings-content {
            padding: 16px;
          }
          
          .allergen-item {
            padding: 14px;
            font-size: 14px;
          }
          
          .allergen-name {
            font-size: 14px;
          }
          
          .toggle-item {
            padding: 12px;
          }
          
          .toggle-info h3 {
            font-size: 15px;
          }
          
          .toggle-info p {
            font-size: 13px;
          }
          
          .section-info h2 {
            font-size: 18px;
          }
          
          .section-info p {
            font-size: 14px;
          }
          
          .child-mode-info {
            padding: 10px;
          }
          
          .info-text h4 {
            font-size: 15px;
          }
          
          .info-text p {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;
