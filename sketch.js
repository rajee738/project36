var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  Feedthedog=createButton("feed the dog");
  Feedthedog.position(600,95);
  Feedthedog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedtime = database.ref('feedtime');
    feedtime.on("value",(data)=>{
      lastFed = data.val();
    })
  
 
  //write code to display text lastFed time here

  if(lastFed>=12){
    text("LAST FEED : 11pM",350,30);
  } else if(lastFed===0){
    text("LAST FEED : 12AM",350,30);
   }else{
    text("LAST FEED : 6AM",350,30);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
   var food_stock_val=foodObj.getFoodStock();
   if (food_stock_val>=0){
     foodObj.updateFoodStock(food_stock_val*0);
   }else{
    foodObj.updateFoodStock(food_stock_val-1);
   }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
