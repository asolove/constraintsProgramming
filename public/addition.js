var NumberInput = React.createFactory(React.createClass({
  render: function(){
    return React.DOM.div({},
      React.DOM.input({type: "range", min: 0, max: 10, valie: this.props.value}),
      React.DOM.span(null, this.props.value + " " + this.props.name)
    );
  }
}));

var AnimalCounts = React.createFactory(React.createClass({
  getInitialState: function() {
    return {
      dogs: 2,
      cats: 3,
      total: 5
    };
  },
  render: function(){
    return React.DOM.div(null,
      NumberInput({name: "dogs", value: this.state.dogs}),
      NumberInput({name: "cats", value: this.state.cats}),
      NumberInput({name: "total", value: this.state.total})
    );
  }
}))

ReactDOM.render(
  AnimalCounts(),
  document.getElementById("container"));