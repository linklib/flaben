'use strict';

/**
 * articles-content service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::articles-content.articles-content');
