public with sharing class PSPageLauncherController
{
  public PSPageLauncherController()
  {

  }

  @AuraEnabled
  public static List<PSLaunchNeed__c> getNeedOptions()
  {
    List<PSLaunchNeed__c> needList = [SELECT Id, Label__c, Header__c FROM PSLaunchNeed__c  ORDER BY createddate ASC];
    return needList;
  }

  @AuraEnabled
  public static List<PSLaunchAction__c> getActionOptions(String need)
  {
    List<PSLaunchAction__c> actionList = [SELECT Id, Label__c, Description__c, Explanation__c, Page_URL__c FROM PSLaunchAction__c WHERE PSLaunchNeed__r.Label__c = :need ORDER BY createddate ASC];
    return actionList;
  }
}