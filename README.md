This is a simple directive to display the result of a Giphy search.

**Usage**

```<ng-giphy-search query="cats"></ng-giphy-search>```


You can optionally add ```limit``` and ```offset``` parameters like this

```<ng-giphy-search query="cats" limit="5" offset="0"></ng-giphy-search>```

By default the directive looks for ```giphy-view.html``` template, but you can pass your own template with the ```template-url``` parameter.

```<ng-giphy-search query="cats" template-url="my-giphy-view.html"></ng-giphy-search>```
