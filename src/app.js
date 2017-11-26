class IndecisionApp extends React.Component {
  static defaultProps = {
    options: []
  }

  state = {
    options: this.props.options
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({ 
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }

  handlePick = () => {
    const randomIndex = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomIndex];
    alert(option);
  }

  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({ options: [ ...prevState.options, option ] }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}  
        />
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}



const Header = (props) => {
  const { title, subtitle } = props;
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
    </div>
  );
}
Header.defaultProps = {
  title: 'Indecision'
}



const Action = (props) => {
  const { hasOptions, handlePick } = props;
  return (
    <div>
      <button 
        onClick={handlePick}
        disabled={!hasOptions}>
        What should i do?
      </button>
    </div>
  );
}

const Options = (props) => {
  const { options, handleDeleteOptions, handleDeleteOption } = props;
  return (
    <div>
      <button onClick={handleDeleteOptions}>Remove All</button>
      {options.map((option) => (
        <Option 
          key={option} 
          optionText={option}
          handleDeleteOption={handleDeleteOption}
        />
      ))}
    </div>
  );
}



const Option = (props) => {
  const { optionText, handleDeleteOption } = props;
  return ( 
    <div>
      {optionText}
      <button onClick={(e) => props.handleDeleteOption(optionText)}>
        Remove
      </button>
    </div>
  );
}



class AddOption extends React.Component {
  state = {
    error: undefined
  };

  handleAddOption = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const option = form.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    form.reset();
  }
  
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}



ReactDOM.render(<IndecisionApp />, document.getElementById('app'))