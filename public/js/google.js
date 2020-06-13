//firebase initialization
var firebaseConfig = {
    apiKey: "AIzaSyA8M2eCEznEHpohx9Ze2u3IhV2Js1fd14Y",
    authDomain: "cardsignin.firebaseapp.com",
    databaseURL: "https://cardsignin.firebaseio.com",
    projectId: "cardsignin",
    storageBucket: "cardsignin.appspot.com",
    messagingSenderId: "881802791668",
    appId: "1:881802791668:web:af0ca91c0fa46c82dbeca1",
    measurementId: "G-GS0XXEF69Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function sign_in(){
    console.log(window.name)
    html='<div class="popup-content" style="display:none;"><img class="sign-in" src="https://cardscrapshut.s3.ap-south-1.amazonaws.com/signin.png" width="200px" onclick="googlesignin()"></div>'
    $('.popup').html(html)
    $(".popup").show("slow");
    $('.popup').css('display','flex')
    googlesignin();
}
function close_popup(){
    $('.popup').hide("slow");
    self.close();
}
function googlesignin(){
    base_provider=new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function(result){
        access_token=result.credential.accessToken;
        token=JSON.stringify('token')
        console.log("Success....google Account Linked")
          $.ajax({
            type: "POST",
            contentType: 'application/json',
            url: "https://backend.scrapshut.com/a/google/",
            data: JSON.stringify({"token":access_token}),
            success: function (data) {
                console.log(data);
                console.log(data.access_token);
                window.localStorage.setItem('access_token',data.access_token);
                window.localStorage.setItem('name',data.username);
                console.log(window.localStorage.getItem('name'));
                console.log(window.localStorage.getItem('access_token'));
                window.localStorage.getItem('access_token');
                // window.opener.localStorage.access_token = data.access_token;
                // var txtName = window.opener.document.getElementById("txtName");
                // txtName.value = data.access_token;
                window.open(window.name,data.access_token);
                close_popup();
            }});
    }).catch(function(err){
        console.log(err);
        console.log("failed")
    })
}