var Checker = Checker || {};

var Checker.checkValidity(prev, curr){

  if (curr.length == 0 || prev.length == 0)
    return true;
  else if (curr.length != prev.length)
    return false;

  prev = Checker.sortCardsByRank(prev);
  curr = Checker.sortCardsByRank(curr);

  if (curr.length == 1)
    return Checker.checkHighCard(prev, curr);
  else if (curr.length == 2)
    return Checker.checkPair(prev, curr);
  else if (curr.length == 5)
    return Checker.checkCombo(prev, curr);
}

var Checker.checkHighCard(prev, curr){
  return curr[0] > prev[0];
}

var Checker.checkPair(prev, curr){
  return curr[1] > prev[1];
}

var Checker.checkCombo(prev, curr){
  
}

var Checker.sortCardsByRank = function(arr){
  arr.sort(function(a, b){
    return a - b;
  });
};
