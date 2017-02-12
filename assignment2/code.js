//
// this is just a stub for a function you need to implement
//
function getStats(txt) {
    return {
        nChars: numberOfChars(txt),
        nWords: numberOfWords(txt),
        nLines: numberOfLines(txt),
        nNonEmptyLines: numberOfNonEmptyLines(txt),
        averageWordLength: averageWordLength(txt),
        maxLineLength: maxLineLength(txt),
        palindromes: palindromes(txt),
        longestWords: longestWords(txt),
        mostFrequentWords: frequency(txt),
    };
}

function numberOfChars(txt) {
	return txt.length;
}
// need to fix
function numberOfWords(txt) {
	var conseq = false;
	var count = 0;
	if (txt.length >= 1){
		for (var i = 0; i < txt.length; i++){
			if ((txt.charAt(i).toLowerCase() == txt.charAt(i).toUpperCase()) && (isNaN(parseInt(txt.charAt(i))))){
				if (txt.charAt(i-1).toLowerCase() == txt.charAt(i-1).toUpperCase() && (isNaN(parseInt(txt.charAt(i-1))))){
					//do nothing
				}
				else{
					count++;
				}
			// symbol
			}
			else if ((i == txt.length - 1) && ((txt.charAt(i).toLowerCase() != txt.charAt(i).toUpperCase()) || (!isNaN(parseInt(txt.charAt(i)))))){
				count++;
			}
	
		}
	}
	return count;
}

function numberOfLines(txt) {
	if (txt.length == 0){
		var count = 0;
	}
	else{
		var count = 1;
	}
	for (var i = 0; i < txt.length; i++){
		if (txt.charAt(i) != "\n"){
			//not a new line
		}
		else{
			count++; // new line so we increment the count
		}
	}
	return count;
}

function numberOfNonEmptyLines(txt) {
	var count = 0;
	var firstLine = true;
	for (var i = 0; i < txt.length; i++){
		if (firstLine == true){
			if(txt.charAt(i).toLowerCase() == txt.charAt(i).toUpperCase()){
				count++;
				firstLine = false;
			}
			else if (txt.charAt(i).toLowerCase() != txt.charAt(i).toUpperCase()){
				count++;
				firstLine = false;
			}
		}
		if(txt.charAt(i) == "\n"){
			for (var x = i+1; x < txt.length; x++){
				if (txt.charAt(x) == "\n"){
					// new line again
					x = txt.length;
				}
				else if (txt.charAt(x) == ' '){
					//do nothing
				}
				else if (txt.charAt(x) == "\t"){
					//do nothing
				}
				else if (txt.charAt(x).toLowerCase() == txt.charAt(x).toUpperCase()){
					count++; 
					x = txt.length;
				}
				else if (txt.charAt(x).toLowerCase() != txt.charAt(x).toUpperCase()){
					count++;
					x = txt.length;
				}
			}
		}
	}
	return count;
}

function averageWordLength(txt) {
	var conseq = false;
	var charCount = 0;
	if (txt.length >= 1){
		for (var i = 0; i < txt.length; i++){
			if(txt.charAt(i).toLowerCase() != txt.charAt(i).toUpperCase() || (!isNaN(parseInt(txt.charAt(i))))){
				charCount++;
			}
		}
	}
	if (numberOfWords(txt) == 0){
		return 0;
	}
	return charCount/numberOfWords(txt);
}

function maxLineLength(txt){
	var max = 0;
	var count = 0;
	var moreLines = false;
	for (var i = 0; i < txt.length; i++){
		if (txt.charAt(i) != "\n"){
			//not a new line
			count++;
		}
		else{
			moreLines = true;
			if(count >= max){
				max = count;
			}
			count = 0;
		}
	}
	if (moreLines == false){
		max = count;
	}
	return max;
}

