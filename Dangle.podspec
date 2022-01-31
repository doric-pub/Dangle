Pod::Spec.new do |s|
    s.name             = 'Dangle'
    s.version          = '0.0.9'
    s.summary          = 'Doric Almost Native Graphics Layer Engine'
  
    s.description      = <<-DESC
    Doric extension library for almost native graphics layer engine
                            DESC

    s.homepage         = 'https://github.com/doric-pub/Dangle'
    s.license          = { :type => 'Apache-2.0', :file => 'LICENSE' }
    s.author           = { 'dev' => 'dev@doric.pub' }
    s.source           = { :git => 'https://github.com/doric-pub/Dangle.git', :tag => s.version.to_s }
    s.frameworks = 'OpenGLES'

    s.compiler_flags = '-x objective-c++ -std=c++1z -fno-aligned-allocation'
  
    s.ios.deployment_target = '10.0'
  
    s.source_files = 'iOS/Classes/**/*'
    #s.default_subspec = 'Extension'

    s.subspec 'jsi' do |mm|
        mm.source_files = 'common/jsi/jsi.h', 'common/jsi/jsi.cpp', 'common/jsi/instrumentation.h', 'common/jsi/jsi-inl.h', 'common/jsi/jsilib.h'
        mm.header_mappings_dir = 'common'
        mm.xcconfig = { 'ALWAYS_SEARCH_USER_PATHS' => 'NO' }
    end

    s.subspec 'Engine' do |mm|
        mm.source_files = 'common/dangle/**/*'
        mm.dependency 'Dangle/jsi'
        mm.header_dir = 'Engine'
    end

    s.subspec 'Extension' do |mm|
        mm.source_files = 'iOS/Dangle/**/*'
        mm.dependency 'Dangle/Engine'
        mm.header_dir = 'Extension'
    end
    
    s.resource     =  "dist/**/*"
    s.public_header_files = 'iOS/Classes/**/*.h'
    s.dependency 'DoricCore'
end
