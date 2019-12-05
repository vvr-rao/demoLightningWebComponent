public without sharing class TaskController {
//Note that I did not set the (Cacheable=true) on my get and search functions. 
//I am not using a @Wire on the component because data retrived via @wire cannot be edited.
//the alternatiev to edit the data is to clone the @wire variable
    @AuraEnabled
    public static Task[] getAllTasks() {
        return [select Id, Priority, Status, Createddate, Subject, whoid, whatid, Account.name, Description from Task];
    }
    
    @AuraEnabled
    public static Task[] searchTasks(String searchTerm) {
        // Return all default when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            system.debug(getAllTasks());
            return getAllTasks();
        }
        // Prepare query paramters
        searchTerm = '%'+ searchTerm +'%';
        // Execute search query
        return [select Id, Priority, Status, Createddate, Subject, whoid, whatid, Account.name, Description from Task
         where account.name LIKE :searchTerm ORDER BY status LIMIT 50];
    }
    
    //save
    @AuraEnabled
    public static String saveTasks(list<Task> tasksToUpdate){
//        insert newRecord;
        system.debug(tasksToUpdate);
        update tasksToUpdate;
        return 'Success';
    }
}