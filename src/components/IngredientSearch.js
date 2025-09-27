import React, { useState } from 'react';
import { Search, ArrowLeft, Check } from 'lucide-react';
import { allIngredients } from '../data/dishes';

const IngredientSearch = ({ onSearch, onBack }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [customIngredient, setCustomIngredient] = useState('');

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const addCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      setSelectedIngredients(prev => [...prev, customIngredient.trim()]);
      setCustomIngredient('');
    }
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(prev => prev.filter(item => item !== ingredient));
  };

  const handleSearch = () => {
    if (selectedIngredients.length > 0) {
      onSearch(selectedIngredients);
    }
  };

  return (
    <div className="ingredient-search fade-in">
      <div className="search-header">
        <h1>Поиск по ингредиентам</h1>
        <p>Выберите продукты, которые есть у вас дома</p>
      </div>

      <div className="search-content">
        <div className="selected-ingredients">
          <h3>Выбранные ингредиенты:</h3>
          {selectedIngredients.length > 0 ? (
            <div className="ingredient-tags">
              {selectedIngredients.map((ingredient, index) => (
                <span key={index} className="tag selected-tag">
                  {ingredient}
                  <button 
                    className="remove-btn"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="no-ingredients">Пока ничего не выбрано</p>
          )}
        </div>

        <div className="custom-ingredient">
          <h3>Добавить свой ингредиент:</h3>
          <div className="input-group">
            <input
              type="text"
              className="form-input"
              placeholder="Введите название продукта и нажмите Enter..."
              value={customIngredient}
              onChange={(e) => setCustomIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
            />
          </div>
        </div>

        <div className="search-actions">
          <button 
            className="btn btn-large"
            onClick={handleSearch}
            disabled={selectedIngredients.length === 0}
          >
            <Search size={20} />
            Найти блюда ({selectedIngredients.length})
          </button>
        </div>

        <div className="ingredients-list">
          <h3>Или выберите из списка:</h3>
          <div className="checkbox-group">
            {allIngredients.map((ingredient, index) => (
              <div 
                key={index}
                className={`checkbox-item ${selectedIngredients.includes(ingredient) ? 'checked' : ''}`}
                onClick={() => toggleIngredient(ingredient)}
              >
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => {}}
                />
                <span>{ingredient}</span>
                {selectedIngredients.includes(ingredient) && (
                  <Check size={16} className="check-icon" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ingredient-search {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .search-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .search-header h1 {
          margin: 16px 0 8px 0;
          font-size: 2.2rem;
        }
        
        .search-header p {
          font-size: 1.1rem;
          color: #CCCCCC;
          margin-bottom: 32px;
        }
        
        .search-content {
          background: #333333;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .selected-ingredients {
          margin-bottom: 32px;
        }
        
        .ingredient-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        
        .selected-tag {
          background: #FFFFFF;
          color: #222222;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }
        
        .remove-btn {
          background: none;
          border: none;
          color: #222222;
          font-size: 18px;
          cursor: pointer;
          padding: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .remove-btn:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        
        .no-ingredients {
          color: #888888;
          font-style: italic;
          margin-top: 12px;
        }
        
        .custom-ingredient {
          margin-bottom: 32px;
        }
        
        .input-group {
          margin-top: 12px;
        }
        
        .input-group .form-input {
          width: 100%;
        }
        
        .ingredients-list {
          margin-bottom: 32px;
        }
        
        .checkbox-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-top: 16px;
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: #444444;
          border-radius: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          color: #FFFFFF;
          font-weight: 500;
        }
        
        .checkbox-item:hover {
          background: #555555;
        }
        
        .checkbox-item.checked {
          background: #FFFFFF;
          color: #222222;
        }
        
        .checkbox-item input[type="checkbox"] {
          margin-right: 12px;
          transform: scale(1.2);
        }
        
        .check-icon {
          position: absolute;
          right: 16px;
          color: #667eea;
        }
        
        .search-actions {
          text-align: center;
        }
        
        .search-actions .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        
        @media (max-width: 768px) {
          .search-content {
            padding: 20px;
          }
          
          
          .checkbox-group {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          
          .checkbox-item {
            padding: 12px;
            min-height: 44px;
          }
          
          .ingredient-tags {
            gap: 6px;
          }
          
          .selected-tag {
            padding: 6px 12px;
            font-size: 13px;
          }
        }
        
        @media (max-width: 428px) {
          .search-content {
            padding: 16px;
          }
          
          .search-header h1 {
            font-size: 1.5rem;
          }
          
          .search-header p {
            font-size: 14px;
          }
          
          .checkbox-item {
            padding: 14px;
            font-size: 14px;
          }
          
          .selected-tag {
            padding: 4px 8px;
            font-size: 12px;
          }
          
          .remove-btn {
            width: 16px;
            height: 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default IngredientSearch;
