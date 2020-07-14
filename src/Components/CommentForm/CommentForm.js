import React, { Component } from "react";
import { addComment } from "../../apiCalls";
import "./CommentForm.css";

class CommentForm extends Component {
  constructor({movieId, comments}) {
    super();
    this.state = {
      author: "",
      comment: "",
      movie_id: movieId,
      comments: comments,
      error: ""
    }
  }

  postComment = async () => {
    const commentInfo = {
      author: this.state.author,
      comment: this.state.comment,
      movie_id: this.state.movie_id
    }
    try {
      const response = await addComment(commentInfo);
      this.state.comments.push(response);
    } catch(error) {
      this.setState({error: error})
    }
  }

  updateCommentFields(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  formInputs = () => {
    return (
      <form title="comment-form">
        <label htmlFor="name">Name:</label>
          <input
            name="author"
            type="text"
            placeholder="name"
            onChange={(event) => this.updateCommentFields(event)}
          />
        <label htmlFor="comment">Comment:</label>
          <textarea
            name="comment"
            onChange={(event) => this.updateCommentFields(event)}
          />
        <button onClick={(event) => this.postComment(event)} type="button">Submit</button>
      </form>
    )
  }

  render() {
    return (
      <section>
        {this.formInputs()}
      </section>
    );
  }
} 

export default CommentForm;