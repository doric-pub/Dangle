import { gltfAccessor } from "./accessor";
import { gltfBuffer } from "./buffer";
import { gltfBufferView } from "./buffer_view";
import { gltfCamera } from "./camera";
import { gltfImage } from "./image";
import { gltfLight } from "./light";
import { ImageBasedLight } from "./image_based_light";
import { gltfMaterial } from "./material";
import { gltfMesh } from "./mesh";
import { gltfNode } from "./node";
import { gltfSampler } from "./sampler";
import { gltfScene } from "./scene";
import { gltfTexture } from "./texture";
import { initGlForMembers, objectsFromJsons, objectFromJson } from "./utils";
import { gltfAsset } from "./asset";
import { GltfObject } from "./gltf_object";
import { gltfAnimation } from "./animation";
import { gltfSkin } from "./skin";
import { gltfVariant } from "./variant";

class glTF extends GltfObject {
  private asset;
  private accessors: any[];
  private nodes: any[];
  private scene;
  private scenes: any[];
  private cameras: any[];
  private lights: any[];
  private imageBasedLights: any[];
  textures: any[];
  images: any[];
  samplers: any[];
  private meshes: any[];
  private buffers: any[];
  private bufferViews: any[];
  private materials: any[];
  private animations: any[];
  private skins: any[];
  private path;
  private variants;
  diffuseEnvMap;
  lut;
  specularEnvMap;
  sheenEnvMap;
  sheenLUT;
  sheenELUT;
  mipCount;

  constructor(file) {
    super();
    this.asset = undefined;
    this.accessors = [];
    this.nodes = [];
    this.scene = undefined; // the default scene to show.
    this.scenes = [];
    this.cameras = [];
    this.lights = [];
    this.imageBasedLights = [];
    this.textures = [];
    this.images = [];
    this.samplers = [];
    this.meshes = [];
    this.buffers = [];
    this.bufferViews = [];
    this.materials = [];
    this.animations = [];
    this.skins = [];
    this.path = file;
  }

  initGl(webGlContext) {
    initGlForMembers(this, this, webGlContext);
  }

  fromJson(json) {
    super.fromJson(json);

    this.asset = objectFromJson(json.asset, gltfAsset);
    this.cameras = objectsFromJsons(json.cameras, gltfCamera);
    this.accessors = objectsFromJsons(json.accessors, gltfAccessor);
    this.meshes = objectsFromJsons(json.meshes, gltfMesh);
    this.samplers = objectsFromJsons(json.samplers, gltfSampler);
    this.materials = objectsFromJsons(json.materials, gltfMaterial);
    this.buffers = objectsFromJsons(json.buffers, gltfBuffer);
    this.bufferViews = objectsFromJsons(json.bufferViews, gltfBufferView);
    this.scenes = objectsFromJsons(json.scenes, gltfScene);
    this.textures = objectsFromJsons(json.textures, gltfTexture);
    this.nodes = objectsFromJsons(json.nodes, gltfNode);
    this.lights = objectsFromJsons(
      getJsonLightsFromExtensions(json.extensions),
      gltfLight
    );
    this.imageBasedLights = objectsFromJsons(
      getJsonIBLsFromExtensions(json.extensions),
      ImageBasedLight
    );
    this.images = objectsFromJsons(json.images, gltfImage);
    this.animations = objectsFromJsons(json.animations, gltfAnimation);
    this.skins = objectsFromJsons(json.skins, gltfSkin);
    this.variants = objectsFromJsons(
      getJsonVariantsFromExtension(json.extensions),
      gltfVariant
    );
    this.variants = enforceVariantsUniqueness(this.variants);

    this.materials.push(gltfMaterial.createDefault());
    this.samplers.push(gltfSampler.createDefault());

    if (json.scenes !== undefined) {
      if (json.scene === undefined && json.scenes.length > 0) {
        this.scene = 0;
      } else {
        this.scene = json.scene;
      }
    }

    this.computeDisjointAnimations();
  }

  // Computes indices of animations which are disjoint and can be played simultaneously.
  computeDisjointAnimations() {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i].disjointAnimations = [];

      for (let k = 0; k < this.animations.length; k++) {
        if (i == k) {
          continue;
        }

        let isDisjoint = true;

        for (const iChannel of this.animations[i].channels) {
          for (const kChannel of this.animations[k].channels) {
            if (
              iChannel.target.node === kChannel.target.node &&
              iChannel.target.path === kChannel.target.path
            ) {
              isDisjoint = false;
              break;
            }
          }
        }

        if (isDisjoint) {
          this.animations[i].disjointAnimations.push(k);
        }
      }
    }
  }

  nonDisjointAnimations(animationIndices) {
    const animations = this.animations;
    const nonDisjointAnimations: any[] = [];

    for (let i = 0; i < animations.length; i++) {
      let isDisjoint = true;
      for (const k of animationIndices) {
        if (i == k) {
          continue;
        }

        if (!animations[k].disjointAnimations.includes(i)) {
          isDisjoint = false;
        }
      }

      if (!isDisjoint) {
        nonDisjointAnimations.push(i);
      }
    }

    return nonDisjointAnimations;
  }
}

function getJsonLightsFromExtensions(extensions) {
  if (extensions === undefined) {
    return [];
  }
  if (extensions.KHR_lights_punctual === undefined) {
    return [];
  }
  return extensions.KHR_lights_punctual.lights;
}

function getJsonIBLsFromExtensions(extensions) {
  if (extensions === undefined) {
    return [];
  }
  if (extensions.KHR_lights_image_based === undefined) {
    return [];
  }
  return extensions.KHR_lights_image_based.imageBasedLights;
}

function getJsonVariantsFromExtension(extensions) {
  if (extensions === undefined) {
    return [];
  }
  if (extensions.KHR_materials_variants === undefined) {
    return [];
  }
  return extensions.KHR_materials_variants.variants;
}

function enforceVariantsUniqueness(variants) {
  for (let i = 0; i < variants.length; i++) {
    const name = variants[i].name;
    for (let j = i + 1; j < variants.length; j++) {
      if (variants[j].name == name) {
        variants[j].name += "0"; // Add random character to duplicates
      }
    }
  }

  return variants;
}

export {
  glTF,
  gltfAccessor,
  gltfBuffer,
  gltfCamera,
  gltfImage,
  gltfLight,
  gltfMaterial,
  gltfMesh,
  gltfNode,
  gltfSampler,
  gltfScene,
  gltfTexture,
  gltfAsset,
  GltfObject,
  gltfAnimation,
  gltfSkin,
  gltfVariant,
};
