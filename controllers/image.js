const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "acd663ea308341d18e11dd62cbe16385",
});

const handleApiCall = (req, res) => {
  app.models
    .predict("f76196b43bbd45c99b4f3cd8e8b40a8a", req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with API"));
};

const handleImage = (req, res, database) => {
  const { id } = req.body;
  database("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries[0] !== undefined) {
        res.json(entries[0]);
      } else {
        res.status(404).json("No such user found");
      }
    })
    .catch((err) => res.status(400).json("Error updating entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
