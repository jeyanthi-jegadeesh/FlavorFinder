export interface Recipe{
    id : number,
    recipeId : number,
    title : string,
    extendedIngredients :  [ { nameClean: string; amount: string; unit : string }],
    instructions : string,
    image : string
}