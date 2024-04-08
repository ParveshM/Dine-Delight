const MenuItemsShimmer = () => {
  return (
    <div className="relative bg-gray-100 animate-pulse border border-gray-300 rounded-md p-4">
      <div className="p-4">
        <div className="animate-pulse h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="animate-pulse h-4 w-1/2 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default MenuItemsShimmer;
