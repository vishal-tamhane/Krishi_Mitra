import { useState, useEffect, useCallback } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdDashboard } from "react-icons/md";
import { MdOutlineStorage } from "react-icons/md";
import { MdStorage } from "react-icons/md";
import { 
  faTractor, 
  faDatabase, 
  faArrowRightFromBracket,
  faLayerGroup,
  faChartLine,
  faLeaf,
  faCloudSunRain,
  faDroplet,
  faCog,
  faAngleRight,
  faAngleDown,
  faUser,
  faUserGear,
  faChevronLeft,
  faChevronRight,
  faRobot,
  faHome,
  faChartArea,
  faWater,
  faSeedling,
  faCloudRain,
  faWarning,
  faSprayCan,
  faWheatAwn,
  faPlantWilt,
  faMap,
  faDraftingCompass,
  faLocationDot,
  faHandshake,
  faRupeeSign,
  faWarehouse,
  faMicroscope,
  faThermometerHalf,
  faEye,
  faCalendarCheck,
  faCalculator,
  faBell,
  faHandHoldingDollar,
  faGraduationCap,
  faLifeRing,
  faChartPie,
  faCloudShowersHeavy,
  faMapMarkedAlt,
  faSearchDollar
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isSidebarOpen, isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    analytics: false,
    pests: false,
    crops: false,
    irrigation: false,
    fields: false,
    financialAid: false,
    climate: false
  });
  
  // Detect screen size for responsive behavior
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = (menu) => {
    // Don't expand menus if sidebar is collapsed on desktop
    if (!isMobile && isCollapsed) {
      toggleSidebar(); // Expand the sidebar first
      return;
    }
    
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e, menu) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu(menu);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handler to collapse sidebar on link click if screen width < 600px
const handleLinkClick = useCallback(() => {
  if (window.innerWidth < 600 && isSidebarOpen) {
    toggleSidebar(); // Collapse sidebar on small screens
  }
}, [isSidebarOpen, toggleSidebar]);