function palindromes(txt){
	var conseq = false;
	var array = [];
	var palindromeArray = [];
	var begin = 0;
	var word = "";
	if (txt.length >= 1){
		for (var i = 0; i < txt.length; i++){
			if ((txt.charAt(i).toLowerCase() == txt.charAt(i).toUpperCase()) && (isNaN(parseInt(txt.charAt(i))))){
				if (i == 0){
					//do nothing
				}
				else{
					if (txt.charAt(i-1).toLowerCase() == txt.charAt(i-1).toUpperCase() && (isNaN(parseInt(txt.charAt(i-1))))){
			
					}
					else{
						for (var k = begin; k < i; k++){
							word += txt.charAt(k).toLowerCase();
						}
						array.push(word);
						word = "";
						conseq = false;
					}
				}
			// symbol
			}
			else if ((i == txt.length - 1) && ((txt.charAt(i).toLowerCase() != txt.charAt(i).toUpperCase()) || (!isNaN(parseInt(txt.charAt(i)))))){
				for (var k = begin; k <= i; k++){
					word += txt.charAt(k).toLowerCase();
				}
				array.push(word);
				word = "";
				conseq = false;
			}	
			else{
			// not a symbol
				if(i != txt.length - 1){
					if((txt.charAt(i+1).toLowerCase() != txt.charAt(i+1).toUpperCase()) || (!isNaN(parseInt(txt.charAt(i+1))))){
						if(conseq == false){
							begin = i;
						}
						conseq = true;
					}
					else if(txt.charAt(i+1) == ' '){
						if(conseq == false){
							begin = i;
						}
						conseq = true;					
					}
				}
			}
		}
	}	

	if (array.length > 0){
		var reverseWord = "";
		for (var i = 0; i < array.length; i++){
			word = array[i];
			if (word.length > 1){
				reverseWord = word.split('').reverse().join('');
				if (word.localeCompare(reverseWord) == 0){
					palindromeArray.push(word);
				}
			}
		}
	}
	return palindromeArray;
}

function longestWords(txt){
	var conseq = false;
	var array = [];
	var longestWordArray = [];
	var begin = 0;
	var word = "";
	var longest = 0;
	var shortest = 0;
	if (txt.length > 1){
		for (var i = 0; i < txt.length; i++){
			if ((txt.charAt(i).toLowerCase() == txt.charAt(i).toUpperCase()) && (isNaN(parseInt(txt.charAt(i))))){
				if (i == 0){
					//do nothing
				}
				else{
					if (txt.charAt(i-1).toLowerCase() == txt.charAt(i-1).toUpperCase() && (isNaN(parseInt(txt.charAt(i-1))))){
			
					}
					else{
						for (var k = begin; k < i; k++){
							word += txt.charAt(k).toLowerCase();
						}
						array.push(word);
						word = "";
						conseq = false;
					}
				}
			// symbol
			}
			else if ((i == txt.length - 1) && ((txt.charAt(i).toLowerCase() != txt.charAt(i).toUpperCase()) || (!isNaN(parseInt(txt.charAt(i)))))){
				if (txt.charAt(i-1).toLowerCase() == txt.charAt(i-1).toUpperCase())
					begin = i;
				for (var k = begin; k <= i; k++){
					word += txt.charAt(k);
				}
				array.push(word);
				word = "";
				conseq = false;
			}	
			else{
			// not a symbol
				if(i != txt.length - 1){
					if((txt.charAt(i+1).toLowerCase() != txt.charAt(i+1).toUpperCase()) || (!isNaN(parseInt(txt.charAt(i+1))))){
						if(conseq == false)
							begin = i;
						conseq = true;
					}
					else if(txt.charAt(i+1) == ' '){
						if(conseq == false){
							begin = i;
						}
						conseq = true;					
					}
				}
			}
		}
	}
	for (var i = 0; i < array.length; i++){
		var alreadyIn = false;
		if(longestWordArray.length == 10){
			var index = 0;		
			shortest = longestWordArray[0].length;
			for(var k = 0; k < longestWordArray.length; k++){
				if (longestWordArray[k].length < shortest){
					shortest = longestWordArray[k].length;
					index = k;
				}
				if (array[i].localeCompare(longestWordArray[k]) == 0)
					alreadyIn = true;
			}
			if (array[i].length > shortest && alreadyIn == false)
				longestWordArray[index] = array[i];
		}
		else{
			for(var k = 0; k < longestWordArray.length; k++){
				if (array[i].localeCompare(longestWordArray[k]) == 0)
					alreadyIn = true;
			}
			if (alreadyIn == false)
				longestWordArray.push(array[i]);	
		}
	}
	longestWordArray = longestWordArray.sort();
	for (var k = 0; k < longestWordArray.length; k++){
		for (var i = 0; i < longestWordArray.length; i++){
			if(i < longestWordArray.length - 1){
				if(longestWordArray[i+1].length > longestWordArray[i].length){
					var temp = longestWordArray[i+1];
					longestWordArray[i+1] = longestWordArray[i];
					longestWordArray[i] = temp;		
				}	
			}
		}
	}
	return longestWordArray;
}

