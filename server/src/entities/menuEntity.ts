export default function menuEntity(
  name: string,
  price: number,
  category: "starters" | "main course" | "drinks" | "dessert",
  isVegetarian: boolean,
  restaurantId: string
) {
  return {
    getName: (): string => name,
    getPrice: (): number => price,
    getCategory: (): "starters" | "main course" | "drinks" | "dessert" =>
      category,
    isVegetarian: (): boolean => isVegetarian,
    getRestaurantId: (): string => restaurantId,
  };
}
export type MenuEntityType = ReturnType<typeof menuEntity>;
