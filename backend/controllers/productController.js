const dj = require('../services/dummyjson');

exports.list = async (req, res, next) => {
  try {
    const { limit, skip, category, q } = req.query;
    res.json(await dj.getProducts({ limit: Number(limit) || 12, skip: Number(skip) || 0, category, q }));
  } catch (err) { next(err); }
};
exports.getOne = async (req, res, next) => {
  try { res.json(await dj.getProduct(req.params.id)); } catch (err) { next(err); }
};
exports.categories = async (req, res, next) => {
  try { res.json(await dj.getCategories()); } catch (err) { next(err); }
};
