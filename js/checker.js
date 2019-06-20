// We receuve cards in ascending order of card strength

var Checker = Checker || {};

var checkValidity = function(prev, curr){
  dummyPair = [{ val: 1 }, { val: 1 }];
  dummyCombo = [-7, 1, 5, 9, 13];

  if (prev.length == 0){
    if (curr.length == 1)
      return true;
    else if (curr.length == 2)
      return checkPair(dummyPair, curr);
    else if (curr.length == 5)
      return checkCombo(dummyCombo, curr);
    else
      return false;
  }
  else if (curr.length != prev.length)
    return false;

  if (curr.length == 1)
    return checkHighCard(prev, curr);
  else if (curr.length == 2)
    return checkPair(prev, curr);
  else if (curr.length == 5)
    return checkCombo(prev, curr);
  else
    return false;
}

var checkHighCard = function(prev, curr){
  return curr[0] > prev[0].val;
}

var checkPair = function(prev, curr){
  if (Math.floor((curr[0]-1)/4) != Math.floor((curr[1]-1)/4))
    return false;

  return curr[1] > prev[1].val;
}

var checkCombo = function(prev, curr){
  var prevStrength = 0;
  var currStrength = 0;
  //Check for straight
  if (checkStraight(prev))
    prevStrength += 3;
  else if (checkStraight(curr))
    currStrength += 3;

  //Check for flush
  if (checkFlush(prev))
    prevStrength += 4;
  else if (checkFlush(curr))
      prevStrength += 4;

  // Check for full house
  if (checkFullHouse(prev))
    prevStrength += 5;
  else if (checkFullHouse(curr))
    currStrength += 5;

  // CHeck for 4 of a kind
  if (checkFourOfAKind(prev))
    prevStrength += 6;
  else if (checkFourOfAKind(curr))
    currStrength += 6;

  if (prevStrength < currStrength)
    return true;
  else if (prevStrength > currStrength)
    return false;
  else if (prevStrength == 3 || prevStrength == 4 || prevStrength == 7)
    return curr[4] > prev[4];
  else{
    if (checkThreeOfAKind(curr) && checkThreeOfAKind(prev))
      return curr[0] > prev[0];
    else if (checkThreeOfAKind(curr) && checkThreeOfAKind(prev.splice(2)))
      return curr[0] > prev[5];
    else if (checkThreeOfAKind(curr.splice(2)) && checkThreeOfAKind(prev.splice(2)))
      return curr[5] > prev[5];
    else
      return curr[5] > prev[0];
  }
}

var checkStraight = function(arr){
  return (isEqual(arr[0]+1, arr[1]) &&
          isEqual(arr[1]+1, arr[2]) &&
          isEqual(arr[2]+1, arr[3]) &&
          isEqual(arr[3]+1, arr[4]));
}

var checkFlush = function(arr){
  return (isEqual(arr[0]%4, arr[1]%4) &&
          isEqual(arr[1]%4, arr[2]%4) &&
          isEqual(arr[2]%4, arr[3]%4) &&
          isEqual(arr[3]%4, arr[4]%4));
}

var checkFullHouse = function(arr){
  return ((isEqual(arr[0], arr[1]) &&
           isEqual(arr[1], arr[2]) &&
           isEqual(arr[3], arr[4]))
          ||
          (isEqual(arr[0], arr[1]) &&
           isEqual(arr[2], arr[3]) &&
           isEqual(arr[3], arr[4])));
}

var checkFourOfAKind = function(arr){
  return ((isEqual(arr[1], arr[2]) &&
           isEqual(arr[2], arr[3]) &&
           isEqual(arr[3], arr[4]))
          ||
          (isEqual(arr[0], arr[1]) &&
           isEqual(arr[1], arr[2]) &&
           isEqual(arr[2], arr[3])));
}

var checkThreeOfAKind = function(arr){
  return (isEqual(arr[0], arr[1]) &&
          isEqual(arr[1], arr[2]) &&
          isEqual(arr[2], arr[3]));
}


var isEqual = function(first, second){
  return (first == second);
}
