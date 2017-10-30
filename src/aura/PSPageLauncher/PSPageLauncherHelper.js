({
    getNeeds: function(component) {
        console.log("getNeeds invoked...");
        var action = component.get("c.getNeedOptions");

        var self = this;
        action.setCallback(this, function(actionResult) {
            console.log("received result...");
            console.log("result=" + JSON.stringify(actionResult.getReturnValue()));
            //component.set("v.needList", JSON.parse(actionResult.getReturnValue()));
            component.set("v.needList", actionResult.getReturnValue());
            component.set("v.selectedNeed", actionResult.getReturnValue()[0].Label__c);

            if (actionResult.getReturnValue()[0].Header__c != null) {
                component.set("v.selectedNeedHeader", actionResult.getReturnValue()[0].Header__c);
            } else {
                component.set("v.selectedNeedHeader", actionResult.getReturnValue()[0].Label__c);
            }



            this.getActions(component, component.get("v.selectedNeed"));
        });
        $A.enqueueAction(action);
    },
    getActions: function(component, need) {
        console.log("getActions invoked...");
        var action = component.get("c.getActionOptions");
        action.setParams({
            "need": need
        });

        var self = this;
        action.setCallback(this, function(actionResult) {
            console.log("received result...");
            console.log("result=" + JSON.stringify(actionResult.getReturnValue()));
            //component.set("v.needList", JSON.parse(actionResult.getReturnValue()));

            if (typeof actionResult.getReturnValue() == 'undefined' || actionResult.getReturnValue().length == 0) {
                component.set("v.pageURL", null);
                component.set("v.actionDesc", null);
                component.set("v.actionExpl", null);
                component.set("v.selectedAction", null);
                component.set("v.actionList", null);
            } else {
                component.set("v.actionList", actionResult.getReturnValue());
                component.set("v.selectedAction", actionResult.getReturnValue()[0].Label__c);

                if (actionResult.getReturnValue()[0].Page_URL__c != null) {
                    component.set("v.pageURL", actionResult.getReturnValue()[0].Page_URL__c);
                } else {
                    component.set("v.pageURL", "https://www.salesforce.com/dreamforce/");
                }

                component.set("v.actionDesc", actionResult.getReturnValue()[0].Description__c);
                component.set("v.actionExpl", actionResult.getReturnValue()[0].Explanation__c);
            }
        });
        $A.enqueueAction(action);
    }
})