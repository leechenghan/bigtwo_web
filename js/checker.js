// We receuve cards in ascending order of card strength

var checkValidity = function(prev, curr){
  dummyPair = [{ val: 1 }, { val: 1 }];
  dummyCombo = [{ val: 1 }, { val: 1 }, { val: 5 }, { val: 5 }, { val: 9 }];

  if (prev.length == 0){
    if (curr.length == 1)
      return true;
    else if (curr.length == 2)
      return isSameRank(curr[0], curr[1]);
    else if (curr.length == 5)
      return checkCombo(dummyCombo, curr);
    else
      return false;
  }
  else if (curr.length != prev.length)
    return false;
  if (curr.length == 1)
    return checkHighCard(prev, curr);
  else if (curr.length == 2){
    return checkPair(prev, curr);
  }
  else if (curr.length == 5)
    return checkCombo(prev, curr);
  else
    return false;
}

var checkHighCard = function(prev, curr){
  return curr[0].val > prev[0].val;
}

var checkPair = function(prev, curr){
  console.log('issamerank is: ' + isSameRank(curr[0], curr[1]));
  if (!isSameRank(curr[0], curr[1]))
    return false;

  return curr[1].val > prev[1].val;
}

var checkCombo = function(prev, curr){
  var prevStrength = 0;
  var currStrength = 0;

  if (checkStraight(prev))
    prevStrength += 3;
  if (checkStraight(curr))
    currStrength += 3;
  if (checkFlush(prev))
    prevStrength += 4;
  if (checkFlush(curr))
      prevStrength += 4;
  if (checkFullHouse(prev))
    prevStrength += 5;
  if (checkFullHouse(curr))
    currStrength += 5;
  if (checkFourOfAKind(prev))
    prevStrength += 6;
  if (checkFourOfAKind(curr))
    currStrength += 6;

  if (prevStrength < currStrength)
    return true;
  else if (prevStrength > currStrength)
    return false;
  else if (prevStrength == 3 || prevStrength == 4 || prevStrength == 7)
    return curr[4].val > prev[4].val;
  else{
    if (checkThreeOfAKind(curr) && checkThreeOfAKind(prev))
      return curr[0].val > prev[0].val;
    else if (checkThreeOfAKind(curr) && checkThreeOfAKind(prev.splice(2)))
      return curr[0].val > prev[4].val;
    else if (checkThreeOfAKind(curr.splice(2)) && checkThreeOfAKind(prev.splice(2)))
      return curr[4].val > prev[4].val;
    else
      return curr[4].val > prev[0].val;
  }
}

var checkStraight = function(arr){
  return (rankDiffOne(arr[0], arr[1]) &&
          rankDiffOne(arr[1], arr[2]) &&
          rankDiffOne(arr[2], arr[3]) &&
          rankDiffOne(arr[3], arr[4]));
}

var checkFlush = function(arr){
  return (isSameSuit(arr[0], arr[1]) &&
          isSameSuit(arr[1], arr[2]) &&
          isSameSuit(arr[2], arr[3]) &&
          isSameSuit(arr[3], arr[4]));
}

var checkFullHouse = function(arr){
  return ((isSameRank(arr[0], arr[1]) &&
           isSameRank(arr[1], arr[2]) &&
           isSameRank(arr[3], arr[4]))
          ||
          (isSameRank(arr[0], arr[1]) &&
           isSameRank(arr[2], arr[3]) &&
           isSameRank(arr[3], arr[4])));
}

var checkThreeOfAKind = function(arr){
  return (isSameRank(arr[0], arr[1]) &&
          isSameRank(arr[1], arr[2]) &&
          isSameRank(arr[2], arr[3]));
}

var checkFourOfAKind = function(arr){
  return ((isSameRank(arr[1], arr[2]) &&
           isSameRank(arr[2], arr[3]) &&
           isSameRank(arr[3], arr[4]))
          ||
          (isSameRank(arr[0], arr[1]) &&
           isSameRank(arr[1], arr[2]) &&
           isSameRank(arr[2], arr[3])));
}

var isSameSuit = function(first, second){
  return (first.val%4 == second.val%4);
}

var isSameRank = function(first, second){
  return (Math.floor((first.val-1)/4) == Math.floor((second.val-1)/4));
}

var rankDiffOne = function(first, second){
  return (Math.floor((first.val-1)/4) + 1 == Math.floor((second.val-1)/4));
}
