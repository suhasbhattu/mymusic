const makeCallback = (controller) => {
  return (req, res) => {
    controller(req, res);
  };
};

module.exports = { makeCallback };
