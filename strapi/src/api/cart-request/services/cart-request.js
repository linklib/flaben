'use strict';

/**
 * cart-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cart-request.cart-request');
