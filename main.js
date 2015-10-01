var first_clicked_card_src = null;
var first_clicked_card_id = null;
var second_clicked_card_id = null;
var front_face_img_src_1 = "images/match1.png";
var front_face_img_src_2 = "images/match2.png";
var front_face_img_src_3 = "images/match3.png";
var front_face_img_src_4 = "images/match4.png";
var front_face_img_src_5 = "images/match5.png";
var front_face_img_src_6 = "images/match6.png";
var front_face_img_src_7 = "images/match7.png";
var front_face_img_src_8 = "images/match8.png";
var front_face_img_src_9 = "images/match9.png";
var front_face_img_src_num;
var random_img_array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var click_num = 0;
var cards_matched = 0;
var speed;
var bad_matches = 0;
var accuracy = 0;
var multiplier = 1;
var streak = false;
var score = 0;
var points = 0;
var matched_card_src;

//card class
var card = function(front_face_img_src, pairNum, cardNum, profile){
    this.profile = profile;
    this.matched = false;
    this.back_face_img_src = "http://solarroast.com/sites/default/files/Burlap.png";
    this.front_face_img_src = front_face_img_src;
    this.pairNum = pairNum;
    this.cardNum = cardNum;
    this.cardDOM = $("<div>",{
        class:"card_container card_front"+this.cardNum+" col-xs-2",
    }).append($("<img>",{
        class:"front-face card-face",
        id:"card_front"+this.cardNum,
        src:this.front_face_img_src
    })).append($("<img>",{
        class:"back-face card-face",
        id:"card_back"+this.cardNum,
        src:this.back_face_img_src,
        onclick:"card"+this.cardNum+".flip_card()"
    }));
    this.flip_card = function () {
        var cardNum = this.cardNum
        $("#card_back" + cardNum).animate({top: '750px'});
        //var speed = 1000 / (cards_matched + 1);
        setTimeout(function () {
            console.log($("#card_back" + cardNum).animate({top: '0px'}));
            $("#card_back" + cardNum).animate({top: '0px'});
        }, speed);
    }
}

var card1 = new card("images/match1.png",1,1);
console.log(card1.cardDOM);

function dealCards(number_of_cards) {
    var cards = {};
    for (var i = 0; i < number_of_cards; i++) {
        cards[i] = new card("images/match1.png", i, i);
    }
    return cards;
}

var game_board = function(state,number_of_cards,cards){
    this.state = state;
    this.number_of_cards = number_of_cards;
    this.cards = cards;
}

$(document).ready(function () {
    $('.back-face').attr('src', back_face_img_src); //using jquery to set the source of the image for the back of the card
    set_random_images();
    $(".game_area").append(card1.cardDOM);
    var cards = dealCards(18);
    var game_board1 = new game_board("start",18,cards);

})


function card_click(card_back_id, card_front_id) {
    var card_front_src = $(card_front_id).attr('src');
    points = 0;
    if (click_num <= 1) {
        click_num = click_num + 1;
        //console.log(click_num + " cards have been clicked.");
    }
    else {
        //console.log(click_num + " cards have been clicked.  Card flipping temporarily disabled");
        return;
    }

    //$(card_back_id).hide();
    $(card_back_id).animate({top: '750px'});

    if (click_num == 1) {
        //console.log('First card has been clicked');
        first_clicked_card_src = card_front_src;
        first_clicked_card_id = card_back_id;
        first_clicked_card_front_id = card_front_id;

    }

    else {
        //console.log('Second card has been clicked')
        second_clicked_card_id = card_back_id;
        second_clicked_card_front_id = card_front_id;

        if (card_front_src == first_clicked_card_src) {
            matched_card_src = card_front_src;
            if (streak) {
                multiplier = multiplier * 2;
            }
            streak = true;
            card_match(first_clicked_card_front_id,first_clicked_card_id, second_clicked_card_front_id,second_clicked_card_id);
            points = 10000;
            if (cards_matched >= 9) {
                game_won();
            }
        }
        else {
            steak = false;
            multiplier = 1;
            console.log("no match")
            flip_cards();
        }
    }
    update_stats();
}


