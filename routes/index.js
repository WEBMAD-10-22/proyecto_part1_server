module.exports = (app) => {
  app.use("/api", require('./index.routes'));
  app.use('/api/cocktail', require('./cocktail.routes'));
}