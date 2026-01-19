export const ViewMoreButton = ({ onClick }) => {
  return (
    <div className="flex justify-center py-8">
      <button 
        onClick={onClick}
        className="px-8 py-3 bg-transparent text-zinc-400 border border-zinc-700 rounded-md 
                   hover:bg-zinc-800 hover:text-yellow-400 hover:border-zinc-500 
                   transition-all duration-300 uppercase tracking-widest text-sm font-bold"
      >
        View More
      </button>
    </div>
  );
};