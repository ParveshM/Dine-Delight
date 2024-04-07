export default function menuEntity(
  name: string,
  price: number,
  category: "starters" | "mainCourse" | "drinks" | "dessert",
  isVegetarian: boolean,
  restaurantId: string
) {
  return {
    getName: (): string => name,
    getPrice: (): number => price,
    getCategory: (): "starters" | "mainCourse" | "drinks" | "dessert" =>
      category,
    isVegetarian: (): boolean => isVegetarian,
    getRestaurantId: (): string => restaurantId,
  };
}
export type MenuEntityType = ReturnType<typeof menuEntity>;
