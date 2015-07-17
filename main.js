    var click = 0;
	var second_clicked_card = false;
	var first_clicked_card_src=null;
	var card_match = false;
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

   
   $(document).ready(function(){
        $('.back-face').attr('src',back_face_img_src); //using jquery to set the source of the image for the back of the card
        for(i = 1; i <= 18; i++){
            console.log("=====================loop start========================")
            front_face_img_id = ("#card_front"+i);
            console.log("front_face_image_id is:",front_face_img_id);
            
            //grab random img and assign to front_face_img_src_num variable
            //insert code here
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
        
        $(card_back_id).hide();


    	if(!second_clicked_card){
        	console.log('it is the first clicked card');
        	first_clicked_card_src = card_front_src;
        	second_clicked_card = true;
        	first_clicked_card_id = card_back_id;
        	click = 1;
    	}

    	else{
            can_flip = false;
    		click = 2;
    		second_clicked_card_id = card_back_id;
        	if(card_front_src == first_clicked_card_src){
            	console.log("Same Card!!!");
            	card_match = true;
            	

        	}
        	else{
        		console.log("no match")
        		card_match = false;
        		flip_cards();
        		
        	}
       
    	}
    
   		 
	}

	function flip_cards(){
		setTimeout(function(){$(first_clicked_card_id).show();$(second_clicked_card_id).show();},2000)
		second_clicked_card = false;
        can_flip = true;
		
	}
