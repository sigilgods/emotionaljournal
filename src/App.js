import React, { useState, useEffect } from 'react';
import { 
  BarChart2, BookOpen, PlusCircle, 
  Settings as SettingsIcon, Smile, Frown, Zap,
  X, ChevronLeft 
} from 'lucide-react';
import { positiveEmotions, negativeEmotions } from './emotions';
import { NotesProvider, useNotes } from './context/NotesContext';

const initialEmotions = [
  { id: 1, name: 'Happy', triggers: [], color: 'bg-green-100' },
  { id: 2, name: 'Sad', triggers: [], color: 'bg-green-100' },
  { id: 3, name: 'Angry', triggers: [], color: 'bg-green-100' },
  { id: 4, name: 'Excited', triggers: [], color: 'bg-green-100' }
];

const emotionCategories = {
  happy: {
    icon: <Smile className="w-6 h-6" />,
    color: 'bg-green-100',
    label: 'Happy',
    subEmotions: [
      { name: 'Joyful', triggers: ['Achievement', 'Social connection', 'Nature'] },
      { name: 'Content', triggers: ['Relaxation', 'Comfort', 'Peace'] },
      { name: 'Excited', triggers: ['Adventure', 'New experiences', 'Success'] },
      { name: 'Grateful', triggers: ['Family', 'Friends', 'Health'] },
      { name: 'Proud', triggers: ['Accomplishment', 'Growth', 'Recognition'] }
    ]
  },
  sad: {
    icon: <Frown className="w-6 h-6" />,
    color: 'bg-blue-100',
    label: 'Sad',
    subEmotions: [
      { name: 'Lonely', triggers: ['Isolation', 'Missing someone', 'Rejection'] },
      { name: 'Disappointed', triggers: ['Failure', 'Unmet expectations', 'Loss'] },
      { name: 'Hurt', triggers: ['Betrayal', 'Criticism', 'Misunderstanding'] },
      { name: 'Hopeless', triggers: ['Overwhelm', 'Uncertainty', 'Failure'] },
      { name: 'Anxious', triggers: ['Future worries', 'Social pressure', 'Change'] }
    ]
  },
  angry: {
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-red-100',
    label: 'Angry',
    subEmotions: [
      { name: 'Frustrated', triggers: ['Obstacles', 'Tech issues', 'Traffic'] },
      { name: 'Irritated', triggers: ['Noise', 'Interruptions', 'Rudeness'] },
      { name: 'Furious', triggers: ['Injustice', 'Disrespect', 'Betrayal'] },
      { name: 'Annoyed', triggers: ['Small inconveniences', 'Waiting', 'Mess'] },
      { name: 'Resentful', triggers: ['Unfairness', 'Being ignored', 'Comparison'] }
    ]
  }
};

// Add new component for mood rating
const MoodRating = ({ onRate, onSkip }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 w-full max-w-sm">
      <h3 className="text-lg font-bold mb-4 text-center">How intense is this emotion?</h3>
      
      <div className="flex justify-around mb-4">
        <button 
          onClick={() => onRate('negative')}
          className="flex flex-col items-center p-4 rounded-lg bg-red-100 hover:bg-red-200"
        >
          <Frown className="w-8 h-8 mb-2 text-red-500" />
          <span>Negative</span>
        </button>
        
        <button 
          onClick={() => onRate('positive')}
          className="flex flex-col items-center p-4 rounded-lg bg-green-100 hover:bg-green-200"
        >
          <Smile className="w-8 h-8 mb-2 text-green-500" />
          <span>Positive</span>
        </button>
      </div>
      
      <button 
        onClick={onSkip}
        className="w-full p-2 text-gray-500 hover:text-gray-700"
      >
        Skip
      </button>
    </div>
  </div>
);

// Add Login component
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'daddy' && password === 'yes') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// Add Initial Mood component
const InitialMoodCheck = ({ onComplete }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 w-full max-w-sm">
      <h3 className="text-lg font-bold mb-4 text-center">How are you feeling today?</h3>
      
      <div className="flex justify-around mb-4">
        <button 
          onClick={() => onComplete('negative')}
          className="flex flex-col items-center p-4 rounded-lg bg-red-100 hover:bg-red-200"
        >
          <Frown className="w-8 h-8 mb-2 text-red-500" />
          <span>Not Great</span>
        </button>
        
        <button 
          onClick={() => onComplete('positive')}
          className="flex flex-col items-center p-4 rounded-lg bg-green-100 hover:bg-green-200"
        >
          <Smile className="w-8 h-8 mb-2 text-green-500" />
          <span>Good</span>
        </button>
      </div>
      
      <button 
        onClick={() => onComplete('skip')}
        className="w-full p-2 text-gray-500 hover:text-gray-700"
      >
        Skip
      </button>
    </div>
  </div>
);

