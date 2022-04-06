var DracoDecoderModule;
class DracoDecoder {
  private static instance;

  module;
  private initializingPromise;

  constructor(dracoLib) {
    if (!DracoDecoder.instance && dracoLib === undefined) {
      if (DracoDecoderModule === undefined) {
        console.error(
          "Failed to initalize DracoDecoder: draco library undefined"
        );
        return;
      } else {
        dracoLib = DracoDecoderModule;
      }
    }
    if (!DracoDecoder.instance) {
      DracoDecoder.instance = this;
      this.module = null;

      this.initializingPromise = new Promise((resolve) => {
        let dracoDecoderType = {};
        dracoDecoderType["onModuleLoaded"] = (dracoDecoderModule) => {
          this.module = dracoDecoderModule;
          resolve(null);
        };
        dracoLib(dracoDecoderType);
      });
    }
    return DracoDecoder.instance;
  }

  async ready() {
    await this.initializingPromise;
    Object.freeze(DracoDecoder.instance);
  }
}

export { DracoDecoder };
