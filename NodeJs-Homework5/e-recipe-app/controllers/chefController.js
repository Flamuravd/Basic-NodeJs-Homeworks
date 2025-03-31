import Chef from '../models/Chef.js';

export const createChef = async (req, res) => {
  try {
    const chef = await Chef.create(req.body);
    res.status(201).json(chef);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChefById = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) return res.status(404).json({ message: 'Chef not found' });
    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};