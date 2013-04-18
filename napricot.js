napricot = (function() {
  napricot = {};

  function renderPerfectElement(data) {
    var type = data[0];
    var attributes = data[1];
    var content = data[2];
    var element = document.createElement(type);

    _.each(attributes, function(value, key) {
      element.setAttribute(key, value);
    });

    if (!_.isUndefined(content)) {
      var child = napricot.render(content);
      element.appendChild(child);
    }

    return element;
  }

  function renderMaybeAttributelessElement(data) {
    if(_.isObject(data[1])) {
      return renderPerfectElement(data);
    } else {
      var fixed = _.clone(data);
      fixed.splice(1, 0, {});
      return renderPerfectElement(fixed);
    }
  }

  function renderElement(data) {
    return renderMaybeAttributelessElement(data)
  }

  napricot.render = function(data) {
    if(_.isString(data)) {
      return document.createTextNode(data);
    } else if (_.isArray(data)) {
      return renderElement(data);
    };
  };

  return napricot;
})();

