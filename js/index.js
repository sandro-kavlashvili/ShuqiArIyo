import * as THREE from './three.module.js';
import {OrbitControls} from "./Orbitcontrols.js";
//Orbit Controls Source Code: https://cdn.jsdelivr.net/npm/three@0.143.0/examples/jsm/controls/OrbitControls.js
//Three.module.js Source Code: https://cdn.jsdelivr.net/npm/three@0.143.0/build/three.module.js 
var points = 0;
//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(new THREE.Color("#000000"),1);//ეს რიცხვი აღნიშნავს ფერის ინტენსივობას, სადაც მაქსიმალური ინტენსივობა არის 1.ეს ფერი ცვლის background ფერს.
document.body.appendChild( renderer.domElement );
//=====================================
console.log(THREE.REVISION);//ეს ბრძანება წერს რომელ three js_ის ვერსიას იყენებთ. იმისათვის, რომ გამოვიყენოთ OrbitControls და three.module.js , საჭიროა,
//რომ ერთი და იმავე ვერსიის იყოს ორივეს სორს კოდი. ამ შემთხვევაში ჩემი OrbitControls, და thee js არის ორივე 143 ვერსიის, რომელთა source code-ის ლინკებიც არის ზემოთ მოცემული.


//scene
const scene = new THREE.Scene();
//====================================

//camera
let fov = 75;
let scale = window.innerWidth/window.innerHeight;
let nearLimit = 0.1;
let farLimit = 1000;
const camera = new THREE.PerspectiveCamera(fov,scale,nearLimit,farLimit);
    //controls
const OrbitController = new OrbitControls(camera,renderer.domElement);
OrbitController.enablePan = false;
OrbitController.rotateSpeed = 0;
camera.position.z = 11;//ნებისმიერ კამერის ცვლილების შემდეგ უნდა დააფდეითდეს OrbitController-იც.
camera.position.y = 2.5;
//orbit update
OrbitController.update();
//==============================

const ambientLight = new THREE.AmbientLight(0xffffff,0.7);
scene.add(ambientLight);

//lights
const PointLight = new THREE.PointLight(0xffffff,1);
PointLight.position.set(0,0,100);
scene.add(PointLight);




//enemys
const materialObject = {
    color: 0x049ef4,
    metalness: 0.0003,
    roughness: 0,
    emissive:0x000000,
    
}
const EnemySphereGeometry = new THREE.SphereGeometry(1,32,32);
const EnemySphereMaterial = new THREE.MeshStandardMaterial(materialObject);
//========
let Enemies = [];
let xCoordinate = -128;
for(let i = 0;i<9;i++){
    Enemies.push(new THREE.Mesh(EnemySphereGeometry,EnemySphereMaterial));
    Enemies[i].position.set(xCoordinate,0,-30);
    xCoordinate = xCoordinate + 32;
    scene.add(Enemies[i]);
}

//sphere
const radius = 90;
const widthSegments = 32;
const HeightSegments = 32;
const SphereGeometry = new THREE.SphereGeometry(radius,widthSegments,HeightSegments);
const SphereMaterial = new THREE.PointsMaterial({
    size: 0.3,
    color: 0xffffff,
});
const Sphere = new THREE.Points(SphereGeometry,SphereMaterial);
//Sphere.visible = false; //გაქრობა.
scene.add(Sphere);
//==================================

//Propeler
const PropelerGeometry = new THREE.BoxGeometry(13,0.3,0.7);
const Material1 = new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true});
const Propeler = new THREE.Mesh(PropelerGeometry,Material1);
//==

//CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
const HeadGeometry = new THREE.CylinderGeometry(1,1,0.5,30);
const Head = new THREE.Mesh(HeadGeometry,Material1);
//==

//Connector
const ConnectorGeometry = new THREE.CylinderGeometry(0.3,0.3,1,30);
const Connector = new THREE.Mesh(ConnectorGeometry,Material1);
Connector.position.y = -0.5;
//==

//Body
const HelicopterBodyGeometry = new THREE.CylinderGeometry(1,1,8,50);
const HelicopterBody = new THREE.Mesh(HelicopterBodyGeometry,Material1);
HelicopterBody.rotation.x = HelicopterBody.rotation.x + Math.PI/2;
HelicopterBody.position.set(0,-2,2);

