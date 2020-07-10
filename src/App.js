import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/Movies/Movies";
import LogIn from "./Components/LogIn/LogIn";
import { Route, Link, Redirect } from "react-router-dom";
import MovieMainPage from "./Components/MovieMainPage/MovieMainPage";
import { getAllMovies, loginUser, movieRatingsRequests } from "./apiCalls";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: {},
      error: "",
    };
    this.url = "https://rancid-tomatillos.herokuapp.com/api/v2";
  }

  componentDidMount() {
    const getMoviesRequest = async () => {
      try {
        let movies = await getAllMovies();
        this.setState({ movies: movies.movies, error: "" });
      } catch (error) {
        this.setState({ error: error });
      }
    };
    return getMoviesRequest();
  }

  componentDidUpdate() {
   if (this.state.user.id) {
      const getUserMovieRatings = async () => {
        try {
          const ratings = await movieRatingsRequests(this.state.user.id)
          this.setState({...ratings})
        } catch (error) {
          this.setState({ error: error });
        }
      }
      return getUserMovieRatings();
    }
  }

  postUser = async (userCredentials) => {
    try {
      const { user } = await loginUser(userCredentials);
      this.setState({ user: user });
      console.log(true, 'inside postUser');
      // return true
    } catch (error) {
      // alert('Incorrect email/password')
      console.log(JSON.parse(error), 'error inside PostUser');
      this.setState({ error: error });
      return error
    }
  };

  logOut = (event) => {
    event.preventDefault();
    if (event.target.innerHTML === "Log Out") {
      this.setState({
        user: {},
      });
    }
  };

  render() {
    return (
      <section>
        <h2> Rancid Tomatillos </h2>
        {this.state.user.name && <h3>Welcome, {this.state.user.name}!</h3>}

        <nav>
          {this.state.user.email ? (
              <button onClick={(event) => this.logOut(event)}>
              Log Out
              </button>
            ) : (
            <Link to="/login">
              <button>Log In!</button>
            </Link>
          )}
        </nav>

          <Route
            exact
            path="/movies/:id"
            render={({ match }) => {
              const { id } = match.params;
              const movie2Render = this.state.movies.find(
                (movie) => movie.id === parseInt(id)
              );
              return <MovieMainPage {...movie2Render} rootUrl={this.url} />;
            }}
          ></Route>

          <Route exact path="/login">
            <LogIn postUser={this.postUser} />
          </Route>

        <Route
          exact
          path='/user/:id'>
          <Movies movies={this.state.movies} ratings={this.state.ratings} userId={this.state.user.id} />
          {!this.state.user.name && <Redirect to="/" />}
          </Route>

          <Route exact path="/">
            {this.state.user.name && <Redirect to={`/user/${this.state.user.id}`} />}
            {this.state.movies && <Movies movies={this.state.movies} />}
          </Route>

      </section>
    );
  }
}

export default App;
