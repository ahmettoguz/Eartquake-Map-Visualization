let startDateIndex=null,endDateIndex=null,erData=null,timer=null,speed=1,timerDivisor=null,gifDisappearTimeS=1500,gifDisappearTimeM=2e3,gifDisappearTimeB=4500,animationRun=!1,activeGifCount=0,maxGifCount=235,intervalIndex=null,intervalCount=0,magnitudeOfShownEqk=[],outputDatas={rawData:null,totalData:{erCount:null,cityCount:null},cityData:null};var currentDate=null;let map,url="https://tmp.karakok.net/earthquake/data?startDate=1990-01-01&endDate=2024-01-01&minMag=0&maxMag=0";function initMap(){map=new google.maps.Map(document.getElementById("map"),{center:{lat:38.9637,lng:35.2433},zoom:6.5,cancelable:!1,zoomControl:!0,mapTypeControl:!1,scaleControl:!1,streetViewControl:!1,rotateControl:!1,fullscreenControl:!0}),map.setOptions({styles:mapStyle})}function insertChBxInput(){let t="";for(let a=0;a<8;a++)t+=`\n      <div class="box flex">\n        <div class="label flex">${a}-${a+1}</div>\n        <input type="checkbox" checked/>\n      </div>\n      `;t+='\n      <div class="box flex">\n        <div class="label flex">8-10</div>\n        <input type="checkbox" checked/>\n      </div>\n      ',$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.magSelectContainer.flex > div").html(t)}function insertMapMagScale(){let t='\n  <div class="erMagScale flex">\n    <div class="header flex">Deprem Büyüklük Ölçeği</div>\n    <div class="magnitudes flex">';for(let a=0;a<8;a++)t+=`\n      <div class="magnitude flex">\n        <div class="label flex">${a}-${a+1}:</div>\n        <div class="icon"></div>\n      </div>`;t+='\n      <div class="magnitude flex">\n        <div class="label flex">8-10:</div>\n        <div class="icon"></div>\n      </div>',t+="\n    </div>\n  </div>\n  ",$("#mainContainer > div.mapContainer").append(t)}function arrangeData(t){return t.map((function(t){return delete t.id,t})),t}function displayMarkersOnMap(){let t=0;intervalIndex=startDateIndex,intervalCount++;for(let a=startDateIndex;a<=endDateIndex;a++){let e=intervalCount;setTimeout((()=>{if(animationRun&&e==intervalCount){if(intervalIndex++,magnitudeOfShownEqk.includes(Math.floor(erData[a].magnitude))){deleteMarker(displayMarker(a))}a==endDateIndex&&finishAnimationByTime()}}),1e3*t*60),a<endDateIndex?t+=getTimeDiffAsMinute(erData[a].date,erData[a+1].date)/timerDivisor*timer/speed:t=timer/speed}}function displayMarker(t){let a=null;return erData[t].magnitude<=1?a="./assets/img/newMarker/10x10.png":erData[t].magnitude<=2?a="./assets/img/newMarker/15x15.png":erData[t].magnitude<=3?a="./assets/img/newMarker/20x20.png":erData[t].magnitude<=4?a="./assets/img/newMarker/25x25.png":erData[t].magnitude<=5?a="./assets/img/newMarker/30x30.png":erData[t].magnitude<=6?a="./assets/img/newMarker/40x40.png":erData[t].magnitude<=7?a="./assets/img/newMarker/45x45.png":erData[t].magnitude<=8?a="./assets/img/newMarker/50x50.png":erData[t].magnitude<=10?a="./assets/img/newMarker/55x55.png":alert("Error: Eartquake mag is over 10"),activeGifCount++,{marker:new google.maps.Marker({position:{lat:erData[t].latitude,lng:erData[t].longitude},icon:a,map:map}),magnitude:erData[t].magnitude}}function deleteMarker(t){if(activeGifCount>=maxGifCount&&t.magnitude<5)t.marker.setMap(null),activeGifCount--;else{let a=null;t.magnitude<=3?a=gifDisappearTimeS:t.magnitude<=6?a=gifDisappearTimeM:t.magnitude<=10&&(a=gifDisappearTimeB),setTimeout((()=>{t.marker.setMap(null),activeGifCount--}),a)}}function getTimeDiffAsMinute(t,a){t=new Date(t);let e=(a=new Date(a))-t;return e/=6e4,e}function playMap(){let t=[];getMagOfShownEqk(),0==magnitudeOfShownEqk.length&&t.push("no eartquake mag specified"),"---"==$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.timerContainer.flex > div.minuteContainer.flex > div").html()&&t.push("cannot calculate minute"),0==t.length?(animationRun=!0,$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.buttonContainer.flex > button.displayButton").prop("disabled",!0),$("#mainContainer > div.menuContainer.flex > div > div > div.back.face > div > div.buttonContainer.flex > button.terminateButton").prop("disabled",!1),$(".menuContainer > .cardContainer > .card").addClass("rotateCard"),$(".progressContainer > .bar").css("animation-duration",`${timer/speed*6e4+gifDisappearTimeM}ms`),$(".progressContainer > .bar").removeClass("progressLoading"),setTimeout((()=>{$(".progressContainer > .bar").addClass("progressLoading")}),10),sendDataToOutputScreen(timer/speed*60),displayMarkersOnMap()):(t.includes("cannot calculate minute")&&($(".dateContainer").removeClass("error"),setTimeout((()=>{$(".dateContainer").addClass("error")}),10)),t.includes("no eartquake mag specified")&&($("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer  > div.magSelectContainer.flex").removeClass("error"),setTimeout((()=>{$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.magSelectContainer.flex").addClass("error")}),10)))}function getMagOfShownEqk(){magnitudeOfShownEqk=[];for(let t=0;t<8;t++)$(`#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.magSelectContainer.flex > div > div:nth-child(${t+1}) > input[type=checkbox]`).prop("checked")&&magnitudeOfShownEqk.push(t);$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer  > div.magSelectContainer.flex > div > div:nth-child(9) > input[type=checkbox]").prop("checked")&&(magnitudeOfShownEqk.push(8),magnitudeOfShownEqk.push(9))}function displayMinute(){null!=startDateIndex&&null!=endDateIndex&&endDateIndex>=startDateIndex?(timer=Math.round((endDateIndex-startDateIndex)/4e3),0==timer&&(timer=1),timerDivisor=getTimeDiffAsMinute(erData[startDateIndex].date,erData[endDateIndex].date),$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.timerContainer.flex > div.minuteContainer.flex > div").html(formatTime(timer/speed))):$("#mainContainer >.menuContainer > .cardContainer > .card > .face > .inputContainer > div.timerContainer.flex > div.minuteContainer.flex > div").html("---")}function inputStartDate(){let t=$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.dateContainer.flex > div.startDateContainer.flex > input").val();t=new Date(t),t=new Date(`${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`),startDateIndex=getStartDateIndex(t),null!=startDateIndex?displayMinute():($("#mainContainer >.menuContainer > .cardContainer > .card > .face > .inputContainer > div.timerContainer.flex > div.minuteContainer.flex > div").html("---"),$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.dateContainer.flex > div.startDateContainer.flex").removeClass("error"),setTimeout((()=>{$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.dateContainer.flex > div.startDateContainer.flex").addClass("error")}),10))}function inputEndDate(){let t=$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.dateContainer.flex > div.endDateContainer.flex > input").val();t=new Date(t),t=new Date(`${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()+1}`),endDateIndex=getEndDateIndex(t),null!=endDateIndex?displayMinute():($("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.timerContainer.flex > div.minuteContainer.flex > div").html("---"),$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer> div.dateContainer.flex > div.endDateContainer.flex").removeClass("error"),setTimeout((()=>{$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.dateContainer.flex > div.endDateContainer.flex").addClass("error")}),10))}function inputSpeed(){speed=$("#mainContainer >.menuContainer > .cardContainer > .card > .face > .inputContainer > div.timerContainer.flex > div.speedContainer.flex > select").val(),displayMinute()}function getStartDateIndex(t){let a=null,e=erData.length;for(let n=0;n<e;n++)if(a=new Date(erData[n].date),a>=t)return n}function getEndDateIndex(t){let a=null;for(let e=erData.length-1;e>=0;e--)if(a=new Date(erData[e].date),a<=t)return e}function formatTime(t){let a="",e=60*t,n=Math.floor(e/3600);return t=Math.floor(e/60%60),e=Math.round(e-3600*n-60*t),0!=n?(a+=`${n} Saat`,0!=t&&(a+=` ${t} Dakika`)):(0!=t&&(a+=`${t} Dakika`),0!=e&&(a+=` ${e} Saniye`)),a.trim()}function terminateAnimation(){animationRun=!1,$(".progressContainer > .bar").animate({opacity:0},gifDisappearTimeM,(function(){$(".progressContainer > .bar").css({width:"0%",opacity:1}),$(".progressContainer > .bar").removeClass("progressLoading")})),setTimeout((()=>{$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.buttonContainer.flex > button.displayButton").prop("disabled",!1)}),gifDisappearTimeM),$("#mainContainer > div.menuContainer.flex > div > div > div.back.face > div > div.buttonContainer.flex > button.terminateButton").prop("disabled",!0),$(".menuContainer > .cardContainer > .card").removeClass("rotateCard"),resetTimer()}function finishAnimationByTime(){intervalIndex-1==endDateIndex&&(animationRun=!1,setTimeout((()=>{$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.buttonContainer.flex > button.displayButton").prop("disabled",!1),$("#mainContainer > div.menuContainer.flex > div > div > div.back.face > div > div.buttonContainer.flex > button.terminateButton").prop("disabled",!0),$(".menuContainer > .cardContainer > .card").removeClass("rotateCard")}),gifDisappearTimeM),resetTimer())}function sendDataToOutputScreen(t){getDatasForOut(),setOutputDatas();let a=$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.dateContainer.flex > div.startDateContainer.flex > input").val(),e=$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.dateContainer.flex > div.endDateContainer.flex > input").val();a=new Date(a),e=new Date(e),startCalender(a,(e-a)/864e5+1,t)}function startCalender(t,a,e){clockMod=a,clockMod=24*clockMod*60*60,clockMod=.5*clockMod/e,(currentDate=new Date(t)).setDate(currentDate.getDate()-1),currentDate.setHours(23,59-clockMod/60,0),displayCalender(currentDate)}function resetTimer(){clockObject.stop()}function getDatasForOut(){outputDatas={rawData:[],totalData:{erCount:null,cityCount:null},cityData:[]};let t=0,a=null;for(let e=startDateIndex;e<=endDateIndex;e++)magnitudeOfShownEqk.includes(Math.floor(erData[e].magnitude))&&erData[e].title.includes("(")&&!erData[e].title.includes("[")&&(a=erData[e].title.split("(")[1].replace(")",""),allCityNames.includes(a)&&(outputDatas.rawData.hasOwnProperty(a)||(outputDatas.rawData[a]=[]),outputDatas.rawData[a].push(erData[e]),t++));outputDatas.totalData.erCount=t,outputDatas.totalData.cityCount=Object.keys(outputDatas.rawData).length;for(const t in outputDatas.rawData){let a=outputDatas.rawData[t];outputDatas.cityData[t]=[],outputDatas.cityData[t].count=a.length}for(const t in outputDatas.rawData){let a=0;for(let e=1;e<outputDatas.rawData[t].length;e++)outputDatas.rawData[t][a].magnitude<=outputDatas.rawData[t][e].magnitude&&(a=e);outputDatas.cityData[t].maxMagIndex=a}}function setOutputDatas(){$(".menuContainer > .cardContainer > .card > .back > .outputContainer > .totalDataContainer > div > .box:nth-of-type(1) > .data").html(outputDatas.totalData.erCount),$(".menuContainer > .cardContainer > .card > .back > .outputContainer > .totalDataContainer > div > .box:nth-of-type(2) > .data").html(outputDatas.totalData.cityCount);let t='<div class="swiper"><div class="swiper-wrapper">',a=[];for(let e=0;e<Object.keys(outputDatas.cityData).length;e++){let e,n=0,i="";for(e in outputDatas.cityData)a.includes(e)||outputDatas.rawData[e][[outputDatas.cityData[e].maxMagIndex]].magnitude>n&&(i=e,n=outputDatas.rawData[e][[outputDatas.cityData[e].maxMagIndex]].magnitude);a.push(i),t+=`\n                      <div class="swiper-slide">\n                        <div class="cityTitle flex">${i}</div>\n                        <div class="flex">\n                          <div class="box flex">\n                            <div class="title flex">Deprem Sayısı</div>\n                            <div class="data flex">${outputDatas.cityData[i].count}</div>\n                          </div>\n                          <div class="box flex">\n                            <div class="title flex">En şiddetli</div>\n                            <div class="data flex">${outputDatas.rawData[i][outputDatas.cityData[i].maxMagIndex].magnitude}</div>\n                          </div>\n                          <div class="box flex">\n                            <div class="title flex">Derinlik</div>\n                            <div class="data flex">${outputDatas.rawData[i][outputDatas.cityData[i].maxMagIndex].depth.toFixed(1)} km</div>\n                          </div>\n                          <div class="box flex">\n                            <div class="title flex">Tarih</div>\n                            <div class="data flex">${formatDateForOutput(outputDatas.rawData[i][outputDatas.cityData[i].maxMagIndex].date)}</div>\n                          </div>\n                        </div>\n                      </div>\n          `}t+="</div></div>",$(".menuContainer > .cardContainer > .card > .back > .outputContainer > .cityDataContainer").html(t),runSwiper()}function formatDateForOutput(t){let a=t.substring(0,4),e=t.substring(5,7);return`${t.substring(8,10)}/${e}/${a}`}window.initMap=initMap,$((function(){$.ajax({type:"GET",url:url,success:function(t){t.isSuccessful&&(erData=arrangeData(t.result),$(".layoutContainer").css("display","none"),inputEndDate())},error:function(){alert("API Hatası.")}}),insertChBxInput(),insertMapMagScale();let t=new Date;$("#mainContainer > .menuContainer > .cardContainer > .card > .face > .inputContainer > div.dateContainer.flex > div.endDateContainer.flex > input").val(`${t.getFullYear()}-${("0"+(t.getMonth()+1)).slice(-2)}-${("0"+t.getDate()).slice(-2)}`)}));