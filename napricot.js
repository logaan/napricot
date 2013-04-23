napricot = (function() {
  napricot = {};

  function renderPerfectElement(data) {
    var type = data[0];
    var attributes = data[1];
    var children = data[2];
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

  function isNapricotElement(data) {
    return _.isArray(data) && _.isString(data[0]);
  }

  function wrapChild(data) {
    var fixed = _.clone(data);
    var newChildren = [];

    if(!_.isUndefined(fixed[2])) {
      newChildren.push(fixed[2]);
    }

    fixed[2] = newChildren;
    return fixed
  }

  function withChildren(data) {
    var children = data[2];

    if(_.isArray(children) && !isNapricotElement(data)) {
      return data;
    } else {
      return wrapChild(data);
    }
  }

  function renderElement(data) {
    return renderPerfectElement(withChildren(withAttributes(data)));
  }

  function renderElements(elements) {
    var fragment = document.createDocumentFragment();
    _.each(elements, function(element) {
      fragment.appendChild(napricot.render(element));
    });
    return fragment;
  }

  napricot.render = function(data) {
    if(_.isString(data)) {
      return document.createTextNode(data);
    } else if (_.isNaN(data)) {
      return document.createTextNode("");
    } else if(_.isNumber(data)) {
      return document.createTextNode(data);
    } else if (_.isArray(data)) {
      if (_.isString(data[0])) {
        return renderElement(data);
      } else {
        return renderElements(data);
      }
    } else {
      return document.createTextNode("");
    };
  };

  return napricot;
})();

