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
            template += "<img id='front"+num+"' class='card frontCard' src='image/"+num+".png'>"
            template += "<img id='behind"+num+"' class='card behindCard' src='image/close.png' onclick='cardGame.event.openCard("+num+")'>"
            template += "</td>";
            return template;
        }
    }    

    cardGame.event = {

        openedCard : 0,

        fail: function() {
            $('.frontCard').attr('style', "display:none;");
            $('.behindCard').attr('style', "display:block;");
        },

        success: function() {
            $('.openedCard').attr('style', "display:none;")
            $('#front'+num).attr('style', "display:none;");
        },

        setTime: function(callback) {
            setTimeout(function() {
                callback();
            }, 800);
        },

        openCard: function(num) {
            $('#front'+num).attr('style', "display:block;");
            $('#front'+num).addClass('openedCard');
            $('#behind'+num).attr('style', "display:none;");
            
            if(this.openedCard == 0){
                this.openedCard = num;
            }else {
                if(num == this.openedCard + 40 || num == this.openedCard - 40){
                    this.setTime(this.success);
                    this.openedCard = 0;
                }else{
                    this.setTime(this.fail);
                    this.openedCard = 0;  
                }
            }
            $('.frontCard').removeClass('openedCard');
        }
    };
}(window, document));
