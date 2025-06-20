
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="text-gray-700 dark:text-white text-lg font-semibold">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
