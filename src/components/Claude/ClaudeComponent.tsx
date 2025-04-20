/// <reference types="vite/client" />
// Dev: enable vite env types
import { useState } from 'react';
import { 
  Search, 
  X, 
  ChevronDown, 
  ChevronRight,
  Plus, 
  Bookmark, 
  User, 
  FileText, 
  Edit, 
  Check, 
  Lightbulb, 
  MoreHorizontal
} from 'lucide-react';
import './ClaudeComponent.css';

// Component interfaces
interface Suggestion {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  sections?: number;
  image?: boolean;
}

const WikipediaUI = () => {
  // Main state variables for the prototype
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['For you']);
  // Pending filter inside Adjust Suggestions panel (committed on Done)
  const [pendingFilter, setPendingFilter] = useState<string>(activeFilters[0] || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('collections');
  const [notification, setNotification] = useState<string | null>(null);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);
  const [bookmarkedSuggestions, setBookmarkedSuggestions] = useState<string[]>([]);

  // Standalone collections without sub-items
  const standaloneCollections: string[] = [
    'Climate',
    'Essential Articles',
    'Tamil Wikipedia Article Curation/Medical',
    'Technology Essential Articles'
  ];

  // Simulated suggestions/articles data
  const forYouSuggestions: Suggestion[] = [
    {
      id: 'elv',
      title: 'Elvira Dones',
      description: 'Albanian novelist, screenwriter, and documentary film producer',
      tags: ['CEE Spring 2025 Albania'],
      icon: 'document'
    },
    {
      id: 'edu',
      title: 'Education in Albania',
      description: 'Overview of the Albanian education system',
      tags: ['CEE Spring 2025 Albania'],
      sections: 7,
      image: true,
      icon: 'document'
    },
    {
      id: 'wom',
      title: "Women's healthcare access in developing nations",
      description: 'Disparities and challenges in women\'s healthcare globally',
      tags: ['WikiProject Women\'s Health Vital articles'],
      icon: 'document'
    }
  ];
  // Dummy popular suggestions data
  const popularSuggestions: Suggestion[] = [
    {
      id: 'pop1',
      title: 'Physics',
      description: 'Study of matter, energy, and the fundamental forces',
      tags: ['Popular'],
      icon: 'document',
      sections: 12
    },
    {
      id: 'pop2',
      title: 'Mathematics',
      description: 'Abstract study of numbers, quantities, and shapes',
      tags: ['Popular'],
      icon: 'document',
      sections: 8
    },
    {
      id: 'pop3',
      title: 'History',
      description: 'Investigation of past events and societies',
      tags: ['Popular'],
      icon: 'document',
      sections: 15
    }
  ];

  // Toggle committed filter (top controls)
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      // unselect filter
      setActiveFilters([]);
    } else {
      // select only this filter
      setActiveFilters([filter]);
    }
  };
  
  // Toggle Adjust Suggestions panel: initialize pendingFilter on open
  const togglePanel = () => {
    if (!isPanelOpen) {
      setActiveTab('all');
      setPendingFilter(activeFilters[0] || '');
    }
    setIsPanelOpen(!isPanelOpen);
  };

  // Toggle pending filter in panel (applies on Done)
  const togglePendingFilter = (filter: string) => {
    if (pendingFilter === filter) {
      setPendingFilter('');
    } else {
      setPendingFilter(filter);
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const dismissSuggestion = (id: string) => {
    setDismissedSuggestions([...dismissedSuggestions, id]);
    showNotification('Suggestion removed');
  };

  const toggleBookmark = (id: string) => {
    if (bookmarkedSuggestions.includes(id)) {
      setBookmarkedSuggestions(bookmarkedSuggestions.filter(bookmarkId => bookmarkId !== id));
      showNotification('Bookmark removed');
    } else {
      setBookmarkedSuggestions([...bookmarkedSuggestions, id]);
      showNotification('Bookmark added');
    }
  };

  // Helper to return suggestions based on current filter (including collections, regions, topics)
  const getSuggestionsForFilter = (filter?: string): Suggestion[] => {
    if (!filter || filter === 'For you') return forYouSuggestions;
    if (filter === 'Popular') return popularSuggestions;
    // Dummy suggestions for other filters
    return Array.from({ length: 3 }).map((_, idx) => ({
      id: `${filter.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
      title: `${filter} Article ${idx + 1}`,
      description: `Dummy description for ${filter} Article ${idx + 1}`,
      tags: [filter],
      icon: 'document'
    }));
  };
  // Determine which suggestions to show: preview pending filter while panel open, else use active filter
  const currentFilter = isPanelOpen ? pendingFilter : activeFilters[0];
  const suggestionsData = getSuggestionsForFilter(currentFilter ?? undefined);
  const filteredSuggestions = suggestionsData.filter(item =>
    !dismissedSuggestions.includes(item.id)
  );
  // Prepare filter controls: place the active filter first, then defaults
  const primaryFilter = activeFilters[0] || 'For you';
  const controlFilters = [primaryFilter, 'For you', 'Popular']
    .filter((f, i, arr) => arr.indexOf(f) === i);

  return (
    <div className="w-full font-sans bg-gray-50 rounded-lg overflow-hidden shadow-lg border border-gray-200">
      {/* Notification toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex bg-gray-100" style={{ height: '100vh', maxHeight: '1200px' }}>
        {/* Left Sidebar */}
        <div className="w-48 bg-white border-r border-gray-300 p-4 h-full flex flex-col">
          <div className="flex-grow overflow-y-auto">
            <div className="flex items-center text-blue-600 mb-4 cursor-pointer hover:bg-blue-50 px-2 py-1 rounded">
              <Lightbulb className="w-5 h-5 mr-2" />
              <span>Suggestions</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
              <Edit className="w-5 h-5 mr-2" />
              <span>In progress</span>
            </div>
            <div className="flex items-center text-gray-600 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
              <Check className="w-5 h-5 mr-2" />
              <span>Published</span>
            </div>
          </div>
          
          {/* No longer needed here - moved to top of content area */}
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-4 h-full overflow-y-auto">
          {/* Top action button - visible in content area for this design */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center mb-4 hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            New translation
          </button>
          
          <div className="bg-white rounded-md shadow p-6 mb-4 flex flex-col flex-1 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Suggestions</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>English</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <span>→</span>
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span>हिन्दी</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
              {controlFilters.map(filter => (
                <button
                  key={filter}
                  className={`px-3 py-1 rounded-full flex items-center text-sm ${
                    ((!isPanelOpen && activeFilters.includes(filter)) ||
                     (isPanelOpen && pendingFilter === filter))
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => isPanelOpen ? togglePendingFilter(filter) : toggleFilter(filter)}
                >
                  {filter === 'For you' && <User className="w-4 h-4 mr-1" />}
                  {filter === 'Popular' && <Bookmark className="w-4 h-4 mr-1" />}
                  <span>{filter}</span>
                </button>
              ))}
              <button
                className={`px-3 py-1 rounded-full flex items-center text-sm ${
                  isPanelOpen ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={togglePanel}
              >
                <MoreHorizontal className="w-4 h-4 mr-1" />
                <span>More</span>
              </button>
            </div>
            
            {/* Inline Panel - Appears below filters when expanded */}
            {isPanelOpen && (
              <div className="bg-white border border-gray-200 rounded-md p-4 mb-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Adjust suggestions</h3>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setIsPanelOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2 border-b mb-4">
                  {['all', 'collections', 'regions', 'topics'].map(tab => (
                    <button
                      key={tab}
                      className={`pb-2 px-4 ${activeTab === tab
                        ? 'font-bold border-b-2 border-blue-600 text-blue-600'
                        : 'font-medium text-gray-500'}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
                
                {pendingFilter && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Selected filter</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
                        {pendingFilter}
                        <button
                          className="ml-1 focus:outline-none"
                          onClick={() => togglePendingFilter(pendingFilter)}
                          aria-label={`Remove ${pendingFilter} filter`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search for a topic" 
                      className="w-full border border-gray-300 rounded px-3 py-2 pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* All tab with preview items and browse links */}
                  {activeTab === 'all' && (
                    <div className="space-y-6">
                      {/* Collections preview */}
                      <div>
                        <h4 className="category-header">Collections</h4>
                        <div className="category-content flex flex-wrap gap-2 mb-3">
                          {standaloneCollections.slice(0, 3).map(collection => (
                            <button
                              key={collection}
                              className={`px-3 py-1 rounded-full text-sm ${
                                pendingFilter === collection
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              onClick={() => togglePendingFilter(collection)}
                            >
                              {collection}
                            </button>
                          ))}
                        </div>
                        <button 
                          className="browse-all-link text-blue-600 hover:text-blue-800 flex items-center text-sm"
                          onClick={() => setActiveTab('collections')}
                        >
                          <span>Browse all</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      
                      {/* Regions preview */}
                      <div>
                        <h4 className="category-header">Regions</h4>
                        <div className="category-content flex flex-wrap gap-2 mb-3">
                          {['Africa', 'Asia', 'Europe'].map(region => (
                            <button
                              key={region}
                              className={`px-3 py-1 rounded-full text-sm ${
                                pendingFilter === region
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              onClick={() => togglePendingFilter(region)}
                            >
                              {region}
                            </button>
                          ))}
                        </div>
                        <button 
                          className="browse-all-link text-blue-600 hover:text-blue-800 flex items-center text-sm"
                          onClick={() => setActiveTab('regions')}
                        >
                          <span>Browse all</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      
                      {/* Topics preview - with three category sections */}
                      {/* Culture category */}
                      <div>
                        <h4 className="category-header">Culture</h4>
                        <div className="category-content flex flex-wrap gap-2 mb-3">
                          {['Art', 'Literature', 'Music', 'TV and film'].slice(0, 4).map(topic => (
                            <button
                              key={topic}
                              className={`px-3 py-1 rounded-full text-sm ${
                                pendingFilter === topic
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              onClick={() => togglePendingFilter(topic)}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                        <button 
                          className="browse-all-link text-blue-600 hover:text-blue-800 flex items-center text-sm"
                          onClick={() => setActiveTab('topics')}
                        >
                          <span>Browse all</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      
                      {/* History and society category */}
                      <div>
                        <h4 className="category-header">History and society</h4>
                        <div className="category-content flex flex-wrap gap-2 mb-3">
                          {['History', 'Education', 'Society', 'Philosophy and religion'].slice(0, 4).map(topic => (
                            <button
                              key={topic}
                              className={`px-3 py-1 rounded-full text-sm ${
                                pendingFilter === topic
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              onClick={() => togglePendingFilter(topic)}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                        <button 
                          className="browse-all-link text-blue-600 hover:text-blue-800 flex items-center text-sm"
                          onClick={() => setActiveTab('topics')}
                        >
                          <span>Browse all</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      
                      {/* Science category */}
                      <div>
                        <h4 className="category-header">Science, technology and math</h4>
                        <div className="category-content flex flex-wrap gap-2 mb-3">
                          {['Medicine and health', 'Technology', 'Biology', 'Physics'].slice(0, 4).map(topic => (
                            <button
                              key={topic}
                              className={`px-3 py-1 rounded-full text-sm ${
                                pendingFilter === topic
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              onClick={() => togglePendingFilter(topic)}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                        <button 
                          className="browse-all-link text-blue-600 hover:text-blue-800 flex items-center text-sm"
                          onClick={() => setActiveTab('topics')}
                        >
                          <span>Browse all</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Collections tab content */}
                  {activeTab === 'collections' && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Collections</h4>
                      
                      {/* Standalone collections as chips - show all */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {standaloneCollections.map(collection => (
                          <button
                            key={collection}
                            className={`px-3 py-1 rounded-full text-sm ${
                              pendingFilter === collection
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                            onClick={() => togglePendingFilter(collection)}
                          >
                            {collection}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Regions tab content */}
                  {activeTab === 'regions' && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Regions</h4>
                      <div className="space-y-4">
                        {['Africa', 'Asia', 'Europe', 'Americas', 'Oceania'].map(region => (
                          <div key={region}>
                            <h5 className="text-sm font-medium text-gray-600 mb-2">{region}</h5>
                            <div className="flex flex-wrap gap-2 mb-3 pl-2">
                              {region === 'Africa' && 
                                ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso'].map(country => (
                                  <button
                                    key={country}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      pendingFilter === country
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    onClick={() => togglePendingFilter(country)}
                                  >
                                    {country}
                                  </button>
                                ))
                              }
                              {region === 'Asia' && 
                                ['China', 'India', 'Japan', 'South Korea', 'Indonesia'].map(country => (
                                  <button
                                    key={country}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      pendingFilter === country
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    onClick={() => togglePendingFilter(country)}
                                  >
                                    {country}
                                  </button>
                                ))
                              }
                              {region === 'Europe' && 
                                ['Germany', 'France', 'Spain', 'Italy', 'United Kingdom'].map(country => (
                                  <button
                                    key={country}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      pendingFilter === country
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    onClick={() => togglePendingFilter(country)}
                                  >
                                    {country}
                                  </button>
                                ))
                              }
                              {region === 'Americas' && 
                                ['United States', 'Canada', 'Brazil', 'Mexico', 'Argentina'].map(country => (
                                  <button
                                    key={country}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      pendingFilter === country
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    onClick={() => togglePendingFilter(country)}
                                  >
                                    {country}
                                  </button>
                                ))
                              }
                              {region === 'Oceania' && 
                                ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea', 'Samoa'].map(country => (
                                  <button
                                    key={country}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      pendingFilter === country
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    onClick={() => togglePendingFilter(country)}
                                  >
                                    {country}
                                  </button>
                                ))
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Topics tab content */}
                  {activeTab === 'topics' && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Topics</h4>
                      <div className="space-y-4">
                        {/* Culture category */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-2">Culture</h5>
                          <div className="flex flex-wrap gap-2 mb-3 pl-2">
                            {['Art', 'Literature', 'Music', 'TV and film', 'Fashion', 'Food', 'Sports', 'Games'].map(topic => (
                              <button
                                key={topic}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  pendingFilter === topic
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={() => togglePendingFilter(topic)}
                              >
                                {topic}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* History and society category */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-2">History and society</h5>
                          <div className="flex flex-wrap gap-2 mb-3 pl-2">
                            {['History', 'Education', 'Society', 'Philosophy and religion', 'Politics', 'Economics', 'Military', 'Law'].map(topic => (
                              <button
                                key={topic}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  pendingFilter === topic
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={() => togglePendingFilter(topic)}
                              >
                                {topic}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Science category */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-600 mb-2">Science, technology and math</h5>
                          <div className="flex flex-wrap gap-2 mb-3 pl-2">
                            {['Medicine and health', 'Technology', 'Biology', 'Physics', 'Chemistry', 'Mathematics', 'Engineering', 'Astronomy'].map(topic => (
                              <button
                                key={topic}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  pendingFilter === topic
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={() => togglePendingFilter(topic)}
                              >
                                {topic}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => {
                      // Commit pending filter on Done
                      setActiveFilters(pendingFilter ? [pendingFilter] : []);
                      setIsPanelOpen(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
            
            {/* Main Suggestions List - Appears after panel */}
            <div className="mt-4 text-left flex-1 overflow-y-auto">
              <h3 className="text-lg font-medium text-gray-700 mb-2 text-left">
                Recommended for you
              </h3>
              
              {filteredSuggestions.map(item => (
                <div key={item.id} className="flex items-start py-3 border-b border-gray-200">
                  <div className="w-10 h-10 bg-gray-200 rounded-sm flex items-center justify-center mr-3">
                    {item.image ? (
                      <div className="w-full h-full bg-gray-400" />
                    ) : (
                      <FileText className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex space-x-1">
                        <button 
                          className={`text-gray-400 hover:text-blue-600 ${
                            bookmarkedSuggestions.includes(item.id) ? 'text-blue-600' : ''
                          }`}
                          onClick={() => toggleBookmark(item.id)}
                          aria-label="Bookmark"
                        >
                          <Bookmark className="w-5 h-5" fill={bookmarkedSuggestions.includes(item.id) ? 'currentColor' : 'none'} />
                        </button>
                        <button 
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => dismissSuggestion(item.id)}
                          aria-label="Dismiss"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    {item.sections && (
                      <p className="text-xs text-gray-400 mt-1">{item.sections} sections</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikipediaUI;