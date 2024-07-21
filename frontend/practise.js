var fullname = "piyush Garg";
var obj={
fullname:"hacked full name",
prop:{
fullname : "Inside prop",
getFullname:function(){
return this.fullName;
},
},
getFullname:function(){

  return this.fullname;
},
getFullnameV2:()=>this.fullname,
getFullnameV3:(function (){
 return this.fullname;
})(),
},
console.log(obj.prop.getFullname());
console.log(obj.getFullname());
console.log(obj.getFullnamev2());
console.log(obj.getFullnamev3());