// Attach the click handler to sidebar links using event delegation
useEffect(() => {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  function onLinkClick(event) {
    // Only trigger when clicking on internal <Link> anchors
    if (event.target.closest('a')) {
      handleLinkClick();
    }
  }

  sidebar.addEventListener('click', onLinkClick);
  return () => sidebar.removeEventListener('click', onLinkClick);
}, [handleLinkClick]);


  return (
    <aside 
      id="sidebar"
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-white border-r border-blue-200 shadow-lg ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${isMobile ? 'w-[85vw] max-w-[300px]' : ''} ${!isMobile && isCollapsed ? 'md:w-20' : 'md:w-64'}` }
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col justify-between overflow-y-auto pb-20 md:pb-0 overscroll-contain scroll-smooth scrollbar-none">
        <div>
          {/* Top section with logo & collapse button */}
          <div className="flex items-center justify-between py-4 px-4 border-b border-blue-200 sticky top-0 bg-blue-600 z-10 shadow-md">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={faLeaf} className="text-blue-600 text-lg" />
                </div>
                <span className="font-bold text-white text-xl">Krishi Mitra</span>
              </div>
            )}
            
            {/* Toggle button */}
            <button 
              onClick={toggleSidebar} 
              type="button" 
              className={`${isCollapsed ? 'mx-auto' : ''} inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-blue-700 transition-colors duration-200`}
              aria-expanded={!isCollapsed}
              aria-label="Toggle sidebar collapse"
            >
              <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} className="w-4 h-4" />
              <span className="sr-only">Toggle sidebar</span>
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="mt-4 px-3">
            {/* Main Dashboard */}
            <div className="mb-4">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 px-2">
                  Main
                </h3>
              )}
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/"
                    className={`flex items-center px-3 py-2.5 rounded-lg ${isCollapsed ? 'justify-center' : ''} ${
                      isActive('/') 
                        ? 'bg-blue-500 text-white font-medium shadow-sm' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    } group transition-all duration-200`}
                  >
                    <FontAwesomeIcon
                      icon={faHome}
                      className={`w-5 h-5 ${isActive('/') ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`}
                    />
                    {!isCollapsed && <span className="ml-3 whitespace-nowrap">Dashboard</span>}
                  </Link>
                </li>
              </ul>
            </div>
            {/* Field Management */}
            <div className="mb-4">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 px-2">
                  Field Management
                </h3>
              )}
              <ul className="space-y-1">
              <li>
                        <Link
                          to="/create-field"
                          className={`flex items-center px-3 py-2 rounded-md ${
                            isActive('/create-field') 
                              ? 'bg-blue-500 text-white font-medium' 
                              : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                          } transition-all duration-200`}
                        >
                          <FontAwesomeIcon
                            icon={faDraftingCompass}
                            className={`w-4 h-4 mr-2 ${isActive('/create-field') ? 'text-white' : 'text-gray-500'}`}
                          />
                          <span>Create New Field</span>
                        </Link>
                      </li>
              </ul>
            </div>

            {/* Crop Management */}
            <div className="mb-4">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 px-2">
                  Crop Management
                </h3>
              )}
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/crop-lifecycle"
                    className={`flex items-center px-3 py-2.5 rounded-lg ${isCollapsed ? 'justify-center' : ''} ${
                      isActive('/crop-lifecycle') 
                        ? 'bg-blue-500 text-white font-medium shadow-sm' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    } group transition-all duration-200`}
                  >
                    <FontAwesomeIcon
                      icon={faSeedling}
                      className={`w-5 h-5 ${isActive('/crop-lifecycle') ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`}
                    />
                    {!isCollapsed && <span className="ml-3 whitespace-nowrap">Crop Lifecycle</span>}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/crop-prediction"
                    className={`flex items-center px-3 py-2.5 rounded-lg ${isCollapsed ? 'justify-center' : ''} ${
                      isActive('/crop-prediction') 
                        ? 'bg-blue-500 text-white font-medium shadow-sm' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    } group transition-all duration-200`}
                  >
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className={`w-5 h-5 ${isActive('/crop-prediction') ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`}
                    />
                    {!isCollapsed && <span className="ml-3 whitespace-nowrap">Crop Prediction</span>}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/yield-prediction"
                    className={`flex items-center px-3 py-2.5 rounded-lg ${isCollapsed ? 'justify-center' : ''} ${
                      isActive('/yield-prediction') 
                        ? 'bg-blue-500 text-white font-medium shadow-sm' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    } group transition-all duration-200`}
                  >
                    <FontAwesomeIcon
                      icon={faWheatAwn}
                      className={`w-5 h-5 ${isActive('/yield-prediction') ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`}
                    />
                    {!isCollapsed && <span className="ml-3 whitespace-nowrap">Yield Prediction</span>}
                  </Link>
                </li>
              </ul>
            </div>

            {/* AI Tools */}
            <div className="mb-4">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 px-2">
                  Tools
                </h3>
              )}
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/ai-assistant"
                    className={`flex items-center px-3 py-2.5 rounded-lg ${isCollapsed ? 'justify-center' : ''} ${
                      isActive('/ai-assistant') 
                        ? 'bg-blue-500 text-white font-medium shadow-sm' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                    } group transition-all duration-200`}
                  >
                    <FontAwesomeIcon
                      icon={faRobot}
                      className={`w-5 h-5 ${isActive('/ai-assistant') ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`}
                    />
                    {!isCollapsed && <span className="ml-3 whitespace-nowrap">AI Assistant</span>}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto border-t border-blue-200 pt-4">
          <div className="px-3">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 px-2">
                Account
              </h3>
            )}
            <ul className="space-y-1">
              <li>
                <Link
                  to="/profile"
                  className={`flex items-center px-3 py-2.5 rounded-lg ${isCollapsed ? 'justify-center' : ''} ${
                    isActive('/profile') 
                      ? 'bg-blue-500 text-white font-medium shadow-sm' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  } group transition-all duration-200`}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className={`w-5 h-5 ${isActive('/profile') ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`}
                  />
                  {!isCollapsed && <span className="ml-3 whitespace-nowrap">Profile</span>}
                </Link>
              </li>              
            </ul>
          </div>
        </div>
      </div>
    </aside>
    
  );
};



export default Sidebar;
