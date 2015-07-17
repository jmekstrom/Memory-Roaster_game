	var first_clicked_card_src=null;
	var first_clicked_card_id = null;
	var second_clicked_card_id = null;
    var back_face_img_src = "http://solarroast.com/sites/default/files/Burlap.png";
    var front_face_img_src_1  = "images/match1.png";
    var front_face_img_src_2  = "images/match2.png";
    var front_face_img_src_3  = "images/match3.png";
    var front_face_img_src_4  = "images/match4.png";
    var front_face_img_src_5  = "images/match5.png";
    var front_face_img_src_6  = "images/match6.png";
    var front_face_img_src_7  = "images/match7.png";
    var front_face_img_src_8  = "images/match8.png";
    var front_face_img_src_9  = "images/match9.png";
    var front_face_img_src_num;
    var random_img_array = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
    var click_num = 0;
    var cards_matched = 0;

   
   $(document).ready(function(){
        $('.back-face').attr('src',back_face_img_src); //using jquery to set the source of the image for the back of the card

        //Thiis loop finds and assigns pics to positions randomly
        for(i = 1; i <= 18; i++){
            console.log("=====================loop start========================")
            front_face_img_id = ("#card_front"+i);
            console.log("front_face_image_id is:",front_face_img_id);
            
            console.log("array before deletion is:",random_img_array)

            var rn = random_img_array.length - 1;
            console.log("array lenth is:",rn);

            var n = Math.floor((Math.random() * rn) + 0);
            console.log("array index number is:",n);

            var random_img_num = random_img_array[n];
            console.log("The random img number is:",random_img_num);

            front_face_img_src_num = eval("front_face_img_src_"+random_img_num);


            console.log("Name of variable for img source:",front_face_img_src_num);

            random_img_array.splice(n,1);
            console.log("array after deletion is:",random_img_array);

            var check = $(front_face_img_id).attr('src',front_face_img_src_num);
            console.log(check);

            console.log("=====================loop end==========================");
            //
        }
    })
    
    
	function card_click(card_back_id,card_front_id){
        
        var card_front_src = $(card_front_id).attr('src');
        
        if(click_num <= 1){
            click_num = click_num + 1;
            console.log(click_num +" cards have been clicked.");
        }
        else{
            console.log(click_num +" cards have been clicked.  Card flipping temporarily disabled");

           return;
        }


        $(card_back_id).hide();


    	if(click_num == 1){
        	console.log('First card has been clicked');
        	first_clicked_card_src = card_front_src;
        	first_clicked_card_id = card_back_id;
        	
    	}

    	else{
            console.log('Second card has been clicked')
    		second_clicked_card_id = card_back_id;
        	if(card_front_src == first_clicked_card_src){
            	console.log("Card Match!!!");
                click_num = 0;
                console.log("Card flipping re-enabled")
                cards_matched = cards_matched + 1;
                if(cards_matched >= 9){
                        game_won();     
            	}

        	}
        	else{
        		console.log("no match")
        		flip_cards();
        		
        	}
       
    	}
    
   		 
	}

	function flip_cards(){
		setTimeout(function(){$(first_clicked_card_id).show();$(second_clicked_card_id).show();click_num=0;console.log("Card flipping re-enabled");},2000)

        
		
	}

    function game_won(){
        setTimeout(function(){$('.back-face').show();console.log('Game Won!!!!')},3000);
        click_num = 0;
        cards_matched = 0;
        //need to setup and call function to re-setup the board or images
    }

