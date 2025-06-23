// ==UserScript==
// @name         DMM Kantangame Wool Lite
// @namespace    https://www.youtube.com/watch?v=dQw4w9WgXcQ
// @version      beta-1.0.0
// @description  Always win DMM Kantangame game, score number is automatically generated and statistically reasonable 
// @author       Pandamon
// @match        https://pointclub.kantangame.com/easygame/game/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @run-at       document-idle

// ==/UserScript==

(function() {
    'use strict';

    // for debug
    // unsafeWindow.GM_getValue = GM_getValue;
    // unsafeWindow.GM_setValue = GM_setValue;
    // unsafeWindow.GM_deleteValue = GM_deleteValue;
    // unsafeWindow.GM_listValues = GM_listValues;
    // unsafeWindow.GM = GM;


    // game infomation dict example:
    // const gameInfoDictExample = {
    //     "0":{
    //         gameid:"0",
    //         scoreInfo:{
    //             type:"interval",
    //             scoreParam:{
    //                 winScore:10000,
    //                 loseScore:4000,
    //                 limitScore:12000,
    //                 singleTick:100
    //             }
    //         },
    //         operationSequence:[], // to be refined
    //         saveDataTemplate:{} // to be refined
    //     },
    //     "-1":{
    //         gameid:"-1",
    //         scoreInfo:{
    //             type:"pick",
    //             scoreParam:{
    //                 winList:[27,30],
    //                 loseList:[0]
    //             }
    //         },
    //         operationSequence:[], // to be refined
    //         saveDataTemplate:{} // to be refined
    //     },
    // }

    const gameInfoDict = {
        // need 30 games info
        // 1
        "50": {
            "gameid": "50",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 8000,
                    "loseScore": 2000,
                    "limitScore": 9600,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 2
        "53": {
            "gameid": "53",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 850,
                    "loseScore": 150,
                    "limitScore": 1020,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 3
        "63": {
            "gameid": "63",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 400000,
                    "loseScore": 10000,
                    "limitScore": 480000,
                    "singleTick": 20
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 4
        "65": {
            "gameid": "65",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 250000,
                    "loseScore": 25000,
                    "limitScore": 264000,
                    "singleTick": 100
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 5 
        "67": {
            "gameid": "67",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 100000,
                    "loseScore": 10000,
                    "limitScore": 110000,
                    "singleTick": 200
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 6
        "68": {
            "gameid": "68",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 750000,
                    "loseScore": 100000,
                    "limitScore": 825000,
                    "singleTick": 100
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 7
        "84": {
            "gameid": "84",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 250000,
                    "loseScore": 20000,
                    "limitScore": 275000,
                    "singleTick": 5
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 8 
        "86": {
            "gameid": "86",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 100000,
                    "loseScore": 15000,
                    "limitScore": 120000,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 9
        "121": {
            "gameid": "121",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 10000,
                    "loseScore": 1000,
                    "limitScore": 11000,
                    "singleTick": 50
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 10
        "120": {
            "gameid": "120",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 100000,
                    "loseScore": 5000,
                    "limitScore": 110000,
                    "singleTick": 500
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 11
        "117": {
            "gameid": "117",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 200000,
                    "loseScore": 20000,
                    "limitScore": 220000,
                    "singleTick": 10
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 12
        "83": {
            "gameid": "83",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 1000,
                    "loseScore": 30,
                    "limitScore": 1200,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 13
        "236": {
            "gameid": "236",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 60000,
                    "loseScore": 5000,
                    "limitScore": 72000,
                    "singleTick": 20
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 14
        "124": {
            "gameid": "124",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 50,
                    "loseScore": 10,
                    "limitScore": 60,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 15
        "335": {
            "gameid": "335",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 4500,
                    "loseScore": 300,
                    "limitScore": 4950,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 16
        "345": {
            "gameid": "345",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 4000,
                    "loseScore": 500,
                    "limitScore": 4400,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 17
        "355": {
            "gameid": "355",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 2000,
                    "loseScore": 400,
                    "limitScore": 2200,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 18
        "352": {
            "gameid": "352",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 200,
                    "loseScore": 50,
                    "limitScore": 230,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 19
        "393": {
            "gameid": "393",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 3500,
                    "loseScore": 300,
                    "limitScore": 4200,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 20
        "373": {
            "gameid": "373",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 450,
                    "loseScore": 25,
                    "limitScore": 540,
                    "singleTick": 5
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 21
        "296": {
            "gameid": "296",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 300,
                    "loseScore": 40,
                    "limitScore": 360,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 22
        "325": {
            "gameid": "325",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 12000,
                    "loseScore": 6000,
                    "limitScore": 14400,
                    "singleTick": 20
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 23
        "397": {
            "gameid": "397",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 40000,
                    "loseScore": 5000,
                    "limitScore": 48000,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 24
        "386": {
            "gameid": "386",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 5000,
                    "loseScore": 500,
                    "limitScore": 5500,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 25
        "392": {
            "gameid": "392",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 800,
                    "loseScore": 50,
                    "limitScore": 960,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 26
        "394": {
            "gameid": "394",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 1000,
                    "loseScore": 50,
                    "limitScore": 1100,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 27
        "404": {
            "gameid": "404",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 350,
                    "loseScore": 10,
                    "limitScore": 420,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 28
        "405": {
            "gameid": "405",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 200,
                    "loseScore": 20,
                    "limitScore": 240,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 29
        "375": {
            "gameid": "375",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 100,
                    "loseScore": 10,
                    "limitScore": 110,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 30
        "574": {
            "gameid": "574",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 9380,
                    "loseScore": 3200,
                    "limitScore": 11256,
                    "singleTick": 20
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 31
        "573":{
            gameid:"573",
            scoreInfo:{
                type:"pick",
                scoreParam:{
                    winList:[403],
                    loseList:[0]
                }
            },
            operationSequence:[], // to be refined
            saveDataTemplate:{} // to be refined
        },
        // 32
        "577":{
            gameid:"577",
            scoreInfo:{
                type:"pick",
                scoreParam:{
                    winList:[1140,1144,1148,1152,1156,1160,1164,1168,1172,1176,1180,1184,1188,1192,1196,1200],
                    loseList:[0,30]
                }
            },
            operationSequence:[], // to be refined
            saveDataTemplate:{} // to be refined
        },
        // 33
        "597": {
            "gameid": "597",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 10120,
                    "loseScore": 5690,
                    "limitScore": 11080,
                    "singleTick": 10
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 34
        "575": {
            "gameid": "575",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 39840,
                    "loseScore": 26450,
                    "limitScore": 47808,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 35
        "594":{
            gameid:"594",
            scoreInfo:{
                type:"pick",
                scoreParam:{
                    winList:[52800],
                    loseList:[8800,8700,8600,8500,8400,8300,8200,8100,8000,7900,7800,7700,7600,7500,7400,7300,7200,7100,7000,6900,6800,6700,6600,6500,6400,6300,6200,6100,6000]
                }
            },
            operationSequence:[], // to be refined
            saveDataTemplate:{} // to be refined
        },
        // 36
        "585": {
            "gameid": "585",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 4057980,
                    "loseScore": 497420,
                    "limitScore": 4869576,
                    "singleTick": 10
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 37
        "586":{
            gameid:"586",
            scoreInfo:{
                type:"pick",
                scoreParam:{
                    winList:[1500],
                    loseList:[0]
                }
            },
            operationSequence:[], // to be refined
            saveDataTemplate:{} // to be refined
        },
        // 38
        "587": {
            "gameid": "587",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 810580,
                    "loseScore": 50450,
                    "limitScore": 812542,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        },
        // 39
        "607": {
            "gameid": "607",
            "scoreInfo": {
                "type": "interval",
                "scoreParam": {
                    "winScore": 5470,
                    "loseScore": 200,
                    "limitScore": 6564,
                    "singleTick": 1
                }
            },
            "operationSequence": [],
            "saveDataTemplate": {}
        }
    };

    // some special game info, not in gameInfoDict
    const specialGameInfoDict = {
        "48":{
            gameid:"48",
            scoreInfo:{
                type:"pick",
                scoreParam:{
                    winList:[300],
                    loseList:[10,20,30,40]
                }
            },
            operationSequence:[], // to be refined
            saveDataTemplate:{} // to be refined
        },
        "52":{
            gameid:"48",
            scoreInfo:{
                type:"pick",
                scoreParam:{
                    winList:[27,30],
                    loseList:[0,1,2,3,4]
                }
            },
            operationSequence:[], // to be refined
            saveDataTemplate:{} // to be refined
        },
        "410":{
            gameid:"410",
            scoreInfo:{
                type:"interval",
                scoreParam:{
                    winScore:95,
                    loseScore:70,
                    limitScore:99,
                    singleTick:1
                }
            },
            operationSequence:[], // to be refined
            saveDataTemplate:{} // to be refined
        },
        "460":{
            gameid:"460",
            scoreInfo:{
                type:"pick",
                scoreParam:{
                    winList:[78],
                    loseList:[18,27,36,45,54]
                }
            },
            operationSequence:[], // to be refined
            saveDataTemplate:{} // to be refined
        }
    };


    // util functions

    let clearGMstorage = function(){
        let keylist = GM_listValues();
        for(let i = 0; i < keylist.length; i++){
            GM_deleteValue(keylist[i]);
        }
        return;
    }
    unsafeWindow.clearGMstorage = clearGMstorage;

    let extractNumber = function(string){
        return parseInt(string.match(/\d+/)[0]);
    }


    // this script functions

    let isLogin = function(){
        let logoutbtn = document.querySelector("div.c-logout__btn");
        if (logoutbtn) {
            return false;
        } else {
            return true;
        }
    }

    let getGameid = function(gameLink){
        // input string link, return string format id
        let gameURL = new URL(gameLink);
        return gameURL.pathname.match(/\d+$/)[0];
    }

    // makeGameInfo function
    let makeGameInfo = function(){
        // use in game page
        // output template: 
        //{"0":{
        //     gameid:"0",
        //     scoreInfo:{
        //         type:"interval",
        //         scoreParam:{
        //             winScore:10000,
        //             loseScore:4000,
        //             limitScore:12000,
        //             singleTick:100
        //         }
        //     },
        //     operationSequence: [], // to be refined
        //     saveDataTemplate:{} // to be refined
        // }
        let findUpperLimit = function(targetScore,rankmax){
            if(rankmax > 1.2*targetScore){
                // target score > 1.2 * max ranking score
                return Math.floor(1.2*targetScore);
            } else if(rankmax < targetScore) {
                // target score < max ranking score
                return Math.floor(1.1*targetScore);
            } else {
                // target score < max ranking score < 1.2 * target score
                return rankmax;
            }
        }
        let findFactor = function(rankingArray){
            let factorValueList = [500,250,200,100,50,25,20,10,5,2];     // not need 1, if all fail return 1
            let passCheckRatio = 0.8;
            for (let i = 0; i < factorValueList.length; i++) {
                let notZeroCount = 0;
                for (let j = 0; j < rankingArray.length; j++) {
                    if (rankingArray[j] % factorValueList[i]){
                        notZeroCount++;
                    }
                }
                if (notZeroCount <= rankingArray.length*(1-passCheckRatio)){
                    return factorValueList[i];
                }
            }
            return 1;
        }; 
        let extractRankingArray = function(rankingNodelist){
            let rankingArray = [...new Set(Array.from(rankingNodelist, node => parseInt(node.innerHTML)))];
            rankingArray = rankingArray.filter(item => !Number.isNaN(item));
            return rankingArray;
        }
        let gameInfo = {};
        let gameid = getGameid(unsafeWindow.location.href);
        let targetScoreNodeList = document.querySelectorAll("div.left_side_col > div.c-target-score > div.c-target-score__wrap > ul > li > div.c-target-score__score");
        let rankingNodeList = document.querySelectorAll("div.gb-ranking_list.pad12 > div.gb-ranking_list_content.plus-list-loader > ul > li > p:nth-child(3)");
        let winScore = parseInt(extractNumber(targetScoreNodeList[0].innerHTML));
        let loseScore = parseInt(extractNumber(targetScoreNodeList[3].innerHTML));
        let rankingArray = extractRankingArray(rankingNodeList);
        if(!targetScoreNodeList || rankingArray.length == 0){
            throw Error("Get game page error");
        } else {
            let rankingMax = Math.max(...rankingArray);
            let limitScore = findUpperLimit(winScore,rankingMax);
            let singleTick = findFactor(rankingArray);
            gameInfo[gameid] = {
                gameid:gameid,
                scoreInfo:{
                    type:"interval",
                    scoreParam:{
                        winScore:winScore,
                        loseScore:loseScore,
                        limitScore:limitScore,
                        singleTick:singleTick
                    }
                },
                operationSequence:[], // to be refined
                saveDataTemplate:{} // to be refined
            };
            return gameInfo;
        }
    }
    unsafeWindow.makeGameInfo = makeGameInfo; // for debug

    let getGameInfo = function(gameid){
        // check if gameid is in gameInfoDict or specialGameInfoDict
        // return gameInfoDict[gameid] or specialGameInfoDict[gameid] or null
        if(gameid in gameInfoDict){
            return gameInfoDict[gameid];
        } else if(gameid in specialGameInfoDict){
            return specialGameInfoDict[gameid];
        } else{
            // if gameid not in gameInfoDict or GM storage, return null
            return GM_getValue("gameInfo"+gameid,null);
        }
    }

    let saveGameInfo = function(gameid,gameInfo){
        // save gameInfo to GM storage
        GM_setValue("gameInfo"+gameid,gameInfo);
        return;
    }

    let makeRandomScore = function(scoreInfo,outcome){
        // generate random score based on scoreParam
        // outcome: "win" or "lose"
        let randomValueFromInterval = function(lowerBound,upperBound,singleTick){
            if(singleTick == 1){
                return lowerBound + Math.floor((upperBound - lowerBound) * Math.random());
            } else {
                let minMultiplier = Math.ceil(lowerBound / singleTick);
                let maxMultiplier = Math.ceil(upperBound / singleTick);
                let multiplier = minMultiplier + Math.floor((maxMultiplier - minMultiplier) * Math.random());
                return multiplier * singleTick;
            }
        }
        let pickFromList = function(list){
            let index = Math.floor(list.length * Math.random());
            return list[index];
        }
        if(scoreInfo.type == "interval"){
            // interval
            if(outcome == "win"){
                // win
                return randomValueFromInterval(scoreInfo.scoreParam.winScore,scoreInfo.scoreParam.limitScore,scoreInfo.scoreParam.singleTick);
            } else if(outcome == "lose"){
                // lose
                return randomValueFromInterval(0,scoreInfo.scoreParam.loseScore,scoreInfo.scoreParam.singleTick);
            }
        } else if(scoreInfo.type == "pick"){
            // pick
            if(outcome == "win"){
                // win
                return pickFromList(scoreInfo.scoreParam.winList);
            } else if(outcome == "lose"){
                // lose
                return pickFromList(scoreInfo.scoreParam.loseList);
            }
        } else {
            // error
            throw Error("generate score error")
        }
    }

    let hookPlusSendScore = function(gameid,outcome){
        // hook Plus.sendScore function to send a random win game score
        console.log("Plus.sendScore hooked for gameid: " + gameid);
        let _sendScore = unsafeWindow.Plus.sendScore;
        let gameInfo = getGameInfo(gameid);
        if(gameInfo == null){
            gameInfo = makeGameInfo()[gameid];
            saveGameInfo(gameid,gameInfo);
        }
        unsafeWindow.Plus.sendScore = function(score){
            score = makeRandomScore(gameInfo.scoreInfo,outcome);
            return _sendScore(score);
        }
    }

    // main func

    let main = async function(){
        console.log("game page main func");
        let currentGameid = getGameid(unsafeWindow.location.href);

        // let removeGameAd = function(){
        //     let gameAd = document.querySelector("#mainContainer");
        //     if (gameAd){
        //         gameAd.remove();
        //     }
        //     return;
        // }
        // removeGameAd();

        hookPlusSendScore(currentGameid,"win");
        return;
    }
    
    // const mediaid = "141"; // DMM
    let gamePagePathRE = /\/easygame\/game\/[0-9]+$/gi;
    let currentURL = new URL(window.location.href);

    if (currentURL.hostname == "pointclub.kantangame.com") {
        if (gamePagePathRE.test(currentURL.pathname)) {
            console.log("this is game page");
            if (isLogin()){
                console.log("game page login")
                main();
            } else {
                console.log("game page not login")
            }
        }
    }
})();