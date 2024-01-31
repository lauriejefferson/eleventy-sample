const markdownIt = require('markdown-it');
const util = require('util');
const { DateTime } = require('luxon');
const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPlugin(emojiReadTime, { showEmoji: false });
  eleventyConfig.addFilter('md', function (content = '') {
    return markdownIt({ html: true }).render(content);
  });
  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(
      DateTime.DATE_MED
    );
  });
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!--excerpt-->',
  });
  eleventyConfig.addCollection('recentPosts', function (collection) {
    return collection.getFilteredByTag('post').reverse().slice(0, 2);
  });
  eleventyConfig.addFilter('dump', (obj) => {
    return util.inspect(obj);
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
      pathPrefix: '/eleventy-sample/',
    },
  };
};
