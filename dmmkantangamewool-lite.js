// ==UserScript==
// @name         DMM Kantangame Wool Lite
// @namespace    https://www.youtube.com/watch?v=dQw4w9WgXcQ
// @version      beta-1.1.0
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
// @downloadURL  https://raw.githubusercontent.com/pandamon/DMMKantangameWool/refs/heads/main/dmmkantangamewool-lite.js
// @updateURL    https://raw.githubusercontent.com/pandamon/DMMKantangameWool/refs/heads/main/dmmkantangamewool-lite.js

// ==/UserScript==

(function() {
    'use strict';

    // for debug
    // unsafeWindow.GM_getValue = GM_getValue;
    // unsafeWindow.GM_setValue = GM_setValue;
    // unsafeWindow.GM_deleteValue = GM_deleteValue;
    // unsafeWindow.GM_listValues = GM_listValues;
    // unsafeWindow.GM = GM;


    // some special game info, not in gameInfoDict
    const typePickGameInfoDict = {
        // 37
        "586": {
            gameid: "586",
            scoreInfo: {
                type: "pick",
                scoreParam: {
                    winList: [1500],
                    loseList: [0]
                }
            }
        },
        // 31
        "573": {
            gameid: "573",
            scoreInfo: {
                type: "pick",
                scoreParam: {
                    winList: [410],
                    loseList: [0]
                }
            }
        },
        "48": {
            gameid: "48",
            scoreInfo: {
                type: "pick",
                scoreParam: {
                    winList: [300],
                    loseList: [10, 20, 30, 40]
                }
            }
        },
        "52": {
            gameid: "52",
            scoreInfo: {
                type: "pick",
                scoreParam: {
                    winList: [27, 30],
                    loseList: [0, 1, 2, 3, 4]
                }
            }
        },
        // "410": {
        //     gameid: "410",
        //     scoreInfo: {
        //         type: "interval",
        //         scoreParam: {
        //             winScore: 95,
        //             loseScore: 70,
        //             limitScore: 99,
        //             singleTick: 1
        //         }
        //     }
        // },
        "460": {
            gameid: "460",
            scoreInfo: {
                type: "pick",
                scoreParam: {
                    winList: [78],
                    loseList: [18, 27, 36, 45, 54]
                }
            }
        }
    }


    // util functions

    let clearGMstorage = function(){
        let keylist = GM_listValues();
        for(let i = 0; i < keylist.length; i++){
            GM_deleteValue(keylist[i]);
        }
        return;
    }
    unsafeWindow.clearGMstorage = clearGMstorage;

    let extractNumber = function (string) {
        return parseInt(string.replace(/[^0-9]/g, ""));
    }

    // this script functions

    let isLogin = function () {
        let loginHallmark = document.querySelector("div.c-n-game-ranking-sec");
        if (loginHallmark) {
            return true;
        } else {
            return false;
        }
    }

    let getGameid = function(gameLink){
        // input string link, return string format id
        let gameURL = new URL(gameLink);
        return gameURL.pathname.match(/\d+$/)[0];
    }

    // makeGameInfo function
    let makeGameInfo = function () {
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
        // }
        let findUpperLimit = function (targetScore, rankmax) {
            if (rankmax > 1.2 * targetScore) {
                // target score > 1.2 * max ranking score
                return Math.floor(1.2 * targetScore);
            } else if (rankmax <= targetScore) {
                // target score < max ranking score
                return targetScore;
            } else {
                // target score < max ranking score < 1.2 * target score
                return rankmax;
            }
        }
        let findFactor = function (rankingArray) {
            let factorValueList = [500, 250, 200, 100, 50, 25, 20, 10, 5, 2];     // not need 1, if all fail return 1
            let passCheckRatio = 0.8;
            for (let i = 0; i < factorValueList.length; i++) {
                let notZeroCount = 0;
                for (let j = 0; j < rankingArray.length; j++) {
                    if (rankingArray[j] % factorValueList[i]) {
                        notZeroCount++;
                    }
                }
                if (notZeroCount <= rankingArray.length * (1 - passCheckRatio)) {
                    return factorValueList[i];
                }
            }
            return 1;
        };
        let extractRankingArray = function (rankingNodelist) {
            let rankingArray = [...new Set(Array.from(rankingNodelist, node => extractNumber(node.textContent)))];
            rankingArray = rankingArray.filter(item => !Number.isNaN(item));
            return rankingArray;
        }
        let gameInfo = {};
        let gameid = getGameid(unsafeWindow.location.href);
        let targetScoreNodeList = document.querySelectorAll("div.c-n-game-sec__body > ul.c-n-game-goal-score > li.c-n-game-goal-score__score > div");
        if (!targetScoreNodeList) {
            throw Error("Get game page error");
        }
        let rankingNodeList = document.querySelectorAll("div.c-n-game-ranking-sec > div.c-n-game-ranking > ul.c-n-game-ranking__l-list > li.c-n-game-ranking__list > span.c-n-game-ranking__score");
        let winScore = extractNumber(targetScoreNodeList[0].textContent);
        let loseScore = extractNumber(targetScoreNodeList[3].textContent);
        let rankingMax = 0;
        let singleTick = 0;
        let rankingArray = [];
        if (rankingNodeList.length > 0) {
            rankingArray = extractRankingArray(rankingNodeList);
            rankingMax = Math.max(...rankingArray);
            singleTick = findFactor(rankingArray);
        } else {
            rankingMax = winScore;
            singleTick = 1;
        }
        // if (gameid in gameInfoDict){
        //     singleTick = gameInfoDict[gameid].scoreInfo.scoreParam.singleTick;
        // }
        let limitScore = findUpperLimit(winScore, rankingMax);
        gameInfo[gameid] = {
            gameid: gameid,
            scoreInfo: {
                type: "interval",
                scoreParam: {
                    winScore: winScore,
                    loseScore: loseScore,
                    limitScore: limitScore,
                    singleTick: singleTick
                }
            }
        };
        return gameInfo;
    }
    unsafeWindow.makeGameInfo = makeGameInfo; // for debug

    let makeRandomScore = function (scoreInfo, outcome) {
        // generate random score based on scoreParam
        // outcome: "win" or "lose"
        let randomValueFromInterval = function (lowerBound, upperBound, singleTick) {
            if (lowerBound == upperBound) {
                return lowerBound;
            }
            if (singleTick == 1) {
                return lowerBound + Math.floor((upperBound - lowerBound) * Math.random());
            } else {
                let minMultiplier = Math.ceil(lowerBound / singleTick);
                let maxMultiplier = Math.ceil(upperBound / singleTick);
                let multiplier = minMultiplier + Math.floor((maxMultiplier - minMultiplier) * Math.random());
                return multiplier * singleTick;
            }
        }
        let pickFromList = function (list) {
            let index = Math.floor(list.length * Math.random());
            return list[index];
        }
        if (scoreInfo.type == "interval") {
            // interval
            if (outcome == "win") {
                // win
                return randomValueFromInterval(scoreInfo.scoreParam.winScore, scoreInfo.scoreParam.limitScore, scoreInfo.scoreParam.singleTick);
            } else if (outcome == "lose") {
                // lose
                return randomValueFromInterval(0, scoreInfo.scoreParam.loseScore, scoreInfo.scoreParam.singleTick);
            }
        } else if (scoreInfo.type == "pick") {
            // pick
            if (outcome == "win") {
                // win
                return pickFromList(scoreInfo.scoreParam.winList);
            } else if (outcome == "lose") {
                // lose
                return pickFromList(scoreInfo.scoreParam.loseList);
            }
        } else {
            // error
            throw Error("generate score error")
        }
    }

    let hookEasygameGetReward = function(){
        const _getReward = unsafeWindow.easygame.getReward;
        unsafeWindow.easygame.getReward = function(){
            console.log('I dont watch Ads but get Ads reward');
            return _getReward.apply(this, [true, false]);
        }
    }


    // contributed by tvone
    let hookAjaxFinishScore = function (gameid, outcome) {
        const originalAjax = $.ajax;

        $.ajax = function (...args) {
            const options = args[0] || {};
            const requestUrl = options.url || "";
            if (
                requestUrl.includes("/finish.json") &&
                options.data &&
                typeof options.data.score !== "undefined"
            ) {
                let gameInfo;
                if (gameid in typePickGameInfoDict) {
                    gameInfo = typePickGameInfoDict[gameid];
                } else {
                    gameInfo = makeGameInfo()[gameid];
                }
                const score = makeRandomScore(gameInfo.scoreInfo, outcome);
                // console.log("New Score", score);
                options.data.score = score;
                const shaObj = new jsSHA("SHA-1", "TEXT");
                const hashString =
                    options.data.user_id +
                    options.data.media_id +
                    options.data.game_id +
                    options.data.score +
                    options.data.key;
                shaObj.update(hashString);
                options.data.hash = shaObj.getHash("HEX");
            }

            return originalAjax.apply(this, args);
        };
    }


    // main func

    let main = async function(){
        console.log("game page main func");
        let currentGameid = getGameid(unsafeWindow.location.href);
        hookAjaxFinishScore(currentGameid, "win");
        hookEasygameGetReward();
        return;
    }
    
    // const mediaid = "141"; // DMM
    let gamePagePathRE = /\/easygame\/game\/[0-9]+$/gi;
    let currentURL = new URL(window.location.href);

    if (currentURL.hostname == "pointclub.kantangame.com") {
        if (gamePagePathRE.test(currentURL.pathname)) {
            if (isLogin()){
                console.log("this is game page");
                main();
            }
        }
    }
})();