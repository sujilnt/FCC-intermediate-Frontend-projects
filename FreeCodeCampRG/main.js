/**
 * Created by sujil on 08/07/17.
 */
var data="";
var author=document.getElementById("author");
var quotes=document.getElementById("quoter");
var loader=document.getElementById("loader");
var tweet=document.getElementById("tweetbutton");

function hideContent(status){
    if(status ==="loading"){
        author.style.opacity=0;
        quotes.style.opacity=0;
        loader.style.opacity=1;

    }
    else{
        loader.style.opacity=0;
        author.style.opacity=1;
        quotes.style.opacity=1;

    }
}

function loadData(){
    hideContent("loading");
    var maxdataLength=data.length;
    var mindataLength=0;
    var random = randomRange(mindataLength,maxdataLength);
    filterData(random,data);
}
function filterData(val,dataJson) {
    dataJson=dataJson.filter(function (a,index) {
        if(val === index){
            return a;
        }
    });
    var test= setTimeout(function(){ addData(dataJson);}, 1000);
}
function addData(data) {
    if(data.length>0 && data[0].author !== "undefined"){
        author.innerHTML=data[0].author;
        quotes.innerHTML=data[0].quote;
        hideContent("loaded");
        var url="https://twitter.com/intent/tweet?text="+ '"' +data[0].quote +'" .-'+ data[0].author +" #Quotes ";
       tweet.href=url;
    }
    else if(data[0].author=== "undefined" && data[0].quotes=== "undefined"){
        loadData();
    }
}

function handlingSucess(){
    data=JSON.parse(this.responseText);
    loadData();
}
function handlingError() {
   alert("the api load is low or Server is down");
}
const AsyncLoadObj= new XMLHttpRequest();
AsyncLoadObj.open('GET','https://random-quote-generator.herokuapp.com/api/quotes/');
AsyncLoadObj.onload= handlingSucess;
AsyncLoadObj.onerror= handlingError;

AsyncLoadObj.send();

var randomRange=function( min, max) {
  return Math.floor(Math.random()*(max-min)+ min);
};

