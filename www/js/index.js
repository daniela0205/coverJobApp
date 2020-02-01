var userLog;
var uEmployee;
var uEmployer;


// User 
function login(){

  var http = new XMLHttpRequest();
 var email = document.getElementById("emailLog").value;
 var password = document.getElementById("paswLog").value;
 console.log(email + password);
   const url = "http://localhost/APIRestCoverJob/public/login"; 
  http.open("POST",url,true);
  http.setRequestHeader("Content-type", "application/json");
  data = JSON.stringify(
     {
     email: email,
     password: password
     }
  )  
   http.send(data);
   http.onreadystatechange = (e) => {
    // userLog=
     var response =JSON.parse(http.responseText);
    console.log(response);
    userLog = response;
   var $id= response.data.id;
    console.log('id is' +$id);
    sw=checkEmployee($id);
    console.log(sw);
     if (http.status === 200) {
        if(checkEmployee($id)){
          location.replace("principal.html");
         }
         else {
            registerEmployee($id);
            location.replace("principal.html");
         }
         
       }  
     else{   
      alert("your introduce a wrong email or password");
     } 
 }
}

function registerUser(){

  var http = new XMLHttpRequest();
  var name = document.getElementById('nameReg').value;
  var email = document.getElementById("emailReg").value;
  var password = document.getElementById("pswReg").value;
  var password2 = document.getElementById("psw2Reg").value;
   const url = "http://localhost/APIRestCoverJob/public/register"; 
   http.open("POST", url,true);
   http.setRequestHeader("Content-type", "application/json");
   data = JSON.stringify(
      {
        name: name,
        email: email,
      password: password,
      password_confirmation: password2

       }
   )
    http.send(data);
    http.onreadystatechange = (e) => {
    if (http.status === 201) {
      //  registerEmployee();
        location.replace("login.html");
    }
    else{   
    document.getElementById('errorRegister').innerHTML="Your information was not save, try to register again";
   }
  }
}

function UpdateUser(){

  var http = new XMLHttpRequest();
  var name = document.getElementById('nameProfile').value;
  var email = document.getElementById("emailProfile").value;
  var password = document.getElementById("pswProfile").value;
  //var password2 = document.getElementById("psw2Reg").value;
   const url = "http://localhost/APIRestCoverJob/public/users"; 
   http.open("PUT", url,true);
   http.setRequestHeader("Content-type", "application/json");
   data = JSON.stringify(
      {
        name: name,
        email: email,
      password: password,
     // password_confirmation: password2

       }
   )
    http.send(data);
    http.onreadystatechange = (e) => {
    if (http.status === 201) {
      document.getElementById('nameProfile').innerHTML=name;
      document.getElementById('emailProfile').innerHTML=name;
      document.getElementById('pswProfile').innerHTML=name;
       
    }
    else{   
     alert('Your information was not save, try to register again');
   }
  }
}


function showAllJobs(){
  var http = new XMLHttpRequest(); 
  const url = "http://localhost/APIRestCoverJob/public/jobs";
  http.open("GET", url, true);
   http.send();

   http.onreadystatechange = (e) => {
   var response =JSON.parse(http.responseText);
   var jobs = response;

  // console.log(jobs);
   //console.log('cantida de jobs' + jobs.data.length);

 //   console.log(jobs.data[0]);
    $("#tableJob").append('<tr><th>#Ref</th>'+'<th>Name</th>'+
       '<th>City</th>' + '<th>check</th>');
  
  
  for (i = 0; i < jobs.data.length; i++){

// console.log('the status is' + jobs.data[i].status);

   if(jobs.data[i].status===1){
  //  var txt =jobs.data[i].id;
    $("#tableJob").append('<tr>' + 
      '<td>' + jobs.data[i].id + '</td>'+ 
       '<td>' + jobs.data[i].name + '</td>'+
       '<td>' + jobs.data[i].city + '</td>'+
       '<td>' + '<button id="btnSelect" class="btn btn-success" onclick="showJob()">' +'select'+'</button>' + '</td>'+'</tr>');
      //  '<td>' + '<a href="login.html" id="botonSelect" class="btn btn-success" role="button">' +'select'+'</a>' + '</td>'+'</tr>');
    }
          
}
    
}
}