//Helicopter Back Connector
const BackConnectorGeometry = new THREE.CylinderGeometry(0.1,0.1,0.5,30);
const BackConnector = new THREE.Mesh(BackConnectorGeometry,Material1);
BackConnector.rotation.z = BackConnector.rotation.z + Math.PI/2;
BackConnector.position.set(1.2,-2,5.5);

//MiniPropelerConnector
const MiniPropelerConnectorGeometry = new THREE.CylinderGeometry(0.5,0.5,0.2,30)
const MiniPropelerConnector = new THREE.Mesh(MiniPropelerConnectorGeometry,Material1);
MiniPropelerConnector.position.y = 10;
MiniPropelerConnector.rotation.z = MiniPropelerConnector.rotation.z + Math.PI/2;
MiniPropelerConnector.position.set(1.55,-2,5.5);

//MiniPropeler
const MiniPropelerGeometry = new THREE.BoxGeometry(3,0.1,0.3)
const MiniPropeler = new THREE.Mesh(MiniPropelerGeometry,Material1);
MiniPropeler.position.set(1.55,-2,5.5);
MiniPropeler.rotation.z = MiniPropeler.rotation.z + Math.PI/2; 

//Helicopter
let Parts = [MiniPropeler,MiniPropelerConnector,BackConnector,HelicopterBody,Connector,Head,Propeler,camera];
const Helicopter = new THREE.Object3D();
for(let i = 0;i<Parts.length;i++){
    Helicopter.add(Parts[i]);
}

scene.add(Helicopter);



let LookingVector = {
    x:0,
    y:0,
    z:-1,
}

//Event Listeners

let Keys = {
    87:{keypressed:false},//upwards arrow
    83:{keypressed:false},//DownWards arrow
    68:{keypressed:false},//d
    65:{keypressed:false},//a
}

document.addEventListener("keydown" , function(EvenetArgs1){
    if(EvenetArgs1.keyCode in Keys){
        Keys[EvenetArgs1.keyCode].keypressed = true;
    }
    
});

document.addEventListener("keyup" , function(EvenetArgs2){
    if(EvenetArgs2.keyCode in Keys){
        Keys[EvenetArgs2.keyCode].keypressed = false;
    }
})

document.addEventListener("wheel" , function(EventScrollArgs){
    console.log(EventScrollArgs);
})


function MoveForward(){
    let lengthOfLookingVector = Math.sqrt(LookingVector.x**2 + LookingVector.y**2 + LookingVector.z**2);
    let OneLengthedForwardVector = [LookingVector.x/lengthOfLookingVector,LookingVector.y/lengthOfLookingVector,LookingVector.z/lengthOfLookingVector];
    let MovingNumbers = [OneLengthedForwardVector[0]/7,OneLengthedForwardVector[1]/7,OneLengthedForwardVector[2]/7];
    Helicopter.position.x = Helicopter.position.x + MovingNumbers[0];
    Helicopter.position.y = Helicopter.position.y + MovingNumbers[1];
    Helicopter.position.z = Helicopter.position.z + MovingNumbers[2];
}

function MoveBackward(){
    let lengthOfLookingVector = Math.sqrt(LookingVector.x**2 + LookingVector.y**2 + LookingVector.z**2);
    let OneLengthedbackwardVector = [-1*LookingVector.x/lengthOfLookingVector,-1*LookingVector.y/lengthOfLookingVector,-1*LookingVector.z/lengthOfLookingVector];
    let MovingNumbers = [OneLengthedbackwardVector[0]/7,OneLengthedbackwardVector[1]/7,OneLengthedbackwardVector[2]/7];
    Helicopter.position.x = Helicopter.position.x + MovingNumbers[0];
    Helicopter.position.y = Helicopter.position.y + MovingNumbers[1];
    Helicopter.position.z = Helicopter.position.z + MovingNumbers[2];
}

function RotateRight(){
    Helicopter.rotation.y = Helicopter.rotation.y - Math.PI/180;
    LookingVector.z = -1*Math.sin(Helicopter.rotation.y + Math.PI/2);
    LookingVector.x = Math.cos(Helicopter.rotation.y + Math.PI/2);
}

function RotateLeft(){
    Helicopter.rotation.y = Helicopter.rotation.y + Math.PI/180;
    LookingVector.z = -1*Math.sin(Helicopter.rotation.y + Math.PI/2);
    LookingVector.x = Math.cos(Helicopter.rotation.y + Math.PI/2);
}

