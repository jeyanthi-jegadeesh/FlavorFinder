const apiService = require('../service/spoonacularApiService')
const recipeModel = require('../models/recipe');
const wishListModel = require('../models/userwishlist');
const userModel = require('../models/user');
const isNil = require('lodash.isnil');
const mongoose = require('mongoose');

async function getRandomRecipes(ctx) {
    
    try {
        const response =  await apiService.getRandomRecipes();
        const data = await response.json();
        ctx.body = data;
    }catch(error){
        console.error('Error fetching random recipe:', error);
        ctx.status = 500;
        ctx.body =   'Internal Server Error'  ;
    }
   
}

async function searchRecipes(ctx){
    try{
        const ingredients = ctx.params.ingredients;
        if(isNil(ingredients)){
            ctx.status = 400;
            ctx.body =  'Ingredients missing' ;
        }
        const response =  await apiService.searchRecipes(ingredients);
        const data = await response.json();
        ctx.body = data;
    }catch(error){
        console.error('Error fetching recipes with ingredients:', error);
        ctx.status =  500;
        ctx.body = 'Internal Server Error' ;
    }
}

async function saveRecipe(ctx){
    try{
        const recipeToAdd = ctx.request.body.recipe;
        const userId = ctx.request.body.userId;
        if(isNil(recipeToAdd) || isNil(userId)){
            ctx.status = 400;
            ctx.body = 'Missing input data';
        }
        // Query the recipes collection to find if recipe already exists
        let recipeData = await recipeModel.findOne({ recipeId: recipeToAdd.recipeId });
        // add recipe to Recipes collection only if recipe does not exists
        if(isNil(recipeData)){
            recipeData =  await recipeModel.create(recipeToAdd);
        }  
       
        // Convert userId and recipeId to ObjectId
        const userIdObj = new mongoose.Types.ObjectId(String(userId));
        const recipeIdObj = new mongoose.Types.ObjectId(String(recipeData._id));

        // Query the wishlist collection to find if the combination of userId and recipeId exists
        let wishlistItem = await wishListModel.findOne({ userId: userIdObj, recipeId: recipeIdObj });
        if (wishlistItem) {
            console.log("User ID and Recipe ID exist in the wishlist collection.");
            ctx.status = 400;
            ctx.body = 'Recipe already Exists in User Wishlist';
        } else {            
            wishlistItem = await wishListModel.create({ userId: userIdObj, recipeId: recipeIdObj });
            // fetch all recipeids for the user from user wishlist collection
            let userWishlist = await wishListModel.find({ userId: userIdObj });
           // const recipeIds = userWishlist.map((item) => item.recipeId);
            // fetch the recipe details from recipe collection for the given recipeids
           // let recipeData = await recipeModel.find({ _id: { $in: recipeIds } });
            ctx.status = 201;
            ctx.body = { recipeData, wishlistItem };
        }            

    }catch(error){
        console.error('Error saving recipe :', error);
        ctx.status = 500;
        ctx.body ='Internal Server Error' ;
    }
}

async function getWishList(ctx){
    try{
        const email = ctx.params.user;
        if(isNil(email)){
            ctx.body = 'Missing input values';
        }
        // Query the user colection with email parameter
        const user = await userModel.findOne({email: email});
        if(!isNil(user)){
            // Query the user wishlist collection with user id
            const userWishList = await wishListModel.find({ userId: user._id });
            const recipeIds = userWishList.map(item => item.recipeId);
            if(!isNil(userWishList)){
                const favoriteRecipes = await recipeModel.find({_id : recipeIds });
                ctx.body = favoriteRecipes;
            }
        }else{
            ctx.body = 'User does not exists';
        }   
    }catch(error){
        console.error('Error getting user favorite recipes:', error);
        ctx.status =  500;
        ctx.body = 'Internal Server Error';
    }
}

async function getRecipeDetails(ctx){
    try{
        const recipeId = ctx.params.recipeId;
        if(isNil(recipeId)){
            ctx.status = 400;
            ctx.body = 'Cannot get recipe details. Missing recipeId';
        }
        const response =  await apiService.getRecipeDetails(recipeId);
        const data = await response.json();
        ctx.body = data;
    }catch(error){
        console.error('Error getting recipe details:', error);
        ctx.status =  500;
        ctx.body = 'Internal Server Error';
    }
}
module.exports = {getRandomRecipes, searchRecipes, saveRecipe, getWishList, getRecipeDetails}