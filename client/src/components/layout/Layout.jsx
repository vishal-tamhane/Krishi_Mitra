import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatbotButton from '../common/ChatbotButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  
  // Check screen size
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Close sidebar when switching between mobile and desktop
      if (isMobileView !== isMobile) {
        setSidebarOpen(false);
      }
      
      // Auto-collapse sidebar on small screens (but not mobile)
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [isMobile]);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen && 
          !event.target.closest('aside') && 
          !event.target.closest('button[aria-controls="sidebar"]')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);
  
  // Page transition effect
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [children]); // Trigger on route change through children props

  // Toggle sidebar visibility on mobile or desktop
  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-100 border-r border-blue-200 shadow-sm overflow-hidden">
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        type="button"
        className="md:hidden fixed bottom-6 left-6 z-50 inline-flex items-center p-2 text-sm rounded-full bg-blue-500 text-white hover:bg-blue-600 w-14 h-14 justify-center shadow-xl"
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        aria-label="Toggle sidebar"
      >
        <span className="sr-only">Toggle sidebar</span>
        <FontAwesomeIcon icon={sidebarOpen ? faXmark : faBars} className="text-xl" />
      </button>
      
      {/* Chatbot Button - available on all screen sizes */}
      {/* <ChatbotButton /> */}
      
      {/* Dark Overlay - visible when mobile sidebar is open */}
      {sidebarOpen && isMobile && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-70 backdrop-blur-sm transition-opacity md:hidden"
          aria-hidden="true"
        ></div>
      )}
      
      {/* Sidebar */}
      <Sidebar isSidebarOpen={sidebarOpen} isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isMobile ? 'ml-0' : (isCollapsed ? 'md:ml-20' : 'md:ml-64')
      }`}>
        <main >
          <div className={`mx-auto transition-opacity duration-300 ${isPageTransitioning ? 'opacity-80' : 'opacity-100'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
