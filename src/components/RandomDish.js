import React, { useState } from 'react';
import { Shuffle, RefreshCw } from 'lucide-react';

const RandomDish = ({ onGetRandom, onBack, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <div className="random-dish fade-in">
      <div className="random-header">
        <h1>Случайное блюдо</h1>
        <p>Выберите категорию и получите случайное блюдо с гарниром</p>
      </div>

      <div className="random-content">
        <div className="category-tabs">
          <div className="tabs">
            {categories.filter(cat => cat.id !== 'all').map((category) => (
              <button
                key={category.id}
                className={`tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="random-action">
          <button 
            className="btn btn-large random-btn"
            onClick={() => onGetRandom(selectedCategory)}
          >
            <RefreshCw size={24} />
            Выбрать случайное блюдо
          </button>
        </div>

        <div className="random-tips">
          <h3>💡 Советы</h3>
          <ul>
            <li>Убедитесь, что в настройках указаны ваши аллергены</li>
            <li>Включите детский режим, если готовите для ребенка</li>
            <li>Если блюдо не подходит, нажмите кнопку еще раз</li>
            <li>Сохраните понравившиеся рецепты в закладки</li>
          </ul>
        </div>
      </div>

      <style>{`
        .random-dish {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .random-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .random-header h1 {
          margin: 16px 0 8px 0;
          font-size: 2.2rem;
        }
        
        .random-header p {
          font-size: 1.1rem;
          color: #CCCCCC;
          margin-bottom: 32px;
        }
        
        .random-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .category-tabs {
          background: #333333;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .tabs {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        
        .tab {
          padding: 12px 20px;
          background: #444444;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #FFFFFF;
          font-weight: 500;
          font-size: 14px;
          min-width: 80px;
        }
        
        .tab:hover {
          background: #555555;
        }
        
        .tab.active {
          background: #FFFFFF;
          color: #222222;
        }
        
        .random-action {
          background: #333333;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          text-align: center;
        }
        
        /* удалены декоративные блоки */
        
        .random-btn {
          background: #FFFFFF;
          color: #222222;
          border: none;
          padding: 16px 32px;
          border-radius: 25px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 auto;
          width: 100%;
          justify-content: center;
        }
        
        .random-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .random-btn:active {
          transform: translateY(0);
        }
        
        .random-tips {
          background: rgba(51, 51, 51, 0.8);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
        }
        
        .random-tips h3 {
          margin-bottom: 16px;
          color: #FFFFFF;
        }
        
        .random-tips ul {
          list-style: none;
          padding: 0;
        }
        
        .random-tips li {
          padding: 8px 0;
          color: #CCCCCC;
          position: relative;
          padding-left: 24px;
        }
        
        .random-tips li::before {
          content: '•';
          color: #667eea;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        
        @media (max-width: 768px) {
          .random-content {
            gap: 16px;
          }
          
          .category-tabs {
            padding: 16px;
          }
          
          .tabs {
            gap: 6px;
          }
          
          .tab {
            padding: 10px 16px;
            font-size: 13px;
          }
          
          .random-features {
            flex-direction: column;
            gap: 16px;
          }
          
          .random-action {
            padding: 16px;
          }
          
          /* удалены декоративные блоки */
        }
        
        @media (max-width: 428px) {
          .category-tabs {
            padding: 12px;
          }
          
          .tabs {
            gap: 4px;
          }
          
          .tab {
            padding: 8px 12px;
            font-size: 12px;
            min-width: 60px;
          }
          
          .random-action {
            padding: 12px;
          }
          
          /* удалены декоративные блоки */
          
          .random-btn {
            padding: 14px 20px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default RandomDish;
