import { LightningElement, wire, track, api } from 'lwc';
import getAllTasks from '@salesforce/apex/TaskController.getAllTasks';
import searchTasks from '@salesforce/apex/TaskController.searchTasks';
import saveTasks from '@salesforce/apex/TaskController.saveTasks';

export default class taskorganizer extends LightningElement {
	@track searchTerm = '';

	@track tasklist = [];
	@track tasksHigh;
	@track tasksLow;
	@track error1;

	handleSelect2(evt) {
		//alert('Top Level2');
		//alert(evt.detail);

		//let temptasklist = this.tasklist;
		let tasks = this.tasklist.filter((task) => {
			if (task.Id=== evt.detail) {
			    if (task.Priority === "High") {
					//alert('must change to low');
					task.Priority = 'Medium';
				}
				else {
					//alert('must change to high');
					task.Priority = 'High';
			    }
				         
			}              
			return task;       
		});
		this.tasklist = tasks;
		this.split();
	}

	connectedCallback() {
		this.loadTasks();
	}


	loadTasks() {
		searchTasks({searchTerm: this.searchTerm})
			.then(result => {
				this.tasklist = result;
				this.split();
			})
			.catch(error => {
				this.error1 = error;
			});
	}

	Save() {
		alert('Save');
		saveTasks({tasksToUpdate: this.tasklist})
			.then(result => {
				//
			})
			.catch(error => {
				this.error1 = error;
			});
		
	}
	
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
			this.loadTasks();
		}, 300);
	}

	split() {
		//alert(this.tasklist);
		let tempHigh = [];
		let tempLow = [];

		this.tasklist.forEach(segregatetasks)
		function segregatetasks(t) {
			//alert(t.Priority);
			//alert(t.Id);
			if (t.Priority === "High") {
				tempHigh.push({value:t, key:t.Id});

			} else {
				tempLow.push({value:t, key:t.Id});
			}
		}
		this.tasksHigh = tempHigh;
		this.tasksLow = tempLow;
	}


}