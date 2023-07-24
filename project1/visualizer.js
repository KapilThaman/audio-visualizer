const canvas = document.getElementById('mycanvas');
const microphone = new Microphone();
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;






class Ball{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radius = 8;
        this.color = 'red';
        this.jumpForce = 0;
        this.fallForce = 0.1;
        this.isFalling = true;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
    }

    fall(){
        this.jumpForce = 0;
        this.y += this.fallForce;
        this.fallForce += 0.1;
    }

    jump(){
        this.fallForce = 0;
        this.y -= this.jumpForce;
        this.jumpForce -= 0.05;
        if(this.y <= 0){
            this.isFalling = true;
        }
    }
}

let ball = [];


const generateBall = () => {
    const distance = 30;
    const amountOfBalls = (canvas.width / distance) - 2;
    for (let i = 0; i < amountOfBalls; i++) {
        ball.push(new Ball(distance + (distance * i),100));
        
    }
}
generateBall();






const animate = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(microphone.initialized){
    const samples = microphone.getSamples();
    
    ball.forEach((e,index) => {
        if(e.isFalling && e.y < canvas.height / 2){
            e.fall();
        }else if( e.y >= canvas.height / 2){
            e.isFalling = false;
            e.jumpForce = Math.abs(samples[index]) * 10 ;

        }
        if(e.isFalling == false){
            e.jump();
            if(e.jumpForce <= 0){
                e.isFalling = true;
                
            }
        }
        
        e.draw();
    });
    }
    requestAnimationFrame(animate);

}

animate();