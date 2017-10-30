({
    doInit: function(component, event, helper) {
        console.log('doInit...');

        helper.getNeeds(component);
    },
    onNeedChange: function(component, event, helper) {
        console.log('onNeedChange');
        var need = component.get("v.selectedNeed");
        var needList = component.get("v.needList");

        for (var i = 0; i < needList.length; i++) {
            if (need == needList[i].Label__c) {
                if (needList[i].Header__c != null) {
                    component.set("v.selectedNeedHeader", needList[i].Header__c);
                } else {
                    component.set("v.selectedNeedHeader", needList[i].Label__c);
                }
            }
        }

        helper.getActions(component, need);
    },
    onActionChange: function(component, event, helper) {
        console.log('onActionChange');
        var action = component.get("v.selectedAction");
        var actionList = component.get("v.actionList");

        for (var i = 0; i < actionList.length; i++) {
            if (action == actionList[i].Label__c) {
                if (actionList[i].Page_URL__c != null) {
                    component.set("v.pageURL", actionList[i].Page_URL__c);
                } else {
                    component.set("v.pageURL", "https://www.salesforce.com/dreamforce/");
                }

                component.set("v.actionDesc", actionList[i].Description__c);
                component.set("v.actionExpl", actionList[i].Explanation__c);
            }
        }

        helper.getActions(component, need);
    },
    handleActionButton: function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");

        urlEvent.setParams({
            "url": component.get("v.pageURL")
        });
        urlEvent.fire();
    }
})