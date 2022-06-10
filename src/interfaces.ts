export interface Card {
  id: string | number
  src: string,
  matched: boolean,
  disabled: boolean
}
export interface Recipe {
  id: string | number
  title: string,
  ingredients: string[],
  method: string,
  cookingTime: string
}