const catchAsync = require('../../utils/catchAsync');
const bcrypt = require('bcryptjs');
const {userService, tokenService} = require('../../services');

const viewLogin = (req, res) => {
  if (req.cookies.token) {
    req.flash('alerts', {info: 'Anda sudah login'});
    res.redirect('back');
  } else {
    res.render('auth/login');
  }
};

const viewChangePassword = (req, res) => {
  res.render('auth/change_password');
};

const login = catchAsync(async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) throw new Error('Email tidak terdaftar Anda!');

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) throw new Error('Email atau password Anda salah!');

    const token = tokenService.generateToken(user);

    // expiry time is 12 hours from now

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 12 * 3600000,
    });

    res.redirect('/');
  } catch (error) {
    req.flash('alerts', {error: error.message});
    res.redirect('/auth/login');
  }
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie('token');
  req.flash('alerts', {success: 'Logout berhasil'});
  res.redirect('/auth/login');
});

const changePassword = catchAsync(async (req, res) => {});

module.exports = {
  viewLogin,
  viewChangePassword,
  login,
  logout,
  changePassword,
};
