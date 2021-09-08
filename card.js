(function(W,D) {
    W.cardGame = W.cardGame || {};

    $(D).ready(function() {
        cardGame.ui.init();
    });

    cardGame.ui = {
        init : function() {
            let array = Array(80).fill(undefined).map((v, i) => i + 1); //1부터 80까지 배열
            function shuffle(array) {
                array.sort(() => Math.random() - 0.5);
            }
            shuffle(array);

            Array.prototype.division = function (n) {
                var arr = this;
                var len = arr.length;
                var cnt = Math.floor(len / n);
                var tmp = [];
        
                for (var i = 0; i <= cnt; i++) {
                    tmp.push(arr.splice(0, n));
                }
                return tmp;
            }

            let sepArr = array.division(16);
            let td = "";
            let html = "";
            
            for(let i =0; i<5; i++){ 
                for(let j=0; j<16; j++){
                    td += cardGame.template.setTdTemplate(sepArr[i][j]);
                }
                html += cardGame.template.setTrTemplate(td);
                td = "";
            }
            $("#cardTable").html(html);
        }
    }
    cardGame.template = {
        setTrTemplate : function(td) {
            let template = "";
            template += "<tr>";
            template += td;
            template += "</tr>";
            return template;
        },

        setTdTemplate : function(num) {
            let template = "";
            template += "<td class='cardNum'>"
            template += "<img id='front"+num+"' class='card frontCard "+num+"' src='image/"+num+".png'>"
            template += "<img id='behind"+num+"' class='card behindCard' src='image/close.png' onclick='cardGame.event.openCard("+num+")'>"
            template += "</td>";
            return template;
        }
    }    

    cardGame.event = {

        openedCard : 0,

        // fail: function() {
        //     $('.frontCard').attr('style', "display:none;");
        //     $('.behindCard').attr('style', "display:block;");
        // },

        // success: function(num) {
        //     $('.openedCard').attr('style', "display:none;")
        //     $('#front'+num).attr('style', "display:none;");
        // },

        // setTime: function(callback) {
        //     setTimeout(function() {
        //         callback();
        //     }, 800);
        // },

        openCard: function(num) {
            $('#front'+num).addClass('openedCard');
            $('#front'+num).attr('style', "display:block;");
            $('#behind'+num).attr('style', "display:none;");
            console.log(this.openedCard)
            if(this.openedCard == 0){
                // $('.'+num).addClass('openedCard');
                this.openedCard = num;
                console.log(this.openedCard)    
                
            }else {
                if(num == this.openedCard + 40 || num == this.openedCard - 40){
                    console.log(this.openedCard)
                    setTimeout(function() {
                        console.log(this.openedCard)
                        $('.openedCard').attr('style', "display:none;")
                        $('#front'+num).attr('style', "display:none;");
                    }, 800);
                    this.openedCard = 0;
                }else{
                    console.log("틀림")
                    setTimeout(function() {
                        $('.frontCard').attr('style', "display:none;");
                        $('.behindCard').attr('style', "display:block;");
                    }, 800);
                    this.openedCard = 0; 
                }
            }
        }
    };
}(window, document));
