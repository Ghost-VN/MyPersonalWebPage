$(document).ready(function(){                                    // висота шапки під усю висоту вікна
  $('.header').height($(window).height());    
  
 
  $(".navbar a").click(function(){                               // плавний перехід між пунктами навігаційного меню
    $("body,html").animate({
      scrollTop:$("#" + $(this).data('value')).offset().top
    },1000)
   
  })
 
 })
  


var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhNzc0NmYzMTg3ZWZlYjZhMzRhZjIwOTFmYzdiODFjODMxMzU4OTkwMjVjYzIxODBiYTM0OWZhOGUxYjkwNWU1MDFlM2ZjN2FjYzE0NWQ3In0.eyJhdWQiOiIxMCIsImp0aSI6IjlhNzc0NmYzMTg3ZWZlYjZhMzRhZjIwOTFmYzdiODFjODMxMzU4OTkwMjVjYzIxODBiYTM0OWZhOGUxYjkwNWU1MDFlM2ZjN2FjYzE0NWQ3IiwiaWF0IjoxNTU0NTMxNjc5LCJuYmYiOjE1NTQ1MzE2NzksImV4cCI6MTg3MDE1MDg3OSwic3ViIjoiMTY3OSIsInNjb3BlcyI6WyJ1c2VyQmFzZUluZm8iLCJ1c2VyRGV0YWlsZWRJbmZvIiwidXNlckNvdXJzZUluZm8iXX0.K61I3O5NheaMw0tPu-5fbcY2SzMXhsS2m0bp2SaRbk8FSF6E5gqzwEDMN0uu_2oDJrlJ53I_B8f3GMmxivTaJ5C5AOV8OLZpuedbaCuUUY2rKEvoebVbNxMEemJIMhVIK8BnKKXhRMaLLY3Z4kVycxjyJG19l1GHl0JHz9PEPIDVP7xWrSQExv0kZS0ZE8Cr-uHhgfmNBXdYzqjOt0FGpv3jCYuah8kJb19Sgo1mHPP8gBM54j7YYDs2WoaRgMTQq03Tq7oJK7Wfs122zj7s9sXabX8_9kbZmd7VlEONwRwFRogKcNYPS0xm61r2xbbmeuTnPOHlNzjkIBQaydMZdyEsTxbhgQYWMxyAtY-9mP-93-IRf5pPHoy5yx6-R1d85mNvklmHjlb2b3hODTBcArS83sbfiiUURMNOHrffTJEn3wZRaMoF-ztUIblMYGwqGVI8NpdSQaUvqskPcF-5JavzLgQ15suDpHWtaoma_S7r0cPdNCT4OnX_8yXx6rFOMf8GHKtMDnflTq0NTLgSLF45K8xCrKN2KktPDg-44XQQrM8_8bRNXZtagHezDXtTH2m7mD2UyREiHhdBDiIfKjkfkuFITmO35SYnoFn0X3Oji0qiYDTSgZQ2gd5vB-OEEyI9NkF2HzfgUnTmQwrbwSTatG7MOyQmCzakMLLe_xc'
var client  = new INTITAClient({
    key: API_KEY,
});


// ПЕРСОНАЛЬНА ІНФОРМАЦІЯ

client.getUserDetails( function (error, data) {
  name_profile = document.getElementById("firstName");
  name_profile.innerHTML = data.firstName + " " + data.secondName;
  email_profile = document.getElementById("email_profile");
  email_profile.innerHTML = data.email;
  phone_profile = document.getElementById("phone_profile");
  phone_profile.innerHTML = data.phone;
  city_profile = document.getElementById("city_profile");
  city_profile.innerHTML = data.city;
  country_profile = document.getElementById("country_profile");
  country_profile.innerHTML = data.country;
  educationForm_profile = document.getElementById("educationForm_profile");
  educationForm_profile.innerHTML = data.educationForm;
  education_profile = document.getElementById("education_profile");
  education_profile.innerHTML = data.education;
  trainers_profile = document.getElementById("trainers_profile");  
    
  //ІНТЕРЕСИ
  interests_profile = document.getElementById("interests_profile");
  interests_profile.innerHTML = data.interests;

  // ЮЛІЯ

  trainers_profile.innerHTML = data.trainers["0"].firstName + " " + data.trainers["0"].secondName;
  trainers_profile = document.getElementById("trainers_email");
  trainers_profile.innerHTML = data.trainers["0"].email;
 
});



// КУРСИ ТА МОДУЛІ

client.getUserCoursesAndModules(function(error, data) {
  console.log(error, data);
  var coursesCount = document.getElementById("courses");
  coursesCount.innerText += " " + data.courses[0].title;                      // ВИБІР КУРСУ     0 -> JS    ---    1 -> PHP          
  var modulesCount = document.getElementById("modules");
  modulesCount.style.display = "block";
  coursesCount.onclick = function() {            
    if (modulesCount.style.display == "block") modulesCount.style.display = "none";
    else modulesCount.style.display = "block";
  };
  client.getCourseModules(data.courses[0].id, function(error, Modules) {                
      console.log(error, Modules);
      var MODULE = modulesCount;
     
      Modules.forEach(function(module) {
          var moduleName = module.title;
          var moduleId = module.id;
          var allOfModules = document.createElement("div");


          
          allOfModules.onclick = function() {           
              if (lectures.style.display == "block") {
                  lectures.style.display = "none";
              } else {
                  lectures.style.display = "block";
              }
          };

          allOfModules.innerHTML = "<li>" + moduleName + "</li>"; 
          MODULE.appendChild(allOfModules);
          var lectures = document.createElement("ol");
          lectures.style.display = "none";
          allOfModules.appendChild(lectures);
          
          client.getModuleLectures(moduleId, function(error, Lectures) {
              Lectures.forEach(function(lecture) {
              var lectureName = document.createElement("li");
              lectureName.innerText = lecture.title;
              lectures.appendChild(lectureName);
              });
          });
      });
   });
});

