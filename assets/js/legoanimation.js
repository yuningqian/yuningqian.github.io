var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight/3, 0.1, 4600 );
    camera.position.z = 4000;

var renderer = new THREE.WebGLRenderer({antialias: true,alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight*3 );

    renderer.setClearAlpha(0);


var element = document.getElementById('3dbackground');
    element.appendChild(renderer.domElement);

window.addEventListener( 'resize', onWindowResize, false );

//var controls = new THREE.OrbitControls(camera, renderer.domElement);




// 创建一个空的组 将cube和cylinder结合 结合成lego
var lego = new THREE.Object3D()
    //添加立方体 cube
    var cubeGeo = new THREE.BoxGeometry( 208, 256, 208,40,49.5,40);
    var cubeMat = new THREE.MeshBasicMaterial( { color: ("#ffffff"),transparent: true,opacity: 0.6,} );
    var smoothcube = cubeGeo.clone();
    var modifier = new THREE.SubdivisionModifier(1);
    modifier.modify(smoothcube);
    smoothcube.computeVertexNormals();
    var cube = new THREE.Mesh( smoothcube, cubeMat );
    
    let cubeEdges = new THREE.EdgesGeometry(cubeGeo, 0.01);
    let edgesMtl =  new THREE.LineBasicMaterial({color: ("#000000"),depthTest:true,transparent: true,});
    let cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl);
    cube.add(cubeLine);
    lego.add(cube); // 立方体添加到lego类中

    //添加圆柱凸起 cylinder
    var cylindereGeo = new THREE.CylinderGeometry(64, 64, 45,16,0)
    var cylinderMat = new THREE.MeshBasicMaterial( { color: ("#ffffff"),transparent: true,opacity: 0.6,} );
    var cylinder = new THREE.Mesh( cylindereGeo, cylinderMat );
    let cylinderEdges = new THREE.EdgesGeometry(cylindereGeo , 0.5);
    let cylinderLine = new THREE.LineSegments(cylinderEdges, edgesMtl);
    cylinder.add(cylinderLine);
    lego.add(cylinder); // 圆柱体添加到lego类中
        cylinder.position.y = 151;
        //cylinder.position.z = 104;

scene.add(lego); // 场景中添加lego
    lego.position.set(400, 750, 0);
    lego.rotation.set(0.3, 0.3, 0.18);


/*//添加平面图片1 plane1
var planeGeometry1 = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight);
    planeGeometry1.translate(0, 759, -200); // 平面几何体位置
var planeTexture1 = new THREE.TextureLoader().load('./assets/bg-home.png');
var planeMaterial1 = new THREE.MeshBasicMaterial({map: planeTexture1});
var plane1 = new THREE.Mesh(planeGeometry1, planeMaterial1);
scene.add(plane1);

//添加平面图片2 plane2
var planeGeometry2 = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight);
    planeGeometry2.translate(0, 5, -200); // 平面几何体位置
var planeTexture2 = new THREE.TextureLoader().load('./assets/bg-aboutme1.png');
var planeMaterial2 = new THREE.MeshBasicMaterial({map: planeTexture2});
var plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
scene.add(plane2);

//添加平面图片3 plane3
var planeGeometry3 = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight);
    planeGeometry3.translate(0, -749, -200); // 平面几何体位置
var planeTexture3 = new THREE.TextureLoader().load('./assets/bg-aboutme2.png');
var planeMaterial3 = new THREE.MeshBasicMaterial({map: planeTexture3});
var plane3 = new THREE.Mesh(planeGeometry3, planeMaterial3);
scene.add(plane3);*/


// 动画，页面滚动时，legocube移动
var animatetoposition1 = function () {
    requestAnimationFrame(animatetoposition1);
    if(lego.position.y < 750){
        lego.position.y += 20;
        lego.rotation.set(0.3, 0.3, 0.18);}
}
var animatetoposition2 = function () {
    requestAnimationFrame(animatetoposition2);
    if(lego.position.y > 0){
        lego.position.y -= 20;}
    if(lego.position.y < 0){
        lego.position.y += 20;}
}
var animatetoposition3 = function () {
    requestAnimationFrame(animatetoposition3);
    if(lego.position.y > -750){
        lego.position.y -= 20;
        lego.rotation.set(-0.16, -0.08, 0);
        //camera.position.y = -500;
    }
}

$(window).scroll(function () {
    //window.requestAnimationFrame(scrollHandler);
    if ($(window).scrollTop() == 0) {
        console.log("滚到顶了");
        lego.position.y=750;
        animate();
    }
    else if ($(window).scrollTop() < 300) {
        console.log("滚动到屏幕1");
        animatetoposition1();;
    }
    else if ($(window).scrollTop() < 1000) {
        console.log("滚动到屏幕2");
        animatetoposition2();
        cancel();
    }
    else if ($(window).scrollTop() >1000) {
        console.log("滚动到屏幕3");
        animatetoposition3();
        
    }
    })

// 旋转动画
var globalID;
var animate = function () {
    globalID = requestAnimationFrame(animate);
    //requestAnimationFrame(animate);
    ////lego.rotation.x += 0.005;
    lego.rotation.y += 0.002;

    //update();
}
// 取消旋转动画
var cancel = function () { 
    cancelAnimationFrame(globalID); 
    //finalCoords(); 
} 


function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

animate();


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight/3;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight*3 );
    render();
}