function User(name) {
  this.name = name;
};
User.prototype.getName = function () {
  console.log(this.name);
}

function magic(cons) {
  // write your own code here 
}
var MagicUser = magic(User);
let Winner = new MagicUser('Winner');
let Looser = new MagicUser('Looser');

console.log(Winner === Looser); // true console.log(Winner.getName()); // 'Winner' console.log(Looser.getName()); // 'Winner'
