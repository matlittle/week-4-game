
// initialize all possible characters as objects, with a value for hit points, base attack, and counter attack.

// function to create player objects
function Player(name, hp, atk, catk, el, side) {
	this.hitPoints = hp;
	this.attack = atk;
	this.counterAttack = catk;
	this.element = el;
	this.faction = side;
}

// rebel characters
var obiWan = new Player(100, 8, 20, "#obiWan", "rebel");
var luke = new Player(120, 10, 25, "#luke" ,"rebel");
var hanSolo = new Player(80, 14, 30, "#hanSolo", "rebel");
var yoda = new Player(160, 6, 15, "#yoda", "rebel");

// empire characters
var vader = new Player(100, 8, 20, "#vader", "empire");
var sidious = new Player(120, 10, 25, "#sidious", "empire");
var bobaFett = new Player(80, 14, 30, "#bobaFett", "empire");
var rancor = new Player(160, 6, 15, "#rancor", "empire");

// hold current game state
var curr = {};


// display initial prompt to choose a side
function sidePrompt() {

	// change display to show two options, rebels or empire
	function displaySideChoice() {
		var headerRow = $("<div>")
		var headerCol = $("<div>");
		var textHeader = $("<h1>");
		var text = "Choose your side";
		
		$(headerRow).addClass("row")
		$(headerCol).addClass("col-12-xs");

		$(textHeader).text("Choose your side");
		$(headerCol).append(textHeader);
		$(headerRow).append(headerCol)
		$("#content").append(headerRow);
		

		var btnRow = $("<div>")
		var choices = ["rebels", "empire"];

		$(btnRow).addClass("row")

		choices.forEach( function(element) {
			var sideCol = $("<div>");
			var sideChoice = $("<div>");

			$(sideCol).addClass("col-6-xs");

			$(sideChoice).addClass(`sideBtn ${element}Btn`);
			$(sideCol).append(sideChoice);
			$(btnRow).append(sideCol);
			
		});

		$("#content").append(btnRow);

	}

	displaySideChoice();

	// depending on button clicked, set current side to rebel/empire
}

sidePrompt();

// once player chooses side, prompt them to choose a character (choices depend on side selected)


// after character is selected, move character to "attacker" area
// and move enemies into enemy staging area

	// attack power and hp is set to power of character selected

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

