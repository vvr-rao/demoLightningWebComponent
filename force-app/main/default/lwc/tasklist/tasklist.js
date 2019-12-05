import { LightningElement, track, api } from 'lwc';

export default class tasklist extends LightningElement {
    @api tasklistdata;
    @api category;

	handleSelect(event) {
	    //alert(event.detail);
	 	const event2 = new CustomEvent('itemclick2', {
            		detail: event.detail
        	});
        	this.dispatchEvent(event2);
	}
}