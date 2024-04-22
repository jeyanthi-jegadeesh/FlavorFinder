export interface Recipe{
    id : number,
    recipeId : number,
    title : string,
    // extendedIngredients :  [ { nameClean: string; amount: string; unit : string }],
    extendedIngredients : {
        nameClean: string | null;  // Allow for possible null values
        amount: string;
        unit?: string;  // Make 'unit' optional
    }[];
    instructions : string,
    image : string
}