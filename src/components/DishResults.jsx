import React, { useState } from 'react';
import { ArrowLeft, ChefHat, Clock, Users, Star } from 'lucide-react';

const DishResults = ({ dishes, onBack, showAnotherRandom = false, onGetAnotherRandom }) => {
  const [selectedDish, setSelectedDish] = useState(null);

  const openRecipe = (dish) => {
    setSelectedDish(dish);
  };

  const closeRecipe = () => {
    setSelectedDish(null);
  };

  return (
    <div className="dish-results fade-in">
      <div className="results-header">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={20} />
          Назад
        </button>
        <h1>Найденные блюда</h1>
        <p>Найдено {dishes.length} блюд</p>
      </div>

      {dishes.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">😔</div>
          <h2>К сожалению, ничего не найдено</h2>
          <p>Попробуйте изменить список ингредиентов или настройки фильтров</p>
        </div>
      ) : (
        <>
        {showAnotherRandom && dishes.length >= 1 && (
          <div className="pair-summary">
            <div className="pair-text">
              {dishes[0]?.name}
              {dishes[1] ? ' + ' + dishes[1]?.name : ''}
            </div>
            <button 
              className="btn btn-large another-random-btn"
              onClick={() => onGetAnotherRandom && onGetAnotherRandom()}
            >
              Еще вариант
            </button>
          </div>
        )}
          <div className="results-grid">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              <div className="dish-header">
                <div className="dish-icon">
                  {dish.isSideDish ? '🥔' : <ChefHat size={24} />}
                </div>
                <div className="dish-info">
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  {dish.category && !dish.isSideDish && (
                    <span className="category-tag">
                      {dish.category === 'breakfast' && '🌅 Завтрак'}
                      {dish.category === 'lunch' && '☀️ Обед'}
                      {dish.category === 'dinner' && '🌙 Ужин'}
                      {dish.category === 'side' && '🥔 Гарнир'}
                    </span>
                  )}
                </div>
              </div>

              <div className="dish-tags">
                {dish.forChildren && (
                  <span className="tag child-friendly">👶 Для детей</span>
                )}
                {dish.isCompleteMatch && (
                  <span className="tag complete-match">✅ Все ингредиенты есть</span>
                )}
                {!dish.isCompleteMatch && dish.missingIngredients && dish.missingIngredients.length > 0 && (
                  <span className="tag missing-ingredients">⚠️ Не хватает: {dish.missingIngredients.join(', ')}</span>
                )}
                {(dish.allergens || []).map((allergen, index) => (
                  <span key={index} className="tag allergen">⚠️ {allergen}</span>
                ))}
              </div>

              <div className="dish-ingredients">
                <h4>Ингредиенты:</h4>
                <div className="ingredients-list">
                  {(dish.ingredients || []).map((ingredient, index) => {
                    const isMatching = dish.matchingIngredients && dish.matchingIngredients.some(match => 
                      match.toLowerCase() === ingredient.toLowerCase() || 
                      ingredient.toLowerCase().includes(match.toLowerCase())
                    );
                    return (
                      <span 
                        key={index} 
                        className={`ingredient-tag ${isMatching ? 'matching' : ''}`}
                      >
                        {ingredient}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="dish-actions">
                <button 
                  className="btn"
                  onClick={() => openRecipe(dish)}
                >
                  Посмотреть рецепт
                </button>
              </div>
            </div>
          ))}
          </div>
        </>
      )}

      {selectedDish && (
        <div className="recipe-modal" onClick={closeRecipe}>
          <div className="recipe-content" onClick={(e) => e.stopPropagation()}>
            <div className="recipe-header">
              <h2>{selectedDish.name}</h2>
              <button className="close-btn" onClick={closeRecipe}>×</button>
            </div>
            
            <div className="recipe-body">
              <div className="recipe-description">
                <p>{selectedDish.description}</p>
              </div>

              <div className="recipe-section">
                <h3>Ингредиенты:</h3>
                <ul className="ingredients-list-detailed">
                  {(selectedDish.ingredients || []).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-section">
                <h3>Рецепт:</h3>
                <div className="recipe-steps">
                  {(selectedDish.recipe || '').split('. ').map((step, index) => (
                    step.trim() && (
                      <div key={index} className="recipe-step">
                        <span className="step-number">{index + 1}</span>
                        <span className="step-text">{step.trim()}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>

              <div className="recipe-tags">
                {selectedDish.forChildren && (
                  <span className="tag child-friendly">👶 Подходит для детей</span>
                )}
                {(selectedDish.allergens || []).map((allergen, index) => (
                  <span key={index} className="tag allergen">⚠️ {allergen}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dish-results {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .results-header {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .results-header h1 {
          margin: 16px 0 8px 0;
        }
        
        .no-results {
          text-align: center;
          background: #333333;
          border-radius: 20px;
          padding: 64px 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .no-results-icon {
          font-size: 64px;
          margin-bottom: 24px;
        }
        
        .no-results h2 {
          margin-bottom: 16px;
          color: #FFFFFF;
        }
        
        .no-results p {
          color: #CCCCCC;
          font-size: 16px;
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .pair-summary {
          background: rgba(51, 51, 51, 0.9);
          border-radius: 16px;
          padding: 16px;
          margin: 0 16px 16px 16px;
          text-align: center;
          font-weight: 600;
          color: #FFFFFF;
        }

        .another-random-btn {
          margin-top: 16px;
          width: calc(100% - 32px);
          margin-left: 16px;
          margin-right: 16px;
        }
        
        .dish-card {
          background: #333333;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        
        .dish-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }
        
        .dish-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .dish-icon {
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
        
        .dish-info h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #FFFFFF;
        }
        
        .dish-info p {
          color: #CCCCCC;
          line-height: 1.5;
        }
        
        .category-tag {
          display: inline-block;
          background: #667eea;
          color: #FFFFFF;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          margin-top: 8px;
        }
        
        .dish-tags {
          margin-bottom: 16px;
        }
        
        .dish-ingredients h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #FFFFFF;
        }
        
        .ingredients-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .ingredient-tag {
          background: #444444;
          color: #FFFFFF;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 14px;
        }
        
        .ingredient-tag.matching {
          background: #22c55e;
          color: #FFFFFF;
          font-weight: 600;
        }
        
        .tag {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          margin-right: 8px;
          margin-bottom: 8px;
        }
        
        .tag.child-friendly {
          background: #fbbf24;
          color: #1f2937;
        }
        
        .tag.complete-match {
          background: #22c55e;
          color: #FFFFFF;
        }
        
        .tag.missing-ingredients {
          background: #f59e0b;
          color: #FFFFFF;
        }
        
        .tag.allergen {
          background: #ef4444;
          color: #FFFFFF;
        }
        
        .dish-actions {
          margin-top: 20px;
        }
        
        .recipe-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .recipe-content {
          background: #333333;
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .recipe-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 0;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 24px;
        }
        
        .recipe-header h2 {
          margin: 0;
          color: #FFFFFF;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #CCCCCC;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .close-btn:hover {
          background: #444444;
        }
        
        .recipe-body {
          padding: 0 24px 24px;
        }
        
        .recipe-description {
          margin-bottom: 24px;
        }
        
        .recipe-description p {
          color: #CCCCCC;
          line-height: 1.6;
        }
        
        .recipe-section {
          margin-bottom: 24px;
        }
        
        .recipe-section h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #FFFFFF;
        }
        
        .ingredients-list-detailed {
          list-style: none;
          padding: 0;
        }
        
        .ingredients-list-detailed li {
          padding: 8px 0;
          border-bottom: 1px solid #555555;
          position: relative;
          padding-left: 24px;
          color: #CCCCCC;
        }
        
        .ingredients-list-detailed li::before {
          content: '•';
          color: #667eea;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        
        .recipe-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .recipe-step {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        
        .step-number {
          background: #667eea;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          flex-shrink: 0;
        }
        
        .step-text {
          color: #CCCCCC;
          line-height: 1.5;
        }
        
        .recipe-tags {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #555555;
        }
        
        @media (max-width: 768px) {
          .results-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .dish-card {
            padding: 16px;
          }
          
          .dish-header {
            gap: 12px;
          }
          
          .dish-icon {
            width: 40px;
            height: 40px;
          }
          
          .dish-info h3 {
            font-size: 18px;
          }
          
          .dish-info p {
            font-size: 14px;
          }
          
          .ingredients-list {
            gap: 6px;
          }
          
          .ingredient-tag {
            font-size: 12px;
            padding: 3px 8px;
          }
          
          .recipe-content {
            margin: 10px;
            max-height: 90vh;
          }
          
          .recipe-header {
            padding: 16px 16px 0;
          }
          
          .recipe-body {
            padding: 0 16px 16px;
          }
        }
        
        @media (max-width: 428px) {
          .results-header h1 {
            font-size: 1.4rem;
          }
          
          .results-header p {
            font-size: 14px;
          }
          
          .dish-card {
            padding: 12px;
          }
          
          .dish-header {
            gap: 10px;
          }
          
          .dish-icon {
            width: 36px;
            height: 36px;
          }
          
          .dish-info h3 {
            font-size: 16px;
          }
          
          .dish-info p {
            font-size: 13px;
          }
          
          .category-tag {
            font-size: 10px;
            padding: 2px 6px;
          }
          
          .ingredient-tag {
            font-size: 11px;
            padding: 2px 6px;
          }
          
          .recipe-content {
            margin: 5px;
            max-height: 95vh;
          }
          
          .recipe-header {
            padding: 12px 12px 0;
          }
          
          .recipe-body {
            padding: 0 12px 12px;
          }
          
          .recipe-header h2 {
            font-size: 18px;
          }
          
          .recipe-section h3 {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default DishResults;
