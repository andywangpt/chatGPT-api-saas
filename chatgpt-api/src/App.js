import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./Components/Header"

function App() {
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:3001", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		})
			.then((res) => res.json())
			.then((data) => setResponse(data.message));
	};

	return (
      <div className="App">
         <Header />
			<form onSubmit={handleSubmit}>
				<textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				></textarea>
				<button type="submit">Submit</button>
			</form>
			<div><h5>Response:</h5><h6 className="m-3 p-3">{response}</h6></div>
		</div>
	);
}

export default App;
