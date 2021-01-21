const $left= document.querySelector('.left')
const $right= document.querySelector('.right')
const $control= document.querySelector('.control')
const player1Name=document.getElementById('name-player1')
const player2Name=document.getElementById('name-player2')
const player1Img=document.getElementById('img-player1')
const player2Img=document.getElementById('img-player2')
const health = document.querySelectorAll('.health')
import Pokemon from "./pokemon.js"
import random from "./random.js"
import {pokemons} from "./pokemons.js"

function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}
let player1, player2

let user1=arrayRandElement(pokemons)
let user2=arrayRandElement(pokemons)

player1= new Pokemon({
    ...user1,
    selectors:"player1",
})

player2= new Pokemon({
    ...user2,
    selectors:"player2",
})

console.log(player2)

function player1Attack(){
    player1.attacks.forEach(item => {
        console.log(item)
        const $button=document.createElement('button')
        $button.classList.add('button')
        $button.innerText=item.name
        function trigger(clicks = 1) {
            return function (count) {
                count=item.maxCount
                if(clicks<count){
                    console.log("Осталось ударов: ", count-(clicks++)+ "/"+count);
                }
                else{
                    $button.disabled=true;
                }
            }
        }

        const counter = trigger()
        $button.addEventListener('click', function() {
            counter()
            console.log('Kick');
            player1.changeHP(random(item.minDamage,item.maxDamage), function (count) {
                console.log('Some change after change HP', count)
                console.log(generateLog(player1, player2, count))
            });
            player2.changeHP(random(item.minDamage,item.maxDamage), function (count) {
                console.log('Some change after change HP', count)
                console.log(generateLog(player1, player2, count))
            });
            console.log(player1.hp.current)

            if(player2.hp.current<=0  ){
                const allButtons=document.querySelectorAll('.button')
                allButtons.forEach($item=>$item.remove())
                console.log(allButtons)
                console.log(user1)
                user2=arrayRandElement(pokemons)
                player2= new Pokemon({
                    ...user2,
                    selectors:"player2",
                })
                player1Attack()
                player2Attack()

                init()
            }
            if(player1.hp.current<=0){
                alert("Game over")
                const allButtons=document.querySelectorAll('.button')
                allButtons.forEach($item=>$item.remove())
                const $startGame=document.createElement('button')
                $startGame.classList.add('button')
                $startGame.innerText="Start Game"
                $control.appendChild($startGame)
                $startGame.addEventListener('click', function() {
                    user1=arrayRandElement(pokemons)
                    user2=arrayRandElement(pokemons)
                    player1= new Pokemon({
                        ...user1,
                        selectors:"player1",
                    })

                    player2= new Pokemon({
                        ...user2,
                        selectors:"player2",
                    })
                    player1Attack()
                    player2Attack()
                    init()
                    $startGame.remove()
                })
            }

        });
        $left.appendChild($button)
    });
}
player1Attack()

function player2Attack(){
    player2.attacks.forEach(item => {
        console.log(item)
        const $button=document.createElement('button')
        $button.classList.add('button')
        $button.innerText=item.name
        function trigger(clicks = 1) {
            return function (count) {
                count=item.maxCount
                if(clicks<count){
                    console.log("Осталось ударов: ", count-(clicks++)+ "/"+count);
                }
                else{
                    $button.disabled=true;
                }
            }
        }
        const counter = trigger();
        $button.addEventListener('click',()=>{
            console.log('click button',$button.innerText)
            counter()
        })

        $button.addEventListener('click', function() {
            console.log('Kick');
            player1.changeHP(random(item.minDamage,item.maxDamage), function (count) {
                console.log('Some change after change HP', count)
                console.log(generateLog(player1, player2, count))


            });
            player2.changeHP(random(item.minDamage,item.maxDamage), function (count) {
                console.log('Some change after change HP', count)
                console.log(generateLog(player1, player2, count))
            });
            if(player1.hp.current<=0 || player2.hp.current<=0 ){
                const allButtons=document.querySelectorAll('.button')
                allButtons.forEach($item=>$item.remove())
                console.log(allButtons)
            }
        });

        if(player1.hp.current<0 ||player2.hp.current<0){
            allButtons.forEach($item=>$item.remove())
        }

        $right.appendChild($button)
    });
}
player2Attack()
function generateLog(firstPerson, secondPerson, dmg){
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${dmg} : [${firstPerson.hp.current}/${firstPerson.hp.total}]`
    ];

    return logs[random(logs.length) - 1]
}

function init() {
    console.log('Start Game!');
    player1Name.innerText=user1.name
    player2Name.innerText=user2.name
    player1Img.src=user1.img
    player2Img.src=user2.img
    player1.renderHP();
    player2.renderHP();
}

init();
export default init