
class Selectors{
  constructor(name){
    this.elHP= document.getElementById(`health-${name}`),
    this.img= document.getElementById(`img-${name}`),
    this.elProgressbar= document.getElementById(`progressbar-${name}`)
    this.health = document.querySelector(`.health-${name}`)
  }
}
class Pokemon extends Selectors{
   constructor({name, hp, type, selectors, attacks}){
     super(selectors)
    this.name=name
    this.hp={
      current:hp,
      total:hp,
    }
    this.type= type;
    this.attacks=attacks;

    this.renderHP()
  };

changeHP=(count, cb)=>{
    this.hp.current -= count;
    if(this.hp.current<0){
      
      this.hp.current = 0;
      //alert('Бедный ' + this.name + ' проиграл бой');
     // $btn.disabled = true;
      
    } 
    this.renderHP()
    cb &&cb(count)
}

  renderHP=()=>{
    this.renderHPLife();
    this.renderProgressbarHP();
  }
  renderHPLife=()=>{
    const{elHP, hp:{current, total}}=this
    elHP.innerText=current+ '/'+ total
    //this.elHP.innerText = this.damageHP + '/' + this.defaultHP;
}
renderProgressbarHP=()=>{
  
  const{elProgressbar, hp:{current,total}}=this
  let playerHP=current/total*100
  elProgressbar.style.width = current/total*100 + '%';
  if(playerHP<60 && playerHP>20){
    this.health.classList.add('low')
  }
  else if(playerHP<20){
    this.health.classList.add('critical')
  }
 else{
  this.health.classList.remove('critical', 'low')
 }
}
}

export default Pokemon 