const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../utils/token');

const EMAIL_RE = /^\S+@\S+\.\S+$/;
const payload = (user) => ({ token: signToken(user._id), user: { id: user._id, name: user.name, email: user.email } });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
    if (!EMAIL_RE.test(email)) return res.status(400).json({ message: 'Enter a valid email address' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'An account with this email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json(payload(user));
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    const ok = user && (await bcrypt.compare(password, user.password));
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });
    res.json(payload(user));
  } catch (err) { next(err); }
};

exports.me = (req, res) => res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email } });
