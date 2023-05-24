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
            let shuffle = (array) => {
                array.sort(() => Math.random() - 0.5);
            }
            shuffle(array);

            Array.prototype.division = function (n) {
                let arr = this;
                let len = arr.length;
                let cnt = Math.floor(len / n);
                let tmp = [];
        
                for (let i = 0; i <= cnt; i++) {
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
            let sleep = (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms));
              } 
            //클릭막기 풀기
            let clickOk = async () => {
                await sleep(800);  
                $('body').removeClass('click-stop');  
            }

            this.clickCnt++;
            cardGame.template.setClickCnt(this.clickCnt);
            $('#behind'+num).attr('style', "display:none;");
            $('#front'+num).attr('style', "display:block;");
            $('.'+num).addClass('opened');
            
            if(this.openedCard == 0){
                this.openedCard = num;
                console.log("첫카드");
            }else {
                $('body').addClass('click-stop'); //3번째 카드 클릭을 막음
                let preNum = this.openedCard;
                if(num == this.openedCard + 40 || num == this.openedCard - 40){
                    this.successCount++;
                    console.log("짝 성공");
                    //짝 성공했을때
                    let succeseeProcess = async(clickCnt, successCount) => {
                        await sleep(800);
                        $('.opened').addClass('success');
                        $('.'+num).addClass('success');
                        $('.success .front').removeClass('frontCard');
                        $('.success .behind').removeClass('behindCard');
                        
                        //모두성공
                        if(successCount==40){        
                            let firstScoreVal = $('#firstScore').html();
                            let secondScoreVal = $('#secondScore').html();
                            let thirdScoreVal = $('#thirdScore').html();

                            if(clickCnt < firstScoreVal || firstScoreVal =="no record"){
                                localStorage.setItem("firstScore", clickCnt);
                            
                            }else if(clickCnt < secondScoreVal || secondScoreVal =="no record"){
                                localStorage.setItem("secondScore", clickCnt);
                            
                            }else if(clickCnt < thirdScoreVal || thirdScoreVal =="no record"){
                                localStorage.setItem("thirdScore", clickCnt);
                            }else{
                                return false;
                            }
                            alert("Congratulations! The present for you is my heart🤣🤣")
                            location.reload();
                        }
                    }
                    succeseeProcess(this.clickCnt, this.successCount);
                    this.openedCard = 0;
                    clickOk();
                }else{
                    console.log("짝실패")
                    //짝 실패했을때
                    let failProcess = async () => {
                        await sleep(800);
                        $('#front'+num).attr('style', "display:none;");
                        $('#behind'+num).attr('style', "display:block;");
                        $('#front'+preNum).attr('style', "display:none;");
                        $('#behind'+preNum).attr('style', "display:block;");
                        $('.frontCard').removeClass('opened');
                        $('.behindCard').removeClass('opened');
                    }
                    failProcess(this.clickCnt, this.successCount);
                    this.openedCard = 0;
                    clickOk();
                }
            }
        }
    };
}(window, document));
