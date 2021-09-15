package pub.doric.dangle;

import static pub.doric.dangle.EXGL.*;

public class GLObject {
  protected int exglCtxId;
  protected int exglObjId;

  GLObject(int exglCtxId) {
    // Generic
    this.exglCtxId = exglCtxId;
    this.exglObjId = EXGLContextCreateObject(exglCtxId);
  }

  int getEXGLObjId() {
    return exglObjId;
  }

  void destroy() {
    EXGLContextDestroyObject(exglCtxId, exglObjId);
  }
}
