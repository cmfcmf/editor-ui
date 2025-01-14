import * as THREE from 'three';

import React from 'react';
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader.cjs.js';
import { DRACOLoader } from 'three-stdlib/loaders/DRACOLoader.js';

import Sk from "skulpt";

const FlightCase = () => {

  const gltf = useLoader(GLTFLoader, `${process.env.PUBLIC_URL}/models/raspi-compressed.glb`, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( `${process.env.PUBLIC_URL}/three/examples/js/libs/draco/` );
    loader.setDRACOLoader( dracoLoader );
  })
  window.mod=gltf.scene

  function setPixel(ledIndex,r,g,b) {
    var x = ledIndex % 8;
    var y = Math.floor(ledIndex / 8);
    var newMaterial = new THREE.MeshStandardMaterial({color: `rgb(${r},${g},${b})`});
    var object = gltf.scene.getObjectByName(`circle${x}_${7-y}-1`);

    if(object != null){
      object.material = newMaterial;
    }
  }

  function setPixels(indexes, pix) {
    if(indexes == null){
      indexes = Array.from(Array(8*8).keys())
    }

    var i = 0;
    for (const ledIndex of indexes){
      setPixel(ledIndex, pix[i][0], pix[i][1], pix[i][2])
      i += 1;
    }
  }

  Sk.sense_hat_emit = function(event, data) {

    if (event && event === 'setpixel') {
      // change the led
      const ledIndex = data;
      const ledData  = Sk.sense_hat.pixels[ledIndex];

      // Convert LED-RGB to RGB565 // and then to RGB555
      Sk.sense_hat.pixels[ledIndex] = [
        ledData[0] & ~7,
        ledData[1] & ~3,
        ledData[2] & ~7
      ];

      setPixel(ledIndex, parseInt(ledData[0]*255), parseInt(ledData[1]*255), parseInt(ledData[2]*255));
    }
    else if (event && event === 'setpixels') {
      setPixels(data, Sk.sense_hat.pixels);
    }
  }

  return (
    <primitive object={gltf.scene} scale={4} />
  )
}

export default FlightCase
