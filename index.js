var request = require('sync-request'),
    fs      = require('fs'),
    pathFn  = require('path'),
    ejs     = require('ejs');

var cardTmplSrc = pathFn.join(__dirname, './card.ejs');
var cardTmpl = ejs.compile(
  fs.readFileSync(cardTmplSrc, 'utf8'),
  {});

var allSets, allCards;

var loadAllSets = function() {
  var URL = 'http://mtgjson.com/json/AllSets.json';
  allSets = JSON.parse(request('GET', URL, {json: true, cache: 'file'}).getBody().toString());
}

var loadAllCards = function() {
  var URL = 'http://mtgjson.com/json/AllCards.json';
  allCards = JSON.parse(request('GET', URL, {json: true, cache: 'file'}).getBody().toString());
}

// for async filtering
loadAllSets();
loadAllCards();

var getCardInfo = function(cardName, cardSet) {
  if (!cardName) {
    return {};
  }
  if (cardSet && allSets && allSets[cardSet]) {
    var cards = allSets[cardSet].cards;
    var length = cards.length;
    for (var i = 0; i < length; i++) {
      if (cards[i].name === cardName) {
        return cards[i];
      }
    }
  }
  if (allCards && allCards[cardName]) {
    return card[enCardName];
  }
  return {};
};

hexo.extend.filter.register('before_post_render', function(data) {
  data.content = data.content.replace(
    /《([^/(》]*)(\/[^(》]*)?(?:\(([^)]+)\))?》/g,
    function(content, cardNameA, cardNameB, cardSet) {
      var enCardName = (cardNameB? cardNameB.substring(1): cardNameA);

      if (!enCardName) {
        return content;
      }

      return cardTmpl(
        {card: getCardInfo(enCardName, cardSet), content: content})
        .replace(/(?:\r|\n)/g, '');
    });
});
