# hexo-mtg-card-jp


## features

### Mark up MTG card name

Mark-up MTG card name in hexo's post.
hexoのpost中に書かれたmtgのカードを、任意の形式でマークアップする。

### Make IMG tag

Create IMG tag from Nunjucks tag in your post.
hexoのポスト中に書かれたNunjucksタグからIMG要素をつくる

This plugin use mtgjson.com .

## How to use

### Markup

#### Edit template

Modify `plugins/mtg-card-jp/card.ejs` in your theme directory to define format.

For example...

```ejs
<span is="mtg_card"
<% if (card.types) { %> mtg_types="<%- card.types.join(' ').toLowerCase() %>"<% } -%>
<% if (card.colors) { %> mtg_colors="<%- card.colors.join(' ').toLowerCase() %>"<% } -%>
<% if (card.multiverseid) { %> mtg_multiverseid="<%- card.multiverseid %>"<% } -%>
><%- content %></span>
```
card.xxx is card data from mtgjson.com ( http://mtgjson.com/ ).
content is original card name from your post.

#### Write card name into your post

For example...

```markdown
《鐘突きのズルゴ/Zurgo Bellstriker(DTK)》
```

#### This plugins format that card name.

The example will be translated as...  

```html
<span is="mtg_card" mtg_types="creature" mtg_colors="red" mtg_multiverseid="394748">《鐘突きのズルゴ/Zurgo Bellstriker(DTK)》</span>
```

### Create IMG tag

Please write like below in your post.

NOTE: Card set name is needed.

```md
{% mtg_card 《兜砕きのズルゴ/Zurgo Helmsmasher(KTK)》 %}
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
