
function init() {
	// initialize all possible characters as objects, with a value for hit points, 
	// base attack, and counter attack.
	
	// function to create player objects
	function Player(hp, atk, catk, id, name, side, img) {
		this.hitPoints = hp;
		this.attack = atk;
		this.counterAttack = catk;
		this.htmlId = id;
		this.name = name;
		this.faction = side;
		this.image = `assets/images/${img}`;
	}

	// rebel characters
	var obiWan = new Player(100, 8, 15, "obi", "Obi-Wan Kenobi", "rebel", "obi_wan.jpg");
	var luke = new Player(120, 10, 20, "luke", "Luke Skywalker" ,"rebel", "luke.png");
	var hanSolo = new Player(80, 14, 25, "han", "Han Solo", "rebel", "han_solo.jpg");
	var yoda = new Player(160, 6, 10, "yoda", "Yoda", "rebel", "yoda.jpg");

	var rebelChars = [obiWan, luke, hanSolo, yoda];

	// empire characters
	var vader = new Player(100, 8, 15, "vader", "Darth Vader", "empire", "vader.jpg");
	var sidious = new Player(120, 10, 20, "sidious", "Darth Sidious", "empire", "sidious.png");
	var bobaFett = new Player(80, 14, 25, "boba", "Boba Fett", "empire", "boba_fett.jpg");
	var rancor = new Player(160, 6, 10, "rancor", "Rancor", "empire", "rancor.jpg");

	var empireChars = [vader, sidious, bobaFett, rancor];


	// variables for basic elements
	var contentEl = $("#content")
	var playRow = $("<div>").addClass("row").attr("id", "playRow");

	// hold current game state
	var curr = {};

	// prompt to choose side and start game
	sidePrompt();


	// add multiple attributes of characters to their html element
	function addCharAttributes(char, el) {
		$(el).attr("id", char.htmlId);
		$(el).attr("name", char.name);
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
		// after character is selected, move character to "attacker" area
		function moveAttacker(character) {
			// clear content element
			$(contentEl).html("");

			// build main attacker div
			var attackerRow = $("<div>").addClass("row").attr("id", "attackerRow");
			var characterRow = $("<div>").addClass("col-xs-12");

			// build attacker header
			var headerDiv = $("<div>").addClass("col-xs-12 gameHeader").attr("id", "attackerHeader");
			var headerText = $("<h2>").text("Your character");
			// append header to main attacker div
			myAppend(headerText, headerDiv, attackerRow);

			// remove possible class and add current class
			$(character).removeClass("possPlayer");
			$(character).addClass("currentAttacker");

			// add character to main attacker div, and append attacker div to content element
			myAppend(character, characterRow, attackerRow, contentEl);

			// set current attack power to attack power of character
			curr.attack = parseInt($(character).attr("atk"));
			curr.adjAttack = curr.attack;
		}


		function createInfoAndPlayRows() {
			addInfoRow();
			addPlayRow();
		}


		// and move enemies into enemy staging area
		function showDefenders() {
			// build main defender div
			var defenderRow = $("<div>").addClass("row").attr("id", "defenderRow");

			// build defender header
			var headerDiv = $("<div>").addClass("col-xs-12 gameHeader").attr("id", "defenderHeader");
			var headerText = $("<h2>").text("Defenders"); 
			// add header to main defender div
			myAppend(headerText, headerDiv, defenderRow);
			

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

				myAppend(playerDiv, colDiv, defenderRow);
			});

			// append defender divs to game area
			$(contentEl).append(defenderRow);
		}


		moveAttacker(charObj);

		createInfoAndPlayRows();

		showDefenders();

		defenderPrompt();
	}

	// add info row to content area
	function addInfoRow() {

		var infoRow = $("<div>").addClass("row").attr("id", "infoRow");

		function addInfoColumn(id) {
			var infoP = $("<p>").attr("id", id);
			var infoColumn = $("<div>").addClass("col-xs-5");

			myAppend(infoP, infoColumn, infoRow);

		}

		function addAttackBtn() {
			var attackBtn = $("<button>").text("Attack");
			attackBtn.attr("id", "attackBtn").css("display", "none");

			var btnCol = $("<div>").addClass("col-xs-2");
			
			myAppend(attackBtn, btnCol, infoRow);

		}


		addInfoColumn("attackInfo");
		addAttackBtn();
		addInfoColumn("counterInfo");

		$(contentEl).append(infoRow);
	}

	// add play row to content area
	function addPlayRow() {
		$(contentEl).append(playRow);
	}

	// prompt to select a defender
	function defenderPrompt() {

		function createClickListeners() {
			$(".defender").click( function() {
				defenderSelected(this);
			});
		}

		var promptText = $("<h1>").attr("id", "defPrompt").text("Select a defender to attack");

		$(playRow).html("");
		$(playRow).append(promptText);

		createClickListeners();
	}

	// once a defender is selected, move them to active defender area. 
	function defenderSelected(defenderObj) {

		function moveDefender(defender) {
			var currDefRow = $("<div>").addClass("row").attr("id", "currentDefenderRow");

			$(defender).removeClass("defender").addClass("currentDefender");

			// clear play area 
			playRow.html("");

			// add defender to play area. 
			myAppend(defender, currDefRow, playRow);

			// remove selected defender from defender row
			$("#defenderRow").remove($(defender).attr("id"));
		}

		function updateDefenderArea() {
			// get current number of defenders
			currentDefenders = $(".defender");
			// calculate new col numbers
			var newColNum = 12 / currentDefenders.length;

			// get children of defender div
			var defDivChildren = $("#defenderRow").children();

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

		function addAttackListener() {
			$("#attackBtn").click( function() {
				attackBtnClicked();
			});
		}

		removeClickListener(".defender");

		moveDefender(defenderObj);

		updateDefenderArea();

		addAttackListener();

		toggleVisibility("#attackBtn");
	}

	function removeClickListener(element) {
		$(element).off("click");
	}

	function toggleVisibility(element) {
		if($(element).css("display") === "none") {
			$(element).css("display", "block");
		} else {
			$(element).css("display", "none");
		}
	}

	// run through attack and counter attack
	function attackBtnClicked() {
		// get current character elements
		var attacker = $(".currentAttacker");
		var defender = $(".currentDefender");

		// get name of current attacker/defender
		var attackerName = String($(attacker).attr("name"));
		var defenderName = String($(defender).attr("name"));

		// when the attack button is clicked, 
		function attackDefender() {
			// get defenders current HP
			var defenderHP = $(defender).attr("hp");

			// decrement HP by current adjusted attack
			defenderHP -= curr.adjAttack;

			// update current defender's hp to new decremented value
			$(defender).attr("hp", defenderHP);
			$("p", defender).text(defenderHP);

			// if the attack drops defenders hp to zero or lower
			if(parseInt(defenderHP) <= 0) {
				// display defender defeated
				updateAttackInfo(true);
				// remove defender from play area, and prompt user to choose a new defender
				defenderDefeated();
			} else {
				// display attack stats
				updateAttackInfo(false);
				// defender counter attacks by their counter-attack power,
				counterAttack();
			}

			// adjusted attack power of character is increased by base attack power
			curr.adjAttack += curr.attack;
		}

		function counterAttack() {
			// get defender's counter attack and attacker's hit points
			var defenderCAtk = parseInt($(defender).attr("catk"));
			var attackerHP = parseInt($(attacker).attr("hp"));

			// decrement character HP by counter attack
			attackerHP -= defenderCAtk;

			// update attacker's hp to new decremented value
			$(attacker).attr("hp", attackerHP);
			$("p", attacker).text(attackerHP)

			// if current character's hp is zero or lower, the game is lost
			if(parseInt(attackerHP) <= 0) {
				// display attacker defeated
				updateCounterInfo(true);
				removeClickListener("#attackBtn");
				toggleVisibility("#attackBtn");
				// show game over
				lostGame();
			} else {
				// display counter attack info
				updateCounterInfo(false);
			}
		}

		function defenderDefeated() {
			// remove defender from play area
			$(defender).remove();

			removeClickListener("#attackBtn");
			toggleVisibility("#attackBtn");

			// get number of remaining defenders
			currentDefenders = $(".defender");

			console.log(currentDefenders);
			console.log(currentDefenders.length);

			if(currentDefenders.length <= 0){
				// if no defenders remain you won
				wonGame();
			} else {
				// prompt to choose a new defender
				defenderPrompt();
			}
		}

		function updateAttackInfo(defeated) {

			if(defeated) {
				var infoText = `${attackerName} has defeated ${defenderName}!`;
				$("#counterInfo").text("");
			} else {
				var infoText = `${attackerName} attacks ${defenderName} for ${curr.adjAttack} damage!`;
			}

			$("#attackInfo").text("");
			$("#attackInfo").text(infoText);
		}

		function updateCounterInfo(defeated) {

			var counterAttack = $(defender).attr("catk");

			if(defeated) {
				var infoText = `${defenderName} has defeated ${attackerName}!`;
			} else {
				var infoText = `${defenderName} counters ${attackerName} for ${counterAttack} damage!`;
			}

			$("#counterInfo").text("");
			$("#counterInfo").text(infoText);
		}

		attackDefender();

		return;
		// if no defenders remain, then the player wins	
	}

	// display lost game prompt
	function lostGame() {
		
		function promptLostGame() {
			if(curr.side === "rebel") {
				var lostText = "The Empire has destroyed you!"
			} else if(curr.side === "empire") {
				var lostText = "The Rebels have triumphed!"
			}

			var lostHeader = $("<h1>").text(lostText).addClass("gameOver gameHeader")

			$(playRow).append(lostHeader);
		}

		// remove objects from play area
		$(playRow).html("")

		promptLostGame();

		addResetBtn();
	}

	// display won game prompt
	function wonGame() {
		// remove objects from play area
		$(playRow).html("")

		function promptWonGame() {
			if(curr.side === "rebel") {
				var wonText = "You've overthrown the Empire!"
			} else if(curr.side === "empire") {
				var wonText = "You've crushed the Rebel scum!"
			}

			var wonHeader = $("<h1>").text(wonText).addClass("gameOver gameHeader")

			$(playRow).append(wonHeader);
		}

		promptWonGame();

		addResetBtn();
	}

	// add reset button to page
	function addResetBtn() {
		var resetText = "Would you like to play again?";
		var resetHeader = $("<h4>").text(resetText);
		var resetBtn = $("<div>").addClass("gameHeader").attr("id", "resetBtn");
		var resetCol = $("<div>").addClass("col-xs-12");

		myAppend(resetHeader, resetBtn, resetCol, playRow);

		function addClickListener() {
			$("#resetBtn").click( function() {
				resetGame();
			})
		}

		addClickListener();
	}

	// reset the game
	function resetGame() {
		// clear content area
		$(contentEl).html("");
		// run initialization function again
		init();
	}

}


$(document).ready( function() {
	init();
})

// 

