(function() {
  // Northline puts default collections of Landline maps together for you
  	// A simple moditifcation of Stateline https://github.com/propublica/landline
  // Requires jQuery and Raphael
  var MapCanvas = Landline.Northline = function(container, locality) {
    this.paper     = {};
    this.events    = {};
    this.attrs     = {};
    this.locality  = locality;
    this.container = $(container);
    this.container.css("position", "relative");
    this.container.height(this.container.width() * 1);
    if(locality.split('.')[0] == 'provinces') this.container.height(this.container.width() * 1.5);
    this.setupHtml();

    var that = this;
    $(window).resize(function() {
      that.container.height(that.container.width() * 1);
      that.setupHtml();
    });
  };

  MapCanvas.CONTAINERS = {
    "locality" : {el: "landline_locality"}
  };

  MapCanvas.prototype.on = function(evt, cb) {
    this.events[evt] = cb;
  };

  MapCanvas.prototype.style = function(fips, key, val) {
    this.attrs[fips] = (this.attrs[fips] || []);
    this.attrs[fips].push([key, val]);
  };

  MapCanvas.prototype.setupHtml = function() {
    var that = this;
    var locality = 'locality';
    var containers = MapCanvas.CONTAINERS;

	    containers[locality] = _.extend(containers[locality], {
	      width  : this.container.width(),
	      height : this.container.height() * 0.7,
	      top    : "0%",
	      left   : 0
	    });
   
    var setPositions = function(container) {
      $("#" + containers[container].el)
        .width(containers[container].width)
        .height(containers[container].height)
        .css("top", containers[container].top)
        .css("margin-left", that.container.width() * containers[container].left)
        .css("position", "absolute");
    };

    for (container in containers) {
      if (this.paper[container]) {
        setPositions(container);
        this.paper[container].setSize(containers[container].width, containers[container].height);
      } else {
        this.container.append("<div id='" + containers[container].el + "'></div>");
        setPositions(container);
        this.paper[container] = Raphael(containers[container].el)
        this.paper[container].setViewBox(0, 0, containers[container].width, containers[container].height);
      }
    }
  };



  MapCanvas.prototype.createMap = function() {
    var data;
    var that       = this;
    var containers = MapCanvas.CONTAINERS;
    data = window.Northline;
    for (container in containers) {
      var localityMap = '';
	  if(this.locality.split('.')[0] == 'provinces'){
	  	  var locality = this.locality.split('.')[1];
	      $.each(data['canada'].features,function(i,prov){
	      	if(locality == prov.properties.ISO3166_2){
				var match = {
				"type": "FeatureCollection",
				"crs": { "type": "n", "properties": { "n": "urn:ogc:def:crs:EPSG::102002" } },                                                               
				"features":[prov]
				}
	      		localityMap = new Landline(match).all();
	      	}
	      })
	  } else {
	      localityMap = new Landline(data[this.locality]).all();
	  }
      localityMap.asSVG(containers[container].width, containers[container].height, function(svg, it) {
        var path = that.paper[container].path(svg);
        var fips = it.fips = it.get("c") ? it.get("s") + it.get("c") : it.get("s");
          path.attr("fill", "#cecece")
              .attr('stroke-width', .5)
              .attr('stroke', '#ffffff')
              .attr('stroke-linejoin', 'bevel');
          if (that.attrs[fips]) {
            _(that.attrs[fips]).each(function(attr) {
              path.attr(attr[0], attr[1])
            });
          }
          _(that.events).each(function(func, evt) {
            path[evt](function(e) {
              func(e, path, it);
            });
          });
      });
    }
  };
}).call(this);