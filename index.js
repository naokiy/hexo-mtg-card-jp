var fs          = require('fs'),
    pathFn      = require('path'),
    ejs         = require('ejs'),
    requestCard = require('mtg-card-sync');

var cardTmplThemeSrc = pathFn.join(hexo.theme_dir, 'plugins/mtg-card-jp/card.ejs');
var cardTmplOriginalSrc = pathFn.join(__dirname, './card.ejs');
var cardTmplSrc = (fs.existsSync(cardTmplThemeSrc)? cardTmplThemeSrc: cardTmplOriginalSrc);

var cardTmpl = ejs.compile(
  fs.readFileSync(cardTmplSrc, 'utf8'),
  {});

hexo.extend.filter.register('before_post_render', function(data) {
  data.content = data.content.replace(
    /《([^/(》]*)(\/[^(》]*)?(?:\(([^)]+)\))?》/g,
    function(content, cardNameA, cardNameB, cardSet) {
      var enCardName = (cardNameB? cardNameB.substring(1): cardNameA);

      if (!enCardName) {
        return content;
      }

      var card = requestCard(enCardName, cardSet) || {};

      return cardTmpl({card: card, content: content}).replace(/(?:\r|\n)/g, '');
    });
});
