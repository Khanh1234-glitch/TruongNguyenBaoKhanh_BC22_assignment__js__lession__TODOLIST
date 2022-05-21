export default class Validation {
    //constructor
    constructor() {}
  
    //method
    nullCheck(value, id) {
      if (value === "") {
        document.getElementById(id).style.border = "2px solid red";
        document.getElementById(id).setAttribute("placeholder", "Task không được rỗng !");
        return false;
      }
  
      document.getElementById(id).style.border = "none";
      document.getElementById(id).setAttribute("placeholder", "Enter an activity...");
      document.getElementById(id).removeAttribute("style");
      return true;
    }
  }