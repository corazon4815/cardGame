(function(W,D) {
    W.cardGame = W.cardGame || {};

    $(D).ready(function() {
        cardGame.ui.initLocalStorage();
        cardGame.ui.init();
    });

    cardGame.ui = {
        initLocalStorage : function() {
            $('#firstScore').html(localStorage.getItem("firstScore") ? localStorage.getItem("firstScore") : "no record")
            $('#secondScore').html(localStorage.getItem("secondScore") ? localStorage.getItem("secondScore") : "no record")
            $('#thirdScore').html(localStorage.getItem("thirdScore") ? localStorage.getItem("thirdScore") : "no record")
        },
        
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
            $("#clickCnt").html(cardGame.event.clickCnt);
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
        },
        setClickCnt : function(clickCnt) {
            $("#clickCnt").html(cardGame.event.clickCnt);
        }
    }    

    cardGame.event = {

        clickCnt : 0,

        openedCard : 0,

        successCount : 0,

        openCard: function(num) {
            this.clickCnt++;
            cardGame.template.setClickCnt(this.clickCnt);
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
                    this.successCount++;

                    function sleep(ms) {
                        return new Promise(resolve => setTimeout(resolve, ms));
                      }
                      
                      async function process(clickCnt, successCount) {
                        await sleep(800);
                        console.log(successCount);
                        $('.opened').addClass('success');
                        $('.'+num).addClass('success');
                        $('.success').attr('style', "display:none;");
                        $('.success .front').removeClass('frontCard');
                        $('.success .behind').removeClass('behindCard');

                        if(successCount==40){        
                            let firstScoreVal = $('#firstScore').html();
                            let secondScoreVal = $('#secondScore').html();
                            let thirdScoreVal = $('#thirdScore').html();
                           console.log(firstScoreVal)
                           console.log(typeof firstScoreVal)
                            if(clickCnt < firstScoreVal || firstScoreVal =="no record"){
                                localStorage.setItem("firstScore", clickCnt);
                            
                            }else if(clickCnt < secondScoreVal || secondScoreVal =="no record"){
                                localStorage.setItem("secondScore", clickCnt);
                            
                            }else if(clickCnt < thirdScoreVal || thirdScoreVal =="no record"){
                                localStorage.setItem("thirdScore", clickCnt);
                            }else{
                                return false;
                            }
                            alert("Congratulations! The present for you is my heard🤣🤣")
                            location.reload();
                        }
                      }
                      process(this.clickCnt, this.successCount);

                    this.openedCard = 0;
                }else{
                    console.log("실패")
                    function sleep(ms) {
                        return new Promise(resolve => setTimeout(resolve, ms));
                        }
                      
                    async function process() {
                        await sleep(800);
                        $('#front'+num).attr('style', "display:none;");
                        $('#behind'+num).attr('style', "display:block;");
                        $('#front'+preNum).attr('style', "display:none;");
                        $('#behind'+preNum).attr('style', "display:block;");
                        $('.frontCard').removeClass('opened');
                        $('.behindCard').removeClass('opened');
                    }
                    process(this.clickCnt, this.successCount);
                    this.openedCard = 0;
                }
            }
            console.log("무조건탐")
            
        }
    };
}(window, document));
