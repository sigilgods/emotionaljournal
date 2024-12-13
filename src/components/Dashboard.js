const Dashboard = () => {
  const { notes } = useNotes();
  
  // Count total available emotions
  const totalPositiveEmotions = Object.values(positiveEmotions).reduce(
    (total, category) => total + category.subEmotions.length, 
    0
  );
  
  const totalNegativeEmotions = Object.values(negativeEmotions).reduce(
    (total, category) => total + category.subEmotions.length, 
    0
  );

  const completedPositive = notes.filter(n => n.type === 'positive').length;
  const completedNegative = notes.filter(n => n.type === 'negative').length;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Emotional Journey</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-green-100">
          <h2 className="font-semibold text-green-800">Positive Emotions</h2>
          <p className="text-2xl font-bold text-green-600">
            {completedPositive}/{totalPositiveEmotions}
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-red-100">
          <h2 className="font-semibold text-red-800">Negative Emotions</h2>
          <p className="text-2xl font-bold text-red-600">
            {completedNegative}/{totalNegativeEmotions}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {notes.map(note => (
          <div key={note.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{note.emotion.name}</h3>
              <span className="text-sm text-gray-500">
                {new Date(note.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 