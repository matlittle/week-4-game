
// initialize all possible characters as objects, with a value for hit points, base attack, and counter attack.

// function to create player objects
function Player(hp, atk, catk, id, side, img) {
	this.hitPoints = hp;
	this.attack = atk;
	this.counterAttack = catk;
	this.htmlId = id;
	this.faction = side;
	this.image = `assets/images/${img}`;
}

// rebel characters
var obiWan = new Player(100, 8, 20, "#obiWan", "rebel", "obi_wan.jpg");
var luke = new Player(120, 10, 25, "#luke" ,"rebel", "luke.png");
var hanSolo = new Player(80, 14, 30, "#hanSolo", "rebel", "han_solo.jpg");
var yoda = new Player(160, 6, 15, "#yoda", "rebel", "yoda.jpg");

var rebelChars = [obiWan, luke, hanSolo, yoda];

// empire characters
var vader = new Player(100, 8, 20, "#vader", "empire", "vader.jpg");
var sidious = new Player(120, 10, 25, "#sidious", "empire", "sidious.png");
var bobaFett = new Player(80, 14, 30, "#bobaFett", "empire", "boba_fett.jpg");
var rancor = new Player(160, 6, 15, "#rancor", "empire", "rancor.jpg");

var empireChars = [vader, sidious, bobaFett, rancor];


// variables for basic elements
var contentEl = $("#content")

// hold current game state
var curr = {};


// add multiple attributes of characters to their html element
function addCharAttributes(char, el) {
	$(el).attr("id", char.htmlId);
	$(el).attr("hp", char.hitPoints);
	$(el).attr("atk", char.attack);
	$(el).attr("catk", char.counterAttack);
	$(el).addClass(char.faction);
}

// append multiple elements together, args passed in child -> parent order
function myAppend() {
	for(var i = 0; i+1 < arguments.length; i += 1) {
		$(arguments[i+1]).append(arguments[i]);
	}
}

// display initial prompt to choose a side
function sidePrompt() {

	// change display to show two options, rebels or empire
	function displaySideChoice() {
		var promptDiv = $("<div>").attr("id", "sidePrompt");

		var headerRow = $("<div>").addClass("row");
		var headerCol = $("<div>").addClass("col-xs-12");
		var textHeader = $("<h1>").attr("id", "sideHdr").text("Choose your side");

		myAppend(textHeader, headerCol, headerRow, promptDiv);
		
		var btnRow = $("<div>").addClass("row")
		var choices = ["rebel", "empire"];

		choices.forEach( function(element) {
			var sideCol = $("<div>").addClass("col-xs-6");
			var sideChoice = $("<div>").addClass("sideBtn").attr("id", `${element}Btn`);

			myAppend(sideChoice, sideCol, btnRow);
			
		});

		myAppend(btnRow, promptDiv, contentEl);
	}

	// create click listeners for side choices.
	function createClickListener() {
		$(".sideBtn").click(function() {
			var clickedBtn = $(this).attr("id");
			sideBtnClicked(clickedBtn);
		});
	}

	function sideBtnClicked(id) {
		// depending on button clicked, set current side to rebel/empire
		if(id === "rebelBtn") {
			curr.side = "rebel";
		} else if(id === "empireBtn") {
			curr.side = "empire";
		}

		characterPrompt();
	}

	displaySideChoice();

	createClickListener();
}

// prompt to select a main character
function characterPrompt() {
	// once player chooses side, prompt them to choose a character (choices depend on side selected)
	function displayCharacterChoice(side) {
		if(side === "rebel") {
			var choices = rebelChars;
		} else if(side === "empire") {
			var choices = empireChars;
		}

		var promptDiv = $("<div>").addClass("row").attr("id", "characterPrompt");

		var headerRow = $("<div>").addClass("row");
		var headerCol = $("<div>").addClass("col-xs-12");
		var textHeader = $("<h1>").attr("id", "characterHdr").text("Choose your player");

		myAppend(textHeader, headerCol, headerRow, promptDiv);

		choices.forEach( function(character) {
			var colDiv = $("<div>").addClass("col-xs-3");
			var playerDiv = $("<div>").addClass("possPlayer");
			var playerImg = $("<img>").addClass("playerImg").attr("src", character.image);
			var playerHP = $("<p>").text(character.hitPoints);

			// add all character attributes to html element
			addCharAttributes(character, playerDiv);

			$(playerDiv).append(playerImg);
			$(playerDiv).append(playerHP);

			myAppend(playerDiv, colDiv, promptDiv);
		});

		$(contentEl).html("")
		$(contentEl).append(promptDiv);
	}

	function createClickListener() {
		$(".possPlayer").click(function() {
			charSelected(this);
		});
	}

	displayCharacterChoice(curr.side);

	createClickListener();
}

