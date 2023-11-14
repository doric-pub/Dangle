Pod::Spec.new do |s|
    s.name             = 'Dangle'
    s.version          = '0.1.17'
    s.summary          = 'Doric Almost Native Graphics Layer Engine'
  
    s.description      = <<-DESC
    Doric extension library for almost native graphics layer engine
                            DESC

    s.homepage         = 'https://github.com/doric-pub/Dangle'
    s.license          = { :type => 'Apache-2.0', :file => 'LICENSE' }
    s.author           = { 'dev' => 'dev@doric.pub' }
    s.source           = { :git => 'https://github.com/doric-pub/Dangle.git', :tag => s.version.to_s }
    
    s.frameworks = 'OpenGLES','JavaScriptCore'
    s.compiler_flags = '-x objective-c++ -std=c++1z -fno-aligned-allocation'
    s.library = 'c++'
    s.xcconfig = {
           'CLANG_CXX_LANGUAGE_STANDARD' => 'c++11',
           'CLANG_CXX_LIBRARY' => 'libc++'
    }
    s.ios.deployment_target = '10.0'
  
    s.source_files = 'iOS/Classes/**/*','common/dangle/**/*','iOS/Dangle/**/*','common/jsi/jsi.h', 'common/jsi/jsi.cpp', 'common/jsi/instrumentation.h', 'common/jsi/jsi-inl.h', 'common/jsi/jsilib.h'
    #s.default_subspec = 'Extension'
    
    s.resource     =  "dist/**/*"
    # s.public_header_files = 'iOS/Classes/**/*.h','iOS/Dangle/**/*.h'
    s.public_header_files = 'iOS/Classes/**/*.h','common/dangle/**/*.h','iOS/Dangle/**/*.h','common/jsi/jsi.h','common/jsi/instrumentation.h', 'common/jsi/jsi-inl.h', 'common/jsi/jsilib.h'
    s.dependency 'DoricCore'
    
end
