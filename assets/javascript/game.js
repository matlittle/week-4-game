
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

// empire characters
var vader = new Player(100, 8, 20, "#vader", "empire", "vader.jpg");
var sidious = new Player(120, 10, 25, "#sidious", "empire", "sidious.png");
var bobaFett = new Player(80, 14, 30, "#bobaFett", "empire", "boba_fett.jpg");
var rancor = new Player(160, 6, 15, "#rancor", "empire", "rancor.jpg");


// variables for basic elements
var contentEl = $("#content")

// hold current game state
var curr = {};


// display initial prompt to choose a side
function sidePrompt() {

	// change display to show two options, rebels or empire
	function displaySideChoice() {
		var promptDiv = $("<div>").attr("id", "sidePrompt");

		var headerRow = $("<div>").addClass("row");
		var headerCol = $("<div>").addClass("col-xs-12");
		var textHeader = $("<h1>").attr("id", "sideHdr").text("Choose your side");

		$(headerCol).append(textHeader);
		$(headerRow).append(headerCol);
		$(promptDiv).append(headerRow);
		
		var btnRow = $("<div>").addClass("row")
		var choices = ["rebel", "empire"];

		choices.forEach( function(element) {
			var sideCol = $("<div>").addClass("col-xs-6");
			var sideChoice = $("<div>").addClass("sideBtn").attr("id", `${element}Btn`);

			$(sideCol).append(sideChoice);
			$(btnRow).append(sideCol);
			
		});

		$(promptDiv).append(btnRow);
		$(contentEl).append(promptDiv);
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
		} else {
			curr.side = "empire";
		}

		$(contentEl).html("")

		characterPrompt();
	}

	displaySideChoice();

	createClickListener();
}




$(document).ready( function() {
	sidePrompt();
})


function characterPrompt() {
	// once player chooses side, prompt them to choose a character (choices depend on side selected)
	function displayCharacterChoice(side) {
		if(side === "rebel") {
			var choices = [obiWan, luke, hanSolo, yoda]
		} else if(side === "empire") {
			var choices = [vader, sidious, bobaFett, rancor]
		}

		var promptDiv = $("<div>").addClass("row").attr("id", "characterPrompt");

		var headerRow = $("<div>").addClass("row");
		var headerCol = $("<div>").addClass("col-xs-12");
		var textHeader = $("<h1>").attr("id", "characterHdr").text("Choose your player");

		$(headerCol).append(textHeader);
		$(headerRow).append(headerCol);
		$(promptDiv).append(headerRow);

		choices.forEach( function(option) {
			var colDiv = $("<div>").addClass("col-xs-3");
			var playerDiv = $("<div>").addClass(`possPlayer ${side}`).attr("id", option.htmlId);
			var playerImg = $("<img>").addClass("playerImg").attr("src", option.image);
			var playerHP = $("<p>").text(option.hitPoints);

			$(playerDiv).append(playerImg);
			$(playerDiv).append(playerHP);

			$(colDiv).append(playerDiv);
			$(promptDiv).append(colDiv);
		});

		$(contentEl).append(promptDiv);
	}

	function createClickListener() {
		$(".possPlayer").click(function() {
			var charBtn = $(this).attr("id");
			console.log(charBtn);
			charSelected(charBtn);
		});
	}

	displayCharacterChoice(curr.side);

	createClickListener();
}


function charSelected(charId) {

	var currentAttacker = $(charId);
	var gameArea = $("<div>").addclass("row").attr("id", "gameArea")

	// after character is selected, move character to "attacker" area
	function moveAttacker(character) {
		
		var attackerDiv = $("<div>").addClass("col-xs-12 currAttacker");

		$(attackerDiv).append(currentAttacker);
		$(gameArea).append(attackerDiv);
	}

	moveAttacker(charID);


	// and move enemies into enemy staging area
	function showDefenders() {

	}

	$(contentEl).html("");
	$(contentEl).append(gameArea);

	// attack power and hp is set to power of character selected
}


// prompt to select a defender

// once a defender is selected, move them to active defender area. 

// when the attack button is clicked, 
	// attack active defender, decrementing hit points by current character's adjusted attack value
		// if the attack drops defenders hp to zero or lower
			// remove defender from play area, and prompt user to choose a new defender
				// if no defenders remain, then the player wins
	// defender counter attacks by their counter-attack power, and current character's hp is decremented
		// if current character's hp is zero or lower, the game is lost
	// attack power of character is increased by base attack power

// 

