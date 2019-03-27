function callout(){
    var campaignId=$("#camp").val();
        var title=$("#titl").val();
        var imageUrl=$("#imgurl").val();
        var message=$("#msg").val();
        var apikey=$("#apikey").val();
        var deepLink=$("#deep").val();
       
        //Validations
        if(title.trim()=="" || message.trim()=="" || apikey.trim()==""){
            alert("Please fill all the required fields: Api Key, Message and Title.");
            return false;
        }
        var contactEmail="vernika.1295@gmail.com";
        //Generating json to send
        var jsonObj={  
            "api_key":apikey,
            "notifications":[  
               {
                  "target":{  
                     "email":contactEmail
                  },
                  "title":title,
                  "message":message,
                  "deep_link":{  
                     "your_deeplink_key":deepLink,
                     "your_another_deeplink_key":deepLink
                  },
                  "image_URL":imageUrl,
                  "android_sound":"Beep",
                  "ios_sound":"Beep",
                  "channel_id": 1,
                  "camp_id": campaignId
               }
            ]
         }    
        console.log("Json structure: "+JSON.stringify(jsonObj));
        var xhr=new XMLHttpRequest();
        xhr.open("POST","https://mobile.useinsider.com/api/v1/notification/user",true);
        xhr.setRequestHeader("Content-Type","application/json",true);
        xhr.onreadystatechange = function(e){
            console.log(xhr.status);
            console.log(xhr.readyState);    
        };
        xhr.send(jsonObj);        
}