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

// Component interfaces
interface CollectionGroup {
  id: string;
  name: string;
  items: string[];
}

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
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['cee']);
  const [activeFilters, setActiveFilters] = useState<string[]>(['For you']);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('collections');
  const [notification, setNotification] = useState<string | null>(null);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);
  const [bookmarkedSuggestions, setBookmarkedSuggestions] = useState<string[]>(['elv']);

  // Simulated collections data
  const collectionGroups: CollectionGroup[] = [
    {
      id: 'cee',
      name: 'CEE Spring 2025',
      items: [
        'Albania', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus',
        'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia',
        'Estonia', 'Georgia', 'Greece', 'Hungary', 'International', 'Iran'
      ]
    },
    {
      id: 'wlr',
      name: 'Wiki Loves Ramadan 2025',
      items: [
        'Culture', 'Figures 1', 'Figures 2', 'Figures 3', 
        'General articles 1', 'General articles 2'
      ]
    },
    {
      id: 'wiki99',
      name: 'Wiki99',
      items: ['food', 'sustainability']
    }
  ];
  
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

  // Helper functions
  const toggleGroup = (group: string) => {
    if (expandedGroups.includes(group)) {
      setExpandedGroups(expandedGroups.filter(g => g !== group));
    } else {
      setExpandedGroups([...expandedGroups, group]);
    }
  };

  const toggleFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([filter]);
    }
  };
  
  // Toggle panel function - sets activeTab to 'all' when panel opens
  const togglePanel = () => {
    if (!isPanelOpen) {
      setActiveTab('all');
    }
    setIsPanelOpen(!isPanelOpen);
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

  // Get the filtered suggestions
  const filteredSuggestions = forYouSuggestions.filter(item => 
    !dismissedSuggestions.includes(item.id)
  );

  return (
    <div className="wikipedia-ui">
      {/* Notification toast */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      
      {/* Wikipedia Header */}
      <div className="header">
        <div className="header-logo">
          <span className="logo-text">W<span className="logo-text-small">IKIPEDIA</span></span>
          <span className="translate-text">Translate page</span>
        </div>
        <div className="user-menu">
          <div className="user-button">
            <span className="user-text">User</span>
            <ChevronDown className="sidebar-icon" />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="sidebar-item active">
            <Lightbulb className="sidebar-icon" />
            <span>Suggestions</span>
          </div>
          <div className="sidebar-item">
            <Edit className="sidebar-icon" />
            <span>In progress</span>
          </div>
          <div className="sidebar-item">
            <Check className="sidebar-icon" />
            <span>Published</span>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="content-area">
          <button className="new-translation-btn">
            <Plus className="btn-icon" />
            New translation
          </button>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Suggestions</h2>
              <div className="language-selector">
                <div className="language-item">
                  <span>English</span>
                  <ChevronDown />
                </div>
                <span>→</span>
                <div className="language-item">
                  <span>हिन्दी</span>
                  <ChevronDown />
                </div>
              </div>
            </div>
            
            {/* Filter Controls */}
            <div className="filters">
              <button 
                className={`filter-btn ${activeFilters.includes('For you') ? 'active' : 'inactive'}`}
                onClick={() => toggleFilter('For you')}
              >
                <User className="btn-icon" />
                <span>For you</span>
              </button>
              
              <button 
                className={`filter-btn ${activeFilters.includes('Popular') ? 'active' : 'inactive'}`}
                onClick={() => toggleFilter('Popular')}
              >
                <Bookmark className="btn-icon" />
                <span>Popular</span>
              </button>
              
              <button 
                className={`filter-btn ${isPanelOpen ? 'active' : 'inactive'}`}
                onClick={togglePanel}
              >
                <MoreHorizontal className="btn-icon" />
                <span>More</span>
              </button>
            </div>
            
            {/* Main Suggestions List */}
            <div className="suggestions-section">
              <h3 className="section-title">
                Recommended for you
              </h3>
              
              {filteredSuggestions.map(item => (
                <div key={item.id} className="suggestion-item">
                  <div className="suggestion-image">
                    {item.image ? (
                      <div style={{ width: '100%', height: '100%', backgroundColor: '#9ca3af' }} />
                    ) : (
                      <FileText />
                    )}
                  </div>
                  <div className="suggestion-content">
                    <div className="suggestion-header">
                      <h4 className="suggestion-title">{item.title}</h4>
                      <div className="suggestion-actions">
                        <button 
                          className={`action-btn ${bookmarkedSuggestions.includes(item.id) ? 'active' : ''}`}
                          onClick={() => toggleBookmark(item.id)}
                          aria-label="Bookmark"
                        >
                          <Bookmark fill={bookmarkedSuggestions.includes(item.id) ? 'currentColor' : 'none'} />
                        </button>
                        <button 
                          className="action-btn"
                          onClick={() => dismissSuggestion(item.id)}
                          aria-label="Dismiss"
                        >
                          <X />
                        </button>
                      </div>
                    </div>
                    <p className="suggestion-description">{item.description}</p>
                    {item.sections && (
                      <p className="suggestion-sections">{item.sections} sections</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Expandable Panel - Only visible when expanded */}
        {isPanelOpen && (
          <div className="panel-overlay">
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title">Adjust suggestions</h3>
                <button 
                  className="close-btn"
                  onClick={() => setIsPanelOpen(false)}
                >
                  <X />
                </button>
              </div>
              
              {/* Panel tabs */}
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button 
                  className={`tab ${activeTab === 'collections' ? 'active' : ''}`}
                  onClick={() => setActiveTab('collections')}
                >
                  Collections
                </button>
                <button 
                  className={`tab ${activeTab === 'regions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('regions')}
                >
                  Regions
                </button>
                <button 
                  className={`tab ${activeTab === 'topics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('topics')}
                >
                  Topics
                </button>
              </div>
              
              {/* Active filters */}
              {activeFilters.length > 0 && (
                <div className="active-filters">
                  <h4 className="filter-title">Active filters</h4>
                  <div className="filter-chips">
                    {activeFilters.map(filter => (
                      <span key={filter} className="filter-chip">
                        {filter}
                        <button 
                          className="close-btn" 
                          onClick={() => toggleFilter('For you')}
                        >
                          <X />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Search input */}
              <div className="search-container">
                <div className="search-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Search for a topic" 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="search-icon" />
                </div>
              </div>
              
              <div className="tab-content">
                {/* All tab with preview items and browse links */}
                {activeTab === 'all' && (
                  <div className="tab-content">
                    {/* Collections preview */}
                    <div className="section">
                      <h4 className="section-header">Collections</h4>
                      <div className="chip-container">
                        {standaloneCollections.slice(0, 3).map(collection => (
                          <button 
                            key={collection}
                            className="chip"
                          >
                            {collection}
                          </button>
                        ))}
                      </div>
                      <button 
                        className="browse-link"
                        onClick={() => setActiveTab('collections')}
                      >
                        <span>Browse all</span>
                        <ChevronRight className="chevron-icon" />
                      </button>
                    </div>
                    
                    {/* Regions preview */}
                    <div className="section">
                      <h4 className="section-header">Regions</h4>
                      <div className="chip-container">
                        {['Africa', 'Asia', 'Europe'].map(region => (
                          <button 
                            key={region}
                            className="chip"
                          >
                            {region}
                          </button>
                        ))}
                      </div>
                      <button 
                        className="browse-link"
                        onClick={() => setActiveTab('regions')}
                      >
                        <span>Browse all</span>
                        <ChevronRight className="chevron-icon" />
                      </button>
                    </div>
                    
                    {/* Topics preview - with three category sections */}
                    {/* Culture category */}
                    <div className="section">
                      <h4 className="section-header">Culture</h4>
                      <div className="chip-container">
                        {['Art', 'Literature', 'Music', 'TV and film'].slice(0, 4).map(topic => (
                          <button 
                            key={topic}
                            className="chip"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                      <button 
                        className="browse-link"
                        onClick={() => setActiveTab('topics')}
                      >
                        <span>Browse all</span>
                        <ChevronRight className="chevron-icon" />
                      </button>
                    </div>
                    
                    {/* History and society category */}
                    <div className="section">
                      <h4 className="section-header">History and society</h4>
                      <div className="chip-container">
                        {['History', 'Education', 'Society', 'Philosophy and religion'].slice(0, 4).map(topic => (
                          <button 
                            key={topic}
                            className="chip"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                      <button 
                        className="browse-link"
                        onClick={() => setActiveTab('topics')}
                      >
                        <span>Browse all</span>
                        <ChevronRight className="chevron-icon" />
                      </button>
                    </div>
                    
                    {/* Science category */}
                    <div className="section">
                      <h4 className="section-header">Science, technology and math</h4>
                      <div className="chip-container">
                        {['Medicine and health', 'Technology', 'Biology', 'Physics'].slice(0, 4).map(topic => (
                          <button 
                            key={topic}
                            className="chip"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                      <button 
                        className="browse-link"
                        onClick={() => setActiveTab('topics')}
                      >
                        <span>Browse all</span>
                        <ChevronRight className="chevron-icon" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Collections tab content */}
                {activeTab === 'collections' && (
                  <div>
                    <h4 className="section-header">Collections</h4>
                    
                    {/* Standalone collections as chips - show all */}
                    <div className="chip-container">
                      {standaloneCollections.map(collection => (
                        <button 
                          key={collection}
                          className="chip"
                        >
                          {collection}
                        </button>
                      ))}
                    </div>
                    
                    {/* Collection groups - show all */}
                    {collectionGroups.map((group) => (
                      <div key={group.id} className="collection-group">
                        <button 
                          className="collection-heading"
                          onClick={() => toggleGroup(group.id)}
                        >
                          {expandedGroups.includes(group.id) ? 
                            <ChevronDown className="chevron-icon" /> : 
                            <ChevronRight className="chevron-icon" />
                          }
                          {group.name}
                          <span className="collection-count">
                            {group.items.length}
                          </span>
                        </button>
                        
                        {/* Sub-collections appear when expanded - show all */}
                        {expandedGroups.includes(group.id) && (
                          <div className="subcollections">
                            <div className="chip-container">
                              {group.items.map((item) => (
                                <button 
                                  key={item}
                                  className="chip"
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="panel-footer">
                <button 
                  className="done-btn"
                  onClick={() => setIsPanelOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WikipediaUI;