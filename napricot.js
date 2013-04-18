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

  function addBlankAttributes(data) {
    var fixed = _.clone(data);
    fixed.splice(1, 0, {});
    return fixed;
  }

  function fixAttributes(data) {
    var attributesMaybe = data[1];

    if(!_.isObject(attributesMaybe) || _.isArray(attributesMaybe)) {
      return addBlankAttributes(data);
    } else {
      return data
    }
  }

  function renderElement(data) {
    var withAttributes = fixAttributes(data);
    return renderPerfectElement(withAttributes);
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