// Employee



 function registerEmployee($id){

  var http = new XMLHttpRequest();
  //var phone = document.getElementById("phone").value;
  //var eircode = document.getElementById("eircode").value;
  var user_id= $id;
  

   const url = "http://localhost/APIRestCoverJob/public/employees"; 
   http.open("POST", url,true);
   http.setRequestHeader("Content-type", "application/json");
   data = JSON.stringify(
      {
      
    //    phone: phone,
      //  eircode: eircode,
        user_id: user_id


       }
   )
    http.send(data);
    http.onreadystatechange = (e) => {
     var response = http.responseText;
     console.log(response);


   // location = "#login.html";

  }
}

function checkEmployee(id){

  var http = new XMLHttpRequest(); 
  var id = uEmployee.id;
    const url = "http://localhost/APIRestCoverJob/public/useremployee/?id="+id ;
    http.open("GET", url, true);
     http.send();
 
     http.onreadystatechange = (e) => {
      var response =JSON.parse(http.responseText);
     console.log(http.status);
    
     if (http.status === 200) {
      uEmployee=response;
      return true;
    }
    else{
      return false;
    }      
}
}

function ApplyJob(){

  if (userLog!=null) // is loggin
  {   
  
    var http = new XMLHttpRequest();
    var id = document.getElementById('jobId').value;
    var idEmployee = checkEmployee(userLog.id);
    const url = "http://localhost/APIRestCoverJob/public/jobs/"+id+"/employees/"+idEmployee+ "/applicants"; 
     http.open("POST", url,true);
     http.setRequestHeader("Content-type", "application/json");
    //  data = JSON.stringify(
    //     {
    //       name: name,
    //       email: email,
    //     password: password,
    //     password_confirmation: password2
  
    //      }
    //  )
      http.send(data);
      http.onreadystatechange = (e) => {
              if (http.status === 200) {
                alert("You applied for this job");
                  location.replace("principal.html");
              }
              else{   
                alert("You application could not be process please try again");
  
            }
      }
    }
    else{
           alert('Please you need to be login to apply for this job')
           location.replace("login.html");
  
    }
  }
  
function showUpComingJob(){
  var http = new XMLHttpRequest(); 
     const url = "http://localhost/APIRestCoverJob/public/employees/?"+id+"/applicants/";
    http.open("GET", url, true);
      http.send();
  
      http.onreadystatechange = (e) => {
        var response =JSON.parse(http.responseText);
        var jobs = response;
     
         $("#tableJobUC").append('<tr><th>#Ref</th>'+'<th>Name</th>'+
            '<th>City</th>' + '<th>Start Date</th>');
       
       
       for (i = 0; i < jobs.data.length; i++){
     
     
        if(jobs.data[i].status===1){
         $("#tableJob").append('<tr>' + 
           '<td>' + jobs.data[i].id + '</td>'+ 
            '<td>' + jobs.data[i].name + '</td>'+
            '<td>' + jobs.data[i].start_date + '</td>'+'</tr>');
          }
               
     }
         
     }


}  

