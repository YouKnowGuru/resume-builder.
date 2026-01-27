import React from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  Award,
  Settings,
  Type,
  AlignLeft
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'content' | 'appearance';
  setActiveTab: (tab: 'content' | 'appearance') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'personal', icon: User, label: 'Personal' },
    { id: 'summary', icon: Type, label: 'Summary' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'skills', icon: Wrench, label: 'Skills' },
    { id: 'languages', icon: Languages, label: 'Languages' },
    { id: 'certifications', icon: Award, label: 'Certifications' },
    { id: 'footer', icon: AlignLeft, label: 'Footer' },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveTab('content');
    setTimeout(() => {
      const element = document.getElementById(`editor-${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 10);
  };

  return (
    <aside className="sidebar glass-panel">
      <div className="tab-switcher">
        <button
          className={activeTab === 'content' ? 'active' : ''}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
        <button
          className={activeTab === 'appearance' ? 'active' : ''}
          onClick={() => setActiveTab('appearance')}
        >
          Appearance
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="nav-item"
            onClick={() => handleNavClick(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}

        <div className="nav-divider"></div>

        <button
          className={activeTab === 'appearance' ? 'nav-item active' : 'nav-item'}
          onClick={() => setActiveTab('appearance')}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </nav>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          gap: 2rem;
          transition: all 0.3s ease;
          border-radius: var(--radius-lg);
          margin-top: 1rem;
          margin-left: 2rem;
          height: calc(100vh - var(--header-height) - 2rem);
          overflow-y: auto;
        }

        .tab-switcher {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem 0;
          margin-bottom: 1rem;
        }

        .tab-switcher button {
          flex: 1;
          padding: 0.6rem 0.75rem;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: all 0.3s;
          color: var(--text-muted);
          background: transparent;
          border: 1px solid transparent;
        }

        .tab-switcher button:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-main);
        }

        .tab-switcher button.active {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border: 1px solid var(--primary);
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 0.85rem;
          border-radius: var(--radius-md);
          color: var(--text-main);
          transition: all 0.3s;
          text-align: left;
          width: 100%;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
        }

        .nav-item span {
          font-size: 0.9rem;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 215, 0, 0.3);
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .nav-item.active {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border: 1px solid var(--primary);
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }

        .nav-divider {
          height: 1px;
          background: var(--border);
          margin: 1rem 0;
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 100%;
            margin-left: 0;
            margin-top: 0.5rem;
            height: calc(100vh - var(--header-height));
            border-radius: 0 20px 20px 0;
            background: radial-gradient(circle at 0 0, rgba(255, 215, 0, 0.25), transparent 55%),
                        var(--bg-sidebar);
          }

          .nav-item {
            background: rgba(15, 23, 42, 0.85);
            border-color: rgba(148, 163, 184, 0.3);
            color: #e5e7eb;
          }

          .nav-item span {
            color: #e5e7eb;
          }

          .nav-item:hover {
            background: rgba(15, 23, 42, 1);
          }
        }
      `}</style>
    </aside>
  );
};
