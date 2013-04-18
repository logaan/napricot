napricot = (function() {
  napricot = {};

  function renderPerfectElement(data) {
    var type = data[0];
    var attributes = data[1];
    var children = data[2].children;
    var element = document.createElement(type);

    _.each(attributes, function(value, key) {
      element.setAttribute(key, value);
    });

    _.each(children, function(child) {
      element.appendChild(napricot.render(child));
    });

    return element;
  }

  function addBlankAttributes(data) {
    var fixed = _.clone(data);
    fixed.splice(1, 0, {});
    return fixed;
  }

  function withAttributes(data) {
    var attributesMaybe = data[1];

    if(_.isObject(attributesMaybe) && !_.isArray(attributesMaybe)) {
      return data
    } else {
      return addBlankAttributes(data);
    }
  }

  function withChildren(data) {
    var type = data[0];
    var attributes = data[1];
    var children = data[2];

    if(_.isObject(children) && !_.isArray(children)) {
      return data;
    } else {
      var fixedChildren = data.slice(2, data.length);
      var fixedElement = [type, attributes, {children: fixedChildren}]
      return fixedElement;
    }
  }

  function renderElement(data) {
    return renderPerfectElement(withChildren(withAttributes(data)));
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

