require('dotenv/config');

const mongoose = require('mongoose');
const cocktailModel = require('../models/Cocktail.model');
const cocktails = require('./cocktail.json');

const MONGO_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/server';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .then(() => {
    const transformCocktail = cocktails.map((cocktail) =>
      Object.entries(cocktail).reduce(
        (cocktail, [key, value]) => {
          if (key.includes('Ingredient') || key.includes('Measure')) {
            const number = +key.match(/\d+/g)[0] - 1;
            const name = key.match(/[a-z]+/gi)[0];
            if (value?.trim()) {
              if (!cocktail.ingredientAndMeasure[number]) {
                cocktail.ingredientAndMeasure[number] = {};
              }
              cocktail.ingredientAndMeasure[number][name] = value;
            }
          } else {
            cocktail[key] = value;
          }
          return cocktail;
        },
        { ingredientAndMeasure: [] }
      )
    );
    return cocktailModel.insertMany(transformCocktail);
  })
  .then(() => {
    console.log('cocktails created');
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err);
  })
  .finally(() => {
    mongoose.disconnect();
  });
