import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from '%vlocity_namespace%/omniscriptBaseMixin';

const CasesTableColumns = [
	{ label: 'Case Number', fieldName : 'CaseNumber'},
	{ label: 'Case Subject', fieldName : 'CaseSubject'},
	{ label: 'Case Priority', fieldName : 'CasePriority'},
	{ label: 'Case Status', fieldName : 'CaseStatus'},
];

export default class SelectCases extends OmniscriptBaseMixin(LightningElement) {
   //TO DO
   // Declare an @api variable that represents the accounts related cases passed from the Omniscript
	@api allCases;
    // TODO
    // Declare a constant columns, an array that represents the columns labels
	columns = CasesTableColumns;
    //TODO
    // Parse the cases passed from the Omniscript and set it equal to the api variable.
    // If there are no cases,move to the next step ( this.omniNextStep() )
    connectedCallback(){
        var cases = JSON.stringify(this.allCases);
        this.allCases = JSON.parse(cases);
        if(!cases.length) {
            this.omniNextStep();
        }
    }


    // TODO
    // This function is invoked when the user selects a row in the datatable.
    // Gets the selected rows from the datatable and passes it back to the Omniscript using omniApplyCallResp
    // omniApplyCallResp({
    //      ['name']: value
    // });
    getSelected() {
        var selectedRows =  this.template.querySelector("lightning-datatable").getSelectedRows();
        this.omniApplyCallResp({
                 ['selectedCases']: selectedRows
        });
    }
    

}