const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const writeStream = fs.createWriteStream('simple_blog_posts.csv');

// write headers
writeStream.write(`Title, Link, Date \n`);

const url = 'http://codedemos.com/sampleblog';

request(url, (err, response, html) => {
    if(!err && response.statusCode == 200) {
        //   console.log(html);  // test
        const $ = cheerio.load(html);

      const posts = $('.post-preview').each((i, el) => {
          const post_title = $(el).find('.post-title').text().replace(/\s\s+/g, '');
          const post_link = $(el).find('a').attr('href');
          const post_date = $(el).find('.post-date').text().replace(/,/, '');
        //  console.log(post_title, post_link, post_date); // test

          // write row to CSV
          writeStream.write(`${post_title}, ${post_link}, ${post_date} \n`);

          console.log('Complete. Check the CSV file!')

      });

    }
});

