//card class
var card = function (profile, cardNum) {
    this.roast_profile = profile.roast_profile;
    this.bean_temp = profile.bean_temp;
    this.matched = false;
    this.back_face_img_src = "images/bag.jpg";
    this.front_face_img_src = profile.src;
    this.pairNum = profile.pairNum;
    this.cardNum = cardNum;
    this.cardDOM = $("<div>", {
        class: "card_container card_front" + this.cardNum + " col-xs-2",
    }).append($("<img>", {
        class: "front-face card-face",
        id: "card_front" + this.cardNum,
        src: this.front_face_img_src
    })).append($("<img>", {
        class: "back-face card-face",
        id: "card_back" + this.cardNum,
        src: this.back_face_img_src,
        onclick: "game_board.cards[" + this.cardNum + "].flip_card()"
    }));
    this.flip_card = function () {
        if(!game_board.animation_complete){
            return;
        }
        game_board.click_num++;
        $("#card_back" + this.cardNum).animate({top: '750px'});
        if (game_board.click_num === 1) {
            game_board.pick1 = this;
        }
        if (game_board.click_num === 2) {
            game_board.pick2 = this;
            if (game_board.pick1.pairNum === game_board.pick2.pairNum) {
                game_board.cards_matched();
            }
            else {
                game_board.cards_not_matched();
            }
        }
    }
}

//game_board class
var game_board = function () {
    this.animation_complete = true;
    this.cards = [];
    this.deck = [
        {
            src: "images/match1.png",
            roast_profile: "Green Beans",
            bean_temp: "72° F",
            pairNum: 1
        },
        {
            src: "images/match1.png",
            roast_profile: "Green Beans",
            bean_temp: "72° F",
            pairNum: 1
        },
        {
            src: "images/match2.png",
            roast_profile: "Drying Phase",
            bean_temp: "329°F",
            pairNum: 2
        },
        {
            src: "images/match2.png",
            roast_profile: "Drying Phase",
            bean_temp: "329°F",
            pairNum: 2
        },
        {
            src: "images/match3.png",
            roast_profile: "Cinnamon",
            bean_temp: "385°F",
            pairNum: 3
        },
        {
            src: "images/match3.png",
            roast_profile: "Cinnamon",
            bean_temp: "385°F",
            pairNum: 3
        },
        {
            src: "images/match4.png",
            roast_profile: "Light Roast",
            bean_temp: "401°F",
            pairNum: 4
        },
        {
            src: "images/match4.png",
            roast_profile: "Light Roast",
            bean_temp: "401°F",
            pairNum: 4
        },
        {
            src: "images/match5.png",
            roast_profile: "American",
            bean_temp: "410°F",
            pairNum: 5
        },
        {
            src: "images/match5.png",
            roast_profile: "American",
            bean_temp: "410°F",
            pairNum: 5
        },
        {
            src: "images/match6.png",
            roast_profile: "City",
            bean_temp: "426°F",
            pairNum: 6
        },
        {
            src: "images/match6.png",
            roast_profile: "City",
            bean_temp: "426°F",
            pairNum: 6
        },
        {
            src: "images/match7.png",
            roast_profile: "Full City",
            bean_temp: "437°F",
            pairNum: 7
        },
        {
            src: "images/match7.png",
            roast_profile: "Full City",
            bean_temp: "437°F",
            pairNum: 7
        },
        {
            src: "images/match8.png",
            roast_profile: "Vienna",
            bean_temp: "446°F",
            pairNum: 8
        },
        {
            src: "images/match8.png",
            roast_profile: "Vienna",
            bean_temp: "446°F",
            pairNum: 8
        },
        {
            src: "images/match9.png",
            roast_profile: "French",
            bean_temp: "464°F",
            pairNum: 9
        },
        {
            src: "images/match9.png",
            roast_profile: "French",
            bean_temp: "464°F",
            pairNum: 9
        }

    ]
    this.dealCards = function () {
        this.cards = [];
        var new_deck = this.deck.slice();
        $(".game_area").empty();
        for (var i in this.deck) {
            var j = Math.floor((Math.random() * (new_deck.length - 1)) + 0)
            this.cards[i] = new card(new_deck[j], i);
            $(".game_area").append(this.cards[i].cardDOM);
            new_deck.splice(j, 1);
        }
    }
    this.accuracy = 0;
    this.multiplier = 0;
    this.pick1 = 0;
    this.pick2 = 0;
    this.roast_profile = "...";
    this.bean_temp = "...";
    this.accuracy = "...";
    this.multiplier = "...";
    this.score = 0;
    this.click_num = 0;
    this.bad_matches = 0;
    this.good_matches = 0;
    this.streak = 1;
    this.speed = 1500;
    this.cards_matched = function () {
        $("#card_back" + this.pick1.cardNum).hide().parent().css("border-color", "white");
        $("#card_back" + this.pick2.cardNum).hide().parent().css("border-color", "white");
        console.log(game_board);
        this.cards[this.pick1.cardNum].matched = true;
        this.cards[this.pick2.cardNum].matched = true;
        this.good_matches++;
        this.streak++;
        this.update_stats(true);
        this.pick1 = 0;
        this.pick2 = 0;
        this.click_num = 0;

    };
    this.cards_not_matched = function () {
        this.animation_complete = false;
        $("#card_back" + this.pick1.cardNum).animate({top: '0px'},this.speed,function(){game_board.animation_complete = true});
        $("#card_back" + this.pick2.cardNum).animate({top: '0px'},this.speed,function(){game_board.animation_complete = true});
        console.log(game_board);
        this.bad_matches++;
        this.streak = 1;
        this.update_stats(false);
        this.pick1 = 0;
        this.pick2 = 0;
        this.click_num = 0;

    }
    this.update_stats = function(update_score){
        this.roast_profile = this.pick2.roast_profile;
        this.bean_temp = this.pick2.bean_temp;
        this.accuracy = ((this.good_matches/(this.good_matches+this.bad_matches))*100).toFixed(2);
        this.multiplier = this.streak*2;
        if(update_score) {
            this.score = parseInt(this.score) + parseInt((this.multiplier * this.accuracy * 100).toFixed(0));
        }
        this.speed = 1500/(this.good_matches+1);
        update_stats_dom();
        if(this.good_matches === 9){
            game_won();
        }
    }
}

var game_board = new game_board();
$(document).ready(function () {
    //sets up game board and deals cards randomly
    $(".body_container").css("height",$(window).height())
    $(".game_message").html("<h1 class='message'>Press Start to Begin!</h1>");
})

function game_won() {
    setTimeout(function () {
        //console.log('Game Won!!!!');
        $(".game_area").hide();
        $(".game_message").show().html("<h1 class='message'>You're a Master Roaster!<br>Score:"+game_board.score+"</h1>");
    }, 3000);
}

function start_game() {
    game_board.dealCards();
    $(".game_area").show();
    $(".game_message").hide();
    $('.start_button').prop('disabled', true);

}

function reset_game() {
    //location.reload();
    $(".game_area").hide();
    $(".game_message").show().html("<h1 class='message'>Press Start to Begin!</h1>");
    $('.start_button').prop('disabled', false);

}

function update_stats_dom(){
    $("p.roast_profile_content").text(game_board.roast_profile);
    $("p.bean_temp_content").text(game_board.bean_temp);
    $("p.accuracy_content").text(game_board.accuracy+ "%");
    $("p.multiplier_content").text("x" + game_board.multiplier);
    $("p.score_content").text(game_board.score);
}



