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
            template += "<img id='front"+num+"' class='card front frontCard "+num+"' src='image/"+num+".png'>"
            template += "<img id='behind"+num+"' class='card behind behindCard "+num+"' src='image/close.png' onclick='cardGame.event.openCard("+num+")'>"
            template += "</td>";
            return template;
        }
    }    

    cardGame.event = {

        openedCard : 0,

        openCard: function(num) {
            $('#behind'+num).attr('style', "display:none;");
            $('#front'+num).attr('style', "display:block;");
            $('.'+num).addClass('opened');
            
            if(this.openedCard == 0){
                this.openedCard = num;
                console.log("처음")
            }else {
                let preNum = this.openedCard;
                if(num == this.openedCard + 40 || num == this.openedCard - 40){
                    console.log("성공")
                   
                    setTimeout(function() {
                        $('.opened').addClass('success');
                        $('.'+num).addClass('success');
                        $('.success').attr('style', "display:none;");
                        $('.success .front').removeClass('frontCard');
                        $('.success .behind').removeClass('behindCard');
                    }, 800);
                    this.openedCard = 0;
                }else{
                    console.log("실패")
                    setTimeout(function() {
                        $('#front'+num).attr('style', "display:none;");
                        $('#behind'+num).attr('style', "display:block;");
                        $('#front'+preNum).attr('style', "display:none;");
                        $('#behind'+preNum).attr('style', "display:block;");
                        $('.frontCard').removeClass('opened');
                        $('.behindCard').removeClass('opened');
                    }, 800);
                    this.openedCard = 0;
                }
            }
            console.log("무조건탐")
            
        }
    };
}(window, document));
