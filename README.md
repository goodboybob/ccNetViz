Network graphs visualization library
====================================

[ccNetViz](http://helikarlab.github.io/ccNetViz) is a lightweight (22kB minified), high performance javascript library for large network graphs visualization using WebGL.
It enables custom styling of nodes and edges in css like way, dynamic changes of the network, force-directed layout and basic graph interactivity.
Used for example by [Cell Collective](http://cellcollective.org) project.
[ccNetViz](http://helikarlab.github.io/ccNetViz) is open source library available under [GPLv3](http://www.gnu.org/licenses/gpl-3.0.en.html) License.

**Basic Example**
```html
<!DOCTYPE html>
<html>
<head>
  <title>ccNetViz example</title>
  <style type="text/css">
    #container {
      width: 500px;
      height: 500px;
    }
  </style>
  <script src="ccNetViz-1.0.0.min.js"></script>
</head>
<body>
  <canvas id="container"/>
  <script>
    var graph = new ccNetViz(document.getElementById('container'), {
      styles: {
        node: { texture: "images/node.png", label: { hideSize: 16 } },
        edge: { arrow: { texture: "images/arrow.png" } }
      }});
    var nodes = [
      { label: "Hello" },
      { label: "World" },
      { label: "!" }
    ];
    var edges = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[1], target: nodes[2] },
      { source: nodes[2], target: nodes[1] }
    ];
    graph.set(nodes, edges, "force");
    graph.draw();
  </script>
</body>
</html>
```

**Documentation**

***ccNetViz(element, options)***

Creates new ccNetViz graph renderer attached to canvas element specified as first argument, styled with styles defined in styles property of options parameter.

*Example style options*

```javascript
{
  styles: {
    background: { color: "rgb(0, 0, 0)" },  //background color of canvas
    node: { //predefined style
      minSize: 8,   //minimum size of node representation in pixels
      maxSize: 16,    //maximum size of node representation in pixels
      color: "rgb(255, 0, 0)",  //node color (combined with node image)
      texture: "images/circle.png",   //node image
      label: {
        hideSize: 16,   //minimum size (height) for the label to be displayed
        color: "rgb(120, 0, 0)",  //label color
        font: "15px Arial, Helvetica, sans-serif" //label font
      }
    },
    edge: {   //predefined style
      width: 2,   //edge width in pixels
      color: "rgb(86, 86, 86)",   //edge color
      arrow: {
        minSize: 6,   //minimum size of arrow in pixels
        maxSize: 12,  //maximum size of arrow
        aspect: 2,  //aspect of arrow image
        texture: "images/arrow.png",  //arrow image
        hideSize: 2   //minimum size of arrow to be displayed
      }
    },
    nodeBlue: {   //custom style
      color: "rgb(0, 0, 255)"
    },
    nodeGiant: {  //custom style
      minSize: 16
    },
    nodeWithSmallBlueLabel: {   //custom style
      label: {
        color: "rgb(0, 0, 255)",
        font: "11px Arial, Helvetica, sans-serif"
      }
    },
    edgeWideYellow: {   //custom style
      width: 4,
      color: "rgb(255, 255, 0)"
    },
    edgeWithWhiteArrow: {   //custom style
      arrow: {
        color: "rgb(255, 255, 255)"
      }
    }
  }
}
```
