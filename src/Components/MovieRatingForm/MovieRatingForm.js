import React, { Component } from "react";
import "./MovieRatingForm.css";
import { addRating } from "../../apiCalls";

class MovieRatingForm extends Component {
  constructor({ movieId }) {
    super();
    this.state = {
      movieId: movieId,
      rating: null,
      error: ""
    }
  }
  formInputs = () => {
    const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return scores.map((score) => {
      return (
        <>
          <label htmlFor={`ratingChoice${score}`}>{score}</label>
          <input 
              key="score"
              type="radio" 
              id={`ratingChoice${score}`}
              name="rating" 
              value={score}
              checked={false}
              />
        </>
      )
    })
  }

  changeHandler = (event) => {
    this.setState({ rating:  event.target.value})
  }

 postMovieRating = async () => {
   const movieInfo = {
     movie_id: parseInt(this.state.movieId),
     rating: parseInt(this.state.rating)
   }
    try {
      const response = await addRating(movieInfo);
      console.log(response);
    } catch(error)  {
      this.setState({ error: error });
    }
  }

  render() {
    return (
        <>
          <form onChange={this.changeHandler}>{this.formInputs()}
            <button onClick={(event) => {
              event.preventDefault();
              console.log(event.target.parentNode)}}>Submit</button>
          </form>
        </>
    )
  }
}

export default MovieRatingForm;