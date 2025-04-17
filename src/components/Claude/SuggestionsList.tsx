import { FC } from 'react';
import { FileText, Bookmark, X } from 'lucide-react';

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  sections?: number;
  image?: boolean;
}

interface SuggestionsListProps {
  suggestions: Suggestion[];
  bookmarkedSuggestions: string[];
  dismissSuggestion: (id: string) => void;
  toggleBookmark: (id: string) => void;
  title?: string;
}

const SuggestionsList: FC<SuggestionsListProps> = ({
  suggestions,
  bookmarkedSuggestions,
  dismissSuggestion,
  toggleBookmark,
  title = 'Recommended for you',
}) => (
  <div className="mt-4 text-left flex-1 overflow-y-auto">
    <h3 className="text-lg font-medium text-gray-700 mb-2 text-left">{title}</h3>
    {suggestions.map(item => (
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
                <Bookmark
                  className="w-5 h-5"
                  fill={bookmarkedSuggestions.includes(item.id) ? 'currentColor' : 'none'}
                />
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
);

export default SuggestionsList;