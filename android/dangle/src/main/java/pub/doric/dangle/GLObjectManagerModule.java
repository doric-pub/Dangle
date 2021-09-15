package pub.doric.dangle;

import android.util.SparseArray;

public class GLObjectManagerModule {
  private SparseArray<GLObject> mGLObjects = new SparseArray<>();
  private SparseArray<GLContext> mGLContextMap = new SparseArray<>();

  public GLContext getContextWithId(int exglCtxId) {
    return mGLContextMap.get(exglCtxId);
  }

  public void saveContext(final GLContext glContext) {
    mGLContextMap.put(glContext.getContextId(), glContext);
  }

  public void deleteContextWithId(final int exglCtxId) {
    mGLContextMap.delete(exglCtxId);
  }

}