const EmotionTypeSelector = ({ onSelect }) => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">What type of emotion?</h2>
    <div className="grid grid-cols-1 gap-4">
      <button
        onClick={() => onSelect('positive')}
        className="p-6 rounded-lg bg-green-100 hover:bg-green-200 flex items-center"
      >
        <span className="text-2xl mr-3">😊</span>
        <span className="text-lg">Positive Emotions</span>
      </button>
      
      <button
        onClick={() => onSelect('negative')}
        className="p-6 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center"
      >
        <span className="text-2xl mr-3">😢</span>
        <span className="text-lg">Negative Emotions</span>
      </button>
    </div>
  </div>
);

// Add this component for the header
const Header = ({ currentView, onBack, showBack }) => (
  <div className="flex items-center justify-between p-4 bg-white shadow-md">
    {showBack ? (
      <button 
        onClick={onBack}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <ChevronLeft />
      </button>
    ) : (
      <div className="w-8"></div>
    )}
    <h1 className="text-lg font-semibold">
      {currentView === 'dashboard' && 'Your Journey'}
      {currentView === 'emotionPicker' && 'Select Emotion'}
      {currentView === 'notepad' && 'Add Note'}
    </h1>
    <div className="w-8"></div>
  </div>
);

// Add Journal component
const Journal = () => {
  const { notes, deleteNote, clearAllNotes } = useNotes();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredNotes = notes.filter(note => 
    note.emotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Journal</h1>
        <button
          onClick={clearAllNotes}
          className="text-red-500 hover:text-red-700"
        >
          Clear All
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="space-y-4">
        {filteredNotes.map(note => (
          <div key={note.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className={`font-semibold ${
                  note.emotion.type === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {note.emotion.name}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-gray-600">{note.content}</p>
            <div className="mt-2 text-sm text-gray-500">
              Triggers: {note.emotion.triggers.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add Settings component
const Settings = () => {
  const [userSettings, setUserSettings] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    accessibility: {
      fontSize: 'normal',
      highContrast: false,
      reducedMotion: false,
      textToSpeech: false
    },
    notifications: {
      email: false,
      push: false,
      reminderTime: '20:00'
    }
  });

  const handleChange = (field, value) => {
    setUserSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAccessibilityChange = (setting) => {
    setUserSettings(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [setting]: !prev.accessibility[setting]
      }
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* Profile Settings */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={userSettings.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={userSettings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={userSettings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={userSettings.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Accessibility Settings */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Accessibility</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Size
            </label>
            <select
              value={userSettings.accessibility.fontSize}
              onChange={(e) => handleChange('fontSize', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">High Contrast</span>
            <button
              onClick={() => handleAccessibilityChange('highContrast')}
              className={`${
                userSettings.accessibility.highContrast ? 'bg-green-500' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  userSettings.accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Reduced Motion</span>
            <button
              onClick={() => handleAccessibilityChange('reducedMotion')}
              className={`${
                userSettings.accessibility.reducedMotion ? 'bg-green-500' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  userSettings.accessibility.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Text to Speech</span>
            <button
              onClick={() => handleAccessibilityChange('textToSpeech')}
              className={`${
                userSettings.accessibility.textToSpeech ? 'bg-green-500' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  userSettings.accessibility.textToSpeech ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Email Notifications</span>
            <button
              onClick={() => handleChange('notifications', {
                ...userSettings.notifications,
                email: !userSettings.notifications.email
              })}
              className={`${
                userSettings.notifications.email ? 'bg-green-500' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  userSettings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Reminder Time
            </label>
            <input
              type="time"
              value={userSettings.notifications.reminderTime}
              onChange={(e) => handleChange('notifications', {
                ...userSettings.notifications,
                reminderTime: e.target.value
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showEmotionPicker, setShowEmotionPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [emotions] = useState(initialEmotions);
  const [userEmotions, setUserEmotions] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([
    { type: 'ai', message: "Let's explore your emotions today. What's on your mind?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [showMoodRating, setShowMoodRating] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInitialMood, setShowInitialMood] = useState(false);
  const [emotionType, setEmotionType] = useState(null);
  const [showNotepad, setShowNotepad] = useState(false);
  const { notes, addNote } = useNotes();

  useEffect(() => {
    if (isLoggedIn) {
      setShowInitialMood(true);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleInitialMood = (mood) => {
    if (mood !== 'skip') {
      setCurrentConversation(prev => [
        ...prev,
        { type: 'ai', message: mood === 'positive' 
          ? "I'm glad you're feeling good! What's contributing to your positive mood?" 
          : "I see you're not feeling great. Would you like to talk about it?" }
      ]);
    }
    setShowInitialMood(false);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    setCurrentConversation(prev => [
      ...prev,
      { type: 'user', message: userInput },
      { type: 'ai', message: "Based on your patterns, this feeling often comes up when..." }
    ]);
    setUserInput('');
  };

  const handlePlusClick = () => {
    setCurrentView('emotionTypeSelector');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleEmotionSelect = (emotion) => {
    console.log('Selected emotion:', emotion);
    setSelectedEmotion({
      ...emotion,
      type: emotionType
    });
    setShowNotepad(true);
    setCurrentView('notepad');
  };

  const handleNoteSubmit = () => {
    const newNote = {
      id: Date.now(),
      emotion: selectedEmotion,
      content: noteContent,
      timestamp: new Date().toISOString()
    };
    
    addNote(newNote);
    setShowNotepad(false);
    setSelectedEmotion(null);
    setNoteContent('');
    setCurrentView('dashboard');
  };

  const handleMoodRate = (rating) => {
    // Process note with mood rating
    const aiProcessedNote = {
      emotion: selectedEmotion,
      category: selectedCategory,
      content: noteContent,
      intensity: rating,
      timestamp: new Date()
    };
    
    setCurrentConversation(prev => [
      ...prev,
      { type: 'user', message: noteContent },
      { type: 'ai', message: `I notice you're feeling ${selectedEmotion.toLowerCase()} with ${rating} intensity. Based on your note, it seems like...` }
    ]);
    
    // Reset states
    setShowMoodRating(false);
    setNoteContent('');
    setSelectedEmotion(null);
    setSelectedCategory(null);
    setCurrentView('conversation');
  };

  const handleSkipRating = () => {
    // Process note without rating
    handleMoodRate('neutral');
  };

  const handleEmotionClick = (emotion, trigger) => {
    console.log('Selected:', emotion.name, 'Trigger:', trigger);
    // Add your emotion handling logic here
  };

  const renderEmotionPicker = () => (
    <div className="p-4">
      {!selectedCategory ? (
        <div className="grid grid-cols-2 gap-4">
          {emotionType === 'positive' ? 
            Object.entries(positiveEmotions).map(([key, category]) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={`p-4 ${category.color} rounded-lg hover:opacity-90`}
              >
                <span className="text-2xl">{category.icon}</span>
                <div className="font-semibold">{category.name}</div>
              </button>
            )) :
            Object.entries(negativeEmotions).map(([key, category]) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={`p-4 ${category.color} rounded-lg hover:opacity-90`}
              >
                <span className="text-2xl">{category.icon}</span>
                <div className="font-semibold">{category.name}</div>
              </button>
            ))
          }
        </div>
      ) : (
        <div className="space-y-4">
          {emotionType === 'positive' ?
            positiveEmotions[selectedCategory].subEmotions.map((emotion) => (
              <div key={emotion.name} className="rounded-lg overflow-hidden shadow-md">
                <button
                  onClick={() => handleEmotionSelect(emotion)}
                  className={`w-full p-4 ${positiveEmotions[selectedCategory].color} hover:opacity-90`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      {emotion.name}
                    </span>
                    <ChevronLeft className="rotate-180" />
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Common triggers: {emotion.triggers.join(', ')}
                  </div>
                </button>
              </div>
            )) :
            negativeEmotions[selectedCategory].subEmotions.map((emotion) => (
              <div key={emotion.name} className="rounded-lg overflow-hidden shadow-md">
                <button
                  onClick={() => handleEmotionSelect(emotion)}
                  className={`w-full p-4 ${negativeEmotions[selectedCategory].color} hover:opacity-90`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      {emotion.name}
                    </span>
                    <ChevronLeft className="rotate-180" />
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Common triggers: {emotion.triggers.join(', ')}
                  </div>
                </button>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );

  const renderNotepad = () => {
    if (!showNotepad) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            Note about feeling {selectedEmotion?.name}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Common triggers: {selectedEmotion?.triggers?.join(', ')}
          </p>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write your thoughts about this emotion..."
            className="w-full h-32 p-2 border rounded-lg mb-4"
            autoFocus
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setShowNotepad(false);
                setSelectedEmotion(null);
                setNoteContent('');
                setCurrentView('dashboard');
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleNoteSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={!noteContent.trim()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEmotionTypeSelector = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">How are you feeling?</h2>
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => {
            setEmotionType('positive');
            setCurrentView('emotionPicker');
          }}
          className="p-6 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-between"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3">😊</span>
            <span className="text-lg">Positive Emotions</span>
          </div>
          <ChevronLeft className="rotate-180" />
        </button>
        
        <button
          onClick={() => {
            setEmotionType('negative');
            setCurrentView('emotionPicker');
          }}
          className="p-6 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-between"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3">😔</span>
            <span className="text-lg">Negative Emotions</span>
          </div>
          <ChevronLeft className="rotate-180" />
        </button>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      <div className="flex flex-col h-screen">
        <Header 
          currentView={currentView}
          showBack={currentView !== 'dashboard'}
          onBack={() => {
            setSelectedCategory(null);
            setShowNotepad(false);
            setCurrentView('dashboard');
          }}
        />

        <div className="flex-1 overflow-auto">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'emotionTypeSelector' && renderEmotionTypeSelector()}
          {currentView === 'emotionPicker' && renderEmotionPicker()}
          {currentView === 'journal' && <Journal />}
          {currentView === 'settings' && <Settings />}
        </div>
        
        {showNotepad && renderNotepad()}
        
        <div className="flex justify-around py-4 bg-white shadow-md">
          <NavButton icon={<BarChart2 />} view="dashboard" currentView={currentView} onClick={() => setCurrentView('dashboard')} />
          <NavButton icon={<BookOpen />} view="journal" currentView={currentView} onClick={() => setCurrentView('journal')} notes={notes} />
          <NavButton icon={<PlusCircle />} onClick={handlePlusClick} />
          <NavButton icon={<SettingsIcon />} view="settings" currentView={currentView} onClick={() => setCurrentView('settings')} />
        </div>
      </div>
    </div>
  );
}

const NavButton = ({ icon, view, currentView, onClick, notes }) => (
  <button 
    className={`p-3 rounded-lg relative ${view === currentView ? 'bg-green-500 text-white' : 'text-green-500'}`}
    onClick={onClick}
  >
    {icon}
    {view === 'journal' && notes?.length > 3 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {notes.length - 3}
      </span>
    )}
  </button>
);

const Dashboard = () => {
  const { notes } = useNotes();
  
  // Count total positive emotions from each category
  const positiveEmotionCounts = {
    happy: { total: positiveEmotions.happy.subEmotions.length, completed: 0 },
    interested: { total: positiveEmotions.interested.subEmotions.length, completed: 0 },
    relaxed: { total: positiveEmotions.relaxed.subEmotions.length, completed: 0 },
    peaceful: { total: positiveEmotions.peaceful.subEmotions.length, completed: 0 },
    strong: { total: positiveEmotions.strong.subEmotions.length, completed: 0 },
    loving: { total: positiveEmotions.loving.subEmotions.length, completed: 0 },
    alive: { total: positiveEmotions.alive.subEmotions.length, completed: 0 },
    open: { total: positiveEmotions.open.subEmotions.length, completed: 0 }
  };

  // Count total negative emotions from each category
  const negativeEmotionCounts = {
    angry: { total: negativeEmotions.angry.subEmotions.length, completed: 0 },
    depressed: { total: negativeEmotions.depressed.subEmotions.length, completed: 0 },
    confused: { total: negativeEmotions.confused.subEmotions.length, completed: 0 },
    helpless: { total: negativeEmotions.helpless.subEmotions.length, completed: 0 },
    indifferent: { total: negativeEmotions.indifferent.subEmotions.length, completed: 0 },
    afraid: { total: negativeEmotions.afraid.subEmotions.length, completed: 0 },
    hurt: { total: negativeEmotions.hurt.subEmotions.length, completed: 0 },
    sad: { total: negativeEmotions.sad.subEmotions.length, completed: 0 },
    judgmental: { total: negativeEmotions.judgmental.subEmotions.length, completed: 0 }
  };

  // Update completed counts from notes
  notes.forEach(note => {
    if (note.emotion.type === 'positive') {
      Object.keys(positiveEmotionCounts).forEach(category => {
        if (positiveEmotions[category].subEmotions.some(e => e.name === note.emotion.name)) {
          positiveEmotionCounts[category].completed++;
        }
      });
    } else {
      Object.keys(negativeEmotionCounts).forEach(category => {
        if (negativeEmotions[category].subEmotions.some(e => e.name === note.emotion.name)) {
          negativeEmotionCounts[category].completed++;
        }
      });
    }
  });

  // Get most recent 3 notes
  const recentNotes = notes.slice(-3).reverse();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Emotional Journey</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-green-100">
          <h2 className="font-semibold text-green-800 mb-3">Positive Emotions</h2>
          <div className="space-y-2 text-sm">
            {Object.entries(positiveEmotionCounts).map(([category, counts]) => (
              <div key={category} className="flex justify-between">
                <span className="capitalize">{category}:</span>
                <span>{counts.completed}/{counts.total}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-red-100">
          <h2 className="font-semibold text-red-800 mb-3">Negative Emotions</h2>
          <div className="space-y-2 text-sm">
            {Object.entries(negativeEmotionCounts).map(([category, counts]) => (
              <div key={category} className="flex justify-between">
                <span className="capitalize">{category}:</span>
                <span>{counts.completed}/{counts.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {recentNotes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Recent Notes</h2>
          <div className="space-y-3">
            {recentNotes.map(note => (
              <div key={note.id} className="p-4 bg-white rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-semibold ${
                    note.emotion.type === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {note.emotion.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(note.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const EmotionCard = ({ emotion }) => (
  <div className={`p-3 rounded-lg shadow ${emotion.color} flex items-center`}>
    <div className="mr-3">
      {emotion.name === 'Happy' && <Smile />}
      {emotion.name === 'Sad' && <Frown />}
      {emotion.name === 'Angry' && <Zap />}
    </div>
    <div>
      <h2 className="font-semibold">{emotion.name}</h2>
      <p className="text-sm text-gray-600">{emotion.triggers.length} triggers</p>
    </div>
  </div>
);

const RecentInsights = () => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-3">Recent Insights</h2>
    <div className="bg-gray-100 p-3 rounded-lg">
      <p>You often feel 'lousy' after playing video games and smoking.</p>
      <p>Learning new things makes you feel 'intrigued'.</p>
    </div>
  </div>
);

const Conversation = ({ conversation, userInput, setUserInput, handleSendMessage }) => (
  <div className="flex flex-col h-full">
    <div className="flex-grow overflow-y-auto p-4">
      {conversation.map((msg, i) => (
        <Message key={i} message={msg} />
      ))}
    </div>
    <ChatInput 
      value={userInput}
      onChange={setUserInput}
      onSend={handleSendMessage}
    />
  </div>
);

const Message = ({ message }) => (
  <div className={`mb-4 max-w-[80%] ${
    message.type === 'user' ? 'ml-auto text-right' : 'mr-auto text-left'
  }`}>
    <div className={`inline-block p-3 rounded-lg ${
      message.type === 'user' ? 'bg-green-500 text-white' : 'bg-gray-100'
    }`}>
      {message.message}
    </div>
  </div>
);

const ChatInput = ({ value, onChange, onSend }) => (
  <div className="p-4 border-t flex">
    <input 
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Share your feelings..."
      className="flex-grow p-2 border rounded-l-lg"
      onKeyPress={(e) => e.key === 'Enter' && onSend()}
    />
    <button 
      onClick={onSend}
      className="bg-green-500 text-white p-2 rounded-r-lg"
    >
      Send
    </button>
  </div>
);

const AppWrapper = () => {
  return (
    <NotesProvider>
      <App />
    </NotesProvider>
  );
};

export default AppWrapper;
