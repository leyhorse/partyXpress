var app = document.querySelector('template');
app.selected = 0;

document.addEventListener("WebComponentsReady", function () {
  if (app.selected==0) {
    document.querySelector('paper-drawer-panel').closeDrawer();
  } else if(app.selected>1){
    document.querySelector('paper-drawer-panel').openDrawer();
  }

  firebase_element = document.getElementById('firebaseAuth');
  firebase_element.addEventListener('login', function (e) {
    app.selected = 2;
  });
  firebase_element.addEventListener('logout', function (e) {
    app.selected = 0;
  });
  firebase_element.addEventListener('error', function (e) {
    console.log("error");
  });
  firebase_element.addEventListener('user-created', function (e) {
    document.getElementById('user_toast').open();
    app.selected = 0;
  });
});

function ir_a_registro() {
  app.selected = 1;
}

function registrar() {
  var validacion = document.getElementById('pass_input2').validate();
  if(!validacion){
    return;
  }
  firebase_element.createUser(app.new_email,app.new_password);
}

function sign_in() {
  var validacion = document.getElementById('pass_input').validate();
  if(!validacion){
    return;
  }
  var params = {email:app.user, password:app.password};
  firebase_element.login(params);
}
function sign_out() {
  firebase_element.logout();
  app.selected = 0;
}
