// Interaction code

// let url = new URL(input.url);
let url = new URL("https://www.booking.com/searchresults.en-gb.html");
url.searchParams.set('ss', 'New York');
url.searchParams.set('src', 'searchresults');
url.searchParams.set('checkin', '2024-09-01');
url.searchParams.set('checkout', '2024-09-02');
console.log(url.href);
navigate(url.href, {referer: 'https://www.google.com/'});
close_popup('[aria-label="Dismiss sign-in info."]', '[aria-label="Dismiss sign-in info."]');

if (el_exists('#dpSorryPage') || el_exists('#error')) {
    throw Error('Failed to load the page or encountered an error.');
}

collect(parse());



// Parser code

function checkerString(obj){
    Object.keys(obj).forEach((item) => {
      if(typeof obj[item] == "string" && !obj[item])
        obj[item] = null;
    });
    return obj;
  }
  
  function parse() {
      let results = [];
  
      $('[data-testid="property-card"]').each((index, card) => {
          let name = $(card).find('[data-testid="title"]').text().trim();
          let priceElement = $(card).find('[data-testid="price-and-discounted-price"]');
          let price = priceElement.length ? priceElement.text().trim() : null;
          
          let reviewScoreElement = $(card).find('[data-testid="review-score"]');
          let reviewScore = reviewScoreElement.length ? parseFloat(reviewScoreElement.text().match(/\d+(\.\d+)?/)[0]) : null;
          
          let reviewCountElement = $(card).find('[data-testid="review-score"] div:last-child');
          let reviewCount = reviewCountElement.length ? parseInt(reviewCountElement.text().replace(/\D/g, '')) : null;
  
          results.push(checkerString({
              name,
              price,
              score: reviewScore,
              reviews: reviewCount
          }));
      });
  
      return { results };
  }
  
  let data = parse();
  return data;
  