function updateEmployee(){

  var http = new XMLHttpRequest();
  var phone = document.getElementById("phone").value;
  var eircode = document.getElementById("eircode").value;
  var levelEdu = document.getElementById("selectLevelEdu").value;
  var certification = document.getElementById("certification").value;
  var cv = document.getElementById("fileID").value;
  
  

   const url = "http://localhost/APIRestCoverJob/public/employees"; 
   http.open("PUT", url,true);
   http.setRequestHeader("Content-type", "application/json");
   data = JSON.stringify(
      {
      
      phone: phone,
      eircode: eircode,
      levelEdu:levelEdu ,
      certification: certification,
      cv: cv,
      


       }
   )
    http.send(data);
    http.onreadystatechange = (e) => {

      if (http.status === 200) {
        document.getElementById('phone').innerHTML=phone;
        document.getElementById('eircode').innerHTML =eircode;
        document.getElementById('levelEdu').innerHTML =levelEdu;
        document.getElementById('certification').innerHTML =certification;
        document.getElementById('cv').innerHTML = cv;
       
      }
      else{
        alert('the update can not be save, please try again')
      }      
    

   // location = "#login.html";

  }


}

function  updateProfile(){

  UpdateUser();
  updateEmployee();
}

function  updateCV(){

  updateEmployee();

}



// Employer


function registerEmployer(){

 
  var user_id= userLog.id;
  
if(!checkEmployer(user_id)){
   const url = "http://localhost/APIRestCoverJob/public/employers"; 
   http.open("POST", url,true);
   http.setRequestHeader("Content-type", "application/json");
   data = JSON.stringify(
      {
        user_id: user_id
       }
   )
    http.send(data);
    http.onreadystatechange = (e) => {
     var response = http.responseText;
     console.log(response);

     if (http.status === 200) {
      uEmployer=response;
      
    }
    else{
        alert('some problem at save your information, please try again');
    }      
 

  }

}else{
  updateEmployer();

}


}

function checkEmployer(id){

  var http = new XMLHttpRequest(); 
  var id = uEmployee.id;
    const url = "http://localhost/APIRestCoverJob/public/useremployer/?id="+id ;
    http.open("GET", url, true);
     http.send();
 
     http.onreadystatechange = (e) => {
      var response =JSON.parse(http.responseText);
     console.log(http.status);
    
     if (http.status === 200) {
      uEmployer=response;
      return true;
    }
    else{
      return false;
    }      
}
}

function updateEmployer(){


  var http = new XMLHttpRequest();
  var company = document.getElementById("company").value;
  var nameContact = document.getElementById("nameContact").value;
  var contactPhone = document.getElementById("contactPhone").value;

  

   const url = "http://localhost/APIRestCoverJob/public/employers"; 
   http.open("PUT", url,true);
   http.setRequestHeader("Content-type", "application/json");
   data = JSON.stringify(
      {
        company: company,
        contact_name: nameContact,
        contact_phone:contactPhone 
       }
   )
    http.send(data);
    http.onreadystatechange = (e) => {

      if (http.status === 200) {
        document.getElementById('company').innerHTML=company;
        document.getElementById('nameContact').innerHTML =nameContact;
        document.getElementById('contactPhone').innerHTML =contactPhone;
      
       
      }
      else{
        alert('the update can not be save, please try again')
      }      
    

   // location = "#login.html";

  }

}

function postJob(){

  var http = new XMLHttpRequest();
  var jobTitle = document.getElementById("jobTitle").value;
  var jobDetails = document.getElementById("jobDetails").value;
  var jobEircode = document.getElementById("jobEircode").value;
  var jobCity = document.getElementById("jobCity").value;
  var jobStartDay = document.getElementById("jobStartDay").value;
  var jobStartTime = document.getElementById("jobStartTime").value;
  var jobendDay = document.getElementById("jobendDay").value;
  var jobEndTime = document.getElementById("jobEndTime").value;
  var jobPayment = document.getElementById("jobPayment").value;
  var jobCategory = showCategoryID(document.getElementById("jobCategory").value);
  var status = 1;
  var  employer_id =  uEmployer.id;


  const url = "http://localhost/APIRestCoverJob/public/jobs"; 
   http.open("POST", url,true);
   http.setRequestHeader("Content-type", "application/json");
   data = JSON.stringify(
      {
        name: jobTitle,
        details: jobDetails,
        eircode:jobEircode,
        city:jobCity ,
        start_date: jobStartDay,
        start_time: jobStartTime,
        end_date: jobendDay,
        end_time:jobEndTime ,
        payment: jobPayment,
        status:  status,
        category_id: jobCategory,
        employer_id: employer_id 

       }
   )
    http.send(data);
    http.onreadystatechange = (e) => {
     var response = http.responseText;
     console.log(response);

     if (http.status === 200) {
      alert('You post a job');
     // uEmployer=response;
      
    }
    else{
        alert('some problem at save your information, please try again');
    }      
 

  }

}

