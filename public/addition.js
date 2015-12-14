var NumberInput = React.createFactory(React.createClass({
  render: function(){
    return React.DOM.div({},
      React.DOM.span(null, this.props.name),
      React.DOM.input({type: "range", min: 0, max: 10, valie: this.props.value}),
      React.DOM.span(null, this.props.value)
      );
  }
}));

ReactDOM.render(
  NumberInput({name: "Things", value: 2}),
  document.getElementById("container"));