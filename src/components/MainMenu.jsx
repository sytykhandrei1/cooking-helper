import React from 'react';
import { Search, Shuffle, ChefHat, Settings } from 'lucide-react';

const MainMenu = ({ onNavigate }) => {
  const menuItems = [
    {
      id: 'ingredients',
      title: 'Поиск по ингредиентам',
      description: 'Введите продукты, которые есть у вас дома, и получите список блюд, которые можно приготовить',
      icon: Search,
      color: '#667eea'
    },
    {
      id: 'random',
      title: 'Случайное блюдо',
      description: 'Нажмите кнопку и получите случайное блюдо с гарниром',
      icon: Shuffle,
      color: '#764ba2'
    },
    {
      id: 'settings',
      title: 'Настройки',
      description: 'Укажите аллергены и включите детский режим',
      icon: Settings,
      color: '#38a169'
    }
  ];

  return (
    <div className="main-menu fade-in">
      <div className="welcome-section">
        <h1>Добро пожаловать в Помощник повара! 👨‍🍳</h1>
        <p className="welcome-text">
          Больше не нужно ломать голову над тем, что приготовить. 
          Наш помощник подберет идеальные блюда на основе ваших ингредиентов 
          или предложит случайные варианты для разнообразия.
        </p>
      </div>

      <div className="menu-grid">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.id}
              className="menu-card"
              onClick={() => onNavigate(item.id)}
              style={{ '--card-color': item.color }}
            >
              <div className="menu-icon">
                <IconComponent size={48} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="menu-arrow">→</div>
            </div>
          );
        })}
      </div>

      <div className="features-section">
        <h2>Особенности приложения</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🍽️</div>
            <h4>Большая база блюд</h4>
            <p>Более 100 рецептов различных блюд</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">👶</div>
            <h4>Детский режим</h4>
            <p>Специальные рецепты, адаптированные для детей</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⚠️</div>
            <h4>Учет аллергенов</h4>
            <p>Исключение блюд с вашими аллергенами</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h4>Удобный интерфейс</h4>
            <p>Простой и интуитивно понятный дизайн</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-menu {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .welcome-section {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .welcome-text {
          font-size: 18px;
          color: #6b7280;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 64px;
        }
        
        .menu-card {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .menu-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-color);
        }
        
        .menu-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
        }
        
        .menu-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--card-color), rgba(102, 126, 234, 0.1));
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: white;
        }
        
        .menu-card h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1f2937;
        }
        
        .menu-card p {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .menu-arrow {
          position: absolute;
          bottom: 24px;
          right: 24px;
          font-size: 24px;
          color: var(--card-color);
          font-weight: bold;
          transition: transform 0.3s ease;
        }
        
        .menu-card:hover .menu-arrow {
          transform: translateX(4px);
        }
        
        .features-section {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }
        
        .features-section h2 {
          text-align: center;
          margin-bottom: 32px;
          color: #1f2937;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }
        
        .feature-item {
          text-align: center;
        }
        
        .feature-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .feature-item h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1f2937;
        }
        
        .feature-item p {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
        }
        
        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: 1fr;
          }
          
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .welcome-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default MainMenu;


