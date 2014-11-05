var example = (function (){
	"use strict";

	var scene = new THREE.Scene();
	//renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer : new THREE.CanvasRenderer(),
	var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer : new THREE.CanvasRenderer();
	var light = new THREE.AmbientLight(0xffffff);
	var camera;
	var box;

	function initScene() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById("webgl-container").appendChild(renderer.domElement);

		scene.add(light);

		camera = new THREE.PerspectiveCamera(
		35, //FOV
		window.innerWidth / window.innerHeight, //Aspect Ratio
		1, //Near plane
		1000); //Far plane

		camera.position.z = 100;
		scene.add(camera);

		var material = new THREE.MeshBasicMaterial({color: 0x007799, wireframe: true});

		box = new THREE.Mesh(
			//new THREE.BoxGeometry(20, 20, 20),
			new THREE.SphereGeometry(15, 20, 20),
			material
			
			);

		box.Name = "box";
		scene.add(box);

		render();
	}

	function render() {
		box.rotation.y += 0.01;
		box.rotation.x += 0.02;
		box.rotation.z += 0.03;
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	window.onload = initScene;

	return {
		scene: scene
	}
})();