function flip_cards() {

    speed = 1000 / (cards_matched + 1);

    setTimeout(function () {
        $(first_clicked_card_id).animate({top: '0px'});
        $(second_clicked_card_id).animate({top: '0px'});
        click_num = 0;
        //console.log("Card flipping re-enabled");
    }, speed);

    bad_matches = bad_matches + 1;

    //console.log("You got it wrong", bad_matches, "times!!!");


}

function game_won() {
    setTimeout(function () {
        //console.log('Game Won!!!!');
        set_random_images();
        $(".game_area").hide();
        $(".game_won").show()
    }, 3000);


    //need to add celebration animation///////////////////////////////
    /////


    ////IN HERE!!!!!!


    /////////
}


function set_random_images() {
    //Thiis loop finds and assigns pics to positions randomly
    var random_img_array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
    for (i = 1; i <= 18; i++) {
        //console.log("=====================loop start========================")
        front_face_img_id = ("#card_front" + i);
        //console.log("front_face_image_id is:", front_face_img_id);

        //console.log("array before deletion is:", random_img_array)

        var rn = random_img_array.length - 1;
        //console.log("array lenth is:", rn);

        var n = Math.floor((Math.random() * rn) + 0);
        //console.log("array index number is:", n);

        var random_img_num = random_img_array[n];
        //console.log("The random img number is:", random_img_num);

        front_face_img_src_num = eval("front_face_img_src_" + random_img_num);


        //console.log("Name of variable for img source:", front_face_img_src_num);

        random_img_array.splice(n, 1);
        //console.log("array after deletion is:", random_img_array);

        var check = $(front_face_img_id).attr('src', front_face_img_src_num);
        //console.log(check);

        //console.log("=====================loop end==========================");
        //
    }
}


function show_game_area() {
    $(".game_area").show()
    //console.log("game started")
    accuracy = 0;
    multiplier = 1;
    streak = false;
    score = 0;
    update_stats();
    $('.start_button').prop('disabled', true);

}

function reset_game() {
    location.reload();
}

function card_match(front_card_id1, back_card_id1, front_card_id2, back_card_id2) {
    //console.log("Card Match!!!", first_clicked_card_id, second_clicked_card_id);
    //click_num set to zero restarts card clicking
    click_num = 0;
    cards_matched = cards_matched + 1;
    $(front_card_id1).parent().css("border-color", "white");
    $(front_card_id2).parent().css("border-color", "white");
    $(back_card_id1).hide();
    $(back_card_id2).hide();


}

function update_stats() {
    accuracy = (cards_matched / bad_matches) * 100
    if (isNaN(accuracy)) {
        accuracy = 0;
    }

    else if (!isFinite(accuracy)) {
        accuracy = 100;
    }

    score = score + (multiplier * (accuracy / 100) * points);

    if (streak) {
        switch (matched_card_src) {
            case "images/match1.png":
                roast_profile = "Green Beans"
                bean_temp = "72° F"
                break;
            case "images/match2.png":
                roast_profile = "Drying Phase"
                bean_temp = "329°F"
                break;
            case "images/match3.png":
                roast_profile = "Cinnamon"
                bean_temp = "385°F "
                break;
            case "images/match4.png":
                roast_profile = "Light Roast"
                bean_temp = "401°F"
                break;
            case "images/match5.png":
                roast_profile = "American"
                bean_temp = "410°F"
                break;
            case "images/match6.png":
                roast_profile = "City"
                bean_temp = "426°F"
                break;
            case "images/match7.png":
                roast_profile = "Full City"
                bean_temp = "437°F"
                break;
            case "images/match8.png":
                roast_profile = "Vienna"
                bean_temp = "446°F"
                break;
            case "images/match9.png":
                roast_profile = "French"
                bean_temp = "464°F"
                break;
            default:
                roast_profile = "..."
                bean_temp = "..."
        }
    }
    else {
        roast_profile = "...";
        bean_temp = "...";
    }


    $("p.roast_profile_content").text(roast_profile);
    $("p.bean_temp_content").text(bean_temp);
    $("p.accuracy_content").text(accuracy.toFixed(2) + "%");
    $("p.multiplier_content").text("x" + multiplier);
    $("p.score_content").text(score.toFixed(0));

}


