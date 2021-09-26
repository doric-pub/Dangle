Pod::Spec.new do |s|
    s.name             = 'Dangle'
    s.version          = '0.1.0'
    s.summary          = 'Doric extension library'
  
    #s.description      = <<-DESC
    #                         DESC

    s.homepage         = 'http://xxx'
    s.license          = { :type => 'Apache-2.0', :file => 'LICENSE' }
    s.author           = { 'xxx' => 'xxx@xxx' }
    s.source           = { :git => 'git@xxx', :tag => s.version.to_s }
    s.frameworks = 'OpenGLES'

    s.compiler_flags = '-x objective-c++ -std=c++1z -fno-aligned-allocation'
  
    s.ios.deployment_target = '10.0'
  
    s.source_files = 'iOS/Classes/**/*'
    
    s.subspec 'EXGL_CPP' do |mm|
        mm.source_files = 'common/exgl/**/*'
        mm.header_dir = 'EXGL_CPP'
    end

    s.subspec 'EXGL' do |mm|
        mm.source_files = 'iOS/EXGL/**/*'
        mm.header_dir = 'EXGL'
    end

    s.subspec 'jsi' do |mm|
        mm.source_files = 'common/jsi/jsi.h', 'common/jsi/jsi.cpp', 'common/jsi/jsi.cpp', 'common/jsi/instrumentation.h', 'common/jsi/jsi-inl.h', 'common/jsi/jsilib.h'
        mm.header_dir = 'jsi'
    end
    
    s.resource     =  "dist/**/*"
    s.public_header_files = 'iOS/Classes/**/*.h'
    s.dependency 'DoricCore'
end
