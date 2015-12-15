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
    return {
      dogs: 2,
      cats: 3,
      total: 5
    };
  },
  handleChange: function(name, value){
    var stateChange = [], total;
    stateChange[name] = value;
    if(name == "dogs"){
      total = value + this.state.cats;
    } else if(name == "cats"){
      total = value + this.state.dogs;
    } else {
      // we're changing the total, what to do?
    }
    if(total) {
      stateChange.total = total;
    }
    this.setState(stateChange);
  },
  render: function(){
    return React.DOM.div(null,
      NumberInput({name: "dogs", value: this.state.dogs, onChange: this.handleChange}),
      NumberInput({name: "cats", value: this.state.cats, onChange: this.handleChange}),
      NumberInput({name: "total", value: this.state.total, onChange: this.handleChange})
    );
  }
}))

ReactDOM.render(
  AnimalCounts(),
  document.getElementById("container"));

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
  this.solver.addEditVar(variable).suggestValue(variable, value).resolve();
};

var model = new AnimalModel();
model.suggest("dogs", 10);
console.log(model.values()); // {dogs: 10, cats: 0, total: 10}
model.suggest("cats", 20);
console.log(model.values()); // {dogs: 10, cats: 20, total: 30}
model.suggest("total", 10);
console.log(model.values()); // {dogs: 10, cats: 0, total: 10}


