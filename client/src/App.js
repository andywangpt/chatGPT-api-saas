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

	return (
		<div id="main" className="card">
			<div className="card-img-overlay">
				<div className="card-title-top rounded-top mt-3 mx-3 p-1">
					<Header />
				</div>

				<div id="cardBody" className="card-body rounded-bottom mx-3">
					<div className="form d-block mx-auto my-1 col-11">
						<h6 className="">
							What left over groceries do you have left in your fridge?
						</h6>
						<form onSubmit={handleSubmit}>
							<input
								className="form-control m-1 mb-2"
								type="text"
								placeholder="beef, onions, rice"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							></input>
							{!isLoading ? (
								<button className="btn btn-sm btn-dark" type="submit">
									Submit
								</button>
							) : null}
						</form>
					</div>

					{isLoading && !response ? (
						<div class="spinner-border text-dark" role="status"></div>
					) : null}

					{response ? (
						<div className="card d-block mx-auto col-9 bg-light mx-1 my-1 rounded-2">
							<img src={robotPreparesDinner} className="card-img-top" />

							<p className="card-text">
								<pre className="d-flex mx-auto col-9 m-0 p-0 pb-1">
									Here are some dinner ideas:{response}
								</pre>
							</p>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default App;
