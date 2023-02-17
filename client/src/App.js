import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./Components/Header";

function App() {
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("/", {
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
			<div className="main-container rounded-3 m-5 p-2">
				<div className="card-title-top">
					<Header />
				</div>

				<div className="form d-block mx-auto col-9">
					<h6 className="">
						What left over groceries do you have in your fridge?
					</h6>
					<form onSubmit={handleSubmit}>
						<input
							className="form-control m-1"
							type="text"
							placeholder="beef, onions, rice"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						></input>
						<button className="btn btn-light btn-sm" type="submit">
							Submit
						</button>
					</form>
				</div>

				<div className="d-block mx-auto col-9 bg-light mx-5 my-3 py-1 rounded-2">
					<h6 className="">Response:</h6>
					<span className=""> {response}</span>
				</div>
			</div>

			<div className="card bg-light m-4">
				<div className="card-title-top rounded-top m-0 p-1 text-dark">
					<Header />
				</div>

				<div className="card-body rounded-bottom">
					<div className="form d-block mx-auto col-9">
						<h6 className="">
							What left over groceries do you have in your fridge?
						</h6>
						<form onSubmit={handleSubmit}>
							<input
								className="form-control m-1"
								type="text"
								placeholder="beef, onions, rice"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							></input>
							<button className="btn btn-light btn-sm" type="submit">
								Submit
							</button>
						</form>
					</div>

					<div className="d-block mx-auto col-9 bg-light mx-5 my-3 py-1 rounded-2">
						<h6 className="">Response:</h6>
						<span className=""> {response}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
