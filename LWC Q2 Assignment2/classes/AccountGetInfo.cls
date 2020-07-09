public class AccountGetInfo {
    
    @AuraEnabled(cacheable=true) 
    public static List<Account> getAccountByType(String typev){
       
        return [select Id,Name, Phone, Website, Industry, AccountNumber from Account where Type=:typev];
    }
   /* @AuraEnabled(cacheable=true) 
    public static List<Account> getAccounts(String accN, Integer noOfRec){
        String accName='%'+accN+'%';
        return [select Id,Name from Account where Name LIKE :accName Limit :noOfRec];
    }*/
}