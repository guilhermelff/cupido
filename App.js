import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      text: ''
    }
  }



  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="mb-4 mt-4">
            <h1>Cupido Anonimus</h1>
            <h6>Mande uma mensagem anônima pro seu crush</h6>
          </div>
          <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
            <div className="form-group mb-4">
              <label htmlFor="email">Email do Destinatário</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="text">Mensagem</label>
              <textarea className="form-control" rows="5" value={this.state.text} onChange={this.onMessageChange.bind(this)} />
            </div>
            <button type="submit" className="btn btn-secondary">Enviar</button>
          </form>
        </div>
      </div>
    );
  }


  onEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  onMessageChange(event) {
    this.setState({ text: event.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    alert("Mensagem enviada!");
    this.resetForm()
    axios({
      method: "POST",
      url: "https://7xgz8xgcl4.execute-api.sa-east-1.amazonaws.com/dev/email",
      data: this.state
    }).then((response) => {
      if (response.status === 200) {
        alert("Message Sent.");
        this.resetForm()
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }

  resetForm() {
    this.setState({ name: "", email: "", message: "" })
  }
}

export default App;
