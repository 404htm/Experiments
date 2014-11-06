var example = (function (){
	"use strict";

	var scene = new THREE.Scene();
	//renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer : new THREE.CanvasRenderer(),
	var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer : new THREE.CanvasRenderer();
	var light = new THREE.DirectionalLight(0xcccccc);
	var ambient = new THREE.AmbientLight(0x333333, 2);
	var hemi = new THREE.HemisphereLight(0x0033cc, 0x000000, .3);
	var point = new THREE.PointLight(0x0000ff, 1, 100);
	var dir = new THREE.DirectionalLight();
	var camera;
	var sphere, sphere2, sphere3, dod;
	var box;
	var pivot;
	var manualGeo;

	function initScene() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		renderer.shadowMapType = THREE.PCFSoftShadowMap;

		document.getElementById("webgl-container").appendChild(renderer.domElement);

		point.castShadow = true;
		dir.castShadow = true;

		scene.add(dir);
		scene.add(ambient);
		scene.add(point);
		scene.add(hemi);

		camera = new THREE.PerspectiveCamera(
		35, //FOV
		window.innerWidth / window.innerHeight, //Aspect Ratio
		1, //Near plane
		1000); //Far plane

		camera.position.z = 100;
		dir.position.z = 100;
		dir.position.y = 20;
		dir.position.x = 20;
		scene.add(camera);

		var material = new THREE.MeshBasicMaterial({ color: 0x005599, wireframe: true });

		var phong = new THREE.MeshPhongMaterial({
			color: 0x3333ff,
			ambient: 0xcc0000,
			specular: 0x33aa33,
			shininess: 30,
			side: THREE.DoubleSide
		});

		var lambert = new THREE.MeshLambertMaterial({
			color: 0x000000,
			
			reflectivity: 5
		});

		var texture = new THREE.MeshLambertMaterial({
			map: THREE.ImageUtils.loadTexture('../../content/textures/seamlesstexture14_500.jpg')
		});

		var texture2 = new THREE.MeshLambertMaterial({
			map: THREE.ImageUtils.loadTexture('../../content/textures/seamlesstexture12_500.jpg'),
			reflectivity: 40
		});

		var texture3 = new THREE.MeshPhongMaterial({
			map: THREE.ImageUtils.loadTexture('../../content/textures/seamlesstexture25_500.jpg'),
			reflectivity: 40
		});

		var trans = new THREE.MeshLambertMaterial({
			transparent: true,
			opacity: .3,
			color: 0xcc0000
		})

		sphere = new THREE.Mesh(
			//new THREE.BoxGeometry(20, 20, 20),
			new THREE.SphereGeometry(10, 40, 40),
			texture3
			
			);

		sphere.castShadow = true;
		sphere.receiveShadow = true;

		pivot = new THREE.Object3D();

		sphere2 = new THREE.Mesh(
			new THREE.SphereGeometry(8, 30, 30),
			texture2
		);

		sphere2.castShadow = true;

		sphere3 = new THREE.Mesh(
			new THREE.SphereGeometry(4, 30, 30),
			trans
		);



		sphere.add(sphere3);
		sphere3.position.x = -25;
		sphere3.position.y = 2;
		sphere3.castShadow = true;
		//pivot.add(sphere2);

		dod =
			new THREE.Mesh(
			new THREE.DodecahedronGeometry(3.5, 0),
			phong);

		sphere3.add(dod);

		scene.add(sphere);
		sphere.add(sphere2);
		sphere2.position.x = 60;

		//scene.add(sphere2);


		//sphere2.applyMatrix(new THREE.Matrix4().makeTranslation(25, 0, 0));

		box = new THREE.Mesh(
			new THREE.BoxGeometry(2,2,2),
			texture
		)

		box.castShadow = true;
		box.position.x = 15;
		//box.position.x = 20;
		//scene.add(box);
		sphere2.add(box);

		var tri = new THREE.Geometry();
		tri.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
		tri.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
		tri.vertices.push(new THREE.Vector3(1, -1, 0));

		tri.faces.push(new THREE.Face3(0, 1, 2));
		tri.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
		tri.faces[0].vertexColors[1] = new THREE.Color(0x00FF00);
		tri.faces[0].vertexColors[2] = new THREE.Color(0x0000FF);

		var mat2 = new THREE.MeshBasicMaterial({
			vertexColors: THREE.VertexColors,
			side: THREE.DoubleSide
		})

		//var extset = { steps = 15, amount= 40, bevelEnabled = false}

		manualGeo = new THREE.Mesh(tri, mat2);
		manualGeo.scale.set(3,3,3);
		manualGeo.position.x = 20;
		
		//scene.add(manualGeo);

		box.Name = "box";
		

		render();
	}

	function render() {
		box.rotation.x += 0.01;
		//,box.position.z += .01;
		//box.position.y += .01;

		manualGeo.rotation.x += 0.001;
		manualGeo.rotation.y += -0.01;

		sphere.rotation.y += .01;
		sphere2.rotation.y += .02;
		sphere2.rotation.x += .001;
		dod.rotation.x += .01;

		//point.position.z += .03;

		manualGeo.position.z += .05;
		manualGeo.position.y += .01;
		//manualGeo.scale.x += .01;
	
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	window.onload = initScene;

	return {
		scene: scene
	}
})();