function frequency(txt){
	var conseq = false;
	var array = [];
	var frequencyCount = [];
	var frequencyCount2 = [];
	var frequencyWord = [];
	var frequencyWord2 = [];
	var frequency = [];
	var begin = 0;
	var word = "";
	var count = 0;
	var maxItems = 0;
	var insideArray = false;
	if (txt.length > 1){
		for (var i = 0; i < txt.length; i++){
			if ((txt.charAt(i).toLowerCase() == txt.charAt(i).toUpperCase()) && (isNaN(parseInt(txt.charAt(i))))){
				if (i == 0){
					//do nothing
				}
				else{
					if (txt.charAt(i-1).toLowerCase() == txt.charAt(i-1).toUpperCase() && (isNaN(parseInt(txt.charAt(i-1))))){
			
					}
					else{
						for (var k = begin; k < i; k++){
							word += txt.charAt(k).toLowerCase();
						}
						array.push(word);
						word = "";
						conseq = false;
					}
				}
			// symbol
			}
			else if ((i == txt.length - 1) && ((txt.charAt(i).toLowerCase() != txt.charAt(i).toUpperCase()) || (!isNaN(parseInt(txt.charAt(i)))))){
				if (txt.charAt(i-1).toLowerCase() == txt.charAt(i-1).toUpperCase())
					begin = i;
				for (var k = begin; k <= i; k++){
					word += txt.charAt(k);
				}
				array.push(word);
				word = "";
				conseq = false;
			}	
			else{
			// not a symbol
				if(i != txt.length - 1){
					if((txt.charAt(i+1).toLowerCase() != txt.charAt(i+1).toUpperCase()) || (!isNaN(parseInt(txt.charAt(i+1))))){
						if(conseq == false)
							begin = i;
						conseq = true;
					}
					else if(txt.charAt(i+1) == ' '){
						if(conseq == false){
							begin = i;
						}
						conseq = true;					
					}
				}
			}
		}
	}
	for (var i = 0; i < array.length; i++){
		insideArray = false;
		for (var x = 0; x < array.length; x++){
			if (array[i].localeCompare(array[x]) == 0){
				count++;
			}
		}
		for (var x = 0; x < frequencyWord.length; x++){
			if (array[i].localeCompare(frequencyWord[x]) == 0){
				insideArray = true;
			}
		}
		if (insideArray == false){
			frequencyCount[i] = count;
			frequencyWord[i] = array[i];
		}
		count = 0;
	}
	for (var i = 0; i < frequencyCount.length; i++){
		if (frequencyCount[i] != null){
			frequencyCount2.push(frequencyCount[i]);
		}
	}
	for (var i = 0; i < frequencyWord.length; i++){
		if (frequencyWord[i] != null){
			frequencyWord2.push(frequencyWord[i]);
		}
	}
						
	if (frequencyCount2.length > 10){
		for (var x = 0; x < 10; x++){
			var temp = 0;
			for(var i = 0; i < frequencyCount2.length; i++){
				if (i < frequencyCount2.length){
					if(frequencyCount2[temp] < frequencyCount2[i]){
						temp = i;
					}
				}
			}
			word = frequencyWord2[temp] + "(" + frequencyCount2[temp] + ")";
			frequencyCount2.splice(temp, 1);
			frequencyWord2.splice(temp, 1);
			frequency.push(word);
		}
	}
	else{
		var length = frequencyCount2.length;
		for (var x = 0; x < length; x++){
			var temp = 0;
			for(var i = 0; i < frequencyCount2.length; i++){
				if (i < frequencyCount2.length){
					if(frequencyCount2[temp] < frequencyCount2[i]){
						temp = i;
					}

				}
			}
			word = frequencyWord2[temp] + "(" + frequencyCount2[temp] + ")";
			frequencyCount2.splice(temp, 1);
			frequencyWord2.splice(temp, 1);
			frequency[x] = word;
			
		}	
	}
	return frequency;

}