const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Generate JWT token
 * @param {object} payload
 * @param {string} secret
 * @returns {string} token
 */
const generateToken = (payload, secret = config.jwt_secret) => jwt.sign(payload, secret);

/**
 * Verify JWT token
 * @param {string} token
 * @param {string} secret
 * @returns {object} decoded
 */
const verifyToken = (token, secret = config.jwt_secret) => jwt.verify(token, secret);

module.exports = {generateToken, verifyToken};
