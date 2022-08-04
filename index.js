
$(document).ready(function(){
	var inputNumber = 0;
	var selectedOption = "";
	var answer = 0;

	$("#inputNumber").keyup(function(){
		inputNumber = $(this).val();
		setAnswer("");
		activeDieactiveBtn();
	})
	$("#fromTo").change(function(){
		selectedOption = $(this).val();
		activeDieactiveBtn();
	})
	
	
	$("#convertBtn").click(function(){
		if(selectedOption == "decimal to binary" && inputNumber != ""){
			answer = convertDecimalToBinary(inputNumber);
			setAnswer(answer);
		}else if(selectedOption == "binary to decimal" && inputNumber != ""){
			answer = convertBinaryToDecimal(inputNumber);
			setAnswer(answer);
		}else if(selectedOption == "decimal to hexadecimal" && inputNumber != ""){
			answer = convertDecimalToHexadecimal(inputNumber);
			setAnswer(answer);
		}else if(selectedOption == "hexadecimal to decimal" && inputNumber != ""){
			answer = convertHexadecimalToDecimal(inputNumber);
			setAnswer(answer);
		}else if(selectedOption == "binary to hexadecimal" && inputNumber != ""){
			var decimalVal = convertBinaryToDecimal(inputNumber);
			answer = convertDecimalToHexadecimal(decimalVal);
			setAnswer(answer);
		}else if(selectedOption == "hexadecimal to binary" && inputNumber != ""){
			var decimalVal = convertHexadecimalToDecimal(inputNumber);
			answer = convertDecimalToBinary(decimalVal);
			setAnswer(answer);
		}else{
			resetAll();
		}
	})
	
	$("#resetBtn").click(function(){
		resetAll();
	})
	
})

function activeDieactiveBtn(){
	
	var inputNumber = $("#inputNumber").val();
	var selectedOption = $("#fromTo").val();
	
	if(inputNumber != "" && selectedOption != ""){
		$("#convertBtn").prop("disabled",false);
	}else{
		$("#convertBtn").prop("disabled",true);
	}
	
	if(inputNumber != "" || selectedOption != ""){
		$("#resetBtn").prop("disabled",false);
	}else{
		$("#resetBtn").prop("disabled",true);
	}
	
}

function setAnswer(answer){
	$("#showAnswer").html(answer);
}

function resetAll(){
		$("#convertBtn").prop("disabled",true);
		$("#showAnswer").html("");
		$("#inputNumber").val("");
		$("#fromTo").val("").change();
		$(this).prop("disabled",true);
}


// main functions
function convertDecimalToBinary(inputNumber){
	var answer = "";
	if(!isNaN(inputNumber)){
		inputNumber = Number(inputNumber);
		var remainder = 0;
		while(inputNumber != 0){
			remainder = inputNumber % 2;
			inputNumber = ((inputNumber - remainder) / 2);
			answer = remainder + answer;
		}
	}else{
		answer = '<span style="color: red;">This is not decimal number!</span>';
	}
	return answer;
}

function convertBinaryToDecimal(inputNumber){
	inputNumber = inputNumber.toString();
	var numberLen = inputNumber.length;
	var position = numberLen;
	var answer = 0;
	for(var i = 0; i < numberLen; i++){
		if(inputNumber[i] == '0' || inputNumber[i] == '1'){
			position--;
			answer = answer + (   Number(inputNumber[i]) *  Math.pow(2, position) );
		}else{
			answer = '<span style="color: red;">This is not binary number!</span>';
		}
	}
	return answer;
}

function convertDecimalToHexadecimal(inputNumber){
	inputNumber = Number(inputNumber);
	var remainder = 0;
	var answer = "";
	if(!isNaN(inputNumber)){
			inputNumber = Number(inputNumber);
			while(inputNumber != 0){
			remainder = inputNumber % 16;
			inputNumber = ((inputNumber - remainder) / 16);
			if(remainder == 10){
				answer = 'A' + answer;
			}else if(remainder == 11){
				answer = 'B' + answer;
			}else if(remainder == 12){
				answer = 'C' + answer;
			}else if(remainder == 13){
				answer = 'D' + answer;
			}else if(remainder == 14){
				answer = 'E' + answer;
			}else if(remainder == 15){
				answer = 'F' + answer;
			}else{
				answer =  remainder + answer;
			}
		}
	}else{
		answer = '<span style="color: red;">This is not decimal number!</span>';
	}
	return answer;
}

function convertHexadecimalToDecimal(inputNumber){
	inputNumber = inputNumber.toString();
	var numberLen = inputNumber.length;
	var position = numberLen;
	var answer = 0;
	for(var i = 0; i < numberLen; i++){
		var num = inputNumber[i];
		if(num == 'A'){
			num = 10;
		}else if(num == 'B'){
			num = 11;
		}else if(num == 'C'){
			num = 12;
		}else if(num == 'D'){
			num = 13;
		}else if(num == 'E'){
			num = 14;
		}else if(num == 'F'){
			num = 15;
		}else if(num >= '0' && num <= '9'){
			num = Number(num);
		}else{
			answer = '<span style="color: red;">This is not Hexadecimal number!</span>';
			return answer;
		}
		position--; 
		answer = answer + (num* Math.pow(16,position));
	}
	return answer;
}