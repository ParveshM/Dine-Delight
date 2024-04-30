import { useEffect, useState } from "react";
import ShimmerCard from "../../components/shimmers/ShimmerCard";
import { RestaurantInterface } from "../../types/RestaurantInterface";
import axios from "axios";
import { USER_API } from "../../constants";
import { useAppSelector } from "../../redux/store/Store";
import BookmarkCards from "../../components/user/Cards/BookmarkCards";

const Bookmarks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<RestaurantInterface[]>([]);
  const user = useAppSelector((state) => state.UserSlice);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(USER_API + `/users/${user.id}`)
      .then(({ data }) => {
        setBookmarks(data.user.bookmarks);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleRemoveBookmark = (restaurantId: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark._id !== restaurantId));
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 py-10 px-12  rounded-lg">
        <div className="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          ) : (
            <>
              {bookmarks.length ? (
                <>
                  {bookmarks?.map((res) => (
                    <BookmarkCards
                      {...res}
                      key={res._id}
                      handleRemoveBookmark={handleRemoveBookmark}
                    />
                  ))}
                </>
              ) : (
                <div className="col-span-6 flex flex-col justify-center items-center">
                  <h2 className="text-2xl  font-bold mb-2">No bookmarks yet</h2>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Bookmarks;