function showJobsPost(){

  var http = new XMLHttpRequest(); 
  var id= uEmployer.id;
  const url = "http://localhost/APIRestCoverJob/public/employers/?id="+id+"/jobs";
  http.open("GET", url, true);
   http.send();

   http.onreadystatechange = (e) => {
   var response =JSON.parse(http.responseText);
   var jobs = response;

  
    $("#tableJob").append('<tr><th>#Ref</th>'+'<th>Name</th>'+
       '<th>Status</th>' + '<th>Update</th>'+ '<th>Applied</th>');
  
  
  for (i = 0; i < jobs.data.length; i++){

// console.log('the status is' + jobs.data[i].status);

  //  if(jobs.data[i].status===1){
  //  var txt =jobs.data[i].id;
    $("#tableJobPost").append('<tr>' + 
      '<td>' + jobs.data[i].id + '</td>'+ 
       '<td>' + jobs.data[i].name + '</td>'+
       '<td>' + jobs.data[i].status + '</td>'+
       '<td>' + '<button id="btnSelectJob" class="btn btn-success" onclick="updateJob()">' +'update'+'</button>' + '</td>'+
       '<td>' + '<button id="btnviewApplications" class="btn btn-success" onclick="showApplicantions()">' +'Applicants'+'</button>' + '</td>'+'</tr>');
      //  '<td>' + '<a href="login.html" id="botonSelect" class="btn btn-success" role="button">' +'select'+'</a>' + '</td>'+'</tr>');
    // }
          
}
    
}

}

function updateJob(){
  var http = new XMLHttpRequest();
  var jobTitle = document.getElementById("jobTitle").value;
  var jobDetails = document.getElementById("jobDetails").value;
  var jobEircode = document.getElementById("jobEircode").value;
  var jobCity = document.getElementById("jobCity").value;
  var jobStartDay = document.getElementById("jobStartDay").value;
  var jobStartTime = document.getElementById("jobStartTime").value;
  var jobendDay = document.getElementById("jobendDay").value;
  var jobEndTime = document.getElementById("jobEndTime").value;
  var jobPayment = document.getElementById("jobPayment").value;
  var jobCategory = showCategoryID(document.getElementById("jobCategory").value);
  var status =  document.getElementById("jobStatus").value;

  
  var  employer_id =  uEmployer.id;


  const url = "http://localhost/APIRestCoverJob/public/jobs"; 
   http.open("PUT", url,true);
   http.setRequestHeader("Content-type", "application/json");
   data = JSON.stringify(
      {
        name: jobTitle,
        details: jobDetails,
        eircode:jobEircode,
        city:jobCity ,
        start_date: jobStartDay,
        start_time: jobStartTime,
        end_date: jobendDay,
        end_time:jobEndTime ,
        payment: jobPayment,
        status:  status,
        category_id: jobCategory
       }
   )
    http.send(data);
    http.onreadystatechange = (e) => {
     var response = http.responseText;
     console.log(response);

     if (http.status === 200) {
      alert('You update the information of the job');
     // uEmployer=response;
      
    }
    else{
        alert('some problem at save your information, please try again');
    }      
 

  }


}

