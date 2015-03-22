# hexo-mtg-card-jp

Mark-up MTG card name in hexo's post.

hexoのpost中に書かれたmtgのカードを、任意の形式でマークアップする。

This plugin use mtgjson.com .

## How to use

Modify `card.ejs` to define format.

card.xxx is card data from mtgjson.com ( http://mtgjson.com/ ).
content is original card name from your post.

```ejs
<span is="mtg_card"
<% if (card.types) { %> mtg_types="<%- card.types.join(' ').toLowerCase() %>"<% } -%>
<% if (card.colors) { %> mtg_colors="<%- card.colors.join(' ').toLowerCase() %>"<% } -%>
<% if (card.multiverseid) { %> mtg_multiverseid="<%- card.multiverseid %>"<% } -%>
><%- content %></span>
```

Card names in your post like... 

```markdown
《鐘突きのズルゴ/Zurgo Bellstriker(DTK)》
```

will be formatted like...

```html
<span is="mtg_card" mtg_types="creature" mtg_colors="red" mtg_multiverseid="394748">《鐘突きのズルゴ/Zurgo Bellstriker(DTK)》</span>
```

## install

```shell
$ npm install hexo-mtg-card-jp --save
```

And add _config.yml

```yaml
plugins:
- hexo-mtg-card-jp
```
