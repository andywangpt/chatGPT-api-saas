import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./Components/Header";

import robotPreparesDinner from "./Assets/robot-prepares-dinner.png";

function App() {
	const [message, setMessage] = useState("");
	const [response, setResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
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

	const handleReset = (e) => {
		e.preventDefault();
		setIsLoading(false);
		setMessage("");
		setResponse("");
	};

	return (
		<div className="card mx-auto my-2">
			<div className="card-title-top rounded-top">
				<Header />
			</div>

			<div id="cardBody" className="card-body rounded-bottom mx-0">
				<div className="form d-block mx-auto my-1">
					<h6 className="">
						What left over groceries do you have left in your fridge?
					</h6>

					<form onSubmit={handleSubmit}>
						<input
							className="form-control"
							type="text"
							placeholder="beef, onions, rice"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						></input>

						{!isLoading ? (
							<button className="btn btn-sm btn-dark m-1" type="submit">
								Submit
							</button>
						) : null}
					</form>
				</div>

				{isLoading && !response ? (
					<div class="spinner-border text-dark m-1" role="status"></div>
				) : null}

				{response ? (
					<div className="d-block flex-wrap mx-auto bg-light mx-1 my-1 rounded-2">
						<img
							src={robotPreparesDinner}
							alt="chowGPT"
							className="card-img-top"
						/>

						<pre className="card-text text-left mx-2 px-1 my-1">
							Here are some dinner ideas:{response}
						</pre>

						<button
							className="btn btn-sm btn-dark m-1"
							onClick={handleReset}
							type="button"
						>
							Try Again!
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default App;