function showApplicantions(){

  var http = new XMLHttpRequest(); 
  var id= idFromTable('#tableJobPost');
  const url = "http://localhost/APIRestCoverJob/public/jobs/?id="+id+"/applicants";

  http.open("GET", url, true);
   http.send();

   http.onreadystatechange = (e) => {
   var response =JSON.parse(http.responseText);
   var applicants = response;
 

  
    $("#tableApplicants").append('<tr><th>#Ref</th>'+'<th>Empoyee</th>'+
       '<th>status</th>' + '<th>Update</th>');
  
  
  for (i = 0; i < jobs.data.length; i++){

    var nameEmployee =  getName(jobs.data[i].employee_id);

// console.log('the status is' + jobs.data[i].status);

  //  if(jobs.data[i].status===1){
  //  var txt =jobs.data[i].id;
    $("#tableApplicants").append('<tr>' + 
      '<td>' + applicants.data[i].id + '</td>'+ 
       '<td>' + nameEmployee + '</td>'+
       '<td>' + applicants.data[i].status + '</td>'+
       '<td>' + '<button id="btnSelectJob" class="btn btn-success" onclick="updateApplicantions()">' +'update'+'</button>' + '</td>'+'</tr>');
      //  '<td>' + '<a href="login.html" id="botonSelect" class="btn btn-success" role="button">' +'select'+'</a>' + '</td>'+'</tr>');
    // }
          
}
    
}

}

function updateApplicantions(){

var id=idFromTable(name);

 var http = new XMLHttpRequest();
  var statusApplicants = document.getElementById("statusApplicants").value;
  var rankingApplicants = document.getElementById("rankingApplicants").value;
  var fbApplicants = document.getElementById("fbApplicants").value;
 


  const url = "http://localhost/APIRestCoverJob/public/applicants/?id="+id; 
   http.open("PUT", url,true);
   http.setRequestHeader("Content-type", "application/json");
   data = JSON.stringify(
      {
        status: statusApplicants,
        ranking: rankingApplicants,
        feedback:fbApplicants
       }
   )
    http.send(data);
    http.onreadystatechange = (e) => {
     var response = http.responseText;
     console.log(response);

     if (http.status === 200) {
      alert('You update the information of the Applicantions');
     // uEmployer=response;
      
    }
    else{
        alert('some problem at save your information, please try again');
    }      
 

  }


}


//General
function showCategoryID(category){

}
function showCategories(){

}

function getName(id){

}

function showJob(){
  var id= dataTable();
  //var id= 4+1;
   console.log('the id is' +id);
   var http = new XMLHttpRequest(); 
     const url = "http://localhost/APIRestCoverJob/public/jobs/?"+id;
    http.open("GET", url, true);
      http.send();
  
      http.onreadystatechange = (e) => {
       var response =JSON.parse(http.responseText);
       var job = response;
       console.log('estatus is ' + http.status);
       
      var name= job.data[id].name;
      console.log(name);
    
      if (http.status === 200) {
  
         // document.getElementById('jobName').innerHTML= name;
         //  document.getElementById('jobDetails').innerHTML=job.data[id].details;
         //  document.getElementById('jobStarDate').innerHTML=job.data[id].start_date;
         //  document.getElementById('jobStarTime').innerHTML=job.data[id].start_time;
         //  document.getElementById('jobEndDate').innerHTML=job.data[id].end_date;
         //  document.getElementById('jobEndTime').innerHTML=job.data[id].end_time;
         //  document.getElementById('jobCity').innerHTML=job.data[id].city;
         //  document.getElementById('jobPayment').innerHTML=job.data[id].payment;
         location.replace("job.html");
     }
    
     }
 
 }


function idFromTable(name){
 console.log('the name is' +name);

  $(document).ready(function(){
    $(name).click(function(){

      var valores = new Array();
      i=0;
      
      $(this).parents("tr").find("td").each(function(){
      valores[i] =$(this).html();
      i++;
      });
      console.log('valores ' +valores)
      return valores[0];
    });
});

}












