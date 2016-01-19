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


var solver = new c.SimplexSolver();
var dogs = new c.Variable({name: "dogs"});
var cats = new c.Variable({name: "cats"});
var total = new c.Variable({name: "total"});

// Ensure total = dogs + cats
var sum = new c.Equation(total, c.plus(dogs, cats));
solver.addConstraint(sum);

// Let's try suggesting that we have 10 dogs.
solver.addEditVar(dogs).suggestValue(dogs, 10).resolve();
console.log("We now have", dogs.value, "dogs");
console.log("Plus", cats.value, "cats");
console.log("For a total of", total.value, "animals");

/*
We now have 10 dogs
Plus -10 cats
For a total of 0 animals

Whoops! That's mathematically true, but not very useful.
With constraint systems, you often have to spell out lots of things you take for granted.

In the next commit, we'll add some rules to keep the variables within reasonable ranges.
*/




