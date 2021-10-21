const handleGetProfile = (req, res, database) => {
  const { id } = req.params;

  database
    .select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length > 0) {
        res.json(user[0]);
      } else {
        res.status(404).json("No such user found");
      }
    })
    .catch((err) => res.status(400).json("Error getting user"));
};

module.exports = {
  handleGetProfile,
};