function DistanceFrom0ToHelicopter(){
    return Math.sqrt(Helicopter.position.x**2 + Helicopter.position.y**2 + Helicopter.position.z**2)
}

function CollisionDistance(enemy){
    let Distance = Math.sqrt(((enemy.position.x - Helicopter.position.x)**2 + (enemy.position.y - Helicopter.position.y)**2 + (enemy.position.z - Helicopter.position.z)**2));
    return Distance-8.5;
}

//==========================Coin
var SetCoin = true;
const CoinGeometry = new THREE.TorusGeometry(1,0.3,16,50);
const CoinMaterial = new THREE.PointsMaterial({color:0xffff00,size:0.05});
function CoinCollisionDistance(coin){
    let Distance = Math.sqrt(((coin.position.x - Helicopter.position.x)**2 + (coin.position.y - Helicopter.position.y)**2 + (coin.position.z - Helicopter.position.z)**2));
    return Distance-8.5;
}

let x = Math.random()*90;
let z = Math.random()*90;
var Coin = new THREE.Points(CoinGeometry,CoinMaterial);
Coin.position.set(x,0,z);
scene.add(Coin);
SetCoin = false;


function SetCoinFunction(){
    let Number = [-1,1];
    let Choise1;
    let Choise2;
    if(Math.random() < 0.5){
        Choise1 = -1;
    }else{
        Choise1 = 1;
    }
    if(Math.random() >= 0.5){
        Choise2 = -1;
    }else{
        Choise2 = 1;
    }
    if(SetCoin == true){
        let x = Choise1 * Math.random()*80;
        let z = Choise2 * Math.random()*80;
        Coin.position.set(x,0,z);
        SetCoin = false;
    }
    if(CoinCollisionDistance(Coin) <= 0){
        points = points + 1;
        document.getElementById("MyText").innerText = `Points: ${points}`;
        SetCoin = true;
    }
    requestAnimationFrame(SetCoinFunction);
}
setTimeout(SetCoinFunction(),0);
//============================



function CollisionDetection(){
    for(let i = 0;i<Enemies.length;i++){
        if(CollisionDistance(Enemies[i])<=0){
            window.location.reload();
        }
    }
    requestAnimationFrame(CollisionDetection);
}

setTimeout(CollisionDetection(),0);

function ControlKeys(){
    if(Keys[87].keypressed==true){
        MoveForward();
    }
    if(Keys[83].keypressed == true){
        MoveBackward();
    }
    if(Keys[68].keypressed == true){
        RotateRight();
    }
    if(Keys[65].keypressed == true){
        RotateLeft();
    }
    requestAnimationFrame(ControlKeys);
}

setTimeout(ControlKeys(),0);
//===================

function ChaseToHelicopter(){
    for(let i = 0;i<9;i++){
        let SpeedInverse = 15;
        let LengthFromEnemy = Math.sqrt((Helicopter.position.x - Enemies[i].position.x)**2 + (Helicopter.position.y - Enemies[i].position.y)**2 + (Helicopter.position.z - Enemies[i].position.z)**2)
        let MoveToVector = [((Helicopter.position.x - Enemies[i].position.x)/LengthFromEnemy)/SpeedInverse, ((Helicopter.position.y - Enemies[i].position.y)/LengthFromEnemy)/SpeedInverse, ((Helicopter.position.z - Enemies[i].position.z)/LengthFromEnemy)/SpeedInverse];
        Enemies[i].position.x = Enemies[i].position.x + MoveToVector[0];
        Enemies[i].position.y = Enemies[i].position.y + MoveToVector[1];
        Enemies[i].position.z = Enemies[i].position.z + MoveToVector[2];

    }
    requestAnimationFrame(ChaseToHelicopter);
}
setTimeout(ChaseToHelicopter(),0);





//automatic renders always
function renderFunction(){
    Coin.rotation.y = Coin.rotation.y + Math.PI/180;
    MiniPropeler.rotation.x = MiniPropeler.rotation.x + Math.PI/13;
    Propeler.rotation.y = Propeler.rotation.y + Math.PI/13;
    OrbitController.target = new THREE.Vector3(Helicopter.position.x,Helicopter.position.y,Helicopter.position.z);
    OrbitController.update();
    renderer.render(scene,camera);
    requestAnimationFrame(renderFunction);
}

setTimeout(renderFunction(),0);
//================================
