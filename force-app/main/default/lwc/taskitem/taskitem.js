import { LightningElement, track, api } from 'lwc';

export default class taskitem extends LightningElement {
    @api task;

    reprioritize() {
	//alert(this.task.Id);
        const event = new CustomEvent('itemclick', {
            detail: this.task.Id
        });
        this.dispatchEvent(event);
    }
}
