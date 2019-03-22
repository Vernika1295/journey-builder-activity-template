function updateDescriptionLength(){
    var descValue=$("#desc").val();
    var banValue=$("#banurl").val();
    var charValue="";
    if(banValue==""){
        charValue=(12-descValue.length)+" characters remaining";
        $("desc").prop("maxlength",12);
    }else{
        charValue=(30-descValue.length)+" characters remaining";
        $("desc").prop("maxlength",30);
    }
    $("#chars").html(charValue); 
}
