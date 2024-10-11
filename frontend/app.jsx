import React from "react";
import pb from "./service/pocketbase";

class App extends React.Component {
  render() {
    return (
      <>
        <TopBar />
      </>)
  }
}
export default App;
class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showTodos: true,
      isCreating: false,
    }
  }

  toggleCreatingOpen = () => {
    this.setState((prevState) => ({
      isCreating: !prevState.isCreating,
    }));
    this.toggleTodos;
  };
  toggleTodos = () => {
    this.setState((prevState) => ({
      showTodos: !prevState.showTodos,
    }));
  };

  handleLogout = () => {
    // Implement logout logic here
    alert("Logged out successfully!"); // Placeholder for now
  };

  render() {
    const { isCreating, showTodos } = this.state
    return (
      <>
        <div className="navbar">
          <div className="navbar-buttons">
            <button onClick={this.toggleCreatingOpen}>
              {isCreating ? "Close Todo Creation" : "Create Todo"}
            </button>
            <button onClick={this.handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        {/* Conditionally render Todos and CreateTodo components */}
        {showTodos && !isCreating && <Todos showTodos={showTodos}/>}
        {isCreating && <CreateTodo isCreating={isCreating} toggleCreatingOpen={this.toggleCreatingOpen} />}

      </>
      );
  }
}
class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
  }

  convertDate = (baseDateString) => {
    const time = new Date(baseDateString).toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
    });;
    const date = new Date(baseDateString).toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });;

    return date != "Invalid Date" && time != "Invalid Date" ? time + " Uhr " + date : "Nicht Bearbeitet";
  }

  async componentDidMount() {
    try {
      const list = await pb.collection('todo').getFullList({
        sort: '-created',
      });
      this.setState({ records: list });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const { records } = this.state;
    const { showTodos } = this.props;
    return (
      <div className={showTodos ? "container-open" : "container-closed"}>
        <div className="todo-outer-container">
          {records.map((record) => (
            <div className="todo">

              <article id={record.id}>
                <header><h4>{record.title}</h4></header>
                <h3>{record.title}</h3>
                <footer >
                  <div className="todo-footer">
                    <p><i className="fa-regular fa-clock"></i> {this.convertDate(record.created)}</p>
                    <hr />
                    {this.convertDate(record.updated) != "Nicht Bearbeitet"
                      ?
                      <p><i className="fa-solid fa-scissors"></i> {this.convertDate(record.updated)}</p>
                      : <></>}</div>
                </footer>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
class CreateTodo extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { isCreating } = this.props;
    return (
      <div className={isCreating ? "container-open" : "container-closed"}>
        <div className="content-conainer">
          <p>TEst</p>
        </div>
      </div>
    );
  }
}