const redBall=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33];
const buleBall  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
const ruler = [{
        money:0, //没中奖
        won:false,
    },
    {
        money:5, //蓝球中 红球三个以下    5
        won:false,
        ruler:[{  
            red:0,          
            bulue:true
        },{
            red:1,
            bulue:true
        },{
            red:2,
            bulue:true
        }]
    
    },{
        money:10, //蓝球中  ，红球==3 || 红球 ==4    10
        won:false,
        ruler:[{
            red:3,
            bulue:true
        },{
            red:4,
            bulue:false
        }]
   
    },{
        //bulue ==true ，red==4 || red ==5    200
        money:200,
        won:false,
        ruler:[{
            red:4,
            bulue:true
        },{
            red:5,
            bulue:false
        }]
    },{
        //bulue ==true ，red==6     3000
        money:3000,
        won:false,
        ruler:[{
            red:5,
            bulue:true
        }]
    },{
    //red==6    20W 30%
    money:200000,
        won:false,
        ruler:[{
            red:6,
            bulue:false
        }]
    },{
        //bulue == true red == 6   500W  
        money:5000000,
        won:true,
        ruler:[{
            red:6,
            bulue:true
        }] 
    }]
/**
 * 洗牌算法
 * @param {*} oldarr  数组
 */
 function shuffle(oldarr){
     let arr = JSON.parse(JSON.stringify(oldarr))  ;
    let m = arr.length;
    while(m > 1){
        let index = parseInt(Math.random() * m--);
        [arr[index],arr[m]] = [arr[m],arr[index]];
    }
    return arr;
 }
 var caipold = function(){
    var obj ={}
    var redArr =shuffle(redBall).slice(0,6)
    obj.redBall = redArr.sort((a,b)=>{return a-b});
    obj.buleBall = [6]
    return obj
}
/**
 * 生产一注彩票号码
 */
 var caip = function(){
     var obj ={}
     var redArr =shuffle(redBall).slice(0,6)
     obj.redBall = redArr.sort((a,b)=>{return a-b});
     obj.buleBall = shuffle(buleBall).slice(0,1)
     return obj
 }
 /**
  * 机选多注彩票
  * @param {*} index 数量
  */
 var getCaips =function(index){    //一期机选彩票
     let arr = []
     for(var i=0;i<index;i++){
         arr.push(caip())
     }
     return arr
 }
 /**
  * 开奖结果
  */
 var getResult =function(){
    return caip()
 }
/**
 * 校验多注彩票
 * @param {*} arr 彩票数组
 * @param {*} result 彩票结果
 */
 var checkCaips = function(arr,result){
     var check={
        totalMoney:0,
        won:false
     }
     arr.forEach((item)=>{
         let itemCheck = checkOneCaip(item,result);
         check.totalMoney = check.totalMoney+ itemCheck.money
         check.won = check.won|| itemCheck.won
         if(check.won){
             console.log(arr,result)
         }
     })
     return check
 }
 /**
  * 校验一注彩票中奖结果
  * @param {*} item 彩票对象
  * @param {*} caipresult  开奖结果
  */
 var checkOneCaip = function(item,caipresult){
     let arr = getArrEqual(item.redBall,caipresult.redBall);
     let bulueRight = getArrEqual(item.buleBall,caipresult.buleBall).length>0;
    
     let result=ruler[0]
     switch(arr.length){
         case 0:
         case 1:
         case 2:
             if(bulueRight){
                 result = ruler[1]
             }
             break;
         case 3:
            if(bulueRight){
                result = ruler[2]
            }else{
                result = ruler[1]
            }
            break;
         case 4:
            if(bulueRight){
                result = ruler[3]
            }else{
                result = ruler[2]
            }
            break;
         case 5:
            if(bulueRight){
                result = ruler[4]
            }else{
                result = ruler[3]
            }
            break;
         case 6:
            if(bulueRight){
                result = ruler[6]
            }else{
                result = ruler[5]
            }
            break;
     }
     return result

 }
 /**
  * 数组重复个数算法
  * @param {*} arr1 
  * @param {*} arr2 
  */
 function getArrEqual(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if(arr1[j] === arr2[i]){
                newArr.push(arr1[j]);
            }
        }
    }
    return newArr;
 }
 /**
  * 日期计算方法
  * @param {*} AddDayCount 日期差值
  */
 function GetDateStr(AddDayCount) {   
     var dd = new Date();  
     dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期  
     var y = dd.getFullYear();   
     var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0  
     var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0  
     return y+"年"+m+"月"+d+'日';   
 }  

 let init= function(){
    var check={
        userMoney:0,
        totalMoney:0,
        won:false,
        time:0
     }
     var str = '元'
     while (!check.won){
        let arr = [ { redBall: [ 2, 8, 9, 16, 20, 31 ], buleBall: [ 9 ] },
        { redBall: [ 4, 8, 11, 12, 28, 29 ], buleBall: [ 8 ] },
        { redBall: [ 8, 12, 15, 17, 19, 24 ], buleBall: [ 13 ] },
        { redBall: [ 1, 4, 18, 21, 27, 30 ], buleBall: [ 15 ] },
        { redBall: [ 1, 6, 15, 19, 23, 28 ], buleBall: [ 10 ] } ]
        let result = getResult()
        let checkresult = checkCaips(arr,result)
        check.won = check.won || checkresult.won;
        check.totalMoney = check.totalMoney+checkresult.totalMoney;
        check.time += 1
        check.userMoney = check.userMoney + 10
        if(check.time%10==0){
            console.log('经过'+check.time+'期,花费'+check.userMoney+str+',累计奖金'+check.totalMoney)
        }
     }
     str = '元中一等奖'
     let days = check.time/3*7
     GetDateStr(days)
     console.log('经过'+check.time+'期,到'+GetDateStr(days)+'花费'+check.userMoney+str+',累计奖金'+check.totalMoney)
    
 }
 init() 
// console.log(checkOneCaip({ redBall: [ 7, 12, 14, 15, 31 ], buleBall: [ 4 ]},{ redBall: [ 7, 12, 14, 15, 31 ], buleBall: [ 4 ]}))
// console.log(getCaips(5))

 
