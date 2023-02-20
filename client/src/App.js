import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./Components/Header";
import aiKitchen from "./Assets/ai-kitchen.png";
import robotPreparesDinner from "./Assets/robot-prepares-dinner.png";

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
		<div id="main" className="card">
			<img className="card-img" src={aiKitchen} alt="Card image" />

			<div className="card-img-overlay">
				<div className="card-title-top rounded-top mt-5 mx-5 p-1">
					<Header />
				</div>

				<div id="cardBody" className="card-body rounded-bottom mx-5">
					<div className="form d-block mx-auto my-4 col-9">
						<h6 className="">
							What left over groceries do you have left in your fridge?
						</h6>
						<form onSubmit={handleSubmit}>
							<input
								className="form-control m-1"
								type="text"
								placeholder="beef, onions, rice"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							></input>
							<button className="btn btn-sm btn-dark" type="submit">
								Submit
							</button>
						</form>
					</div>

					{response ? (
						<div className="d-block mx-auto col-9 bg-light mx-3 my-5 pt-1 rounded-2">
							<img src={robotPreparesDinner} className="col-1" />
							<h6 className="">Response:</h6>
							<pre className="col-9 m-0 p-0">{response}</pre>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default App;