// once character is selected, move them to main character area
function charSelected(charObj) {

	console.log(charObj);

	var gameArea = $("<div>").addClass("row").attr("id", "gameArea");

	// after character is selected, move character to "attacker" area
	function moveAttacker(character) {
		// build main attacker div
		var attackerDiv = $("<div>").addClass("col-xs-12").attr("id", "attackerDiv");
		var characterRow = $("<div>").addClass("col-xs-12");

		// build attacker header
		var headerDiv = $("<div>").addClass("col-xs-12 gameHeader").attr("id", "attackerHeader");
		var headerText = $("<h2>").text("Your character");
		// append header to main attacker div
		myAppend(headerText, headerDiv, attackerDiv);

		// remove possible class and add current class
		$(character).removeClass("possPlayer");
		$(character).addClass("currentAttacker");

		// add character to main attacker div, and append attacker div to game area
		myAppend(character, characterRow, attackerDiv, gameArea);

		// set current attack power to attack power of character
		curr.attack = parseInt($(character).attr("atk"));
		curr.adjAttack = curr.attack;
	}


	function createPlayArea() {
		var playArea = $("<div>").addClass("col-xs-12").attr("id", "playArea");

		$(gameArea).append(playArea);
	}


	// and move enemies into enemy staging area
	function showDefenders() {
		// build main defender div
		var defenderDiv = $("<div>").addClass("col-xs-12").attr("id", "defenderDiv");

		// build defender header
		var headerDiv = $("<div>").addClass("col-xs-12 gameHeader").attr("id", "defenderHeader");
		var headerText = $("<h2>").text("Defenders"); 
		// add header to main defender div
		myAppend(headerText, headerDiv, defenderDiv);
		

		if(curr.side === "rebel") {
			var defenders = empireChars;
		} else if(curr.side === "empire") {
			var defenders = rebelChars;
		}

		defenders.forEach( function(character) {
			var colDiv = $("<div>").addClass("col-xs-3");
			var playerDiv = $("<div>").addClass("defender")
			var playerImg = $("<img>").addClass("playerImg").attr("src", character.image);
			var playerHP = $("<p>").text(character.hitPoints);

			// add all character attributes to html element
			addCharAttributes(character, playerDiv);

			$(playerDiv).append(playerImg);
			$(playerDiv).append(playerHP);

			myAppend(playerDiv, colDiv, defenderDiv);
		});

		// append defender divs to game area
		$(gameArea).append(defenderDiv);
	}


	moveAttacker(charObj);

	createPlayArea();

	showDefenders();

	$(contentEl).html("");
	$(contentEl).append(gameArea);

	defenderPrompt();
}


// prompt to select a defender
function defenderPrompt() {

	function createClickListeners() {
		$(".defender").click( function() {
			defenderSelected(this);
		});
	}

	var playArea = $("#playArea");
	var promptText = $("<h1>").attr("id", "defPrompt").text("Select a defender to attack");

	$(playArea).html("");
	$(playArea).append(promptText);

	createClickListeners();
}


// once a defender is selected, move them to active defender area. 
function defenderSelected(defenderObj) {

	function moveDefender(defender) {
		var playArea = $("#playArea");
		var currDefRow = $("<div>").addClass("row").attr("id", "currentDefenderRow");

		$(defender).removeClass("defender").addClass("currentDefender");

		// clear play area 
		playArea.html("");

		//populate play area with attack button and selected defender
		addAttackBtn();
		myAppend(defender, currDefRow, playArea);

		// remove selected defender from defender row
		$("#defenderDiv").remove($(defender).attr("id"));
	}

	function updateDefenderArea() {
		// get current number of defenders
		currentDefenders = $(".defender");
		// calculate new col numbers
		var newColNum = 12 / currentDefenders.length;

		// get children of defender div
		var defDivChildren = $("#defenderDiv").children();

		// START AT 1 TO SKIP HEADER
		for(var i = 1; i < defDivChildren.length; i += 1) {
			if($(defDivChildren[i]).is(":empty")){
				// remove child of defender div if empty
				$(defDivChildren[i]).remove();
			} else {
				// otherwise assign new col class
				$(defDivChildren[i]).removeClass();
				$(defDivChildren[i]).addClass(`col-xs-${newColNum}`);
			}
		}
	}

	function removeClickListeners() {
		console.log("clicks off");
		$(".defender").off("click");
	}

	function addAttackBtn() {
		var attackBtn = $("<button>").attr("id", "attackBtn").text("Attack");
		var btnCol = $("<div>").addClass("col-xs-12");
		var btnRow = $("<div>").addClass("row").attr("id", "attackBtnRow");

		myAppend(attackBtn, btnCol, btnRow, playArea);
	}

	function addAttackListener() {
		$("#attackBtn").click( function() {
			attackBtnClicked();
		});
	}


	removeClickListeners();

	moveDefender(defenderObj);

	updateDefenderArea();
}


function attackBtnClicked() {
	// get current character elements
	var attacker = $(".currentAttacker");
	var defender = $(".currentDefender");

	// when the attack button is clicked, 
	function attackDefender() {
		// get defenders current HP
		var defenderHP = $(defender).attr("hp");

		// decrement HP by current adjusted attack
		defenderHP -= curr.adjAttack;
		// adjusted attack power of character is increased by base attack power
		curr.adjAttack += curr.attack;

		// update current defender's hp to new decremented value
		$(defender).attr("hp", defenderHP);

		// if the attack drops defenders hp to zero or lower
		if(defenderHP <= 0) {
			// remove defender from play area, and prompt user to choose a new defender
			defenderDefeated();
		} else {
			// defender counter attacks by their counter-attack power,
			counterAttack();
		}
	}

	function counterAttack() {
		// get defender's counter attack and attacker's hit points
		var defenderCAtk = $(defender).attr("catk");
		var attackerHP = $(attacker).attr("hp");

		// decrement character HP by counter attack
		attackerHP -= defenderCAtk;

		// update attacker's hp to new decremented value
		$(attacker).attr("hp", attackerHP);

		// if current character's hp is zero or lower, the game is lost
		if(attackerHP <= 0) {
			lostGame();
		}
	}

				
					// if no defenders remain, then the player wins

		
}



$(document).ready( function() {
	sidePrompt();
})

// 

