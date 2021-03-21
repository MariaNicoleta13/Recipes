const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.patch("/favoriteIds/:id", (req, res) => {
  //   const users = router.db.get("users");
  const { recipeId } = req.body;
  const { id: userId } = req.params;

  const userRecord = router.db.get("users").find({ id: userId });
  const { favoriteIds } = userRecord.value();
  favoriteIds.push(recipeId);
  const uniqueRecipeIds = [...new Set(favoriteIds)];

  userRecord.assign({ favoriteIds: uniqueRecipeIds }).write();

  res.jsonp(req.query);
});

server.use(router);
server.listen(3001, () => {
  console.log("ok");
});
