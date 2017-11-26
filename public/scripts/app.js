'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IndecisionApp);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      options: []
    }, _this.handleDeleteOptions = function () {
      _this.setState(function () {
        return { options: [] };
      });
    }, _this.handleDeleteOption = function (optionToRemove) {
      _this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (option) {
            return optionToRemove !== option;
          })
        };
      });
    }, _this.handlePick = function () {
      var randomIndex = Math.floor(Math.random() * _this.state.options.length);
      var option = _this.state.options[randomIndex];
      alert(option);
    }, _this.handleAddOption = function (option) {
      if (!option) {
        return 'Enter valid value to add item';
      } else if (_this.state.options.indexOf(option) > -1) {
        return 'This option already exists';
      }

      _this.setState(function (prevState) {
        return { options: [].concat(_toConsumableArray(prevState.options), [option]) };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        var options = JSON.parse(json);

        if (options) {
          this.setState(function () {
            return { options: options };
          });
        }
      } catch (e) {
        // Do nothing
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var subtitle = 'Put your life in the hands of a computer';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          handlePick: this.handlePick
        }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteOptions: this.handleDeleteOptions,
          handleDeleteOption: this.handleDeleteOption
        }),
        React.createElement(AddOption, { handleAddOption: this.handleAddOption })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
  var title = props.title,
      subtitle = props.subtitle;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      title
    ),
    subtitle && React.createElement(
      'h2',
      null,
      subtitle
    )
  );
};
Header.defaultProps = {
  title: 'Indecision'
};

var Action = function Action(props) {
  var hasOptions = props.hasOptions,
      handlePick = props.handlePick;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: handlePick,
        disabled: !hasOptions },
      'What should i do?'
    )
  );
};

var Options = function Options(props) {
  var options = props.options,
      handleDeleteOptions = props.handleDeleteOptions,
      handleDeleteOption = props.handleDeleteOption;

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: handleDeleteOptions },
      'Remove All'
    ),
    options.length === 0 && React.createElement(
      'p',
      null,
      'Please add an option to get started!'
    ),
    options.map(function (option) {
      return React.createElement(Option, {
        key: option,
        optionText: option,
        handleDeleteOption: handleDeleteOption
      });
    })
  );
};

var Option = function Option(props) {
  var optionText = props.optionText,
      handleDeleteOption = props.handleDeleteOption;

  return React.createElement(
    'div',
    null,
    optionText,
    React.createElement(
      'button',
      { onClick: function onClick(e) {
          return props.handleDeleteOption(optionText);
        } },
      'Remove'
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, AddOption);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = {
      error: undefined
    }, _this2.handleAddOption = function (e) {
      e.preventDefault();

      var form = e.target;
      var option = form.elements.option.value.trim();
      var error = _this2.props.handleAddOption(option);

      _this2.setState(function () {
        return { error: error };
      });

      if (!error) {
        form.reset();
      }
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(AddOption, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddOption },
          React.createElement('input', { type: 'text', name: 'option' }),
          React.createElement(
            'button',
            { type: 'submit' },
            'Add Option'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
