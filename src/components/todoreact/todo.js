import React, { useEffect, useState } from "react";
import "./style.css";

const getLocalData = () => {
	const lists = localStorage.getItem("mytodolist");
	if (lists) {
		return JSON.parse(lists);
	} else {
		return [];
	}
};

const Todo = () => {
	const [inputData, setInputData] = useState("");
	const [items, setItems] = useState(getLocalData());
	const [isEditItem, setIsEditItems] = useState("");
	const [toggleButton, setToggleButton] = useState(false);

	// add item function
	const addItem = (item) => {
		if (!inputData) {
			alert("Please fill the input");
		} else if (inputData && toggleButton) {
			setItems(
				items.map((curElem) => {
					if (curElem.id === isEditItem) {
						return { ...curElem, name: inputData };
					}
					return curElem;
				})
			);
			setInputData("");
			setIsEditItems(null);
			setToggleButton(false);
		} else {
			const myNewInputData = {
				id: new Date().getTime().toString(),
				name: inputData,
			};
			setItems([...items, myNewInputData]);
			setInputData("");
		}
	};

	// Update Items
	const editItem = (index) => {
		const item_todo_edited = items.find((curElem) => {
			return curElem.id === index;
		});
		setInputData(item_todo_edited.name);
		setIsEditItems(index);
		setToggleButton(true);
	};

	// delete items
	const deleteItem = (index) => {
		const updatedItem = items.filter((curElem) => {
			return curElem.id !== index;
		});
		setItems(updatedItem);
	};

	//remove all the items
	const removeAll = () => {
		setItems([]);
	};

	// adding local storage
	useEffect(() => {
		localStorage.setItem("mytodolist", JSON.stringify(items));
	}, [items]);

	return (
		<>
			<div className="main-div">
				<div className="child-div">
					<figure>
						{/* <img src="" alt="" /> */}
						📝
						<figcaption>Add Your List Here ✌️</figcaption>
					</figure>
					<div className="addItems">
						<input
							type="text"
							placeholder="✍️ Add Item"
							className="form-control"
							value={inputData}
							onChange={(e) => {
								setInputData(e.target.value);
							}}
						/>
						{toggleButton ? (
							<i className="far fa-edit " onClick={addItem}></i>
						) : (
							<i className="fa fa-solid fa-plus " onClick={addItem}></i>
						)}
						<div>
							{/* Show Items */}
							<div className="showItems">
								{items.map((curElem) => {
									return (
										<div className="eachItem" key={curElem.id}>
											<h3>{curElem.name}</h3>
											<div className="todo-button">
												<i
													class="far fa-edit add-btn"
													onClick={() => {
														editItem(curElem.id);
													}}
												></i>
												<i
													class="far fa-trash-alt add-btn"
													onClick={() => {
														deleteItem(curElem.id);
													}}
												></i>
											</div>
										</div>
									);
								})}
							</div>
							{/* Remove Items */}
						</div>
					</div>
					<div className="showItems">
						<button
							className="btn effect04"
							data-sm-link-text="Remove All"
							onClick={removeAll}
						>
							<span>CHECK LIST</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Todo;
