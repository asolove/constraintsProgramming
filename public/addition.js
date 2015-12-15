var NumberInput = React.createFactory(React.createClass({
  handleChange: function(e){
    this.props.onChange(this.props.name, parseInt(e.target.value));
  },
  render: function(){
    return React.DOM.div({},
      React.DOM.input({type: "range", min: 0, max: 10, value: this.props.value, onChange: this.handleChange}),
      React.DOM.span(null, this.props.value + " " + this.props.name)
    );
  }
}));

var AnimalCounts = React.createFactory(React.createClass({
  getInitialState: function(){
    var model = new AnimalModel();
    model.suggest("dogs", 2);
    model.suggest("cats", 3);

    var state = model.values();
    state.model = model;
    return state;
  },
  handleChange: function(name, value){
    this.state.model.suggest(name, value);
    this.setState(this.state.model.values());
  },
  render: function(){
    return React.DOM.div(null,
      NumberInput({name: "dogs", value: this.state.dogs, onChange: this.handleChange}),
      NumberInput({name: "cats", value: this.state.cats, onChange: this.handleChange}),
      NumberInput({name: "total", value: this.state.total, onChange: this.handleChange})
    );
  }
}));

var AnimalModel = function() {
  this.solver = new c.SimplexSolver();
  this.dogs = new c.Variable({name: "dogs"});
  this.cats = new c.Variable({name: "cats"});
  this.total = new c.Variable({name: "total"});

  // Ensure all variables are non-negative
  this.solver.addConstraint(new c.Inequality(this.dogs, c.GEQ, 0));
  this.solver.addConstraint(new c.Inequality(this.cats, c.GEQ, 0));

  // Ensure total = dogs + cats
  var sum = new c.Equation(this.total, c.plus(this.dogs, this.cats));
  this.solver.addConstraint(sum);

  this.weight = 1;
};

AnimalModel.prototype.values = function() {
  return {
    dogs: this.dogs.value,
    cats: this.cats.value,
    total: this.total.value
  };
};

AnimalModel.prototype.suggest = function(name, value){
  var variable = this[name]
  if(variable != this.lastEdited){
    this.solver.addEditVar(variable, c.Strength.strong, this.weight++);
    this.lastEdited = variable;
  }
  this.solver.suggestValue(variable, value).resolve();
};


ReactDOM.render(
  AnimalCounts(),
  document.getElementById("container"));
