# cssbipolarchart
jQuery plugin to draw html5/CSS based bipolar bar chart

[Demo](https://srivig.github.io/cssbipolarchart/)

### For bipolar chart

```javascript
$("#example1").drawCSSBipolarChart({
          data: sampleData1,
          bipolar: true
})
```

**Data Format**

```javascript
[
  ["left label 1", "right label 1", 0.3],
  ["left label 2", "right label 2", 0.4]
]
```

### For simple bar chart

```javascript
$("#example1").drawCSSBipolarChart({
        data: sampleData1,
        bipolar: true
})
```

**Data Format**

```javascript
[
["left label 1", 0.3],
["left label 2", 0.4]
]
```

TODO:
* Add jQuery manifest info
* Cross browser tests
