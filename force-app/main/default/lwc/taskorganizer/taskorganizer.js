import { LightningElement, wire, track, api } from 'lwc';
import getAllTasks from '@salesforce/apex/TaskController.getAllTasks';
import searchTasks from '@salesforce/apex/TaskController.searchTasks';

export default class taskorganizer extends LightningElement {
	@track searchTerm = '';

	@track tasklist = [];
	@track tasksHigh;
	@track tasksLow;
	@track error1;

	handleSelect2(evt) {
		alert('Top Level2');
		alert(evt.detail);
	}

	@wire(searchTasks, {searchTerm: '$searchTerm'}) allTasks({ error, data }) {
		if (data) {
            		this.tasklist = data;
            		this.split();
        	} else if (error) {
           		this.error = error;
        	}
	}
	
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
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