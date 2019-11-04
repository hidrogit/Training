var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var path = require('./Path.js');
var LeafletPathView = path.LeafletPathView;
var LeafletPathModel = path.LeafletPathModel;

var LeafletPolylineModel = LeafletPathModel.extend({
    defaults: _.extend({}, LeafletPathModel.prototype.defaults, {
        _view_name : 'LeafletPolylineView',
        _model_name : 'LeafletPolylineModel',

        locations : [],
        smooth_factor : 1.0,
        no_clip : true
    })
});

var LeafletPolylineView = LeafletPathView.extend({
    create_obj: function () {
        this.obj = L.polyline(
            this.model.get('locations'),
            this.get_options()
        );
    },
    model_events: function () {
        LeafletPolylineView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:locations', function () {
            this.obj.setLatLngs(this.model.get('locations'));
        }, this);
    },
});

module.exports = {
  LeafletPolylineView : LeafletPolylineView,
  LeafletPolylineModel : LeafletPolylineModel,
};
