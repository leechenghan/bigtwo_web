// We receuve cards in ascending order of card strength

// Checks if the current submission beats the previous submission
var checkValidity = function(prev, curr){
  dummyCombo = [{ val: 1 }, { val: 1 }, { val: 5 }, { val: 6 }, { val: 9 }];

  if (prev.length == 0){
    if (curr.length == 1 ||
       (curr.length == 5 && checkCombo(dummyCombo, curr)) ||
       (curr.length == 2 && isSameRank(curr[0], curr[1])))
      return true;
    else
      return false;
  }
  else if (curr.length != prev.length)
    return false;
  if (curr.length == 2)
    return checkPair(prev, curr);
  else if (curr.length == 5)
    return checkCombo(prev, curr);
  else
    return curr[0].val > prev[0].val;
}

// Checks if submitted pair beats previous submitted pair
var checkPair = function(prev, curr){
  if (isSameRank(curr[0], curr[1]))
    return curr[1].val > prev[1].val;
  return false;
}

// Checks if submitted combo beats previous submitted combo
var checkCombo = function(prev, curr){

  var prevStrength = 3*checkStraight(prev) + 4*checkFlush(prev) +
                  5*checkFullHouse(prev) + 6*checkFourOfAKind(prev);

  var prevStrength = 3*checkStraight(curr) + 4*checkFlush(curr) +
                  5*checkFullHouse(curr) + 6*checkFourOfAKind(curr);

  // Middle card is same rank as the three-of-a-kind of four-of-a-kind
  if (prevStrength == 5 || prevStrength == 6
      && currStrength == prevStrength)
    return curr[2].val > prev[2].val;
  // Comparing final card is sufficient for straight/flush/straightflush
  else if (prevStrength >= 3 && prevStrength <= 7
           && currStrength == prevStrength)
    return curr[4].val > prev[4].val;
  else
    return currStrength > prevStrength
}

// Checks if an array is a straight
var checkStraight = function(arr){
  return (rankDiffOne(arr[0], arr[1]) &&
          rankDiffOne(arr[1], arr[2]) &&
          rankDiffOne(arr[2], arr[3]) &&
          rankDiffOne(arr[3], arr[4]));
}

// Checks if an array is a flush
var checkFlush = function(arr){
  return (isSameSuit(arr[0], arr[1]) &&
          isSameSuit(arr[1], arr[2]) &&
          isSameSuit(arr[2], arr[3]) &&
          isSameSuit(arr[3], arr[4]));
}

// Checks if an array is a full house
var checkFullHouse = function(arr){
  return (checkNOfAKind(arr, 4) == 3 &&
          isSameRank(arr[0], arr[1]) || isSameRank(arr[3], arr[4]));
}

var checkFourOfAKind = function(arr){
  return (checkNOfAKind(arr, 5) == 4);
}

// Checks how many similar elements there are in arr, comparisons with middle
var checkNOfAKind = function(arr, n){
  var numSame = 0;
  for (i = 0; i < n; i++){
    numSame += isSameRank(arr[(arr.length-1)/2], arr[i]);
  }
  return numSame;
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
