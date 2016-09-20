# node-sass-relative-asset-url – _Experimental_

Relative path output for image-url and font-url Sass functions.

See `assetUrl` function in the gulpfile.

## Important bit

This requires `this.options.file` inside the node-sass function. It is a reference to the Sass file being rendered.

node-sass says the `functions` property of the renderer is experimental, so **this is likely to change.** Without `this.options.file` or a similar property, this functionality is not possible.

`this.options.outFile` – the path to the output CSS file – would be preferred, but is `null` at the point of this function call.

## Input

```sass
// main.sass
body
    background-image: image-url('myimage.png')
```
```sass
// nested/nested.sass
.nested
    background-image: image-url('nested/mynestedimage.png')
```

## Output

```css
/* main.css */
body {
  background-image: url('../media/images/myimage.png'); }
```
```css
/* nested/nested.css */
.nested {
  background-image: url('../../media/images/nested/mynestedimage.png'); }
```
