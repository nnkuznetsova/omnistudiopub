import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from '%vlocity_namespace%/omniscriptBaseMixin';


export default class EditCases extends OmniscriptBaseMixin(LightningElement) {

   //TO DO
   // Declare an @api variable that represents the accounts related cases passed from the Omniscript
    @api selectedCases;
    
   // Declare an empty array updatedCases that represents updated cases

    updatedCases = [];
    // TODO
    // Parse the selected cases passed from the Omniscript
    // Skips to next step if no cases are selected (omniNextStep)
    connectedCallback(){
       var cases = JSON.stringify(this.selectedCases);
       this.updatedCases = JSON.parse(cases);
       if(!cases.length) this.OmniNextStep();
    }
   
    // TODO
    // Returns an array of labels that represents the picklist values of the Case Priority field
 
    get priorityOptions() {
        return [ {label: "Low", value: "Low"}, {label: "Medium", value: "Medium"},{label: "High", value: "High"}, ];

    }

     // TODO
    // Returns an array of labels that represents the picklist values of the Case Status field
    get statusOptions() {
        return [ {label: "Escalated", value: "Escalated"}, {label: "Closed", value: "Closed"},
            {label: "On Hold", value: "On Hold"}, {label: "New", value: "New"},];

    }

    // TODO
    // This function is invoked when the users chooses a picklist value for the Case Subject field
    // Adds the case associated with the change to the updatedCases if not already and updates tne
    // field to the new picklist value. Then passes the array back to the Omniscript

    handleSubjectChange(event){
        var cid = event.target.dataset.oneCase;
        var newvalue = event.target.value;
        var caseToUpdate = this.updatedCases.find(c => c.CaseId === cid);
        var ind = this.updatedCases.findIndex(c => c.CaseId === cid);
        caseToUpdate["CaseSubject"] = newvalue;
       
        this.updatedCases[ind] = caseToUpdate;
        this.omniApplyCallResp({ 
            ['updatedCases']: this.updatedCases 
        });     
    }


    // TODO
    // This function is invoked when the users chooses a picklist value for the Case Priority field
    // Adds the case associated with the change to the updatedCases if not already and updates tne
    // field to the new picklist value. Then passes the array back to the Omniscript
    handlePriorityChange(event){
        var cid = event.target.dataset.oneCase;
        var newvalue = event.target.value;
        var caseToUpdate = this.updatedCases.find(c => c.CaseId === cid);
        var ind = this.updatedCases.findIndex(c => c.CaseId === cid);
        caseToUpdate["CasePriority"] = newvalue;
       
        this.updatedCases[ind] = caseToUpdate;
        this.omniApplyCallResp({ 
            ['updatedCases']: this.updatedCases 
        });   
    }


    // TODO
    // This function is invoked when the users chooses a picklist value for the Case Status field
    // Adds the case associated with the change to the updatedCases if not already and updates tne
    // field to the new picklist value. Then passes the array back to the Omniscript
    handleStatusChange(event){
        var cid = event.target.dataset.oneCase;
        var newvalue = event.target.value;
        var caseToUpdate = this.updatedCases.find(c => c.CaseId === cid);
        var ind = this.updatedCases.findIndex(c => c.CaseId === cid);
        caseToUpdate["CaseStatus"] = newvalue;
       
        this.updatedCases[ind] = caseToUpdate;
        this.omniApplyCallResp({ 
            ['updatedCases']: this.updatedCases 
        }); 
    }
 
}